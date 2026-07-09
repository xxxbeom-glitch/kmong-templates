const fs = require('fs');
const path = require('path');

const WORK = __dirname;
const SRC6 = path.join(WORK, '../../onetenth6/01-original/index.html');
const INDEX = path.join(WORK, 'index.html');

let html = fs.readFileSync(INDEX, 'utf8');
const src6 = fs.readFileSync(SRC6, 'utf8');

// --- 1. Hero: remove floating profile boxes ---
html = html.replace(
  /\s*<div class="elementor-element elementor-element-1b37cae[\s\S]*?profile\.png[\s\S]*?<\/div>\s*<\/div>\s*/,
  '\n'
);
html = html.replace(
  /\s*<div class="elementor-element elementor-element-4564dcd[\s\S]*?profile2\.png[\s\S]*?<\/div>\s*<\/div>\s*/,
  '\n'
);

// --- 1b. Hero: drop pen-circle class ---
html = html.replace(
  'elementor-element-d2da354 animation-circle elementor-invisible',
  'elementor-element-d2da354 elementor-invisible'
);

// --- 2. Intro: drop pen-underline class ---
html = html.replace(
  'elementor-element-049af57 animation-underline elementor-invisible',
  'elementor-element-049af57 elementor-invisible'
);

// --- 4. Replace 가치1~3 with Our Innovation (06) ---
const innovStart = src6.indexOf(
  '<div class="elementor-element elementor-element-6716573 e-flex e-con-boxed e-con e-parent"'
);
const innovEnd = src6.indexOf(
  '<div class="elementor-element elementor-element-348ef16 e-flex e-con-boxed e-con e-parent"',
  innovStart
);
let innovation = src6.slice(innovStart, innovEnd);
innovation = innovation.replace(
  /\/_mirror\/onetenth6\.mycafe24\.com\/wp-content\/uploads\/2024\/11\/(\d+)\.jpg/g,
  '/assets/from-06/innovation/$1.jpg'
);
innovation = innovation.replace(
  /<a class="elementor-element[^"]*" data-id="[^"]*" data-element_type="container" href="[^"]*">[\s\S]*?VIEW MORE[\s\S]*?<\/a>\s*/g,
  ''
);
innovation = `<div class="elementor elementor-1553 wc-innovation-06">\n${innovation}</div>\n`;

const valueStart = html.indexOf(
  '<div class="elementor-element elementor-element-db4a00d e-con-full e-flex e-con e-parent"'
);
const valueEnd = html.indexOf(
  '<div class="elementor-element elementor-element-7495233 e-con-full e-flex e-con e-parent"',
  valueStart
);
html = html.slice(0, valueStart) + innovation + html.slice(valueEnd);

// --- 5. Footer from 06 ---
const footStart = src6.indexOf('<footer id="uicore-tb-footer"');
const footEnd = src6.indexOf('</footer>', footStart) + '</footer>'.length;
const footer06 = src6.slice(footStart, footEnd);

const htmlFootStart = html.indexOf('<footer id="uicore-tb-footer"');
const htmlFootEnd = html.indexOf('</footer>', htmlFootStart) + '</footer>'.length;
html = html.slice(0, htmlFootStart) + footer06 + html.slice(htmlFootEnd);

// --- CSS links for 06 sections ---
html = html.replace(
  /href='\/_mirror\/onetenth8\.mycafe24\.com\/wp-content\/uploads\/elementor\/css\/post-66\.css'/,
  "href='/assets/from-06/post-66-b06.css'"
);
if (!html.includes('post-1553-from-06')) {
  html = html.replace(
    /(<link rel='stylesheet' id='elementor-post-1227-css'[^>]+>)/,
    "$1\n<link rel='stylesheet' id='post-1553-from-06' href='/assets/from-06/post-1553.css' media='all' />"
  );
}

// --- Remove pen circle/underline GSAP block ---
html = html.replace(
  /<style>\s*\.animation-circle,[\s\S]*?<\/script>\s*(?=<script src="\/_mirror\/cdn\.jsdelivr\.net\/npm\/gsap)/,
  ''
);

// Mark testimonial section for JS override
html = html.replace(
  'data-id="b5a93e9" data-element_type="container"',
  'data-id="b5a93e9" data-element_type="container" id="wc-testimonial-section"'
);
html = html.replace(
  'data-id="02757c8"',
  'data-id="02757c8" id="wc-testimonial-carousel"'
);

fs.writeFileSync(INDEX, html, 'utf8');
console.log('patched index.html');
