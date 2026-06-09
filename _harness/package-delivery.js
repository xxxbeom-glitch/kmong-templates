/**
 * templates/{slug}/ → _delivery/{slug}/ 패키징
 * 사용: node _harness/package-delivery.js mainstream
 */
var fs = require("fs");
var path = require("path");

var slug = process.argv[2];

if (!slug) {
  console.error("Usage: node _harness/package-delivery.js {slug}");
  process.exit(1);
}

var root = path.resolve(__dirname, "..");
var srcDir = path.join(root, "templates", slug);
var destDir = path.join(root, "_delivery", slug);

if (!fs.existsSync(srcDir)) {
  console.error("[delivery] source not found: " + srcDir);
  process.exit(1);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  ensureDir(dest);
  fs.readdirSync(src, { withFileTypes: true }).forEach(function (entry) {
    var srcPath = path.join(src, entry.name);
    var destPath = path.join(dest, entry.name);

    if (entry.name === ".gitkeep") {
      return;
    }

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  });
}

function stripPreviewCss(css) {
  var marker = "/* Dev · GNB 검수 전용";
  var idx = css.indexOf(marker);

  if (idx === -1) {
    return css;
  }

  return css.slice(0, idx).replace(/\s+$/, "") + "\n";
}

function stripPreviewJs(js) {
  js = js.replace(/^\(function \(\) \{\r?\n[\s\S]*?\r?\n\}\)\(\);\r?\n\r?\n/, "");

  js = js.replace(
    /\$\(function \(\) \{\r?\n  \$\("html"\)\.addClass\("js"\);\r?\n\r?\n  var isGnbPreview[\s\S]*?  initMobileNav\(\);\r?\n\r?\n  if \(isSectionPreview\) \{\r?\n    return;\r?\n  \}\r?\n\r?\n/,
    '$(function () {\n  $("html").addClass("js");\n\n  initScrollReveal();\n  initHeroProgressSlider();\n  initWorksGallery();\n  initStatsCounter();\n  initNewsSlider();\n  initMobileNav();\n\n'
  );

  if (!js.trim()) {
    throw new Error("stripPreviewJs produced empty output");
  }

  return js;
}

function removeDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (entry) {
    var full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      removeDir(full);
    } else {
      fs.unlinkSync(full);
    }
  });

  fs.rmdirSync(dir);
}

console.log("[delivery] packaging " + slug);
removeDir(destDir);
ensureDir(destDir);

copyFile(path.join(srcDir, "index.html"), path.join(destDir, "index.html"));

var cssSrc = fs.readFileSync(path.join(srcDir, "css", "style.css"), "utf8");
fs.mkdirSync(path.join(destDir, "css"), { recursive: true });
fs.writeFileSync(path.join(destDir, "css", "style.css"), stripPreviewCss(cssSrc), "utf8");

var jsSrc = fs.readFileSync(path.join(srcDir, "js", "main.js"), "utf8");
fs.mkdirSync(path.join(destDir, "js"), { recursive: true });
fs.writeFileSync(path.join(destDir, "js", "main.js"), stripPreviewJs(jsSrc), "utf8");

copyDir(path.join(srcDir, "assets"), path.join(destDir, "assets"));

console.log("[delivery] done → _delivery/" + slug + "/");
console.log("[delivery] excluded: preview.html, _dev-images, dev-images.js, placeholders.js, sync-dev-to-assets.js");
