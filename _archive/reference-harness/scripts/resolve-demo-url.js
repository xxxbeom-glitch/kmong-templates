/**
 * Resolve Cafe24 design-center sample → demo mall URL + title
 *   node scripts/resolve-demo-url.js PTMD871337
 */
const { chromium } = require('playwright');

const codes = process.argv.slice(2);
if (!codes.length) {
  console.error('Usage: node scripts/resolve-demo-url.js PTMD871337 [PTMD...]');
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const out = [];
  for (const code of codes) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.setDefaultTimeout(90000);
    const url = `https://d.cafe24.com/sample?productCode=${code}&frame=P`;
    console.error(`resolve ${code}…`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(4000);

    const info = await page.evaluate(() => {
      const iframes = [...document.querySelectorAll('iframe')].map((f) => f.src).filter(Boolean);
      const demo =
        iframes.find((s) => /ecudemo\d+\.cafe24\.com/i.test(s)) ||
        iframes.find((s) => /cafe24\.com/i.test(s)) ||
        '';
      let title =
        document.querySelector('h1, .product_name, .tit, .title')?.textContent?.trim() ||
        document.title ||
        '';
      return { iframes: iframes.slice(0, 10), demo, title };
    });

    let demoMall = '';
    try {
      if (info.demo) {
        const u = new URL(info.demo);
        demoMall = u.origin + '/';
      }
    } catch (_) {}

    // fallback: click preview links
    if (!demoMall) {
      const href = await page
        .locator('a[href*="ecudemo"], a[href*="cafe24.com"]')
        .first()
        .getAttribute('href')
        .catch(() => null);
      if (href) {
        try {
          demoMall = new URL(href, url).origin + '/';
        } catch (_) {}
      }
    }

    out.push({
      productCode: code.toUpperCase(),
      caseId: code.toLowerCase(),
      designCenterUrl: url,
      demoMallUrl: demoMall,
      title: info.title,
      iframeSample: info.iframes[0] || null,
    });
    await page.close();
  }
  await browser.close();
  console.log(JSON.stringify(out, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
