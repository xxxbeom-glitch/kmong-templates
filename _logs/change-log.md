# Change Log

## 2026-06-08 — [template] mainstream hero progress bar = 5초 타이머

- progress bar: 슬라이드마다 **0→100% 5초** 채움 → 완료 시 다음 슬라이드 · loop
- hover: 타이머·채움 **일시정지** · 이탈 시 남은 시간부터 재개
- bar 클릭: 즉시 다음 슬라이드 + 타이머 리셋
- (이전) 슬라이드 번호별 fill 고정값(60→109px) 방식 제거

---

## 2026-06-08 — [template] mainstream hero `hero-progress-slider` 연결

**템플릿:** `mainstream` · **섹션:** hero (`149:2964`)

| 항목 | 내용 |
|------|------|
| preset | `hero-progress-slider` |
| 슬라이드 | 3장 · fade 0.5s · loop |
| autoplay | **progress bar 5초 타이머** (0→100% 채움 후 다음 슬라이드) · hover 일시정지 |
| pager | `01 / 03` + progress bar (track 109px · fill = 타이머) |
| 수동 | progress bar 클릭 → 다음 슬라이드 |
| 이미지 | `hero-bg-01~03.jpg` (02·03은 01 복사 placeholder — Figma export 후 교체) |

| 파일 | 내용 |
|------|------|
| `index.html` | `.hero__slides` ×3 · pager 구조 |
| `css/style.css` | slide fade · overlay z-index · track button |
| `js/main.js` | `initHeroProgressSlider()` |

---

## 2026-06-08 — [template] mainstream scroll-reveal 속도 B 적용

- CSS duration `0.52s` → **`0.72s`**
- JS 순차 간격 hero **`150ms`** · 섹션 **`180ms`** (기존 75 / 85)

---

## 2026-06-08 — [template] mainstream 이미지 오버레이 Figma 대조·수정

**템플릿:** `mainstream` · **범위:** hero · story · works · cta · stats · news · faq · footer

| 섹션 | Figma | 조치 |
|------|-------|------|
| hero | 검정 30% | 기존 맞음 (변수화) |
| story | 카드 전체 검정 **46%** (fill 2겹) | gradient → **flat 46%** 수정 |
| works | 열림만 검정 **26%** | 이전 수정 반영 |
| cta | 검정 **30%** | **누락 → ::after 추가** |
| stats · news · faq · footer | 오버레이 없음 | 변경 없음 |

| 파일 | 내용 |
|------|------|
| `css/style.css` | `--story-overlay` · `--media-overlay-30` · story/cta overlay |

---

## 2026-06-08 — [template] mainstream scroll-reveal 순차 재생

- CSS delay 일괄 적용 → **JS로 개체 하나씩 85ms 간격** `is-revealed` (hero 75ms)
- easing `cubic-bezier(0.22, 1, 0.36, 1)` · 0.52s

---

## 2026-06-08 — [rules] workbench 미사용 · templates 직접 구현 확정

**범위:** 규칙·가이드만

| 파일 | 내용 |
|------|------|
| `10-project-structure.mdc` | 유일 개발 공간 `templates/` · workbench 금지 |
| `20-harness-workflow.mdc` | 구현 경로·금지 항목 |
| `60-imweb-delivery.mdc` | delivery = 납품 복사만 |
| `_harness/README.md` · `project-overview.md` | 폴더 역할 정리 |

**폐기:** `_harness/workbench/` · `review/` · `reports/` 워크플로.

---

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
- `README.md`, `snapshots/` (PNG 비교용)
- ~~`workbench/`, `review/`, `reports/`~~ — 초기 설계만, **2026-06-08 미사용 확정**

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

---

## 2026-06-08 — [template] mainstream header · hero · story (1차 3섹션)

**템플릿:** `mainstream` · **섹션:** `header` (`168:55`) · `hero` (`149:2964`) · `story` (`146:1397`)

### 수정 파일

| 파일 | 내용 |
|------|------|
| `templates/mainstream/index.html` | header GNB, hero, story 마크업 |
| `templates/mainstream/css/style.css` | 3섹션 PC + @1024 + @768 |
| `templates/mainstream/js/main.js` | GNB 햄버거 토글 |

### MCP 기준 수치

