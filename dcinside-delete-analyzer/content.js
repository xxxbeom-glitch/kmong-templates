/**
 * Gallog posting/comment content script.
 * Shared delete engine: native X button click → confirm auto-approve → reload → resume.
 */

(function () {
  "use strict";

  const CONTENT_SOURCE = "dc-delete-tool-content";
  const UI_ROOT_ID = "dc-delete-tool-bar";
  const CB_CLASS = "dc-delete-tool-cb";
  const LI_MARK = "data-dc-tool-ready";
  const ROW_ID_ATTR = "data-dc-tool-id";
  const CLICK_SESSION_KEY = "dc_delete_tool_click_pending";

  const DELAY = { safe: 1500, normal: 1000 };
  const RELOAD_TIMEOUT_MS = 15000;
  const MAX_CONSECUTIVE_FAILS = 3;
  const MAX_SAME_TARGET_STREAK = 3;

  let processingLock = false;
  let reloadWatchTimer = null;
  let pausedPollTimer = null;
  let clickedThisPageLoad = false;
  let cachedDetect = null;

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function simpleHash(str) {
    let h = 0;
    const s = String(str || "");
    for (let i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i);
      h |= 0;
    }
    return "h" + Math.abs(h).toString(36);
  }

  // ---------- page type ----------

  function getPageType() {
    try {
      const path = location.pathname || "";
      if (/\/login|member\/login|join/i.test(path + location.href)) {
        return { contentType: null, gallogId: null, isLogin: true };
      }
      const parts = path.split("/").filter(Boolean);
      if (parts.length < 2) return null;
      const gallogId = parts[0];
      const section = parts[1];
      if (section === "posting") return { contentType: "posting", gallogId, isLogin: false };
      if (section === "comment") return { contentType: "comment", gallogId, isLogin: false };
      return null;
    } catch (_) {
      return null;
    }
  }

  function labelForType(t) {
    return t === "comment" ? "댓글" : "게시글";
  }

  // ---------- DOM detection ----------

  function isExcludedDeleteButton(btn) {
    if (!btn) return true;
    try {
      if (btn.closest("#dc-delete-tool-bar")) return true;
      if (btn.closest(".dc-delete-tool-cb-wrap")) return true;
      // Common chrome / notice / popup close buttons outside list
      if (btn.closest(".pop_wrap, .layer_pop, .alert_wrap, .notice_box, .top_notice, .ban_notice")) {
        return true;
      }
      const cls = String(btn.className || "").toLowerCase();
      const aria = String(btn.getAttribute("aria-label") || "").toLowerCase();
      const title = String(btn.getAttribute("title") || "").toLowerCase();
      if (/close|닫기|알림|설정/.test(cls + " " + aria + " " + title) && !/delete|listdel|삭제/.test(cls)) {
        // keep btn_delete / btn_listdel
        if (!/btn_delete|btn_listdel/.test(cls)) return true;
      }
    } catch (_) {
      /* ignore */
    }
    return false;
  }

  function looksLikeListRow(el) {
    if (!el || el.nodeType !== 1) return false;
    const tag = el.tagName;
    if (tag !== "LI" && tag !== "TR" && tag !== "DIV" && tag !== "ARTICLE") return false;
    const text = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (text.length < 4) return false;
    const hasLink = !!el.querySelector("a[href]");
    const hasDate = /\d{2,4}[-./]\d{1,2}[-./]\d{1,2}|\d{1,2}:\d{2}/.test(text);
    const btn = findNativeDeleteButton(el, true);
    return !!(btn && (hasLink || hasDate || el.hasAttribute("data-no")));
  }

  function findNativeDeleteButton(row, quiet) {
    if (!row) return null;
    const candidates = Array.from(
      row.querySelectorAll(
        "button.btn_delete.btn_listdel, button.btn_delete, button.btn_listdel, button[class*='delete'], button[class*='del'], a.btn_delete, a.btn_listdel"
      )
    );
    // also buttons whose blind/sr-only text says 삭제
    row.querySelectorAll("button, a").forEach((el) => {
      const blind = el.querySelector(".blind, .sr-only, .hide, .hidden");
      const t = ((blind && blind.textContent) || el.getAttribute("title") || el.getAttribute("aria-label") || "")
        .replace(/\s+/g, "")
        .trim();
      if (t === "삭제" || /삭제/.test(t)) candidates.push(el);
    });

    for (const btn of candidates) {
      if (isExcludedDeleteButton(btn)) continue;
      // must be inside this row
      if (!row.contains(btn)) continue;
      return btn;
    }
    if (!quiet) {
      /* no log spam */
    }
    return null;
  }

  function detectListStructure(contentType) {
    // Preferred: known gallog list
    const preferred = document.querySelector("ul.cont_listbox");
    if (preferred) {
      const rows = Array.from(preferred.querySelectorAll(":scope > li[data-no], :scope > li")).filter(
        (li) => li.hasAttribute("data-no") || looksLikeListRow(li)
      );
      if (rows.length || preferred) {
        const info = {
          listSelector: "ul.cont_listbox",
          rowSelector: "ul.cont_listbox > li[data-no]",
          deleteButtonSelector: "button.btn_delete.btn_listdel",
          listEl: preferred,
          rows,
          contentType
        };
        return info;
      }
    }

    // Fallback: score containers that have many delete-capable rows
    let best = null;
    const containers = Array.from(
      document.querySelectorAll("ul, ol, tbody, .cont_listbox, [class*='list'], [class*='cont']")
    );
    for (const box of containers) {
      if (box.closest("#dc-delete-tool-bar")) continue;
      const children = Array.from(box.children).filter(looksLikeListRow);
      if (children.length < 1) continue;
      const score = children.length;
      if (!best || score > best.score) {
        best = {
          score,
          listEl: box,
          rows: children,
          listSelector: box.id
            ? `#${box.id}`
            : box.className
              ? `${box.tagName.toLowerCase()}.${String(box.className).trim().split(/\s+/)[0]}`
              : box.tagName.toLowerCase(),
          rowSelector: `${box.tagName.toLowerCase()} > ${children[0].tagName.toLowerCase()}`,
          deleteButtonSelector: "button.btn_delete.btn_listdel"
        };
      }
    }
    if (!best) {
      return {
        listSelector: null,
        rowSelector: null,
        deleteButtonSelector: "button.btn_delete.btn_listdel",
        listEl: null,
        rows: [],
        contentType
      };
    }
    return { ...best, contentType };
  }

  function getDetection() {
    const page = getPageType();
    if (!page || !page.contentType) {
      cachedDetect = null;
      return null;
    }
    cachedDetect = detectListStructure(page.contentType);
    return cachedDetect;
  }

  function findListRows() {
    const det = getDetection();
    if (!det) return [];
    if (det.listEl) {
      const rows = Array.from(
        det.listEl.querySelectorAll(":scope > li[data-no], :scope > li, :scope > tr, :scope > div")
      ).filter((el) => el.hasAttribute("data-no") || looksLikeListRow(el));
      if (rows.length) return rows;
    }
    return det.rows || [];
  }

  function extractRowMeta(row, index) {
    const dataNo = row.getAttribute("data-no") || row.dataset?.no || "";
    let link = "";
    let text = "";
    let date = "";
    try {
      const a =
        row.querySelector("a.link, a.galltit, a[href*='board'], a[href*='gall']") ||
        row.querySelector("a[href]");
      if (a) {
        link = a.href || "";
        text = (a.textContent || "").replace(/\s+/g, " ").trim();
      }
      if (!text) {
        const body =
          row.querySelector(".box, .txt, .cont, .comment, .galltit, p, span") || row;
        text = (body.textContent || "").replace(/\s+/g, " ").trim();
      }
      // strip trailing delete label noise
      text = text.replace(/\s*삭제\s*$/, "").trim().slice(0, 100);
      const raw = (row.textContent || "").replace(/\s+/g, " ");
      const dm = raw.match(
        /\d{4}[-./]\d{1,2}[-./]\d{1,2}(?:\s+\d{1,2}:\d{2})?|\d{1,2}[-./]\d{1,2}\s+\d{1,2}:\d{2}/
      );
      if (dm) date = dm[0];
    } catch (_) {
      /* ignore */
    }
    const id = dataNo
      ? String(dataNo)
      : simpleHash([link, text, date, String(index)].join("|"));
    return {
      id,
      dataNo: dataNo ? String(dataNo) : "",
      link,
      textPreview: text.slice(0, 100),
      date,
      index
    };
  }

  function ensureRowId(row, index) {
    let id = row.getAttribute(ROW_ID_ATTR);
    if (!id) {
      const meta = extractRowMeta(row, index);
      id = meta.id;
      row.setAttribute(ROW_ID_ATTR, id);
    }
    return id;
  }

  function findRowByTarget(target) {
    const rows = findListRows();
    const id = typeof target === "string" ? target : target && target.id;
    const dataNo = typeof target === "object" && target ? target.dataNo : "";
    const link = typeof target === "object" && target ? target.link : "";
    const textPreview = typeof target === "object" && target ? target.textPreview : "";

    if (dataNo) {
      const byNo = rows.find((r) => String(r.getAttribute("data-no") || "") === String(dataNo));
      if (byNo) return byNo;
    }
    if (id) {
      const byAttr = rows.find((r) => r.getAttribute(ROW_ID_ATTR) === String(id));
      if (byAttr) return byAttr;
      const byNo2 = rows.find((r) => String(r.getAttribute("data-no") || "") === String(id));
      if (byNo2) return byNo2;
    }
    if (link || textPreview) {
      return (
        rows.find((r, i) => {
          const m = extractRowMeta(r, i);
          if (link && textPreview) return m.link === link && m.textPreview === textPreview;
          if (link) return m.link === link;
          return false;
        }) || null
      );
    }
    return null;
  }

  function targetStillPresent(target) {
    return !!findRowByTarget(target);
  }

  function readTotalCount() {
    try {
      const el =
        document.querySelector(".cont_head .num") ||
        document.querySelector(".choice_sect .num") ||
        document.querySelector(".cont_box .num");
      if (!el) return null;
      const n = parseInt(String(el.textContent || "").replace(/[^\d]/g, ""), 10);
      return Number.isFinite(n) ? n : null;
    } catch (_) {
      return null;
    }
  }

  function logDetection() {
    const page = getPageType();
    const det = getDetection();
    const rows = findListRows();
    console.info("[DCDeleteTool] detection", {
      contentType: page && page.contentType,
      listSelector: det && det.listSelector,
      rowSelector: det && det.rowSelector,
      deleteButtonSelector: det && det.deleteButtonSelector,
      rowCount: rows.length,
      url: location.href
    });
  }

  // ---------- storage ----------

  async function getJob() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: "GET_JOB" }, (res) => {
        if (chrome.runtime.lastError) {
          resolve(null);
          return;
        }
        resolve(res && res.job ? res.job : null);
      });
    });
  }

  async function setJob(patch) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: "SET_JOB", patch }, (res) => {
        resolve(res && res.job ? res.job : null);
      });
    });
  }

  function injectPageHook() {
    try {
      if (document.documentElement.getAttribute("data-dc-delete-tool-hook") === "1") return;
      document.documentElement.setAttribute("data-dc-delete-tool-hook", "1");
      const s = document.createElement("script");
      s.src = chrome.runtime.getURL("page-hook.js");
      s.async = false;
      s.onload = () => s.remove();
      (document.documentElement || document.head).appendChild(s);
    } catch (_) {
      /* ignore */
    }
  }

  function setAutomation(active) {
    try {
      window.postMessage(
        {
          source: CONTENT_SOURCE,
          action: "SET_AUTOMATION",
          active: !!active,
          requestId: `auto_${Date.now()}`
        },
        location.origin
      );
    } catch (_) {
      /* ignore */
    }
  }

  function clearReloadWatch() {
    if (reloadWatchTimer) {
      clearTimeout(reloadWatchTimer);
      reloadWatchTimer = null;
    }
  }

  function writeClickSession(id) {
    try {
      sessionStorage.setItem(
        CLICK_SESSION_KEY,
        JSON.stringify({ id: String(id), t: Date.now(), url: location.href })
      );
    } catch (_) {
      /* ignore */
    }
  }

  function takeClickSession() {
    try {
      const raw = sessionStorage.getItem(CLICK_SESSION_KEY);
      if (!raw) return null;
      sessionStorage.removeItem(CLICK_SESSION_KEY);
      return JSON.parse(raw);
    } catch (_) {
      try {
        sessionStorage.removeItem(CLICK_SESSION_KEY);
      } catch (_) {
        /* ignore */
      }
      return null;
    }
  }

  function normalizePending(job) {
    if (Array.isArray(job.pendingTargets) && job.pendingTargets.length) {
      return job.pendingTargets.map((t) =>
        typeof t === "string" ? { id: t, dataNo: t, textPreview: "" } : t
      );
    }
    if (Array.isArray(job.pendingNos) && job.pendingNos.length) {
      return job.pendingNos.map((n) => ({ id: String(n), dataNo: String(n), textPreview: "" }));
    }
    if (Array.isArray(job.selectedTargets) && job.selectedTargets.length && job.mode === "selected") {
      return job.selectedTargets.map((t) =>
        typeof t === "string" ? { id: t, dataNo: t, textPreview: "" } : t
      );
    }
    return [];
  }

  // ---------- job result helpers ----------

  async function markSuccess(target) {
    try {
      sessionStorage.removeItem(CLICK_SESSION_KEY);
    } catch (_) {
      /* ignore */
    }
    const job = await getJob();
    if (!job) return;
    const id = typeof target === "string" ? target : target.id;
    const pending = normalizePending(job).filter((t) => String(t.id) !== String(id));
    await setJob({
      pendingTargets: pending,
      selectedTargets: pending,
      successCount: (job.successCount || 0) + 1,
      consecutiveFails: 0,
      sameTargetStreak: 0,
      lastAttemptId: null,
      currentTargetId: null,
      currentPreview: "",
      clickIssuedForId: null,
      deletingCurrentId: null,
      awaitingReload: false,
      awaitingReloadSince: null,
      statusMessage: `삭제 성공: ${(typeof target === "object" && target.textPreview) || id}`
    });
    setAutomation(false);
  }

  async function markFailure(target, message) {
    try {
      sessionStorage.removeItem(CLICK_SESSION_KEY);
    } catch (_) {
      /* ignore */
    }
    const job = await getJob();
    if (!job) return;
    const id = target == null ? null : typeof target === "string" ? target : target.id;
    const pending =
      job.mode === "all"
        ? normalizePending(job)
        : normalizePending(job).filter((t) => String(t.id) !== String(id));
    const failCount = (job.failCount || 0) + 1;
    const consecutiveFails = (job.consecutiveFails || 0) + 1;
    const failedTargets = Array.isArray(job.failedTargets) ? job.failedTargets.slice() : [];
    if (id != null) {
      failedTargets.push(
        typeof target === "object" && target
          ? { id: target.id, textPreview: (target.textPreview || "").slice(0, 100) }
          : { id: String(id) }
      );
    }
    const page = getPageType();
    const rows = findListRows();
    const detail = `${message || ""} | url=${location.href} | rows=${rows.length}`;
    const shouldStop = consecutiveFails >= MAX_CONSECUTIVE_FAILS;
    await setJob({
      pendingTargets: pending,
      selectedTargets: pending,
      failCount,
      failedTargets: failedTargets.slice(-200),
      consecutiveFails,
      currentTargetId: null,
      currentPreview: "",
      clickIssuedForId: null,
      deletingCurrentId: null,
      awaitingReload: false,
      awaitingReloadSince: null,
      running: shouldStop ? false : job.running,
      status: shouldStop ? "error" : job.status,
      statusMessage: shouldStop
        ? `연속 ${MAX_CONSECUTIVE_FAILS}회 실패로 중지. ${detail}`
        : detail,
      contentType: (page && page.contentType) || job.contentType
    });
    setAutomation(false);
  }

  async function reconcileAfterLoad(job) {
    const sessionClick = takeClickSession();
    const issuedId = sessionClick
      ? String(sessionClick.id)
      : job.clickIssuedForId != null
        ? String(job.clickIssuedForId)
        : job.clickIssuedForNo != null
          ? String(job.clickIssuedForNo)
          : null;

    if (!issuedId) {
      if (job.awaitingReload || job.clickIssuedForId || job.deletingCurrentId) {
        await setJob({
          awaitingReload: false,
          clickIssuedForId: null,
          deletingCurrentId: null,
          currentTargetId: null,
          currentPreview: ""
        });
        return await getJob();
      }
      return job;
    }

    const pending = normalizePending(job);
    const target =
      pending.find((t) => String(t.id) === issuedId) ||
      { id: issuedId, dataNo: issuedId, textPreview: job.currentPreview || "" };

    const still = targetStillPresent(target);
    if (!still) {
      // For selected comments without data-no: verify by link+text if possible
      await markSuccess(target);
      return await getJob();
    }

    if (sessionClick) {
      // If fingerprint link+text both gone somehow but row with same id remains — fail
      await markFailure(target, `삭제 후에도 목록에 남아 있음: ${issuedId}`);
      return await getJob();
    }

    await setJob({
      awaitingReload: false,
      clickIssuedForId: null,
      deletingCurrentId: null,
      currentTargetId: null,
      currentPreview: ""
    });
    return await getJob();
  }

  function findNextPageControl() {
    const box =
      document.querySelector(".bottom_paging_box, .paging, .pagebox, .pagination") ||
      document.querySelector("[class*='paging']");
    if (!box) return null;
    const links = Array.from(box.querySelectorAll("a"));
    const next =
      links.find((a) => /다음|next|>|»/i.test((a.textContent || "").trim())) ||
      links.find((a) => /page_next|btn_next|next/i.test(String(a.className || "")));
    return next || null;
  }

  async function finishIfDone(job) {
    if (!job || !job.running) return true;
    const kind = labelForType(job.contentType);

    if (job.mode === "all") {
      const rows = findListRows();
      if (rows.length === 0) {
        const total = readTotalCount();
        if (total != null && total > 0) {
          const next = findNextPageControl();
          if (next && next.href) {
            await setJob({ statusMessage: "다음 페이지로 이동…" });
            location.assign(next.href);
            return true; // navigation will resume
          }
        }
        await setJob({
          running: false,
          paused: false,
          status: "done",
          statusMessage: `${kind} 전체 삭제 완료`,
          currentTargetId: null,
          currentPreview: "",
          clickIssuedForId: null,
          deletingCurrentId: null,
          awaitingReload: false,
          pageItemCount: 0,
          totalCount: readTotalCount()
        });
        setAutomation(false);
        return true;
      }
      return false;
    }

    const pending = normalizePending(job);
    if (pending.length === 0) {
      await setJob({
        running: false,
        paused: false,
        status: "done",
        statusMessage:
          job.mode === "test5" ? `${kind} 테스트 5개 삭제 완료` : `선택 ${kind} 삭제 완료`,
        currentTargetId: null,
        currentPreview: "",
        clickIssuedForId: null,
        deletingCurrentId: null,
        awaitingReload: false,
        pageItemCount: findListRows().length,
        totalCount: readTotalCount()
      });
      setAutomation(false);
      return true;
    }
    return false;
  }

  function pickNextTarget(job) {
    const rows = findListRows();
    if (job.mode === "all") {
      const first = rows[0];
      if (!first) return null;
      const meta = extractRowMeta(first, 0);
      ensureRowId(first, 0);
      const btn = findNativeDeleteButton(first);
      if (!btn) return { target: meta, missingBtn: true };
      return { target: meta, row: first, btn };
    }

    const pending = normalizePending(job);
    for (const t of pending) {
      const row = findRowByTarget(t);
      if (!row) {
        // Cannot find — for selected, do not auto-success unless we can verify gone
        if (t.link || t.textPreview) {
          // still searchable? already tried findRowByTarget
          return { target: t, missingUnverified: true };
        }
        return { target: t, missing: true };
      }
      const btn = findNativeDeleteButton(row);
      if (!btn) return { target: t, row, missingBtn: true };
      return { target: t, row, btn };
    }
    return null;
  }

  async function clickNativeDelete(btn) {
    setAutomation(true);
    await sleep(80);
    try {
      btn.click();
    } catch (err) {
      setAutomation(false);
      throw err;
    }
  }

  function startReloadWatch(id) {
    clearReloadWatch();
    reloadWatchTimer = setTimeout(async () => {
      const job = await getJob();
      if (!job || !job.running || job.paused || job.stopped) return;
      if (!job.awaitingReload) return;
      if (String(job.clickIssuedForId || "") !== String(id)) return;
      await markFailure(
        { id, textPreview: job.currentPreview || "" },
        `삭제 후 ${RELOAD_TIMEOUT_MS / 1000}초 안에 새로고침되지 않음`
      );
      processingLock = false;
      scheduleProcess("reload-timeout");
    }, RELOAD_TIMEOUT_MS);
  }

  async function assertCorrectPage(job) {
    const page = getPageType();
    if (page && page.isLogin) {
      await setJob({
        running: false,
        status: "error",
        statusMessage: `로그인 페이지로 이동함 | url=${location.href}`
      });
      return false;
    }
    if (!page || !page.contentType) {
      await setJob({
        running: false,
        status: "error",
        statusMessage: `지원 페이지가 아님 | url=${location.href} | rows=${findListRows().length}`
      });
      return false;
    }
    if (job.contentType && job.contentType !== page.contentType) {
      await setJob({
        running: false,
        status: "error",
        statusMessage: `작업 유형(${job.contentType})과 현재 페이지(${page.contentType})가 다름 | url=${location.href}`
      });
      return false;
    }
    return true;
  }

  async function processQueue(reason) {
    if (processingLock) return;
    processingLock = true;

    try {
      let job = await getJob();
      if (!job) {
        processingLock = false;
        return;
      }
      if (job.stopped || !job.running) {
        setAutomation(false);
        processingLock = false;
        return;
      }
      if (!(await assertCorrectPage(job))) {
        setAutomation(false);
        processingLock = false;
        return;
      }
      if (job.paused) {
        setAutomation(false);
        startPausedPoll();
        processingLock = false;
        return;
      }
      if (clickedThisPageLoad && job.awaitingReload) {
        processingLock = false;
        return;
      }

      job = (await reconcileAfterLoad(job)) || (await getJob());
      if (!job || !job.running || job.stopped) {
        processingLock = false;
        return;
      }
      if (job.paused) {
        startPausedPoll();
        processingLock = false;
        return;
      }
      if (await finishIfDone(job)) {
        processingLock = false;
        return;
      }

      const waitMs = job.delayMs || DELAY.safe;
      await setJob({ status: "running", statusMessage: `대기 중… (${reason || "load"})` });
      await sleep(waitMs);

      job = await getJob();
      if (!job || !job.running || job.paused || job.stopped) {
        processingLock = false;
        return;
      }

      // Resolve clearly-missing pending (data-no based)
      if (job.mode !== "all") {
        let pending = normalizePending(job);
        while (pending.length) {
          const head = pending[0];
          if (findRowByTarget(head)) break;
          if (head.dataNo || (!head.link && !head.textPreview)) {
            await markSuccess(head);
          } else {
            // unverified missing — fail rather than false success
            await markFailure(head, "선택 대상을 페이지에서 찾지 못함(미확인)");
          }
          job = await getJob();
          pending = normalizePending(job);
        }
        if (await finishIfDone(job)) {
          processingLock = false;
          return;
        }
        job = await getJob();
      }

      const picked = pickNextTarget(job);
      if (!picked) {
        if (job.mode === "all") await finishIfDone(job);
        else {
          await setJob({
            running: false,
            status: "error",
            statusMessage: `다음 삭제 버튼을 찾지 못함 | url=${location.href} | rows=${findListRows().length}`
          });
        }
        processingLock = false;
        return;
      }

      if (picked.missing) {
        await markSuccess(picked.target);
        processingLock = false;
        scheduleProcess("missing-skip");
        return;
      }
      if (picked.missingUnverified) {
        await markFailure(picked.target, "선택 댓글을 다시 찾지 못함");
        processingLock = false;
        scheduleProcess("missing-unverified");
        return;
      }
      if (picked.missingBtn) {
        await markFailure(
          picked.target,
          `삭제 버튼 없음 | url=${location.href} | rows=${findListRows().length}`
        );
        processingLock = false;
        scheduleProcess("missing-btn");
        return;
      }

      const tid = String(picked.target.id);
      let sameTargetStreak = job.sameTargetStreak || 0;
      if (job.lastAttemptId && String(job.lastAttemptId) === tid) {
        sameTargetStreak += 1;
      } else {
        sameTargetStreak = 1;
      }
      if (sameTargetStreak >= MAX_SAME_TARGET_STREAK) {
        await setJob({
          running: false,
          status: "error",
          statusMessage: `동일 대상 반복 처리 감지(${tid}) | url=${location.href} | rows=${findListRows().length}`
        });
        processingLock = false;
        return;
      }

      const preview = (picked.target.textPreview || "").slice(0, 100);
      await setJob({
        currentTargetId: tid,
        currentPreview: preview,
        deletingCurrentId: tid,
        clickIssuedForId: tid,
        awaitingReload: true,
        awaitingReloadSince: Date.now(),
        lastAttemptId: tid,
        sameTargetStreak,
        status: "running",
        statusMessage: `삭제 클릭: ${preview || tid}`
      });

      try {
        clickedThisPageLoad = true;
        writeClickSession(tid);
        await clickNativeDelete(picked.btn);
        startReloadWatch(tid);
      } catch (err) {
        clickedThisPageLoad = false;
        try {
          sessionStorage.removeItem(CLICK_SESSION_KEY);
        } catch (_) {
          /* ignore */
        }
        await markFailure(picked.target, String(err && err.message ? err.message : err));
        processingLock = false;
        scheduleProcess("click-error");
      }
    } catch (err) {
      await setJob({
        running: false,
        status: "error",
        statusMessage: `${String(err && err.message ? err.message : err)} | url=${location.href}`
      });
      setAutomation(false);
      processingLock = false;
    }
  }

  function scheduleProcess(reason) {
    setTimeout(() => processQueue(reason), 50);
  }

  function startPausedPoll() {
    if (pausedPollTimer) return;
    pausedPollTimer = setInterval(async () => {
      const job = await getJob();
      if (!job) return;
      if (!job.running || job.stopped) {
        clearInterval(pausedPollTimer);
        pausedPollTimer = null;
        return;
      }
      if (!job.paused) {
        clearInterval(pausedPollTimer);
        pausedPollTimer = null;
        scheduleProcess("resume");
      }
    }, 500);
  }

  // ---------- UI ----------

  function updateSelectedCount() {
    const n = document.querySelectorAll(
      `#${UI_ROOT_ID} ~ ul.cont_listbox input.${CB_CLASS}:checked, ul.cont_listbox input.${CB_CLASS}:checked, [${ROW_ID_ATTR}] input.${CB_CLASS}:checked`
    ).length;
    // simpler:
    const checked = findListRows().filter((r) => r.querySelector(`input.${CB_CLASS}:checked`)).length;
    const el = document.getElementById("dc-tool-selected-count");
    if (el) el.textContent = String(checked);
    return checked;
  }

  function setAllChecks(on) {
    findListRows().forEach((row) => {
      const cb = row.querySelector(`input.${CB_CLASS}`);
      if (cb) cb.checked = !!on;
    });
    updateSelectedCount();
  }

  function ensureRowCheckbox(row, index) {
    if (!row || row.getAttribute(LI_MARK) === "1") return;
    ensureRowId(row, index);
    if (row.querySelector(`input.${CB_CLASS}`)) {
      row.setAttribute(LI_MARK, "1");
      return;
    }
    const wrap = document.createElement("label");
    wrap.className = "dc-delete-tool-cb-wrap";
    wrap.title = "삭제 선택";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = CB_CLASS;
    cb.addEventListener("click", (e) => e.stopPropagation());
    cb.addEventListener("change", () => updateSelectedCount());
    wrap.appendChild(cb);
    row.insertBefore(wrap, row.firstChild);
    row.setAttribute(LI_MARK, "1");
  }

  function injectRowCheckboxes() {
    findListRows().forEach((row, i) => ensureRowCheckbox(row, i));
    updateSelectedCount();
  }

  function getSelectedTargets() {
    const out = [];
    findListRows().forEach((row, i) => {
      const cb = row.querySelector(`input.${CB_CLASS}:checked`);
      if (!cb) return;
      out.push(extractRowMeta(row, i));
    });
    return out;
  }

  function ensureToolbar(contentType) {
    if (document.getElementById(UI_ROOT_ID)) {
      const label = document.getElementById("dc-tool-selected-label");
      if (label) label.textContent = contentType === "comment" ? "선택 댓글 삭제" : "선택한 글 삭제";
      return;
    }
    const det = getDetection();
    const list = (det && det.listEl) || document.querySelector("ul.cont_listbox");
    if (!list || !list.parentElement) return;

    const kind = labelForType(contentType);
    const bar = document.createElement("div");
    bar.id = UI_ROOT_ID;
    bar.innerHTML = `
      <div class="dc-tool-row">
        <button type="button" class="dc-tool-btn" data-act="select-all">전체 선택</button>
        <button type="button" class="dc-tool-btn" data-act="select-none">전체 해제</button>
        <span class="dc-tool-count">선택됨: <strong id="dc-tool-selected-count">0</strong>개</span>
        <button type="button" class="dc-tool-btn dc-tool-danger" data-act="delete-selected" id="dc-tool-selected-label">선택 ${kind} 삭제</button>
      </div>
      <p class="dc-tool-note">원래 삭제(X) 버튼을 순서대로 클릭합니다 · 복구가 어려울 수 있습니다.</p>
    `;
    list.parentElement.insertBefore(bar, list);

    bar.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-act]");
      if (!btn) return;
      const act = btn.getAttribute("data-act");
      if (act === "select-all") setAllChecks(true);
      if (act === "select-none") setAllChecks(false);
      if (act === "delete-selected") {
        const targets = getSelectedTargets();
        if (!targets.length) {
          alert(`선택된 ${kind}이(가) 없습니다.`);
          return;
        }
        if (
          !confirm(
            `선택한 ${kind} ${targets.length}개를 삭제합니다.\n삭제된 항목은 복구하기 어려울 수 있습니다.`
          )
        ) {
          return;
        }
        beginJob({ mode: "selected", targets });
      }
    });
  }

  async function syncPageInfoToJob() {
    const page = getPageType();
    const rows = page && page.contentType ? findListRows() : [];
    await setJob({
      isSupportedPage: !!(page && page.contentType),
      contentType: page ? page.contentType : null,
      gallogId: page ? page.gallogId : null,
      pageItemCount: rows.length,
      totalCount: readTotalCount(),
      isPostingPage: !!(page && page.contentType === "posting"),
      pagePostCount: rows.length,
      totalPostCount: readTotalCount()
    });
  }

  function getPageInfo() {
    const page = getPageType();
    const det = getDetection();
    const rows = page && page.contentType ? findListRows() : [];
    return {
      ok: true,
      isSupportedPage: !!(page && page.contentType),
      isPostingPage: !!(page && page.contentType === "posting"),
      isCommentPage: !!(page && page.contentType === "comment"),
      contentType: page ? page.contentType : null,
      gallogId: page ? page.gallogId : null,
      pageUrl: location.href,
      pageItemCount: rows.length,
      pagePostCount: rows.length,
      totalCount: readTotalCount(),
      totalPostCount: readTotalCount(),
      selectedCount: getSelectedTargets().length,
      detection: det
        ? {
            listSelector: det.listSelector,
            rowSelector: det.rowSelector,
            deleteButtonSelector: det.deleteButtonSelector,
            rowCount: rows.length
          }
        : null
    };
  }

  async function beginJob({ mode, targets }) {
    const page = getPageType();
    if (!page || !page.contentType) {
      alert("갤로그 게시글(/posting) 또는 댓글(/comment) 페이지에서만 사용할 수 있습니다.");
      return { ok: false, error: "unsupported_page" };
    }

    const existing = await getJob();
    if (existing && existing.running) {
      alert("이미 삭제 작업이 진행 중입니다.");
      return { ok: false, error: "already_running" };
    }

    const kind = labelForType(page.contentType);
    let pendingTargets = [];
    let initialTotal = 0;

    if (mode === "test5") {
      pendingTargets = findListRows()
        .slice(0, 5)
        .map((row, i) => extractRowMeta(row, i));
      initialTotal = pendingTargets.length;
      if (!pendingTargets.length) {
        alert(`삭제할 ${kind}이(가) 없습니다.`);
        return { ok: false, error: "empty" };
      }
    } else if (mode === "selected") {
      pendingTargets = (targets || []).map((t) => ({
        ...t,
        textPreview: String(t.textPreview || "").slice(0, 100)
      }));
      initialTotal = pendingTargets.length;
      if (!pendingTargets.length) {
        alert(`선택된 ${kind}이(가) 없습니다.`);
        return { ok: false, error: "empty" };
      }
    } else if (mode === "all") {
      pendingTargets = [];
      initialTotal = readTotalCount() || findListRows().length;
      if (!findListRows().length) {
        alert(`삭제할 ${kind}이(가) 없습니다.`);
        return { ok: false, error: "empty" };
      }
    }

    const delayMs = (existing && existing.delayMs) || DELAY.safe;

    await setJob({
      contentType: page.contentType,
      mode,
      running: true,
      paused: false,
      stopped: false,
      pendingTargets,
      selectedTargets: pendingTargets,
      failedTargets: [],
      successCount: 0,
      failCount: 0,
      initialTotal,
      totalTarget: initialTotal,
      currentTargetId: null,
      currentPreview: "",
      clickIssuedForId: null,
      deletingCurrentId: null,
      awaitingReload: false,
      awaitingReloadSince: null,
      consecutiveFails: 0,
      lastAttemptId: null,
      sameTargetStreak: 0,
      delayMs,
      startedAt: new Date().toISOString(),
      status: "running",
      statusMessage: `${kind} 삭제 시작`,
      gallogId: page.gallogId,
      isSupportedPage: true,
      pageItemCount: findListRows().length,
      totalCount: readTotalCount()
    });

    scheduleProcess("start");
    return { ok: true };
  }

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    (async () => {
      try {
        const page = getPageType();
        const kind = page && page.contentType ? labelForType(page.contentType) : "항목";

        switch (message?.type) {
          case "GET_PAGE_INFO": {
            await syncPageInfoToJob();
            logDetection();
            sendResponse(getPageInfo());
            break;
          }
          case "START_TEST5": {
            if (
              !confirm(
                page && page.contentType === "comment"
                  ? "댓글 5개를 실제로 삭제합니다.\n삭제된 댓글은 복구하기 어렵습니다."
                  : "게시글 5개를 실제로 삭제합니다.\n삭제된 게시글은 복구하기 어려울 수 있습니다."
              )
            ) {
              sendResponse({ ok: false, error: "cancelled" });
              break;
            }
            sendResponse(await beginJob({ mode: "test5" }));
            break;
          }
          case "START_SELECTED": {
            const targets = getSelectedTargets();
            if (!targets.length) {
              sendResponse({ ok: false, error: `선택된 ${kind}이(가) 없습니다.` });
              break;
            }
            if (
              !confirm(
                `선택한 ${kind} ${targets.length}개를 삭제합니다.\n삭제된 항목은 복구하기 어려울 수 있습니다.`
              )
            ) {
              sendResponse({ ok: false, error: "cancelled" });
              break;
            }
            sendResponse(await beginJob({ mode: "selected", targets }));
            break;
          }
          case "START_ALL": {
            sendResponse(await beginJob({ mode: "all" }));
            break;
          }
          case "PAUSE": {
            clearReloadWatch();
            setAutomation(false);
            await setJob({
              paused: true,
              status: "paused",
              statusMessage: "일시정지",
              awaitingReload: false,
              deletingCurrentId: null
            });
            startPausedPoll();
            sendResponse({ ok: true });
            break;
          }
          case "RESUME": {
            await setJob({
              paused: false,
              stopped: false,
              running: true,
              status: "running",
              statusMessage: "재개"
            });
            scheduleProcess("resume-msg");
            sendResponse({ ok: true });
            break;
          }
          case "STOP": {
            clearReloadWatch();
            setAutomation(false);
            await setJob({
              stopped: true,
              running: false,
              paused: false,
              status: "ready",
              statusMessage: "중지됨",
              currentTargetId: null,
              currentPreview: "",
              clickIssuedForId: null,
              deletingCurrentId: null,
              awaitingReload: false
            });
            sendResponse({ ok: true });
            break;
          }
          case "SET_DELAY_MODE": {
            const delayMs = message.mode === "normal" ? DELAY.normal : DELAY.safe;
            await setJob({ delayMs });
            sendResponse({ ok: true, delayMs });
            break;
          }
          case "NAVIGATE_CONTENT_TYPE": {
            const p = getPageType();
            const gallogId = (p && p.gallogId) || message.gallogId;
            const want = message.contentType;
            if (!gallogId || (want !== "posting" && want !== "comment")) {
              sendResponse({ ok: false, error: "이동할 갤로그 ID를 알 수 없습니다." });
              break;
            }
            const job = await getJob();
            if (job && job.running) {
              sendResponse({ ok: false, error: "삭제 작업 중에는 탭을 바꿀 수 없습니다. 먼저 중지하세요." });
              break;
            }
            location.assign(`${location.origin}/${encodeURIComponent(gallogId)}/${want}`);
            sendResponse({ ok: true });
            break;
          }
          default:
            sendResponse({ ok: false, error: "unknown" });
        }
      } catch (err) {
        sendResponse({ ok: false, error: String(err && err.message ? err.message : err) });
      }
    })();
    return true;
  });

  function bootUi() {
    const page = getPageType();
    if (!page || !page.contentType) {
      syncPageInfoToJob();
      return;
    }
    getDetection();
    logDetection();
    ensureToolbar(page.contentType);
    injectRowCheckboxes();
    syncPageInfoToJob();

    const det = getDetection();
    const list = det && det.listEl;
    if (list && !list.__dcObserved) {
      list.__dcObserved = true;
      const mo = new MutationObserver(() => {
        injectRowCheckboxes();
        syncPageInfoToJob();
      });
      mo.observe(list, { childList: true, subtree: true });
    }
  }

  async function bootAutomation() {
    const job = await getJob();
    if (!job || job.stopped) return;
    if (job.running && !job.paused) {
      scheduleProcess("boot");
    } else if (job.running && job.paused) {
      startPausedPoll();
    }
  }

  injectPageHook();

  function onReady() {
    bootUi();
    bootAutomation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady, { once: true });
  } else {
    onReady();
  }

  window.addEventListener("load", () => {
    bootUi();
    bootAutomation();
  });
})();
