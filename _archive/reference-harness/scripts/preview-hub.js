/**
 * Preview hub — list all mirrored Track C cases + open each in a new window.
 *
 * Hub (고정):  http://127.0.0.1:4173/
 * Cases:       http://127.0.0.1:4201/ … (case별 고정 포트)
 *
 *   node scripts/preview-hub.js
 *   node scripts/preview-hub.js --force
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

const FORCE = process.argv.includes('--force') || process.env.PREVIEW_FORCE === '1';
const HUB_PORT = 4173;
const CASE_PORT_START = 4201;
/** working-copy previews — separate band so original ports stay stable */
const WORKING_PORT_START = 4301;
/** Figma 정적 템플릿 — templates/{slug} */
const STATIC_PORT_START = 4401;
const CASES_DIR = path.join(__dirname, '..', 'cases');
const HUB_DIR = path.join(__dirname, '..', 'hub');
const STATIC_MANIFEST = path.join(HUB_DIR, 'static-templates.json');

function listMirroredCases() {
  const out = [];
  if (!fs.existsSync(CASES_DIR)) return out;
  for (const id of fs.readdirSync(CASES_DIR).sort()) {
    const index = path.join(CASES_DIR, id, '01-original', 'index.html');
    if (!fs.existsSync(index)) continue;
    let man = {};
    try {
      man = JSON.parse(fs.readFileSync(path.join(CASES_DIR, id, 'manifest.json'), 'utf8'));
    } catch (_) {}
    const hasWorking = fs.existsSync(path.join(CASES_DIR, id, '04-working-copy', 'index.html'));
    out.push({
      caseId: id,
      label: man.displayName || man.label || id,
      productCode: man.productCode || '',
      demoMallUrl: man.demoMallUrl || '',
      designCenterUrl: man.sourceUrl || '',
      hasWorking,
    });
  }
  return out;
}

function killPort(port) {
  try {
    if (process.platform === 'win32') {
      const out = execSync(`netstat -ano | findstr ":${port}" | findstr LISTENING`, {
        encoding: 'utf8',
      });
      const pids = new Set();
      for (const line of out.split(/\r?\n/)) {
        const m = line.trim().match(/\s(\d+)\s*$/);
        if (m && m[1] !== '0') pids.add(m[1]);
      }
      for (const pid of pids) {
        try {
          execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
          console.log(`freed :${port} (PID ${pid})`);
        } catch (_) {}
      }
    } else {
      try {
        execSync(`lsof -ti tcp:${port} | xargs -r kill -9`, { stdio: 'ignore' });
      } catch (_) {}
    }
  } catch (_) {}
}

function probe(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 1200 }, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

function listStaticTemplates() {
  if (!fs.existsSync(STATIC_MANIFEST)) return [];
  try {
    const man = JSON.parse(fs.readFileSync(STATIC_MANIFEST, 'utf8'));
    const portStart = Number(man.portStart) || STATIC_PORT_START;
    const rows = Array.isArray(man.templates) ? man.templates : [];
    return rows
      .filter((t) => t && t.slug)
      .map((t, i) => {
        const index = path.join(__dirname, '..', '..', 'templates', t.slug, 'index.html');
        if (!fs.existsSync(index)) return null;
        return {
          slug: t.slug,
          label: t.label || t.slug,
          figmaNode: t.figmaNode || '',
          track: t.track || 'static',
          port: portStart + i,
        };
      })
      .filter(Boolean);
  } catch (_) {
    return [];
  }
}

function buildStaticTemplateRow(t) {
  const href = `http://127.0.0.1:${t.port}/`;
  const meta = [t.figmaNode ? `Figma ${t.figmaNode}` : '', t.slug].filter(Boolean).join(' · ');
  return `<li>
  <div class="title-row">
    <a href="${href}" target="_blank" rel="noopener noreferrer">${escapeHtml(t.label)}</a>
    <span class="badge badge-static">정적</span>
  </div>
  <span class="meta">${escapeHtml(meta)}</span>
  <span class="url">${href} · templates/${escapeHtml(t.slug)}/</span>
</li>`;
}

