/**
 * 01-original high-fidelity preview
 * - Local _mirror + url-map for optimizer hashes
 * - Live proxy fallback to demo origin for /exec and missing assets (interactions)
 * - Optional overlay hide for sample-guide only
 *
 * Fixed local URL (기본 포트는 바꾸지 않음):
 *   http://127.0.0.1:4173/
 *
 *   node scripts/preview-original.js ptmd869920
 *   node scripts/preview-original.js ptmd869920 --force   # 포트 점유 시 재기동
 *   node scripts/preview-original.js ptmd869920 --working # 04-working-copy
 *   node scripts/preview-original.js ptmd869920 4173
 */
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { execSync } = require('child_process');

const CASE = process.argv[2] || 'sample03';
const FORCE = process.argv.includes('--force') || process.env.PREVIEW_FORCE === '1';
const WORKING =
  process.argv.includes('--working') ||
  process.env.PREVIEW_WORKING === '1' ||
  process.argv.includes('--work');
const portArg = process.argv.find((a, i) => i >= 3 && /^\d+$/.test(a));
/** Canonical preview port — 사용자가 바꾸라고 하기 전엔 이 주소만 안내 */
const DEFAULT_PORT = 4173;
const PORT = Number(portArg) || DEFAULT_PORT;
const VARIANT = WORKING ? '04-working-copy' : '01-original';
const ROOT = path.join(__dirname, '..', 'cases', CASE, VARIANT);
const MIRROR_ROOT = path.join(ROOT, '_mirror');
const URL_MAP_PATH = path.join(ROOT, 'url-map.json');
const MANIFEST_PATH = path.join(ROOT, 'manifest-original.json');
const PREVIEW_URL = `http://127.0.0.1:${PORT}/`;

function detectMirrorHost() {
  if (!fs.existsSync(MIRROR_ROOT)) return path.join(MIRROR_ROOT, 'unknown');
  const hosts = fs
    .readdirSync(MIRROR_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  return path.join(
    MIRROR_ROOT,
    hosts.find((h) => h.startsWith('ecudemo')) ||
      hosts.find((h) => h.includes('cafe24.com')) ||
      hosts[0] ||
      'unknown'
  );
}
const MIRROR_HOST = detectMirrorHost();

let LIVE_ORIGIN = `https://${path.basename(MIRROR_HOST)}`;
if (fs.existsSync(MANIFEST_PATH)) {
  try {
    const m = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    if (m.liveOrigin) LIVE_ORIGIN = m.liveOrigin;
    else if (m.entryUrl) LIVE_ORIGIN = new URL(m.entryUrl).origin;
  } catch (_) {}
}

let urlMap = {};
if (fs.existsSync(URL_MAP_PATH)) {
  try {
    urlMap = JSON.parse(fs.readFileSync(URL_MAP_PATH, 'utf8'));
  } catch (_) {}
}

const queryLookup = new Map();
for (const [absUrl, localRel] of Object.entries(urlMap)) {
  try {
    const u = new URL(absUrl);
    queryLookup.set(u.pathname + u.search, localRel.replace(/\\/g, '/'));
  } catch (_) {}
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
};

function send(res, status, body, type, extraHeaders) {
  res.writeHead(status, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    ...(extraHeaders || {}),
  });
  res.end(body);
}

function tryRead(filePath) {
  try {
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      return fs.readFileSync(filePath);
    }
  } catch (_) {}
  return null;
}

/** Hide vendor sample guide + demo popup overlay — keep banners/slides intact */
const PREVIEW_HIDE_SNIPPET = `
<style id="preview-hide-sample">
.sample-sg, .df-bannermanager-sample { display:none !important; }
.mpopup, .mpopup__bg, .df-bannermanager-popup { display:none !important; }
</style>
<script id="preview-hide-sample-js">
(function(){
  function wipe(){
    document.querySelectorAll('.sample-sg,.df-bannermanager-sample,.mpopup,.df-bannermanager-popup').forEach(function(el){
      try{ el.remove(); }catch(e){}
    });
  }
  wipe();
  document.addEventListener('DOMContentLoaded', wipe);
  setTimeout(wipe, 400);
  setTimeout(wipe, 1200);
})();
</script>
`;

