/**
 * _dev-images 폴더 스캔 → manifest.js 생성
 * 사용: node _dev-images/sync-manifest.js
 */
var fs = require("fs");
var path = require("path");

var ROOT = __dirname;
var IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;
var OUT_FILE = path.join(ROOT, "manifest.js");

function listImages(folderName) {
  var dir = path.join(ROOT, folderName);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter(function (name) {
      return IMAGE_EXT.test(name) && name !== ".gitkeep";
    })
    .sort(function (a, b) {
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
    });
}

var manifest = {
  landscape: listImages("landscape"),
  portrait: listImages("portrait"),
  generatedAt: new Date().toISOString(),
};

fs.writeFileSync(
  OUT_FILE,
  "window.DEV_IMAGES_MANIFEST = " + JSON.stringify(manifest, null, 2) + ";\n",
  "utf8"
);

console.log("[dev-images] manifest.js updated");
console.log("  landscape:", manifest.landscape.length, "files");
console.log("  portrait:", manifest.portrait.length, "files");
