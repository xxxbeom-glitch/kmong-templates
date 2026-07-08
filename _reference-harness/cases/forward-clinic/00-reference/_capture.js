const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname);
const URL = 'https://forwardclinic.co.kr/';

async function capture(viewport, outDir, label) {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    locale: 'ko-KR',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(90000);

  await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(2500);

  // dismiss common overlays if any
  for (const sel of [
    'button:has-text("닫기")',
    'button:has-text("Close")',
    '.popup-close',
    '[class*="close"]',
  ]) {
    const el = page.locator(sel).first();
    if (await el.count()) {
      try {
        await el.click({ timeout: 1000 });
      } catch (_) {}
    }
  }

  // scroll to load lazy assets
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = Math.max(400, Math.floor(window.innerHeight * 0.8));
      const timer = setInterval(() => {
        y += step;
        window.scrollTo(0, y);
        if (y >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 200);
    });
  });
  await page.waitForTimeout(1500);

  const fullPath = path.join(outDir, `${label}-full.png`);
  await page.screenshot({ path: fullPath, fullPage: true });

  // section outline from headings + landmarks
  const outline = await page.evaluate(() => {
    const pick = [];
    const nodes = Array.from(
      document.querySelectorAll('header, footer, section, [class*="section"], main > div')
    );
    const seen = new Set();
    for (const el of nodes) {
      const rect = el.getBoundingClientRect();
      const absTop = rect.top + window.scrollY;
      const h = Math.round(rect.height);
      if (h < 80) continue;
      const text = (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 120);
      const key = `${el.tagName}:${Math.round(absTop)}:${h}`;
      if (seen.has(key)) continue;
      seen.add(key);
      pick.push({
        tag: el.tagName.toLowerCase(),
        className: (el.className && String(el.className).slice(0, 80)) || '',
        top: Math.round(absTop),
        height: h,
        text,
      });
    }
    pick.sort((a, b) => a.top - b.top);
    return pick.slice(0, 40);
  });

  const headings = await page.evaluate(() =>
    Array.from(document.querySelectorAll('h1,h2,h3'))
      .map((h) => ({
        tag: h.tagName.toLowerCase(),
        text: (h.innerText || '').replace(/\s+/g, ' ').trim(),
        top: Math.round(h.getBoundingClientRect().top + window.scrollY),
      }))
      .filter((h) => h.text)
  );

  fs.writeFileSync(
    path.join(outDir, `${label}-outline.json`),
    JSON.stringify({ viewport, outline, headings }, null, 2)
  );

  // above-the-fold shot
  await page.screenshot({
    path: path.join(outDir, `${label}-fold.png`),
    fullPage: false,
  });

  await browser.close();
  return { fullPath, outlineCount: outline.length, headings: headings.length };
}

(async () => {
  const d1920 = await capture(
    { width: 1920, height: 1080 },
    path.join(BASE, 'captures', 'desktop-1920'),
    'desktop-1920'
  );
  const d390 = await capture(
    { width: 390, height: 844 },
    path.join(BASE, 'captures', 'mobile-390'),
    'mobile-390'
  );
  console.log(JSON.stringify({ d1920, d390 }, null, 2));
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
