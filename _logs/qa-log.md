# QA Log

## 2026-06-09 — smile-clinic 모바일 header · hero · signature

**템플릿:** `smile-clinic` · **파일:** `index-mobile.html` · `css/mobile.css`  
**검수:** 사용자 PASS (타이포 가이드 `37:2249` 적용본)  
**결과:** **PASS**

| # | 항목 | 결과 |
|---|------|------|
| 1 | header drawer · 햄버거 | PASS |
| 2 | hero 560px · 타이포 `--mo-fs-*` | PASS |
| 3 | signature head · slider · more | PASS |
| 4 | 타이포 기준값 decision-log 확정 | PASS |

**다음:** strength 이후 섹션 동일 `--mo-*` 기준으로 `index-mobile.html` 추가 → PASS 후 `@768` 이식

---

## 2026-06-08 — smile-clinic preset `scroll-reveal`

**템플릿:** `smile-clinic` · **섹션:** hero · signature · strength · process · reservation  
**검수자:** Cursor Agent  
**결과:** **PASS** (코드·규칙 대조)

| # | 항목 | 결과 |
|---|------|------|
| 1 | preset ID = 사용자 승인 `scroll-reveal` | PASS |
| 2 | 섹션당 scroll 계열 1개 (typing/slider 중복 없음) | PASS |
| 3 | signature 카드 track transform과 scroll-reveal 미중복 | PASS |
| 4 | `prefers-reduced-motion` → 즉시 `is-revealed` | PASS |
| 5 | header/footer 미적용 | PASS |
| 6 | `html.js` + no-JS fallback(콘텐츠 가시) | PASS |

**비고:** 실브라우저 스크롤 확인은 페이지 QA 시 재검.

---

## 2026-06-04 — 구조 리셋 QA

**대상:** Imweb 전용 하네스 구조 리셋 (setup)  
**검수자:** Cursor Agent  
**결과:** **PASS**

### 검수 항목

| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | `.cursor/rules` 9개 존재 | PASS | 00~60 + 55-git-workflow |
| 2 | `_modules` 제거 | PASS | 폴더 없음 |
| 3 | `_tokens` 제거 | PASS | 폴더 없음 |
| 4 | `_delivery/cafe24` 제거 | PASS | 폴더 없음 |
| 5 | `_delivery/imweb` 유지 | PASS | `.gitkeep` 존재 |
| 6 | `templates/template-c` 유지 | PASS | *(이후 legacy 이동 — 아래 QA 참고)* |
| 7 | legacy 이동 확인 | PASS | `_docs/legacy/` 하위에 AGENTS·cursorrules·template-a/b·_common·_imgs·체크리스트 |
| 8 | push 금지 규칙 | PASS | `00-core.mdc`, `55-git-workflow.mdc`에 명시 |
| 9 | `start.bat` / `package.json` 미수정 | PASS | 리셋 범위 준수 |

### FAIL 항목
없음

### 비고
- `start.bat`는 아직 `template-a` 경로 — 별도 작업에서 수정 예정

---

## 2026-06-04 — docs 본문 정리 QA

**대상:** `_docs/*.md` 4개 본문 작성  
**검수자:** Cursor Agent  
**결과:** **PASS**

### 검수 항목

| # | 항목 | 결과 |
|---|------|------|
| 1 | 4개 문서 placeholder 제거·본문 작성 | PASS |
| 2 | Cafe24·`_modules`·`_tokens` 언급 없음 | PASS |
| 3 | 독립 완성형 템플릿 기준 일관 | PASS |
| 4 | `.cursor/rules`와 충돌 없음 (docs=사람용, rules=Cursor용) | PASS |
| 5 | `template-c` / `package.json` / `start.bat` 미수정 | PASS |
| 6 | 문서 간 breakpoint(768)·clamp·납품 경로 일치 | PASS |

### FAIL 항목
없음

---

## 2026-06-04 — Figma 프레임명 slug 규칙 QA

**대상:** rules·docs·logs Figma 프레임명 기반 템플릿 생성 규칙 반영  
**검수자:** Cursor Agent  
**결과:** **PASS**

### 검수 항목

| # | 항목 | 결과 |
|---|------|------|
| 1 | `10-project-structure.mdc` slug 정규화·승인 규칙 | PASS |
| 2 | `30-figma-to-code.mdc` MCP 프레임명·섹션 보고 | PASS |
| 3 | `_docs` 2개 문서 반영·rules와 일치 | PASS |
| 4 | `decision-log`·`change-log` 기록 | PASS |
| 5 | `template-c`·`start.bat` 미수정 | PASS | *(이후 template-c legacy 이동)* |
| 6 | 예시(`ontheblue`, `claire-clinic`) 정확 | PASS |

### FAIL 항목
없음

---

## 2026-06-04 — template-c legacy 이동 QA

**대상:** `templates/template-c` → `_docs/legacy/templates/template-c`  
**검수자:** Cursor Agent  
**결과:** **PASS**

### 검수 항목

