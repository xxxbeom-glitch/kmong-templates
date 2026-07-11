/**
 * Mirror QA audit for onetenth cases — asset link check + page inventory
 */
const fs = require('fs');
const path = require('path');

const CASES = ['onetenth3', 'onetenth4', 'onetenth6', 'onetenth8'];
const ROOT = path.join(__dirname, '..', 'cases');

function contentPages(pages) {
  return (pages.pages || []).filter((x) => {
    const u = x.url || '';
    return (
      !u.includes('/wp-json/') &&
      !u.includes('/feed') &&
      !u.includes('oembed') &&
      !u.includes('kboard/rss') &&
      !u.includes('?p=')
    );
  });
}

function auditHtml(htmlPath, origDir) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const refs = [];
  const re = /(?:href|src)=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const u = m[1];
    if (u.startsWith('data:') || u.startsWith('#') || u.startsWith('mailto:') || u.startsWith('tel:'))
      continue;
    if (u.startsWith('http') && !u.includes('_mirror') && !u.includes('127.0.0.1')) {
      refs.push({ u, type: 'external', ok: 'EXT' });
      continue;
    }
    refs.push({ u, type: 'local', ok: null });
  }

  const missing = [];
  const external = [];
  for (const r of refs) {
    if (r.ok === 'EXT') {
      external.push(r.u);
      continue;
    }
    let rel = r.u.replace(/^\/_mirror\//, '_mirror/');
    if (rel.startsWith('/')) rel = rel.slice(1);
    if (rel.startsWith('http://') || rel.startsWith('https://')) {
      external.push(r.u);
      continue;
    }
    const fp = path.join(origDir, rel.split('?')[0].split('#')[0]);
    if (!fs.existsSync(fp)) missing.push(r.u);
  }

  return {
    totalRefs: refs.length,
    missing: [...new Set(missing)],
    external: [...new Set(external)].slice(0, 30),
    externalCount: [...new Set(external)].length,
  };
}

function extractGnb(html) {
  const menus = [];
  const navMatch = html.match(/<nav[^>]*class="[^"]*uicore[^"]*"[^>]*>([\s\S]{0,8000}?)<\/nav>/i);
  if (!navMatch) return menus;
  const block = navMatch[1];
  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(block))) {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (text && text.length < 40) menus.push({ href: m[1], text });
  }
  return menus.slice(0, 20);
}

function extractMainHeadings(html) {
  const h = [];
  const re = /<h[12][^>]*>([\s\S]*?)<\/h[12]>/gi;
  let m;
  while ((m = re.exec(html))) {
    const t = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (t && t.length > 2 && t.length < 120) h.push(t);
  }
  return [...new Set(h)].slice(0, 25);
}

const report = {};

for (const id of CASES) {
  const origDir = path.join(ROOT, id, '01-original');
  const indexPath = path.join(origDir, 'index.html');
  const pages = JSON.parse(fs.readFileSync(path.join(origDir, 'pages.json'), 'utf8'));
  const html = fs.readFileSync(indexPath, 'utf8');
  const audit = auditHtml(indexPath, origDir);
  const manifest = JSON.parse(
    fs.readFileSync(path.join(origDir, 'manifest-original.json'), 'utf8')
  );

  report[id] = {
    title: html.match(/<title>([^<]+)/)?.[1] || '',
    contentPages: contentPages(pages).map((p) => p.url),
    remaining: (pages.remaining || []).length,
    assets: manifest.files?.length || 0,
    audit,
    gnb: extractGnb(html),
    mainHeadings: extractMainHeadings(html),
    hasFullpage: html.includes('fullpage') || html.includes('fp-section'),
    hasSwiper: html.includes('swiper'),
    hasFaq: html.includes('accordion') || html.includes('faq'),
    hasCounter: html.includes('counter') || html.includes('elementor-counter'),
    hasTestimonial: html.includes('testimonial'),
    hasPricing: html.includes('Premium') && html.includes('Basic'),
    hasVideo: html.includes('youtube') || html.includes('elementor-widget-video'),
  };
}

const out = path.join(__dirname, '..', 'cases', '_onetenth-qa-audit.json');
fs.writeFileSync(out, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
