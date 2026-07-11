/**
 * _dev-images 현재 매핑 → assets/images/{slot-key}.{ext} 복사
 * 사용: node js/sync-dev-to-assets.js  (templates/mainstream 에서)
 */
var fs = require("fs");
var path = require("path");

var templateDir = path.resolve(__dirname, "..");
var devRoot = path.join(templateDir, "_dev-images");
var assetsDir = path.join(templateDir, "assets", "images");

var slots = [
  { key: "hero-bg-01", orient: "landscape" },
  { key: "hero-bg-02", orient: "landscape" },
  { key: "hero-bg-03", orient: "landscape" },
  { key: "stats-visual", orient: "landscape" },
  { key: "news-card-01", orient: "landscape" },
  { key: "news-card-02", orient: "landscape" },
  { key: "news-card-03", orient: "landscape" },
  { key: "story-card-01", orient: "portrait" },
  { key: "story-card-02", orient: "portrait" },
  { key: "story-card-03", orient: "portrait" },
  { key: "works-gallery-01", orient: "portrait" },
  { key: "works-gallery-02", orient: "portrait" },
  { key: "works-gallery-03", orient: "portrait" },
  { key: "works-gallery-04", orient: "portrait" },
];

function assignFiles(files, count) {
  var remaining = files.slice();
  var assigned = [];
  var i;

  for (i = 0; i < count; i += 1) {
    if (!remaining.length) {
      remaining = files.slice();
    }

    assigned.push(remaining.shift());
  }

  return assigned;
}

function loadManifest() {
  var manifestPath = path.join(devRoot, "manifest.js");
  var text = fs.readFileSync(manifestPath, "utf8");
  var json = text.replace(/^[\s\S]*?=\s*/, "").replace(/;\s*$/, "");

  return JSON.parse(json);
}

function copySlot(key, orient, filename) {
  var srcPath = path.join(devRoot, orient, filename);

  if (!fs.existsSync(srcPath)) {
    throw new Error("Missing source: " + srcPath);
  }

  var ext = path.extname(filename).toLowerCase();
  var destPath = path.join(assetsDir, key + ext);

  fs.copyFileSync(srcPath, destPath);

  [".png", ".jpg", ".jpeg", ".webp"].forEach(function (altExt) {
    if (altExt === ext) {
      return;
    }

    var orphan = path.join(assetsDir, key + altExt);

    if (fs.existsSync(orphan)) {
      fs.unlinkSync(orphan);
    }
  });

  return destPath;
}

var manifest = loadManifest();
var landscapeSlots = slots.filter(function (slot) {
  return slot.orient === "landscape";
});
var portraitSlots = slots.filter(function (slot) {
  return slot.orient === "portrait";
});
var landscapeFiles = assignFiles(manifest.landscape, landscapeSlots.length);
var portraitFiles = assignFiles(manifest.portrait, portraitSlots.length);
var copied = [];
var i;

for (i = 0; i < landscapeSlots.length; i += 1) {
  copied.push({
    key: landscapeSlots[i].key,
    from: "landscape/" + landscapeFiles[i],
    to: copySlot(landscapeSlots[i].key, "landscape", landscapeFiles[i]),
  });
}

for (i = 0; i < portraitSlots.length; i += 1) {
  copied.push({
    key: portraitSlots[i].key,
    from: "portrait/" + portraitFiles[i],
    to: copySlot(portraitSlots[i].key, "portrait", portraitFiles[i]),
  });
}

console.log("[sync-dev-to-assets] copied " + copied.length + " files:");
copied.forEach(function (item) {
  console.log("  " + item.key + " <- " + item.from);
});
