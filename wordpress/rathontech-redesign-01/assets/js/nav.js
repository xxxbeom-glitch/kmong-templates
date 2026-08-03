(function () {
  /* Mobile drawer */
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  var closeBtn = document.querySelector('[data-menu-close]');

  function openMenu() {
    if (!menu || !toggle) return;
    menu.hidden = false;
    menu.removeAttribute('inert');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!menu || !toggle) return;
    menu.hidden = true;
    menu.setAttribute('inert', '');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      if (menu.hidden) openMenu();
      else closeMenu();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) closeMenu();
    });
  }

  /* Mobile 2depth accordion */
  document.querySelectorAll('.mobile-menu__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('aria-controls');
      var panel = id ? document.getElementById(id) : null;
      if (!panel) return;
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (open) panel.setAttribute('hidden', '');
      else panel.removeAttribute('hidden');
    });
  });

  /* PC gnb-full-expand */
  function initHeaderMega() {
    var header = document.querySelector('[data-header-mega]');
    if (!header) return;

    var mq = window.matchMedia('(min-width: 1025px) and (hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    var panel = header.querySelector('#gnb-mega-panel');
    var dim = header.querySelector('.site-header__dim');
    var items = header.querySelectorAll('.site-header__item--has-mega');
    var triggers = header.querySelectorAll('.site-header__trigger');
    var megaList = header.querySelector('.site-header__mega-list');
    var cols = header.querySelectorAll('.site-header__mega-col');
    var closeDelay = 220;
    var closeTimer = null;

    if (!panel || !megaList || !triggers.length) return;

    function setActive(index) {
      items.forEach(function (item, i) {
        item.classList.toggle('is-active', i === index);
      });
      triggers.forEach(function (trigger, i) {
        trigger.setAttribute('aria-expanded', i === index ? 'true' : 'false');
      });
    }

    function syncDimTop() {
      if (!dim) return;
      dim.style.top = header.getBoundingClientRect().bottom + 'px';
    }

    function syncMegaAlignment() {
      var listRect = megaList.getBoundingClientRect();
      var maxBottom = 0;

      items.forEach(function (item, i) {
        var trigger = item.querySelector('.site-header__trigger, .site-header__link');
        var col = cols[i];
        if (!trigger || !col) return;

        var triggerRect = trigger.getBoundingClientRect();
        var nextTrigger = items[i + 1]
          ? items[i + 1].querySelector('.site-header__trigger, .site-header__link')
          : null;
        var width = nextTrigger
          ? nextTrigger.getBoundingClientRect().left - triggerRect.left
          : Math.max(item.getBoundingClientRect().width, 140);

        col.style.left = triggerRect.left - listRect.left + 'px';
        col.style.width = Math.max(width, 120) + 'px';
        maxBottom = Math.max(maxBottom, col.offsetHeight);
      });

      if (maxBottom > 0) {
        megaList.style.minHeight = maxBottom + 'px';
      }
    }

    function closeMega() {
      clearTimeout(closeTimer);
      header.classList.remove('is-mega-open');
      panel.setAttribute('hidden', '');
      panel.setAttribute('inert', '');
      if (dim) dim.setAttribute('hidden', '');
      setActive(-1);
    }

    function openMega(index) {
      clearTimeout(closeTimer);
      header.classList.add('is-mega-open');
      panel.removeAttribute('hidden');
      panel.removeAttribute('inert');
      if (dim) dim.removeAttribute('hidden');
      setActive(index);
      syncDimTop();
      window.requestAnimationFrame(function () {
        syncMegaAlignment();
      });
    }

    function scheduleClose() {
      clearTimeout(closeTimer);
      closeTimer = window.setTimeout(closeMega, closeDelay);
    }

    items.forEach(function (item, i) {
      item.addEventListener('mouseenter', function () {
        if (header.classList.contains('is-mega-open')) {
          setActive(i);
          return;
        }
        openMega(i);
      });

      var trigger = item.querySelector('.site-header__trigger');
      if (trigger) {
        trigger.addEventListener('focus', function () {
          openMega(i);
        });
      }
    });

    header.addEventListener('mouseleave', function (e) {
      if (e.relatedTarget && header.contains(e.relatedTarget)) return;
      scheduleClose();
    });

    panel.addEventListener('mouseenter', function () {
      clearTimeout(closeTimer);
    });

    if (dim) {
      dim.addEventListener('click', closeMega);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMega();
    });

    document.addEventListener('click', function (e) {
      if (!header.classList.contains('is-mega-open')) return;
      if (header.contains(e.target)) return;
      closeMega();
    });

    window.addEventListener('resize', function () {
      syncDimTop();
      if (header.classList.contains('is-mega-open')) syncMegaAlignment();
    });

    window.addEventListener('scroll', function () {
      if (header.classList.contains('is-mega-open')) {
        syncDimTop();
        syncMegaAlignment();
      }
    }, { passive: true });
  }

  initHeaderMega();
})();
