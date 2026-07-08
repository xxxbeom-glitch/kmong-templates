const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../cases/ptmd869920/02-original-qa/compare');
fs.mkdirSync(OUT, { recursive: true });

async function measure(page, label) {
  await page.waitForTimeout(5000);
  await page.evaluate(() => {
    document.querySelectorAll('.sample-sg,.df-bannermanager-sample').forEach((el) => {
      try {
        el.remove();
      } catch (_) {}
    });
  });
  await page.waitForTimeout(500);

  const data = await page.evaluate(() => {
    const cate = [...document.querySelectorAll('.cate-banner__item')];
    const names = cate.map((el) => (el.querySelector('.cate-banner__name')?.innerText || '').trim());
    const hero = document.querySelector('.jsMainSlidePC');
    const heroInited = !!(
      hero &&
      (hero.classList.contains('swiper-container-initialized') ||
        hero.classList.contains('swiper-initialized'))
    );
    const slides = document.querySelectorAll('.jsMainBannerItemPC').length;
    return {
      cateCount: cate.length,
      names,
      heroInited,
      slides,
      jQuery: typeof window.jQuery,
      Swiper: typeof window.Swiper,
      title: document.title,
    };
  });

  // try click next on hero
  let slideAfterClick = null;
  try {
    const before = await page.evaluate(() => {
      const a = document.querySelector('.jsMainSlidePC .swiper-slide-active');
      return a ? a.getAttribute('data-swiper-slide-index') || a.outerHTML.slice(0, 80) : null;
    });
    await page.locator('.jsMainSlidePC .swiper-button-next, .main-banner .swiper-button-next').first().click({ timeout: 2000 });
    await page.waitForTimeout(800);
    const after = await page.evaluate(() => {
      const a = document.querySelector('.jsMainSlidePC .swiper-slide-active');
      return a ? a.getAttribute('data-swiper-slide-index') || a.outerHTML.slice(0, 80) : null;
    });
    slideAfterClick = { before, after, changed: before !== after };
  } catch (e) {
    slideAfterClick = { error: e.message };
  }

  await page.screenshot({ path: path.join(OUT, `${label}-fold.png`), fullPage: false });
  return { ...data, slideAfterClick };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const remotePage = await browser.newPage({ viewport: { width: 1920, height: 1080 }, locale: 'ko-KR' });
  await remotePage.goto('https://ecudemo391069.cafe24.com/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  const remote = await measure(remotePage, 'remote-v3');
  await remotePage.close();

  const localPage = await browser.newPage({ viewport: { width: 1920, height: 1080 }, locale: 'ko-KR' });
  await localPage.goto('http://127.0.0.1:4180/', { waitUntil: 'domcontentloaded', timeout: 90000 });
  const local = await measure(localPage, 'local-v3');
  await localPage.close();

  const report = { remote, local, matchCate: remote.cateCount === local.cateCount };
  fs.writeFileSync(path.join(OUT, '../fidelity-v3.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
