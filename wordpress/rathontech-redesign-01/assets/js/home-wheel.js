/**
 * Home wheel (PC):
 * - Hero → ISS: semi-auto snap only
 * - ISS: one gesture flips copy; last copy releases to natural scroll (no snap)
 * MO / reduced-motion: no hijack
 */
(function () {
  var hero = document.querySelector('[data-hero-snap]');
  var iss = document.querySelector('[data-iss-pin]');
  if (!hero || !iss) return;

  var steps = iss.querySelectorAll('[data-iss-step]');
  var stepCount = steps.length;
  if (!stepCount) return;

  var next = document.querySelector(iss.getAttribute('data-iss-next') || '.home-eco');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 768px)');
  if (reduce) return;

  var activeIndex = 0;
  var animating = false;
  var gestureLock = false;
  var gestureTimer = null;
  var SNAP_MS = 0.55;
  var GESTURE_IDLE_MS = 160;

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

  function phase() {
    var y = window.scrollY;
    var issTop = issY();
    var nextTop = nextY();
    var slop = 64;

    if (y < issTop - slop) return 'hero';
    if (y < nextTop - slop) return 'iss';
    return 'free';
  }

  function snapTo(y, done) {
    if (animating) return;
    animating = true;
    gestureLock = true;

    var start = window.scrollY;
    var end = Math.max(0, Math.round(y));
    if (Math.abs(end - start) < 2) {
      animating = false;
      window.setTimeout(function () {
        gestureLock = false;
      }, GESTURE_IDLE_MS);
      if (done) done();
      return;
    }

    var finish = function () {
      window.scrollTo(0, end);
      animating = false;
      window.setTimeout(function () {
        gestureLock = false;
      }, GESTURE_IDLE_MS);
      if (done) done();
    };

    if (typeof gsap !== 'undefined') {
      var proxy = { y: start };
      gsap.to(proxy, {
        y: end,
        duration: SNAP_MS,
        ease: 'power3.inOut',
        overwrite: true,
        onUpdate: function () {
          window.scrollTo(0, proxy.y);
        },
        onComplete: finish,
      });
      return;
    }

    window.scrollTo({ top: end, behavior: 'smooth' });
    window.setTimeout(finish, 500);
  }

  function armGesture() {
    gestureLock = true;
    if (gestureTimer) window.clearTimeout(gestureTimer);
    gestureTimer = window.setTimeout(function () {
      gestureLock = false;
    }, GESTURE_IDLE_MS);
  }

  function onWheel(e) {
    if (!desktop.matches || animating) return;

    var dy = e.deltaY;
    if (e.deltaMode === 1) dy *= 16;
    if (e.deltaMode === 2) dy *= window.innerHeight;
    if (dy === 0) return;

    var p = phase();

    /* Below ISS: natural scroll only */
    if (p === 'free') return;

    if (dy > 0) {
      /* Hero → ISS: only place with semi-auto snap */
      if (p === 'hero') {
        e.preventDefault();
        if (gestureLock) return;
        armGesture();
        setActive(0);
        snapTo(issY());
        return;
      }

      /* ISS: flip copy; last copy releases (no snap to next) */
      if (activeIndex < stepCount - 1) {
        e.preventDefault();
        if (gestureLock) return;
        armGesture();
        setActive(activeIndex + 1);
        return;
      }

      return;
    }

    /* Wheel up inside ISS: previous copy only (no snap back to hero) */
    if (p === 'iss' && activeIndex > 0) {
      e.preventDefault();
      if (gestureLock) return;
      armGesture();
      setActive(activeIndex - 1);
    }
  }

  window.addEventListener('wheel', onWheel, { passive: false });
})();
