const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CASE = 'sample03';
const ROOT = path.join(__dirname, '..', 'cases', CASE, '01-original');
const manifestPath = path.join(ROOT, 'manifest-original.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

function urlToLocalPath(urlStr) {
  const u = new URL(urlStr);
  const hostDir = u.hostname.replace(/[^a-zA-Z0-9.-]/g, '_');
  let pathname = decodeURIComponent(u.pathname);
  if (pathname.endsWith('/')) pathname += 'index.html';
  return path.join('_mirror', hostDir, pathname.replace(/^\//, ''));
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib
      .get(url, { headers: { 'User-Agent': 'reference-harness/1.0' } }, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchUrl(new URL(res.headers.location, url).href).then(resolve).catch(reject);
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () =>
          resolve({ status: res.statusCode, body: Buffer.concat(chunks), ct: res.headers['content-type'] || '' })
        );
      })
      .on('error', reject);
  });
}

(async () => {
  const host = 'ecudemo400494.cafe24.com';
  const pending = manifest.externalUnresolved.filter((u) => {
    try {
      return new URL(u).hostname === host;
    } catch {
      return false;
    }
  });

  let added = 0;
  const stillMissing = [];

  for (const url of pending) {
    const localRel = urlToLocalPath(url);
    const full = path.join(ROOT, localRel);
    if (fs.existsSync(full)) continue;
    try {
      const res = await fetchUrl(url);
      if (!res.status || res.status >= 400 || !res.body.length) {
        stillMissing.push(url);
        continue;
      }
      fs.mkdirSync(path.dirname(full), { recursive: true });
      fs.writeFileSync(full, res.body);
      manifest.files.push({
        url,
        local: localRel.replace(/\\/g, '/'),
        bytes: res.body.length,
        contentType: (res.ct || '').split(';')[0],
        note: 'backfill-fetch',
      });
      added++;
      console.log('ok', url);
    } catch (e) {
      stillMissing.push(url);
      console.log('fail', url, e.message);
    }
  }

  manifest.externalUnresolved = manifest.externalUnresolved.filter((u) => {
    if (stillMissing.includes(u)) return true;
    try {
      return new URL(u).hostname !== host;
    } catch {
      return true;
    }
  });
  manifest.backfillAt = new Date().toISOString();
  manifest.backfillAdded = added;

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(JSON.stringify({ added, stillMissingHost: stillMissing.length, unresolved: manifest.externalUnresolved.length }));
})();
