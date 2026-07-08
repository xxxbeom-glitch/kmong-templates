/**
 * Quick nav smoke test against local preview
 *   node scripts/_qa-nav.js http://127.0.0.1:4180
 */
const http = require('http');
const { chromium } = require('playwright');

const BASE = process.argv[2] || 'http://127.0.0.1:4180';

function fetchStatus(path) {
  return new Promise((resolve) => {
    const req = http.get(BASE + path, (res) => {
      let n = 0;
      res.on('data', (c) => (n += c.length));
      res.on('end', () => resolve({ path, status: res.statusCode, bytes: n, ct: res.headers['content-type'] }));
    });
    req.on('error', (e) => resolve({ path, status: 0, error: e.message }));
    req.setTimeout(15000, () => {
      req.destroy();
      resolve({ path, status: 0, error: 'timeout' });
    });
  });
}

(async () => {
  const paths = [
    '/',
    '/about.html',
    '/order/basket.html',
    '/category/%EC%9C%A0%ED%98%95%EB%B3%84/28/',
    '/category/%EA%B3%A0%EB%AF%BC%EB%B3%84/58/',
    '/board/free/list.html?board_no=1',
    '/event/list.html?cate_no=56',
    '/product/search.html?keyword=EGF',
  ];

  const results = [];
  for (const p of paths) results.push(await fetchStatus(p));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1500);

  // click first category nav if present
  const clickTests = [];
  const candidates = [
    'a[href*="/category/"]',
    'a[href*="/about"]',
    'a[href*="/order/basket"]',
    'a[href*="/board/"]',
  ];
  for (const sel of candidates) {
    const href = await page.locator(sel).first().getAttribute('href').catch(() => null);
    if (!href) {
      clickTests.push({ sel, ok: false, reason: 'no link' });
      continue;
    }
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 20000 }).catch(() => null),
        page.locator(sel).first().click({ timeout: 5000 }),
      ]);
      await page.waitForTimeout(800);
      const url = page.url();
      const title = await page.title();
      const bodyLen = await page.evaluate(() => document.body?.innerText?.length || 0);
      clickTests.push({ sel, href, url, title, bodyLen, ok: bodyLen > 50 && !/Not found/i.test(title) });
      await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(500);
    } catch (e) {
      clickTests.push({ sel, href, ok: false, error: e.message });
      await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
    }
  }

  await browser.close();
  console.log(JSON.stringify({ http: results, clicks: clickTests }, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
