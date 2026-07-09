/**
 * Original Style Compatibility Gap Analysis
 * Run: node tools/compatibility-gap-report.js
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const mirror = path.resolve(
  root,
  '../../_reference-harness/cases/wonkangmetal/01-original/_mirror/www.wonkangmetal.co.kr'
);

function read(p) {
  return fs.readFileSync(p, 'utf8');
}

function extractClasses(html) {
  const set = new Set();
  const re = /class\s*=\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(html))) {
    m[1].split(/\s+/).filter(Boolean).forEach((c) => set.add(c));
  }
  return set;
}

function extractIds(html) {
  const set = new Set();
  const re = /\bid\s*=\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(html))) set.add(m[1]);
  return set;
}

function extractCssSelectors(css) {
  const set = new Set();
  const re = /([.#][a-zA-Z_][\w-]*(?:\s*[>+~]\s*)?(?:[.#][a-zA-Z_][\w-]*)*)/g;
  // Better: match rule selectors before {
  const ruleRe = /([^{}]+)\{/g;
  let m;
  while ((m = ruleRe.exec(css))) {
    const chunk = m[1].trim();
    if (chunk.startsWith('@')) continue;
    chunk.split(',').forEach((sel) => {
      const s = sel.trim();
      if (s && !s.startsWith('@')) set.add(s);
    });
  }
  return set;
}

function extractJsSelectors(js) {
  const sels = new Set();
  const patterns = [
    /\$\(\s*["'`]([^"'`]+)["'`]/g,
    /\$\$\(\s*["'`]([^"'`]+)["'`]/g,
    /querySelector\(\s*["'`]([^"'`]+)["'`]/g,
    /querySelectorAll\(\s*["'`]([^"'`]+)["'`]/g,
    /new Swiper\(\s*["'`]([^"'`]+)["'`]/g,
    /nextEl:\s*["'`]([^"'`]+)["'`]/g,
    /prevEl:\s*["'`]([^"'`]+)["'`]/g,
    /trigger:\s*["'`]([^"'`]+)["'`]/g,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(js))) sels.add(m[1]);
  }
  return sels;
}

function sliceMain(html) {
  const start = html.indexOf('<main');
  const end = html.indexOf('</main>');
  return start >= 0 ? html.slice(start, end + 7) : html;
}

function collectWpTemplates(dir) {
  let out = '';
  function walk(d) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.name.endsWith('.php')) out += read(p) + '\n';
    }
  }
  walk(dir);
  out += read(path.join(root, 'header.php'));
  out += read(path.join(root, 'footer.php'));
  out += read(path.join(root, 'front-page.php'));
  return out;
}

const origIndex = read(path.join(mirror, 'index.html'));
const origMain = sliceMain(origIndex);
const origHeader = (origIndex.match(/<header[\s\S]*?<\/header>/) || [''])[0];
const origFooter = (origIndex.match(/<footer[\s\S]*?<\/footer>/) || [''])[0];

const wpTpl = collectWpTemplates(path.join(root, 'template-parts'));

const origMainCls = extractClasses(origMain);
const origHdrCls = extractClasses(origHeader);
const origFtrCls = extractClasses(origFooter);
const wpCls = extractClasses(wpTpl);

const criticalOrig = {
  header: [
    's_header', 'flex_center', 'pc_gnb', 's_gnb', 'utils', 'contact_button', 'lang_box',
    'menu_hamberger', 'menu_sidebar', 'mobile_gnb', 'scrolled', 'hide', 'active', 'is-open',
  ],
  main: [
    'main_visual', 'slide_txt', 'sub_caption', 'slide01', 'slide02', 'slide03', 'is-anim',
    'main_section', 'main_business', 'business_title', 'mask-fill', 'line1', 'line2', 'line3',
    'base', 'reveal', 'ink', 'business_slider', 'business_pc', 'business_m', 'business_slider_m',
    'slider_pagenation', 'current_number', 'total_number', 'scroll', 'business_slider_wrap',
    'busness_slider_nav', 'busness_prev', 'busness_next', 'img_wrap',
    'main_company', 'main_inner', 'main_title', 'split-title', 'stats_list', 'count', 'unit', 'txt',
    'view_more_01', 'view_more_02', 'text-top', 'text-bottom', 'arrows', 'arrow', 'a1', 'a2',
    'main_solution', 'parts', 'parts_list', 'part_01', 'part_02', 'part_03', 'part_04',
    'main_vision', 'quality_bg', 'vision_item', 'vision_01', 'vision_02', 'vision_03', 'vision_04',
    'main_vision_m', 'vision_slider', 'vision_slider_nav', 'vision_prev', 'vision_next',
    'main_customer', 'image_pc', 'image_m', 'content',
    'main_gallery', 'gallery_slider_wrap', 'board_slider', 'board_slider_nav', 'board_slider_prev',
    'board_slider_next', 'category', 'date', 'main_contact', 'conmtact_title',
  ],
  footer: [
    'si_footer', 'footer_logo', 'footer_content', 'info', 'footer_utils', 'copyright', 'top',
  ],
  sub: [
    'sub_visual', 'sub_visual_bg01', 'sub_visual_bg02', 'sub_visual_bg03', 'sub_visual_bg04',
    'sub_visual_bg05', 'breadcrumb', 'sub_nav', 'active', 'si_inner', 'sub_section', 'sub_board',
  ],
  board: ['bo_list', 'bo_cate', 'bo_sch', 'tbl_head01', 'td_subject', 'list_item', 'gallery_list'],
};

const sMain = read(path.join(mirror, 'css/s_main.css'));
const sSub = read(path.join(mirror, 'css/s_sub.css'));
const bBoard = fs.existsSync(path.join(mirror, 'css/b_board.css'))
  ? read(path.join(mirror, 'css/b_board.css'))
  : '';
const sScript = read(path.join(mirror, 'js/s_script.js'));

const cssSelectors = new Set([...extractCssSelectors(sMain), ...extractCssSelectors(sSub)]);
const jsSelectors = extractJsSelectors(sScript);

function checkClasses(group, origList, wpSet) {
  const present = [];
  const missing = [];
  for (const c of origList) {
    if (wpSet.has(c)) present.push(c);
    else missing.push(c);
  }
  return { group, present, missing };
}

const allWp = new Set([...wpCls]);
const classReports = [
  checkClasses('header', criticalOrig.header, allWp),
  checkClasses('main', criticalOrig.main, allWp),
  checkClasses('footer', criticalOrig.footer, allWp),
  checkClasses('sub (WP layout tpl)', criticalOrig.sub, allWp),
  checkClasses('board (WP product/news)', criticalOrig.board, allWp),
];

// CSS selector match: does WP HTML contain required class from selector?
function selectorNeeds(selector) {
  const classes = [];
  const ids = [];
  const reClass = /\.([a-zA-Z_][\w-]*)/g;
  const reId = /#([a-zA-Z_][\w-]*)/g;
  let m;
  while ((m = reClass.exec(selector))) classes.push(m[1]);
  while ((m = reId.exec(selector))) ids.push(m[1]);
  return { classes, ids };
}

const wpHtmlApprox = wpTpl + origMain; // WP tpl only for class presence
const wpAllHtml = wpTpl;
const wpAllCls = extractClasses(wpAllHtml);
const wpAllIds = extractIds(wpAllHtml);

const keyCssPrefixes = [
  'header.s_header', '.s_header', '.pc_gnb', '#s_gnb', '.contact_button', '.lang_box',
  '.menu_hamberger', '.menu_sidebar', '.main_visual', '.slide_txt', '.main_business',
  '.business_title', '.mask-fill', '.business_slider', '.stats_list', '.main_solution',
  '.parts_list', '.main_vision', '.main_customer', '.main_gallery', '.board_slider',
  '.main_contact', '#si_footer', '.footer_utils', '.sub_visual', '.sub_nav', '.si_inner',
];

const failedCss = [];
for (const sel of cssSelectors) {
  if (!keyCssPrefixes.some((p) => sel.includes(p.replace(/^[.#]/, '')) && (sel.startsWith('.') || sel.startsWith('#') || sel.includes('header')))) {
    continue;
  }
  const { classes, ids } = selectorNeeds(sel);
  if (!classes.length && !ids.length) continue;
  const ok =
    classes.every((c) => wpAllCls.has(c)) && ids.every((i) => wpAllIds.has(i));
  if (!ok) failedCss.push({ sel, missingClasses: classes.filter((c) => !wpAllCls.has(c)), missingIds: ids.filter((i) => !wpAllIds.has(i)) });
}

const failedJs = [];
for (const sel of jsSelectors) {
  const { classes, ids } = selectorNeeds(sel);
  const ok =
    (classes.length === 0 || classes.some((c) => wpAllCls.has(c))) &&
    (ids.length === 0 || ids.some((i) => wpAllIds.has(i)));
  // strict: all mentioned classes should exist for compound selectors
  const strictOk =
    classes.every((c) => wpAllCls.has(c)) && ids.every((i) => wpAllIds.has(i));
  if (!strictOk) {
    failedJs.push({
      sel,
      missingClasses: classes.filter((c) => !wpAllCls.has(c)),
      missingIds: ids.filter((i) => !wpAllIds.has(i)),
    });
  }
}

const outDir = path.join(root, 'docs');
fs.mkdirSync(outDir, { recursive: true });

const report = {
  generated: new Date().toISOString(),
  summary: {
    origMainClassCount: origMainCls.size,
    wpTemplateClassCount: wpCls.size,
    criticalMissing: classReports.reduce((n, r) => n + r.missing.length, 0),
    failedCssSelectorCount: failedCss.length,
    failedJsSelectorCount: failedJs.length,
  },
  domStructureGaps: [
    { area: 'Wrapper', original: '<main> (no class)', wp: '<main class="site-main" id="site-main">' },
    { area: 'Header root', original: '<header class="s_header flex_center">', wp: '<header class="site-header" id="site-header">' },
    { area: 'Header logo', original: '<h1><a><img logo_w.png>', wp: '<div class="site-header__brand"><a><span text>' },
    { area: 'GNB', original: '<nav class="pc_gnb"><ul id="s_gnb">', wp: '<nav class="site-nav site-nav--desktop"><ul class="site-nav__list">' },
    { area: 'Mobile menu', original: '<div class="menu_sidebar"><nav class="mobile_gnb">', wp: '<div class="site-mobile-menu">' },
    { area: 'Footer root', original: '<footer id="si_footer">', wp: '<footer class="site-footer" id="site-footer">' },
    { area: 'Footer TOP', original: '<div class="top flex_center">', wp: '<button class="site-footer__top">' },
    { area: 'Sub hero', original: '<section class="sub_visual sub_visual_bg0N">', wp: '<section class="sub-hero sub-hero--*">' },
    { area: 'Sub nav', original: '<nav class="sub_nav"><ul><li class="active">', wp: '<nav class="sub-nav"><li class="is-active">' },
    { area: 'Product card', original: 'b_board / bo_list gallery', wp: '<article class="product-card">' },
    { area: 'News archive', original: 'news-card in board_slider slide', wp: 'news-card vs card-home (main only original)' },
  ],
  classReports,
  missingByGroup: Object.fromEntries(classReports.map((r) => [r.group, r.missing])),
  presentByGroup: Object.fromEntries(classReports.map((r) => [r.group, r.present])),
  failedCssSelectors: failedCss.slice(0, 80),
  failedJsSelectors: failedJs,
  wpOnlyClasses: [...wpCls].filter((c) => !origMainCls.has(c) && !origHdrCls.has(c) && !origFtrCls.has(c)).sort(),
};

const md = formatMarkdown(report);
const outPath = path.join(outDir, 'original-compatibility-gap-report.md');
fs.writeFileSync(outPath, md);
fs.writeFileSync(path.join(outDir, 'original-compatibility-gap-report.json'), JSON.stringify(report, null, 2));
console.log('Wrote', outPath);
console.log('Critical missing classes:', report.summary.criticalMissing);
console.log('Failed JS selectors:', report.summary.failedJsSelectorCount);

function formatMarkdown(r) {
  let s = '# Original Compatibility Gap Report\n\n';
  s += `Generated: ${r.generated}\n\n`;
  s += '## 1. Summary\n\n';
  s += `- Original main class count: **${r.summary.origMainClassCount}**\n`;
  s += `- WP template class count: **${r.summary.wpTemplateClassCount}**\n`;
  s += `- Critical original classes missing in WP templates: **${r.summary.criticalMissing}**\n`;
  s += `- Key CSS selectors with no DOM match (sampled): **${r.summary.failedCssSelectorCount}**\n`;
  s += `- JS selectors with no DOM match: **${r.summary.failedJsSelectorCount}**\n\n`;

  s += '## 2. DOM Structure Gaps\n\n';
  s += '| Area | Original | WP |\n|---|---|---|\n';
  for (const g of r.domStructureGaps) {
    s += `| ${g.area} | \`${g.original}\` | \`${g.wp}\` |\n`;
  }

  s += '\n## 3. Missing Core Original Classes (by area)\n\n';
  for (const [group, list] of Object.entries(r.missingByGroup)) {
    s += `### ${group}\n\n`;
    if (!list.length) s += '_none_\n\n';
    else s += list.map((c) => `- \`.${c}\``).join('\n') + '\n\n';
  }

  s += '## 4. Present Core Original Classes (by area)\n\n';
  for (const [group, list] of Object.entries(r.presentByGroup)) {
    s += `### ${group} (${list.length})\n\n`;
    s += list.map((c) => `\`${c}\``).join(', ') + '\n\n';
  }

  s += '## 5. Failed JS Selectors (s_script.js → WP DOM)\n\n';
  s += '| Selector | Missing classes | Missing ids |\n|---|---|---|\n';
  for (const row of r.failedJsSelectors) {
    s += `| \`${row.sel}\` | ${row.missingClasses.map((c) => '.' + c).join(', ') || '-'} | ${row.missingIds.map((i) => '#' + i).join(', ') || '-'} |\n`;
  }

  s += '\n## 6. Failed CSS Selectors (sample, key prefixes)\n\n';
  s += '| Selector | Missing |\n|---|---|\n';
  for (const row of r.failedCssSelectors.slice(0, 40)) {
    const miss = [...row.missingClasses.map((c) => '.' + c), ...row.missingIds.map((i) => '#' + i)].join(', ');
    s += `| \`${row.sel}\` | ${miss || '-'} |\n`;
  }

  s += '\n## 7. Recovery Plan (DOM/class dual-bind)\n\n';
  s += 'See report section 7 in chat / follow-up implementation.\n';

  return s;
}
