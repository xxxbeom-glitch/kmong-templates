(function () {
  'use strict';

  function initScrollTop() {
    var btn = document.querySelector('[data-scroll-top]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initScrollTop();
  });
})();
