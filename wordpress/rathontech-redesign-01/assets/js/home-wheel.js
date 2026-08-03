/**
 * Home wheel (PC):
 * - Hero → ISS: semi-auto snap only
 * - ISS: one gesture = one copy; next gesture after idle = natural scroll (no snap)
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
  var holdUntil = 0;
  var SNAP_MS = 0.55;
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

  function phase() {
    var y = window.scrollY;
    var issTop = issY();
    var nextTop = nextY();
    var slop = 64;

    if (y < issTop - slop) return 'hero';
    if (y < nextTop - slop) return 'iss';
    return 'free';
  }

  function isHeld() {
    return Date.now() < holdUntil;
  }

  function hold(ms) {
    holdUntil = Date.now() + (ms || STEP_HOLD_MS);
  }

  function snapTo(y, done) {
    if (animating) return;
    animating = true;
    hold(Math.round(SNAP_MS * 1000) + 80);

    var start = window.scrollY;
    var end = Math.max(0, Math.round(y));
    if (Math.abs(end - start) < 2) {
      animating = false;
      if (done) done();
      return;
    }

    var finish = function () {
      window.scrollTo(0, end);
      animating = false;
      hold(120);
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

  function onWheel(e) {
    if (!desktop.matches || animating) return;

    var dy = e.deltaY;
    if (e.deltaMode === 1) dy *= 16;
    if (e.deltaMode === 2) dy *= window.innerHeight;
    if (dy === 0) return;

    var p = phase();
    if (p === 'free') return;

    if (dy > 0) {
      if (p === 'hero') {
        e.preventDefault();
        if (isHeld()) return;
        setActive(0);
        snapTo(issY());
        return;
      }

      /* ISS — always catch while stepping; release only after hold ends on last copy */
      if (activeIndex < stepCount - 1) {
        e.preventDefault();
        if (isHeld()) return;
        setActive(activeIndex + 1);
        hold(STEP_HOLD_MS);
        return;
      }

      /* Last copy: same swipe still held → block scroll; new gesture → natural */
      if (isHeld()) {
        e.preventDefault();
        hold(STEP_HOLD_MS);
        return;
      }

      return;
    }

    if (p === 'iss' && activeIndex > 0) {
      e.preventDefault();
      if (isHeld()) return;
      setActive(activeIndex - 1);
      hold(STEP_HOLD_MS);
    }
  }

  window.addEventListener('wheel', onWheel, { passive: false });
})();
