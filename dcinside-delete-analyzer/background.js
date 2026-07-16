/**
 * Thin service worker: job state + popup↔tab messaging.
 * Delete engine runs in content script across page reloads.
 */

const DEFAULT_JOB = () => ({
  contentType: null,
  mode: "idle",
  running: false,
  paused: false,
  stopped: false,
  pendingTargets: [],
  selectedTargets: [],
  failedTargets: [],
  successCount: 0,
  failCount: 0,
  initialTotal: 0,
  totalTarget: 0,
  currentTargetId: null,
  currentPreview: "",
  clickIssuedForId: null,
  deletingCurrentId: null,
  awaitingReload: false,
  awaitingReloadSince: null,
  consecutiveFails: 0,
  lastAttemptId: null,
  sameTargetStreak: 0,
  lastRestAtSuccess: null,
  delayMode: "safe",
  delayMs: 10000,
  startedAt: null,
  status: "ready",
  statusMessage: "",
  pageItemCount: 0,
  totalCount: null,
  isSupportedPage: false,
  gallogId: null,
  // legacy aliases kept in sync for older popup reads
  pendingNos: [],
  failedNos: [],
  currentNo: null,
  clickIssuedForNo: null,
  deletingCurrentNo: null,
  pagePostCount: 0,
  totalPostCount: null,
  isPostingPage: false
});

async function getJob() {
  const data = await chrome.storage.local.get(["job"]);
  return { ...DEFAULT_JOB(), ...(data.job || {}) };
}

async function setJob(patch) {
  const job = { ...(await getJob()), ...patch };
  // Keep legacy mirrors in sync
  if (Array.isArray(job.pendingTargets)) {
    job.pendingNos = job.pendingTargets.map((t) => (typeof t === "string" ? t : t.id));
  }
  if (Array.isArray(job.failedTargets)) {
    job.failedNos = job.failedTargets.map((t) => (typeof t === "string" ? t : t.id || t));
  }
  if (job.currentTargetId != null) job.currentNo = job.currentTargetId;
  if (job.clickIssuedForId != null) job.clickIssuedForNo = job.clickIssuedForId;
  if (job.deletingCurrentId != null) job.deletingCurrentNo = job.deletingCurrentId;
  if (job.pageItemCount != null) job.pagePostCount = job.pageItemCount;
  if (job.totalCount != null) job.totalPostCount = job.totalCount;
  job.isPostingPage = job.contentType === "posting" || job.isSupportedPage;
  await chrome.storage.local.set({ job });
  return job;
}

async function sendToActiveGallogTab(message) {
  const tabs = await chrome.tabs.query({
    url: ["https://gallog.dcinside.com/*"],
    active: true,
    currentWindow: true
  });
  let tab = tabs[0];
  if (!tab) {
    const all = await chrome.tabs.query({ url: ["https://gallog.dcinside.com/*"] });
    tab = all.find((t) => t.active) || all[0];
  }
  if (!tab || tab.id == null) {
    return {
      ok: false,
      error: "갤로그 탭을 찾을 수 없습니다. gallog.dcinside.com 페이지를 열어 주세요."
    };
  }
  try {
    const res = await chrome.tabs.sendMessage(tab.id, message);
    return res || { ok: false, error: "페이지 응답 없음. 새로고침 후 다시 시도하세요." };
  } catch (_) {
    return {
      ok: false,
      error: "콘텐츠 스크립트와 연결되지 않았습니다. 갤로그 페이지를 새로고침하세요."
    };
  }
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  (async () => {
    try {
      switch (message?.type) {
        case "GET_JOB":
          sendResponse({ ok: true, job: await getJob() });
          break;
        case "SET_JOB":
          sendResponse({ ok: true, job: await setJob(message.patch || {}) });
          break;
        case "RESET_JOB":
          sendResponse({ ok: true, job: await setJob(DEFAULT_JOB()) });
          break;
        case "FORWARD_TO_PAGE":
          sendResponse(await sendToActiveGallogTab(message.payload));
          break;
        default:
          sendResponse({ ok: false, error: "unknown_type" });
      }
    } catch (err) {
      sendResponse({ ok: false, error: String(err && err.message ? err.message : err) });
    }
  })();
  return true;
});

chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(["job"]);
  if (!data.job) await chrome.storage.local.set({ job: DEFAULT_JOB() });
});
