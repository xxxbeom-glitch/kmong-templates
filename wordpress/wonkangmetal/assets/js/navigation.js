(function () {
  'use strict';

  function toggleHidden(el, show) {
    if (!el) return;
    if (show) {
      el.removeAttribute('hidden');
    } else {
      el.setAttribute('hidden', '');
    }
  }

  function initMobileMenu() {
    var toggle = document.querySelector('.site-header__menu-toggle');
    var panel = document.getElementById('site-mobile-menu');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      toggleHidden(panel, !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });

    panel.addEventListener('click', function (event) {
      if (event.target === panel) {
        toggle.setAttribute('aria-expanded', 'false');
        toggleHidden(panel, false);
        document.body.style.overflow = '';
      }
    });
  }

  function initDesktopDropdowns() {
    var triggers = document.querySelectorAll('.site-nav--desktop .site-nav__trigger');
    triggers.forEach(function (trigger) {
      var submenu = trigger.parentElement.querySelector('.site-nav__submenu');
      if (!submenu) return;

      trigger.addEventListener('click', function () {
        var open = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
        toggleHidden(submenu, !open);
      });
    });
  }

  function initMobileSubmenus() {
    var triggers = document.querySelectorAll('.site-nav--mobile .site-nav__trigger[data-mobile-submenu]');
    triggers.forEach(function (trigger) {
      var submenu = trigger.parentElement.querySelector('.site-nav__submenu');
      if (!submenu) return;

      trigger.addEventListener('click', function () {
        var open = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
        toggleHidden(submenu, !open);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initDesktopDropdowns();
    initMobileSubmenus();
  });
})();
