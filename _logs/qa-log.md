# QA Log

## 2026-06-08 — tesla-redesign section-experience Figma 재동기 (PC)

**템플릿:** `tesla-redesign` · **범위:** section-experience · PC only  
**기준:** Figma `79:2266` · MCP JSON · `50-qa-checklist.mdc`  
**결과:** **구현 완료 — 사용자 브라우저 확인 대기**

| # | 항목 | 결과 |
|---|------|------|
| 1 | 섹션 1920×800 풀블리드 | PASS (코드) |
| 2 | 오버레이 rgba(0,0,0,0.3) | PASS (코드) |
| 3 | 타이틀 42/700 · 설명 24/500 · gap 16/64 | PASS (코드) |
| 4 | CTA outline 2px r · 18/500 · hover fill | PASS (코드) |
| 5 | 모바일 @768 | 보류 |

**다음:** 사용자 PASS → footer 또는 전체 QA

---

## 2026-06-08 — tesla-redesign models~footer Figma 재동기 (PC)

**템플릿:** `tesla-redesign` · **범위:** models · fsd-row · charging-slider · experience · footer (header/hero 제외)  
**기준:** Figma MCP fresh · `50-qa-checklist.mdc`  
**결과:** **구현 완료 — 사용자 브라우저 확인 대기**

| # | 항목 | 결과 |
|---|------|------|
| 1 | models 가로 카드 830×551 · 한글 · 흰 배경 · CTA 2개 | PASS (코드) |
| 2 | fsd-row 960×430 2열 · CTA 각 1개 | PASS (코드) |
| 3 | charging-slider 3-slide fade · 6s auto · hover pause | PASS (코드) |
| 4 | experience 1920×800 풀블리드 · CTA 1개 | PASS (코드) |
| 5 | footer 한글 nav/legal | PASS (코드) |
| 6 | `#technology` 제거 · pin-scroll JS 제거 | PASS (코드) |
| 7 | 모바일 @768 | 보류 |

**다음:** 사용자 PASS → PC 메인 전체 QA

---

## 2026-06-08 — tesla-redesign 인터랙션 3종 (PC)

**템플릿:** `tesla-redesign` · **범위:** scroll-reveal · hero-progress-slider · button-text-slide-hover · PC only  
**기준:** `46-interaction-presets.mdc` · mainstream/smile-clinic 참조 패턴  
**결과:** **구현 완료 — 사용자 브라우저 확인 대기**

| # | 항목 | 결과 |
|---|------|------|
| 1 | hero 3슬라이드 fade · 6s progress · loop · arrow · hover pause | PASS (코드) |
| 2 | splash 종료 후 slider 부트 · video play/pause | PASS (코드) |
| 3 | scroll-reveal 5타깃 · IO queue · reduced-motion | PASS (코드) |
| 4 | btn-slide-hover CTA · fine pointer only | PASS (코드) |
| 5 | preset 상한·중복 없음 (hover-tone 병용) | PASS (코드) |
| 6 | 모바일 @768 | 보류 |

**다음:** 사용자 PASS → PC 메인 전체 QA

---

## 2026-06-08 — tesla-redesign footer (PC)

**템플릿:** `tesla-redesign` · **범위:** footer · PC only  
**기준:** Figma `26:3` · MCP JSON  
**결과:** **구현 완료 — 사용자 브라우저 확인 대기**

| # | 항목 | 결과 |
|---|------|------|
| 1 | BG `#0d0d0d` · main pad 64/240 | PASS |
| 2 | 로고 221×44 · desc 13/400 `#6b6b6b` | PASS |
| 3 | nav 4열 · title 11/600 · link 14/400 `#aaa` | PASS |
| 4 | divider `#2a2a2a` · copyright/legal 12/400 | PASS |
| 5 | 모바일 @768 | 보류 |

**다음:** 사용자 PASS → PC 메인 전체 QA

---

## 2026-06-08 — tesla-redesign section-experience (PC)

**템플릿:** `tesla-redesign` · **범위:** section-experience · PC only  
**기준:** Figma `10:423` · MCP JSON  
**결과:** **구현 완료 — 사용자 브라우저 확인 대기**

| # | 항목 | 결과 |
|---|------|------|
| 1 | BG `#1b1d1d` · pad 80/240 | PASS |
| 2 | 카드 1440×460 r16 · `experience-content.jpg` cover | PASS |
| 3 | overlay 60% · 중앙 카피 `#f0f0f0` | PASS |
| 4 | title 68/700 UPPER · desc 22/500 · CTA hero btn 패턴 | PASS |
| 5 | 모바일 @768 | 보류 |

**다음:** 사용자 PASS → footer

---

## 2026-06-08 — tesla-redesign section-technology (PC)

