/**
 * 01-original 미리보기 서버
 * - Cafe24 절대경로 (/ind-script, /web, /file_data …) → _mirror 매핑
 * - 원본 파일은 수정하지 않음
 *
 * 사용:
 *   node scripts/preview-original.js sample03
 *   → http://127.0.0.1:4173/
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const CASE = process.argv[2] || 'sample03';
const PORT = Number(process.argv[3]) || 4173;
const ROOT = path.join(__dirname, '..', 'cases', CASE, '01-original');
const MIRROR_HOST = path.join(ROOT, '_mirror', 'ecudemo400494.cafe24.com');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.php': 'text/css; charset=utf-8',
};

function send(res, status, body, type) {
  res.writeHead(status, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
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

function resolve(reqPath) {
  const clean = decodeURIComponent(reqPath.split('?')[0]);

  if (clean === '/' || clean === '/index.html') {
    return path.join(ROOT, 'index.html');
  }

  // Cafe24 abs paths → mirror host root
  if (
    clean.startsWith('/ind-script/') ||
    clean.startsWith('/web/') ||
    clean.startsWith('/file_data/') ||
    clean.startsWith('/_onedesign/') ||
    clean.startsWith('/_images/') ||
    clean.startsWith('/exec/') ||
    clean.startsWith('/board/') ||
    clean.startsWith('/product/') ||
    clean.startsWith('/member/') ||
    clean.startsWith('/order/') ||
    clean.startsWith('/myshop/') ||
    clean.startsWith('/category/') ||
    clean.startsWith('/app/')
  ) {
    const mapped = path.join(MIRROR_HOST, clean.replace(/^\//, ''));
    if (tryRead(mapped)) return mapped;
    // optimizer.php?… → file without query already handled; also try bare .php
    if (clean.startsWith('/ind-script/optimizer')) {
      const base = path.basename(clean);
      const candidate = path.join(MIRROR_HOST, 'ind-script', base);
      if (tryRead(candidate)) return candidate;
    }
  }

  // relative _mirror/... under ROOT
  const underRoot = path.join(ROOT, clean.replace(/^\//, ''));
  if (tryRead(underRoot)) return underRoot;

  return null;
}

const server = http.createServer((req, res) => {
  const url = req.url || '/';
  const file = resolve(url);

  if (!file) {
    // stub empty responses for cafe24 ajax / analytics to avoid spin
    if (
      url.includes('cfa.') ||
      url.includes('poxo') ||
      url.includes('/exec/') ||
      url.includes('js-error-tracer')
    ) {
      return send(res, 204, '');
    }
    return send(res, 404, `Not found: ${url}`);
  }

  const body = tryRead(file);
  if (!body) return send(res, 404, `Empty: ${url}`);

  const ext = path.extname(file).toLowerCase();
  send(res, 200, body, MIME[ext] || 'application/octet-stream');
});

if (!fs.existsSync(path.join(ROOT, 'index.html'))) {
  console.error('Missing 01-original/index.html for', CASE);
  process.exit(1);
}

server.listen(PORT, '127.0.0.1', () => {
  console.log(`preview ${CASE} → http://127.0.0.1:${PORT}/`);
  console.log(`root: ${ROOT}`);
  console.log('Ctrl+C to stop');
});
