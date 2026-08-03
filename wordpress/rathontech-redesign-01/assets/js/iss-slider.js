/**
 * ISS horizontal card slider — drag / touch / mouse wheel.
 */
(function () {
  var el = document.querySelector('[data-iss-swiper]');
  if (!el || typeof Swiper === 'undefined') return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // eslint-disable-next-line no-new
  new Swiper(el, {
    slidesPerView: 'auto',
    spaceBetween: 32,
    grabCursor: !reduce,
    freeMode: {
      enabled: true,
      sticky: false,
      momentumRatio: 0.85,
    },
    mousewheel: {
      enabled: true,
      forceToAxis: true,
      releaseOnEdges: true,
      sensitivity: 1,
    },
    speed: reduce ? 0 : 450,
    watchOverflow: true,
    resistanceRatio: 0.65,
  });
})();
