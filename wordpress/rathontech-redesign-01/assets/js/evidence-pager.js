(function () {
  var root = document.querySelector('[data-evidence]');
  if (!root) return;

  var grid = root.querySelector('[data-evidence-grid]');
  var jsonEl = root.querySelector('[data-evidence-pages]');
  var buttons = root.querySelectorAll('[data-evidence-page]');
  if (!grid || !jsonEl || !buttons.length) return;

  var pages;
  try {
    pages = JSON.parse(jsonEl.textContent || '[]');
  } catch (e) {
    return;
  }
  if (!Array.isArray(pages) || !pages.length) return;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render(pageIndex) {
    var items = pages[pageIndex] || [];
    grid.innerHTML = items
      .map(function (item) {
        return (
          '<li class="home-evidence__item">' +
          '<a class="home-evidence__card" href="' +
          escapeHtml(item.href || '#') +
          '">' +
          '<span class="home-evidence__thumb home-evidence__thumb--' +
          escapeHtml(item.tone || 'tone-a') +
          '" aria-hidden="true"></span>' +
          '<span class="home-evidence__label">' +
          escapeHtml(item.client || '') +
          '</span>' +
          '<span class="home-evidence__sub">' +
          escapeHtml(item.sub || '') +
          '</span>' +
          '</a></li>'
        );
      })
      .join('');
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var page = parseInt(btn.getAttribute('data-evidence-page'), 10);
      if (!page || page < 1 || page > pages.length) return;

      buttons.forEach(function (b) {
        b.classList.remove('is-active');
        b.removeAttribute('aria-current');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-current', 'page');
      render(page - 1);
    });
  });
})();
