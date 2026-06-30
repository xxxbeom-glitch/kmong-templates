# QA Log

## 2026-06-08 — hd-ec vision scroll-pin-scale-card (PC)

**템플릿:** `hd-ec` · **catalog:** `scroll-pin-scale-card` · **범위:** vision (`225:2128`)  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기

| 항목 | 기준 | 결과 |
|------|------|------|
| pin | sticky · scroll 100vh | PASS |
| scale | 0.32→1 scrub | PASS |
| overlay | 딤 점진 강화 | PASS |
| title | 후반 fade-in · scroll-reveal 제거 | PASS |
| @768 | pin 비활성 · 정적 | PASS |
| reduced-motion | 정적 fallback | PASS |
| 충돌 | vision scroll-reveal 제외 | PASS |

**다음:** 사용자 PASS

---

## 2026-06-08 — hd-ec scroll-reveal (PC · 1/5)

**템플릿:** `hd-ec` · **preset:** `scroll-reveal`  
**결과:** **PASS** — 사용자 확인 완료

| 항목 | 기준 | 결과 |
|------|------|------|
| 대상 | hero/header/footer 제외 6섹션 | PASS |
| 동작 | IO 진입 · 180ms stagger · 1회 | PASS |
| reduced-motion | 즉시 `is-revealed` | PASS |
| 중복 | hero 첫 화면 미적용 | PASS |
| 기존 | projects `drag-scroll` 유지 | PASS |

---

## 2026-06-08 — hd-ec hover-tone (PC · 2/5)

**템플릿:** `hd-ec` · **preset:** `hover-tone`  
**결과:** **PASS** — 사용자 확인 완료

| 항목 | 기준 | 결과 |
|------|------|------|
| GNB | header link · lang btn opacity | PASS |
| CTA | business · newsroom · careers opacity | PASS |
| newsroom row | item link opacity | PASS |
| investor card | brightness only · no transform | PASS |
| fine pointer | `@media (hover: hover)` only | PASS |
| scroll-reveal | 동일 요소 transform 충돌 없음 | PASS |

---

## 2026-06-08 — hd-ec image-scale-hover (PC · 3/5)

**템플릿:** `hd-ec` · **preset:** `image-scale-hover`  
**결과:** **PASS** — 사용자 확인 완료

| 항목 | 기준 | 결과 |
|------|------|------|
| business | card hover · bg scale 1.05 | PASS |
| projects | card hover · bg scale 1.05 | PASS |
| investor panel | panel hover · bg scale 1.05 | PASS |
| clip | inner/panel `overflow:hidden` | PASS |
| hover-tone | img vs link/button 분리 · 충돌 없음 | PASS |
| reduced-motion | scale 비활성 | PASS |

---

## 2026-06-08 — hd-ec stats-counter (PC · 4/5)

**템플릿:** `hd-ec` · **preset:** `stats-counter`  
**결과:** **PASS** — 사용자 확인 완료

| 항목 | 기준 | 결과 |
|------|------|------|
| 대상 | investor panel price | PASS |
| 동작 | 0→223,000 · comma grouping | PASS |
| 트리거 | `#investor` IO · 1회 | PASS |
| reduced-motion | 최종값 즉시 | PASS |
| scroll-reveal | price 노드 transform 없음 | PASS |

---

## 2026-06-08 — hd-ec button-text-slide-hover (PC · 5/5)

**템플릿:** `hd-ec` · **preset:** `button-text-slide-hover`  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기

| 항목 | 기준 | 결과 |
|------|------|------|
| business | 4× CTA text slide | PASS |
| newsroom | more btn text slide | PASS |
| careers | CTA text slide | PASS |
| arrow | 아이콘 slide 밖 · 유지 | PASS |
| hover-tone | CTA 병용 · preset 허용 | PASS |
| reduced-motion | slide 비활성 | PASS |

**다음:** 사용자 PASS → 인터랙션 전체 QA

---

## 2026-06-08 — hd-ec careers (PC static)

**템플릿:** `hd-ec` · **범위:** careers (`231:2187`)  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기

