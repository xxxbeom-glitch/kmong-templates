/**
 * Capture Desktop 1920 / Mobile 390 for a Track C case
 *   node scripts/capture-case.js ptmd871337 https://ecudemo389695.cafe24.com/
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CASE_ID = (process.argv[2] || '').toLowerCase();
const DEMO_URL = process.argv[3];
if (!CASE_ID || !DEMO_URL) {
  console.error('Usage: node scripts/capture-case.js {caseId} {demoUrl}');
  process.exit(1);
}

const ROOT = path.join(__dirname, '..', 'cases', CASE_ID);
const SOURCE = path.join(ROOT, '00-source');
const REF = path.join(ROOT, '00-reference');

async function dismissOverlays(page) {
  for (const sel of [
    '.mpopup >> text=닫기',
    '.df-bannermanager-popup >> text=닫기',
    'text=하루 동안 보지 않기',
    '.sample-sg >> text=닫기',
    'button:has-text("닫기")',
    'a:has-text("닫기")',
    'button:has-text("확인")',
    '.popup-close',
    '.btnClose',
  ]) {
    try {
      const el = page.locator(sel).first();
      if (await el.count()) await el.click({ timeout: 800, force: true });
    } catch (_) {}
  }
  try {
    await page.evaluate(() => {
      document
        .querySelectorAll('.mpopup, .mpopup__bg, .df-bannermanager-popup, .sample-sg')
        .forEach((el) => {
          try {
            el.remove();
          } catch (e) {}
        });
    });
  } catch (_) {}
}

async function scrollPage(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = Math.max(400, Math.floor(window.innerHeight * 0.8));
      const timer = setInterval(() => {
        y += step;
        window.scrollTo(0, y);
        if (y >= document.body.scrollHeight + window.innerHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 160);
    });
  });
}

async function outline(page) {
  return page.evaluate(() => {
    const nodes = [];
    const push = (el) => {
      if (!el || !el.getBoundingClientRect) return;
      const r = el.getBoundingClientRect();
      if (r.height < 40 || r.width < 40) return;
      nodes.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || '',
        className: String(el.className || '').slice(0, 120),
        top: Math.round(r.top + window.scrollY),
        height: Math.round(r.height),
        text: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 160),
      });
    };
    document.querySelectorAll('header, aside, footer, main, section, #container, #contents').forEach(push);
    document.querySelectorAll('[class*="xans-product-listmain"], [class*="df-bannermanager"]').forEach(push);
    nodes.sort((a, b) => a.top - b.top);
    return {
      viewport: { width: window.innerWidth, height: window.innerHeight },
      title: document.title,
      url: location.href,
      outline: nodes.slice(0, 80),
    };
  });
}

async function captureViewport(page, viewport, outDir, label) {
  fs.mkdirSync(outDir, { recursive: true });
  await page.setViewportSize(viewport);
  await page.goto(DEMO_URL, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(3000);
  await dismissOverlays(page);
  await scrollPage(page);
  await page.waitForTimeout(1500);
  await dismissOverlays(page);

  await page.screenshot({ path: path.join(outDir, `${label}-fold.png`), fullPage: false });
  await page.screenshot({ path: path.join(outDir, `${label}-full.png`), fullPage: true });
  fs.writeFileSync(path.join(outDir, `${label}-outline.json`), JSON.stringify(await outline(page), null, 2));
  return page.title();
}

(async () => {
  for (const d of [
    path.join(SOURCE, 'captures', 'desktop-1920'),
    path.join(SOURCE, 'captures', 'mobile-390'),
    path.join(REF, 'captures', 'desktop-1920'),
    path.join(REF, 'captures', 'mobile-390'),
  ]) {
    fs.mkdirSync(d, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    locale: 'ko-KR',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  page.setDefaultTimeout(120000);

  console.log(`[capture] ${CASE_ID} desktop…`);
  const title = await captureViewport(
    page,
    { width: 1920, height: 1080 },
    path.join(SOURCE, 'captures', 'desktop-1920'),
    'desktop-1920'
  );
  // sync to 00-reference captures
  for (const f of ['desktop-1920-fold.png', 'desktop-1920-full.png', 'desktop-1920-outline.json']) {
    fs.copyFileSync(
      path.join(SOURCE, 'captures', 'desktop-1920', f),
      path.join(REF, 'captures', 'desktop-1920', f)
    );
  }

  console.log(`[capture] ${CASE_ID} mobile…`);
  await captureViewport(page, { width: 390, height: 844 }, path.join(SOURCE, 'captures', 'mobile-390'), 'mobile-390');
  for (const f of ['mobile-390-fold.png', 'mobile-390-full.png', 'mobile-390-outline.json']) {
    fs.copyFileSync(
      path.join(SOURCE, 'captures', 'mobile-390', f),
      path.join(REF, 'captures', 'mobile-390', f)
    );
  }

  await browser.close();

  // light inventory
  const inv = {
    caseId: CASE_ID,
    demoMallUrl: DEMO_URL,
    collectedAt: new Date().toISOString().slice(0, 10),
    pageTitle: title,
    viewports: [1920, 390],
  };
  fs.writeFileSync(path.join(SOURCE, 'inventory.json'), JSON.stringify(inv, null, 2));
  fs.writeFileSync(path.join(REF, 'inventory.json'), JSON.stringify(inv, null, 2));
  console.log(JSON.stringify({ caseId: CASE_ID, title, demo: DEMO_URL }, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
