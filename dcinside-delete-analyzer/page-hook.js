/**
 * Injected into page main world to wrap window.confirm.
 * Communicates with content.js via window.postMessage.
 * Must not alter confirm behavior (no auto-accept).
 */
(function () {
  "use strict";

  try {
    if (window.__DC_DELETE_ANALYZER_HOOKED__) return;
    window.__DC_DELETE_ANALYZER_HOOKED__ = true;

    const SOURCE = "dcinside-delete-analyzer-page-hook";
    const originalConfirm = window.confirm.bind(window);

    function post(payload) {
      try {
        window.postMessage(
          {
            source: SOURCE,
            ...payload
          },
          window.location.origin
        );
      } catch (_) {
        /* never break page */
      }
    }

    window.confirm = function hookedConfirm(message) {
      const msg = message == null ? "" : String(message);
      const shownAt = new Date().toISOString();
      try {
        post({
          hookType: "confirm_shown",
          message: msg.slice(0, 2000),
          shownAt
        });
      } catch (_) {
        /* ignore */
      }

      let result;
      try {
        result = originalConfirm(message);
      } catch (err) {
        try {
          post({
            hookType: "confirm_error",
            message: String(err && err.message ? err.message : err),
            shownAt
          });
        } catch (_) {
          /* ignore */
        }
        throw err;
      }

      try {
        post({
          hookType: "confirm_result",
          message: msg.slice(0, 2000),
          result: !!result,
          shownAt,
          resultAt: new Date().toISOString()
        });
      } catch (_) {
        /* ignore */
      }

      return result;
    };

    try {
      post({ hookType: "hook_ready", at: new Date().toISOString() });
    } catch (_) {
      /* ignore */
    }
  } catch (_) {
    /* never break page */
  }
})();
