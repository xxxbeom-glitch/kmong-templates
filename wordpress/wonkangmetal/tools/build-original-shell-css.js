const fs = require('fs');
const path = require('path');

const theme = path.resolve(__dirname, '..');
const mirror = path.resolve(
  theme,
  '../../_reference-harness/cases/wonkangmetal/01-original/_mirror/www.wonkangmetal.co.kr'
);

function readLines(file, start, end) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  return lines.slice(start - 1, end).join('\n') + '\n';
}

function fixMirrorUrls(css) {
  const replacements = [
    ['url(/img/', 'url(../images/mirror/img/'],
    ["url('/img/", "url('../images/mirror/img/"],
    ['url("/img/', 'url("../images/mirror/img/'],
    ['url(./img/', 'url(../images/mirror/img/'],
    ['content: url(/img/', 'content: url(../images/mirror/img/'],
  ];

  let out = css;
  for (const [from, to] of replacements) {
    out = out.split(from).join(to);
  }
  return out;
}

const mainCss = path.join(mirror, 'css/s_main.css');
let css = '/* Original header/footer shell — extracted from mirror s_main.css */\n\n';
css += '/* --- utilities --- */\n' + readLines(mainCss, 38, 42);
css += '/* --- header + mobile menu --- */\n' + readLines(mainCss, 73, 501);
css += '/* --- floatY (footer TOP) --- */\n' + readLines(mainCss, 936, 944);
css += '/* --- footer --- */\n' + readLines(mainCss, 1823, 2014);
css += `
/* --- WP dual-bind bridges --- */
header.site-header.s_header::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: var(--hdr-h, 120px);
  background: var(--panel-bg, rgba(0, 0, 0, 0.7));
  backdrop-filter: blur(var(--panel-blur, 15px));
  z-index: 0;
  pointer-events: none;
  height: 0;
  opacity: 0;
}

header.site-header.s_header:hover::before,
header.site-header.s_header.menu-open::before,
header.site-header.s_header.is-menu-open::before {
  pointer-events: auto;
  animation: headerPlateDown 0.28s ease forwards;
}

header.site-header.s_header .site-header__inner {
  display: contents;
}

header.s_header nav.pc_gnb .site-nav__submenu {
  min-width: 0;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 0;
  backdrop-filter: none;
}

header.s_header nav.pc_gnb .site-nav__sublink {
  padding: 15px 0;
}

header.s_header .menu_sidebar.site-mobile-menu[hidden] {
  display: none !important;
}

header.s_header .menu_sidebar.site-mobile-menu:not([hidden]) {
  display: block;
  transform: translateY(0);
}

header.s_header .menu_sidebar .site-nav--mobile .site-nav__submenu[hidden] {
  display: none;
}

header.s_header .menu_hamberger.menu-hamburger {
  border: 0;
  padding: 0;
  background: none;
}

header.s_header .menu_hamberger .menu-hamburger__bar {
  background: #fff;
}

header.s_header .lang_box.lang-box ul.lang-box__list {
  display: none;
}

header.s_header .lang_box.lang-box > ul:not(.lang-box__list) {
  display: flex;
}

#si_footer .top.site-footer__top {
  border: 0;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

#si_footer .site-footer__nav .site-nav__submenu {
  display: block;
  position: static;
  padding: 0;
  background: transparent;
  border: 0;
}

#si_footer .site-footer__nav .site-nav__trigger {
  display: none;
}
`;

css = fixMirrorUrls(css);

const outFile = path.join(theme, 'assets/css/original-shell.css');
fs.writeFileSync(outFile, css);
console.log('Wrote original-shell.css (' + css.length + ' bytes)');
