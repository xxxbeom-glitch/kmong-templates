/**
 * ISS horizontal card slider — mouse drag / touch.
 * Requires Swiper (enqueued on front page).
 */
(function () {
  var el = document.querySelector('[data-iss-swiper]');
  if (!el || typeof Swiper === 'undefined') return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // eslint-disable-next-line no-new
  new Swiper(el, {
    slidesPerView: 'auto',
    spaceBetween: 24,
    grabCursor: !reduce,
    freeMode: {
      enabled: true,
      sticky: false,
    },
    speed: reduce ? 0 : 450,
    watchOverflow: true,
    resistanceRatio: 0.65,
  });
})();
