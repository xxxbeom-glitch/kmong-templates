/**
 * dev-images.js + manifest → hero·카드 <img> 슬롯만 (_dev-images)
 * 섹션 장식 배경(news-bg 등)은 assets/images/ — 덮어쓰지 않음
 */
function shuffleCopy(list) {
  var arr = list.slice();
  var i;
  var j;
  var temp;

  for (i = arr.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  return arr;
}

function assignFiles(files, count, shuffle) {
  if (!files || !files.length || count <= 0) {
    return [];
  }

  var remaining = shuffle ? shuffleCopy(files) : files.slice();
  var assigned = [];
  var i;

  for (i = 0; i < count; i += 1) {
    if (!remaining.length) {
      remaining = shuffle ? shuffleCopy(files) : files.slice();
    }

    assigned.push(remaining.shift());
  }

  return assigned;
}

function buildDevImagePath(root, orient, filename) {
  return root + "/" + orient + "/" + filename;
}

function applyImageSlot(key, path) {
  var nodes = document.querySelectorAll('[data-placeholder="' + key + '"]');
  var i;

  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].setAttribute("src", path);
  }
}

function initPlaceholders() {
  var config = window.DEV_IMAGES;
  var manifest = window.DEV_IMAGES_MANIFEST || { landscape: [], portrait: [] };

  if (!config || !config.enabled || !config.root) {
    return;
  }

  var slots = config.slots || [];
  var shuffle = config.shuffle !== false;
  var landscapeSlots = [];
  var portraitSlots = [];
  var i;

  for (i = 0; i < slots.length; i += 1) {
    if (slots[i].orient === "portrait") {
      portraitSlots.push(slots[i]);
    } else {
      landscapeSlots.push(slots[i]);
    }
  }

  var landscapeFiles = assignFiles(manifest.landscape, landscapeSlots.length, shuffle);
  var portraitFiles = assignFiles(manifest.portrait, portraitSlots.length, shuffle);

  for (i = 0; i < landscapeSlots.length; i += 1) {
    if (!landscapeFiles[i]) {
      continue;
    }

    applyImageSlot(
      landscapeSlots[i].key,
      buildDevImagePath(config.root, "landscape", landscapeFiles[i])
    );
  }

  for (i = 0; i < portraitSlots.length; i += 1) {
    if (!portraitFiles[i]) {
      continue;
    }

    applyImageSlot(
      portraitSlots[i].key,
      buildDevImagePath(config.root, "portrait", portraitFiles[i])
    );
  }
}
