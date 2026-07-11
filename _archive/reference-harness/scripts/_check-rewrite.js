const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(
  path.join(__dirname, '../cases/ptmd869920/01-original/index.html'),
  'utf8'
);
const links = [...html.matchAll(/<link[^>]+>/gi)].map((m) => m[0]);
console.log('LINK COUNT', links.length);
links.forEach((l) => console.log(l.slice(0, 220), '\n'));
const srcs = [...html.matchAll(/\ssrc=["']([^"']+)["']/gi)].map((m) => m[1]);
console.log('--- scripts ---');
srcs
  .filter((u) => /optimizer|i18n|moa\/|\.js/i.test(u))
  .slice(0, 25)
  .forEach((u) => console.log(u));
const dir = path.join(
  __dirname,
  '../cases/ptmd869920/01-original/_mirror/ecudemo391069.cafe24.com/ind-script'
);
console.log('--- ind-script files ---');
console.log(fs.readdirSync(dir).join('\n'));
