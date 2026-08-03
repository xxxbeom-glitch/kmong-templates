/**
 * ISS — scroll-pin-multi-step + background video @ 0.5x.
 */
(function () {
  var section = document.querySelector('[data-iss-pin]');
  if (!section) return;

  var steps = section.querySelectorAll('[data-iss-step]');
  var stepCount = steps.length;
  if (!stepCount) return;

  var video = section.querySelector('[data-iss-video]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var activeIndex = 0;

  function initVideo() {
    if (!video || reduce) return;
    video.playbackRate = 0.5;
    var play = video.play();
    if (play && typeof play.catch === 'function') {
      play.catch(function () {});
    }
  }

  function setActive(index) {
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

  function indexFromProgress(progress) {
    if (stepCount <= 1) return 0;
    if (progress >= 0.999) return stepCount - 1;
    return Math.min(stepCount - 1, Math.floor(progress * stepCount));
  }

  initVideo();
  if (video) {
    video.addEventListener('loadedmetadata', function () {
      video.playbackRate = 0.5;
    });
  }

  if (reduce || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  var mm = gsap.matchMedia();

  mm.add('(min-width: 768px)', function () {
    var pinTarget = section.querySelector('.home-iss__pin') || section;

    var st = ScrollTrigger.create({
      trigger: section,
      pin: pinTarget,
      pinSpacing: true,
      start: 'top top',
      end: function () {
        /* 2 steps ≈ 1.1vh total → 2nd copy ~0.55vh (was 2vh / 1vh) */
        return '+=' + window.innerHeight * Math.max(1, stepCount * 0.55);
      },
      scrub: 0.25,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      snap: {
        snapTo: function (value) {
          if (stepCount <= 1) return 0;
          return Math.round(value * (stepCount - 1)) / (stepCount - 1);
        },
        duration: { min: 0.1, max: 0.22 },
        ease: 'power1.inOut',
      },
      onUpdate: function (self) {
        setActive(indexFromProgress(self.progress));
      },
    });

    return function () {
      if (st) st.kill();
      setActive(0);
    };
  });
})();
