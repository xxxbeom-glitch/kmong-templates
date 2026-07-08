const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CASE_ID = 'ptmd869920';
const PRODUCT_CODE = 'PTMD869920';
const DESIGN_CENTER = `https://d.cafe24.com/sample?productCode=${PRODUCT_CODE}`;
const DEMO_URL = 'https://ecudemo391069.cafe24.com/';
const ROOT = path.join(__dirname, '..', 'cases', CASE_ID);
const SOURCE = path.join(ROOT, '00-source');
const ORIGINAL = path.join(ROOT, '01-original');

async function dismissOverlays(page) {
  // Prefer explicit close on cafe24 demo popup / sample guide
  for (const sel of [
    '.mpopup >> text=닫기',
    '.df-bannermanager-popup >> text=닫기',
    'text=하루 동안 보지 않기',
    '.sample-sg >> text=닫기',
    'button:has-text("닫기")',
    'a:has-text("닫기")',
    'button:has-text("Close")',
    'button:has-text("확인")',
    '.popup-close',
    '.btnClose',
  ]) {
    try {
      const el = page.locator(sel).first();
      if (await el.count()) await el.click({ timeout: 1000, force: true });
    } catch (_) {}
  }
  try {
    await page.evaluate(() => {
      const hide = (sel) =>
        document.querySelectorAll(sel).forEach((el) => {
          el.style.setProperty('display', 'none', 'important');
          el.remove();
        });
      hide('.mpopup, .mpopup__bg, .df-bannermanager-popup, .sample-sg, .rv-frame');
      // close open search / aside if forced open
      document.querySelectorAll('.jsSearchLayer, .search').forEach((el) => {
        if (getComputedStyle(el).position === 'fixed') {
          el.style.setProperty('display', 'none', 'important');
        }
      });
      document.body.classList.remove('eMobileSidebarOn', 'expand');
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
      }, 180);
    });
  });
}

async function captureViewport(page, viewport, outDir, label) {
  fs.mkdirSync(outDir, { recursive: true });
  await page.setViewportSize(viewport);
  await page.goto(DEMO_URL, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForTimeout(3500);
  await dismissOverlays(page);
  await scrollPage(page);
  await page.waitForTimeout(2000);
  await dismissOverlays(page);
  await page.waitForTimeout(800);

  const foldPath = path.join(outDir, `${label}-fold.png`);
  const fullPath = path.join(outDir, `${label}-full.png`);
  await page.screenshot({ path: foldPath, fullPage: false });
  await page.screenshot({ path: fullPath, fullPage: true });

  const data = await page.evaluate((vp) => {
    const outline = [];
    const seen = new Set();
    const nodes = document.querySelectorAll(
      'header, footer, nav, main, section, [class*="section"], [id*="section"], .xans-product, .xans-layout, #contents > div, #wrap > div'
    );
    for (const el of nodes) {
      const rect = el.getBoundingClientRect();
      const absTop = Math.round(rect.top + window.scrollY);
      const h = Math.round(rect.height);
      if (h < 60) continue;
      const className = (el.className && String(el.className).slice(0, 120)) || '';
      const key = `${el.tagName}:${absTop}:${h}:${className.slice(0, 40)}`;
      if (seen.has(key)) continue;
      seen.add(key);
      outline.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || '',
        className,
        top: absTop,
        height: h,
        text: (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 140),
      });
    }
    outline.sort((a, b) => a.top - b.top);

    const headings = Array.from(document.querySelectorAll('h1,h2,h3'))
      .map((h) => ({
        tag: h.tagName.toLowerCase(),
        text: (h.innerText || '').replace(/\s+/g, ' ').trim(),
        top: Math.round(h.getBoundingClientRect().top + window.scrollY),
      }))
      .filter((h) => h.text)
      .slice(0, 50);

    const modules = Array.from(document.querySelectorAll('[module], [class*="xans-"]'))
      .slice(0, 80)
      .map((el) => ({
        module: el.getAttribute('module') || '',
        className: String(el.className || '').slice(0, 100),
      }));

    const links = Array.from(document.querySelectorAll('a[href]'))
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && !h.startsWith('javascript') && !h.startsWith('#'))
      .slice(0, 60);

    return {
      viewport: vp,
      title: document.title,
      url: location.href,
      outline: outline.slice(0, 50),
      headings,
      modules,
      sampleLinks: [...new Set(links)].slice(0, 40),
      bodyTextPreview: (document.body?.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 800),
    };
  }, viewport);

  fs.writeFileSync(path.join(outDir, `${label}-outline.json`), JSON.stringify(data, null, 2));
  return data;
}

