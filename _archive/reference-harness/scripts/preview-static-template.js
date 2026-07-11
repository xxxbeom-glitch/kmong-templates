/**
 * Static template preview — templates/{slug}/
 *
 *   node scripts/preview-static-template.js template-homepage 4401
 *   node scripts/preview-static-template.js template-homepage 4401 --force
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SLUG = process.argv[2];
const FORCE = process.argv.includes('--force') || process.env.PREVIEW_FORCE === '1';
const portArg = process.argv.find((a, i) => i >= 3 && /^\d+$/.test(a));
const PORT = Number(portArg) || 4401;
const ROOT = path.join(__dirname, '..', '..', 'templates', SLUG || '');
const PREVIEW_URL = `http://127.0.0.1:${PORT}/`;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

function killPort(port) {
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
        } catch (_) {}
      }
    } else {
      try {
        execSync(`lsof -ti tcp:${port} | xargs -r kill -9`, { stdio: 'ignore' });
      } catch (_) {}
    }
  } catch (_) {}
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const rel = decoded.replace(/^\/+/, '');
  const abs = path.normalize(path.join(ROOT, rel));
  if (!abs.startsWith(ROOT)) return null;
  return abs;
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  fs.createReadStream(filePath).pipe(res);
}

if (!SLUG || !fs.existsSync(path.join(ROOT, 'index.html'))) {
  console.error(`templates/${SLUG || '?'}/index.html 없음`);
  process.exit(1);
}

if (FORCE) killPort(PORT);

const server = http.createServer((req, res) => {
  const u = new URL(req.url || '/', PREVIEW_URL);
  let filePath = safePath(u.pathname);

  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Forbidden');
  }

  if (u.pathname === '/' || u.pathname.endsWith('/')) {
    const index = path.join(filePath, 'index.html');
    if (fs.existsSync(index) && fs.statSync(index).isFile()) {
      return sendFile(res, index);
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return sendFile(res, filePath);
  }

  const index = path.join(filePath, 'index.html');
  if (fs.existsSync(index)) {
    return sendFile(res, index);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`port ${PORT} in use — node scripts/preview-static-template.js ${SLUG} ${PORT} --force`);
    process.exit(1);
  }
  console.error(err);
  process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`preview static ${SLUG} → ${PREVIEW_URL}`);
  console.log(`root: ${ROOT}`);
  console.log('Ctrl+C to stop');
});