**템플릿:** `tesla-redesign` · **범위:** section-technology · PC only  
**기준:** Figma `23:732` · MCP JSON  
**결과:** **구현 완료 — 사용자 브라우저 확인 대기**

| # | 항목 | 결과 |
|---|------|------|
| 1 | BG `#1b1d1d` · pad 80/240 | PASS |
| 2 | 타이틀 52/700 · 카드 708×352 r16 | PASS |
| 3 | 3카드 가로 스크롤 · gap 24 | PASS |
| 4 | 카피·줄내림 Figma 일치(수동 `\n` 없음) | PASS |
| 5 | 모바일 @768 | 보류 |

**다음:** 사용자 PASS → section-experience

---

## 2026-06-08 — tesla-redesign section-charging (PC)

**템플릿:** `tesla-redesign` · **범위:** section-charging · PC only  
**기준:** Figma `10:375` · MCP JSON  
**결과:** **구현 완료 — 사용자 브라우저 확인 대기**

| # | 항목 | 결과 |
|---|------|------|
| 1 | 750px full-bleed · `section-charging.jpg` | PASS |
| 2 | overlay 60% · 중앙 카피 `#f0f0f0` | PASS |
| 3 | desc 3줄 Figma `\n` → `<br>` | PASS |
| 4 | Find Charging / Learn More CTA | PASS |
| 5 | 모바일 @768 | 보류 |

**다음:** 사용자 PASS → section-technology

---

## 2026-06-08 — tesla-redesign section-fsd (PC)

**템플릿:** `tesla-redesign` · **범위:** section-fsd · PC only  
**기준:** Figma `10:363` · MCP JSON  
**결과:** **구현 완료 — 사용자 브라우저 확인 대기**

| # | 항목 | 결과 |
|---|------|------|
| 1 | 750px full-bleed · `section-fsd.jpg` cover | PASS |
| 2 | overlay `#1b1d1d` 60% | PASS |
| 3 | 타이틀·본문 `#f0f0f0` · 중앙 정렬 | PASS |
| 4 | CTA Explorer FSD / View Safity · hero btn 패턴 | PASS |
| 5 | 모바일 @768 | 보류 |

**다음:** 사용자 PASS → section-charging

---

## 2026-06-08 — tesla-redesign section-models (PC)

**템플릿:** `tesla-redesign` · **범위:** section-models · PC only  
**기준:** Figma `10:432` · MCP JSON  
**결과:** **구현 완료 — 사용자 브라우저 확인 대기**

| # | 항목 | 결과 |
|---|------|------|
| 1 | 섹션 BG `#1b1d1d` · pad 90/240 | PASS (MCP) |
| 2 | 타이틀 52/700 · 링크 18/500 `#f0f0f0` | PASS |
| 3 | 2×2 grid gap 24/26 · card 707×652 r16 | PASS |
| 4 | 카드 이미지 4종 · 하단 gradient · CTA | PASS |
| 5 | 모바일 @768 | 보류 |

**다음:** 사용자 PASS → section-fsd

---

## 2026-06-08 — tesla-redesign section-nav · section-hero (PC)

**템플릿:** `tesla-redesign` · **범위:** header · hero · PC only  
**기준:** Figma `portfolio_tesla_main` `23:866` · `1:244` · MCP JSON  
**결과:** **구현 완료 — 사용자 브라우저 확인 대기**

| # | 항목 | 결과 |
|---|------|------|
| 1 | nav 93px · #1b1d1d · 로고 221 중앙 · 햄버거 48 우측 | PASS (MCP 대조) |
| 2 | hero 800px · video `assets/videos/hero-bg.mp4` cover | PASS |
| 3 | title/subtitle 카피·타이포 clamp | PASS |
| 4 | CTA Order Now / Demo Drive · radius 6 · secondary 20% white | PASS |
| 5 | scroll prev/next 아이콘 52px 좌우 | PASS |
| 6 | 모바일 @768 | 보류 (decision-log) |

**다음:** 사용자 PASS → section-models

---

## 2026-06-09 — smile-clinic 모바일 @768 최종 이식

**템플릿:** `smile-clinic` · **범위:** 메인 + 서브 3페이지 · `style.css` @768 · `main.js`  
**기준:** `index-mobile.html` / `about-*-mobile.html` 사용자 PASS 확정본  
**결과:** **PASS** (코드·구조 대조 — 실브라우저 768px 확인 권장)

| # | 항목 | 결과 |
|---|------|------|
| 1 | mobile.css → style.css @768 병합 | PASS |
| 2 | mobile.js → main.js 통합 | PASS |
| 3 | 모바일 nav · 슬라이더 · team picker HTML | PASS |
| 4 | PC 마크업 유지 (듀얼 블록 show/hide) | PASS |

**다음:** 실기기·DevTools 768px QA · 납품 전 전체 QA

---

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
