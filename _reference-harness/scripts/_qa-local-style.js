const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '../cases/ptmd869920/01-original');
const QA = path.join(__dirname, '../cases/ptmd869920/02-original-qa/compare');
fs.mkdirSync(QA, { recursive: true });

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const hrefs = [...html.matchAll(/href="(_mirror\/[^"]+\.css)"/g)].map((m) => m[1]);

function get(p) {
  return new Promise((resolve) => {
    const pathReq = p.startsWith('/') ? p : '/' + p;
    http
      .get({ host: '127.0.0.1', port: 4176, path: pathReq }, (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          const buf = Buffer.concat(chunks);
          resolve({
            path: pathReq,
            status: res.statusCode,
            len: buf.length,
            ct: res.headers['content-type'],
            head: buf.slice(0, 80).toString('utf8').replace(/\s+/g, ' '),
          });
        });
      })
      .on('error', (e) => resolve({ path: pathReq, err: e.message }));
  });
}

(async () => {
  console.log('=== HTTP ===');
  console.log(JSON.stringify(await get('/'), null, 2));
  for (const h of hrefs) console.log(JSON.stringify(await get(h), null, 2));

  console.log('=== SCREENSHOT local ===');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    locale: 'ko-KR',
  });
  const bad = [];
  page.on('response', (r) => {
    if (r.url().includes('127.0.0.1') && r.status() >= 400) {
      bad.push({ url: r.url().replace('http://127.0.0.1:4176', ''), status: r.status() });
    }
  });
  await page.goto('http://127.0.0.1:4176/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);
  const metrics = await page.evaluate(() => {
    let cssRules = 0;
    let cssReadable = 0;
    for (const s of document.styleSheets) {
      try {
        if (s.cssRules && s.cssRules.length) {
          cssReadable++;
          cssRules += s.cssRules.length;
        }
      } catch (_) {}
    }
    const header = document.querySelector('header');
    const hero = document.querySelector('.main-banner, .jsMainSlidePC');
    return {
      title: document.title,
      cssReadable,
      cssRules,
      sheets: document.styleSheets.length,
      headerH: header ? Math.round(header.getBoundingClientRect().height) : null,
      heroH: hero ? Math.round(hero.getBoundingClientRect().height) : null,
      bodyFont: getComputedStyle(document.body).fontFamily.slice(0, 100),
      bodyBg: getComputedStyle(document.body).backgroundColor,
    };
  });
  await page.screenshot({ path: path.join(QA, 'local-fixed-1920.png'), fullPage: false });
  fs.writeFileSync(
    path.join(QA, '../style-qa-local.json'),
    JSON.stringify({ metrics, bad: bad.slice(0, 50) }, null, 2)
  );
  console.log(JSON.stringify({ metrics, badCount: bad.length, bad: bad.slice(0, 25) }, null, 2));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
