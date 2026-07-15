/**
 * Galalog posting page content script.
 * Delete engine: click native button.btn_delete.btn_listdel (no direct API).
 * Job state survives reloads via chrome.storage.local.
 */

(function () {
  "use strict";

  const PAGE_HOOK_SOURCE = "dc-delete-tool-page-hook";
  const CONTENT_SOURCE = "dc-delete-tool-content";
  const UI_ROOT_ID = "dc-delete-tool-bar";
  const CB_CLASS = "dc-delete-tool-cb";
  const LI_MARK = "data-dc-tool-ready";
  const DELETE_BTN_SEL = "button.btn_delete.btn_listdel";

  const DELAY = { safe: 1500, normal: 1000 };
  const RELOAD_TIMEOUT_MS = 10000;
  const MAX_CONSECUTIVE_FAILS = 3;

  let processingLock = false;
  let reloadWatchTimer = null;
  let pausedPollTimer = null;
  /** True only if we already clicked delete on this page instance */
  let clickedThisPageLoad = false;

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function parseGallog() {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    if (parts[1] !== "posting") return null;
    return { gallogId: parts[0], section: "posting" };
  }

  function getListItems() {
    return Array.from(document.querySelectorAll("ul.cont_listbox > li[data-no]"));
  }

  function getPageNos() {
    return getListItems()
      .map((li) => String(li.getAttribute("data-no") || "").trim())
      .filter(Boolean);
  }

  function findRowByNo(no) {
    const target = String(no);
    return getListItems().find((li) => String(li.getAttribute("data-no") || "") === target) || null;
  }

  function findDeleteButton(li) {
    if (!li) return null;
    return (
      li.querySelector(DELETE_BTN_SEL) ||
      li.querySelector("button.btn_delete") ||
      li.querySelector("button.btn_listdel")
    );
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

  function startReloadWatch(no) {
    clearReloadWatch();
    reloadWatchTimer = setTimeout(async () => {
      const job = await getJob();
      if (!job || !job.running || job.paused || job.stopped) return;
      if (!job.awaitingReload) return;
      if (String(job.clickIssuedForNo || "") !== String(no)) return;

      await markFailure(
        no,
        "삭제 후 페이지 새로고침이 10초 안에 발생하지 않았습니다."
      );
      // Stay on page — try continue if not stopped
      processingLock = false;
      scheduleProcess("reload-timeout");
    }, RELOAD_TIMEOUT_MS);
  }

  async function markSuccess(no) {
    try {
      sessionStorage.removeItem(CLICK_SESSION_KEY);
    } catch (_) {
      /* ignore */
    }
    const job = await getJob();
    if (!job) return;
    const pending = Array.isArray(job.pendingNos) ? job.pendingNos.map(String) : [];
    const nextPending = pending.filter((n) => n !== String(no));
    const successCount = (job.successCount || 0) + 1;
    await setJob({
      pendingNos: nextPending,
      successCount,
      consecutiveFails: 0,
      currentNo: null,
      clickIssuedForNo: null,
      deletingCurrentNo: null,
      awaitingReload: false,
      awaitingReloadSince: null,
      statusMessage: `삭제 성공: ${no}`
    });
    setAutomation(false);
  }

  async function markFailure(no, message) {
    try {
      sessionStorage.removeItem(CLICK_SESSION_KEY);
    } catch (_) {
      /* ignore */
    }
    const job = await getJob();
    if (!job) return;
    const pending = Array.isArray(job.pendingNos) ? job.pendingNos.map(String) : [];
    const nextPending =
      job.mode === "all" ? pending : pending.filter((n) => n !== String(no));
    const failCount = (job.failCount || 0) + 1;
    const consecutiveFails = (job.consecutiveFails || 0) + 1;
    const failedNos = Array.isArray(job.failedNos) ? job.failedNos.slice() : [];
    if (no != null) failedNos.push(String(no));

    const shouldStop = consecutiveFails >= MAX_CONSECUTIVE_FAILS;
    await setJob({
      pendingNos: nextPending,
      failCount,
      failedNos: failedNos.slice(-200),
      consecutiveFails,
      currentNo: null,
      clickIssuedForNo: null,
      deletingCurrentNo: null,
      awaitingReload: false,
      awaitingReloadSince: null,
      running: shouldStop ? false : job.running,
      status: shouldStop ? "error" : job.status,
      statusMessage: shouldStop
        ? `연속 ${MAX_CONSECUTIVE_FAILS}회 실패로 중지. ${message || ""}`
        : message || `삭제 실패: ${no}`
    });
    setAutomation(false);
  }

  const CLICK_SESSION_KEY = "dc_delete_tool_click_pending";

  function writeClickSession(no) {
    try {
      sessionStorage.setItem(
        CLICK_SESSION_KEY,
        JSON.stringify({ no: String(no), t: Date.now() })
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

  /**
   * After reload: resolve previous click result, then continue.
   */
  async function reconcileAfterLoad(job) {
    const sessionClick = takeClickSession();
    const issued = sessionClick
      ? String(sessionClick.no)
      : job.clickIssuedForNo != null
        ? String(job.clickIssuedForNo)
        : null;

    if (!issued) {
      if (job.awaitingReload || job.clickIssuedForNo || job.deletingCurrentNo) {
        await setJob({
          awaitingReload: false,
          clickIssuedForNo: null,
          deletingCurrentNo: null,
          currentNo: null
        });
        return await getJob();
      }
      return job;
    }

    const stillThere = !!findRowByNo(issued);

    if (!stillThere) {
      await markSuccess(issued);
      return await getJob();
    }

    // Reload happened after click (session key present) but row remains → fail
    if (sessionClick) {
      await markFailure(issued, `삭제 후에도 목록에 남아 있음: ${issued}`);
      return await getJob();
    }

    // Stale storage without a real navigation click — clear and continue
    await setJob({
      awaitingReload: false,
      clickIssuedForNo: null,
      deletingCurrentNo: null,
      currentNo: null
    });
    return await getJob();
  }

  async function finishIfDone(job) {
    if (!job || !job.running) return true;

    if (job.mode === "all") {
      if (getListItems().length === 0) {
        await setJob({
          running: false,
          paused: false,
          status: "done",
          statusMessage: "전체 삭제 완료",
          currentNo: null,
          clickIssuedForNo: null,
          deletingCurrentNo: null,
          awaitingReload: false,
          pagePostCount: 0,
          totalPostCount: readTotalCount()
        });
        setAutomation(false);
        return true;
      }
      return false;
    }

    const pending = Array.isArray(job.pendingNos) ? job.pendingNos : [];
    if (pending.length === 0) {
      await setJob({
        running: false,
        paused: false,
        status: "done",
        statusMessage: job.mode === "test5" ? "테스트 5개 삭제 완료" : "선택 삭제 완료",
        currentNo: null,
        clickIssuedForNo: null,
        deletingCurrentNo: null,
        awaitingReload: false,
        pagePostCount: getPageNos().length,
        totalPostCount: readTotalCount()
      });
      setAutomation(false);
      return true;
    }
    return false;
  }

  function pickNextTarget(job) {
    if (job.mode === "all") {
      const first = getListItems()[0];
      if (!first) return null;
      const no = String(first.getAttribute("data-no") || "").trim();
      const btn = findDeleteButton(first);
      if (!no || !btn) return null;
      return { no, li: first, btn };
    }

    const pending = Array.isArray(job.pendingNos) ? job.pendingNos.map(String) : [];
    for (const no of pending) {
      const li = findRowByNo(no);
      if (!li) {
        // Not on current page — likely already deleted or moved; treat as success skip
        return { no, missing: true };
      }
      const btn = findDeleteButton(li);
      if (!btn) return { no, li, missingBtn: true };
      return { no, li, btn };
    }
    return null;
  }

  async function clickNativeDelete(target) {
    setAutomation(true);
    // Small tick so page-hook receives SET_AUTOMATION before confirm
    await sleep(80);
    try {
      target.btn.click();
    } catch (err) {
      setAutomation(false);
      throw err;
    }
  }

  async function processQueue(reason) {
    if (processingLock) return;
    processingLock = true;

    try {
      if (!parseGallog()) {
        processingLock = false;
        return;
      }

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

      if (job.paused) {
        setAutomation(false);
        startPausedPoll();
        processingLock = false;
        return;
      }

      // Already clicked on THIS page load — wait for navigation/timeout
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

      // Post-load settle time for site JS
      const waitMs = job.delayMs || DELAY.safe;
      await setJob({ status: "running", statusMessage: `대기 중… (${reason || "load"})` });
      await sleep(waitMs);

      job = await getJob();
      if (!job || !job.running || job.paused || job.stopped) {
        processingLock = false;
        return;
      }

      // Resolve missing pending nos (already gone)
      if (job.mode !== "all") {
        let pending = Array.isArray(job.pendingNos) ? job.pendingNos.map(String) : [];
        while (pending.length) {
          const head = pending[0];
          if (findRowByNo(head)) break;
          await markSuccess(head);
          job = await getJob();
          pending = Array.isArray(job.pendingNos) ? job.pendingNos.map(String) : [];
        }
        if (await finishIfDone(job)) {
          processingLock = false;
          return;
        }
        job = await getJob();
      }

      const target = pickNextTarget(job);
      if (!target) {
        if (job.mode === "all") {
          await finishIfDone(job);
        } else {
          await setJob({
            running: false,
            status: "error",
            statusMessage: "다음 삭제 대상 버튼을 찾지 못했습니다."
          });
        }
        processingLock = false;
        return;
      }

      if (target.missing) {
        await markSuccess(target.no);
        processingLock = false;
        scheduleProcess("missing-skip");
        return;
      }

      if (target.missingBtn) {
        await markFailure(target.no, `삭제 버튼 없음: ${target.no}`);
        processingLock = false;
        scheduleProcess("missing-btn");
        return;
      }

      await setJob({
        currentNo: target.no,
        deletingCurrentNo: target.no,
        clickIssuedForNo: target.no,
        awaitingReload: true,
        awaitingReloadSince: Date.now(),
        status: "running",
        statusMessage: `삭제 클릭: ${target.no}`
      });

      try {
        clickedThisPageLoad = true;
        writeClickSession(target.no);
        await clickNativeDelete(target);
        startReloadWatch(target.no);
      } catch (err) {
        clickedThisPageLoad = false;
        try {
          sessionStorage.removeItem(CLICK_SESSION_KEY);
        } catch (_) {
          /* ignore */
        }
        await markFailure(
          target.no,
          String(err && err.message ? err.message : err)
        );
        processingLock = false;
        scheduleProcess("click-error");
        return;
      }

      // Wait for navigation; lock stays until unload/timeout continues
    } catch (err) {
      await setJob({
        running: false,
        status: "error",
        statusMessage: String(err && err.message ? err.message : err)
      });
      setAutomation(false);
      processingLock = false;
    }
  }

  function scheduleProcess(reason) {
    setTimeout(() => {
      processQueue(reason);
    }, 50);
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

  // --- UI (unchanged behavior) ---

  function updateSelectedCount() {
    const n = document.querySelectorAll(
      `ul.cont_listbox > li[data-no] input.${CB_CLASS}:checked`
    ).length;
    const el = document.getElementById("dc-tool-selected-count");
    if (el) el.textContent = String(n);
    return n;
  }

  function setAllChecks(on) {
    document
      .querySelectorAll(`ul.cont_listbox > li[data-no] input.${CB_CLASS}`)
      .forEach((cb) => {
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
        const nos = getSelectedNos();
        if (!nos.length) {
          alert("선택된 게시글이 없습니다.");
          return;
        }
        if (
          !confirm(
            `선택한 ${nos.length}개의 게시글을 삭제합니다.\n삭제된 게시글은 복구하기 어려울 수 있습니다.`
          )
        ) {
          return;
        }
        beginJob({ mode: "selected", nos });
      }
    });
  }

  async function syncPageInfoToJob() {
    const gallog = parseGallog();
    await setJob({
      isPostingPage: !!gallog,
      gallogId: gallog ? gallog.gallogId : null,
      pagePostCount: getPageNos().length,
      totalPostCount: readTotalCount()
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

  async function beginJob({ mode, nos }) {
    const gallog = parseGallog();
    if (!gallog) {
      alert("갤로그 게시글(posting) 페이지에서만 사용할 수 있습니다.");
      return { ok: false, error: "not_posting_page" };
    }

    const existing = await getJob();
    if (existing && existing.running) {
      alert("이미 삭제 작업이 진행 중입니다.");
      return { ok: false, error: "already_running" };
    }

    let pendingNos = [];
    let initialTotal = 0;

    if (mode === "test5") {
      pendingNos = getPageNos().slice(0, 5);
      initialTotal = pendingNos.length;
      if (!pendingNos.length) {
        alert("삭제할 게시글이 없습니다.");
        return { ok: false, error: "empty" };
      }
    } else if (mode === "selected") {
      pendingNos = (nos || []).map(String).filter(Boolean);
      initialTotal = pendingNos.length;
      if (!pendingNos.length) {
        alert("선택된 게시글이 없습니다.");
        return { ok: false, error: "empty" };
      }
    } else if (mode === "all") {
      pendingNos = [];
      initialTotal = readTotalCount() || getPageNos().length;
      if (!getPageNos().length) {
        alert("삭제할 게시글이 없습니다.");
        return { ok: false, error: "empty" };
      }
    }

    const delayMs = (existing && existing.delayMs) || DELAY.safe;

    await setJob({
      mode,
      running: true,
      paused: false,
      stopped: false,
      pendingNos,
      successCount: 0,
      failCount: 0,
      failedNos: [],
      initialTotal,
      totalTarget: initialTotal,
      currentNo: null,
      clickIssuedForNo: null,
      deletingCurrentNo: null,
      awaitingReload: false,
      awaitingReloadSince: null,
      consecutiveFails: 0,
      delayMs,
      startedAt: new Date().toISOString(),
      status: "running",
      statusMessage: "삭제 시작",
      gallogId: gallog.gallogId,
      isPostingPage: true,
      pagePostCount: getPageNos().length,
      totalPostCount: readTotalCount()
    });

    scheduleProcess("start");
    return { ok: true };
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
            if (
              !confirm(
                "게시글 5개를 실제로 삭제합니다.\n삭제된 게시글은 복구하기 어려울 수 있습니다."
              )
            ) {
              sendResponse({ ok: false, error: "cancelled" });
              break;
            }
            sendResponse(await beginJob({ mode: "test5" }));
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
            sendResponse(await beginJob({ mode: "selected", nos }));
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
              deletingCurrentNo: null
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
              currentNo: null,
              clickIssuedForNo: null,
              deletingCurrentNo: null,
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
    if (!parseGallog()) {
      syncPageInfoToJob();
      return;
    }
    ensureToolbar();
    injectRowCheckboxes();
    syncPageInfoToJob();

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

  async function bootAutomation() {
    const job = await getJob();
    if (!job) return;
    if (job.stopped) return;
    if (job.running && !job.paused && parseGallog()) {
      scheduleProcess("boot");
    } else if (job.running && job.paused) {
      startPausedPoll();
    }
  }

  // Hook early so confirm wrap is ready before clicks
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

  // Also after full load (images/scripts) — re-trigger settle if still running
  window.addEventListener("load", () => {
    bootUi();
    bootAutomation();
  });
})();
