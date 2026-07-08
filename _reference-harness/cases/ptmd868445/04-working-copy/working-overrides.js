/**
 * MOALUCK working overrides — shared product modules
 * Apply MD'S PICK decisions to all product carousels (.prdList inside .swiper):
 * - Desktop 4 / tablet 3 / mobile 2 · spaceBetween 16 (desktop/tablet) / 8 (mobile)
 * - Nav Y synced to thumbnail center
 *
 * Do NOT set margin-right:0 !important in CSS — that kills Swiper spaceBetween
 * (Swiper applies gap as inline margin-right).
 */
(function () {
  var FOUR_COL = {
    mobile: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 8 },
    tablet: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 16 },
    desktop: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 16 },
  };

  function cfgForWidth() {
    if (window.innerWidth >= 1024) return FOUR_COL.desktop;
    if (window.innerWidth >= 768) return FOUR_COL.tablet;
    return FOUR_COL.mobile;
  }

  function syncNavToThumb(box) {
    if (!box) return;
    var thumb = box.querySelector('.thumbnail');
    var next = box.querySelector('.swiper-button-next');
    var prev = box.querySelector('.swiper-button-prev');
    if (!thumb || !next || !prev) return;

    var boxRect = box.getBoundingClientRect();
    var thumbRect = thumb.getBoundingClientRect();
    var mid = thumbRect.top - boxRect.top + thumbRect.height / 2;
    if (!(mid > 0)) return;

    var y = Math.round(mid) + 'px';
    next.style.top = y;
    prev.style.top = y;
    next.style.marginTop = '0';
    prev.style.marginTop = '0';
    next.style.transform = 'translateY(-50%)';
    prev.style.transform = 'translateY(-50%)';
  }

  function applyViewportParams(sw) {
    var cfg = cfgForWidth();
    sw.params.slidesPerView = cfg.slidesPerView;
    sw.params.slidesPerGroup = cfg.slidesPerGroup;
    sw.params.spaceBetween = cfg.spaceBetween;
    sw.params.watchOverflow = true;
    // keep breakpoint table in sync so resize/breakpointChange don't revert to 6
    sw.params.breakpoints = {
      768: {
        slidesPerView: FOUR_COL.tablet.slidesPerView,
        slidesPerGroup: FOUR_COL.tablet.slidesPerGroup,
        spaceBetween: FOUR_COL.tablet.spaceBetween,
      },
      1024: {
        slidesPerView: FOUR_COL.desktop.slidesPerView,
        slidesPerGroup: FOUR_COL.desktop.slidesPerGroup,
        spaceBetween: FOUR_COL.desktop.spaceBetween,
      },
    };
  }

  function refreshSwiper(sw) {
    applyViewportParams(sw);
    if (typeof sw.breakpoint === 'function') {
      try {
        sw.breakpoint();
      } catch (e) {}
    }
    if (typeof sw.updateSize === 'function') sw.updateSize();
    if (typeof sw.updateSlides === 'function') sw.updateSlides();
    if (typeof sw.updateProgress === 'function') sw.updateProgress();
    if (typeof sw.updateSlidesClasses === 'function') sw.updateSlidesClasses();
    sw.update();
  }

  function patchProductSwiper(el) {
    if (!el || !el.swiper) return false;
    if (!el.querySelector('.prdList')) return false;

    var sw = el.swiper;
    var box = el.closest('.swiper-box') || el.parentElement;

    if (!sw.__moaPrdPatched) {
      sw.__moaPrdPatched = true;
      // base (mobile-first) before first refresh
      sw.params.slidesPerView = FOUR_COL.mobile.slidesPerView;
      sw.params.slidesPerGroup = FOUR_COL.mobile.slidesPerGroup;
      sw.params.spaceBetween = FOUR_COL.mobile.spaceBetween;

      refreshSwiper(sw);

      sw.on('resize', function () {
        refreshSwiper(sw);
        syncNavToThumb(box);
      });
      sw.on('breakpoint', function () {
        refreshSwiper(sw);
        syncNavToThumb(box);
      });
      sw.on('update', function () {
        syncNavToThumb(box);
      });
    } else {
      refreshSwiper(sw);
    }

    syncNavToThumb(box);
    return true;
  }

  function patchAll() {
    var nodes = document.querySelectorAll('.swiper');
    var ok = 0;
    for (var i = 0; i < nodes.length; i++) {
      if (patchProductSwiper(nodes[i])) ok += 1;
    }
    document.querySelectorAll('.swiper-box').forEach(function (box) {
      if (box.querySelector('.prdList')) syncNavToThumb(box);
    });
    return ok > 0;
  }

  var tries = 0;
  var timer = setInterval(function () {
    tries += 1;
    patchAll();
    if (tries > 40) clearInterval(timer);
  }, 150);

  document.addEventListener('DOMContentLoaded', patchAll);
  window.addEventListener('load', patchAll);
  window.addEventListener('resize', function () {
    patchAll();
  });

  document.addEventListener(
    'click',
    function () {
      setTimeout(patchAll, 50);
      setTimeout(patchAll, 300);
    },
    true
  );
})();

/**
 * KV → PTMD869920 기본형(A)
 * Destroy card+peek KV and re-init as full-bleed 1-slide swiper.
 */
(function () {
  var inited = false;

  function rebuildKv() {
    var el = document.querySelector('.kv-section--style-a .kv-swiper');
    if (!el || typeof Swiper === 'undefined') return false;

    // destroy theme instance if already bound
    if (el.swiper) {
      try {
        el.swiper.destroy(true, true);
      } catch (e) {}
    }
    if (window.kvSwiper && typeof window.kvSwiper.destroy === 'function') {
      try {
        window.kvSwiper.destroy(true, true);
      } catch (e) {}
      window.kvSwiper = null;
    }

    window.kvSwiper = new Swiper(el, {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      loop: true,
      speed: 600,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.kv-section--style-a .kv-pagination',
        clickable: true,
        type: 'bullets',
      },
      navigation: {
        nextEl: '.kv-section--style-a .kv-btn-next',
        prevEl: '.kv-section--style-a .kv-btn-prev',
      },
      on: {
        init: function () {
          var box = document.querySelector('.kv-section--style-a .kv-container');
          if (box) box.classList.add('init');
        },
      },
    });

    inited = true;
    return true;
  }

  function tryRebuild() {
    if (inited && document.querySelector('.kv-section--style-a .kv-swiper.swiper-initialized')) {
      return;
    }
    // wait until banner markup expanded (morenvy) or at least one real slide exists
    var slides = document.querySelectorAll('.kv-section--style-a .kv-slide');
    if (!slides.length) return;
    rebuildKv();
  }

  var tries = 0;
  var timer = setInterval(function () {
    tries += 1;
    tryRebuild();
    if (inited || tries > 60) clearInterval(timer);
  }, 200);

  document.addEventListener('DOMContentLoaded', tryRebuild);
  window.addEventListener('load', function () {
    setTimeout(tryRebuild, 100);
    setTimeout(tryRebuild, 800);
  });
})();
