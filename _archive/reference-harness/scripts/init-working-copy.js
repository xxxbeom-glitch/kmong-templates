/**
 * Create working-copy from 01-original (original untouched)
 *   node scripts/init-working-copy.js ptmd868445
 *
 * Path: cases/{id}/04-working-copy/
 * _mirror is junction/symlink → 01-original/_mirror (disk save; do not delete mirror files)
 */
const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

const caseId = (process.argv[2] || '').toLowerCase();
if (!caseId) {
  console.error('Usage: node scripts/init-working-copy.js {caseId}');
  process.exit(1);
}

const CASE = path.join(__dirname, '..', 'cases', caseId);
const ORIG = path.join(CASE, '01-original');
const WORK = path.join(CASE, '04-working-copy');

if (!fs.existsSync(path.join(ORIG, 'index.html'))) {
  console.error('Missing 01-original/index.html for', caseId);
  process.exit(1);
}

if (fs.existsSync(WORK)) {
  console.log('already exists:', WORK);
  process.exit(0);
}

fs.mkdirSync(WORK, { recursive: true });

// Copy flat files first
for (const name of fs.readdirSync(ORIG)) {
  if (name === '_mirror') continue;
  const src = path.join(ORIG, name);
  const dest = path.join(WORK, name);
  const st = fs.statSync(src);
  if (st.isFile()) {
    fs.copyFileSync(src, dest);
  } else if (st.isDirectory()) {
    // rare non-mirror dirs
    execSync(`robocopy "${src}" "${dest}" /E /NFL /NDL /NJH /NJS /nc /ns /np`, {
      stdio: 'ignore',
      shell: true,
    });
  }
}

const origMirror = path.join(ORIG, '_mirror');
const workMirror = path.join(WORK, '_mirror');
if (fs.existsSync(origMirror)) {
  if (process.platform === 'win32') {
    const r = spawnSync('cmd', ['/c', 'mklink', '/J', workMirror, origMirror], {
      encoding: 'utf8',
    });
    if (r.status !== 0) {
      console.warn('junction failed, full robocopy _mirror…', r.stderr || r.stdout);
      execSync(`robocopy "${origMirror}" "${workMirror}" /E /NFL /NDL /NJH /NJS /nc /ns /np`, {
        stdio: 'ignore',
        shell: true,
      });
    } else {
      console.log('_mirror → junction to 01-original/_mirror (공유·삭제 주의)');
    }
  } else {
    fs.symlinkSync(origMirror, workMirror, 'dir');
  }
}

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(WORK, 'README.md'),
  `# 04-working-copy — ${caseId}

**원본 \`01-original\` 수정 금지.** 이 폴더만 편집합니다.

- entry: \`index.html\`
- assets: \`_mirror\` (원본과 junction/공유일 수 있음 — 미러 파일 삭제 금지)
- 미리보기: 허브의 **「수정」** 링크 또는 \`preview-original.js ${caseId} --working\`

## 변경 기록

\`change-request.md\` 참고.
`,
  'utf8'
);

fs.writeFileSync(
  path.join(WORK, 'change-request.md'),
  `# change-request — ${caseId}

| | |
|--|--|
| created | ${today} |
| source | 01-original copy |
| status | ready |

## 요청 범위

_(사용자 지시 기입)_

## 변경 로그

| 일시 | 내용 |
|------|------|
| ${today} | working-copy 초기화 (원본 복사) |
`,
  'utf8'
);

// manifest
const manPath = path.join(CASE, 'manifest.json');
if (fs.existsSync(manPath)) {
  const m = JSON.parse(fs.readFileSync(manPath, 'utf8'));
  m.stages = m.stages || {};
  m.stages.workingCopy = {
    status: 'working',
    updatedAt: today,
    note: '04-working-copy · original immutable',
  };
  m.updatedAt = today;
  fs.writeFileSync(manPath, JSON.stringify(m, null, 2));
}

console.log(JSON.stringify({ caseId, work: WORK }, null, 2));
