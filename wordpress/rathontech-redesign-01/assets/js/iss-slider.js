/**
 * ISS — wheel-step: 1 wheel = next copy, next wheel = leave to following section.
 * PC only · MO stacks both copies · prefers-reduced-motion skips hijack.
 */
(function () {
  var section = document.querySelector('[data-iss-pin]');
  if (!section) return;

  var steps = section.querySelectorAll('[data-iss-step]');
  var stepCount = steps.length;
  if (!stepCount) return;

  var video = section.querySelector('[data-iss-video]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 768px)');
  var nextSel = section.getAttribute('data-iss-next') || '.home-eco';
  var next = document.querySelector(nextSel);
  var activeIndex = 0;
  var animating = false;
  var deltaAcc = 0;
  var lastTs = 0;
  var ACC_THRESHOLD = 40;
  var COOLDOWN_MS = 520;
  var SNAP_DURATION = 0.58;

  function initVideo() {
    if (!video || reduce) return;
    video.playbackRate = 0.5;
    var play = video.play();
    if (play && typeof play.catch === 'function') {
      play.catch(function () {});
    }
  }

  function setActive(index) {
    if (index < 0 || index >= stepCount) return;
    if (index === activeIndex) return;
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

  function sectionTop() {
    return Math.round(section.getBoundingClientRect().top + window.scrollY);
  }

  function nextTop() {
    if (!next) return sectionTop() + section.offsetHeight;
    return Math.round(next.getBoundingClientRect().top + window.scrollY);
  }

  function isIssCurrent() {
    var top = section.getBoundingClientRect().top;
    return top > -48 && top < 72;
  }

  function snapTo(y, onDone) {
    if (animating) return;
    animating = true;
    deltaAcc = 0;
    lastTs = Date.now();

    var start = window.scrollY;
    var end = Math.max(0, y);
    if (Math.abs(end - start) < 2) {
      animating = false;
      if (onDone) onDone();
      return;
    }

    if (typeof gsap !== 'undefined') {
      var proxy = { y: start };
      gsap.to(proxy, {
        y: end,
        duration: SNAP_DURATION,
        ease: 'power3.inOut',
        overwrite: true,
        onUpdate: function () {
          window.scrollTo(0, proxy.y);
        },
        onComplete: function () {
          window.scrollTo(0, end);
          animating = false;
          if (onDone) onDone();
        },
      });
      return;
    }

    window.scrollTo({ top: end, behavior: 'smooth' });
    window.setTimeout(function () {
      animating = false;
      if (onDone) onDone();
    }, COOLDOWN_MS);
  }

  function onWheel(e) {
    if (!desktop.matches || reduce || animating) return;
    if (!isIssCurrent()) {
      deltaAcc = 0;
      return;
    }
    if (Date.now() - lastTs < COOLDOWN_MS) {
      e.preventDefault();
      return;
    }

    var dy = e.deltaY;
    if (e.deltaMode === 1) dy *= 16;
    if (e.deltaMode === 2) dy *= window.innerHeight;

    e.preventDefault();
    deltaAcc += dy;

    if (deltaAcc >= ACC_THRESHOLD) {
      deltaAcc = 0;
      lastTs = Date.now();
      if (activeIndex < stepCount - 1) {
        setActive(activeIndex + 1);
      } else {
        snapTo(nextTop(), function () {
          setActive(0);
        });
      }
      return;
    }

    if (deltaAcc <= -ACC_THRESHOLD) {
      deltaAcc = 0;
      lastTs = Date.now();
      if (activeIndex > 0) {
        setActive(activeIndex - 1);
      } else {
        snapTo(0);
      }
    }
  }

  initVideo();
  if (video) {
    video.addEventListener('loadedmetadata', function () {
      video.playbackRate = 0.5;
    });
  }

  if (!reduce) {
    window.addEventListener('wheel', onWheel, { passive: false });
  }
})();
