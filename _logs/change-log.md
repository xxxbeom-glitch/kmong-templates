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

---

## 2026-06-04 — [template] ontheblue 템플릿 기본 구조 생성

### 신규 (`templates/ontheblue/`)

| 경로 | 비고 |
|------|------|
| `index.html` | 최소 골격, GNB/header 없음, title LUMO |
| `css/style.css` | `:root` 레이아웃 1840px / gutter 40px, `.container` |
| `js/main.js` | jQuery 진입점만 |
| `assets/images/`, `assets/icons/` | `.gitkeep` |

### 확정 기준 (드라이런 승인)

- Figma frame: `template_ontheblue` → slug `ontheblue`
- 콘텐츠 1840px · gutter 40px · 모바일 768px 일반 규칙
- 브랜드 카피 LUMO · header는 1차 미포함

### 미구현

- Figma 섹션 HTML/CSS/JS (hero~footer)
- `header` / GNB

### 미수정

- `start.bat` · `package.json` · `_docs/legacy/templates/template-c/`

---

## 2026-06-04 — [template] ontheblue hero 섹션 구현

**템플릿:** `ontheblue` · **섹션:** `hero` (`hero-section` · Figma `149:2964`)

### 수정 파일

| 파일 | 내용 |
|------|------|
| `templates/ontheblue/index.html` | `section--hero` 마크업 (LUMO 카피, 정적 페이저 01/03) |
| `templates/ontheblue/css/style.css` | hero 레이아웃·타이포·KV·768px |

### MCP 기준 수치 요약

- 섹션: 1920×980 · padding `90/40/90/40` · gap 10
- KV: 1840×800 · inner padding L/R `72` · overlay `#000` 30%
- 콘텐츠 max `1440` · gap `46` / `22` / `14`
- 타이포: label 18/700 · title 56/700 · body 24/500 · pager 16/500 · `#fff`

### 구현 요약

- `id="hero"` + `class="section section--hero"`
- KV: `aspect-ratio 1840/800` · `assets/images/hero-kv.jpg` 구조 (파일 미추가 시 `#0c1a2e` fallback)
- CTA 없음 · 슬라이더 정적 표시 · header 없음 · JS 변경 없음

### 미해결 / 다음 주의

- `assets/images/hero-kv.jpg` Figma export 후 교체 필요
- 다음 섹션: `story-section` (사용자 PASS 후)