function buildHubHtml(cases, staticTemplates = []) {
  const items = cases
    .map((c) => {
      const href = `http://127.0.0.1:${c.port}/`;
      const meta = [c.productCode, c.caseId].filter(Boolean).join(' · ');
      const work =
        c.hasWorking && c.workingPort
          ? `<div class="links">
  <a class="chip chip-work" href="http://127.0.0.1:${c.workingPort}/" target="_blank" rel="noopener noreferrer">수정본 열기</a>
  <span class="url">http://127.0.0.1:${c.workingPort}/ · 04-working-copy</span>
</div>`
          : `<div class="links muted-row">수정본 없음</div>`;
      return `<li>
  <div class="title-row">
    <a href="${href}" target="_blank" rel="noopener noreferrer">${escapeHtml(c.label)}</a>
    <span class="badge">원본</span>
  </div>
  <span class="meta">${escapeHtml(meta)}</span>
  <span class="url">${href} · 01-original</span>
  ${work}
</li>`;
    })
    .join('\n');

  const staticBlock = staticTemplates.length
    ? `<h2 class="section-title">정적 템플릿 (Figma)</h2>
    <ul>
${staticTemplates.map(buildStaticTemplateRow).join('\n')}
    </ul>`
    : '';

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reference harness · 로컬 미리보기</title>
  <style>
    :root {
      --bg: #f6f4f1;
      --card: #fff;
      --text: #1c1917;
      --muted: rgba(28,25,23,.55);
      --accent: #0f408f;
      --work: #9a3412;
      --line: rgba(28,25,23,.1);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: "Pretendard", "SUIT", -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--text);
      background:
        radial-gradient(1200px 600px at 10% -10%, #e8eef8 0%, transparent 55%),
        radial-gradient(900px 500px at 100% 0%, #f0e8df 0%, transparent 50%),
        var(--bg);
    }
    .wrap {
      max-width: 760px;
      margin: 0 auto;
      padding: 48px 24px 80px;
    }
    h1 {
      margin: 0 0 8px;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .lead {
      margin: 0 0 32px;
      color: var(--muted);
      font-size: 15px;
      line-height: 1.55;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: 12px;
    }
    li {
      display: grid;
      gap: 6px;
      padding: 16px 18px;
      background: var(--card);
      border: 1px solid var(--line);
      border-radius: 14px;
      box-shadow: 0 8px 24px rgba(28,25,23,.04);
    }
    .title-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    a {
      color: var(--accent);
      font-size: 17px;
      font-weight: 700;
      text-decoration: none;
    }
    a:hover { text-decoration: underline; }
    .badge {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 999px;
      background: #e8eef8;
      color: var(--accent);
    }
    .badge-static {
      background: #e7f5ef;
      color: #166534;
    }
    .section-title {
      margin: 36px 0 14px;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: -0.01em;
      color: var(--muted);
    }
    .chip {
      display: inline-block;
      margin-top: 4px;
      font-size: 14px;
      font-weight: 700;
    }
    .chip-work { color: var(--work); }
    .meta, .url, .muted-row {
      font-size: 12px;
      color: var(--muted);
      word-break: break-all;
    }
    .links { margin-top: 6px; padding-top: 8px; border-top: 1px dashed var(--line); }
    .foot {
      margin-top: 28px;
      font-size: 12px;
      color: var(--muted);
      line-height: 1.5;
    }
    code {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 11px;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>복제 테마 미리보기</h1>
    <p class="lead">
      <strong>원본</strong>은 수정하지 않습니다. <strong>수정본</strong>이 있는 테마는 아래 「수정본 열기」로 새 창에서 확인하세요.
      (Track C · 납품 아님)
    </p>
    <ul>
${items}
    </ul>
    ${staticBlock}
    <p class="foot">
      허브: <code>http://127.0.0.1:4173/</code> · 원본 포트 4201~ · 수정본 포트 4301~ · 정적 템플릿 4401~<br>
      재시작: <code>node scripts/preview-hub.js --force</code>
    </p>
  </div>
</body>
</html>`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function ensureCaseServer(caseId, port, opts = {}) {
  const working = Boolean(opts.working);
  const url = `http://127.0.0.1:${port}/`;
  if (await probe(url)) {
    if (!FORCE) {
      console.log(`  · ${caseId}${working ? ' (working)' : ''} already → ${url}`);
      return null;
    }
    killPort(port);
    await new Promise((r) => setTimeout(r, 400));
  } else if (FORCE) {
    killPort(port);
    await new Promise((r) => setTimeout(r, 200));
  }

  const args = [path.join(__dirname, 'preview-original.js'), caseId, String(port)];
  if (working) args.push('--working');
  if (FORCE) args.push('--force');

  const child = spawn(process.execPath, args, {
    cwd: path.join(__dirname, '..'),
    stdio: 'ignore',
    detached: true,
    windowsHide: true,
  });
  child.unref();
  console.log(
    `  · started ${caseId}${working ? ' [working]' : ''} → ${url} (pid ${child.pid})`
  );
  return child;
}

async function ensureStaticServer(slug, port) {
  const url = `http://127.0.0.1:${port}/`;
  if (await probe(url)) {
    if (!FORCE) {
      console.log(`  · ${slug} [static] already → ${url}`);
      return null;
    }
    killPort(port);
    await new Promise((r) => setTimeout(r, 400));
  } else if (FORCE) {
    killPort(port);
    await new Promise((r) => setTimeout(r, 200));
  }

  const args = [path.join(__dirname, 'preview-static-template.js'), slug, String(port)];
  if (FORCE) args.push('--force');

  const child = spawn(process.execPath, args, {
    cwd: path.join(__dirname, '..'),
    stdio: 'ignore',
    detached: true,
    windowsHide: true,
  });
  child.unref();
  console.log(`  · started ${slug} [static] → ${url} (pid ${child.pid})`);
  return child;
}

(async () => {
  let workingIndex = 0;
  const cases = listMirroredCases().map((c, i) => {
    const row = {
      ...c,
      port: CASE_PORT_START + i,
      workingPort: null,
    };
    if (c.hasWorking) {
      row.workingPort = WORKING_PORT_START + workingIndex;
      workingIndex += 1;
    }
    return row;
  });

  const staticTemplates = listStaticTemplates();

  if (!cases.length && !staticTemplates.length) {
    console.error('미러된 케이스(01-original/index.html) 또는 정적 템플릿이 없습니다.');
    process.exit(1);
  }

  fs.mkdirSync(HUB_DIR, { recursive: true });
  const html = buildHubHtml(cases, staticTemplates);
  fs.writeFileSync(path.join(HUB_DIR, 'index.html'), html, 'utf8');
  fs.writeFileSync(
    path.join(HUB_DIR, 'cases.json'),
    JSON.stringify(
      {
        hub: `http://127.0.0.1:${HUB_PORT}/`,
        cases: cases.map((c) => ({
          ...c,
          previewUrl: `http://127.0.0.1:${c.port}/`,
          workingPreviewUrl: c.workingPort ? `http://127.0.0.1:${c.workingPort}/` : null,
        })),
        staticTemplates: staticTemplates.map((t) => ({
          ...t,
          previewUrl: `http://127.0.0.1:${t.port}/`,
        })),
      },
      null,
      2
    ),
    'utf8'
  );

  console.log(`Hub cases (${cases.length}) · static (${staticTemplates.length}):`);
  for (const c of cases) {
    await ensureCaseServer(c.caseId, c.port, { working: false });
    if (c.hasWorking && c.workingPort) {
      await ensureCaseServer(c.caseId, c.workingPort, { working: true });
    }
  }
  for (const t of staticTemplates) {
    await ensureStaticServer(t.slug, t.port);
  }

  // wait briefly for children
  await new Promise((r) => setTimeout(r, 1200));

  if (FORCE) killPort(HUB_PORT);

  const server = http.createServer((req, res) => {
    const u = new URL(req.url || '/', `http://127.0.0.1:${HUB_PORT}`);
    if (u.pathname === '/' || u.pathname === '/index.html') {
      const body = fs.readFileSync(path.join(HUB_DIR, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      return res.end(body);
    }
    if (u.pathname === '/cases.json') {
      const body = fs.readFileSync(path.join(HUB_DIR, 'cases.json'));
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
      return res.end(body);
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  });

  server.on('error', async (err) => {
    if (err.code === 'EADDRINUSE') {
      if (await probe(`http://127.0.0.1:${HUB_PORT}/`)) {
        console.log(`\n허브 이미 실행 중 → http://127.0.0.1:${HUB_PORT}/`);
        console.log('테마 링크는 허브 페이지에서 새 창으로 여세요.');
        if (FORCE) {
          killPort(HUB_PORT);
          setTimeout(() => server.listen(HUB_PORT, '127.0.0.1'), 500);
          return;
        }
        process.exit(0);
      }
      killPort(HUB_PORT);
      setTimeout(() => server.listen(HUB_PORT, '127.0.0.1'), 500);
      return;
    }
    console.error(err);
    process.exit(1);
  });

  server.listen(HUB_PORT, '127.0.0.1', () => {
    console.log(`\n허브 → http://127.0.0.1:${HUB_PORT}/`);
    console.log('목록에서 테마를 누르면 새 창으로 열립니다.');
    console.log('Ctrl+C 시 허브만 종료됩니다. 테마 서버는 각각 남아 있을 수 있어요 (--force로 정리).');
  });
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
