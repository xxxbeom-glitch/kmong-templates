/**
 * 로컬 아이콘 갤러리 서버 — 새로고침할 때마다 폴더를 다시 읽음 (빌드 불필요)
 * Usage: node _icons/serve-gallery.js
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const ROOT = __dirname;
const PORT = 3847;

function listFiles(dir, ext) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => f.toLowerCase().endsWith(ext))
    .sort((a, b) => a.localeCompare(b));
}

function isFillName(name) {
  return /(^|-)fill(-|$|\.)/i.test(name);
}

function buildPage() {
  // Reuse generator by requiring inline logic — call build then read,
  // or generate in memory. Prefer running build-gallery exports.
  const buildPath = path.join(ROOT, 'build-gallery.js');
  // Generate fresh index via child-less require of logic:
  delete require.cache[require.resolve('./build-gallery.js')];
  // build-gallery writes to disk; run it as function by spawning sync
  require('child_process').execFileSync(process.execPath, [buildPath], {
    cwd: path.join(ROOT, '..'),
    stdio: 'pipe',
  });
  return fs.readFileSync(path.join(ROOT, 'index.html'));
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath === '/' || urlPath === '/index.html') {
      const body = buildPage();
      res.writeHead(200, { 'Content-Type': MIME['.html'], 'Cache-Control': 'no-store' });
      res.end(body);
      return;
    }

    const safe = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
    const filePath = path.join(ROOT, safe);
    if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    res.writeHead(500);
    res.end(String(err));
  }
});

server.listen(PORT, () => {
  const url = `http://127.0.0.1:${PORT}/`;
  console.log(`[icons] gallery → ${url}`);
  console.log('[icons] 아이콘 추가 후 브라우저만 새로고침하면 됩니다. 종료: Ctrl+C');
  const platform = process.platform;
  if (platform === 'win32') exec(`start ${url}`);
  else if (platform === 'darwin') exec(`open ${url}`);
  else exec(`xdg-open ${url}`);
});
