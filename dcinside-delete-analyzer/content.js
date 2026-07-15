/**
 * Content script (isolated world).
 * - Injects page-hook.js into page context
 * - Observes delete-candidate clicks & page lifecycle
 * - Forwards sanitized events to background
 */

(function () {
  "use strict";

  const PAGE_HOOK_SOURCE = "dcinside-delete-analyzer-page-hook";
  const MAX_HTML = 50 * 1024;
  const DELETE_HINT_RE = /삭제|delete|\bdel\b|\bx\b|^x$|close|닫기|remove|erase/i;
  const CANDIDATE_TAGS = new Set(["BUTTON", "A", "IMG", "SPAN", "INPUT", "I", "EM", "SVG", "PATH"]);

  let recording = false;
  let sessionId = null;
  let hooksInstalled = false;

  function safe(fn) {
    return function wrapped() {
      try {
        return fn.apply(this, arguments);
      } catch (err) {
        logEvent({
          eventType: "extension_error",
          source: "content.safe",
          message: String(err && err.message ? err.message : err)
        });
      }
    };
  }

  function truncate(str, max) {
    if (str == null) return str;
    const s = String(str);
    const m = max || MAX_HTML;
    if (s.length <= m) return s;
    return s.slice(0, m) + `\n<!-- truncated: originalLength=${s.length} -->`;
  }

  function stripPasswordInputs(html) {
    if (!html) return html;
    return String(html)
      .replace(/(<input\b[^>]*type\s*=\s*["']?password["']?[^>]*value\s*=\s*["'])[^"']*(["'])/gi, "$1[REDACTED]$2")
      .replace(/(<input\b[^>]*value\s*=\s*["'])[^"']*(["'][^>]*type\s*=\s*["']?password["']?)/gi, "$1[REDACTED]$2");
  }

  function sendToBg(message) {
    return new Promise((resolve) => {
      try {
        chrome.runtime.sendMessage(message, (res) => {
          if (chrome.runtime.lastError) {
            resolve({ ok: false, error: chrome.runtime.lastError.message });
            return;
          }
          resolve(res || { ok: false });
        });
      } catch (err) {
        resolve({ ok: false, error: String(err) });
      }
    });
  }

  function pageMeta() {
    return {
      pageUrl: location.href,
      pageTitle: document.title || ""
    };
  }

  async function logEvent(event) {
    if (!recording && event.eventType !== "extension_error") {
      // Allow lifecycle only while recording; check storage on unsure paths
      const status = await sendToBg({ type: "GET_STATUS" });
      recording = !!(status && status.state && status.state.recording);
      sessionId = status?.sessionId || null;
      if (!recording) return;
    }
    await sendToBg({
      type: "LOG_EVENT",
      event: {
        ...pageMeta(),
        ...event
      }
    });
  }

  function cssEscapeIdent(ident) {
    if (window.CSS && CSS.escape) return CSS.escape(ident);
    return String(ident).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }

  function buildCssSelector(el) {
    try {
      if (!el || el.nodeType !== 1) return "";
      if (el.id) return `#${cssEscapeIdent(el.id)}`;
      const parts = [];
      let cur = el;
      let depth = 0;
      while (cur && cur.nodeType === 1 && depth < 6 && cur !== document.body) {
        let part = cur.tagName.toLowerCase();
        if (cur.id) {
          parts.unshift(`#${cssEscapeIdent(cur.id)}`);
          break;
        }
        const cls = String(cur.className || "")
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((c) => `.${cssEscapeIdent(c)}`)
          .join("");
        part += cls;
        const parent = cur.parentElement;
        if (parent) {
          const siblings = Array.from(parent.children).filter((c) => c.tagName === cur.tagName);
          if (siblings.length > 1) {
            part += `:nth-of-type(${siblings.indexOf(cur) + 1})`;
          }
        }
        parts.unshift(part);
        cur = parent;
        depth++;
      }
      return parts.join(" > ");
    } catch {
      return "";
    }
  }

  function buildXPath(el) {
    try {
      if (!el || el.nodeType !== 1) return "";
      const parts = [];
      let cur = el;
      let depth = 0;
      while (cur && cur.nodeType === 1 && depth < 8) {
        let ix = 1;
        let sib = cur.previousElementSibling;
        while (sib) {
          if (sib.tagName === cur.tagName) ix++;
          sib = sib.previousElementSibling;
        }
        parts.unshift(`${cur.tagName.toLowerCase()}[${ix}]`);
        cur = cur.parentElement;
        depth++;
        if (cur && cur.id) {
          parts.unshift(`//*[@id="${cur.id}"]`);
          return parts.join("/");
        }
      }
      return "/" + parts.join("/");
    } catch {
      return "";
    }
  }

  function collectDataAttrs(el) {
    const out = {};
    try {
      if (!el || !el.attributes) return out;
      for (const attr of Array.from(el.attributes)) {
        if (attr.name.startsWith("data-")) {
          const key = attr.name;
          if (/pass|token|auth|session|cookie/i.test(key)) {
            out[key] = "[REDACTED]";
          } else {
            out[key] = truncate(attr.value, 500);
          }
        }
      }
    } catch {
      /* ignore */
    }
    return out;
  }

  function describeElement(el) {
    if (!el || el.nodeType !== 1) return null;
    const text = (el.textContent || "").replace(/\s+/g, " ").trim();
    return {
      tagName: el.tagName,
      id: el.id || "",
      className: String(el.className || ""),
      textContent: truncate(text, 300),
      title: el.getAttribute("title") || "",
      ariaLabel: el.getAttribute("aria-label") || "",
      alt: el.getAttribute("alt") || "",
      href: el.getAttribute("href") || "",
      type: el.getAttribute("type") || "",
      onclick: el.getAttribute("onclick") || "",
      dataAttrs: collectDataAttrs(el),
      cssSelectorCandidate: buildCssSelector(el),
      xpathCandidate: buildXPath(el),
      outerHTML: truncate(stripPasswordInputs(el.outerHTML || ""), MAX_HTML)
    };
  }

  function elementHintScore(el) {
    if (!el || el.nodeType !== 1) return 0;
    let score = 0;
    const bag = [
      el.tagName,
      el.id,
      String(el.className || ""),
      el.getAttribute("title") || "",
      el.getAttribute("aria-label") || "",
      el.getAttribute("alt") || "",
      el.getAttribute("onclick") || "",
      (el.textContent || "").slice(0, 40)
    ]
      .join(" ")
      .toLowerCase();

    if (DELETE_HINT_RE.test(bag)) score += 5;
    if (/\bx\b|^x$|삭제/.test(bag)) score += 3;
    if (CANDIDATE_TAGS.has(el.tagName)) score += 1;
    if (el.tagName === "IMG" && /x|del|close|삭제/i.test(el.getAttribute("src") || "")) score += 4;
    if (el.tagName === "INPUT" && /button|image|submit/i.test(el.type || "")) score += 1;
    return score;
  }

  function findDeleteCandidate(start) {
    let el = start;
    for (let i = 0; i < 8 && el; i++) {
      if (elementHintScore(el) >= 5) return el;
      el = el.parentElement;
    }
    // weaker fallback near click
    el = start;
    for (let i = 0; i < 5 && el; i++) {
      if (elementHintScore(el) >= 3 && CANDIDATE_TAGS.has(el.tagName)) return el;
      el = el.parentElement;
    }
    return null;
  }

  function findPostRow(el) {
    let cur = el;
    for (let i = 0; i < 12 && cur; i++) {
      const tag = cur.tagName;
      const cls = String(cur.className || "").toLowerCase();
      const role = cur.getAttribute("role") || "";
      if (
        tag === "TR" ||
        tag === "LI" ||
        /gall|list|post|article|item|row|ub-content|usertxt/i.test(cls) ||
        role === "listitem" ||
        role === "row"
      ) {
        // Prefer rows that contain a link-like child
        if (cur.querySelector("a[href]")) return cur;
      }
      cur = cur.parentElement;
    }
    // fallback: nearest tr/li
    return el.closest("tr, li, article, [role='listitem']");
  }

  function extractRowMeta(row) {
    const meta = {
      title: "",
      galleryName: "",
      postedAt: "",
      linkUrl: ""
    };
    if (!row) return meta;
    try {
      const links = Array.from(row.querySelectorAll("a[href]"));
      const postLink =
        links.find((a) => /\/board\/view|\/\w+\/\d+|article|no=/i.test(a.href)) ||
        links.find((a) => (a.textContent || "").trim().length > 1) ||
        links[0];
      if (postLink) {
        meta.linkUrl = postLink.href;
        meta.title = (postLink.textContent || "").replace(/\s+/g, " ").trim().slice(0, 300);
      }
      const texts = (row.textContent || "").replace(/\s+/g, " ").trim();
      const dateMatch = texts.match(/\d{4}[-./]\d{1,2}[-./]\d{1,2}(?:\s+\d{1,2}:\d{2})?|\d{1,2}[-./]\d{1,2}\s+\d{1,2}:\d{2}/);
      if (dateMatch) meta.postedAt = dateMatch[0];

      // gallery guess: short text nodes / dedicated cells
      const cells = row.querySelectorAll("td, span, em, a");
      for (const c of cells) {
        const t = (c.textContent || "").replace(/\s+/g, " ").trim();
        if (!t || t === meta.title) continue;
        if (t.length >= 2 && t.length <= 40 && !/^\d+$/.test(t) && !dateMatch?.[0]?.includes(t)) {
          if (/갤|gallery|gall/i.test(c.className) || (c.tagName === "A" && /gallery|gall/i.test(c.href || ""))) {
            meta.galleryName = t;
            break;
          }
        }
      }
      if (!meta.galleryName) {
        for (const c of cells) {
          const t = (c.textContent || "").replace(/\s+/g, " ").trim();
          if (t.length >= 2 && t.length <= 20 && t !== meta.title && !/\d{2}:\d{2}/.test(t)) {
            if (/갤$|갤러리/.test(t) || (c.tagName === "TD" && c !== postLink?.closest("td"))) {
              meta.galleryName = t;
              break;
            }
          }
        }
      }
    } catch {
      /* ignore */
    }
    return meta;
  }

  function parentChain(el, max = 5) {
    const chain = [];
    let cur = el && el.parentElement;
    let i = 0;
    while (cur && i < max) {
      chain.push({
        tagName: cur.tagName,
        id: cur.id || "",
        className: String(cur.className || ""),
        cssSelectorCandidate: buildCssSelector(cur),
        outerHTML: truncate(stripPasswordInputs(cur.outerHTML || ""), 8000)
      });
      cur = cur.parentElement;
      i++;
    }
    return chain;
  }

  function getNavType() {
    try {
      const entries = performance.getEntriesByType("navigation");
      if (entries && entries[0] && entries[0].type) return entries[0].type;
      if (performance.navigation) {
        const map = { 0: "navigate", 1: "reload", 2: "back_forward" };
        return map[performance.navigation.type] || String(performance.navigation.type);
      }
    } catch {
      /* ignore */
    }
    return "unknown";
  }

  function findListRegion() {
    const candidates = [];
    const selectors = [
      "table",
      "ul",
      "ol",
      "[class*='list']",
      "[class*='gall']",
      "[id*='list']",
      "tbody"
    ];
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((node) => {
        const deleteish = countDeleteCandidates(node);
        const rows = node.querySelectorAll("tr, li, article").length;
        if (rows >= 3 || deleteish >= 1) {
          candidates.push({
            selector: buildCssSelector(node) || sel,
            tagName: node.tagName,
            className: String(node.className || ""),
            id: node.id || "",
            rowCount: rows,
            deleteCandidateCount: deleteish,
            html: truncate(stripPasswordInputs(node.outerHTML || ""), 40000),
            score: rows + deleteish * 3
          });
        }
      });
    }
    candidates.sort((a, b) => b.score - a.score);
    return candidates.slice(0, 3);
  }

  function countDeleteCandidates(root) {
    let n = 0;
    const scope = root || document;
    const nodes = scope.querySelectorAll("a, button, img, span, input, i");
    nodes.forEach((el) => {
      if (elementHintScore(el) >= 5) n++;
    });
    return n;
  }

  function findPagination() {
    const out = {
      html: "",
      selector: "",
      pageNumbers: [],
      pageLinks: [],
      currentPage: null,
      nextBundleCandidates: []
    };
    try {
      const all = Array.from(document.querySelectorAll("a, button, span, em, strong"));
      const pageLike = all.filter((el) => {
        const t = (el.textContent || "").trim();
        return /^\d{1,3}$/.test(t) || /다음|이전|next|prev|>|>>|«|»/i.test(t);
      });
      if (!pageLike.length) return out;

      // Find common ancestor that looks like pagination
      let best = null;
      let bestScore = 0;
      for (const el of pageLike) {
        let cur = el.parentElement;
        for (let d = 0; d < 5 && cur; d++) {
          const nums = Array.from(cur.querySelectorAll("a, span, em, button")).filter((x) =>
            /^\d{1,3}$/.test((x.textContent || "").trim())
          );
          if (nums.length >= 3) {
            const score = nums.length;
            if (score > bestScore) {
              bestScore = score;
              best = cur;
            }
          }
          cur = cur.parentElement;
        }
      }
      if (!best) return out;
      out.selector = buildCssSelector(best);
      out.html = truncate(stripPasswordInputs(best.outerHTML || ""), 20000);
      const links = Array.from(best.querySelectorAll("a, span, em, button, strong"));
      links.forEach((el) => {
        const t = (el.textContent || "").trim();
        if (/^\d{1,3}$/.test(t)) {
          out.pageNumbers.push(t);
          out.pageLinks.push({
            text: t,
            href: el.getAttribute("href") || "",
            tagName: el.tagName,
            className: String(el.className || ""),
            isCurrent: /on|active|current|now/i.test(String(el.className || "") + " " + String(el.parentElement?.className || ""))
          });
          if (/on|active|current|now/i.test(String(el.className || "") + " " + String(el.parentElement?.className || ""))) {
            out.currentPage = t;
          }
        }
        if (/다음|prev|next|>|>>|»|건너/i.test(t) || /next|page_next/i.test(String(el.className || ""))) {
          out.nextBundleCandidates.push({
            text: t,
            href: el.getAttribute("href") || "",
            tagName: el.tagName,
            className: String(el.className || ""),
            cssSelectorCandidate: buildCssSelector(el),
            outerHTML: truncate(el.outerHTML || "", 2000)
          });
        }
      });
    } catch {
      /* ignore */
    }
    return out;
  }

  function sampleRows(listCandidates) {
    const rows = [];
    try {
      const rootSel = listCandidates[0]?.selector;
      const root = rootSel ? document.querySelector(rootSel) : null;
      const items = root
        ? Array.from(root.querySelectorAll("tr, li, article")).slice(0, 5)
        : Array.from(document.querySelectorAll("tr, li")).slice(0, 5);
      items.forEach((row, idx) => {
        const meta = extractRowMeta(row);
        rows.push({
          index: idx,
          tagName: row.tagName,
          className: String(row.className || ""),
          cssSelectorCandidate: buildCssSelector(row),
          meta,
          html: truncate(stripPasswordInputs(row.outerHTML || ""), 12000),
          deleteCandidateCount: countDeleteCandidates(row)
        });
      });
    } catch {
      /* ignore */
    }
    return rows;
  }

  async function takePageSnapshot() {
    const listCandidates = findListRegion();
    const pagination = findPagination();
    await logEvent({
      eventType: "page_snapshot",
      url: location.href,
      title: document.title || "",
      deleteCandidateCount: countDeleteCandidates(document),
      listRegionCandidates: listCandidates.map((c) => ({
        selector: c.selector,
        tagName: c.tagName,
        className: c.className,
        id: c.id,
        rowCount: c.rowCount,
        deleteCandidateCount: c.deleteCandidateCount,
        html: c.html
      })),
      pagination,
      sampleRows: sampleRows(listCandidates),
      readyState: document.readyState,
      navigationType: getNavType()
    });
  }

  async function onDeleteCandidateClick(ev) {
    const candidate = findDeleteCandidate(ev.target);
    if (!candidate) return;

    const interactionId = `delete_${Date.now()}`;
    await sendToBg({
      type: "SET_INTERACTION",
      interactionId,
      windowMs: 15000
    });

    const row = findPostRow(candidate);
    const rowMeta = extractRowMeta(row);

    await logEvent({
      eventType: "delete_candidate_click",
      interactionId,
      target: describeElement(candidate),
      clickTarget: describeElement(ev.target),
      parentChain: parentChain(candidate, 5),
      postRow: row
        ? {
            tagName: row.tagName,
            className: String(row.className || ""),
            cssSelectorCandidate: buildCssSelector(row),
            html: truncate(stripPasswordInputs(row.outerHTML || ""), MAX_HTML),
            ...rowMeta
          }
        : null,
      clientX: ev.clientX,
      clientY: ev.clientY
    });
  }

  function injectPageHook() {
    try {
      if (document.documentElement.getAttribute("data-dc-analyzer-hook") === "1") return;
      document.documentElement.setAttribute("data-dc-analyzer-hook", "1");
      const script = document.createElement("script");
      script.src = chrome.runtime.getURL("page-hook.js");
      script.async = false;
      script.onload = function () {
        script.remove();
      };
      (document.documentElement || document.head || document.documentElement).appendChild(script);
    } catch (err) {
      logEvent({
        eventType: "extension_error",
        source: "injectPageHook",
        message: String(err && err.message ? err.message : err)
      });
    }
  }

  function onPageMessage(event) {
    try {
      if (event.source !== window) return;
      const data = event.data;
      if (!data || data.source !== PAGE_HOOK_SOURCE) return;
      // Only accept same-origin dcinside pages
      if (!/\.dcinside\.com$|^gall\.dcinside\.com$|^dcinside\.com$/i.test(location.hostname)) return;

      if (data.hookType === "confirm_shown") {
        logEvent({
          eventType: "confirm_shown",
          confirmMessage: truncate(data.message, 2000),
          shownAt: data.shownAt
        });
        sendToBg({ type: "EXTEND_INTERACTION", windowMs: 15000 });
      } else if (data.hookType === "confirm_result") {
        logEvent({
          eventType: "confirm_result",
          confirmMessage: truncate(data.message, 2000),
          result: !!data.result,
          shownAt: data.shownAt,
          resultAt: data.resultAt
        });
        sendToBg({ type: "EXTEND_INTERACTION", windowMs: 15000 });
      } else if (data.hookType === "hook_ready") {
        logEvent({
          eventType: "page_hook_ready",
          at: data.at
        });
      }
    } catch (err) {
      logEvent({
        eventType: "extension_error",
        source: "onPageMessage",
        message: String(err && err.message ? err.message : err)
      });
    }
  }

  function installLifecycleHooks() {
    if (hooksInstalled) return;
    hooksInstalled = true;

    document.addEventListener(
      "click",
      safe((ev) => {
        if (!recording) return;
        onDeleteCandidateClick(ev);
      }),
      true
    );

    window.addEventListener("message", safe(onPageMessage), false);

    window.addEventListener(
      "beforeunload",
      safe(() => {
        if (!recording) return;
        // beforeunload에서는 await가 끊길 수 있어 fire-and-forget
        try {
          chrome.runtime.sendMessage({
            type: "LOG_EVENT",
            event: {
              ...pageMeta(),
              eventType: "before_unload",
              readyState: document.readyState,
              navigationType: getNavType()
            }
          });
        } catch (_) {
          /* ignore */
        }
      }),
      true
    );

    document.addEventListener(
      "visibilitychange",
      safe(() => {
        if (!recording) return;
        logEvent({
          eventType: "visibility_change",
          visibilityState: document.visibilityState,
          readyState: document.readyState,
          navigationType: getNavType()
        });
      }),
      true
    );

    window.addEventListener(
      "pageshow",
      safe((ev) => {
        if (!recording) return;
        logEvent({
          eventType: "pageshow",
          persisted: !!ev.persisted,
          readyState: document.readyState,
          navigationType: getNavType()
        });
      }),
      true
    );

    window.addEventListener(
      "pagehide",
      safe((ev) => {
        if (!recording) return;
        try {
          chrome.runtime.sendMessage({
            type: "LOG_EVENT",
            event: {
              ...pageMeta(),
              eventType: "pagehide",
              persisted: !!ev.persisted,
              readyState: document.readyState,
              navigationType: getNavType()
            }
          });
        } catch (_) {
          /* ignore */
        }
      }),
      true
    );
  }

  async function syncRecordingState() {
    const status = await sendToBg({ type: "GET_STATUS" });
    recording = !!(status && status.state && status.state.recording);
    sessionId = status?.sessionId || null;
    return recording;
  }

  async function onReady() {
    injectPageHook();
    installLifecycleHooks();
    const isRec = await syncRecordingState();
    await logEvent({
      eventType: "content_script_loaded",
      readyState: document.readyState,
      navigationType: getNavType(),
      recording: isRec,
      sessionId
    });

    const markReady = async () => {
      const still = await syncRecordingState();
      if (!still) return;
      await logEvent({
        eventType: "page_ready",
        readyState: document.readyState,
        navigationType: getNavType()
      });
    };

    if (document.readyState === "complete" || document.readyState === "interactive") {
      await markReady();
    } else {
      document.addEventListener(
        "DOMContentLoaded",
        safe(() => {
          markReady();
        }),
        { once: true }
      );
    }
  }

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    (async () => {
      try {
        if (message?.type === "RECORDING_STARTED") {
          recording = true;
          sessionId = message.sessionId || null;
          injectPageHook();
          await takePageSnapshot();
          sendResponse({ ok: true });
          return;
        }
        if (message?.type === "TAKE_SNAPSHOT") {
          await syncRecordingState();
          if (recording) await takePageSnapshot();
          sendResponse({ ok: true });
          return;
        }
        sendResponse({ ok: false });
      } catch (err) {
        sendResponse({ ok: false, error: String(err) });
      }
    })();
    return true;
  });

  chrome.storage.onChanged.addListener(
    safe((changes, area) => {
      if (area !== "local" || !changes.analyzerState) return;
      const next = changes.analyzerState.newValue;
      const prev = changes.analyzerState.oldValue;
      const was = !!(prev && prev.recording);
      const now = !!(next && next.recording);
      recording = now;
      sessionId = next?.currentSessionId || null;
      if (!was && now) {
        takePageSnapshot();
      }
    })
  );

  // Boot ASAP (document_start)
  onReady();
})();
