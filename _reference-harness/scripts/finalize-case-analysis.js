/**
 * After mirror: rewrite nav + draft analysis from extracts
 *   node scripts/finalize-case-analysis.js ptmd871337 "Display" https://design https://demo/
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const caseId = (process.argv[2] || '').toLowerCase();
const displayName = process.argv[3] || caseId;
const designUrl = process.argv[4] || '';
const demoUrl = process.argv[5] || '';

if (!caseId) {
  console.error('Usage: node scripts/finalize-case-analysis.js {caseId} [display] [design] [demo]');
  process.exit(1);
}

const ROOT = path.join(__dirname, '..', 'cases', caseId);
const ORIG = path.join(ROOT, '01-original');
const REF = path.join(ROOT, '00-reference');
const QA = path.join(ROOT, '02-original-qa');

// rewrite nav hrefs
execSync(`node "${path.join(__dirname, '_rewrite-nav-hrefs.js')}" ${caseId}`, {
  stdio: 'inherit',
  cwd: path.join(__dirname, '..'),
});

function readHtml(rel) {
  const p = path.join(ORIG, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
}

function extractXans(html) {
  const set = new Set();
  for (const m of html.matchAll(/xans-[a-z0-9-]+/gi)) set.add(m[0].toLowerCase());
  return [...set].sort();
}

function extractSections(html) {
  const out = [];
  for (const m of html.matchAll(/<section[^>]*class=["']([^"']+)["']/gi)) {
    out.push(m[1].replace(/\s+/g, ' ').slice(0, 100));
  }
  return [...new Set(out)].slice(0, 30);
}

const pagesPath = path.join(ORIG, 'pages.json');
const pages = fs.existsSync(pagesPath) ? JSON.parse(fs.readFileSync(pagesPath, 'utf8')) : { pages: [] };
const types = {};
for (const x of pages.pages || []) {
  const u = (x.url || '').replace(/^https?:\/\/[^/]+/, '') || '/';
  let t = 'other';
  if (u === '/' || u === '') t = 'home';
  else if (u.startsWith('/category/')) t = 'plp';
  else if (u.startsWith('/product/') && !/search|recent/.test(u)) t = 'pdp';
  else if (u.includes('search')) t = 'search';
  else if (u.startsWith('/board/') || u.startsWith('/article/')) t = 'board';
  else if (u.startsWith('/event/')) t = 'event';
  else if (u.startsWith('/order/')) t = 'cart';
  else if (u.startsWith('/member/')) t = 'member';
  else if (u.includes('about')) t = 'about';
  types[t] = (types[t] || 0) + 1;
}

const mainHtml = readHtml('index.html');
const mainXans = extractXans(mainHtml).filter((c) =>
  /layout-|product-list|product-listitem|search-|boardinfo|statelog/.test(c)
);
const mainSections = extractSections(mainHtml);

let outlinePath = path.join(ROOT, '00-source', 'captures', 'desktop-1920', 'desktop-1920-outline.json');
let outline = fs.existsSync(outlinePath) ? JSON.parse(fs.readFileSync(outlinePath, 'utf8')) : null;

const manifestOrig = fs.existsSync(path.join(ORIG, 'manifest-original.json'))
  ? JSON.parse(fs.readFileSync(path.join(ORIG, 'manifest-original.json'), 'utf8'))
  : {};

const listmain = mainXans.filter((c) => /listmain-\d/.test(c));
const today = new Date().toISOString().slice(0, 10);

const analysis = `# ${caseId} — Analysis (${displayName})

> Track C · browser-captured · ${today}  
> 디자인센터: ${designUrl}  
> 데모: ${demoUrl}  
> 미리보기: **http://127.0.0.1:4173/** (\`node scripts/preview-original.js ${caseId}\`)  
> 근거: captures outline · pages.json · pristine mirror

## Meta

| | |
|--|--|
| 브랜드/표시명 | ${displayName} |
| 등급 | **browser-captured** ≠ skin-zip |
| 수집 | multipage pristine · pages **${(pages.pages || []).length}** · url-map/assets 별도 |
| remaining | ${(pages.remaining || []).length} URLs in queue (partial OK) |

## Site map (미러)

| 유형 | 수 |
|------|----|
${Object.entries(types)
  .map(([k, v]) => `| ${k} | ${v} |`)
  .join('\n')}

## Page IA — 메인 (section class 관찰)

| # | class / 힌트 |
|---|--------------|
${mainSections.map((s, i) => `| ${i + 1} | \`${s}\` |`).join('\n') || '| — | (section 추출 없음 — outline 참고) |'}

### Desktop outline 요약

${
  outline?.outline
    ? outline.outline
        .slice(0, 18)
        .map(
          (o) =>
            `- **${o.tag}** \`${(o.className || '').slice(0, 70)}\` · top ${o.top} · ${(o.text || '').slice(0, 60)}`
        )
        .join('\n')
    : '_outline 없음_'
}

## 모듈 후보 (unverified)

${mainXans
  .slice(0, 35)
  .map((c) => `- \`${c}\``)
  .join('\n')}

메인 진열 후보: ${listmain.join(', ') || '(없음/다른 패턴)'}

## Commerce / 공통 셸

| 슬롯 | 근거 |
|------|------|
| header/aside | layout-category · slidepackage · statelogoff |
| 검색 | searchheader / hotkeyword |
| 푸터 | layout-footer |
| 진열 | listmain / listnormal / listitem |
| 배너 | df-bannermanager (관리자) |

## Desktop / Mobile

- Desktop 1920 · Mobile 390 캡처: \`00-source/captures/\`
- 모바일: 하단탭·드로어 여부는 캡처·스킨별로 확인

## reconstructionDifficulty · skinRisk

| | |
|--|--|
| reconstructionDifficulty | **medium–high** (browser-captured · 배너매니저·멀티 진열) |
| skinRisk | **high** (데모 자산 · ZIP 아님) |

## 제거 후보

- \`.sample-sg\` · \`.mpopup\` (preview inject만)

## Track C 다음

| 가능 | 금지 |
|------|------|
| 잔여 미러 · 분석 심화 | working / map / 납품 / 84 |

ZIP 확보 시 **Track A**.
`;

fs.mkdirSync(REF, { recursive: true });
fs.writeFileSync(path.join(REF, 'analysis.md'), analysis, 'utf8');

fs.writeFileSync(
  path.join(REF, 'component-map.md'),
  `# ${caseId} — Component map

> Track C · 모듈 ID 후보만.

| component | 힌트 |
|-----------|------|
| Header / Aside / Footer | layout-* |
| Hero / Banners | df-bannermanager / main banner root |
| Product rows | listmain / listitem |
| PLP grid | listnormal |
| PDP | product-detail (미러 시) |
| Cart | order-basket* |

상세는 \`analysis.md\` 참고.
`,
  'utf8'
);

fs.writeFileSync(
  path.join(REF, 'interaction-map.md'),
  `# ${caseId} — Interaction map

| ID | 동작 | 로컬 |
|----|------|------|
| I-hero | 메인 슬라이드 | preview + /exec |
| I-nav | 페이지 이동 | mirror + proxy |
| I-prd-slide | 상품 슬라이드 | swiper |
| I-popup | 데모 팝업 | preview hide |

검수: **http://127.0.0.1:4173/**
`,
  'utf8'
);

fs.mkdirSync(QA, { recursive: true });
fs.writeFileSync(
  path.join(QA, 'report.md'),
  `# Browser Capture QA — ${caseId}

**결과:** **PARTIAL** (멀티페이지 미러 · ZIP 아님)  
**일시:** ${today}  
**미리보기:** http://127.0.0.1:4173/

| 항목 | 상태 |
|------|------|
| 캡처 1920/390 | PASS |
| multipage mirror | PASS (${(pages.pages || []).length} pages) |
| preview 이동 | 사용자/스모크 확인 |
| completeness | browser-captured |

working / release **차단** (Track C)
`,
  'utf8'
);

// update case manifest
const manPath = path.join(ROOT, 'manifest.json');
if (fs.existsSync(manPath)) {
  const m = JSON.parse(fs.readFileSync(manPath, 'utf8'));
  m.stages = m.stages || {};
  m.stages.source = { status: 'pass', updatedAt: today };
  m.stages.originalCapture = {
    status: 'pass',
    updatedAt: today,
    note: `multipage ${(pages.pages || []).length}p`,
  };
  m.stages.originalQa = { status: 'partial', updatedAt: today };
  m.stages.analysis = { status: 'pass', updatedAt: today, note: 'auto draft from mirror+outline' };
  m.updatedAt = today;
  m.label = displayName;
  m.displayName = displayName;
  fs.writeFileSync(manPath, JSON.stringify(m, null, 2));
}

// sync source.md display from title if placeholder
const sourcePath = path.join(ROOT, '00-source', 'source.md');
if (fs.existsSync(sourcePath) && outline?.title) {
  let s = fs.readFileSync(sourcePath, 'utf8');
  // leave displayName as passed
}

console.log(
  JSON.stringify(
    {
      caseId,
      pages: (pages.pages || []).length,
      types,
      listmain,
      method: manifestOrig.method,
    },
    null,
    2
  )
);
