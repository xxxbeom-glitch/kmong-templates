/**
 * Thin service worker: job state mirror + popup↔tab messaging.
 * Delete loop runs in the gallog content script (MV3 SW lifespan).
 */

const DEFAULT_JOB = () => ({
  running: false,
  paused: false,
  stopped: false,
  mode: "idle",
  delayMs: 2000,
  totalTarget: 0,
  successCount: 0,
  failCount: 0,
  failedNos: [],
  currentNo: null,
  startedAt: null,
  status: "ready",
  statusMessage: "",
  consecutiveFails: 0,
  pagePostCount: 0,
  totalPostCount: null,
  isPostingPage: false,
  gallogId: null
});

async function getJob() {
  const data = await chrome.storage.local.get(["job"]);
  return { ...DEFAULT_JOB(), ...(data.job || {}) };
}

async function setJob(patch) {
  const job = { ...(await getJob()), ...patch };
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
    return { ok: false, error: "갤로그 탭을 찾을 수 없습니다. gallog.dcinside.com 게시글 페이지를 열어 주세요." };
  }
  try {
    const res = await chrome.tabs.sendMessage(tab.id, message);
    return res || { ok: false, error: "페이지 응답 없음. 새로고침 후 다시 시도하세요." };
  } catch (err) {
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
        case "GET_JOB": {
          sendResponse({ ok: true, job: await getJob() });
          break;
        }
        case "SET_JOB": {
          sendResponse({ ok: true, job: await setJob(message.patch || {}) });
          break;
        }
        case "RESET_JOB": {
          sendResponse({ ok: true, job: await setJob(DEFAULT_JOB()) });
          break;
        }
        case "FORWARD_TO_PAGE": {
          sendResponse(await sendToActiveGallogTab(message.payload));
          break;
        }
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
