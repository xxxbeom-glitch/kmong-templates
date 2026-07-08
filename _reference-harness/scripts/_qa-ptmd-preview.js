const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = path.join(__dirname, '..', 'cases', 'ptmd869920', '01-original');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const attrs = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)].map((m) => m[1]);
const uniq = [...new Set(attrs)].filter((u) => u && !u.startsWith('data:') && !u.startsWith('javascript:') && !u.startsWith('#'));

function localExists(rel) {
  const clean = rel.split('?')[0].replace(/^\//, '');
  const candidates = [
    path.join(ROOT, clean),
    path.join(ROOT, '_mirror', 'ecudemo391069.cafe24.com', clean),
  ];
  return candidates.some((c) => fs.existsSync(c) && fs.statSync(c).isFile());
}

const interesting = uniq.filter((u) =>
  /\.css|\.js|optimizer|\/web\/|ind-script|moa\/|fonts|upload/i.test(u)
);

const report = { total: uniq.length, missingAbs: [], missingRel: [], present: 0, samples: [] };
for (const u of interesting) {
  let ok = false;
  if (u.startsWith('http') || u.startsWith('//')) {
    // rewritten should be relative for same-origin; absolute remote may still work online
    report.samples.push({ u: u.slice(0, 120), kind: 'remote' });
    continue;
  }
  if (u.startsWith('/')) {
    ok = localExists(u);
    if (!ok) report.missingAbs.push(u.slice(0, 160));
    else report.present++;
  } else if (u.startsWith('_mirror/')) {
    ok = fs.existsSync(path.join(ROOT, u.split('?')[0]));
    if (!ok) report.missingRel.push(u.slice(0, 160));
    else report.present++;
  } else {
    ok = localExists(u) || fs.existsSync(path.join(ROOT, u.split('?')[0]));
    if (!ok) report.missingRel.push(u.slice(0, 160));
    else report.present++;
  }
}

// count optimizer collisions
const opts = uniq.filter((u) => /optimizer/i.test(u));
console.log(JSON.stringify({
  present: report.present,
  missingAbsCount: report.missingAbs.length,
  missingRelCount: report.missingRel.length,
  missingAbs: report.missingAbs.slice(0, 30),
  missingRel: report.missingRel.slice(0, 20),
  optimizerUrls: opts.length,
  optimizerUniqueLocalGuess: [...new Set(opts.map((u) => u.split('?')[0]))].length,
  linkCssInHead: (html.match(/<link[^>]+stylesheet[^>]*>/gi) || []).slice(0, 15),
}, null, 2));

// probe local preview
function get(urlPath) {
  return new Promise((resolve) => {
    http.get({ host: '127.0.0.1', port: 4175, path: urlPath }, (res) => {
      resolve({ path: urlPath, status: res.statusCode });
      res.resume();
    }).on('error', (e) => resolve({ path: urlPath, error: e.message }));
  });
}
(async () => {
  const probes = [
    '/',
    '/ind-script/optimizer.php',
    '/ind-script/optimizer_user.php',
    '/web/upload/',
  ];
  // extract a few abs paths from head
  const abs = [...html.matchAll(/(?:href|src)=["'](\/[^"']+)["']/gi)].map((m) => m[1]).slice(0, 25);
  const results = [];
  for (const p of ['/', ...abs]) {
    results.push(await get(p.split('#')[0]));
  }
  console.log('--- preview probe ---');
  console.log(JSON.stringify(results, null, 2));
})();
