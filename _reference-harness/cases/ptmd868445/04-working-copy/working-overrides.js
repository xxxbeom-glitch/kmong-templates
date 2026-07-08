/**
 * MOALUCK working overrides — shared product modules
 * Apply MD'S PICK decisions to all product carousels (.prdList inside .swiper):
 * - Desktop 4 / tablet 3 / mobile 2
 * - Nav Y synced to thumbnail center
 */
(function () {
  var FOUR_COL = {
    mobile: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 8 },
    tablet: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 16 },
    desktop: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 16 },
  };

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
    var cfg;
    if (window.innerWidth >= 1024) cfg = FOUR_COL.desktop;
    else if (window.innerWidth >= 768) cfg = FOUR_COL.tablet;
    else cfg = FOUR_COL.mobile;
    sw.params.slidesPerView = cfg.slidesPerView;
    sw.params.slidesPerGroup = cfg.slidesPerGroup;
    sw.params.spaceBetween = cfg.spaceBetween;
    // grid % width + theme margin-right break Swiper math — keep slides under Swiper control
    sw.params.watchOverflow = true;
    if (typeof sw.updateSize === 'function') sw.updateSize();
    if (typeof sw.updateSlides === 'function') sw.updateSlides();
    if (typeof sw.updateSlidesClasses === 'function') sw.updateSlidesClasses();
  }

  function patchProductSwiper(el) {
    if (!el || !el.swiper) return false;
    if (!el.querySelector('.prdList')) return false;

    var sw = el.swiper;
    var box = el.closest('.swiper-box') || el.parentElement;

    if (!sw.__moaPrdPatched) {
      sw.__moaPrdPatched = true;
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
      // base (mobile-first) values
      sw.params.slidesPerView = FOUR_COL.mobile.slidesPerView;
      sw.params.slidesPerGroup = FOUR_COL.mobile.slidesPerGroup;
      sw.params.spaceBetween = FOUR_COL.mobile.spaceBetween;

      applyViewportParams(sw);
      sw.update();

      sw.on('resize', function () {
        applyViewportParams(sw);
        syncNavToThumb(box);
      });
      sw.on('update', function () {
        syncNavToThumb(box);
      });
    } else {
      applyViewportParams(sw);
      sw.update();
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
    // also sync static/swiper-box navs that already exist
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

  // Brand exhibition / ranking tabs swap panels after init
  document.addEventListener(
    'click',
    function () {
      setTimeout(patchAll, 50);
      setTimeout(patchAll, 300);
    },
    true
  );
})();