| 영역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| Shell | gutter 40 | `careers__shell` | PASS |
| 카드 | 1840×304 · r16 · #d9d9d9 | `.careers__card` | PASS |
| pad | 86/56 | `--careers-card-pad-*` | PASS |
| title→btn | gap 26 | `--careers-card-gap` | PASS |
| 타이틀 | 30/700 center | Figma 카피 | PASS |
| CTA | border 1px · pad 16/30 · r6 | `채용 공고 바로가기` | PASS |
| @1024 | — | CTA wrap | PASS |

**다음:** 사용자 PASS → 전체 QA

---

## 2026-06-08 — hd-ec footer (PC static)

**템플릿:** `hd-ec` · **범위:** footer (`244:2298`)  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기 · `footer-logo.png` export 대기

| 영역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| 배경 | `#f3f4f5` | `--footer-bg` | PASS |
| 패딩 | 96 / 240 | `--footer-pad-y/x` | PASS |
| 상단 간격 | 180 (careers 없음 → investor 후) | `margin-top: section-gap` | PASS |
| 로고 | 192×38 | `footer-logo.png` placeholder | PASS |
| logo→content | gap 38 | `--footer-logo-gap` | PASS |
| policy | 16/700 · gap 16 | 3링크 | PASS |
| content→meta | gap 16 | `--footer-content-gap` | PASS |
| address | 16/500 · gap 16 | 3항목 | PASS |
| copyright | 16/500 우측 | `footer__copy` | PASS |
| @1024 | — | meta 세로 stack | PASS |

**다음:** `section-careers` (`231:2187`) 또는 사용자 전체 QA

---

## 2026-06-08 — hd-ec investor (PC static)

**템플릿:** `hd-ec` · **범위:** investor (`224:2080`)  
**Figma MCP:** title·cards·panel 수치 대조  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기 · `investor-panel.jpg` 실제 export 대기

| 영역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| Shell | gutter 40 | `investor__shell` | PASS |
| 타이틀 | 42px / 800 / center | `투자정보` | PASS |
| head→layout | gap 68 | `--business-head-gap` | PASS |
| 카드 그리드 | 597+753 / 753+597 · gap 24 | `investor__row--top/bottom` | PASS |
| 카드 | r16 · #f3f6fa · pad 56/36 | title 32/800 · desc 26/500 | PASS |
| 패널 | 442×858 · overlay 20% | `investor-panel` | PASS |
| 주가 | 55/800 · meta 22/500 white | `223,000` · KOSPI | PASS |
| @1024 | — | 패널 하단 stack | PASS |
| @768 | — | 카드 1열 | PASS |

**다음:** 사용자 PASS → `section-careers` (`231:2187`)

---

## 2026-06-08 — hd-ec business·projects·newsroom Figma 수정 QA

**템플릿:** `hd-ec` · **범위:** business 카드 비율 · project 텍스트 weight · newsroom border  
**Figma MCP:** `207:1313` · `212:1419` · `212:2037` (file `6966c0dd…`)  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기

| 영역 | Figma | 수정 | 결과 |
|------|-------|------|------|
| business 카드 | 442×588 (`card-infra` 등) | `aspect-ratio: 442/588` · `min-height` 제거 | PASS |
| project date | 18px / **600** | `--project-date-weight: 600` | PASS |
| project name | 28px / **700** | `--project-name-weight: 700` | PASS |
| newsroom row stroke | `bottom:1` only · `#ededed` | `border-bottom` only · collapse hack 제거 | PASS |

---

## 2026-06-08 — hd-ec newsroom (PC static)

**템플릿:** `hd-ec` · **범위:** newsroom (`212:2037`)  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기

| 영역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| Shell | gutter 40 | `newsroom__shell` | PASS |
| 타이틀 | 42px / 800 / center | 1줄 카피 | PASS |
| head→list | gap 68 | `--business-head-gap` | PASS |
| row | 128px · pad 36/46 · border #ededed | `.newsroom-item__link` | PASS |
| title | 24px / 600 | Figma 카피 ×4 | PASS |
| date | 18px / 400 / 60% | 우측 정렬 | PASS |
| list→btn | gap 56 | `--newsroom-content-btn-gap` | PASS |
| CTA | border #1a1a1a · r6 · 20px | `더 많은 소식 보기` | PASS |
| @768 | — | row 세로 stack | PASS |

**다음:** 사용자 PASS → `대표 프로젝트` (`224:2080`)

