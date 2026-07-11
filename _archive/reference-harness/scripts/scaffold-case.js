/**
 * Scaffold Track C case folders + meta files
 *   node scripts/scaffold-case.js ptmd871337 PTMD871337 https://... https://ecudemo.../ "Display Name"
 */
const fs = require('fs');
const path = require('path');

const caseId = (process.argv[2] || '').toLowerCase();
const productCode = (process.argv[3] || '').toUpperCase();
const designUrl = process.argv[4];
const demoUrl = process.argv[5];
const displayName = process.argv[6] || productCode;

if (!caseId || !productCode || !designUrl || !demoUrl) {
  console.error(
    'Usage: node scripts/scaffold-case.js {caseId} {PRODUCT} {designUrl} {demoUrl} [displayName]'
  );
  process.exit(1);
}

const ROOT = path.join(__dirname, '..', 'cases', caseId);
const dirs = [
  '00-source/captures/desktop-1920',
  '00-source/captures/mobile-390',
  '00-reference/captures/desktop-1920',
  '00-reference/captures/mobile-390',
  '00-reference/assets',
  '01-original',
  '02-original-qa',
];
for (const d of dirs) fs.mkdirSync(path.join(ROOT, d), { recursive: true });

const today = new Date().toISOString().slice(0, 10);

fs.writeFileSync(
  path.join(ROOT, '00-source', 'license.md'),
  `# License — ${caseId}

| 필드 | 값 |
|------|-----|
| rightsType | \`demo-analysis\` |
| sourceUrl | ${designUrl} |
| demoMallUrl | ${demoUrl} |
| productCode | ${productCode} |
| collector | agent (kmong-templates reference-harness) |
| collectedAt | ${today} |
| allowedUse | 내부 디자인 패턴·IA·레이아웃 분석 |
| restrictions | 유료 스킨 원본 복제·재배포·상업 납품 금지 · 데모 자산 고객 납품 금지 |
| assetReplacementRequired | 제품 승격 시 **전체** 자산 교체 필요 (현재 승격 안 함) |

관련: \`_reference-harness/shared/rules/license.md\` · \`cafe24-original.md\`
`,
  'utf8'
);

fs.writeFileSync(
  path.join(ROOT, '00-reference', 'license.md'),
  fs.readFileSync(path.join(ROOT, '00-source', 'license.md'), 'utf8')
);

fs.writeFileSync(
  path.join(ROOT, '00-source', 'source.md'),
  `# ${caseId} — Source

| 항목 | 값 |
|------|-----|
| caseId | \`${caseId}\` |
| displayName | ${displayName} |
| designCenterUrl | ${designUrl} |
| demoMallUrl | ${demoUrl} |
| productCode | ${productCode} |
| collectedAt | ${today} |
| viewports | Desktop **1920** · Mobile **390** |
| track | **Track C** reference-harness |
| completeness | **browser-captured** (skin-zip 아님) |
| rightsType | demo-analysis |

## 수집 방법

- Playwright · 멀티페이지 pristine 미러 (\`mirror-original.js\`) + 캡처
- \`site-clone-fidelity.md\` 한 연속 작업

### 로컬에서 보기

**http://127.0.0.1:4173/**

\`\`\`bash
cd _reference-harness
node scripts/preview-original.js ${caseId}
# 재기동: node scripts/preview-original.js ${caseId} --force
\`\`\`

## Track C 경계

- working skin / upload / 납품 **하지 않음**
`,
  'utf8'
);

fs.writeFileSync(
  path.join(ROOT, 'README.md'),
  `# ${caseId} — ${displayName} (Track C)

공개 데모 분석 케이스. **납품·스킨 작업 원본 아님.**

| | |
|--|--|
| 디자인센터 | ${designUrl} |
| 데모몰 | ${demoUrl} |
| 등급 | browser-captured |
| 미리보기 | http://127.0.0.1:4173/ (\`preview-original.js ${caseId}\`) |
| 문서 | \`00-reference/analysis.md\` · component/interaction map · \`02-original-qa/\` |

ZIP 구매 후 Track A로만 제품 작업 가능.
`,
  'utf8'
);

fs.writeFileSync(
  path.join(ROOT, 'manifest.json'),
  JSON.stringify(
    {
      caseId,
      label: displayName,
      displayName,
      sourceUrl: designUrl,
      demoMallUrl: demoUrl,
      productCode,
      track: 'reference-harness',
      rightsType: 'demo-analysis',
      originalCompleteness: 'browser-captured',
      cafe24Grade: 'browser-captured',
      viewports: { desktop: 1920, mobile: 390 },
      stages: {
        source: { status: 'working', updatedAt: today },
        originalCapture: { status: 'working', updatedAt: today },
        originalQa: { status: 'not-started', updatedAt: '' },
        analysis: { status: 'not-started', updatedAt: '' },
        workingCopy: { status: 'skipped', note: 'Track C' },
        platformMap: { status: 'skipped', note: 'Track B only' },
        release: { status: 'skipped', note: 'Track C' },
      },
      createdAt: today,
      updatedAt: today,
    },
    null,
    2
  ),
  'utf8'
);

console.log(JSON.stringify({ caseId, root: ROOT }, null, 2));