| # | 항목 | 결과 |
|---|------|------|
| 1 | `templates/template-c/` 없음 | PASS |
| 2 | `_docs/legacy/templates/template-c/` 존재 | PASS |
| 3 | `templates/` 비어 있음 (`.gitkeep`만) | PASS |
| 4 | rules/docs/logs 현재 기준 반영 | PASS |
| 5 | `template-c` 내부 파일 내용 미수정 | PASS |
| 6 | `start.bat` 미수정 | PASS |

### FAIL 항목
없음

---

## 2026-06-04 — ontheblue 스캐폴드 QA

**대상:** `templates/ontheblue/` 기본 구조 생성  
**검수자:** Cursor Agent  
**결과:** **PASS**

### 검수 항목

| # | 항목 | 결과 |
|---|------|------|
| 1 | `templates/ontheblue/` 필수 파일·폴더 존재 | PASS |
| 2 | Figma 섹션 미구현 (골격만) | PASS |
| 3 | `header`/GNB 없음 | PASS |
| 4 | `:root` 1840px / gutter 40px | PASS |
| 5 | 공통 모듈·`_tokens`·Cafe24 없음 | PASS |
| 6 | `start.bat`·`package.json` 미수정 | PASS |
| 7 | legacy `template-c` 미변경 | PASS |

### FAIL 항목
없음

---

## 2026-06-04 — ontheblue hero 섹션 QA

**대상:** `templates/ontheblue/` · `hero` (`149:2964`)  
**검수자:** Cursor Agent  
**결과:** **PASS** (이미지 파일 export는 후속)

### 섹션 단위 QA

| # | 항목 | 결과 |
|---|------|------|
| 1 | Figma padding/gap/font/color 대조 | PASS |
| 2 | 콘텐츠 1840 / gutter 40 / KV ratio 1840:800 | PASS |
| 3 | `section--hero` · BEM · 좌측 정렬 | PASS |
| 4 | clamp · 텍스트 height 고정 없음 | PASS |
| 5 | `@media 768px` 반영 | PASS |
| 6 | CTA·header·슬라이더 동작 없음 (확정) | PASS |
| 7 | 인라인 스타일 없음 | PASS |
| 8 | `hero-kv.jpg` 미존재 — fallback 배경·교체 가능 구조 | PASS* |

### FAIL 항목
없음

### 비고
- `hero-kv.jpg` 추가 시 시각 Figma 대조 재확인 권장
- **사용자 PASS 전** `story-section` 착수 금지

---

## 2026-06-08 — mainstream 섹션 QA (소급 · header~works)

**템플릿:** `mainstream`  
**검수자:** Cursor Agent  
**배경:** 3섹션 일괄·관망 모드 종료 → 규칙대로 **섹션 QA·qa-log 소급**  
**다음 섹션:** **faq** — **본 qa-log PASS + 사용자 PASS 후** 착수

---

### header (`168:55`) — **PASS**

| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | pad/gap/font · fluid | PASS | nav gap 48 · 20/600 |
| 2 | text-align / align | PASS | GNB 우측 · logo left |
| 3 | gap bbox | PASS | — |
| 4 | Fluid 1920·2560+ | PASS | shell cap 없음 |
| 5 | @1024 · @768 | PASS | 햄버거 · 터치 44 |
| 6 | logo 117×104 | PASS | 수정 반영 (2026-06-08) |

---

### hero (`149:2964`) — **PASS**

| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | pad/gap/font · fluid | PASS | 상단 pad **40** (사용자 승인) · KV 1840×800 |
| 2 | text-align | PASS | copy **LEFT** |
| 3 | gap bbox | PASS | — |
| 4 | Fluid 1920·2560+ | PASS | inner narrow 1440 only |
| 5 | @1024 · @768 | PASS | — |
| 6 | 슬라이더 | PASS* | 정적 01/03 · JS 추후 |

---

### story (`146:1397`) — **PASS**

| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | pad/gap/font · fluid | PASS | pad 120/40 · cards 613×720 gap 1 |
| 2 | text-align | PASS | head **CENTER** · card body LEFT (수정 반영) |
| 3 | gap bbox | PASS | list gap **1px** = bbox |
| 4 | Fluid 1920·2560+ | PASS | — |
| 5 | @1024 · @768 | PASS | 1열 stack |

**이전 FAIL:** head 좌측 정렬 → `failure-log` story align · 규칙 보강 · **수정 후 PASS**

---

### stats (`146:1507`) — **PASS**

| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | pad/gap/font · fluid | PASS | pad 120/40 |
| 2 | text-align | PASS | head **CENTER** · stat **CENTER** |
| 3 | gap bbox | PASS | stat-list gap 0 |
| 4 | Fluid 1920·2560+ | PASS | visual inner 1530 clamp |
| 5 | bg split | PASS | blue/white @ visual center (수정 반영) |
| 6 | @1024 · @768 | PASS | stat 2×2 · 1열 |

---

### news (`146:1534`) — **PASS**

| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | pad/gap/font · fluid | PASS | bg opacity 12% |
| 2 | text-align | PASS | head CENTER · card LEFT |
| 3 | gap bbox | PASS | cards gap **1px** |
| 4 | Fluid 1920·2560+ | PASS | — |
| 5 | @1024 · @768 | PASS | 1열 · nav 44px |
| 6 | 이미지 | PASS* | img scale 1.1 진단 중 · asset 여백 확인용 |

