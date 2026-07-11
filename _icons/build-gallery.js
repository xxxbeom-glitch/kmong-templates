/**
 * Build local icon library gallery → _icons/index.html
 * Usage: node _icons/build-gallery.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'index.html');

function listFiles(dir, ext) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => f.toLowerCase().endsWith(ext))
    .sort((a, b) => a.localeCompare(b));
}

function isFillName(name) {
  return /(^|-)fill(-|$|\.)/i.test(name) || name.includes('-fill.');
}

const LABELS = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'labels.ko.json'), 'utf8')
);

/** home-fill-2 → { key: home, fill: true, variant: 2 } */
function parseBase(base) {
  let rest = base;
  let fill = false;
  let variant = null;
  const fillVar = rest.match(/-fill-(\d+)$/);
  if (fillVar) {
    fill = true;
    variant = fillVar[1];
    rest = rest.slice(0, -fillVar[0].length);
  } else if (rest.endsWith('-fill')) {
    fill = true;
    rest = rest.slice(0, -5);
  } else {
    const v = rest.match(/-(\d+)$/);
    if (v) {
      variant = v[1];
      rest = rest.slice(0, -v[0].length);
    }
  }
  return { key: rest, fill, variant };
}

function labelKo(base) {
  const { key, fill, variant } = parseBase(base);
  let name = LABELS[key] || LABELS[base] || key;
  const bits = [];
  if (fill) bits.push('채움');
  if (variant) bits.push(variant);
  if (bits.length) name = `${name} (${bits.join(' · ')})`;
  return name;
}

function guessUiGroup(base) {
  const rules = [
    ['arrow', /^(arrow|chevron|caret|expand|minimize|swap|undo|redo|refresh|navigation)/],
    ['media', /^(play|pause|video|mic|volume|camera|reels|audio|radio)/],
    ['user', /^(user|man|woman|contact|fingerprint|users)/],
    ['comm', /^(mail|message|phone|send|chat|inbox|bell|share|copy)/],
    ['place', /^(map|location|pin|globe|building|hospital|store|parking|subway|bus|car|ship|truck)/],
    ['action', /^(search|home|settings|menu|close|plus|minus|check|trash|edit|pen|filter|sort|download|upload|save|lock|unlock)/],
    ['status', /^(info|help|error|danger|warning|ban|shield|success)/],
    ['commerce', /^(shop|cart|bag|basket|wallet|ticket|receipt|bitcoin|bank|credit|percent)/],
    ['medical', /^(stethoscope|syringe|pills|tooth|heart-pulse|wheelchair|hospital)/],
    ['amenity', /^(wifi|shower|toilet|coffee|cup|plug|sofa|dumbbell|treadmill|bike|lamp|hanger|fridge|bath|laundry|sanitizer|snowflake|clock-24)/],
    ['weather', /^(sun|moon|cloud|snow|rain|thunder|umbrella|flash)/],
    ['data', /^(chart|gauge|speedometer|stock|calculate|server|cpu|code|database)/],
    ['brand-ui', /^(sparkles|gem|crown|medal|trophy|flag|fire|lightbulb|target|rocket)/],
  ];
  for (const [id, re] of rules) {
    if (re.test(base)) return id;
  }
  return 'other';
}

const uiFiles = listFiles('ui', '.svg');
const socialFiles = listFiles('social', '.svg');
const motionFiles = listFiles('motion', '.json');

const motionData = {};
for (const f of motionFiles) {
  const raw = fs.readFileSync(path.join(ROOT, 'motion', f), 'utf8');
  try {
    motionData[f] = JSON.parse(raw);
  } catch {
    console.warn('skip invalid json', f);
  }
}

const uiItems = uiFiles.map((f) => {
  const base = f.replace(/\.svg$/i, '');
  return {
    file: f,
    base,
    ko: labelKo(base),
    path: `ui/${f}`,
    type: isFillName(f) ? 'fill' : 'line',
    group: guessUiGroup(base.replace(/-fill(-\d+)?$/, '').replace(/-\d+$/, '')),
  };
});

