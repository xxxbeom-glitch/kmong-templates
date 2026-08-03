(function () {
  var root = document.querySelector('[data-media]');
  if (!root) return;

  var tabs = root.querySelectorAll('[data-media-filter]');
  var items = root.querySelectorAll('[data-media-cat]');
  if (!tabs.length || !items.length) return;

  function setFilter(filter) {
    tabs.forEach(function (tab) {
      var active = tab.getAttribute('data-media-filter') === filter;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    items.forEach(function (item) {
      var cat = item.getAttribute('data-media-cat');
      var show = filter === 'all' || cat === filter;
      item.classList.toggle('is-hidden', !show);
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      setFilter(tab.getAttribute('data-media-filter') || 'all');
    });
  });
})();
