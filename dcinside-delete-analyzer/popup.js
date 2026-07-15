/**
 * Popup control UI — forwards commands to gallog content script.
 */

function sendBg(type, extra = {}) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type, ...extra }, (res) => {
      if (chrome.runtime.lastError) {
        resolve({ ok: false, error: chrome.runtime.lastError.message });
        return;
      }
      resolve(res || { ok: false, error: "empty" });
    });
  });
}

function forward(payload) {
  return sendBg("FORWARD_TO_PAGE", { payload });
}

const els = {
  totalCount: document.getElementById("totalCount"),
  pageMeta: document.getElementById("pageMeta"),
  statusText: document.getElementById("statusText"),
  statusMessage: document.getElementById("statusMessage"),
  progressBar: document.getElementById("progressBar"),
  progressText: document.getElementById("progressText"),
  successCount: document.getElementById("successCount"),
  failCount: document.getElementById("failCount"),
  currentNo: document.getElementById("currentNo"),
  errorText: document.getElementById("errorText"),
  actionsIdle: document.getElementById("actionsIdle"),
  actionsRunning: document.getElementById("actionsRunning"),
  btnTest5: document.getElementById("btnTest5"),
  btnSelected: document.getElementById("btnSelected"),
  btnAll: document.getElementById("btnAll"),
  btnRefresh: document.getElementById("btnRefresh"),
  btnPause: document.getElementById("btnPause"),
  btnResume: document.getElementById("btnResume"),
  btnStop: document.getElementById("btnStop")
};

function showError(msg) {
  if (!msg) {
    els.errorText.classList.add("hidden");
    els.errorText.textContent = "";
    return;
  }
  els.errorText.classList.remove("hidden");
  els.errorText.textContent = msg;
}

function statusLabel(job) {
  if (!job) return "준비됨";
  if (job.status === "error") return "오류";
  if (job.status === "done") return "완료";
  if (job.paused) return "일시정지";
  if (job.running) return "삭제 중";
  if (job.status === "paused") return "일시정지";
  return "준비됨";
}

function render(job, page) {
  const totalDisplay =
    (page && page.totalPostCount != null
      ? page.totalPostCount
      : job && job.totalPostCount != null
        ? job.totalPostCount
        : null) ?? "—";

  els.totalCount.textContent =
    typeof totalDisplay === "number" ? totalDisplay.toLocaleString("ko-KR") : String(totalDisplay);

  if (page && !page.isPostingPage) {
    els.pageMeta.textContent = "갤로그 게시글(posting) 페이지가 아닙니다.";
  } else if (page) {
    const parts = [
      page.gallogId ? `갤로그: ${page.gallogId}` : null,
      `현재 페이지 ${page.pagePostCount || 0}개`,
      page.selectedCount != null ? `선택 ${page.selectedCount}개` : null
    ].filter(Boolean);
    els.pageMeta.textContent = parts.join(" · ");
  } else if (job && job.isPostingPage === false) {
    els.pageMeta.textContent = "갤로그 게시글 페이지를 열어 주세요.";
  } else {
    els.pageMeta.textContent = "페이지 연결됨";
  }

  els.statusText.textContent = statusLabel(job);
  els.statusMessage.textContent = (job && job.statusMessage) || "";

  const done = (job && (job.successCount || 0) + (job.failCount || 0)) || 0;
  const target = (job && (job.initialTotal || job.totalTarget)) || 0;
  const pct = target > 0 ? Math.min(100, Math.round((done / target) * 100)) : 0;
  els.progressBar.style.width = `${pct}%`;
  els.progressText.textContent = `${done.toLocaleString("ko-KR")} / ${target.toLocaleString("ko-KR")}`;
  els.successCount.textContent = String((job && job.successCount) || 0);
  els.failCount.textContent = String((job && job.failCount) || 0);
  els.currentNo.textContent = `현재 처리 중: ${(job && job.currentNo) || "—"}`;

  const running = !!(job && job.running);
  els.actionsIdle.classList.toggle("hidden", running);
  els.actionsRunning.classList.toggle("hidden", !running);
  els.btnPause.classList.toggle("hidden", !!(job && job.paused));
  els.btnResume.classList.toggle("hidden", !(job && job.paused));

  if (job && job.status === "error" && job.statusMessage) {
    showError(job.statusMessage);
  } else {
    showError("");
  }

  // delay radios — settle time after page load before clicking X
  const delay = (job && job.delayMs) || 1500;
  document.querySelectorAll('input[name="delay"]').forEach((r) => {
    r.checked = r.value === "normal" ? delay === 1000 : delay !== 1000;
    r.disabled = running;
  });
}

async function refresh() {
  const jobRes = await sendBg("GET_JOB");
  const job = jobRes.job || null;
  const pageRes = await forward({ type: "GET_PAGE_INFO" });
  const page = pageRes && pageRes.ok !== false && pageRes.isPostingPage != null ? pageRes : null;
  if (pageRes && pageRes.ok === false && pageRes.error) {
    showError(pageRes.error);
  }
  render(job, page);
}

async function onTest5() {
  showError("");
  const res = await forward({ type: "START_TEST5" });
  if (res && res.ok === false) showError(res.error || "시작 실패");
  await refresh();
}

async function onSelected() {
  showError("");
  const res = await forward({ type: "START_SELECTED" });
  if (res && res.ok === false && res.error !== "cancelled") {
    showError(res.error || "시작 실패");
  }
  await refresh();
}

async function onAll() {
  showError("");
  if (!confirm("현재 계정의 게시글 전체를 삭제하려고 합니다.")) return;
  const typed = prompt('계속하려면 아래 문구를 정확히 입력하세요:\n전체삭제');
  if (typed !== "전체삭제") {
    alert("입력이 일치하지 않아 취소되었습니다.");
    return;
  }
  const res = await forward({ type: "START_ALL" });
  if (res && res.ok === false) showError(res.error || "시작 실패");
  await refresh();
}

async function onPause() {
  await forward({ type: "PAUSE" });
  await refresh();
}

async function onResume() {
  await forward({ type: "RESUME" });
  await refresh();
}

async function onStop() {
  if (!confirm("삭제 작업을 중지할까요?")) return;
  await forward({ type: "STOP" });
  await refresh();
}

document.querySelectorAll('input[name="delay"]').forEach((r) => {
  r.addEventListener("change", async () => {
    if (!r.checked) return;
    await forward({ type: "SET_DELAY_MODE", mode: r.value });
    await refresh();
  });
});

els.btnTest5.addEventListener("click", onTest5);
els.btnSelected.addEventListener("click", onSelected);
els.btnAll.addEventListener("click", onAll);
els.btnRefresh.addEventListener("click", refresh);
els.btnPause.addEventListener("click", onPause);
els.btnResume.addEventListener("click", onResume);
els.btnStop.addEventListener("click", onStop);

refresh();
setInterval(refresh, 1000);
