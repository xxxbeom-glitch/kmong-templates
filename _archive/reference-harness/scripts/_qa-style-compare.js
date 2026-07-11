const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../cases/ptmd869920/02-original-qa');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });

  async function shot(label, url, viewport) {
    const page = await browser.newPage({
      viewport,
      locale: 'ko-KR',
      deviceScaleFactor: 1,
    });
    const failed = [];
    page.on('response', (r) => {
      if (r.status() >= 400) failed.push({ url: r.url().slice(0, 160), status: r.status() });
    });
    page.on('requestfailed', (r) => {
      failed.push({ url: r.url().slice(0, 160), status: 'failed', err: r.failure()?.errorText });
    });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 }).catch(() => {});
    await page.waitForTimeout(3000);
    // hide overlays on remote too for fair compare
    await page.evaluate(() => {
      document.querySelectorAll('.sample-sg,.mpopup,.mpopup__bg,.rv-frame').forEach((el) => el.remove());
    });
    await page.waitForTimeout(500);
    const dir = path.join(OUT, 'compare');
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${label}.png`);
    await page.screenshot({ path: file, fullPage: false });

    const metrics = await page.evaluate(() => {
      const cssOK = [...document.styleSheets].filter((s) => {
        try {
          return s.cssRules && s.cssRules.length > 0;
        } catch {
          return false;
        }
      }).length;
      const header = document.querySelector('header');
      const hero = document.querySelector('.main-banner, .jsMainSlidePC, [class*="main-banner"]');
      const logo = document.querySelector('.top-logo, [class*="logo"]');
      return {
        title: document.title,
        cssSheetsReadable: cssOK,
        styleSheetCount: document.styleSheets.length,
        headerH: header ? Math.round(header.getBoundingClientRect().height) : 0,
        heroH: hero ? Math.round(hero.getBoundingClientRect().height) : 0,
        logoText: logo ? (logo.innerText || '').trim().slice(0, 40) : '',
        bodyBg: getComputedStyle(document.body).backgroundColor,
        font: getComputedStyle(document.body).fontFamily.slice(0, 80),
      };
    });
    await page.close();
    return { label, file, metrics, failed: failed.slice(0, 40) };
  }

  const remote = await shot('remote-1920', 'https://ecudemo391069.cafe24.com/', {
    width: 1920,
    height: 1080,
  });
  const local = await shot('local-1920', 'http://127.0.0.1:4176/', {
    width: 1920,
    height: 1080,
  });
  const localM = await shot('local-390', 'http://127.0.0.1:4176/', {
    width: 390,
    height: 844,
  });

  const report = {
    checkedAt: new Date().toISOString(),
    remote: { metrics: remote.metrics, failed: remote.failed },
    local: { metrics: local.metrics, failed: local.failed },
    localMobile: { metrics: localM.metrics, failed: localM.failed },
  };
  fs.writeFileSync(path.join(OUT, 'style-qa.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