- header: 1920×104 · inner 1840 · nav gap 48 · 20/600 · `#222`
- hero: pad 90/40 · KV 1840×800 · overlay 30% · 콘텐츠 max 1440 · pager 60/109
- story: pad 120/40 · head gap 18 · cards 613×720 gap 1 · card pad 36/26

### 미해결

- `assets/images/hero-kv.jpg`, `story-card-01~03.jpg` export 필요 (현재 fallback 배경)
- hero 슬라이더 JS 미구현 (정적 01/03)
- 사용자 관망 중 — formal QA·qa-log 보류

---

## 2026-06-08 — [template] mainstream layout shell 수정

**템플릿:** `mainstream` · header / hero / story

### 변경

| 파일 | 내용 |
|------|------|
| `css/style.css` | Figma 섹션 pad 40 + inner `max-width: 1840` 패턴으로 재적용 |
| `css/style.css` | `.container` pad 제거 · `.main` max-width 제거 |
| `index.html` | hero 중복 `</div>` 제거 · header/story container 래퍼 정리 |

### 기준

- 섹션 `padding-inline: var(--layout-pad-x)` = gutter 40 (fluid)
- 자식 `max-width: var(--layout-content)` = 1840 (fluid)
- @1920: `40 + 1840 + 40 = 1920` · **2560+:** gutter vw만, shell `width:100%` (1840 cap 금지)

---

## 2026-06-08 — [template] mainstream faq · cta · footer (일괄)

**템플릿:** `mainstream` · faq `150:3002` · cta `149:2782` · footer `149:2917`

| 파일 | 내용 |
|------|------|
| `index.html` | FAQ 6카드 · CTA · footer |
| `css/style.css` | PC + @1024 + @768 |

### MCP 기준

- faq: 3×2 · gap 1 · mint/yellow · Q/A LEFT
- cta: bg image · title center · btn white
- footer: 2행 · meta/links · social · family site

---

## 2026-06-08 — [rules] PC interaction preset 카탈로그 (10종)

**범위:** 규칙·가이드만 · 템플릿 JS/CSS **미구현**

| 파일 | 내용 |
|------|------|
| `.cursor/rules/46-interaction-presets.mdc` | 10 preset 카탈로그 · 승인 절차 · 섹션당 상한 |
| `_docs/interaction-presets-guide.md` | 디자이너용 카탈로그 (템플릿별 연결 현황 **미포함**) |
| `20` · `45` · `50` · `context-guide` · `qa-checklist` | 참조 연결 |

**연결:** 사용자가 섹션별 preset ID 선택·승인 후 구현.

**한글명 (명령용):** `_docs/interaction-presets-guide.md` 표 참고 — 「stats에 숫자 카운트업 적용해줘」 형식.

---

**템플릿:** `mainstream` · footer `149:2917`

| 파일 | 내용 |
|------|------|
| `index.html` | 행 순서 · text-group · family dropdown 구조 |
| `css/style.css` | 간격 8/36/70 · SNS 하단 정렬 · family 220×52 |
| `js/main.js` | 패밀리 사이트 slideToggle |

### MCP bbox 기준

- Frame 32(logo+family) **위** · Frame 31(info+SNS) **아래** · 행 gap **70**
- meta↔links **8** · links↔copy **36**
- SNS cross **MAX**(하단 정렬) · family pad 12/16 gap 75

---

### 갱신
- `20-harness-workflow.mdc` — 섹션 QA 절차 · qa-log 필수 · 예외 종료 시 소급 QA
- `30-figma-to-code.mdc` — 「Gap · spacing」bbox 교차 검증
- `50-qa-checklist.mdc` · `_docs/qa-checklist.md` — gap bbox · 섹션 QA 루프
- `_logs/qa-log.md` — mainstream header~works 소급 PASS
- `_logs/decision-log.md` — QA 루프 복귀 확정
- `_logs/failure-log.md` — works gap

---

**템플릿:** `mainstream` · **섹션:** `works` (`147:2327`)

| 파일 | 내용 |
|------|------|
| `index.html` | head · accordion gallery 4 panels |
| `css/style.css` | flex 959/294 · caption active only · @1024 세로 stack |
| `js/main.js` | gallery panel click → `is-active` toggle |

### MCP 기준

