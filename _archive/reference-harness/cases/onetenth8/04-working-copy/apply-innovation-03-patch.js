const fs = require('fs');
const path = require('path');

const WORK = __dirname;
const SRC3 = path.join(WORK, '../../onetenth3/01-original/index.html');
const MIRROR3 = path.join(WORK, '../../onetenth3/01-original/_mirror/onetenth3.mycafe24.com');
const INDEX = path.join(WORK, 'index.html');
const ASSETS = path.join(WORK, 'assets/from-03');

const src3 = fs.readFileSync(SRC3, 'utf8');
let html = fs.readFileSync(INDEX, 'utf8');

const innovStart = src3.indexOf(
  '<div class="section">\t\t<div data-elementor-type="section" data-elementor-id="1234"'
);
const innovEnd = src3.indexOf(
  '<div class="section">\t\t<div data-elementor-type="section" data-elementor-id="1317"',
  innovStart
);
if (innovStart < 0 || innovEnd < 0) {
  console.error('Innovation section not found in onetenth3');
  process.exit(1);
}

let innovation = src3.slice(innovStart, innovEnd);

innovation = innovation.replace(
  /\/_mirror\/onetenth3\.mycafe24\.com\/wp-content\/uploads\/2024\/09\//g,
  '/assets/from-03/'
);
innovation = innovation.replace(
  /\/_mirror\/onetenth3\.mycafe24\.com\/wp-content\/uploads\/assets-icon\/move-right\.svg/g,
  '/assets/from-03/move-right.svg'
);
innovation = innovation.replace(
  /<link[\s\S]*?swiper-bundle\.min\.css"\s*\/?>\s*/i,
  ''
);
innovation = innovation.replace(
  /<!-- Swiper JS -->[\s\S]*?<\/script>\s*<!-- 초기화 스크립트 -->[\s\S]*?<\/script>\s*/,
  ''
);

innovation = `<section id="wc-innovation-section" class="wc-innovation-03" aria-label="Innovation">\n${innovation}</section>\n`;

const valueStart = html.indexOf('<section id="wc-value-section"');
const valueEnd = html.indexOf('</section>', valueStart) + '</section>'.length;
if (valueStart < 0) {
  console.error('wc-value-section not found');
  process.exit(1);
}
html = html.slice(0, valueStart) + innovation + html.slice(valueEnd);

const innov06Start = html.indexOf('<div class="elementor elementor-1553 wc-innovation-06">');
const innov06End = html.indexOf(
  '<div class="elementor-element elementor-element-7495233',
  innov06Start
);
if (innov06Start >= 0 && innov06End > innov06Start) {
  html = html.slice(0, innov06Start) + html.slice(innov06End);
}

html = html.replace(
  /<link rel='stylesheet' id='post-1553-from-06'[^>]+>\s*/i,
  "<link rel='stylesheet' id='post-1234-from-03' href='/assets/from-03/post-1234.css' media='all' />\n"
);
if (!html.includes('post-1234-from-03')) {
  html = html.replace(
    /(<link rel='stylesheet' id='elementor-post-1227-css'[^>]+>)/,
    "$1\n<link rel='stylesheet' id='post-1234-from-03' href='/assets/from-03/post-1234.css' media='all' />"
  );
}

fs.mkdirSync(ASSETS, { recursive: true });

const copies = [
  [
    'wp-content/uploads/elementor/css/post-1234.css',
    'post-1234.css',
  ],
  ['wp-content/uploads/2024/09/Rectangle-29.png', 'Rectangle-29.png'],
  ['wp-content/uploads/assets-icon/move-right.svg', 'move-right.svg'],
  ['wp-content/uploads/2024/09/semiconductors10.jpg', 'semiconductors10.jpg'],
  ['wp-content/uploads/2024/09/semiconductors17.jpg', 'semiconductors17.jpg'],
  ['wp-content/uploads/2024/09/semiconductors20.jpg', 'semiconductors20.jpg'],
  ['wp-content/uploads/2024/09/semiconductors21.jpg', 'semiconductors21.jpg'],
  ['wp-content/uploads/2024/09/semiconductors15.jpg', 'semiconductors15.jpg'],
];

for (const [rel, dest] of copies) {
  const from = path.join(MIRROR3, rel);
  const to = path.join(ASSETS, dest);
  if (!fs.existsSync(from)) {
    console.warn('missing:', from);
    continue;
  }
  fs.copyFileSync(from, to);
}

fs.writeFileSync(INDEX, html, 'utf8');
console.log('patched index.html with Tech 03 Innovation');
