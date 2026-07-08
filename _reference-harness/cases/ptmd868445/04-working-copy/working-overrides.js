/**
 * MOALUCK working overrides — MD'S PICK only
 * Target size feel: PTMD807311 grid4 (~1:1, 4 per row on desktop)
 * Do NOT touch other listmain/swiper until user approval.
 */
(function () {
  function syncNavToThumb(root) {
    if (!root) return;
    var box = root.querySelector('.swiper-box');
    var thumb = root.querySelector('.thumbnail');
    var next = root.querySelector('.swiper-button-next');
    var prev = root.querySelector('.swiper-button-prev');
    if (!box || !thumb || !next || !prev) return;

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

  function patchMdPick() {
    var root = document.querySelector('section.md-pick');
    if (!root) return false;
    var el = root.querySelector('.swiper');
    if (!el || !el.swiper) return false;

    var sw = el.swiper;
    if (!sw.__moaMdPickPatched) {
      sw.__moaMdPickPatched = true;

      sw.params.slidesPerView = 2;
      sw.params.slidesPerGroup = 2;
      sw.params.spaceBetween = 8;
      sw.params.breakpoints = {
        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 16,
        },
      };

      if (window.innerWidth >= 1024) {
        sw.params.slidesPerView = 4;
        sw.params.slidesPerGroup = 4;
        sw.params.spaceBetween = 16;
      } else if (window.innerWidth >= 768) {
        sw.params.slidesPerView = 3;
        sw.params.slidesPerGroup = 3;
        sw.params.spaceBetween = 16;
      }

      sw.update();

      sw.on('resize', function () {
        syncNavToThumb(root);
      });
      sw.on('update', function () {
        syncNavToThumb(root);
      });
      window.addEventListener('resize', function () {
        syncNavToThumb(root);
      });
    }

    syncNavToThumb(root);
    return true;
  }

  var tries = 0;
  var timer = setInterval(function () {
    tries += 1;
    if (patchMdPick() || tries > 40) clearInterval(timer);
  }, 150);

  document.addEventListener('DOMContentLoaded', patchMdPick);
  window.addEventListener('load', patchMdPick);
})();
