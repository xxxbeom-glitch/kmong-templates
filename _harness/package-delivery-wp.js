/**
 * wordpress/{slug}/ → _delivery-wp/{slug}/ + ZIP
 * 사용: node _harness/package-delivery-wp.js {slug}
 */
var fs = require("fs");
var path = require("path");
var childProcess = require("child_process");
var verifyWordPress = require("./verify-wordpress-static.js");

var slug = process.argv[2];

if (!slug) {
  console.error("Usage: node _harness/package-delivery-wp.js {slug}");
  process.exit(1);
}

var root = path.resolve(__dirname, "..");
var srcDir = path.join(root, "wordpress", slug);
var destDir = path.join(root, "_delivery-wp", slug);
var zipPath = path.join(root, "_delivery-wp", slug + ".zip");

var EXCLUDE_NAMES = {
  ".gitkeep": true,
  ".DS_Store": true,
  "config.local.php": true,
  "wp-config.local.php": true,
  "node_modules": true,
};

console.log("[delivery-wp] pre-check: static verify for " + slug);

var verifyResult = verifyWordPress.runVerify(slug, { writeLog: true });

if (!verifyResult.ok) {
  console.error("[delivery-wp] packaging stopped — static verify FAIL");
  process.exit(1);
}

console.log("[delivery-wp] static verify PASS — packaging " + slug);

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
    if (EXCLUDE_NAMES[entry.name]) {
      return;
    }

    var srcPath = path.join(src, entry.name);
    var destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  });
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

function createZip(sourceDir, destinationZip) {
  if (fs.existsSync(destinationZip)) {
    fs.unlinkSync(destinationZip);
  }

  // Cafe24(Linux) WP는 entry 경로에 `\`가 있으면 style.css를 못 찾는 경우가 많음.
  // Windows tar -a 는 forward-slash ZIP을 만듦 (Compress-Archive 대체).
  var parentDir = path.dirname(sourceDir);
  var folderName = path.basename(sourceDir);

  try {
    childProcess.execSync('tar -a -cf "' + destinationZip + '" "' + folderName + '"', {
      cwd: parentDir,
      stdio: "inherit",
    });
    return;
  } catch (tarError) {
    console.warn("[delivery-wp] tar zip failed, trying zip command…");
  }

  try {
    childProcess.execSync('zip -r "' + destinationZip + '" "' + folderName + '"', {
      cwd: parentDir,
      stdio: "inherit",
    });
  } catch (error) {
    console.warn("[delivery-wp] ZIP skipped — create manually from: " + destDir);
  }
}

removeDir(destDir);
ensureDir(path.join(root, "_delivery-wp"));
copyDir(srcDir, destDir);

console.log("[delivery-wp] copied → _delivery-wp/" + slug + "/");

createZip(destDir, zipPath);

if (fs.existsSync(zipPath)) {
  console.log("[delivery-wp] zip → _delivery-wp/" + slug + ".zip");
}

console.log("[delivery-wp] upload to: wp-content/themes/" + slug + "/");
console.log("[delivery-wp] excluded: .gitkeep, config.local.php, wp-config.local.php, node_modules");