**보류:** news 카드 이미지 사이드 라인 — scale 1.1 테스트 · **사용자 확인 후** 유지/제거

---

### works (`147:2327`) — **PASS**

| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | pad/gap/font · fluid | PASS | gallery h 1097 · flex 959:294 |
| 2 | text-align | PASS | head CENTER · caption LEFT (active) |
| 3 | gap bbox | PASS | **gap 0** (itemSpacing 10 ≠ bbox · 수정 반영) |
| 4 | Fluid 1920·2560+ | PASS | — |
| 5 | @1024 · @768 | PASS | 세로 stack |
| 6 | accordion JS | PASS | click → is-active |

**이전 FAIL:** gallery gap 10px → bbox 0 · `failure-log` works gap · **수정 후 PASS**

---

### mainstream header~works 종합

| 결과 | 섹션 |
|------|------|
| **PASS** | header · hero · story · stats · news · works |
| **보류** | news 이미지 scale 1.1 (진단) |
| **다음** | faq — **사용자 PASS 후** 착수 |

---

## 2026-06-08 — mainstream faq · cta · footer (일괄 구현 + 섹션 QA)

**템플릿:** `mainstream` · **검수:** Cursor Agent · **모드:** 3섹션 일괄 (섹션 QA 개별 기록)

### faq (`150:3002`) — **PASS**

| # | 항목 | 결과 |
|---|------|------|
| 1 | pad 120/40 · title 48/800 **CENTER** | PASS |
| 2 | 3×2 grid · gap **1px** (bbox) | PASS |
| 3 | card **613×300** · pad 48/36 · mint/yellow | PASS (height **수정** — `min-height`→`height` 고정) |
| 4 | Q 26/700 · A 20/500 **LEFT** | PASS |
| 5 | @1024 · @768 1열 stack | PASS |

### cta (`149:2782`) — **PASS**

| # | 항목 | 결과 |
|---|------|------|
| 1 | bg **1920 full-bleed** · pad top 90 · inner text pad 40 | PASS (좌우 section margin **제거**) |
| 2 | title 44/700 white **CENTER** | PASS |
| 3 | btn white pill **218×79** · pad 20/43 · 24/700 black | PASS (radius **999** · height **79** 수정) |
| 4 | @1024 · @768 | PASS |

### footer (`149:2917`) — **FAIL → 수정** (2026-06-08 재검수)

| # | 항목 | 결과 |
|---|------|------|
| 1 | pad 90 · **행 순서** logo+family **위** / info+SNS **아래** | FAIL→수정 (기존 **역순**) |
| 2 | 텍스트 간격 meta↔links **8** · links↔copy **36** · 행 gap **70** | FAIL→수정 (기존 전부 **36**) |
| 3 | SNS **하단 정렬** · gap 16 · 64 circle · YT 34 / IG **28** | FAIL→수정 (기존 **상단 정렬**) |
| 4 | family **220×52** · pad 12/16 · gap 75 · label **한 줄** · **+** | PASS (label `flex-shrink:0` 수정) |
| 5 | @1024 · @768 stack | PASS |

### mainstream 페이지 — **전 섹션 구현 완료**

- header~footer 9섹션 HTML/CSS 반영
- **납품 전 전체 QA** (스크롤·섹션 간격·GNB) — 사용자 확인 대기

### mainstream — preset `scroll-reveal` (2026-06-08)

**범위:** story~cta 스크롤 진입 블록 · hero·header·footer **제외**

| # | 항목 | 결과 |
|---|------|------|
| 1 | preset ID = 사용자 승인 `scroll-reveal` | PASS |
| 2 | 1회 재생 · threshold ~12% · opacity + translateY(소폭) | PASS |
| 3 | hero·header·footer 미적용 | PASS → **hero 개별 적용** (사용자 요청) |
| 4 | stats 숫자 노드(`__value`)에 transform 미중복 | PASS (`.stats-item`만) |
| 5 | `prefers-reduced-motion` 즉시 표시 | PASS |
| 6 | JS 없을 때 콘텐츠 표시 (`.js` gate) | PASS |
| 7 | @768 동작 | PASS (코드상) |

**비고:** 브라우저 스크롤로 fade-up 확인 요청.

### mainstream — scroll-reveal 개별 요소 (2026-06-08)

| # | 항목 | 결과 |
|---|------|------|
| 1 | 그룹(wrapper) 제거 · 타이틀·본문·카드 파츠 개별 적용 | PASS |
| 2 | 섹션 진입 시 DOM 순 stagger 60ms | PASS |
| 3 | header·footer 미적용 유지 | PASS |

### mainstream — scroll-reveal hero (2026-06-08)

| # | 항목 | 결과 |
|---|------|------|
| 1 | 아이브로 · 타이틀 · 서브 · pager · progress 개별 | PASS |
| 2 | 로드 시 hero 순차 등장 (stagger 60ms) | PASS |

---
