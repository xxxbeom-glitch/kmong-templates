const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(
  'cases/ptmd869920/01-original/_mirror/ecudemo391069.cafe24.com/index.html',
  'utf8'
);
const srcs = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]);
console.log(srcs.join('\n'));
const appDir =
  'cases/ptmd869920/01-original/_mirror/ecudemo391069.cafe24.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG';
if (fs.existsSync(appDir)) {
  const files = fs.readdirSync(appDir).filter((f) => f.endsWith('.js'));
  console.log('--- app js ---');
  for (const f of files) {
    const p = path.join(appDir, f);
    const t = fs.readFileSync(p, 'utf8');
    const hit = /df-banner|bannerCode|BannerManager|cate-banner/i.test(t);
    console.log(f, fs.statSync(p).size, hit ? 'BANNER_HIT' : '');
  }
}