---

## 2026-06-08 — hd-ec projects (PC static)

**템플릿:** `hd-ec` · **범위:** projects (`212:1419`)  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기

| 영역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| Shell | gutter 40 | `projects__shell` | PASS |
| 타이틀 | 42px / 800 / center | 1줄 카피 | PASS |
| head→track | gap 68 | `--business-head-gap` | PASS |
| 카드 | 1063×561 · gap 24 | 가로 스크롤 트랙 | PASS |
| radius | 16 | `--project-card-radius` | PASS |
| date/name | 18/600 · 28/700 white | 4항목 | PASS |
| pad | 36 · bottom 64 | `--project-card-pad-*` | PASS |

**다음:** Figma 카드 이미지 export · 사용자 PASS → `뉴스룸` (`212:2037`)

---

## 2026-06-08 — hd-ec business (PC static)

**템플릿:** `hd-ec` · **범위:** business (`207:1313`)  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기

| 영역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| Shell | gutter 40 | `business__shell` pad | PASS |
| 타이틀 | 42px / 800 / center | 2줄 카피 | PASS |
| head→grid | gap 68 | `--business-head-gap` | PASS |
| 카드 | 442×588 ×4 · gap 24 | flex 4열 | PASS |
| overlay | black 40% | `--business-card-overlay` | PASS |
| radius | 16 | `--business-card-radius` | PASS |
| btn | border 1px white · r6 | `.business-card__link` | PASS |
| @1024 | — | 2열 | PASS |
| @768 | — | 1열 | PASS |

**다음:** Figma 카드 이미지 export · 사용자 PASS → `대표 프로젝트` (`212:1419`)

---

## 2026-06-08 — hd-ec header·hero·vision 재검수 (PC)

**템플릿:** `hd-ec` · **범위:** header · hero · vision  
**결과:** **PASS (코드)** — vision 배경 이미지 export 대기

| 영역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| header logo | 193×39 PNG | `header-logo.png` | PASS |
| header globe | 54×54 `#D9D9D9` | `header-globe.png` | PASS |
| GNB center | cx 961 | absolute 50% | PASS |
| GNB gap | 36 | `--header-nav-gap` | PASS |
| hero bg | image | `hero-bg.jpg` | PASS |
| hero overlay | black **32%** | `--color-hero-overlay` | PASS (수정) |
| hero title | 70px / lh 102.2 / left 96·348 | clamp + padding | PASS |
| vision card | 1840×900 · overlay **60%** | 구조 일치 | PASS |
| vision bg | image `ea3951cf…` | placeholder | **FAIL** — export 필요 |
| vision title | 56px / center | 2줄 카피 | PASS |

---

## 2026-06-08 — hd-ec vision (PC static)

**템플릿:** `hd-ec` · **범위:** vision (`225:2128`) · 인터랙션 없음  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기

| 영역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| 섹션 높이 | 900px | `--vision-h` clamp | PASS |
| 카드 폭 | 1840 (gutter 40) | `--layout-content` | PASS |
| 배경 | image + black 60% | `.vision__overlay` | PASS |
| 타이틀 | 56px / 700 / center / white | 2줄 카피 | PASS |
| line-height | 90.72px | `--vision-title-lh` | PASS |
| max-width | 1245px | `--vision-title-max` | PASS |
| pin/scrub | 보류 | JS 없음 | PASS |

**다음:** Figma `vision-card` 이미지 export · 사용자 PASS → `사업영역` (`207:1313`)

---

## 2026-06-08 — hd-ec header + hero (PC static)

**템플릿:** `hd-ec` · **범위:** header (`231:2166`) · hero (`220:2078`) · 인터랙션 없음  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기

| 영역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| header 높이 | 128px | `--header-h` clamp | PASS |
| header bg | `#ffffff` | `--color-white` | PASS |
| logo | 193×39 | placeholder SVG | PASS (에셋 교체 대기) |
| GNB | 24px / 500 / gap 36 | 6항목 Figma 카피 | PASS |
| lang btn | 54×54 `#D9D9D9` | `.header__lang` | PASS |
| hero 높이 | 900px | `--hero-h` clamp | PASS |
| hero title | 70px / 700 / white | 2줄 카피 | PASS |
| hero bg | image cover | placeholder jpg + gradient fallback | PASS (Figma export 대기) |
| JS | — | `main.js` stub only | PASS |
| @1024 | — | nav 숨김 | PASS |
| @768 | — | hero padding 조정 | PASS |