async function main() {
  fs.mkdirSync(path.join(SOURCE, 'captures', 'desktop-1920'), { recursive: true });
  fs.mkdirSync(path.join(SOURCE, 'captures', 'mobile-390'), { recursive: true });
  fs.mkdirSync(path.join(ORIGINAL, 'assets'), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: 'ko-KR',
    deviceScaleFactor: 1,
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(120000);

  const requests = [];
  page.on('request', (req) => {
    const u = req.url();
    if (/^https?:/.test(u)) {
      requests.push({ url: u, resourceType: req.resourceType() });
    }
  });

  const desktop = await captureViewport(
    page,
    { width: 1920, height: 1080 },
    path.join(SOURCE, 'captures', 'desktop-1920'),
    'desktop-1920'
  );

  // reset request log for mobile? keep all — fine
  const mobile = await captureViewport(
    page,
    { width: 390, height: 844 },
    path.join(SOURCE, 'captures', 'mobile-390'),
    'mobile-390'
  );

  // Save entry HTML snapshot (rendered DOM) — mark as browser-captured, not skin source
  const html = await page.content();
  fs.writeFileSync(path.join(ORIGINAL, 'index.rendered.html'), html, 'utf8');
  fs.writeFileSync(
    path.join(ORIGINAL, 'README.md'),
    [
      '# 01-original (browser-captured)',
      '',
      '- completeness: **browser-captured**',
      '- NOT skin-zip / NOT project original SoT',
      '- Track C design reference only — do not promote to working skin or delivery',
      `- demo: ${DEMO_URL}`,
      `- productCode: ${PRODUCT_CODE}`,
      '',
      'immutable: do not edit captured files in place; use original-revision if re-capture.',
      '',
    ].join('\n'),
    'utf8'
  );

  // Dedupe remote inventory
  const byType = {};
  for (const r of requests) {
    byType[r.resourceType] = byType[r.resourceType] || [];
    byType[r.resourceType].push(r.url);
  }
  for (const k of Object.keys(byType)) {
    byType[k] = [...new Set(byType[k])].slice(0, 200);
  }

  const inventory = {
    caseId: CASE_ID,
    productCode: PRODUCT_CODE,
    designCenterUrl: DESIGN_CENTER,
    demoMallUrl: DEMO_URL,
    collectedAt: new Date().toISOString().slice(0, 10),
    completeness: 'browser-captured',
    track: 'reference-harness',
    rightsType: 'demo-analysis',
    title: desktop.title || mobile.title,
    viewports: { desktop: 1920, mobile: 390 },
    desktopHeadings: desktop.headings,
    mobileHeadings: mobile.headings,
    desktopOutlineCount: desktop.outline.length,
    sampleModules: desktop.modules.slice(0, 40),
    sampleLinks: desktop.sampleLinks,
    remoteRequestsByType: Object.fromEntries(
      Object.entries(byType).map(([k, v]) => [k, { count: v.length, samples: v.slice(0, 30) }])
    ),
    captures: {
      desktop: ['desktop-1920-fold.png', 'desktop-1920-full.png', 'desktop-1920-outline.json'],
      mobile: ['mobile-390-fold.png', 'mobile-390-full.png', 'mobile-390-outline.json'],
    },
  };

  fs.writeFileSync(path.join(SOURCE, 'inventory.json'), JSON.stringify(inventory, null, 2));
  // also mirror outlines into 00-reference style path for consistency with older cases
  const ref = path.join(ROOT, '00-reference');
  fs.mkdirSync(path.join(ref, 'captures', 'desktop-1920'), { recursive: true });
  fs.mkdirSync(path.join(ref, 'captures', 'mobile-390'), { recursive: true });
  for (const f of fs.readdirSync(path.join(SOURCE, 'captures', 'desktop-1920'))) {
    fs.copyFileSync(
      path.join(SOURCE, 'captures', 'desktop-1920', f),
      path.join(ref, 'captures', 'desktop-1920', f)
    );
  }
  for (const f of fs.readdirSync(path.join(SOURCE, 'captures', 'mobile-390'))) {
    fs.copyFileSync(
      path.join(SOURCE, 'captures', 'mobile-390', f),
      path.join(ref, 'captures', 'mobile-390', f)
    );
  }
  fs.copyFileSync(path.join(SOURCE, 'inventory.json'), path.join(ref, 'inventory.json'));

  console.log(
    JSON.stringify(
      {
        ok: true,
        caseId: CASE_ID,
        title: inventory.title,
        headings: desktop.headings.slice(0, 12),
        outlineTop: desktop.outline.slice(0, 8).map((o) => ({
          tag: o.tag,
          className: o.className.slice(0, 60),
          h: o.height,
          text: o.text.slice(0, 80),
        })),
      },
      null,
      2
    )
  );

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
