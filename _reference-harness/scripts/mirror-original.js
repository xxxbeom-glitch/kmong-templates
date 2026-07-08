const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CASE_ID = process.argv[2] || 'sample03';
const ROOT = path.join(__dirname, '..', 'cases', CASE_ID);
const OUT = path.join(ROOT, '01-original');
const DEMO_URL = process.argv[3] || 'https://ecudemo400494.cafe24.com/';

function urlToLocalPath(urlStr, contentType) {
  let u;
  try {
    u = new URL(urlStr);
  } catch {
    return null;
  }
  if (!['http:', 'https:'].includes(u.protocol)) return null;

  const hostDir = u.hostname.replace(/[^a-zA-Z0-9.-]/g, '_');
  let pathname = decodeURIComponent(u.pathname);
  if (pathname.endsWith('/')) pathname += 'index.html';
  if (!path.extname(pathname)) {
    const ext = guessExt(contentType);
    if (ext) pathname += ext;
  }
  return path.join('_mirror', hostDir, pathname.replace(/^\//, ''));
}

function guessExt(contentType) {
  if (!contentType) return '';
  const ct = contentType.split(';')[0].trim().toLowerCase();
  const map = {
    'text/html': '.html',
    'text/css': '.css',
    'text/javascript': '.js',
    'application/javascript': '.js',
    'application/json': '.json',
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'font/woff': '.woff',
    'font/woff2': '.woff2',
    'application/font-woff': '.woff',
    'application/font-woff2': '.woff2',
  };
  return map[ct] || '';
}

function sha1(s) {
  return crypto.createHash('sha1').update(s).digest('hex').slice(0, 12);
}

async function dismissOverlays(page) {
  for (const sel of [
    'button:has-text("닫기")',
    'button:has-text("Close")',
    'button:has-text("확인")',
    '.popup-close',
    '.btnClose',
    '[class*="close"]',
  ]) {
    const el = page.locator(sel).first();
    if (await el.count()) {
      try {
        await el.click({ timeout: 600 });
      } catch (_) {}
    }
  }
}

async function scrollPage(page) {
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
      }, 180);
    });
  });
  await page.waitForTimeout(1500);
}

function rewriteHtml(html, urlMap, pageUrl) {
  const base = new URL(pageUrl);
  return html.replace(
    /(\s(?:src|href)=["'])([^"']+)(["'])/gi,
    (match, pre, raw, post) => {
      if (raw.startsWith('data:') || raw.startsWith('javascript:') || raw.startsWith('#')) {
        return match;
      }
      let abs;
      try {
        abs = new URL(raw, base).href;
      } catch {
        return match;
      }
      const local = urlMap.get(abs);
      if (!local) return match;
      const rel = path.relative(path.dirname('index.html'), local).replace(/\\/g, '/');
      return `${pre}${rel}${post}`;
    }
  );
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const urlMap = new Map();
  const manifest = {
    caseId: CASE_ID,
    collectedAt: new Date().toISOString(),
    entryUrl: DEMO_URL,
    method: 'playwright-response-dump',
    files: [],
    externalUnresolved: [],
  };

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    locale: 'ko-KR',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(120000);

  page.on('response', async (response) => {
    const url = response.url();
    const status = response.status();
    if (status < 200 || status >= 400) return;
    const headers = response.headers();
    const ct = headers['content-type'] || '';
    if (!/text\/|application\/|image\/|font\/|application\/font/.test(ct)) return;

    let body;
    try {
      body = await response.body();
    } catch {
      return;
    }
    if (!body || body.length === 0) return;

    const localRel = urlToLocalPath(url, ct);
    if (!localRel) return;

    const full = path.join(OUT, localRel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    if (!fs.existsSync(full)) {
      fs.writeFileSync(full, body);
    }
    urlMap.set(url, localRel);
    manifest.files.push({
      url,
      local: localRel.replace(/\\/g, '/'),
      bytes: body.length,
      contentType: ct.split(';')[0],
    });
  });

  console.log(`goto ${DEMO_URL}`);
  await page.goto(DEMO_URL, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(4000);
  await dismissOverlays(page);
  await scrollPage(page);
  await page.waitForTimeout(2000);

  const html = await page.content();
  const rewritten = rewriteHtml(html, urlMap, page.url());
  fs.writeFileSync(path.join(OUT, 'index.html'), rewritten, 'utf8');
  manifest.files.push({
    url: page.url(),
    local: 'index.html',
    bytes: Buffer.byteLength(rewritten),
    contentType: 'text/html',
    note: 'rewritten-entry',
  });

  // Collect link hints for unresolved externals
  const links = await page.evaluate(() => {
    const out = new Set();
    document.querySelectorAll('link[href], script[src], img[src]').forEach((el) => {
      const v = el.getAttribute('href') || el.getAttribute('src');
      if (v && !v.startsWith('data:')) out.add(v);
    });
    return [...out];
  });

  const base = new URL(page.url());
  for (const raw of links) {
    try {
      const abs = new URL(raw, base).href;
      if (!urlMap.has(abs)) {
        manifest.externalUnresolved.push(abs);
      }
    } catch (_) {}
  }
  manifest.externalUnresolved = [...new Set(manifest.externalUnresolved)].sort();

  fs.writeFileSync(
    path.join(OUT, 'manifest-original.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );

  const readme = `# 01-original — 수정 금지

Knotted. (PTMD873955) 데모몰 수집본 · ${manifest.collectedAt.slice(0, 10)}

- entry: \`${DEMO_URL}\`
- method: playwright response dump + index.html rewrite

## 금지

HTML/CSS/JS/자산 내용 수정 · 포맷팅 · 경로 정리 · 파일명 변경

## 복구

\`00-source/source.md\` 기준 재수집: \`node scripts/mirror-original.js sample03\`
`;
  fs.writeFileSync(path.join(OUT, 'README.md'), readme, 'utf8');

  await browser.close();

  console.log(
    JSON.stringify(
      {
        caseId: CASE_ID,
        files: manifest.files.length,
        unresolved: manifest.externalUnresolved.length,
        outDir: OUT,
      },
      null,
      2
    )
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
