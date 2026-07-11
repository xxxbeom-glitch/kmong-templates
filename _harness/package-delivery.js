/**
 * [동결·미사용] 정적 templates/{slug}/ → 구 _delivery/{slug}/ 패키징
 * 정적 트랙은 _archive/templates · 구 납품은 _archive/delivery
 * WP 납품: node _harness/package-delivery-wp.js {slug}
 * 사용(레거시): node _harness/package-delivery.js {slug}
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

    if (entry.name === ".gitkeep" || entry.name === "config.local.php" || entry.name === "config.php") {
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

var preservedConfig = null;
var preservedConfigPath = path.join(destDir, "admin", "config.php");

if (fs.existsSync(preservedConfigPath)) {
  preservedConfig = fs.readFileSync(preservedConfigPath, "utf8");
  console.log("[delivery] preserved admin/config.php");
}

removeDir(destDir);
ensureDir(destDir);

copyFile(path.join(srcDir, "index.html"), path.join(destDir, "index.html"));

if (fs.existsSync(path.join(srcDir, "start.html"))) {
  copyFile(path.join(srcDir, "start.html"), path.join(destDir, "start.html"));
}

var cssSrc = fs.readFileSync(path.join(srcDir, "css", "style.css"), "utf8");
fs.mkdirSync(path.join(destDir, "css"), { recursive: true });
fs.writeFileSync(path.join(destDir, "css", "style.css"), stripPreviewCss(cssSrc), "utf8");

var jsSrc = fs.readFileSync(path.join(srcDir, "js", "main.js"), "utf8");
fs.mkdirSync(path.join(destDir, "js"), { recursive: true });
fs.writeFileSync(path.join(destDir, "js", "main.js"), stripPreviewJs(jsSrc), "utf8");

copyDir(path.join(srcDir, "assets"), path.join(destDir, "assets"));
ensureDir(path.join(destDir, "assets", "images", "uploads"));

if (fs.existsSync(path.join(srcDir, "admin"))) {
  copyDir(path.join(srcDir, "admin"), path.join(destDir, "admin"));

  var deliveryConfig = path.join(destDir, "admin", "config.php");
  var deliverySample = path.join(destDir, "admin", "config.sample.php");
  var deliveryLocal = path.join(destDir, "admin", "config.local.php");

  if (fs.existsSync(deliveryLocal)) {
    fs.unlinkSync(deliveryLocal);
  }

  if (preservedConfig) {
    fs.writeFileSync(deliveryConfig, preservedConfig, "utf8");
  } else if (!fs.existsSync(deliveryConfig) && fs.existsSync(deliverySample)) {
    copyFile(deliverySample, deliveryConfig);
    console.log("[delivery] created admin/config.php from config.sample.php");
  }
}

if (fs.existsSync(path.join(srcDir, "api"))) {
  copyDir(path.join(srcDir, "api"), path.join(destDir, "api"));
}

copyFile(path.join(srcDir, "js", "cms-content.js"), path.join(destDir, "js", "cms-content.js"));

var sharedAdminCore = path.join(root, "templates", "_admin-core");
var bundledAdminCore = path.join(destDir, "_admin-core");

if (fs.existsSync(sharedAdminCore)) {
  copyDir(sharedAdminCore, bundledAdminCore);
}

syncDeliveryIndex(root);

console.log("[delivery] done → _delivery/" + slug + "/");
console.log("[delivery] included: admin/, api/, _admin-core/, cms-content.js");
console.log("[delivery] excluded: preview.html, _dev-images, dev-images.js, placeholders.js, sync-dev-to-assets.js");

function syncDeliveryIndex(projectRoot) {
  var hubSrc = path.join(projectRoot, "templates", "index.html");
  var hubDest = path.join(projectRoot, "_delivery", "index.html");

  if (!fs.existsSync(hubSrc)) {
    console.warn("[delivery] templates/index.html not found — skip hub sync");
    return;
  }

  copyFile(hubSrc, hubDest);
  console.log("[delivery] hub synced → _delivery/index.html");
}