- pad 120/40 · head↔gallery gap 64 · head gap 18 · **align CENTER**
- gallery h 1097 · gap 10 · expanded 959 · collapsed 294
- panel pad 54/42 · caption 32/700 + 22/500 gap 16 · **LEFT** (active only)
- images `works-gallery-01~04.png`

---

**템플릿:** `mainstream` · **섹션:** `news` (`146:1534`)

| 파일 | 내용 |
|------|------|
| `index.html` | news head · nav 02/04 · card 3 |
| `css/style.css` | PC + @1024(1열) + @768 · bg `news-bg.png` opacity 12% |
| `js/main.js` | `scrollRestoration=manual` · refresh 시 scroll top |

### MCP 기준

- pad 120/40 · bg image 12% · intro↔list gap 64 · head↔nav gap 38
- title 48/800 · desc 22/500 · **align CENTER**
- nav gap 10 · arrow 36 · pager 02/04 gap 14
- cards 3열 gap 1 · image 613×538 · card gap 28 · body pad 26 · title 26/600 LEFT · date 20/500

---

**템플릿:** `mainstream` · **섹션:** `stats` (`146:1507`)

| 파일 | 내용 |
|------|------|
| `index.html` | stats head · 4 stat items · visual 마크업 |
| `css/style.css` | PC + @1024(2×2) + @768(1열) |

### MCP 기준

- pad 120/40 · bg `#0f408f`
- head gap 18 · title 48/800 · desc 22/500 · **align CENTER**
- stat-list 1530 (1840 내 중앙) · 4열 gap 0 · item pad 26/46 · value 56/800 · label 26/500 · **align CENTER**
- head↔list gap 64 · list↔visual gap 62
- visual 1530×594 · `stats-visual.png`
- **bg split:** `#0f408f` ~ visual 세로 중앙 · 하단 `#fff` · visual overlap

---

**템플릿:** `mainstream` · header / hero / story

| 파일 | 내용 |
|------|------|
| `css/style.css` | hero 상단 pad 90→40 (`clamp(20px, 2.0833vw, 40px)`) |
| `css/style.css` | header logo Figma 117×104 명시 (square PNG max-height 축소 해소) |
| `css/style.css` | story head `text-align: center` · `align-items: center` |

**사유:** 사용자 — hero 상단 여백 축소, 로고 축소 보임, story 타이틀 Figma 중앙 정렬

---

### 갱신
- `30-figma-to-code.mdc` — shell vs inner narrow, ultrawide QA
- `40-template-code-style.mdc` — `.container` shell
- `50-qa-checklist.mdc` · `_docs/figma-to-code-guide.md` · `_docs/qa-checklist.md`
- `_logs/failure-log.md` — layout shell cap 재발 방지

---

## 2026-06-08 — [rules] 반응형 breakpoint·QA 뷰포트 기준 추가

### 신규·갱신

| 파일 | 내용 |
|------|------|
| `.cursor/rules/35-responsive.mdc` | 1024/768 breakpoint · 스택·hover/터치 · QA 뷰포트 5종 |
| `.cursor/rules/00-core.mdc` | breakpoint 참조 |
| `.cursor/rules/20-harness-workflow.mdc` | 구현 순서 @1024/@768 |
| `.cursor/rules/30-figma-to-code.mdc` | 완료 기준 |
| `.cursor/rules/40-template-code-style.mdc` | CSS breakpoint |
| `.cursor/rules/45-interaction-patterns.mdc` | hover/터치 |
| `.cursor/rules/50-qa-checklist.mdc` | QA 뷰포트 |
| `_docs/figma-to-code-guide.md` | 태블릿·모바일·QA |
| `_docs/qa-checklist.md` | §3 반응형 QA |
| `_harness/README.md` | 반응형 요약 |
| `_logs/decision-log.md` | mainstream·반응형 결정 |

---

## 2026-06-08 — [template] mainstream 스캐폴드·Figma 확인

### 확정

- Figma: `mainstream` (`146:943`) · `templates/mainstream/`
- 스크린샷: `_harness/snapshots/mainstream/mainstream.png`
- hero 슬라이더: 1차 정적 디자인 · JS 인터랙션 추후
- header: Figma Auto Layout 전환 (구현 시 MCP 재분석)
