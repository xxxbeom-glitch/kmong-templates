/**
 * Scaffold + capture + mirror for onetenth3/4/6/8 Cafe24 demos
 *   node scripts/run-onetenth-batch.js [scaffold|capture|mirror|finalize|all]
 */
const { execSync } = require('child_process');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CASES = [
  { id: 'onetenth3', code: 'ONETENTH03', url: 'https://onetenth3.mycafe24.com/', name: '십분의일 테크 03' },
  { id: 'onetenth4', code: 'ONETENTH04', url: 'https://onetenth4.mycafe24.com/', name: '십분의일 테크 04' },
  { id: 'onetenth6', code: 'ONETENTH06', url: 'https://onetenth6.mycafe24.com/', name: '십분의일 비즈니스 06' },
  { id: 'onetenth8', code: 'ONETENTH08', url: 'https://onetenth8.mycafe24.com/', name: '십분의일 크리에이티브 08' },
];

const step = process.argv[2] || 'all';

function run(cmd) {
  console.log('\n>>', cmd);
  execSync(cmd, { stdio: 'inherit', cwd: ROOT, env: process.env });
}

for (const c of CASES) {
  if (step === 'scaffold' || step === 'all') {
    run(
      `node scripts/scaffold-case.js ${c.id} ${c.code} ${c.url} ${c.url} "${c.name}"`
    );
  }
  if (step === 'capture' || step === 'all') {
    run(`node scripts/capture-case.js ${c.id} ${c.url}`);
  }
  if (step === 'mirror' || step === 'all') {
    run(`node scripts/mirror-original.js ${c.id} ${c.url} 80`);
  }
  if (step === 'finalize' || step === 'all') {
    run(`node scripts/finalize-case-analysis.js ${c.id} "${c.name}" ${c.url} ${c.url}`);
  }
}

console.log('\n[done]', step, CASES.map((c) => c.id).join(', '));
