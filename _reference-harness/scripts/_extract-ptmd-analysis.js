/**
 * Extract analysis signals from mirrored HTML pages for ptmd869920
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(
  __dirname,
  '..',
  'cases',
  'ptmd869920',
  '01-original'
);

function read(rel) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, 'utf8');
}

function uniq(arr) {
  return [...new Set(arr)];
}

function extractXans(html) {
  const set = new Set();
  for (const m of html.matchAll(/xans-[a-z0-9-]+/gi)) {
    const c = m[0].toLowerCase();
    // normalize common product listmain variants
    set.add(c.replace(/-\d+$/, (s) => s)); // keep number for listmain
  }
  return [...set].sort();
}

function extractSections(html) {
  const out = [];
  for (const m of html.matchAll(/<section[^>]*class=["']([^"']+)["'][^>]*>/gi)) {
    out.push(m[1].replace(/\s+/g, ' ').slice(0, 120));
  }
  return uniq(out).slice(0, 40);
}

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? m[1].trim() : '';
}

function has(html, re) {
  return re.test(html);
}

function productCardHints(html) {
  return {
    listitem: (html.match(/xans-product-listitem/gi) || []).length,
    price: (html.match(/product_price|판매가|원/gi) || []).length > 0,
    sale: /is-sale|할인|strike|prd-price/i.test(html),
    review: /리뷰\s*:/i.test(html),
    wishlist: /wish|관심상품|btnWish/i.test(html),
  };
}

const pages = {
  main: 'index.html',
  plpType: '_mirror/ecudemo391069.cafe24.com/category/유형별/28/index.html',
  plpWorry: '_mirror/ecudemo391069.cafe24.com/category/고민별/58/index.html',
  plpHot: '_mirror/ecudemo391069.cafe24.com/category/핫딜/54/index.html',
  pdp33: '_mirror/ecudemo391069.cafe24.com/product/레티놀-바운스-세럼/33/index.html',
  basket: '_mirror/ecudemo391069.cafe24.com/order/basket.html',
  about: '_mirror/ecudemo391069.cafe24.com/about.html',
  review: '_mirror/ecudemo391069.cafe24.com/board/review/list_photo.board_no-4.html',
  notice: '_mirror/ecudemo391069.cafe24.com/board/free/list.board_no-1.html',
  faq: '_mirror/ecudemo391069.cafe24.com/board/faq/list.board_no-3.html',
  join: '_mirror/ecudemo391069.cafe24.com/member/join.html',
  login: null,
};

const report = {};

for (const [key, rel] of Object.entries(pages)) {
  if (!rel) continue;
  const html = read(rel);
  if (!html) {
    report[key] = { missing: true, rel };
    continue;
  }
  const xans = extractXans(html);
  report[key] = {
    title: extractTitle(html),
    bytes: Buffer.byteLength(html),
    xansTop: xans.filter((c) =>
      /layout-|product-|order-|member-|board-|search-|mall-/i.test(c)
    ).slice(0, 60),
    sections: extractSections(html),
    flags: {
      header: /class=["'][^"']*header/i.test(html),
      footer: /xans-layout-footer|layout-footer/i.test(html),
      slidepackage: /xans-layout-slidepackage/i.test(html),
      category: /xans-layout-category/i.test(html),
      listmain: /xans-product-listmain/i.test(html),
      listnormal: /xans-product-listnormal/i.test(html),
      menupackage: /xans-product-menupackage/i.test(html),
      detail: /xans-product-detail|detailArea|prdInfo/i.test(html),
      option: /xans-product-option|product_option/i.test(html),
      basket: /xans-order-basket|order-basketpackage|ec-base-table/i.test(html),
      mobileTab: /mobile-tab|tabBar|fixmenu|bottom-nav/i.test(html),
      swiper: /swiper/i.test(html),
      bannermanager: /df-bannermanager/i.test(html),
      mpopup: /mpopup|sample-sg/i.test(html),
    },
    card: productCardHints(html),
  };
}

// PDP deeper
const pdp = read(pages.pdp33);
if (pdp) {
  const detailBits = [];
  for (const pat of [
    /xans-product-[a-z0-9-]+/gi,
    /class=["'][^"']*(detail|prd-|infoArea|imgArea|quantity|buy|cart|wish)[^"']*["']/gi,
  ]) {
    for (const m of pdp.matchAll(pat)) detailBits.push(m[0].slice(0, 80));
  }
  report.pdpDetailClasses = uniq(detailBits).slice(0, 80);

  // simple text blocks
  const h1 = pdp.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/i);
  report.pdpH1 = h1 ? h1[1].replace(/<[^>]+>/g, '').trim().slice(0, 80) : null;
}

const outPath = path.join(
  ROOT,
  '..',
  '02-original-qa',
  'analysis-extract.json'
);
fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
console.log('wrote', outPath);
console.log(
  JSON.stringify(
    {
      keys: Object.keys(report),
      plpFlags: report.plpType?.flags,
      pdpFlags: report.pdp33?.flags,
      basketFlags: report.basket?.flags,
      pdpXans: report.pdp33?.xansTop?.slice(0, 25),
      plpXans: report.plpType?.xansTop?.slice(0, 25),
      basketXans: report.basket?.xansTop?.slice(0, 25),
    },
    null,
    2
  )
);
