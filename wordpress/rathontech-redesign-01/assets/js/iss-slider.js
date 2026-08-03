/**
 * ISS — left text pagination + right cards (slidesPerView ~1.9).
 * Ref pattern: onetenth #2 (pagination-as-tabs, not real tabs).
 */
(function () {
  var el = document.querySelector('[data-iss-swiper]');
  var paginationEl = document.querySelector('[data-iss-pagination]');
  if (!el || !paginationEl || typeof Swiper === 'undefined') return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var labels = [];

  try {
    labels = JSON.parse(el.getAttribute('data-iss-labels') || '[]');
  } catch (e) {
    labels = [];
  }

  if (!labels.length) {
    el.querySelectorAll('.home-iss__card-title').forEach(function (title) {
      labels.push((title.textContent || '').trim());
    });
  }

  // eslint-disable-next-line no-new
  new Swiper(el, {
    slidesPerView: 1.15,
    spaceBetween: 16,
    grabCursor: !reduce,
    speed: reduce ? 0 : 450,
    watchOverflow: true,
    resistanceRatio: 0.65,
    pagination: {
      el: paginationEl,
      clickable: true,
      renderBullet: function (index, className) {
        var label = labels[index] || String(index + 1);
        return (
          '<button type="button" class="' +
          className +
          '" role="tab">' +
          label +
          '</button>'
        );
      },
    },
    breakpoints: {
      768: {
        slidesPerView: 1.45,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 1.9,
        spaceBetween: 20,
      },
    },
  });
})();
