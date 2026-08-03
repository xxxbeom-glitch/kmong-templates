/**
 * Hero → ISS: one wheel intent snaps (semi-auto).
 * Wheel-up from ISS is owned by iss-slider (step back → hero).
 */
(function () {
  var hero = document.querySelector('[data-hero-snap]');
  if (!hero) return;

  var next = document.querySelector(hero.getAttribute('data-hero-snap-next') || '[data-iss-pin]');
  if (!next) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 768px)');
  if (reduce) return;

  var animating = false;
  var lastTs = 0;
  var deltaAcc = 0;
  var ACC_THRESHOLD = 48;
  var COOLDOWN_MS = 700;
  var DURATION = 0.62;

  function nextTop() {
    return Math.round(next.getBoundingClientRect().top + window.scrollY);
  }

  function inHeroExitZone() {
    var heroBottom = hero.offsetHeight;
    return window.scrollY < heroBottom * 0.72;
  }

  function snapTo(y) {
    if (animating) return;
    animating = true;
    deltaAcc = 0;
    lastTs = Date.now();

    var start = window.scrollY;
    var end = Math.max(0, y);
    if (Math.abs(end - start) < 2) {
      animating = false;
      return;
    }

    if (typeof gsap !== 'undefined') {
      var proxy = { y: start };
      gsap.to(proxy, {
        y: end,
        duration: DURATION,
        ease: 'power3.inOut',
        overwrite: true,
        onUpdate: function () {
          window.scrollTo(0, proxy.y);
        },
        onComplete: function () {
          window.scrollTo(0, end);
          animating = false;
        },
      });
      return;
    }

    window.scrollTo({ top: end, behavior: 'smooth' });
    window.setTimeout(function () {
      animating = false;
    }, COOLDOWN_MS);
  }

  function onWheel(e) {
    if (!desktop.matches || animating) return;
    if (Date.now() - lastTs < COOLDOWN_MS && Math.abs(deltaAcc) < ACC_THRESHOLD) return;

    var dy = e.deltaY;
    if (e.deltaMode === 1) dy *= 16;
    if (e.deltaMode === 2) dy *= window.innerHeight;

    /* Only hero → ISS. ISS owns wheel while docked. */
    if (dy > 0 && inHeroExitZone()) {
      e.preventDefault();
      deltaAcc += dy;
      if (deltaAcc >= ACC_THRESHOLD) {
        snapTo(nextTop());
      }
      return;
    }

    deltaAcc = 0;
  }

  window.addEventListener('wheel', onWheel, { passive: false });
})();
