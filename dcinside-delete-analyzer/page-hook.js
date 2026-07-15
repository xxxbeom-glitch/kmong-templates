/**
 * Page context: auto-approve delete confirm only while automation is active.
 * Does NOT craft API tokens or POST delete requests.
 */
(function () {
  "use strict";

  if (window.__DC_DELETE_TOOL_HOOKED__) return;
  window.__DC_DELETE_TOOL_HOOKED__ = true;

  const SOURCE = "dc-delete-tool-page-hook";
  const CONTENT_SOURCE = "dc-delete-tool-content";
  const originalConfirm = window.confirm.bind(window);

  let automationDeleteActive = false;

  function post(payload) {
    try {
      window.postMessage({ source: SOURCE, ...payload }, window.location.origin);
    } catch (_) {
      /* ignore */
    }
  }

  function isDeleteConfirmMessage(message) {
    const s = String(message == null ? "" : message);
    return (
      /삭제하시겠습니까/i.test(s) ||
      /게시물에서 동시에 삭제/i.test(s) ||
      /삭제\s*하(시|겠)/i.test(s) ||
      (/삭제/.test(s) && /게시|글|로그/.test(s))
    );
  }

  window.confirm = function hookedConfirm(message) {
    try {
      if (automationDeleteActive && isDeleteConfirmMessage(message)) {
        post({
          action: "CONFIRM_AUTO_TRUE",
          message: String(message == null ? "" : message).slice(0, 200)
        });
        return true;
      }
    } catch (_) {
      /* fall through to original */
    }
    return originalConfirm(message);
  };

  window.addEventListener("message", (event) => {
    try {
      if (event.source !== window) return;
      const data = event.data;
      if (!data || data.source !== CONTENT_SOURCE) return;

      if (data.action === "SET_AUTOMATION") {
        automationDeleteActive = !!data.active;
        post({
          action: "AUTOMATION_STATE",
          active: automationDeleteActive,
          requestId: data.requestId || null
        });
      }
    } catch (_) {
      /* ignore */
    }
  });

  post({ action: "HOOK_READY" });
})();
