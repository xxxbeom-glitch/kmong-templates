import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "_screenshots", "design-system");

const modules = [
  "_modules/kv/kv-full.html",
  "_modules/kv/kv-center.html",
  "_modules/kv/kv-split.html",
  "_modules/about/about-image.html",
  "_modules/about/about-typo.html",
  "_modules/gallery/gallery-grid.html",
  "_modules/gallery/gallery-slider.html",
  "_modules/service/service-grid.html",
  "_modules/service/service-story.html",
  "_modules/service/service-tab.html",
  "_modules/team/team-card.html",
  "_modules/team/team-slider.html",
  "_modules/trust/trust-bar.html",
  "_modules/trust/trust-dark.html",
];

fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  defaultViewport: { width: 1920, height: 1080 },
});

try {
  const page = await browser.newPage();

  for (const rel of modules) {
    const filePath = path.join(root, rel);
    const name = path.basename(rel, ".html");
    const outPath = path.join(outDir, `${name}.png`);
    const url = pathToFileURL(filePath).href;

    console.log(`Capturing ${rel}...`);

    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

    await page.evaluate(() => {
      document.querySelectorAll(".fade-in").forEach((el) => {
        el.classList.add("visible");
      });
    });

    await new Promise((r) => setTimeout(r, 500));

    await page.screenshot({
      path: outPath,
      fullPage: true,
      type: "png",
    });

    console.log(`  -> ${path.relative(root, outPath)}`);
  }
} finally {
  await browser.close();
}

console.log(`Done. ${modules.length} screenshots in ${path.relative(root, outDir)}`);
