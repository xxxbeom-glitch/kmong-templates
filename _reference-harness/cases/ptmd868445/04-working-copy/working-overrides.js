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
 * Full-bleed 1-slide · autoplay 5s.
 *
 * Theme `initKVSwiper` (optimizer_user): card mode + delay 3000, and its
 * on.init writes `.kv-page-current` (missing in style-A markup → can throw).
 * Previous override raced early + 1.5s destroy/rebuild → image+text flash.
 *
 * Rule: wait Morenvy `.init`, let theme bind once, then take over ONCE.
 * No periodic destroy.
 */
(function () {
  var AUTOPLAY_MS = 5000;
  var owned = false;

  function realSlideCount(el) {
    return el.querySelectorAll(
      '.swiper-wrapper > .swiper-slide.kv-slide, .swiper-wrapper > .kv-slide'
    ).length;
  }

  function destroyKvInstances(el) {
    if (el && el.swiper) {
      try {
        el.swiper.destroy(true, true);
      } catch (e) {}
    }
    if (window.kvSwiper && typeof window.kvSwiper.destroy === 'function') {
      try {
        window.kvSwiper.destroy(true, true);
      } catch (e) {}
    }
    window.kvSwiper = null;
  }

  function ensureThemePagestubs(box) {
    // Theme initKVSwiper on.init touches these; missing nodes throw mid-init.
    if (!box) return;
    if (!box.querySelector('.kv-page-current')) {
      var cur = document.createElement('span');
      cur.className = 'kv-page-current';
      cur.setAttribute('aria-hidden', 'true');
      cur.style.display = 'none';
      box.appendChild(cur);
    }
    if (!box.querySelector('.kv-page-total')) {
      var tot = document.createElement('span');
      tot.className = 'kv-page-total';
      tot.setAttribute('aria-hidden', 'true');
      tot.style.display = 'none';
      box.appendChild(tot);
    }
  }

  function isStyleA(sw) {
    if (!sw || !sw.params) return false;
    if (sw.params.slidesPerView !== 1) return false;
    var ap = sw.params.autoplay;
    if (ap && typeof ap === 'object' && ap.delay && ap.delay < 4000) return false;
    return true;
  }

  function takeOver() {
    if (owned) return true;
    var section = document.querySelector('.kv-section--style-a');
    var el = section && section.querySelector('.kv-swiper');
    var area = section && section.querySelector('.morenvy-banner-area.init');
    var box = section && section.querySelector('.kv-container');
    if (!el || !area || typeof Swiper === 'undefined') return false;

    var slides = realSlideCount(el);
    var hasImg = el.querySelector('.kv-image img');
    if (slides < 1 || !hasImg) return false;

    ensureThemePagestubs(box);
    destroyKvInstances(el);

    window.kvSwiper = new Swiper(el, {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      centeredSlides: false,
      loop: slides > 1,
      speed: 600,
      autoplay:
        slides > 1
          ? {
              delay: AUTOPLAY_MS,
              disableOnInteraction: false,
            }
          : false,
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
          if (box) box.classList.add('init');
        },
      },
    });

    owned = true;
    el.setAttribute('data-moa-kv', 'style-a');
    return true;
  }

  // Theme polls .init every 200ms then inits card Swiper.
  // Stub page nodes early so theme on.init does not throw.
  // Take over after theme's first bind (~250–400ms after .init).
  var waitTries = 0;
  var waitTimer = setInterval(function () {
    waitTries += 1;
    var box = document.querySelector('.kv-section--style-a .kv-container');
    var area = document.querySelector(
      '.kv-section--style-a .morenvy-banner-area.init'
    );
    if (box) ensureThemePagestubs(box);
    if (!area) {
      if (waitTries > 120) clearInterval(waitTimer);
      return;
    }
    clearInterval(waitTimer);
    // After theme's 200ms poll likely ran
    setTimeout(function () {
      takeOver();
      // One late retry if Morenvy images/slides arrived after theme
      setTimeout(function () {
        if (!owned) takeOver();
        else {
          var el = document.querySelector('.kv-section--style-a .kv-swiper');
          if (el && el.swiper && !isStyleA(el.swiper)) {
            owned = false;
            takeOver();
          }
        }
      }, 600);
    }, 350);
  }, 100);
})();
