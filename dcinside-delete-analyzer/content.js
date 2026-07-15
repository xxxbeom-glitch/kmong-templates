/**
 * Galalog posting page content script.
 * - Checkbox / selection UI
 * - Sequential delete loop (survives popup close)
 * - Talks to page-hook for dynamic auth tokens
 */

(function () {
  "use strict";

  const PAGE_HOOK_SOURCE = "dc-delete-tool-page-hook";
  const CONTENT_SOURCE = "dc-delete-tool-content";
  const UI_ROOT_ID = "dc-delete-tool-bar";
  const CB_CLASS = "dc-delete-tool-cb";
  const LI_MARK = "data-dc-tool-ready";

  const DELAY = { safe: 2000, normal: 1200 };

  let jobRunning = false;
  let authRequestSeq = 0;
  const pendingAuth = new Map();

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function parseGallog() {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    const gallogId = parts[0];
    const section = parts[1];
    if (section !== "posting") return null;
    return { gallogId, section };
  }

  function buildDeleteUrl(gallogId) {
    return `${location.origin}/${encodeURIComponent(gallogId)}/ajax/log_list_ajax/delete`;
  }

  function getListItems() {
    return Array.from(document.querySelectorAll("ul.cont_listbox > li[data-no]"));
  }

  function getPageNos() {
    return getListItems()
      .map((li) => String(li.getAttribute("data-no") || "").trim())
      .filter(Boolean);
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
      (document.head || document.documentElement).appendChild(s);
    } catch (_) {
      /* ignore */
    }
  }

  function requestAuthFromPage(timeoutMs) {
    return new Promise((resolve) => {
      const requestId = `auth_${Date.now()}_${++authRequestSeq}`;
      const timer = setTimeout(() => {
        pendingAuth.delete(requestId);
        resolve({ ok: false, missing: ["timeout"], error: "auth_timeout" });
      }, timeoutMs || 3000);

      pendingAuth.set(requestId, (auth) => {
        clearTimeout(timer);
        resolve(auth);
      });

      window.postMessage(
        { source: CONTENT_SOURCE, action: "RESOLVE_AUTH", requestId },
        location.origin
      );
    });
  }

  window.addEventListener("message", (event) => {
    try {
      if (event.source !== window) return;
      const data = event.data;
      if (!data || data.source !== PAGE_HOOK_SOURCE) return;
      if (data.action === "RESOLVE_AUTH_RESULT" && data.requestId) {
        const cb = pendingAuth.get(data.requestId);
        if (cb) {
          pendingAuth.delete(data.requestId);
          cb(data.auth || { ok: false });
        }
      }
    } catch (_) {
      /* ignore */
    }
  });

  async function resolveAuth() {
    const auth = await requestAuthFromPage(3500);
    if (!auth || !auth.ok) {
      return {
        ok: false,
        message:
          "디시인사이드 인증값을 확인하지 못했습니다.\n페이지를 새로고침한 후 다시 시도하세요."
      };
    }
    // Soft log sources only (not secret values)
    try {
      console.info("[DCDeleteTool] auth sources", auth.sources || {});
    } catch (_) {
      /* ignore */
    }
    return { ok: true, auth };
  }

  function updateSelectedCount() {
    const n = document.querySelectorAll(`ul.cont_listbox > li[data-no] input.${CB_CLASS}:checked`).length;
    const el = document.getElementById("dc-tool-selected-count");
    if (el) el.textContent = String(n);
    return n;
  }

  function setAllChecks(on) {
    document.querySelectorAll(`ul.cont_listbox > li[data-no] input.${CB_CLASS}`).forEach((cb) => {
      cb.checked = !!on;
    });
    updateSelectedCount();
  }

  function ensureRowCheckbox(li) {
    if (!li || li.getAttribute(LI_MARK) === "1") return;
    if (li.querySelector(`input.${CB_CLASS}`)) {
      li.setAttribute(LI_MARK, "1");
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
    li.insertBefore(wrap, li.firstChild);
    li.setAttribute(LI_MARK, "1");
  }

  function injectRowCheckboxes() {
    getListItems().forEach(ensureRowCheckbox);
    updateSelectedCount();
  }

  function ensureToolbar() {
    if (document.getElementById(UI_ROOT_ID)) return;

    const list = document.querySelector("ul.cont_listbox");
    if (!list || !list.parentElement) return;

    const bar = document.createElement("div");
    bar.id = UI_ROOT_ID;
    bar.innerHTML = `
      <div class="dc-tool-row">
        <button type="button" class="dc-tool-btn" data-act="select-all">전체 선택</button>
        <button type="button" class="dc-tool-btn" data-act="select-none">전체 해제</button>
        <span class="dc-tool-count">선택됨: <strong id="dc-tool-selected-count">0</strong>개</span>
        <button type="button" class="dc-tool-btn dc-tool-danger" data-act="delete-selected">선택한 글 삭제</button>
      </div>
      <p class="dc-tool-note">확장프로그램 전용 UI · 실제 삭제는 복구가 어려울 수 있습니다.</p>
    `;
    list.parentElement.insertBefore(bar, list);

    bar.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-act]");
      if (!btn) return;
      const act = btn.getAttribute("data-act");
      if (act === "select-all") setAllChecks(true);
      if (act === "select-none") setAllChecks(false);
      if (act === "delete-selected") {
        const nos = getSelectedNos();
        if (!nos.length) {
          alert("선택된 게시글이 없습니다.");
          return;
        }
        if (!confirm(`선택한 ${nos.length}개의 게시글을 삭제합니다.\n삭제된 게시글은 복구하기 어려울 수 있습니다.`)) {
          return;
        }
        startJob({ mode: "selected", nos });
      }
    });
  }

  function getSelectedNos() {
    return Array.from(
      document.querySelectorAll(`ul.cont_listbox > li[data-no] input.${CB_CLASS}:checked`)
    )
      .map((cb) => {
        const li = cb.closest("li[data-no]");
        return li ? String(li.getAttribute("data-no") || "").trim() : "";
      })
      .filter(Boolean);
  }

  function removeRowByNo(no) {
    const target = String(no);
    const li = getListItems().find((el) => String(el.getAttribute("data-no") || "") === target);
    if (li) li.remove();
    updateSelectedCount();
    try {
      const totalEl =
        document.querySelector(".cont_head .num") ||
        document.querySelector(".choice_sect span.num");
      if (totalEl) {
        const cur = parseInt(String(totalEl.textContent || "").replace(/[^\d]/g, ""), 10);
        if (Number.isFinite(cur) && cur > 0) {
          const next = cur - 1;
          totalEl.textContent = String(totalEl.textContent || "").replace(String(cur), String(next));
        }
      }
    } catch (_) {
      /* ignore */
    }
  }

  function judgeSuccess(status, payload) {
    if (status === 401 || status === 403 || status === 429) {
      return { ok: false, fatal: true, status, reason: `http_${status}` };
    }
    if (status < 200 || status >= 300) {
      return { ok: false, fatal: false, status, reason: `http_${status}` };
    }

    let data = payload;
    if (typeof payload === "string") {
      try {
        data = JSON.parse(payload);
      } catch (_) {
        data = { raw: payload };
      }
    }

    try {
      console.info("[DCDeleteTool] delete response", { status, data });
    } catch (_) {
      /* ignore */
    }

    if (data && typeof data === "object") {
      const result = data.result != null ? String(data.result) : "";
      const msg = data.msg != null ? String(data.msg) : "";
      if (result === "success") return { ok: true, status, data };
      if (result === "captcha") {
        return { ok: false, fatal: true, status, reason: "captcha", message: msg };
      }
      if (result === "fail") {
        return { ok: false, fatal: /session|login|로그인|권한/i.test(msg), status, reason: msg || "fail" };
      }
      // Some endpoints may return boolean-ish
      if (data.success === true || data === true) return { ok: true, status, data };
    }

    // Fallback: HTTP 200 without clear signal — provisional success; caller may verify DOM
    return { ok: true, status, provisional: true, data };
  }

  async function deleteOne(no, gallogId) {
    const resolved = await resolveAuth();
    if (!resolved.ok) {
      return {
        ok: false,
        fatal: true,
        reason: "auth_missing",
        message: resolved.message
      };
    }
    const { auth } = resolved;
    const url = buildDeleteUrl(gallogId);
    const params = new URLSearchParams();
    params.set("no", String(no));
    params.set("c_k_v", auth.c_k_v);
    params.set("ci_t", auth.ci_t);
    params.set("service_code", auth.service_code);

    let res;
    let text;
    try {
      res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest"
        },
        body: params.toString()
      });
      text = await res.text();
    } catch (err) {
      return { ok: false, fatal: false, reason: String(err && err.message ? err.message : err) };
    }

    return judgeSuccess(res.status, text);
  }

  async function refreshListFromServer() {
    try {
      const res = await fetch(location.href, { credentials: "include", cache: "no-store" });
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const newList = doc.querySelector("ul.cont_listbox");
      const oldList = document.querySelector("ul.cont_listbox");
      if (newList && oldList) {
        oldList.innerHTML = newList.innerHTML;
        oldList.querySelectorAll(`li[${LI_MARK}]`).forEach((li) => li.removeAttribute(LI_MARK));
        injectRowCheckboxes();
      }
      const newNum =
        doc.querySelector(".cont_head .num") || doc.querySelector(".choice_sect .num");
      const oldNum =
        document.querySelector(".cont_head .num") || document.querySelector(".choice_sect .num");
      if (newNum && oldNum) oldNum.textContent = newNum.textContent;
      return getPageNos();
    } catch (err) {
      console.warn("[DCDeleteTool] list refresh failed", err);
      return getPageNos();
    }
  }

  async function waitIfPausedOrStopped() {
    while (true) {
      const job = await getJob();
      if (!job) return "abort";
      if (job.stopped || !job.running) return "stop";
      if (job.paused) {
        await sleep(400);
        continue;
      }
      return "go";
    }
  }

  async function runDeleteLoop(initialNos, options) {
    if (jobRunning) return;
    jobRunning = true;

    const gallog = parseGallog();
    if (!gallog) {
      await setJob({
        running: false,
        status: "error",
        statusMessage: "갤로그 게시글(posting) 페이지가 아닙니다."
      });
      jobRunning = false;
      return;
    }

    const mode = options.mode || "selected";
    const delayMs = options.delayMs || DELAY.safe;
    let queue = initialNos.slice();
    let successCount = options.resumeSuccess || 0;
    let failCount = options.resumeFail || 0;
    let consecutiveFails = 0;
    const failedNos = Array.isArray(options.resumeFailedNos)
      ? options.resumeFailedNos.slice()
      : [];
    const totalTarget =
      mode === "all" ? options.totalTarget || readTotalCount() || queue.length : queue.length;

    await setJob({
      running: true,
      paused: false,
      stopped: false,
      mode,
      delayMs,
      totalTarget,
      successCount,
      failCount,
      failedNos: failedNos.slice(-200),
      currentNo: null,
      startedAt: options.resumeStartedAt || new Date().toISOString(),
      status: "running",
      statusMessage: options.resuming ? "새로고침 후 이어서 삭제" : "",
      consecutiveFails: 0,
      gallogId: gallog.gallogId,
      isPostingPage: true
    });

    try {
      while (true) {
        const gate = await waitIfPausedOrStopped();
        if (gate === "stop" || gate === "abort") break;

        if (!queue.length) {
          if (mode === "all") {
            await setJob({ statusMessage: "목록 갱신 중…" });
            const next = await refreshListFromServer();
            if (!next.length) break;
            queue = next.slice();
          } else {
            break;
          }
        }

        const no = queue.shift();
        await setJob({ currentNo: no, statusMessage: `삭제 중: ${no}` });

        const result = await deleteOne(no, gallog.gallogId);

        if (result.ok) {
          successCount += 1;
          consecutiveFails = 0;
          removeRowByNo(no);
          await setJob({
            successCount,
            consecutiveFails: 0,
            currentNo: no
          });
        } else {
          failCount += 1;
          consecutiveFails += 1;
          failedNos.push(String(no));
          await setJob({
            failCount,
            failedNos: failedNos.slice(-200),
            consecutiveFails,
            currentNo: no,
            statusMessage: result.message || result.reason || "삭제 실패"
          });

          if (result.fatal || consecutiveFails >= 5) {
            await setJob({
              running: false,
              status: "error",
              statusMessage:
                result.message ||
                "로그인 세션 만료 또는 서버 제한 가능성. 작업을 중지했습니다."
            });
            break;
          }
        }

        const gate2 = await waitIfPausedOrStopped();
        if (gate2 === "stop" || gate2 === "abort") break;

        // jittered delay — never aggressive
        const wait = delayMs + Math.floor(Math.random() * 400);
        await sleep(wait);
      }

      const job = await getJob();
      if (job && job.running && !job.stopped && job.status !== "error") {
        // Final refresh for consistency
        if (mode === "all" || mode === "selected" || mode === "test5") {
          await refreshListFromServer();
        }
        await setJob({
          running: false,
          paused: false,
          status: "done",
          statusMessage: "완료",
          currentNo: null,
          pagePostCount: getPageNos().length,
          totalPostCount: readTotalCount()
        });
      } else if (job && job.stopped) {
        await setJob({
          running: false,
          status: "ready",
          statusMessage: "사용자 중지",
          currentNo: null
        });
      }
    } catch (err) {
      await setJob({
        running: false,
        status: "error",
        statusMessage: String(err && err.message ? err.message : err)
      });
    } finally {
      jobRunning = false;
      syncPageInfoToJob();
    }
  }

  async function startJob({ mode, nos }) {
    const gallog = parseGallog();
    if (!gallog) {
      alert("갤로그 게시글(posting) 페이지에서만 사용할 수 있습니다.");
      return;
    }

    const job = await getJob();
    if (job && job.running) {
      alert("이미 삭제 작업이 진행 중입니다.");
      return;
    }

    const delayMs = (job && job.delayMs) || DELAY.safe;
    let list = (nos || []).map(String).filter(Boolean);

    if (mode === "test5") {
      list = getPageNos().slice(0, 5);
      if (!list.length) {
        alert("삭제할 게시글이 없습니다.");
        return;
      }
      if (
        !confirm(
          "게시글 5개를 실제로 삭제합니다.\n삭제된 게시글은 복구하기 어려울 수 있습니다."
        )
      ) {
        return;
      }
    }

    if (mode === "all") {
      // confirmations are done in popup; here just collect first page
      list = getPageNos();
      if (!list.length) {
        alert("삭제할 게시글이 없습니다.");
        return;
      }
    }

    if (mode === "selected") {
      if (!list.length) {
        alert("선택된 게시글이 없습니다.");
        return;
      }
    }

    // Preflight auth
    const auth = await resolveAuth();
    if (!auth.ok) {
      alert(auth.message);
      await setJob({ status: "error", statusMessage: auth.message });
      return;
    }

    runDeleteLoop(list, {
      mode,
      delayMs,
      totalTarget: mode === "all" ? readTotalCount() || list.length : list.length
    });
  }

  async function syncPageInfoToJob() {
    const gallog = parseGallog();
    const pagePostCount = getPageNos().length;
    const totalPostCount = readTotalCount();
    await setJob({
      isPostingPage: !!gallog,
      gallogId: gallog ? gallog.gallogId : null,
      pagePostCount,
      totalPostCount
    });
  }

  function getPageInfo() {
    const gallog = parseGallog();
    return {
      ok: true,
      isPostingPage: !!gallog,
      gallogId: gallog ? gallog.gallogId : null,
      pageUrl: location.href,
      pagePostCount: getPageNos().length,
      totalPostCount: readTotalCount(),
      selectedCount: getSelectedNos().length
    };
  }

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    (async () => {
      try {
        switch (message?.type) {
          case "GET_PAGE_INFO": {
            await syncPageInfoToJob();
            sendResponse(getPageInfo());
            break;
          }
          case "START_TEST5": {
            await startJob({ mode: "test5" });
            sendResponse({ ok: true });
            break;
          }
          case "START_SELECTED": {
            const nos = getSelectedNos();
            if (!nos.length) {
              sendResponse({ ok: false, error: "선택된 게시글이 없습니다." });
              break;
            }
            if (
              !confirm(
                `선택한 ${nos.length}개의 게시글을 삭제합니다.\n삭제된 게시글은 복구하기 어려울 수 있습니다.`
              )
            ) {
              sendResponse({ ok: false, error: "cancelled" });
              break;
            }
            await startJob({ mode: "selected", nos });
            sendResponse({ ok: true });
            break;
          }
          case "START_ALL": {
            await startJob({ mode: "all" });
            sendResponse({ ok: true });
            break;
          }
          case "PAUSE": {
            await setJob({ paused: true, status: "paused", statusMessage: "일시정지" });
            sendResponse({ ok: true });
            break;
          }
          case "RESUME": {
            await setJob({ paused: false, status: "running", statusMessage: "재개" });
            sendResponse({ ok: true });
            break;
          }
          case "STOP": {
            await setJob({
              stopped: true,
              running: false,
              paused: false,
              status: "ready",
              statusMessage: "중지됨"
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
          default:
            sendResponse({ ok: false, error: "unknown" });
        }
      } catch (err) {
        sendResponse({ ok: false, error: String(err && err.message ? err.message : err) });
      }
    })();
    return true;
  });

  async function maybeResumeJob() {
    const job = await getJob();
    if (!job) return;
    // Explicit stop must never auto-restart
    if (job.stopped || job.status === "error" || job.status === "done") return;
    if (!(job.running && !job.paused)) return;
    if (job.mode !== "all") return;
    if (!parseGallog()) return;
    if (jobRunning) return;

    const nos = getPageNos();
    if (!nos.length) {
      await setJob({
        running: false,
        status: "done",
        statusMessage: "완료 (남은 글 없음)"
      });
      return;
    }

    runDeleteLoop(nos, {
      mode: "all",
      delayMs: job.delayMs || DELAY.safe,
      totalTarget: job.totalTarget || readTotalCount() || nos.length,
      resumeSuccess: job.successCount || 0,
      resumeFail: job.failCount || 0,
      resumeFailedNos: job.failedNos || [],
      resumeStartedAt: job.startedAt,
      resuming: true
    });
  }

  function bootUi() {
    if (!parseGallog()) {
      syncPageInfoToJob();
      return;
    }
    injectPageHook();
    ensureToolbar();
    injectRowCheckboxes();
    syncPageInfoToJob();

    // Observe list mutations (AJAX pagination etc.)
    const list = document.querySelector("ul.cont_listbox");
    if (list && !list.__dcObserved) {
      list.__dcObserved = true;
      const mo = new MutationObserver(() => {
        injectRowCheckboxes();
        syncPageInfoToJob();
      });
      mo.observe(list, { childList: true, subtree: true });
    }
  }

  injectPageHook();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      bootUi();
      maybeResumeJob();
    });
  } else {
    bootUi();
    maybeResumeJob();
  }
})();
