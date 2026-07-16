/**
 * Popup control UI — posting / comment tabs + job controls.
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
  appTitle: document.getElementById("appTitle"),
  appSub: document.getElementById("appSub"),
  countLabel: document.getElementById("countLabel"),
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
  hintText: document.getElementById("hintText"),
  actionsIdle: document.getElementById("actionsIdle"),
  actionsRunning: document.getElementById("actionsRunning"),
  btnTest5: document.getElementById("btnTest5"),
  btnSelected: document.getElementById("btnSelected"),
  btnAll: document.getElementById("btnAll"),
  btnRefresh: document.getElementById("btnRefresh"),
  btnPause: document.getElementById("btnPause"),
  btnResume: document.getElementById("btnResume"),
  btnStop: document.getElementById("btnStop"),
  tabPosting: document.getElementById("tabPosting"),
  tabComment: document.getElementById("tabComment")
};

let uiContentType = "posting";

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

function applyChromeForType(type) {
  const isComment = type === "comment";
  els.appTitle.textContent = isComment
    ? "DCInside 댓글 삭제 도구"
    : "DCInside 게시글 삭제 도구";
  els.appSub.textContent = isComment
    ? "본인 갤로그 댓글만 · 순차 삭제"
    : "본인 갤로그 게시글만 · 순차 삭제";
  els.countLabel.textContent = isComment ? "현재 댓글" : "현재 게시글";
  els.btnSelected.textContent = isComment ? "선택 댓글 삭제" : "선택 글 삭제";
  els.btnAll.textContent = isComment ? "댓글 전체 삭제 시작" : "전체 삭제 시작";
  els.hintText.innerHTML = isComment
    ? "먼저 <strong>테스트 5개 삭제</strong>로 댓글 삭제를 확인하세요. 전체 삭제는 <code>댓글전체삭제</code> 입력이 필요합니다."
    : "먼저 <strong>테스트 5개 삭제</strong>로 동작을 확인하세요. 전체 삭제는 2단계 확인 후 실행됩니다.";
  els.tabPosting.classList.toggle("active", !isComment);
  els.tabComment.classList.toggle("active", isComment);
}

function render(job, page) {
  const pageType = (page && page.contentType) || (job && job.contentType) || uiContentType;
  uiContentType = pageType || "posting";
  applyChromeForType(uiContentType);

  const totalDisplay =
    (page && page.totalCount != null
      ? page.totalCount
      : page && page.totalPostCount != null
        ? page.totalPostCount
        : job && job.totalCount != null
          ? job.totalCount
          : job && job.totalPostCount != null
            ? job.totalPostCount
            : null) ?? "—";

  els.totalCount.textContent =
    typeof totalDisplay === "number" ? totalDisplay.toLocaleString("ko-KR") : String(totalDisplay);

  if (page && page.isSupportedPage === false) {
    els.pageMeta.textContent = "갤로그 게시글(/posting) 또는 댓글(/comment) 페이지가 아닙니다.";
  } else if (page) {
    const parts = [
      page.gallogId ? `갤로그: ${page.gallogId}` : null,
      page.contentType === "comment" ? "댓글 모드" : "게시글 모드",
      `현재 페이지 ${page.pageItemCount != null ? page.pageItemCount : page.pagePostCount || 0}개`,
      page.selectedCount != null ? `선택 ${page.selectedCount}개` : null
    ].filter(Boolean);
    els.pageMeta.textContent = parts.join(" · ");
  } else {
    els.pageMeta.textContent = "페이지 연결 확인 중…";
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

  const preview = (job && (job.currentPreview || job.currentTargetId || job.currentNo)) || "—";
  els.currentNo.textContent =
    job && job.currentPreview
      ? `현재 처리 중:\n“${String(job.currentPreview).slice(0, 100)}”`
      : `현재 처리 중: ${preview}`;

  const running = !!(job && job.running);
  els.actionsIdle.classList.toggle("hidden", running);
  els.actionsRunning.classList.toggle("hidden", !running);
  els.btnPause.classList.toggle("hidden", !!(job && job.paused));
  els.btnResume.classList.toggle("hidden", !(job && job.paused));
  els.tabPosting.disabled = running;
  els.tabComment.disabled = running;

  if (job && job.status === "error" && job.statusMessage) {
    showError(job.statusMessage);
  } else {
    showError("");
  }

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
  const page =
    pageRes && pageRes.ok !== false && (pageRes.contentType != null || pageRes.isPostingPage != null)
      ? pageRes
      : null;
  if (pageRes && pageRes.ok === false && pageRes.error) {
    showError(pageRes.error);
  }
  render(job, page);
}

async function switchTab(contentType) {
  showError("");
  const res = await forward({ type: "NAVIGATE_CONTENT_TYPE", contentType });
  if (res && res.ok === false) {
    showError(res.error || "페이지 이동 실패");
    return;
  }
  uiContentType = contentType;
  applyChromeForType(contentType);
  setTimeout(refresh, 800);
}

async function onTest5() {
  showError("");
  const res = await forward({ type: "START_TEST5" });
  if (res && res.ok === false && res.error !== "cancelled") showError(res.error || "시작 실패");
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
  const isComment = uiContentType === "comment";
  if (isComment) {
    if (!confirm("현재 계정의 모든 댓글을 삭제하려고 합니다.")) return;
    const typed = prompt("계속하려면 아래 문구를 정확히 입력하세요:\n댓글전체삭제");
    if (typed !== "댓글전체삭제") {
      alert("입력이 일치하지 않아 취소되었습니다.");
      return;
    }
  } else {
    if (!confirm("현재 계정의 게시글 전체를 삭제하려고 합니다.")) return;
    const typed = prompt("계속하려면 아래 문구를 정확히 입력하세요:\n전체삭제");
    if (typed !== "전체삭제") {
      alert("입력이 일치하지 않아 취소되었습니다.");
      return;
    }
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

els.tabPosting.addEventListener("click", () => switchTab("posting"));
els.tabComment.addEventListener("click", () => switchTab("comment"));
els.btnTest5.addEventListener("click", onTest5);
els.btnSelected.addEventListener("click", onSelected);
els.btnAll.addEventListener("click", onAll);
els.btnRefresh.addEventListener("click", refresh);
els.btnPause.addEventListener("click", onPause);
els.btnResume.addEventListener("click", onResume);
els.btnStop.addEventListener("click", onStop);

refresh();
setInterval(refresh, 1000);
