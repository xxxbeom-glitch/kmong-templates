/**
 * wordpress/{slug}/ → _delivery-wp/{slug}/ + ZIP
 * 사용: node _harness/package-delivery-wp.js {slug}
 */
var fs = require("fs");
var path = require("path");
var childProcess = require("child_process");

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

if (!fs.existsSync(srcDir)) {
  console.error("[delivery-wp] source not found: " + srcDir);
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

  if (process.platform === "win32") {
    var psSource = sourceDir.replace(/'/g, "''");
    var psDest = destinationZip.replace(/'/g, "''");
    var command =
      "powershell -NoProfile -Command \"Compress-Archive -LiteralPath '" +
      psSource +
      "' -DestinationPath '" +
      psDest +
      "' -Force\"";

    childProcess.execSync(command, { stdio: "inherit" });
    return;
  }

  try {
    childProcess.execSync(
      'zip -r "' + destinationZip + '" "' + path.basename(sourceDir) + '"',
      { cwd: path.dirname(sourceDir), stdio: "inherit" }
    );
  } catch (error) {
    console.warn("[delivery-wp] ZIP skipped — create manually from: " + destDir);
  }
}

console.log("[delivery-wp] packaging " + slug);

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
