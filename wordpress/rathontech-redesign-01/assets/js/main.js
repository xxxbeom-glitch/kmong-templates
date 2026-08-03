/**
 * Theme base: refresh always lands at top (40-template-code-style).
 */
(function () {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("pageshow", function () {
    window.scrollTo(0, 0);
  });
})();
