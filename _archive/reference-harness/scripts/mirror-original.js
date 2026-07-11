/**
 * Multi-page high-fidelity mirror for browser-captured Cafe24 demos.
 * - BFS crawl same-origin HTML pages (nav / category / product / board / member / cart …)
 * - Stores PRISTINE document HTML (pre-JS banner expansion) per page
 * - Hashes optimizer.php query variants
 * - Rewrites asset + internal page URLs to local paths
 * - Writes url-map.json for preview / live proxy fallback
 *
 * Usage:
 *   node scripts/mirror-original.js ptmd869920 https://ecudemo391069.cafe24.com/ [maxPages]
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CASE_ID = process.argv[2] || 'sample03';
const ROOT = path.join(__dirname, '..', 'cases', CASE_ID);
const OUT = path.join(ROOT, '01-original');
const DEMO_URL = process.argv[3] || 'https://ecudemo400494.cafe24.com/';
const MAX_PAGES = Math.max(1, Number(process.argv[4]) || 80);

const SKIP_PATH_PREFIX = [
  '/exec/',
  '/api/',
  '/ind-script/',
  '/web/',
  '/moa/',
  '/file_data/',
  '/app/',
  '/SkinImg/',
  '/common/',
];

const TRACK_PARAMS = [
  'icid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
];

function sha1(s) {
  return crypto.createHash('sha1').update(s).digest('hex').slice(0, 12);
}

function guessExt(contentType, pathname, searchParams) {
  const ct = (contentType || '').split(';')[0].trim().toLowerCase();
  const map = {
    'text/html': '.html',
    'text/css': '.css',
    'text/javascript': '.js',
    'application/javascript': '.js',
    'application/x-javascript': '.js',
    'application/json': '.json',
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'font/woff': '.woff',
    'font/woff2': '.woff2',
  };
  if (map[ct]) return map[ct];
  const typeQ = searchParams?.get?.('type');
  if (typeQ === 'css') return '.css';
  if (typeQ === 'js' || typeQ === 'javascript') return '.js';
  const fromPath = path.extname(pathname || '');
  if (fromPath && fromPath !== '.php' && fromPath.length <= 5) return fromPath;
  return '';
}

/** Windows-safe path segment (strip control + reserved chars). */
function safeSeg(seg) {
  return String(seg)
    .replace(/[\u0000-\u001f\u007f<>:"|?*\\/]/g, '_')
    .replace(/\.+$/g, '')
    .replace(/^\.+$/g, '_')
    .slice(0, 120) || '_';
}

function urlToLocalPath(urlStr, contentType) {
  let u;
  try {
    u = new URL(urlStr);
  } catch {
    return null;
  }
  if (!['http:', 'https:'].includes(u.protocol)) return null;

  const hostDir = u.hostname.replace(/[^a-zA-Z0-9.-]/g, '_');
  let pathname;
  try {
    pathname = decodeURIComponent(u.pathname);
  } catch {
    pathname = u.pathname;
  }
  if (pathname.endsWith('/')) pathname += 'index.html';

  // Prefer product/{id}/... short path when slug has bad chars
  const productMatch = pathname.match(/^\/product\/[^/]+\/(\d+)(\/.*)?$/);
  if (productMatch && /[\u0000-\u001f\u007f<>:"|?*]/.test(pathname)) {
    pathname = `/product/_p${productMatch[1]}${productMatch[2] || ''}`;
    if (pathname.endsWith('/')) pathname += 'index.html';
  }

  const rawParts = pathname.split('/').filter(Boolean);
  const safeParts = rawParts.map(safeSeg);
  const baseName = safeParts[safeParts.length - 1] || 'index.html';
  const dirParts = safeParts.slice(0, -1);
  const hasQuery = Boolean(u.search && u.search.length > 1);
  const needsHash =
    hasQuery &&
    (/optimizer/i.test(baseName) || /i18n\.php/i.test(baseName) || /\.php$/i.test(baseName));

  let filePart = baseName;
  if (needsHash) {
    const ext = guessExt(contentType, pathname, u.searchParams) || '.bin';
    const stem = baseName.replace(/\.[^.]+$/, '') || 'asset';
    filePart = `${safeSeg(stem)}.${sha1(u.search)}${ext}`;
  } else if (!path.extname(pathname) && !/\.html$/i.test(baseName)) {
    const ext = guessExt(contentType, pathname, u.searchParams);
    if (ext) filePart = baseName + ext;
  } else if (hasQuery && /\.html?$/i.test(baseName)) {
    // distinct HTML variants — keep unicode via hash (Windows + ASCII-safe)
    const qHash = sha1(u.search);
    const stem = baseName.replace(/\.[^.]+$/, '');
    const ext = path.extname(baseName) || '.html';
    filePart = `${stem}.q${qHash}${ext}`;
  }

  return path.join('_mirror', hostDir, ...dirParts, filePart);
}

function decodeAttr(raw) {
  return String(raw)
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normalizeUrlKey(urlStr) {
  try {
    const u = new URL(urlStr);
    u.hash = '';
    return u.href;
  } catch {
    return urlStr;
  }
}

/** Canonical page key for crawl dedupe (strip tracking + product display variants). */
function pageKey(urlStr) {
  try {
    const u = new URL(urlStr);
    u.hash = '';
    for (const p of TRACK_PARAMS) u.searchParams.delete(p);
    // /product/{slug}/{id}/category/1/display/2/ → /product/{slug}/{id}/
    u.pathname = u.pathname.replace(
      /(\/product\/[^/]+\/\d+)\/category\/\d+\/display\/\d+\/?/i,
      '$1/'
    );
    const entries = [...u.searchParams.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    u.search = '';
    for (const [k, v] of entries) u.searchParams.append(k, v);
    return u.origin + u.pathname + u.search;
  } catch {
    return urlStr;
  }
}

function isCrawlablePage(urlStr, origin) {
  let u;
  try {
    u = new URL(urlStr);
  } catch {
    return false;
  }
  if (u.origin !== origin) return false;
  if (!['http:', 'https:'].includes(u.protocol)) return false;
  const p = u.pathname;
  if (SKIP_PATH_PREFIX.some((pre) => p.startsWith(pre))) return false;
  if (/\.(css|js|mjs|map|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|eot|mp4|webm|json)$/i.test(p)) {
    return false;
  }
  // skip logout / payment gateways that are not useful offline
  if (/\/member\/logout/i.test(p) || /\/order\/orderform/i.test(p) || /\/order\/payment/i.test(p)) {
    return false;
  }
  // skip placeholder / utility junk links often embedded in Cafe24 skins
  if (/링크\s*연결|연결\s*주소|javascript/i.test(decodeURIComponent(p))) return false;
  if (/\/write\.html$/i.test(p)) return false;
  if (/\/member\/login\.html/i.test(p) && u.searchParams.has('returnUrl')) return false;
  return true;
}

function extractSameOriginLinks(html, pageUrl, origin) {
  const out = [];
  const re = /(\s(?:href)=["'])([^"']+)(["'])/gi;
  let m;
  while ((m = re.exec(html))) {
    const decoded = decodeAttr(m[2]);
    if (
      decoded.startsWith('data:') ||
      decoded.startsWith('javascript:') ||
      decoded.startsWith('#') ||
      decoded.startsWith('mailto:') ||
      decoded.startsWith('tel:') ||
      decoded.startsWith('{#')
    ) {
      continue;
    }
    let abs;
    try {
      abs = new URL(decoded, pageUrl).href;
    } catch {
      continue;
    }
    if (isCrawlablePage(abs, origin)) out.push(pageKey(abs));
  }
  return out;
}

function rewriteHtml(html, urlMap, pageUrl, siteOrigin) {
  const base = new URL(pageUrl);
  return html.replace(/(\s(?:src|href)=["'])([^"']+)(["'])/gi, (match, pre, raw, post) => {
    const decoded = decodeAttr(raw);
    if (
      decoded.startsWith('data:') ||
      decoded.startsWith('javascript:') ||
      decoded.startsWith('#') ||
      decoded.startsWith('mailto:') ||
      decoded.startsWith('tel:') ||
      decoded.startsWith('{#') ||
      decoded.startsWith('_mirror/') ||
      decoded.startsWith('/_mirror/')
    ) {
      return match;
    }
    let absUrl;
    try {
      absUrl = new URL(decoded, base);
    } catch {
      return match;
    }
    const abs = normalizeUrlKey(absUrl.href);
    const local = urlMap.get(abs) || urlMap.get(pageKey(abs));
    if (!local) return match;

    const localNorm = local.replace(/\\/g, '/');
    const isDoc =
      /\.html?$/i.test(localNorm) ||
      /\/index\.html$/i.test(localNorm) ||
      (!/\.(css|js|mjs|map|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|eot|json|bin)$/i.test(localNorm) &&
        /\/(product|category|board|member|myshop|order|event|article|about)/i.test(absUrl.pathname));

    // Keep navigations as Cafe24 site paths — preview resolves via url-map / live proxy
    if (siteOrigin && absUrl.origin === siteOrigin && isDoc) {
      return `${pre}${absUrl.pathname}${absUrl.search}${post}`;
    }

    let href = localNorm;
    if (href.startsWith('_mirror/')) href = '/' + href;
    return `${pre}${href}${post}`;
  });
}

function writeSafe(full, body) {
  try {
    fs.mkdirSync(path.dirname(full), { recursive: true });
    if (!fs.existsSync(full)) fs.writeFileSync(full, body);
  } catch (e) {
    // last-resort: hash path under _mirror/_safe/
    const fallback = path.join(
      OUT,
      '_mirror',
      '_safe',
      sha1(full) + (path.extname(full) || '.bin')
    );
    try {
      fs.mkdirSync(path.dirname(fallback), { recursive: true });
      if (!fs.existsSync(fallback)) fs.writeFileSync(fallback, body);
      console.warn(`  WARN path fallback: ${e.message}`);
      return fallback;
    } catch (e2) {
      console.warn(`  WARN skip write: ${e2.message}`);
    }
  }
  return full;
}

(async () => {
  const entry = new URL(DEMO_URL);
  const origin = entry.origin;
  const mirrorDir = path.join(OUT, '_mirror');
  // Keep previous mirror only if intentional remirror — always fresh for fidelity
  if (fs.existsSync(mirrorDir)) fs.rmSync(mirrorDir, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });

  const urlMap = new Map();
  const pageLocalMap = new Map(); // pageKey → local relative path
  const visited = new Set();
  const queue = [pageKey(DEMO_URL)];
  const pages = [];

  const manifest = {
    caseId: CASE_ID,
    collectedAt: new Date().toISOString(),
    entryUrl: DEMO_URL,
    method: 'playwright-pristine-html-multipage-v4',
    maxPages: MAX_PAGES,
    files: [],
    pages: [],
    externalUnresolved: [],
  };

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    locale: 'ko-KR',
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  });

  async function capturePage(targetUrl) {
    const key = pageKey(targetUrl);
    if (visited.has(key)) return;
    if (pages.length >= MAX_PAGES) return;
    visited.add(key);

    const page = await context.newPage();
    page.setDefaultTimeout(120000);
    let pristineHtml = null;

    const onResponse = async (response) => {
      const url = response.url();
      const status = response.status();
      if (status < 200 || status >= 400) return;
      const headers = response.headers();
      const ct = headers['content-type'] || '';

      try {
        const u = new URL(url);
        if (
          u.origin === origin &&
          pageKey(url) === key &&
          /text\/html/i.test(ct) &&
          !pristineHtml
        ) {
          pristineHtml = await response.text();
        }
      } catch (_) {}

      if (!/text\/|application\/|image\/|font\//.test(ct)) return;

      let body;
      try {
        body = await response.body();
      } catch {
        return;
      }
      if (!body || body.length === 0) return;

      const localRel = urlToLocalPath(url, ct);
      if (!localRel) return;

      writeSafe(path.join(OUT, localRel), body);
      const mapKey = normalizeUrlKey(url);
      if (!urlMap.has(mapKey)) {
        urlMap.set(mapKey, localRel.replace(/\\/g, '/'));
        manifest.files.push({
          url: mapKey,
          local: localRel.replace(/\\/g, '/'),
          bytes: body.length,
          contentType: ct.split(';')[0],
        });
      }
    };

    page.on('response', onResponse);

    console.log(`[${pages.length + 1}/${MAX_PAGES}] goto ${key}`);
    try {
      await page.goto(key, { waitUntil: 'networkidle', timeout: 120000 });
    } catch (e) {
      console.warn(`  WARN goto failed: ${e.message}`);
      await page.close();
      return;
    }
    await page.waitForTimeout(1800);

    // light scroll for lazy assets on first few pages + product/category
    const pathName = new URL(key).pathname;
    if (pages.length < 3 || /\/(product|category)\//i.test(pathName)) {
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0;
          const step = 600;
          const t = setInterval(() => {
            y += step;
            window.scrollTo(0, y);
            if (y >= Math.min(document.body.scrollHeight, 4000) + 400) {
              clearInterval(t);
              window.scrollTo(0, 0);
              resolve();
            }
          }, 120);
        });
      });
      await page.waitForTimeout(800);
    }

    if (!pristineHtml) {
      console.warn('  WARN: pristine missing — using page.content()');
      pristineHtml = await page.content();
    }

    const finalUrl = page.url();
    const finalKey = pageKey(finalUrl);
    const localRel = urlToLocalPath(finalKey, 'text/html').replace(/\\/g, '/');
    const rewritten = rewriteHtml(pristineHtml, urlMap, finalUrl, origin);
    fs.mkdirSync(path.dirname(path.join(OUT, localRel)), { recursive: true });
    fs.writeFileSync(path.join(OUT, localRel), rewritten, 'utf8');

    urlMap.set(normalizeUrlKey(finalUrl), localRel);
    urlMap.set(finalKey, localRel);
    urlMap.set(key, localRel);
    pageLocalMap.set(finalKey, localRel);
    pageLocalMap.set(key, localRel);

    pages.push({
      url: finalKey,
      local: localRel,
      bytes: Buffer.byteLength(rewritten),
    });
    manifest.pages.push({ url: finalKey, local: localRel });

    // discover more links from pristine (same as live HTML links)
    for (const link of extractSameOriginLinks(pristineHtml, finalUrl, origin)) {
      if (!visited.has(link) && !queue.includes(link)) queue.push(link);
    }

    // entry convenience: root page also as OUT/index.html
    if (new URL(finalKey).pathname === '/' || pages.length === 1) {
      fs.writeFileSync(path.join(OUT, 'index.html'), rewritten, 'utf8');
      const hostIndex = path.join(OUT, '_mirror', entry.hostname, 'index.pristine.html');
      fs.mkdirSync(path.dirname(hostIndex), { recursive: true });
      fs.writeFileSync(hostIndex, pristineHtml, 'utf8');
      fs.writeFileSync(path.join(OUT, 'index.rendered.html'), await page.content(), 'utf8');
    }

    await page.close();
  }

  while (queue.length && pages.length < MAX_PAGES) {
    const next = queue.shift();
    await capturePage(next);
  }

  // Second pass: rewrite HTML again so late-discovered page links resolve
  for (const p of pages) {
    const full = path.join(OUT, p.local);
    if (!fs.existsSync(full)) continue;
    const raw = fs.readFileSync(full, 'utf8');
    // recover approx page URL for relative resolution
    const rewritten = rewriteHtml(raw, urlMap, p.url, origin);
    fs.writeFileSync(full, rewritten, 'utf8');
    if (p.local.endsWith('/index.html') && new URL(p.url).pathname === '/') {
      fs.writeFileSync(path.join(OUT, 'index.html'), rewritten, 'utf8');
    }
  }

  fs.writeFileSync(
    path.join(OUT, 'url-map.json'),
    JSON.stringify(Object.fromEntries(urlMap), null, 2),
    'utf8'
  );

  manifest.liveOrigin = origin;
  manifest.pageCount = pages.length;
  manifest.queuedRemaining = queue.length;
  fs.writeFileSync(path.join(OUT, 'manifest-original.json'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(
    path.join(OUT, 'pages.json'),
    JSON.stringify({ entryUrl: DEMO_URL, pages, remaining: queue.slice(0, 50) }, null, 2),
    'utf8'
  );

  fs.writeFileSync(
    path.join(OUT, 'README.md'),
    `# 01-original — 수정 금지

${CASE_ID} · multi-page pristine HTML + asset mirror · ${manifest.collectedAt.slice(0, 10)}

- entry: \`${DEMO_URL}\`
- pages: ${pages.length} (max ${MAX_PAGES})
- method: BFS crawl + pristine document + query-hash assets
- preview: \`node scripts/preview-original.js ${CASE_ID} [port]\` (local pages + live proxy for /exec)

## 금지
원본 수정 · Track C 납품 승격
`,
    'utf8'
  );

  await browser.close();

  console.log(
    JSON.stringify(
      {
        caseId: CASE_ID,
        pages: pages.length,
        assets: manifest.files.length,
        urlMap: urlMap.size,
        queuedRemaining: queue.length,
        liveOrigin: origin,
        outDir: OUT,
        samplePages: pages.slice(0, 12).map((p) => p.local),
      },
      null,
      2
    )
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
