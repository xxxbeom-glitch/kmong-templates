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
    ['url(/data/', 'url(../images/mirror/data/'],
    ["url('/data/", "url('../images/mirror/data/"],
    ['url("/data/', 'url("../images/mirror/data/'],
    ['content: url(/img/', 'content: url(../images/mirror/img/'],
  ];

  let out = css;
  for (const [from, to] of replacements) {
    out = out.split(from).join(to);
  }
  return out;
}

const mainCss = path.join(mirror, 'css/s_main.css');
let css = '/* Original main page styles — imported from mirror s_main.css, URL-remapped */\n\n';
css += '/* --- utilities --- */\n' + readLines(mainCss, 38, 42) + readLines(mainCss, 61, 65);
css += '/* --- shell + sections --- */\n' + readLines(mainCss, 503, 1821);
css = fixMirrorUrls(css);

const outFile = path.join(theme, 'assets/css/pages/original-main.css');
fs.writeFileSync(outFile, css);
console.log('Wrote original-main.css (' + css.length + ' bytes)');
