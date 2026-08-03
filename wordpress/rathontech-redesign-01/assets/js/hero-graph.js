/**
 * Signature Move: one-shot connection draw. No loop, no particles.
 * Reduced motion → static diagram (CSS handles).
 */
(function () {
  var graph = document.querySelector('[data-flow-graph]');
  if (!graph) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    graph.classList.add('is-ready');
    return;
  }

  var started = false;
  function start() {
    if (started) return;
    started = true;
    graph.classList.add('is-ready');
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            start();
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(graph);
  } else {
    start();
  }
})();