function injectSampleHide(body) {
  const html = body.toString('utf8');
  if (html.includes('preview-hide-sample')) return body;
  if (/<\/head>/i.test(html)) {
    return Buffer.from(html.replace(/<\/head>/i, PREVIEW_HIDE_SNIPPET + '</head>'), 'utf8');
  }
  return Buffer.from(html + PREVIEW_HIDE_SNIPPET, 'utf8');
}

/** working-copy only: inject /working-overrides.css on every HTML page (mirror pages included) */
function injectWorkingOverrides(body) {
  if (!WORKING) return body;
  const overridePath = path.join(ROOT, 'working-overrides.css');
  if (!fs.existsSync(overridePath)) return body;
  const html = body.toString('utf8');
  if (html.includes('working-overrides.css') || html.includes('id="working-overrides"')) {
    return body;
  }
  const link =
    '<link id="working-overrides" rel="stylesheet" href="/working-overrides.css" />\n';
  if (/<\/head>/i.test(html)) {
    return Buffer.from(html.replace(/<\/head>/i, link + '</head>'), 'utf8');
  }
  return Buffer.from(link + html, 'utf8');
}

function lookupUrlMap(pathname, search) {
  const abs = LIVE_ORIGIN + pathname + (search || '');
  const candidates = [abs];
  try {
    const u = new URL(abs);
    // without tracking-ish reorder: exact first
    if (urlMap[u.href]) return urlMap[u.href];
    const noHash = u.href;
    if (urlMap[noHash]) return urlMap[noHash];
  } catch (_) {}
  // pathname+search key in queryLookup
  const q = queryLookup.get(pathname + (search || ''));
  if (q) return q;
  // try without empty search
  if (search) {
    const q2 = queryLookup.get(pathname);
    if (q2) return q2;
  }
  for (const c of candidates) {
    if (urlMap[c]) return urlMap[c];
  }
  // fuzzy: any map key ending with pathname+search
  const needle = pathname + (search || '');
  for (const [absUrl, localRel] of Object.entries(urlMap)) {
    try {
      const uu = new URL(absUrl);
      if (uu.pathname + uu.search === needle) return localRel;
      if (!search && uu.pathname === pathname) return localRel;
    } catch (_) {}
  }
  return null;
}

