# Change Log

## 2026-06-04 — [setup] 아임웹 전용 하네스 구조 리셋

### 이동 (`_docs/legacy/`)

| From | To |
|------|-----|
| `AGENTS.md` | `_docs/legacy/AGENTS.legacy.md` |
| `.cursorrules` | `_docs/legacy/cursorrules.legacy.md` |
| `_common/` | `_docs/legacy/_common/` |
| `_imgs/` | `_docs/legacy/_imgs/` |
| `templates/template-a/` | `_docs/legacy/templates/template-a/` |
| `templates/template-b/` | `_docs/legacy/templates/template-b/` |
| `_delivery/납품전-체크리스트.txt` | `_docs/legacy/납품전-체크리스트.txt` |

### 삭제

| 경로 | 비고 |
|------|------|
| `_modules/` | 공통 모듈 폴더 폐기 |
| `_tokens/` | 전역 토큰 (`tokens.css` 포함) |
| `_delivery/cafe24/` | Cafe24 납품 경로 제거 |

### 신규 생성

**`.cursor/rules/`** (9개)
- `00-core.mdc`, `10-project-structure.mdc`, `20-harness-workflow.mdc`
- `30-figma-to-code.mdc`, `40-template-code-style.mdc`, `45-interaction-patterns.mdc`
- `50-qa-checklist.mdc`, `55-git-workflow.mdc`, `60-imweb-delivery.mdc`

**`_harness/`**
- `README.md`, `workbench/`, `review/`, `snapshots/`, `reports/`

**`_logs/`**
- `decision-log.md`, `change-log.md`, `failure-log.md`, `qa-log.md`

**`_docs/`**
- `project-overview.md`, `figma-to-code-guide.md`, `imweb-delivery-guide.md`, `qa-checklist.md`
- `legacy/` (이동 대상 수용)

### 유지 (미수정)

| 경로 | 비고 |
|------|------|
| `templates/template-c/` | 전체 유지, 내부 파일 내용 변경 없음 |
| `_delivery/imweb/` | 아임웹 납품 경로 유지 |
| `package.json`, `package-lock.json` | 미수정 |
| `start.bat`, `stop.bat` | 미수정 |
| `.gitignore` | 미수정 |
