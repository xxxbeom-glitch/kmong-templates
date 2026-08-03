/**
 * ISS — scroll-pin-multi-step (catalog).
 * PC: pin section · scrub/wheel advances copy sets · then release to next section.
 * MO (≤767) / reduced-motion: no pin, stacked copy.
 */
(function () {
  var section = document.querySelector('[data-iss-pin]');
  if (!section) return;

  var steps = section.querySelectorAll('[data-iss-step]');
  var progressItems = section.querySelectorAll('[data-iss-progress]');
  var stepCount = steps.length;
  if (!stepCount) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var activeIndex = 0;

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

    progressItems.forEach(function (item, i) {
      item.classList.toggle('is-active', i === index);
    });
  }

  function indexFromProgress(progress) {
    if (stepCount <= 1) return 0;
    if (progress >= 0.999) return stepCount - 1;
    return Math.min(stepCount - 1, Math.floor(progress * stepCount));
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
        return '+=' + window.innerHeight * stepCount;
      },
      scrub: 0.35,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      snap: {
        snapTo: function (value) {
          if (stepCount <= 1) return 0;
          return Math.round(value * (stepCount - 1)) / (stepCount - 1);
        },
        duration: { min: 0.12, max: 0.28 },
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