**다음:** Figma 로고·hero 이미지 export 교체 · 사용자 PASS → `비전` 섹션

---

## 2026-06-08 — skhynix-redesign 인터랙션 Package B (PC)

**템플릿:** `skhynix-redesign` · **범위:** 전 섹션 preset · news JS  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기

| preset | 섹션 | 확인 |
|--------|------|------|
| `scroll-reveal` | products · heritage · sustainability · news · investor | IntersectionObserver · reduced-motion 즉시 표시 |
| `stats-counter` | heritage 4 stats | 1983 · 66.2 · 23.5 · 321 · 1회 |
| `hover-tone` | product/news/investor card · filter/tab/link | fine pointer only · opacity 0.85 |
| `drag-scroll` | sustainability | 기존 유지 |
| news filter | category show/hide · row sync | `data-news-filter` · `data-news-category` |
| news pagination | tab active state | `data-news-page` · static demo |
| smooth scroll | `html` | full-page snap 없음 |
| scroll top | pageshow | 40-template-code-style |

**다음:** 사용자 PASS → PC 메인 전체 QA

---

## 2026-06-08 — skhynix-redesign section-footer (PC)

**템플릿:** `skhynix-redesign` · **범위:** section-footer (`154:940`) · Figma MCP 전수 대조  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기

| 영역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| bg | `#f3f4f5` | `--color-footer-bg` | PASS |
| pad | 96/240 | section tokens | PASS |
| logo | 170×89 · gap 38 | `footerlogo.png` | PASS |
| policy | 16/700 op1 · gap 16 | `.footer__policy-link` | PASS |
| address | 16/500 op0.8 · gap 16 | `--color-footer-address` | PASS |
| copyright | 16/500 op0.9 · 우측 | `--color-footer-copyright` | PASS |
| copy | Figma 문자열 | `index.html` | PASS |
| @1024 meta stack · @768 address stack | — | CSS | PASS |

**다음:** 사용자 PASS → PC 메인 전체 QA

---

## 2026-06-08 — skhynix-redesign section-investor (PC)

**템플릿:** `skhynix-redesign` · **범위:** section-investor (`109:152`) · Figma MCP 전수 대조  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기

| 영역 | Figma | 구현 | 결과 |
|------|-------|------|------|
| section pad | 96/240 | tokens | PASS |
| head gap | 57 | `--investor-head-gap` | PASS |
| title | 38/700 `#151414` · accent 없음 | `.section-title` | PASS |
| cards row gap | 24 | `--grid-gap` | PASS |
| card | 464×288 · r26 · pad 46/36 · `#fff` | `.investor-card` | PASS |
| card inner gap | 100 (label↔body) | `--investor-card-inner-gap` | PASS |
| label | 14/700 `#ff7a00` op1 | `.investor-card__label` | PASS |
| title | 25/600 lh41 op1 | `.investor-card__title` | PASS |
| desc | 20/500 lh32 · op0.9 | `--color-investor-desc` | PASS |
| copy 3장 | Figma 문자열 | `index.html` | PASS |
| @1024 2열 · @768 1열 | — | CSS | PASS |

**다음:** 사용자 PASS → footer

---

## 2026-06-08 — skhynix-redesign section-news 전수 검수 (PC)

**템플릿:** `skhynix-redesign` · **범위:** section-news (`109:93`) · Figma MCP 전수 대조  
**결과:** **PASS (코드)** — 사용자 브라우저 확인 대기

### 레이아웃 · spacing

| 항목 | Figma | 구현 | 결과 |
|------|-------|------|------|
| section pad | 96 / 240 | `--section-pad-y` · `--section-inset-x` | PASS |
| body gap (content↔tabs) | 64 | `--news-body-gap` | PASS |
| content gap (head↔cards) | 56 | `--news-content-gap` | PASS |
| cards grid gap | 24 | `--grid-gap` | PASS |
| row gap | 24 | `--grid-gap` | PASS |
| head row gap · align | 10 · MAX/MAX | gap 10 · `flex-end` | PASS |
| filter group gap | 21 | `--news-filter-gap` | PASS |
| pagination gap | 12 | `--news-tab-gap` | PASS |

