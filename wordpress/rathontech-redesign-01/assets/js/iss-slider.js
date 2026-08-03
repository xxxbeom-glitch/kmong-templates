/**
 * ISS — title page navigation (4 panels: main + sub).
 */
(function () {
  var root = document.querySelector('[data-iss-pager]');
  if (!root) return;

  var panels = root.querySelectorAll('[data-iss-panel]');
  var buttons = root.querySelectorAll('[data-iss-page]');
  if (!panels.length || !buttons.length) return;

  function show(index) {
    panels.forEach(function (panel, i) {
      var on = i === index;
      panel.classList.toggle('is-active', on);
      if (on) {
        panel.removeAttribute('hidden');
        var title = panel.querySelector('.home-iss__title');
        if (title && !title.id) title.id = 'home-iss-title';
      } else {
        panel.setAttribute('hidden', '');
        var t = panel.querySelector('.home-iss__title');
        if (t && t.id === 'home-iss-title') t.removeAttribute('id');
      }
    });

    buttons.forEach(function (btn, i) {
      var on = i === index;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-current', on ? 'true' : 'false');
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var index = parseInt(btn.getAttribute('data-iss-page'), 10);
      if (Number.isNaN(index)) return;
      show(index);
    });
  });
})();