const socialItems = socialFiles.map((f) => {
  const base = f.replace(/\.svg$/i, '');
  return {
    file: f,
    base,
    ko: labelKo(base),
    path: `social/${f}`,
    type: isFillName(f) ? 'fill' : 'line',
  };
});

const counts = {
  ui: uiItems.length,
  social: socialItems.length,
  motion: motionFiles.length,
  fill: uiItems.filter((i) => i.type === 'fill').length + socialItems.filter((i) => i.type === 'fill').length,
  line: uiItems.filter((i) => i.type === 'line').length + socialItems.filter((i) => i.type === 'line').length,
  total: uiItems.length + socialItems.length + motionFiles.length,
};

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Icons Library — _icons</title>
<style>
  :root {
    --bg: #f6f5f2;
    --panel: #ffffff;
    --ink: #1a1a1a;
    --muted: #6b6b6b;
    --line: #e6e4df;
    --accent: #1f4b3a;
    --accent-soft: #e8f0ec;
    --chip: #efece6;
    --danger: #9b2c2c;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
    background: var(--bg);
    color: var(--ink);
    line-height: 1.4;
  }
  header {
    position: sticky;
    top: 0;
    z-index: 20;
    background: rgba(246,245,242,.92);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
    padding: 1rem 1.25rem 0.85rem;
  }
  .header-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    margin: 0 auto;
  }
  h1 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .meta { color: var(--muted); font-size: 0.85rem; }
  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
    max-width: 1400px;
    margin: 0.85rem auto 0;
  }
  input[type="search"] {
    flex: 1 1 220px;
    min-width: 180px;
    border: 1px solid var(--line);
    background: var(--panel);
    border-radius: 10px;
    padding: 0.65rem 0.85rem;
    font: inherit;
  }
  input[type="search"]:focus {
    outline: 2px solid var(--accent);
    outline-offset: 1px;
  }
  .chips { display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: center; }
  .chip {
    border: 1px solid var(--line);
    background: var(--chip);
    color: var(--ink);
    border-radius: 999px;
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
    cursor: pointer;
  }
  .chip.is-active {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
  }
  .style-toggle {
    display: inline-flex;
    border: 1px solid var(--line);
    border-radius: 999px;
    overflow: hidden;
    background: var(--panel);
  }
  .style-toggle button {
    border: 0;
    background: transparent;
    padding: 0.4rem 0.9rem;
    font: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    color: var(--muted);
  }
  .style-toggle button.is-active {
    background: var(--accent);
    color: #fff;
  }
  .ctrl-label {
    font-size: 0.75rem;
    color: var(--muted);
    margin-right: 0.15rem;
  }
  main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.25rem;
  }
  section { margin-bottom: 2rem; }
  section.hidden { display: none; }
  .sec-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }
  .sec-head h2 {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
    gap: 0.65rem;
  }
  .card {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 0.75rem 0.5rem 0.55rem;
    text-align: center;
    cursor: pointer;
    transition: border-color .15s, transform .15s;
  }
  .card:hover {
    border-color: var(--accent);
    transform: translateY(-1px);
  }
  .card.hidden { display: none; }
  .preview {
    height: 48px;
    display: grid;
    place-items: center;
    margin-bottom: 0.45rem;
  }
  .preview img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }
  .preview .lottie {
    width: 44px;
    height: 44px;
  }
  .name-ko {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--ink);
    word-break: keep-all;
    line-height: 1.25;
    margin-bottom: 0.15rem;
  }
  .name {
    font-size: 0.62rem;
    color: var(--muted);
    word-break: break-all;
    line-height: 1.25;
  }
  .badge {
    display: inline-block;
    margin-top: 0.3rem;
    font-size: 0.62rem;
    padding: 0.12rem 0.35rem;
    border-radius: 999px;
    background: var(--accent-soft);
    color: var(--accent);
  }
  .badge.fill { background: #f3ebe2; color: #7a4e2d; }
  .badge.motion { background: #e8eaf6; color: #3949ab; }
  .toast {
    position: fixed;
    left: 50%;
    bottom: 1.25rem;
    transform: translateX(-50%) translateY(120%);
    background: var(--ink);
    color: #fff;
    padding: 0.65rem 1rem;
    border-radius: 999px;
    font-size: 0.85rem;
    opacity: 0;
    transition: .2s ease;
    z-index: 50;
    pointer-events: none;
  }
  .toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  .note {
    color: var(--muted);
    font-size: 0.82rem;
    margin: 0 0 1rem;
  }
  .empty {
    display: none;
    color: var(--muted);
    padding: 2rem;
    text-align: center;
  }
  .empty.show { display: block; }
</style>
</head>
<body>
  <header>
    <div class="header-row">
      <div>
        <h1>Icons Library</h1>
        <div class="meta">로컬 전용 · 클릭 시 경로 복사 · 총 ${counts.total}개 (ui ${counts.ui} · social ${counts.social} · motion ${counts.motion})</div>
      </div>
      <div class="meta">생성: ${new Date().toISOString().slice(0, 10)} · <code>node _icons/build-gallery.js</code></div>
    </div>
    <div class="controls">
      <input type="search" id="q" placeholder="한글·영문 검색 (예: 홈, 커피, home, fill…)" autocomplete="off" />
      <div class="chips" id="cat-chips">
        <button type="button" class="chip is-active" data-cat="all">전체</button>
        <button type="button" class="chip" data-cat="ui">UI</button>
        <button type="button" class="chip" data-cat="social">Social</button>
        <button type="button" class="chip" data-cat="motion">Motion</button>
      </div>
      <span class="ctrl-label">스타일</span>
      <div class="style-toggle" id="style-toggle" role="group" aria-label="라인형 또는 채움">
        <button type="button" class="is-active" data-style="line">라인형</button>
        <button type="button" data-style="fill">채움</button>
      </div>
    </div>
  </header>

  <main>
    <p class="note">SVG는 상대경로로 표시됩니다. 아이콘이 안 보이면 <code>_icons</code> 폴더에서 HTML을 열거나 <code>npx live-server _icons</code>로 여세요. Motion은 Lottie 미리보기입니다.</p>
    <div class="empty" id="empty">검색 결과가 없습니다.</div>

    <section data-section="social" id="sec-social">
      <div class="sec-head"><h2>Social</h2><span class="meta">${socialItems.length}</span></div>
      <div class="grid" id="grid-social"></div>
    </section>

    <section data-section="motion" id="sec-motion">
      <div class="sec-head"><h2>Motion (Lottie)</h2><span class="meta">${motionFiles.length}</span></div>
      <div class="grid" id="grid-motion"></div>
    </section>

    <section data-section="ui" id="sec-ui">
      <div class="sec-head"><h2>UI</h2><span class="meta">${uiItems.length}</span></div>
      <div class="grid" id="grid-ui"></div>
    </section>
  </main>

  <div class="toast" id="toast">복사됨</div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script>
  <script>
    const DATA = ${JSON.stringify({
      ui: uiItems,
      social: socialItems,
      motion: motionFiles.map((f) => {
        const base = f.replace(/\.json$/i, '');
        return {
          file: f,
          base,
          ko: labelKo(base) + ' (모션)',
          path: 'motion/' + f,
          type: 'motion',
        };
      }),
      lottie: motionData,
    })};

    const toastEl = document.getElementById('toast');
    const emptyEl = document.getElementById('empty');
    let cat = 'all';
    let style = 'line';
    let q = '';

    function showToast(msg) {
      toastEl.textContent = msg;
      toastEl.classList.add('show');
      clearTimeout(showToast._t);
      showToast._t = setTimeout(() => toastEl.classList.remove('show'), 1400);
    }

    async function copyText(text) {
      try {
        await navigator.clipboard.writeText(text);
        showToast('복사: ' + text);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
        showToast('복사: ' + text);
      }
    }

    function makeSvgCard(item, catName) {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'card';
      el.dataset.cat = catName;
      el.dataset.type = item.type;
      el.dataset.name = item.base;
      el.dataset.ko = item.ko || '';
      el.dataset.path = item.path;
      el.dataset.group = item.group || '';
      el.title = (item.ko || item.base) + ' · ' + item.path + ' (클릭: 경로 복사)';
      el.innerHTML = \`
        <div class="preview"><img src="\${item.path}" alt="" loading="lazy" /></div>
        <div class="name-ko">\${item.ko || item.base}</div>
        <div class="name">\${item.base}</div>
        <span class="badge \${item.type}">\${item.type}</span>
      \`;
      el.addEventListener('click', () => copyText(item.path));
      return el;
    }

    function makeMotionCard(item) {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'card';
      el.dataset.cat = 'motion';
      el.dataset.type = 'motion';
      el.dataset.name = item.base;
      el.dataset.ko = item.ko || '';
      el.dataset.path = item.path;
      el.title = (item.ko || item.base) + ' · ' + item.path + ' (클릭: 경로 복사)';
      const box = document.createElement('div');
      box.className = 'preview';
      const host = document.createElement('div');
      host.className = 'lottie';
      box.appendChild(host);
      el.appendChild(box);
      const ko = document.createElement('div');
      ko.className = 'name-ko';
      ko.textContent = item.ko || item.base;
      el.appendChild(ko);
      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = item.base;
      el.appendChild(name);
      const badge = document.createElement('span');
      badge.className = 'badge motion';
      badge.textContent = 'motion';
      el.appendChild(badge);
      el.addEventListener('click', () => copyText(item.path));

      const animData = DATA.lottie[item.file];
      if (window.lottie && animData) {
        try {
          window.lottie.loadAnimation({
            container: host,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animData,
          });
        } catch (e) {
          host.textContent = '▶';
        }
      } else {
        host.textContent = '▶';
      }
      return el;
    }

    function render() {
      const gSocial = document.getElementById('grid-social');
      const gMotion = document.getElementById('grid-motion');
      const gUi = document.getElementById('grid-ui');
      gSocial.innerHTML = '';
      gMotion.innerHTML = '';
      gUi.innerHTML = '';

      DATA.social.forEach((i) => gSocial.appendChild(makeSvgCard(i, 'social')));
      DATA.motion.forEach((i) => gMotion.appendChild(makeMotionCard(i)));
      DATA.ui.forEach((i) => gUi.appendChild(makeSvgCard(i, 'ui')));
      applyFilter();
    }

    function matchCard(card) {
      const name = card.dataset.name || '';
      const ko = card.dataset.ko || '';
      const type = card.dataset.type || '';
      const c = card.dataset.cat || '';
      const path = card.dataset.path || '';
      if (q) {
        const qq = q.toLowerCase();
        if (
          !name.includes(qq) &&
          !ko.toLowerCase().includes(qq) &&
          !path.toLowerCase().includes(qq) &&
          !type.includes(qq)
        ) return false;
      }
      // motion은 스타일 토글과 무관하게 카테고리만 맞춤
      if (type !== 'motion' && type !== style) return false;
      if (cat === 'all') return true;
      return c === cat;
    }

    function applyFilter() {
      let visible = 0;
      document.querySelectorAll('.card').forEach((card) => {
        const ok = matchCard(card);
        card.classList.toggle('hidden', !ok);
        if (ok) visible++;
      });
      document.querySelectorAll('section[data-section]').forEach((sec) => {
        const any = sec.querySelectorAll('.card:not(.hidden)').length > 0;
        const showSec = cat === 'all' || sec.dataset.section === cat;
        sec.classList.toggle('hidden', !showSec || !any);
      });
      emptyEl.classList.toggle('show', visible === 0);
    }

    document.getElementById('q').addEventListener('input', (e) => {
      q = e.target.value.trim().toLowerCase();
      applyFilter();
    });

    document.getElementById('cat-chips').addEventListener('click', (e) => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      cat = btn.dataset.cat;
      document.querySelectorAll('#cat-chips .chip').forEach((c) => c.classList.toggle('is-active', c === btn));
      applyFilter();
    });

    document.getElementById('style-toggle').addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-style]');
      if (!btn) return;
      style = btn.dataset.style;
      document.querySelectorAll('#style-toggle button').forEach((b) => b.classList.toggle('is-active', b === btn));
      applyFilter();
    });

    render();
  </script>
</body>
</html>
`;

fs.writeFileSync(OUT, html, 'utf8');
console.log(
  `[icons gallery] wrote ${path.relative(process.cwd(), OUT)} — ui ${counts.ui}, social ${counts.social}, motion ${counts.motion}`
);
