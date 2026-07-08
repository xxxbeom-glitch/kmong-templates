const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const apis = [];
  page.on('response', async (res) => {
    const u = res.url();
    const ct = res.headers()['content-type'] || '';
    const hit =
      /banner|Banner|skin\/|Skin|design\/|ShopInfo|df-banner|\/exec\//i.test(u) ||
      /json/i.test(ct);
    if (!hit) return;
    let body = '';
    try {
      if (/json|javascript|text/i.test(ct)) body = (await res.text()).slice(0, 240);
    } catch (_) {}
    apis.push({ status: res.status(), u: u.slice(0, 200), ct: ct.slice(0, 50), body });
  });
  await page.goto('https://ecudemo391069.cafe24.com/', { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(2500);
  const filtered = apis.filter((a) =>
    /banner|Banner|skin|Skin|design|Shop|exec|json/i.test(a.u + a.ct)
  );
  console.log(JSON.stringify(filtered.slice(0, 60), null, 2));
  console.log('total', filtered.length);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
