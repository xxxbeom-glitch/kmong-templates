/**
 * Rewrite /_mirror/... HTML hrefs back to Cafe24 site paths using url-map.json
 *   node scripts/_rewrite-nav-hrefs.js ptmd869920
 */
const fs = require('fs');
const path = require('path');

const CASE = process.argv[2] || 'ptmd869920';
const ROOT = path.join(__dirname, '..', 'cases', CASE, '01-original');
const urlMap = JSON.parse(fs.readFileSync(path.join(ROOT, 'url-map.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'manifest-original.json'), 'utf8'));
const ORIGIN = manifest.liveOrigin || 'https://ecudemo391069.cafe24.com';

const localToSite = new Map();
for (const [abs, local] of Object.entries(urlMap)) {
  const loc = String(local).replace(/\\/g, '/');
  if (!/\.html?$/i.test(loc) && !/\/index\.html$/i.test(loc)) continue;
  try {
    const u = new URL(abs);
    if (u.origin !== ORIGIN) continue;
    const site = u.pathname + u.search;
    // prefer shorter / canonical product URL without display variants
    if (!localToSite.has(loc) || site.length <= localToSite.get(loc).length) {
      localToSite.set(loc, site);
    }
  } catch (_) {}
}

function rewriteHtml(html) {
  let n = 0;
  const out = html.replace(/(\s(?:href)=["'])([^"']+)(["'])/gi, (match, pre, raw, post) => {
    let decoded = raw.replace(/&amp;/g, '&');
    if (!decoded.includes('_mirror/')) return match;
    const key = decoded.replace(/^\//, '').replace(/\\/g, '/');
    if (localToSite.has(key)) {
      n++;
      return `${pre}${localToSite.get(key)}${post}`;
    }
    return match;
  });
  return { html: out, n };
}

function processFile(filePath) {
  const { html, n } = rewriteHtml(fs.readFileSync(filePath, 'utf8'));
  if (n) fs.writeFileSync(filePath, html, 'utf8');
  return n;
}

function walk(dir) {
  let total = 0;
  let files = 0;
  if (!fs.existsSync(dir)) return { total, files };
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      const r = walk(full);
      total += r.total;
      files += r.files;
    } else if (/\.html?$/i.test(name)) {
      const c = processFile(full);
      if (c) {
        files++;
        total += c;
      }
    }
  }
  return { total, files };
}

let total = processFile(path.join(ROOT, 'index.html'));
let files = total ? 1 : 0;
const r = walk(path.join(ROOT, '_mirror'));
total += r.total;
files += r.files;
console.log(JSON.stringify({ mapSize: localToSite.size, hrefRewrites: total, filesTouched: files }, null, 2));
