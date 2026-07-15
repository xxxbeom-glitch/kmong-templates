/**
 * Popup UI controller — talks to background service worker only.
 */

function send(type, extra = {}) {
  return new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage({ type, ...extra }, (res) => {
        if (chrome.runtime.lastError) {
          resolve({ ok: false, error: chrome.runtime.lastError.message });
          return;
        }
        resolve(res || { ok: false, error: "empty_response" });
      });
    } catch (err) {
      resolve({ ok: false, error: String(err && err.message ? err.message : err) });
    }
  });
}

const els = {
  statusText: document.getElementById("statusText"),
  eventCount: document.getElementById("eventCount"),
  errorText: document.getElementById("errorText"),
  btnStart: document.getElementById("btnStart"),
  btnStop: document.getElementById("btnStop"),
  btnClear: document.getElementById("btnClear"),
  btnDownload: document.getElementById("btnDownload")
};

function showError(msg) {
  if (!msg) {
    els.errorText.hidden = true;
    els.errorText.textContent = "";
    return;
  }
  els.errorText.hidden = false;
  els.errorText.textContent = msg;
}

function renderStatus(state) {
  const recording = !!(state && state.recording);
  els.statusText.textContent = recording ? "기록 중" : "기록 중지됨";
  els.statusText.classList.toggle("recording", recording);
  els.statusText.classList.toggle("stopped", !recording);
  els.eventCount.textContent = String((state && state.eventCount) || 0);
  els.btnStart.disabled = recording;
  els.btnStop.disabled = !recording;
  if (state && state.lastError) {
    showError("저장 오류: " + state.lastError);
  } else {
    showError("");
  }
}

async function refresh() {
  const res = await send("GET_STATUS");
  if (!res.ok) {
    showError(res.error || "상태를 불러오지 못했습니다.");
    return;
  }
  renderStatus(res.state);
}

async function onStart() {
  showError("");
  const res = await send("START_RECORDING");
  if (!res.ok) {
    showError(res.error || "기록 시작 실패");
    return;
  }
  renderStatus(res.state);
}

async function onStop() {
  showError("");
  const res = await send("STOP_RECORDING");
  if (!res.ok) {
    showError(res.error || "기록 중지 실패");
    return;
  }
  renderStatus(res.state);
}

async function onClear() {
  showError("");
  if (!confirm("저장된 로그를 모두 삭제할까요?")) return;
  const res = await send("CLEAR_LOGS");
  if (!res.ok) {
    showError(res.error || "초기화 실패");
    return;
  }
  renderStatus(res.state);
}

function clientSanitizeJsonText(text) {
  // Extra pass before download: scrub obvious secrets in serialized form
  try {
    const data = JSON.parse(text);
    const sensitiveKey =
      /^(password|passwd|pwd|cookie|set-cookie|authorization|session|sessionid|token|access_token|refresh_token|auth|csrf|csrf_token|_csrf)$/i;

    function walk(node) {
      if (Array.isArray(node)) return node.map(walk);
      if (node && typeof node === "object") {
        const out = {};
        for (const [k, v] of Object.entries(node)) {
          if (sensitiveKey.test(k)) out[k] = "[REDACTED]";
          else if (/^(headers|requestHeaders|responseHeaders)$/i.test(k)) out[k] = "[OMITTED]";
          else out[k] = walk(v);
        }
        return out;
      }
      if (typeof node === "string" && /password|authorization|bearer\s+/i.test(node)) {
        return "[REDACTED]";
      }
      return node;
    }

    return JSON.stringify(walk(data), null, 2);
  } catch {
    return text;
  }
}

async function onDownload() {
  showError("");
  const res = await send("EXPORT_JSON");
  if (!res.ok || !res.json) {
    showError(res.error || "내보내기 실패");
    return;
  }

  try {
    const json = clientSanitizeJsonText(res.json);
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const filename = res.filename || "dcinside-delete-analysis.json";

    // Prefer downloads API when available
    if (chrome.downloads && chrome.downloads.download) {
      chrome.downloads.download(
        {
          url,
          filename,
          saveAs: true
        },
        () => {
          if (chrome.runtime.lastError) {
            // Fallback to anchor
            fallbackAnchor(url, filename);
          }
          setTimeout(() => URL.revokeObjectURL(url), 60000);
        }
      );
    } else {
      fallbackAnchor(url, filename);
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    }

    await refresh();
  } catch (err) {
    showError(String(err && err.message ? err.message : err));
  }
}

function fallbackAnchor(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

els.btnStart.addEventListener("click", () => onStart());
els.btnStop.addEventListener("click", () => onStop());
els.btnClear.addEventListener("click", () => onClear());
els.btnDownload.addEventListener("click", () => onDownload());

refresh();
setInterval(refresh, 1500);