### 타이틀 · 필터

| 항목 | Figma | 구현 | 결과 |
|------|-------|------|------|
| title | 38/700 lh51.68 · accent 「미래를 향한 시선」 | `.section-title` + accent | PASS |
| filter active | 19/700 `#ff7a00` op1 · box 32h · bottom stroke 1 | accent + inset shadow · `min-height 32` | PASS |
| filter inactive | 19/500 `#151414` **op0.2** · stroke 없음 · padB 6 | `--color-filter-inactive` | PASS |

### 카드

| 항목 | Figma | 구현 | 결과 |
|------|-------|------|------|
| card | 464×258 · r26 · pad 36/26 · `#fff` | flex 1 · tokens | PASS |
| card inner | VERTICAL space-between · gap 76 | `.news-card__body` | PASS |
| title | 26/600 lh42 · `#151414` op1 | tokens | PASS |
| meta | 16/500 lh26 · `#151414` **op0.9** | `--color-news-meta` | PASS |
| dot | 2×2 · `#151414` op1 | `.news-card__dot` | PASS |
| meta row gap | 8 | `--news-meta-gap` | PASS |
| copy 6장 | Figma 문자열 | `index.html` | PASS |

### 페이지네이션

| 항목 | Figma | 구현 | RESULT |
|------|-------|------|--------|
| active 01 | bg `#ffead7` **op0.4** · text 18/600 `#ff7a00` | `--color-tab-bg-active` | PASS |
| inactive 02–05 | bg 없음 · text 18/400 `#151414` **op0.3** | `--color-tab-inactive` | PASS |
| size | 56×56 r99 | `--news-tab-size` | PASS |

**수정 (검수 중):** filter btn `min-height: 32px` · `align-items: flex-start` (Figma 텍스트 박스 정렬)

**다음:** 사용자 PASS → investor

---

## 2026-06-08 — skhynix-redesign section-news (PC) — superseded

_위 「전수 검수」 항목으로 대체_

---

## 2026-06-08 — skhynix-redesign section-sustainability (PC)

**템플릿:** `skhynix-redesign` · **범위:** section-sustainability (`111:254`) · PC only  
**기준:** Figma MCP · `50-qa-checklist.mdc`  
**결과:** **구현 완료 — 사용자 브라우저 확인 대기**

| # | 항목 | 결과 |
|---|------|------|
| 1 | 타이틀 accent 「지속가능한 내일」 `#ff7a00` | PASS (코드) |
| 2 | head row · nav 56×56 gap 12 · title/nav MAX 정렬 | PASS (코드) |
| 3 | esg card 952×613 · img 504 r26 · inner gap 26 | PASS (코드) |
| 4 | card title 26/600 lh42 · desc 20/500 lh32 · gap 9 | PASS (코드) |
| 5 | track gap 24 · 1440 viewport · 카드 peek | PASS (코드) |
| 6 | drag-scroll + prev/next 버튼 | PASS (코드) |

**다음:** 사용자 PASS → news

---

## 2026-06-08 — skhynix-redesign section-heritage (PC)

**템플릿:** `skhynix-redesign` · **범위:** section-heritage (`142:2`) · PC only  
**기준:** Figma MCP · `50-qa-checklist.mdc`  
**결과:** **구현 완료 — 사용자 브라우저 확인 대기**

| # | 항목 | 결과 |
|---|------|------|
| 1 | bg `section-heritage.jpg` opacity 0.56 풀블리드 | PASS (코드) |
| 2 | container 1440 · pad 96/240 · head gap 57 | PASS (코드) |
| 3 | 타이틀 accent 「SK hynix의 핵심」 `#ff7a00` | PASS (코드) |
| 4 | stat 4열 342×342 · gap 24 · r26 · pad 36/26 | PASS (코드) |
| 5 | label 26/600 lh34 · desc 20/500 lh26 · gap 6 | PASS (코드) |
| 6 | value 80/800 lh96 · unit 26/800 · unit offset 13 | PASS (코드) |
| 7 | @1024 2열 · @768 1열 | PASS (코드) |

**다음:** 사용자 PASS → sustainability

---

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
