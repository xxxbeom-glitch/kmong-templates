(function () {
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  var closeBtn = document.querySelector('[data-menu-close]');
  if (!toggle || !menu) return;

  function openMenu() {
    menu.hidden = false;
    menu.removeAttribute('inert');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.hidden = true;
    menu.setAttribute('inert', '');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

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
})();
