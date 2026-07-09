const { chromium } = require('playwright');

const CASES = [
  { id: 'onetenth3', port: 4204 },
  { id: 'onetenth4', port: 4205 },
  { id: 'onetenth6', port: 4206 },
  { id: 'onetenth8', port: 4207 },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const out = {};

  for (const c of CASES) {
    const base = `http://127.0.0.1:${c.port}/`;
    const errors = [];
    const page = await browser.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text().slice(0, 200));
    });
    page.on('pageerror', (e) => errors.push(String(e.message).slice(0, 200)));

    for (const [label, vp] of [
      ['desktop', { width: 1920, height: 1080 }],
      ['mobile', { width: 390, height: 844 }],
    ]) {
      await page.setViewportSize(vp);
      const subErrors = [];
      const p2 = await browser.newPage();
      p2.on('console', (msg) => {
        if (msg.type() === 'error') subErrors.push(msg.text().slice(0, 200));
      });
      p2.on('pageerror', (e) => subErrors.push(String(e.message).slice(0, 200)));
      try {
        const res = await p2.goto(base, { waitUntil: 'networkidle', timeout: 60000 });
        await p2.waitForTimeout(2000);
        const title = await p2.title();
        const bodyH = await p2.evaluate(() => document.body.scrollHeight);
        out[c.id] = out[c.id] || {};
        out[c.id][label] = {
          status: res?.status() || 0,
          title,
          bodyHeight: bodyH,
          errors: [...new Set(subErrors)].slice(0, 15),
          errorCount: [...new Set(subErrors)].length,
        };
      } catch (e) {
        out[c.id] = out[c.id] || {};
        out[c.id][label] = { fail: String(e.message) };
      }
      await p2.close();
    }
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(out, null, 2));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
