/**
 * ISS wheel steps (PC):
 * one gesture = next copy; last copy then natural scroll (no snap).
 * No hero scroll hijack.
 */
(function () {
  var iss = document.querySelector('[data-iss-pin]');
  if (!iss) return;

  var steps = iss.querySelectorAll('[data-iss-step]');
  var stepCount = steps.length;
  if (!stepCount) return;

  var next = document.querySelector(iss.getAttribute('data-iss-next') || '.home-eco');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 768px)');
  if (reduce) return;

  var activeIndex = 0;
  var holdUntil = 0;
  var STEP_HOLD_MS = 480;

  function setActive(index) {
    if (index < 0 || index >= stepCount) return;
    activeIndex = index;
    steps.forEach(function (step, i) {
      var on = i === index;
      step.classList.toggle('is-active', on);
      step.setAttribute('aria-hidden', on ? 'false' : 'true');
      var title = step.querySelector('.home-iss__title');
      if (!title) return;
      if (on) title.id = 'home-iss-title';
      else if (title.id === 'home-iss-title') title.removeAttribute('id');
    });
  }

  function yOf(el) {
    return Math.round(el.getBoundingClientRect().top + window.scrollY);
  }

  function issY() {
    return yOf(iss);
  }

  function nextY() {
    return next ? yOf(next) : issY() + iss.offsetHeight;
  }

  function inIssZone() {
    var y = window.scrollY;
    var top = issY();
    var bottom = nextY();
    var slop = 64;
    return y >= top - slop && y < bottom - slop;
  }

  function isHeld() {
    return Date.now() < holdUntil;
  }

  function hold(ms) {
    holdUntil = Date.now() + (ms || STEP_HOLD_MS);
  }

  function onWheel(e) {
    if (!desktop.matches) return;
    if (!inIssZone()) return;

    var dy = e.deltaY;
    if (e.deltaMode === 1) dy *= 16;
    if (e.deltaMode === 2) dy *= window.innerHeight;
    if (dy === 0) return;

    if (dy > 0) {
      if (activeIndex < stepCount - 1) {
        e.preventDefault();
        if (isHeld()) return;
        setActive(activeIndex + 1);
        hold(STEP_HOLD_MS);
        return;
      }

      if (isHeld()) {
        e.preventDefault();
        hold(STEP_HOLD_MS);
      }
      return;
    }

    if (activeIndex > 0) {
      e.preventDefault();
      if (isHeld()) return;
      setActive(activeIndex - 1);
      hold(STEP_HOLD_MS);
    }
  }

  window.addEventListener('wheel', onWheel, { passive: false });
})();