function resolveLocal(reqUrl) {
  const u = new URL(reqUrl, 'http://127.0.0.1');
  const clean = decodeURIComponent(u.pathname);
  const withQuery = clean + u.search;

  if (clean === '/' || clean === '/index.html') {
    return path.join(ROOT, 'index.html');
  }

  // Exact url-map hit (HTML pages + hashed optimizer assets)
  const mappedRel = lookupUrlMap(clean, u.search);
  if (mappedRel) {
    const full = path.join(ROOT, mappedRel);
    if (tryRead(full)) return full;
  }

  if (u.search) {
    const mapped = queryLookup.get(withQuery);
    if (mapped) {
      const full = path.join(ROOT, mapped);
      if (tryRead(full)) return full;
    }
    const k = u.searchParams.get('k');
    if (k) {
      for (const [key, local] of queryLookup.entries()) {
        if (key.includes(`k=${k}`)) {
          const full = path.join(ROOT, local);
          if (tryRead(full)) return full;
        }
      }
    }
    // HTML with query: list.html?board_no=4 → list.board_no-4.html
    const base = path.basename(clean);
    if (/\.html?$/i.test(base)) {
      const dir = path.dirname(clean).replace(/^\//, '');
      const stem = base.replace(/\.[^.]+$/, '');
      const ext = path.extname(base) || '.html';
      const q = [...u.searchParams.entries()]
        .map(([kk, v]) => `${kk}-${v}`)
        .join('_')
        .replace(/[^\w.-]+/g, '-')
        .slice(0, 80);
      if (q) {
        const hashed = path.join(MIRROR_HOST, dir, `${stem}.${q}${ext}`);
        if (tryRead(hashed)) return hashed;
      }
    }
  }

  // rewritten relative _mirror/...
  const underRoot = path.join(ROOT, clean.replace(/^\//, ''));
  if (tryRead(underRoot)) return underRoot;

  // Cafe24 absolute skin / page paths under mirror host
  if (clean.startsWith('/')) {
    const rel = clean.replace(/^\//, '');
    const mapped = path.join(MIRROR_HOST, rel);
    if (tryRead(mapped)) return mapped;
    // directory pretty URL → index.html
    if (clean.endsWith('/')) {
      const idx = path.join(MIRROR_HOST, rel, 'index.html');
      if (tryRead(idx)) return idx;
      const idx2 = path.join(MIRROR_HOST, rel.replace(/\/$/, ''), 'index.html');
      if (tryRead(idx2)) return idx2;
    } else if (!path.extname(clean)) {
      const idx = path.join(MIRROR_HOST, rel, 'index.html');
      if (tryRead(idx)) return idx;
      const asHtml = path.join(MIRROR_HOST, rel + '.html');
      if (tryRead(asHtml)) return asHtml;
    }

    if (/optimizer/i.test(clean)) {
      const dir = path.join(MIRROR_HOST, path.dirname(rel));
      if (fs.existsSync(dir)) {
        const base = path.basename(clean).replace(/\.php$/, '');
        const type = u.searchParams.get('type');
        const files = fs.readdirSync(dir).filter((f) => f.startsWith(base + '.'));
        const prefer =
          (type === 'css' && files.find((f) => f.endsWith('.css'))) ||
          (type === 'js' && files.find((f) => f.endsWith('.js'))) ||
          files[0];
        if (prefer) {
          const full = path.join(dir, prefer);
          if (tryRead(full)) return full;
        }
      }
    }
  }

  return null;
}

function proxyLive(reqUrl, req, res) {
  const u = new URL(reqUrl, 'http://127.0.0.1');
  const target = LIVE_ORIGIN + u.pathname + u.search;
  const lib = target.startsWith('https') ? https : http;

  const headers = {
    ...req.headers,
    host: new URL(LIVE_ORIGIN).host,
    referer: LIVE_ORIGIN + '/',
  };
  delete headers['accept-encoding'];

  const p = lib.request(
    target,
    { method: req.method || 'GET', headers },
    (up) => {
      const outHeaders = { ...up.headers, 'cache-control': 'no-store' };
      // avoid compressed piping issues
      delete outHeaders['content-encoding'];
      delete outHeaders['content-length'];
      res.writeHead(up.statusCode || 502, {
        'content-type': outHeaders['content-type'] || 'application/octet-stream',
        'cache-control': 'no-store',
        'access-control-allow-origin': '*',
      });
      up.pipe(res);
    }
  );
  p.on('error', (e) => {
    send(res, 502, `proxy error: ${e.message}`);
  });
  if (req.method === 'POST' || req.method === 'PUT') {
    req.pipe(p);
  } else {
    p.end();
  }
}

function shouldProxy(pathname) {
  return (
    pathname.startsWith('/exec/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('async') ||
    pathname.startsWith('/Shade_Composition') ||
    pathname.startsWith('/s/') // youtube-ish absolute wrong paths — still try? no
  );
}

const server = http.createServer((req, res) => {
  const reqUrl = req.url || '/';
  const u = new URL(reqUrl, 'http://127.0.0.1');

  // CORS preflight for local XHR
  if (req.method === 'OPTIONS') {
    return send(res, 204, '', 'text/plain', {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': '*',
    });
  }

  // working-copy override stylesheet (not under _mirror)
  if (WORKING && (u.pathname === '/working-overrides.css' || u.pathname === '/working-overrides.css/')) {
    const overridePath = path.join(ROOT, 'working-overrides.css');
    const css = tryRead(overridePath);
    if (css) return send(res, 200, css, 'text/css; charset=utf-8');
    return send(res, 404, 'working-overrides.css missing');
  }

  const local = resolveLocal(reqUrl);
  if (local) {
    const bodyRaw = tryRead(local);
    if (!bodyRaw) return send(res, 404, `Empty: ${reqUrl}`);
    const ext = path.extname(local).toLowerCase();
    let type = MIME[ext] || 'application/octet-stream';
    let body = bodyRaw;

    if (ext === '.css' || (local.includes('optimizer') && local.endsWith('.css'))) {
      type = 'text/css; charset=utf-8';
    }
    if (ext === '.js' || (local.includes('optimizer') && local.endsWith('.js')) || local.endsWith('.js')) {
      if (!local.endsWith('.css')) type = 'application/javascript; charset=utf-8';
    }
    if (ext === '.html' || /text\/html/i.test(type)) {
      body = injectSampleHide(bodyRaw);
      body = injectWorkingOverrides(body);
      type = 'text/html; charset=utf-8';
    }
    return send(res, 200, body, type);
  }

  // Live proxy for commerce/async + missing skin assets + uncaptured HTML pages
  if (
    shouldProxy(u.pathname) ||
    u.pathname.startsWith('/web/') ||
    u.pathname.startsWith('/moa/') ||
    u.pathname.startsWith('/ind-script/') ||
    u.pathname.startsWith('/file_data/') ||
    u.pathname.startsWith('/_images/') ||
    u.pathname.startsWith('/Skin/') ||
    u.pathname.startsWith('/app/') ||
    u.pathname.startsWith('/product/') ||
    u.pathname.startsWith('/category/') ||
    u.pathname.startsWith('/board/') ||
    u.pathname.startsWith('/member/') ||
    u.pathname.startsWith('/myshop/') ||
    u.pathname.startsWith('/order/') ||
    u.pathname.startsWith('/event/') ||
    /\.html?$/i.test(u.pathname)
  ) {
    return proxyLive(reqUrl, req, res);
  }

  // ignore trackers
  if (/cfa\.|poxo|youtube|doubleclick|google|facebook|js-error-tracer/i.test(reqUrl)) {
    return send(res, 204, '');
  }

  return send(res, 404, `Not found: ${reqUrl}`);
});

if (!fs.existsSync(path.join(ROOT, 'index.html'))) {
  console.error(`Missing ${VARIANT}/index.html for`, CASE);
  if (WORKING) {
    console.error(`먼저: node scripts/init-working-copy.js ${CASE}`);
  }
  process.exit(1);
}

function probePreview() {
  return new Promise((resolve) => {
    const req = http.get(PREVIEW_URL, { timeout: 1500 }, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

function killPortListeners(port) {
  try {
    if (process.platform === 'win32') {
      const out = execSync(`netstat -ano | findstr ":${port}" | findstr LISTENING`, {
        encoding: 'utf8',
      });
      const pids = new Set();
      for (const line of out.split(/\r?\n/)) {
        const m = line.trim().match(/\s(\d+)\s*$/);
        if (m && m[1] !== '0') pids.add(m[1]);
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
          console.log(`freed port ${port} (killed PID ${pid})`);
        } catch (_) {}
      }
    } else {
      try {
        execSync(`lsof -ti tcp:${port} | xargs -r kill -9`, { stdio: 'ignore' });
        console.log(`freed port ${port}`);
      } catch (_) {}
    }
  } catch (_) {
    // nothing listening / parse fail
  }
}

function writePreviewBookmark() {
  const text = PREVIEW_URL + '\n';
  try {
    fs.writeFileSync(path.join(ROOT, 'PREVIEW.url.txt'), text, 'utf8');
  } catch (_) {}
  // Windows Internet Shortcut (optional open-friendly)
  try {
    fs.writeFileSync(
      path.join(ROOT, 'PREVIEW.url'),
      `[InternetShortcut]\nURL=${PREVIEW_URL}\n`,
      'utf8'
    );
  } catch (_) {}
}

function startListen() {
  writePreviewBookmark();
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`preview ${CASE} [${VARIANT}] → ${PREVIEW_URL}`);
    console.log(`(포트 ${PORT} · --force 재기동${WORKING ? ' · working-copy' : ''})`);
    console.log(`root: ${ROOT}`);
    console.log(`mirror: ${MIRROR_HOST}`);
    console.log(`live proxy: ${LIVE_ORIGIN}`);
    console.log(`url-map: ${Object.keys(urlMap).length}`);
    console.log('Ctrl+C to stop');
  });
}

server.on('error', async (err) => {
  if (err && err.code === 'EADDRINUSE') {
    const alive = await probePreview();
    if (alive && !FORCE) {
      console.log(`이미 실행 중 → ${PREVIEW_URL}`);
      console.log(`같은 주소를 쓰세요. 재기동이 필요하면: node scripts/preview-original.js ${CASE} --force`);
      writePreviewBookmark();
      process.exit(0);
    }
    if (FORCE || !alive) {
      console.log(`port ${PORT} in use — freeing…`);
      killPortListeners(PORT);
      setTimeout(() => startListen(), 600);
      return;
    }
  }
  console.error(err);
  process.exit(1);
});

startListen();
