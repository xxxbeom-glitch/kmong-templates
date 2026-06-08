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

---

## 2026-06-04 — [docs] 프로젝트 기준 문서 정리

### 작성·갱신

| 파일 | 내용 |
|------|------|
| `_docs/project-overview.md` | 목적, 독립 템플릿 원칙, 폴더 역할, 신규 템플릿 추가 기준 |
| `_docs/figma-to-code-guide.md` | Figma 1920, MCP 전·후 체크, clamp, 768px 대응 |
| `_docs/imweb-delivery-guide.md` | `_delivery/imweb/{slug}/`, 경로·jQuery·납품 전 QA |
| `_docs/qa-checklist.md` | 구조·Figma·반응형·인터랙션·Imweb·commit 전 QA |

### 미수정

- `templates/template-c/` · `package.json` · `start.bat` · `.cursor/rules/*.mdc`

---

## 2026-06-04 — [rules] Figma 프레임명 기반 템플릿 생성 규칙 추가

### 갱신

| 파일 | 내용 |
|------|------|
| `.cursor/rules/10-project-structure.mdc` | Figma frame → slug 정규화·승인 필수 |
| `.cursor/rules/30-figma-to-code.mdc` | MCP 시작 시 프레임명·섹션 구조 보고 |
| `_docs/project-overview.md` | 신규 템플릿 slug 결정 절차·예시 |
| `_docs/figma-to-code-guide.md` | 프레임명 확인·제안 절차 |
| `_logs/decision-log.md` | Figma 프레임명 = slug 기준 결정 |

### 미수정

- `templates/template-c/` · `start.bat` · `package.json`

---

## 2026-06-04 — [setup] 기존 template-c를 legacy로 이동

### 이동

| From | To |
|------|-----|
| `templates/template-c/` | `_docs/legacy/templates/template-c/` |

### 기타

- `templates/.gitkeep` 생성 — 활성 템플릿 없음 표시
- `templates/` 하위 템플릿 폴더 없음 (정상 상태)

### 갱신

- `_docs/project-overview.md` — 현재 템플릿 없음·legacy 참고 명시
- `_docs/figma-to-code-guide.md` — 빈 `templates/` 안내
- `_logs/decision-log.md` — template-c legacy 결정
- `.cursor/rules/10-project-structure.mdc` — active workspace 원칙

### 미수정

- `start.bat` · `package.json` · `templates/template-c` 내부 파일 내용
