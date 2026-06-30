# Change Log

## 2026-06-08 — [template] hd-ec business card white arrow icon

**범위:** `index.html` · `assets/icons/icon-arrow-right-white.png`  
**변경:** 사업영역 CTA 4곳 → 흰색 `>` 아이콘 · 루트 loose PNG 정리

---

## 2026-06-08 — [template] hd-ec business card text alignment fix

**범위:** `css/style.css` · business card body/copy  
**Figma:** `205:1236` — VERTICAL · pad 36/46 · gap 76 · primary MAX · copy 370×117 고정  
**변경:** copy min-h 117 · name min-h 82(2줄 박스) · align-items flex-start · text-align left

---

## 2026-06-08 — [template] hd-ec vision pin M&S 구조 정합 (2차)

**범위:** `css/style.css` · `js/main.js`  
**원인:** scale 전 구간 + 3500px + scrub 2s → M&S 대비 과도하게 느림  
**변경:** width/height 박스 확대(560×340→풀) · 이미지 100vw 고정 · 펼침 구간 14% · pin 1800px · scrub 0.85s · 타이틀 y 100% 슬라이드

---

## 2026-06-08 — [template] hd-ec vision pin scrub HD M&S 정합

**범위:** `css/style.css` · `js/main.js`  
**참고:** HD현대M&S `main-company` — `scrub:2` · `end:+=3500`  
**변경:** pin 거리 3500px · scrub 2s lerp · scale/딤 linear · easeOutCubic 제거

---

## 2026-06-08 — [template] hd-ec header scroll auto-hide

**범위:** `css/style.css` · `js/main.js`  
**동작:** 스크롤 down → `is-header-hidden` · up → 표시 · top(≤8px) 항상 표시 · transform slide

---

## 2026-06-08 — [template] hd-ec vision 카드 상하 gutter 통일

**범위:** `css/style.css`  
**변경:** `vision__shell` `padding: var(--layout-pad-x)` (좌우·상하 동일 40px) · card `min-height` viewport 고정 제거

---

## 2026-06-08 — [template] hd-ec vision 카드 높이 100dvh

**범위:** `css/style.css`  
**변경:** `--vision-h: 100dvh` · pin padding 제거 · card/shell flex stretch · pin-wrap `calc(vision-h + pin-scroll)`

---

## 2026-06-08 — [template] hd-ec hero viewport 100% (HD M&S 참고)

**범위:** `css/style.css`  
**변경:** `--hero-h: 100dvh` · header `position: fixed` overlay · 타이틀 pad `header-h + offset`

---

## 2026-06-08 — [template] hd-ec vision catalog — scroll-pin-scale-card

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**catalog:** `scroll-pin-scale-card` — vision (`225:2128`)  
**동작:** sticky pin · 카드 scale 0.32→1 · overlay 0.28→1 · 타이틀 45% 이후 fade-in · `scroll-reveal` vision 제외 · @768/reduced-motion 정적

---

## 2026-06-08 — [template] hd-ec 인터랙션 5/5 — button-text-slide-hover

**범위:** `index.html` · `css/style.css`  
**preset:** `button-text-slide-hover` — business CTA(4) · newsroom more · careers CTA  
**동작:** `btn-slide-hover` · 텍스트 2줄 stack · hover 시 translateY slide · arrow 아이콘 유지

---

## 2026-06-08 — [template] hd-ec 인터랙션 4/5 — stats-counter

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**preset:** `stats-counter` — investor panel 주가 `223,000`  
**동작:** `#investor` IO 진입 · 0→223000 · grouping · 1600ms ease-out · 1회 · reduced-motion 즉시 최종값

---

## 2026-06-08 — [template] hd-ec 인터랙션 3/5 — image-scale-hover

**범위:** `css/style.css`  
**preset:** `image-scale-hover` — business card bg · project card bg · investor panel bg  
**동작:** card/panel hover · img `scale(1.05)` · overflow hidden 프레임 유지 · fine pointer only

---

## 2026-06-08 — [template] hd-ec 인터랙션 2/5 — hover-tone

**범위:** `css/style.css`  
**preset:** `hover-tone` — GNB · business CTA · newsroom row/btn · investor card · careers CTA · footer policy  
**동작:** fine pointer · opacity 0.85 (링크/버튼) · investor card `brightness(0.96)` · transform 없음

---

## 2026-06-08 — [template] hd-ec 인터랙션 1/5 — scroll-reveal

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**preset:** `scroll-reveal` — vision · business · projects · newsroom · investor · careers (hero/header/footer 제외)  
**동작:** 섹션 진입 시 제목→카드 순차 등장 · 180ms stagger · IO threshold 0.1 · reduced-motion 즉시 표시

---

## 2026-06-08 — [template] hd-ec assets 정리 · 아이콘·investor panel 연결

**범위:** `index.html` · `css/style.css` · `assets/`  
**icons:** `Arrow - Down 2 - Iconly Pro.png` → `assets/icons/icon-arrow-right.png` · business/newsroom/careers 인라인 SVG → `<img>`  
**investor:** `9d4aeb5b…` → `assets/images/investor-panel.png` · HTML 경로 갱신  
**정리:** `assets/` 루트 해시 PNG·중복 jpg/mp4·구 header/hero 파일 삭제 · `images/` 중복 jpg(business·vision·investor) 제거

---

## 2026-06-08 — [template] hd-ec careers section static (Figma 231:2187)

**범위:** `index.html` · `css/style.css`  
**Figma:** gutter 40 · card **1840×304** · `#d9d9d9` · r16 · title **30/700** center · CTA border `#1a1a1a` r6 **20/500**

---

## 2026-06-08 — [template] hd-ec footer 패딩 본문 gutter 통일

**범위:** `css/style.css`  
**변경:** footer `padding-inline: var(--layout-pad-x)` (40px @1920) — `business__shell` 등과 동일 · 240px 전용 규칙 제거

---

## 2026-06-08 — [template] hd-ec footer 좌우 마진 재수정 (pad-x 240)

**범위:** `css/style.css`  
**Figma:** frame `padding 96/240` · inner **1920** cap · content **1440**  
**변경:** `--footer-pad-x: clamp(20px, 12.5vw, 240px)` + `footer__inner` padding-inline

---

## 2026-06-08 — [template] hd-ec 사용자 에셋 연결 (hero video · business · vision)

**범위:** `index.html` · `css/style.css` · `assets/videos/` · `assets/images/`  
**hero:** `assets/videos/hero-bg.mp4` (autoplay · muted · loop) · poster `hero-bg.jpg`  
**business:** Figma ref → `business-card-01~04.png` (인프라·건축·주택·에너지)  
**vision:** `ea3951cf…` → `vision-card.png`  
**investor panel:** Figma ref `9d4aeb5b…` 파일 미확인 — `investor-panel.jpg` placeholder 유지

---

## 2026-06-08 — [template] hd-ec footer 좌우 마진 수정

**범위:** `css/style.css`  
**Figma:** 콘텐츠 **1440px** @1920 → 좌우 **240px** (`(1920-1440)/2`)  
**변경:** `padding-inline: 240` 제거 → `max-width: 1440` + `margin: auto` (ultrawide 포함 동일 비율)

---

## 2026-06-08 — [template] hd-ec footer section static (Figma 244:2298)

**범위:** `index.html` · `css/style.css` · `assets/images/footer-logo.png` (placeholder)  
**Figma:** bg `#f3f4f5` · pad **96/240** · logo **192×38** · policy **16/700** · meta **16/500** `#151414`

---

## 2026-06-08 — [template] hd-ec investor 레이아웃 flex 비율 재구성

**범위:** `css/style.css`  
**Figma Auto Layout:** `1374:442` · 행별 `597:753` / `753:597` · 높이 **417** · 패널 **858**  
**변경:** CSS Grid/`fr` 제거 → Figma grow 비율 flex (`1374/442`, `597/753`)

---

## 2026-06-08 — [template] hd-ec investor 카드 크기 Figma 수정

**범위:** `css/style.css`  
**Figma:** layout **1374:442** · 카드 행 **417px** · 열 **597:753** / **753:597** · 패널 **858px** (=417×2+24)  
**변경:** `aspect-ratio` 제거 → 행 고정 높이 + fr 비율 그리드

---

## 2026-06-08 — [template] hd-ec projects 가로 스크롤 복원 · scrollbar 숨김 · drag-scroll

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**변경:** 1063×561 가로 트랙 복원 · `scrollbar-width: none` · `drag-scroll` preset (`data-projects-scroll`) · jQuery CDN

---

## 2026-06-08 — [template] hd-ec investor section static (Figma 224:2080)

**범위:** `index.html` · `css/style.css` · `assets/images/investor-panel.jpg` (placeholder)  
**Figma:** `투자정보` · gutter 40 · title 42/800 · 4 cards #f3f6fa (597/753 비율) · panel 442×858 · overlay 20% · stock 55/800

---

## 2026-06-08 — [template] hd-ec projects 가로 스크롤 제거

**범위:** `index.html` · `css/style.css`  
**변경:** `projects__scroll` 제거 → `projects__grid` 4열 flex · 카드 `aspect-ratio: 1063/561` · @1024 2열 · @768 1열

---

## 2026-06-08 — [template] hd-ec business·projects·newsroom Figma 수정

**범위:** `css/style.css`  
**business:** 카드 `aspect-ratio: 442/588` (min-height 제거 — ultrawide 비율 짧음 수정)  
**projects:** date **600** · name **700** 토큰 명시  
**newsroom:** 행 stroke **bottom만** (`individualStrokeWeights` Figma 일치) · 사방 border 제거

---

## 2026-06-08 — [template] hd-ec newsroom section static (Figma 212:2037)

**범위:** `index.html` · `css/style.css`  
**Figma:** `뉴스룸` · gutter 40 · title 42/800 · row 128px border #ededed · date 60% · CTA 중앙

---

## 2026-06-08 — [template] hd-ec projects section static (Figma 212:1419)

**범위:** `index.html` · `css/style.css` · `assets/images/project-card-01~04.jpg`  
**Figma:** `대표 프로젝트` · gutter 40 · title 42/800 · 가로 카드 1063×561 gap 24 · overflow-x scroll  
**수정:** vision `.vision__title` 중복 CSS 블록 제거

---

## 2026-06-08 — [template] hd-ec business section static (Figma 207:1313)

**범위:** `index.html` · `css/style.css` · `assets/images/business-card-01~04.jpg`  
**Figma:** `사업영역` · gutter 40 · title 42/800 · 4 cards 442×588 gap 24 · overlay 40% · btn border white  
**Shell:** guttered (vision과 동일 pad 패턴)

---

## 2026-06-08 — [template] hd-ec shell 타입 정리 (Figma MCP)

**범위:** `index.html` · `css/style.css`  
**Shell:** hero full-bleed · vision full shell + `section-shell--gutter` · header guttered  
**공통:** `.section-shell` · `.section-shell--gutter` · `.is-bleed-x` · `--layout-pad-x` 40

---

## 2026-06-08 — [template] hd-ec header·hero·vision 재검수 + 에셋 연결

**범위:** `index.html` · `css/style.css` · `assets/images/`  
**에셋:** `header-logo.png` · `header-globe.png` · `hero-bg.jpg` (사용자 제공)  
**수정:** hero overlay **32%** · GNB letter-spacing 0 · lang PNG · vision card radius 16px · vision **좌우 40px + 카드 채움** · 섹션 간격 180px · placeholder 경로 정리  
**미제공:** vision 카드 배경 (`225:2129` imageRef) — `vision-card.jpg` placeholder 유지

---

## 2026-06-08 — [template] hd-ec vision section static (Figma 225:2128)

**범위:** `templates/hd-ec/` · `index.html` · `css/style.css` · `assets/images/vision-card.jpg`  
**Figma:** `비전` (`225:2128`) · card `225:2129` 1840×900 · overlay 60% · title 56px center  
**내용:** pin/scrub 없이 최종(100%) 정적 레이아웃 · placeholder 배경

---

## 2026-06-08 — [template] hd-ec header + hero static (Figma 199:951)

**범위:** `templates/hd-ec/` · `index.html` · `css/style.css` · `js/main.js` · assets  
**Figma:** `portfolio_HD_E&C_main` (`199:951`) · header `231:2166` · hero `220:2078`  
**내용:** 인터랙션 없이 헤더(128px·GNB 6·언어 버튼) + hero(900px·70px 타이틀) PC 정적 구현 · hero placeholder(picsum) · 로고 placeholder SVG · **GNB 헤더 전체 너비 중앙 정렬** (`Frame 69` cx 961)

---

## 2026-06-08 — [docs] infinite-text-marquee 참고 카탈로그 추가

**범위:** `_docs/interaction-presets-guide.md` · `samples.manifest.json`  
**추가:** `infinite-text-marquee` — HD현대M&S 사업소개 `.bg-txt` CSS 마키

---

## 2026-06-08 — [docs] interaction-presets-guide 묘사·참고 카탈로그 6종 반영

**범위:** `_docs/interaction-presets-guide.md`  
**내용:** 표준 preset 10종 «묘사» 열 추가 · 참고 카탈로그(예손·HD 6종) 섹션 추가

---

## 2026-06-08 — [harness] interaction catalog 예손 4종 추가 + description 필드

**범위:** `_harness/interaction-samples/` manifest · hub.js · hub.css · README  
**추가:** `intro-pin-scrub-hero` · `scroll-pin-multi-step` · `scroll-enter-act-reveal` · `css-3d-flip-card`  
**내용:** 전 항목 `description`(상세 묘사) 필드 · 허브 카드에 summary/description/howToTest 3단 표시

---

## 2026-06-08 — [harness] interaction catalog 정리 (로컬 프리뷰 삭제)

**범위:** `_harness/interaction-samples/`  
**삭제:** `3d-carousel-ring/` · `scroll-pin-scale-card/` · `embed-mode.js`  
**내용:** 로컬 샘플 HTML 제거 · manifest 참고 URL 목록 + 허브 검토 UI만 유지

---

## 2026-06-08 — [harness] interaction hub iframe 제거 → 리스트+새창

**범위:** `_harness/interaction-samples/` index · hub.css · hub.js · README  
**내용:** iframe/전체화면 미리보기 제거 · 샘플 카드 클릭 시 `window.open` 새 창

---

## 2026-06-08 — [harness] interaction hub 미리보기 개선 (embed · 전체화면)

**범위:** `_harness/interaction-samples/` hub · 3d-carousel · scroll-pin  
**내용:** iframe `embed=1` 축소 모드 · 전체화면 미리보기 · 3D 링 overflow·스케일 조정

---

## 2026-06-08 — [harness] interaction-samples 허브 (manifest · 미리보기 · 검토)

**범위:** `_harness/interaction-samples/` · `_harness/index.html` · `_harness/README.md`  
**내용:** `samples.manifest.json` 정본 · 허브 UI(목록+iframe) · PASS/HOLD/REJECT localStorage · 필터

---

## 2026-06-08 — [harness] interaction-samples 목록·허브

**범위:** `_harness/interaction-samples/README.md` · `index.html` · `_harness/README.md`  
**내용:** 3d-carousel-ring · scroll-pin-scale-card 카탈로그 등록 · 샘플 허브 페이지

---

## 2026-06-08 — [harness] interaction sample scroll-pin-scale-card

**범위:** `_harness/interaction-samples/scroll-pin-scale-card/`  
**내용:** HD현대M&S `main-company` 패턴 프로토타입 — pin + scrub · 배경 카드 30%→풀 · 텍스트 순차 등장

---

## 2026-06-08 — [harness] interaction sample 3d-carousel-ring

**범위:** `_harness/interaction-samples/3d-carousel-ring/`  
**내용:** 예손 PROJECTS 패턴 CSS 3D ring carousel 샘플 (10 cards · rotateY/translateZ · drag/snap)

---

## 2026-06-08 — [template] skhynix-redesign hero title 90px (Figma 수정 반영)

**범위:** `css/style.css` — hero title font-size · line-height only  
**Figma:** hero copy · **90px** @1920 (기존 60px 오독 수정)  
**내용:** `clamp(45px, 4.6875vw, 90px)` · lh `clamp(58.5px, 6.09375vw, 117px)` (1.3 비율)

---

## 2026-06-08 — [template] skhynix-redesign products 타이틀 공통 컬러 패턴

**범위:** `index.html` · `css/style.css`  
**Figma:** `149:336` · news/heritage와 동일 — 38/700 `#151414` + accent `#ff7a00`  
**내용:** 잘못 적용된 `--color-text-subtle-30` muted 제거 · accent 외 `--color-text` 상속

---

## 2026-06-08 — [template] skhynix-redesign products 타이틀 muted 공통 적용

**범위:** `index.html` · `css/style.css`  
**Figma:** `149:336` · non-accent = `--color-text-subtle-30`  
**내용:** `이,` muted span 누락 수정 · `.section-title__muted` 공통화(products 전용 선택자 제거)

---

## 2026-06-08 — [template] skhynix-redesign hero intro → products auto-scroll

**범위:** `js/main.js`  
**내용:** hero intro 1회 완료 시 `#products` 자동 스크롤 · magnetic snapTo 연동 · reduced-motion 동일

---

## 2026-06-08 — [template] skhynix-redesign hero title size (Figma 149:465)

**범위:** `css/style.css` — hero title font-size only  
**Figma:** `149:465` · 1920 → 60px (`3.125vw`)  
**내용:** Kakao 6.25vw/브레이크포인트 override 제거 → `clamp(32px, 3.125vw, 60px)`

---

## 2026-06-08 — [template] skhynix-redesign products 섹션 타이틀 Figma 수정

**범위:** `index.html` · `css/style.css`  
**Figma:** `149:336` · copy·accent·2줄 muted  
**내용:** `보이지 않는 기술이,` / `AI의 속도를 만듭니다.` · 2줄 `--color-text-subtle-30` · `font-weight: 400`

---

## 2026-06-08 — [template] skhynix-redesign hero mask coords + scroll-down remove

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**내용:** maskRect 좌표 카카오뱅크 viewport 비율(0.48x · 50vh-Yoffset) + SVG transform attr 방식 복원 · hero scroll-down 버튼 제거

---

## 2026-06-08 — [template] skhynix-redesign hero Kakao clipPath restore

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**내용:** div mask-window 제거 → 카카오뱅크 구조 복원(default-wrap + mask-wrap 고정 텍스트 · SVG clipPath scale) · mirror JS 위치 보정 제거

---

## 2026-06-08 — [template] skhynix-redesign hero expand no-scale

**범위:** `css/style.css` · `js/main.js`  
**내용:** scale 확대 제거 → pill→fullscreen layout clip 확장(영상 풀사이즈 고정) · expand 중 mirror fade-out

---

## 2026-06-08 — [template] skhynix-redesign hero expand perf

**범위:** `css/style.css` · `js/main.js`  
**내용:** 확대 구간 layout 재계산/onUpdate 제거 · rest 고정 후 GSAP scale(GPU) · coverScale · 종료 시 fullscreen 스냅

---

## 2026-06-08 — [template] skhynix-redesign hero div mask window

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**내용:** SVG clipPath 제거 → div mask-window · 영상/ mirror 윈도우 오프셋 동기화 · pill 정지 좌표 live rest 측정

---

## 2026-06-08 — [template] skhynix-redesign hero mask pixel-sync

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**내용:** hero__stage 레이어 분리 · mirror absolute+getBoundingClientRect 픽셀 동기화 · clip SVG mask 레이어 내부 · 줄별 cover height sync · onUpdate 추적

---

## 2026-06-08 — [template] skhynix-redesign hero mask align fix (root)

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**내용:** clipPath 좌표 → mask-wrap 기준 재계산 · dual layer flex center 통일 · mirror width sync · CSS/GSAP transform 충돌 제거

---

## 2026-06-08 — [template] skhynix-redesign hero copy·mask align

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**내용:** hero 카피 변경 · 마스크 rect DOM 측정(타이틀 중심·높이) · default/mask 텍스트 레이어 정렬 통일

---

## 2026-06-08 — [template] skhynix-redesign hero auto-play intro

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**내용:** scroll scrub 제거 → 첫 진입 GSAP auto-play · hero 100svh · ScrollTrigger CDN 제거 · intro 재생 중 magnetic snap 차단 · scroll-down → products

---

## 2026-06-08 — [template] skhynix-redesign hero Kakao Bank mask reveal

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**내용:** 카카오뱅크 main-visual 패턴 — 중앙 정렬 6.25vw 타이틀 · SVG clipPath pill mask · scroll scrub(GSAP+ScrollTrigger) · 200svh sticky · magnetic snap hero reveal 구간 추가 · scroll-down 버튼

---

## 2026-06-08 — [template] skhynix-redesign scroll-reveal 섹션 스냅 연동

**범위:** `js/main.js`  
**내용:** 로드 일괄 등장 제거 · magnetic snap 완료 시 해당 섹션 reveal · 이탈 시 reset · news 카드 `is-revealed` 제거 · heritage digit roll snap 연동

---

## 2026-06-08 — [template] skhynix-redesign 전 섹션 magnetic scroll

**범위:** `js/main.js`  
**내용:** hero~footer 7스냅 — 휠 down/up 섹션 단위 이동 · PC only · 민감도 유지

---

## 2026-06-08 — [template] skhynix-redesign hero magnetic scroll

**범위:** `js/main.js`  
**내용:** PC · hero → `#products` 휠 1회 스냅 · products 진입선 휠 up → top 복귀

---

## 2026-06-08 — [template] skhynix-redesign hero scale-out 제거

**범위:** `css/style.css` · `js/main.js`  
**내용:** 카피 scale-out(`.is-hero-exiting`) 제거 · 줄별 slide-up만 유지

---

## 2026-06-08 — [template] skhynix-redesign hero 패딩·카피 정렬 (Figma 149:465)

**범위:** `css/style.css` — hero only  
**내용:** pad 114/240/114/240 · copy 하단·좌측 · 1440px · 2줄 LEFT · `#f8f9fb`

---

## 2026-06-08 — [template] skhynix-redesign hero mp4 구간·크롭

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**내용:** YouTube → `assets/hero.mp4` · 00:00–00:10 ↔ 01:16–01:19 루프 · scale 1.32 + object-position (하단 자막 크롭)

---

## 2026-06-08 — [template] skhynix-redesign hero YouTube 배경

**범위:** `index.html` · `css/style.css`  
**내용:** hero — YouTube `rpmUKAh1Z0w` iframe cover · autoplay/mute/loop · 밝은 overlay 20%

---

## 2026-06-08 — [template] skhynix-redesign hero 카피 scale-out

**범위:** `css/style.css` · `js/main.js`  
**내용:** slide-up 완료 후 1s 유지 → `.hero__copy` scale(1.12) + opacity 0 (1s)

---

## 2026-06-08 — [template] skhynix-redesign hero 줄별 slide-up

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**내용:** hero 타이틀 2줄 — mask + `translateY(100%→0)` · load 시 `.is-hero-ready` · 줄별 delay (brainall.kr 패턴)

---

## 2026-06-08 — [template] skhynix-redesign heritage 핀텔식 digit roll

**범위:** `index.html` · `js/main.js` · `css/style.css`  
**내용:** heritage stats — `stats-counter` → 자릿수별 위·아래 교차 롤링 (`data-digit-roll`)

---

## 2026-06-08 — [template] skhynix-redesign products·heritage 카드 hover lift

**범위:** `css/style.css` — `#products` · `#heritage` 카드 PC hover `translateY` lift

---

## 2026-06-08 — [template] skhynix-redesign news 페이지네이션 콘텐츠 30건

**범위:** `index.html` · `js/main.js`  
**내용:** 5페이지 × 6카드(3×2) JS 생성 · 탭·필터 전환 시 그리드 렌더

---

## 2026-06-08 — [template] skhynix-redesign 인터랙션 Package B 적용

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**preset:** `scroll-reveal`(products·heritage·sustainability·news·investor) · `stats-counter`(heritage) · `hover-tone`(product/news/investor card · filter/tab/link) · `drag-scroll`(sustainability 유지) · news filter/pagination JS · `scroll-behavior: smooth`

---

## 2026-06-08 — [template] skhynix-redesign CSS 공통 토큰·유틸 정리

**범위:** `css/style.css`  
**내용:** opacity `--color-text-subtle-*` · typography `--fs-card-title` / `--fs-body-md` / `--fs-body-sm` · `.section` pad · `.section-head-row` · `.flex-grid-row` · `.card-surface` 그룹화 · 섹션별 중복 토큰 제거

---

## 2026-06-08 — [template] skhynix-redesign footer 텍스트 opacity 명시

**범위:** `css/style.css` — footer policy · address · copyright  
**Figma:** policy 16/700 `#151414` op1 · address 16/500 op0.8 · copyright 16/500 op0.9

---

## 2026-06-08 — [template] skhynix-redesign section-footer

**범위:** `index.html` · `css/style.css` — section-footer (`154:940`)  
**Figma:** bg `#f3f4f5` · pad 96/240 · logo 170×89 · logo↔content gap 38 · policy 16/700 gap16 · address 16/500 op0.8 gap16 · copyright 16/500 op0.9

---

## 2026-06-08 — [template] skhynix-redesign section-investor

**범위:** `index.html` · `css/style.css` — section-investor (`109:152`)  
**Figma:** title 38/700 (accent 없음) · head gap 57 · card 464×288 r26 pad 46/36 · inner gap 100 · label 14/700 accent · title 25/600 lh41 · desc 20/500 op0.9

---

## 2026-06-08 — [template] skhynix-redesign section-news 전수 Figma 검수

**범위:** `css/style.css` · `index.html` · qa-log  
**결과:** MCP 전수 대조 PASS · filter `min-height: 32px` 보완

---

## 2026-06-08 — [template] skhynix-redesign section-news card meta opacity

**범위:** `css/style.css` — `.news-card__category` · `.news-card__date`  
**Figma:** 16/500 `#151414` fill opacity **0.9** · dot separator opacity **1** (유지)

---

## 2026-06-08 — [template] skhynix-redesign section-news filter 탭 정렬

**범위:** `css/style.css` — filter active 밑줄  
**이슈:** active만 `border-bottom` → 텍스트 1px 위로 밀림  
**수정:** 공통 `padding-bottom: 6` · 밑줄 `box-shadow: inset` (레이아웃 영향 없음)

---

## 2026-06-08 — [template] skhynix-redesign section-news tab opacity

**범위:** `css/style.css` — inactive opacity Figma 반영  
**Figma:** filter inactive text `#151414` **0.2** · pagination inactive text **0.3** · pagination active bg `#ffead7` **0.4**

---

## 2026-06-08 — [template] skhynix-redesign section-news 비선택 탭 속성 명시

**범위:** `css/style.css` — `.news__filter-btn:not(.is-active)` · `.news__tab:not(.is-active)`  
**Figma inactive:** filter 19/500 `#151414` pad-bottom 6 · stroke 없음 · pagination bg null 18/400 `#151414`

---

## 2026-06-08 — [template] skhynix-redesign section-news filter 밑줄·inactive 재적용

**범위:** `css/style.css` — `.news__filter-btn` · `.news__tab`  
**Figma (`154:723`):** active pad-bottom 6 · bottom stroke 1px `#ff7a00` · inactive stroke 없음 fw500 `#151414` · pagination inactive bg null

---

## 2026-06-08 — [template] skhynix-redesign section-news 카드 간격 수정

**범위:** `css/style.css` — news card grid gap  
**Figma:** `news-cards` · `news-row-*` gap **24** (가로·세로 동일)  
**수정:** 행 간격 `--news-rows-gap` 32 → `--grid-gap` 24 통일

---

## 2026-06-08 — [template] skhynix-redesign section-news filter·pagination 스타일 수정

**범위:** `css/style.css` — news filter · news-tabs  
**Figma:** filter active `#ff7a00` fw700 · inactive `#151414` fw500 · tab active만 bg `#ffead7` + text accent fw600 · inactive bg 없음 fw400

---

**수정:** 전 탭 `#ffe9d6` 배경 — Figma inactive는 fill null

---

## 2026-06-08 — [template] skhynix-redesign section-news

**범위:** `index.html` · `css/style.css` — section-news (`109:93`)  
**Figma:** accent 「미래를 향한 시선」 · filter 19px · card 464×258 r26 · title 26/600 lh42 · meta 16/500 gap8 · tabs 56 r99 `#ffe9d6`  
**내용:** 3×2 카드 그리드 · 카테고리 필터 · 하단 01–05 탭 (정적)

---

## 2026-06-08 — [template] skhynix-redesign sustainability track 좌측 shell 정렬 유지

**범위:** `css/style.css` — `--shell-content-inset` · sustainability viewport  
**내용:** 좌측 시작 = section-shell 콘텐츠 edge · 우측만 viewport 끝까지 확장

---

## 2026-06-08 — [template] skhynix-redesign sustainability track 우측 full-bleed

**범위:** `css/style.css` — sustainability viewport/track  
**내용:** viewport `max-width`·`margin`·track `padding-right` 제거 — 좌 inset 240 유지 · 우측 화면 끝까지 스크롤

---

## 2026-06-08 — [template] skhynix-redesign sustainability nav PNG · disabled

**범위:** `index.html` · `css/style.css` · `js/main.js` · `assets/icons/icon-arrow-right.png`  
**규칙:** `45-interaction-patterns` · `interaction-presets-guide` — 첫 scroll prev disabled · 마지막 next disabled · `:disabled` opacity 0.35  
**내용:** SVG → PNG · scroll/resize마다 `prop("disabled")` 동기화

---

## 2026-06-08 — [template] skhynix-redesign section-sustainability

**범위:** `index.html` · `css/style.css` · `js/main.js` — section-sustainability (`111:254`)  
**Figma:** head gap 57 · accent 「지속가능한 내일」 · esg card 952×613 · img 504 r26 · text gap 9 · track gap 24 · nav 56  
**내용:** 5 ESG 카드 가로 드래그 스크롤 · prev/next nav · img-card-1~5 매핑

---

## 2026-06-08 — [template] skhynix-redesign HBM 카드 텍스트 side 카드와 통일

**범위:** `css/style.css` — product card typography  
**내용:** HBM 전용 26/18 타이포 제거 · 전 카드 name 25/600 lh41 · desc 20/500 lh26

---

## 2026-06-08 — [template] skhynix-redesign heritage stat 카드 텍스트·위치 재정렬

**범위:** `css/style.css` — heritage-stat card inner layout  
**Figma:** Frame 73 `SPACE_BETWEEN` · Frame 69 top-left pad 26/36 · label/desc gap 6 · value row full-width · number RIGHT + unit padB 13  
**내용:** body `align-items:stretch` · text top-left · value bottom · body gap 제거 · number flex:1

---

## 2026-06-08 — [template] skhynix-redesign section-heritage

**범위:** `index.html` · `css/style.css` — section-heritage (`142:2`)  
**Figma:** bg image opacity 0.56 · container 1440 · head gap 57 · stats 342×342 gap 24 · accent 「SK hynix의 핵심」  
**내용:** 풀블리드 bg · 4 stat 카드 · label/desc gap 6 · value 80/800 + unit offset 13px

---

## 2026-06-08 — [template] skhynix-redesign products 카드 이미지 우하단 정렬

**범위:** `css/style.css` — product card image position  
**Figma:** Frame 73 `counterAxisAlignItems: MAX` · image inset card pad 26R/36B · HBM/DDR5 `SPACE_BETWEEN` gap 10  
**내용:** media `justify-content/align-self: flex-end` · side gap 16 · DDR5 body `space-between`

---

## 2026-06-08 — [template] skhynix-redesign products 카드 타이포·간격 Figma 재정렬

**범위:** `css/style.css` · `index.html` — product card title/desc gap · line-height · body gap  
**Figma:** Frame 69/74 `gap: 6` · HBM lh 34/29 · side lh 41/26 · inner gap 16 (DDR5 10)  
**내용:** 타이틀↔서브 6px 고정 · lh px 토큰화 · side 카드 space-between → gap 16 · `p` margin 0

---

## 2026-06-08 — [template] skhynix-redesign page-bg · section-products

**범위:** `css/style.css` · `index.html` — page bg `#f8f9fb` · section-products (`149:334`)  
**Figma:** container 1440 · head gap 57 · cards 586+830 bento · card `#fff` r26 · pad 36/26

---

## 2026-06-08 — [template] skhynix-redesign header · hero 재구현 (섹션 순차)

**범위:** `index.html` · `css/style.css` · `js/main.js` — header · hero only  
**Figma:** `149:307` · `149:465`  
**내용:** 전체 HTML 초기화 후 header+hero만 구현 · hero `#d9d9d9` placeholder 유지

---

## 2026-06-08 — [template] skhynix-redesign PC 메인 페이지 구현 (롤백)

**범위:** ~~전체 8섹션~~ → header·hero부터 순차 재진행으로 롤백

---

## 2026-06-08 — [template] skhynix-redesign 폴더·스캐폴드 생성

**범위:** `templates/skhynix-redesign/` — `index.html` · `css/style.css` · `js/main.js` · `assets/` · `_source/`  
**Figma:** `portfolio_skhynix_main` (`98:2344`) · 에셋 사용자 투입 대기

---

## 2026-06-08 — [template] tesla-redesign models carousel 1920 cap (ultrawide)

**범위:** `css/style.css` — models 카드 viewport  
**내용:** `@769px+` viewport `max 1920px` 중앙 정렬 — 2560 등 ultrawide에서 peek 과다 노출 방지

---

## 2026-06-08 — [template] tesla-redesign models peek padding 제거 · 830px 고정

**범위:** `css/style.css` · `js/main.js` — models 카드 슬라이더  
**내용:** vw 카드·peek padding 제거 → **830px 고정** · viewport 100vw clip · JS `offsetLeft` 중앙 정렬

---

## 2026-06-08 — [template] tesla-redesign models 카드 PC 830px 고정 · peek clip

**범위:** `css/style.css` — models 카드 슬라이더  
**내용:** PC `@769px+` 카드 **830px 고정** (vw 축소 제거) · viewport `overflow-x: hidden` · 중앙 1장+좌우 잘림

---

## 2026-06-08 — [template] tesla-redesign footer 우측 inset · nav 균등분배

**범위:** `css/style.css` — footer  
**내용:** `footer__main-inner` max-width 제거 → 좌우 `--section-inset-x` 맞춤 · brand/nav space-between · nav col `flex: 1`

---

## 2026-06-08 — [template] tesla-redesign models 카드 peek inset 100vw

**범위:** `css/style.css` — models 카드 슬라이더  
**내용:** peek inset `100%` → `100vw` · gap 24 · `min-width` 고정 · 중앙 1장+좌우 peek

---

## 2026-06-08 — [template] tesla-redesign FSD·charging 원복 · experience·footer inset 통일

**범위:** `css/style.css` · `index.html`  
**내용:** 3·4번 `--section-inset-x` 원복 · 5번·footer `section-shell--gutter` 제거 → 동일 `--section-inset-x` (clamp 240) 적용

---

## 2026-06-08 — [template] tesla-redesign FSD·charging 좌측 inset Experience 정렬

**범위:** `css/style.css` — section-fsd-row · section-charging-slider  
**내용:** 좌측 `--content-inset-left` (Experience `section-shell--gutter`와 동일) · FSD 우측 패널 `--side-padding` · charging 우 pad 0

---

## 2026-06-08 — [template] tesla-redesign models 타이틀 너비 카드 공통

**범위:** `css/style.css` — `.models__header`  
**내용:** 「당신을 위한 테슬라」 `max-width` → `--models-card-width` (830px fluid) · 카드와 동일 너비

---

## 2026-06-08 — [template] tesla-redesign experience 높이 aspect-ratio 수정

**범위:** `css/style.css` — `section-experience`  
**내용:** 고정 height clamp(800 cap) 제거 → `aspect-ratio: 1920/800` · Figma imageTransform 기준 `object-position: 50% 57%` · @768 min-height

---

## 2026-06-08 — [template] tesla-redesign experience Figma 재동기 (79:2266)

**범위:** `css/style.css` — `section-experience`  
**Figma MCP:** `79:2266`  
**내용:** 오버레이 30% · content gap 64 · CTA outline (`--fsd-panel-btn-*`) · hover fill #F0F0F0

---

## 2026-06-08 — [template] tesla-redesign charging-slider pin 재수정 (JS 높이·transform px)

**범위:** `css/style.css` · `js/main.js` — charging pin  
**내용:** pin 높이 JS `vh*3` 고정 · track `translateY` px 연동 · 슬라이드 `100dvh` · `@769px` PC 전용 · calc 변수 의존 제거

---

## 2026-06-08 — [template] tesla-redesign scroll-reveal 전 섹션 확장

**범위:** `index.html` · `js/main.js` — preset `scroll-reveal`  
**내용:** hero · models 카드 · fsd · charging(slide 전환) · experience · footer 타깃 추가 · hero 즉시 등장 · charging pin 슬라이드별 reveal

---

## 2026-06-08 — [template] tesla-redesign charging-slider JS pin 고정 복구

**범위:** `css/style.css` · `js/main.js` — charging pin  
**내용:** `sticky`+`overflow-x:clip` 이슈 → JS `fixed/absolute` pin · pin 높이 `100dvh * 3` · reduced-motion에서도 PC pin 유지

---

## 2026-06-08 — [template] tesla-redesign charging-slider 슬라이드업 스크롤 연동

**범위:** `index.html` · `css/style.css` · `js/main.js` — charging pin slider  
**내용:** fade 전환 제거 → track `translateY` 스크롤 연동 · 슬라이드 세로 스택 · 아래→위 슬라이드업

---

## 2026-06-08 — [template] tesla-redesign charging-slider pin scroll · 5:5 · 100dvh

**범위:** `index.html` · `css/style.css` · `js/main.js` — `section-charging-slider` (`77:2133`)  
**Figma MCP:** slide 1–3 · 960+960 · text pad 80/120/80/240 · gap 236/16 · btn outline #212121 r2  
**내용:** pin wrapper 300dvh · sticky 100dvh · 스크롤 구간별 3슬라이드 · 50/50 고정 · auto-timer 제거 · `@768`/reduced-motion 세로 스택

---

## 2026-06-08 — [template] tesla-redesign fsd-row 버튼 텍스트·hover

**범위:** `css/style.css` — `.fsd-panel__btn`  
**내용:** 기본 텍스트 `--color-hero-text` · hover fill `--color-hero-text` + 텍스트 `--color-text`

---

## 2026-06-08 — [template] tesla-redesign fsd-row Figma 재동기

**범위:** `index.html` · `css/style.css` — `section-fsd-row` (`75:2030`)  
**Figma MCP:** 패널 960×430 · aspect-ratio · pad 80/120/80/240 · title gap 62 · overlay 30% · btn outline #f0f0f0 r2 18/500 pad 17/31  
**내용:** `max-height 430` 고정 제거 → 패널 너비 비례 높이 · hero-btn 스타일 제거 → Figma 아웃라인 CTA · title lh 55 · btn-slide-hover 마크업 제거

---

## 2026-06-08 — [template] tesla-redesign models 카드 좌측 peek 복구

**범위:** `js/main.js` — models card slider  
**내용:** 무한 스크롤 전환 시 제거됐던 leading clone 복구 · 첫 실카드(index 1) 중앙 시작 · `getBoundingClientRect` 스크롤 위치 계산

---

## 2026-06-08 — [template] tesla-redesign models 카드 타이틀·서브 중앙 정렬

**범위:** `css/style.css` — `.models-card__details` · name · desc  
**Figma MCP (`75:1970`):** model-y-title · model-y-description `textAlignHorizontal: CENTER`  
**내용:** 누락된 `text-align: center` · details `align-items: center` 반영

---

## 2026-06-08 — [template] tesla-redesign models 카드 슬라이더 무한 스크롤 · 500ms 전환

**범위:** `js/main.js` · `css/style.css` — models card slider  
**내용:** 카드 1장 전환 500ms(rAF) · 끝에서 처음으로 점프 제거 · 카드 세트 append로 앞으로만 무한 스크롤 · scroll-snap 애니 중 해제

---

## 2026-06-08 — [template] tesla-redesign models 카드 CTA Figma 재동기

**범위:** `css/style.css` — models-card CTA  
**Figma MCP (`75:1959`):** cta-group 311×56 중앙 · gap 16 · btn 165/130×56 · pad 17/31 · r2 · section gap 46 · text 636 · image 726×236  
**내용:** flex 균등배치 제거 → Figma 고정 간격·중앙 정렬 · 버튼 고정 width·stroke 반영

---

## 2026-06-08 — [template] tesla-redesign splash 제거 · models 타이틀 중앙 · 카드 자동 슬라이드

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**내용:** splash HTML/CSS/JS 제거 · `당신을 위한 테슬라` text-align center · `initModelsCardSlider` 6s auto · hover pause

---

## 2026-06-08 — [template] tesla-redesign models 섹션 수정 (자석 해제·카드 중앙·배경)

**범위:** `index.html` · `css/style.css` · `js/main.js` — `section-models` · hero magnetic  
**내용:** hero magnetic scroll 제거 · models 카드 Model Y(index 2) 중앙 정렬 + scroll-snap · `--color-page-bg: #f5f5f5` · body/models 배경 Figma 동기

---

## 2026-06-08 — [template] tesla-redesign models~footer Figma 전면 재동기

**범위:** `index.html` · `css/style.css` · `js/main.js` — hero/header 제외 main 전체  
**Figma MCP:** `75:1910` models · `75:2030` fsd-row · `77:2133` charging-slider · `79:2266` experience · `26:3` footer  
**내용:** models 가로 카드(830×551) · fsd 2열 · charging 3-slide · experience 풀블리드 · footer 한글 · `#technology` 제거 · pin-scroll/technology JS 제거 · `initChargingSlider` 추가

---

## 2026-06-08 — [template] tesla-redesign header Figma 재동기 (23:866)

**범위:** `index.html` · `css/style.css` — `section-nav` only  
**Figma MCP:** h 73 · bg `#1b1d1d` solid · pad 12/64 · logo 128×25 · menu 32×32 · nav-left 중앙 로고  
**내용:** scrim 제거 · gutter 240→header 64 · absolute 로고 → brand flex 중앙

---

## 2026-06-08 — [template] tesla-redesign FSD 섹션 배경 이미지 복원

**범위:** `index.html` · `css/style.css` · `js/main.js` — `section-fsd`  
**내용:** `fsd.mp4` → `assets/images/section-fsd.jpg` · `initFsdVideo` 제거

---

## 2026-06-08 — [template] tesla-redesign models 카드 높이·버튼 weight Figma 재동기

**범위:** `index.html` · `css/style.css` — `section-models` · CTA  
**Figma MCP (fresh):** card **830×525** (기존 418) · btn weight **500** (hero만 700)  
**내용:** aspect-ratio 830/525 · `--btn-font-weight` / `--hero-btn-font-weight` 분리

---

## 2026-06-08 — [template] tesla-redesign 섹션 2번째 CTA Figma 정합

**범위:** `css/style.css` — secondary CTA  
**Figma MCP:** btn-demo-drive · btn-view-safety · btn-learn-more — bg 20% · text 80%  
**내용:** `--btn-secondary-*` 토큰 · hero/fsd/charging/experience secondary 텍스트 opacity 반영 · models Demo Drive는 Figma 텍스트 링크 유지

---

## 2026-06-08 — [template] tesla-redesign technology active 카드 확장 60%

**범위:** `css/style.css` — `section-technology`  
**내용:** active 카드 flex 비율 1.3 → **1.6** (+60%)

---

## 2026-06-08 — [template] tesla-redesign models 헤더 상하 패딩 Figma 반영

**범위:** `css/style.css` — `.models__header`  
**Figma MCP:** `8:49` models-header · `paddingTop/Bottom: 26` · title↔desc gap 24  
**내용:** `--models-header-pad-y` 추가 · 섹션 pad-y 62는 pin-sticky 유지

---

## 2026-06-08 — [template] tesla-redesign technology 카드 expand 인터랙션

**범위:** `index.html` · `css/style.css` · `js/main.js` — `section-technology`  
**내용:** 기본 1번 카드 active(+30% flex) · hover 시 해당 카드 확장·나머지 축소 · active만 desc 노출 · 이미지 scale active 연동

---

## 2026-06-08 — [template] tesla-redesign models pin 휠 스무스 보간

**범위:** `js/main.js` · `css/style.css` — `section-models`  
**내용:** `scrollBy` 직접 호출 제거 → 가상 offset + rAF lerp · wheel delta 정규화 · transform 서브픽셀 연동

---

## 2026-06-08 — [template] tesla-redesign hero magnetic scroll 복구

**범위:** `js/main.js` — `initHeroMagneticScroll` · `initModelsPinScroll`  
**내용:** models pin `onWheel`이 hero 구간까지 가로채던 버그 수정 · hero magnetic `stopImmediatePropagation` 복구

---

## 2026-06-08 — [template] tesla-redesign technology wrap 중앙 정렬

**범위:** `css/style.css` — `section-technology` · `section-shell--gutter`  
**내용:** gutter shell `margin-inline: auto` · header/cards `max-width: container-max` 중앙 정렬 (experience 패턴)

---

## 2026-06-08 — [template] tesla-redesign models 헤더 겹침·pin 휠 전역 연동

**범위:** `css/style.css` · `js/main.js` — `section-models`  
**내용:** sticky `top: header-height` · pin 높이 `100dvh - header` · pin 구간 휠 어디서든 `scrollBy`로 카드 진행 · `overscroll-behavior: contain` 제거

---

## 2026-06-08 — [template] tesla-redesign technology 카드 wrap 내부 정적 배치

**범위:** `index.html` · `css/style.css` · `js/main.js` — `section-technology`  
**Figma MCP:** `23:732` — `technology-cards` 1440×352 · 카드 464×352 ×3 · gap 24  
**내용:** `is-bleed-x`·가로 스크롤·드래그 제거 → `section-shell--gutter` 안 3열 flex · 카드 비율 464/352

---

## 2026-06-08 — [template] tesla-redesign models 섹션 고정형 카드 스크롤

**범위:** `index.html` · `css/style.css` · `js/main.js` — `section-models`  
**내용:** 진입 시 섹션 sticky 고정 · 좌측 카피 고정 · 우측 카드 track `translateY` 연동 · 스크롤 완료 후 FSD 진행 · PC only · `@768`/`reduced-motion` fallback

---

## 2026-06-08 — [template] tesla-redesign Figma 전면 정합 (카피·타이포·레이아웃)

**범위:** `index.html` · `css/style.css`  
**Figma MCP:** `portfolio_tesla_main` `1:25`

**models (`10:432`):** 2×2 grid → 좌 타이틀+desc / 우 세로 카드 4장 · `Find your Tesla` · FSD desc · 카드 830×418 · Model Y/Cybertruck/Model Y/Model X  
**타이포:** 섹션 title 48/700 · band desc 16/500 · technology card 29 UPPER · experience title 48  
**패딩:** technology·experience pad-y 62  
**hero controls:** wrap 정렬 (`section-shell-gutter-max`)

---

**범위:** `index.html` · `css/style.css` · `js/main.js` — `section-fsd`  
**내용:** `section-fsd.jpg` → `assets/videos/fsd.mp4` · muted loop autoplay

---

## 2026-06-08 — [template] tesla-redesign header 메뉴 아이콘 wrap 정렬

**범위:** `css/style.css` — `.header__inner`  
**내용:** `padding-inline` · `max-width`를 `section-shell--gutter`와 동일(`--side-padding` · `--section-shell-gutter-max`) — 메뉴 아이콘 wrap 우측 끝 정렬

---

## 2026-06-08 — [template] tesla-redesign hero 3슬라이드 영상 고정

**범위:** `index.html`  
**내용:** hero **3장 고정** — Model Y `hero-bg.mp4` · Model 3 `hero-bg2.mp4` · Cybertruck `hero-bg3.mp4` (4번째 슬라이드·추가 컨텐츠 없음)

---

## 2026-06-08 — [template] tesla-redesign 대소문자 Figma 정합

**범위:** `css/style.css`  
**내용:** Figma `textCase: UPPER` 섹션 타이틀·footer col title에 `text-transform: uppercase` (HTML 카피는 Figma 원문 유지)

| 요소 | Figma 원문 | 표시 |
|------|-----------|------|
| models / fsd / charging / technology / experience title | sentence·title case | ALL CAPS |
| footer col title | Vehicles 등 | ALL CAPS |
| hero·카드명·버튼·본문 | Figma 그대로 | 변경 없음 |

---

## 2026-06-08 — [template] tesla-redesign hero 화살표 클릭 수정

**범위:** `css/style.css` — `.hero__controls`  
**내용:** `z-index` 2→4 (`.hero__inner`가 동일 z-index·전체 높이로 화살표 클릭 차단)

---

## 2026-06-08 — [template] tesla-redesign footer 로고 PNG 수정

**범위:** `index.html` — footer  
**내용:** `img-tesla-logo-footer.jpg` → `img-tesla-logo.png` (header와 동일 PNG)

---

## 2026-06-08 — [template] tesla-redesign FSD·charging 배경 가시성 조정

**범위:** `css/style.css` — `--fsd-overlay`  
**내용:** overlay `0.6` → `0.38` (section-fsd · section-charging 배경 이미지 더 보이게)

---

## 2026-06-08 — [template] tesla-redesign hero 자석 스크롤

**범위:** `index.html` · `js/main.js` — hero → models  
**내용:** PC · hero 최상단 휠 down 1회 → models 스냅 · models 진입선 휠 up → hero top 복귀 · splash 중·스냅 중 lock · reduced-motion 대응

---

## 2026-06-08 — [template] tesla-redesign hero Model 3 비디오 연결

**범위:** `index.html` — hero slide 2  
**내용:** Model 3 슬라이드 `hero-bg2.mp4` 영상으로 교체 (기존 `card-model-3.jpg` 정지 이미지)

---

## 2026-06-08 — [template] tesla-redesign header·footer 로고 원복

**범위:** `index.html` · `css/style.css`  
**내용:** header `img-tesla-logo.png` · footer `img-tesla-logo-footer.jpg` (221×44) · splash만 SVG 유지 · invert filter 제거

---

## 2026-06-08 — [template] tesla-redesign technology drag-scroll 수정

**범위:** `index.html` · `css/style.css` — `section-technology`  
**내용:** 스크롤 컨테이너를 `technology__track` → `technology__viewport`로 이동 (`width:max-content` 트랙은 overflow 불가)

---

## 2026-06-08 — [template] tesla-redesign models 카드 높이 Figma 반영

**범위:** `css/style.css` · `index.html` — `section-models` (`10:432`)  
**Figma:** card `707×482` (기존 652) · section pad-y `62` (기존 90) · grid gap 24/26 유지

---

## 2026-06-08 — [template] tesla-redesign 인터랙션 3종 연결

**범위:** `index.html` · `css/style.css` · `js/main.js`  
**preset:** `scroll-reveal` · `hero-progress-slider` · `button-text-slide-hover`  
**내용:**
- hero 3슬라이드(Model Y 영상 · Model 3 · Cybertruck) · 6s autoplay · progress bar · prev/next · hover pause · splash 후 부트
- 섹션별 scroll-reveal 1타깃(models header · fsd · charging · technology · experience)
- CTA `btn-slide-hover` 마크업(hero · models · fsd · charging · experience)

---

## 2026-06-08 — [template] tesla-redesign Figma 타이포·간격 정합 수정

**범위:** `css/style.css` — 전 섹션  
**내용:** Figma MCP 수치 재대조 · line-height/padding/gap 토큰 보정 · hero `space-between`+gap40 · FSD/charging flex 중앙 정렬  
**Figma:** `1:244` · `10:432` · `10:363` · `10:375` · `23:732` · `10:423` · `26:3`

---

## 2026-06-08 — [template] tesla-redesign footer PC 구현

**범위:** `index.html` · `css/style.css` — `footer` (`26:3`)  
**내용:** 로고·설명 · 4열 nav · divider · copyright / legal · `img-tesla-logo-footer.jpg`  
**Figma:** BG `#0d0d0d` · main pad 64/240 · nav col gap 26 · bottom pad 24/240

---

## 2026-06-08 — [template] tesla-redesign section-experience PC 구현

**범위:** `index.html` · `css/style.css` — `section-experience` (`10:423`)  
**내용:** `experience-content.jpg` 카드 1440×460 r16 · `#000` 60% overlay · 중앙 카피 · Order Now / Demo Drive  
**Figma:** pad 80/240 · text–CTA gap 74 · title 68/700 UPPER · desc 22/500

---

## 2026-06-08 — [template] tesla-redesign section-technology PC 구현

**범위:** `index.html` · `css/style.css` — `section-technology` (`23:732`)  
**내용:** Technology That Moves · 가로 카드 3종 · 좌 gutter 정렬·우측 peek(2172 트랙) · 텍스트 `#f0f0f0`  
**Figma:** pad 80/240 · head–cards gap 62 · card r16

---

## 2026-06-08 — [template] tesla-redesign section-charging PC 구현

**범위:** `index.html` · `css/style.css` — `section-charging` (`10:375`)  
**내용:** `section-charging.jpg` · FSD와 동일 feature-band 패턴 · desc Figma `\n` 2곳 → `<br>` · Find Charging / Learn More  
**Figma:** 750px · overlay 60% · title 52/700 · desc 22/500

---

## 2026-06-08 — [template] tesla-redesign section-fsd PC 구현

**범위:** `index.html` · `css/style.css` — `section-fsd` (`10:363`)  
**내용:** `section-fsd.jpg` full-bleed 750px · `#1b1d1d` 60% overlay · 카피 중앙 · FSD desc Figma `\n` → `<br>`  
**Figma:** pad 80/240 · title 52/700 · desc 22/500 · btn 56h r6 gap 16

---

## 2026-06-08 — [template] tesla-redesign section-models PC 구현

**범위:** `index.html` · `css/style.css` — `section-models` (`10:432`)  
**내용:** FIND YOUR TESLA 헤더 · 2×2 카드 · 버튼 Figma 정합 · card desc Figma `U+2028` → `<br>` · radius 클리핑 보정  
**Figma:** BG `#1b1d1d` · pad 90/240 · grid gap 24/26 · card 707×652 r16

---

## 2026-06-08 — [template] tesla-redesign section-nav · section-hero PC 구현

**범위:** `index.html` · `css/style.css` · `js/main.js` — header(`23:866`) · hero(`1:244`)  
**내용:** nav 93px · hero **뷰포트 가로·세로 꽉 참** (`100dvh - header`, video `object-fit: cover`) · Model Y 카피 · CTA · 화살표  
**Figma:** gutter nav 64px · hero content 1440 · 카피 `#f0f0f0` · overlay `#000` 30% · 화살표 세로 중앙

---

## 2026-06-08 — [template] tesla-redesign 폴더·스캐폴드 생성

**범위:** `templates/tesla-redesign/` — `index.html` · `css/style.css` · `js/main.js` · `assets/` · `_source/`  
**내용:** PC 메인 구현 전 폴더 생성 · 모바일 보류 · 에셋 사용자 투입 대기

---

## 2026-06-08 — [template] tesla-redesign 에셋 정리·매핑

**범위:** `templates/tesla-redesign/assets/` · `_source/`  
**내용:** 사용자 투입 원본 → Figma 슬롯명으로 `assets/images`·`icons`·`videos` 정리 · 원본 PNG 3종 `_source/images/` 보관

| 납품 경로 | 용도 |
|-----------|------|
| `assets/videos/hero-bg.mp4` | section-hero — Model Y |
| `assets/videos/hero-bg2.mp4` | section-hero — Model 3 |
| `assets/videos/hero-bg3.mp4` | section-hero — Cybertruck |
| `assets/images/card-model-y.jpg` | models — Model Y |
| `assets/images/card-model-3.jpg` | models — Model 3 |
| `assets/images/card-cybertruck.jpg` | models — Cybertruck |
| `assets/images/card-model-s.jpg` | models — Model S |
| `assets/images/section-fsd.jpg` | section-fsd 배경 |
| `assets/images/section-charging.jpg` | section-charging 배경 |
| `assets/images/card-autonomy.jpg` | technology — Autonomy |
| `assets/images/card-robotics.jpg` | technology — Robotics |
| `assets/images/card-vehicle-software.jpg` | technology — Vehicle Software |
| `assets/images/experience-content.jpg` | section-experience |
| `assets/images/img-tesla-logo.png` | nav 로고 |
| `assets/images/img-tesla-logo-footer.jpg` | footer 로고 |
| `assets/icons/icon-hamburger-menu.png` | nav 햄버거 |
| `assets/icons/icon-scroll-prev.png` · `icon-scroll-next.png` | models 캐러셀 화살표 |

**`_source/images/`:** `source-supercharger-night.png` · `source-cybertruck-wasteland.png` · `source-model3-coastal-clean.png`

---

## 2026-06-09 — [rules] 모바일 @768 gutter · 칼럼 · shell 패턴

**파일:** `35-responsive.mdc` · `30-figma-to-code.mdc` · `40-template-code-style.mdc` · `50-qa-checklist.mdc` · `20-harness-workflow.mdc` · `_docs/figma-to-code-guide.md` · `_docs/qa-checklist.md`  
**내용:** @768 gutter 토큰 override · 1열 기본 · shell 이중 pad 금지 · full-bleed 구조 · 로고 bbox interim · 슬라이더 peek · mobile preview→이식 워크플로 · 390px 시작선 QA  
**근거:** smile-clinic 모바일 이식·gutter 통일·header 로고 정렬 재발 방지

---

## 2026-06-09 — [template] smile-clinic header 로고 좌측 정렬

**범위:** `css/style.css` · `css/mobile.css` — `.header__logo img`  
**수정:** PNG bbox 좌측 투명 여백(128/1448) 보정 `margin-left` — 본문 `--side-padding` 시작선과 artwork 정렬

---

## 2026-06-09 — [template] smile-clinic 모바일 @768 최종 이식

**범위:** `css/style.css` @768 · `js/main.js` · `index.html` · `about-*.html`  
**CSS:** `mobile.css` 기준값 → `@media (max-width: 768px)` 병합 · `--mo-*` 변수  
**HTML:** 모바일 nav · strength/place 슬라이더 · team picker(듀얼 마크업)  
**JS:** `mobile.js` → `main.js` (`isMobileViewport` · magnetic slider · nav · team · place)  
**프리뷰:** `*-mobile.html` + `mobile.css` 유지 (검수용)

---

## 2026-06-09 — [template] smile-clinic 모바일 footer · reservation 풀 bleed

**footer:** `index-mobile.html` · stacked cols · `--mo-*` · logo 154px  
**reservation:** card → full-bleed panel

---

**파일:** `index-mobile.html` · `css/mobile.css` · panel min-h 420 · full-width CTA ×2 · `--mo-*` 타이포

---

**파일:** `index-mobile.html` · `css/mobile.css` · intro stack · step cards · `--mo-fs-caption` 13px

---

**파일:** `index-mobile.html` · `css/mobile.css` · `--mo-*` 기준 · panel 400px · card radius · nav hidden

---

**타이포:** Figma `37:2249` → `mobile.css` `--mo-fs-*` · **레이아웃:** header/hero/signature 1차 PASS  
**기록:** `decision-log.md` · `qa-log.md` · 이후 섹션·`@768` 동일 변수 사용

---

## 2026-06-09 — [template] smile-clinic mobile.css 타이포 가이드 적용 (header · hero · signature)

**Figma `37:2249`:** display ×0.75 · heading ×0.825 · body min 16px → `--mo-fs-*` 변수 · header nav/hero/signature/card/more 일괄 반영

---

**방식:** `index-mobile.html` + `css/mobile.css` + `js/mobile.js` — PC `style.css` `@768` 미수정

**Figma:** PC `13:436` 스케일(타이포 가이드 `37:2249`: title ×0.75→32px · body 16px) · 캔버스 `37:2251`(390px)은 레퍼런스 프레임(내용 비어 있음) — PC 카피·에셋 기준 1차 구현

| 항목 | 1차 값 |
|------|--------|
| 헤더 | h 64 · logo 154px · 햄버거 · drawer nav |
| 히어로 | min-h 640 · pad-bottom 64 · title 32 · desc 16 · btn 16/16×28 |

**확인:** `index-mobile.html` @390px · 말씀 주시는 대로 수정 예정

---

## 2026-06-09 — [template] smile-clinic about-place Figma 재동기화

**Figma:** `84:202` · 갤러리 이미지 r=0(기존 `--radius-card` 제거) · 캡션 lh 29.2px · card figure `margin:0`

**검증 PASS:** hero→본문 86px · head→갤러리 120px · grid gap 36/10 · img→캡션 16 · col 473.33 · 본문→footer 120px

---

## 2026-06-09 — [template] smile-clinic about-team Figma 재동기화

**Figma:** `81:106` · card gap 50 · body 778px · pad-top 101 · headline Gowun · lh/간격 bbox · creds `#1f1b18` gap 3

---

## 2026-06-09 — cross-template: Wrap 내 DOM · box-model QA 규칙

**배경:** smile-clinic intro — shell 1440 PASS인데 `<figure>` UA margin으로 이미지만 좁음 · 여러 차례 QA 누락

| 파일 | 조치 |
|------|------|
| `50-qa-checklist.mdc` · `_docs/qa-checklist.md` §2-2 | Wrap children · figure reset · edge 정렬 · 콘텐츠 묶음 QA 5항 |
| `30-figma-to-code.mdc` | MCP 보고 `Wrap children` x/w 필수 |
| `20-harness-workflow.mdc` | 섹션 QA에 box-model 단계 · Figma 보고 Wrap children |
| `40-template-code-style.mdc` | `.section-shell` / `.sub-section figure` reset 패턴 |
| `_logs/failure-log.md` | figure UA margin 재발 방지 |
| `templates/smile-clinic/css/style.css` | `.sub-section figure { margin-inline:0; width:100% }` |

---

## 2026-06-09 — [template] smile-clinic 서브 QA · Figma 수치 보정

**수정:** 탭 pill gap 46 · pad 102 · 비활성 탭 색 `#1f1b18` · intro 사진→리드 78px · 2단 gap 49px · place 헤드→갤러리 120px · team `<br>` 줄바꿈

---

## 2026-06-09 — [template] smile-clinic 서브 3페이지 구현 · 에셋 매칭

**템플릿:** `smile-clinic` · Figma `1:223` · `81:106` · `84:202`

| 페이지 | 파일 | 에셋 매칭 |
|--------|------|-----------|
| 병원소개 | `about-intro.html` | hero `sub_header_bg.png` · 본문 `sub_philosophy_card.jpg` |
| 의료진 | `about-team.html` | hero `sub_header_bg.png` · 안정윤 `sub_doctor_2.png` · 홍서윤 `sub_doctor_1.png` |
| 둘러보기 | `about-place.html` | hero `sub_header_bg.png` · `83-5` 라운지 · `83-4` 진료실A · `83-3` 진료실B · `83-2` 상담실 · `83-1` 시술실 · `83` 회복실 |

| CSS | `.sub-hero` · `.sub-about` · `.sub-team` · `.sub-place` · `@768` stack |

**비고:** Figma 카피(의료진 본문 이름 불일치)는 MCP 문자열 그대로 · `image 52.jpg`·`assets/source/`는 미사용

---


**배경:** smile-clinic SIGNATURE·STRENGTH BG 누락 — MCP dump에 `#fffefd` 있었으나 fill 없음을 인접 섹션과 동일로 오해

| 파일 | 조치 |
|------|------|
| `30-figma-to-code.mdc` | 「MCP JSON 분석」 — JSON 우선 · fills vs backgroundColor · Section BG 6단계 · 인접 표 · overlay 분리 |
| `20-harness-workflow.mdc` | Figma 보고에 JSON 파싱·Section BG node-id·인접 표 필수 |
| `40-template-code-style.mdc` | `--color-bg-{section}` 분리 · 단일 `--color-bg` 통합 금지 |
| `50-qa-checklist.mdc` · `_docs/qa-checklist.md` | 인접 Section BG 경계 QA |
| `_docs/figma-to-code-guide.md` | MCP 수신 후 체크리스트 확장 |
| `_logs/failure-log.md` | 재발 방지 항목 추가 |

---


**템플릿:** `smile-clinic` · **Figma:** `1TG429c3chdZ8SpFrmHwUN` · `13:464` · `13:507`

| 항목 | Figma MCP | 기존 | 조치 |
|------|-----------|------|------|
| SIGNATURE (`section-treatment`) | 프레임 fill 없음 → 메인 `#f9f9f9` 상속 | `#fffefe` (strength와 동일) | `--color-bg-signature: #f9f9f9` · `.signature` |
| OUR STRENGTH (`section-strength`) | SOLID `#fffefd` | `#fffefe` | `--color-bg-strength: #fffefd` · `.strength` |
| RESERVATION (`13:560`) | SOLID `#fffefd` (strength와 동일) | `#fffefe` | `.reservation` → `--color-bg-strength` |
| Strength 패널 overlay | IMAGE + `#3f3a35` **opacity 40%** · r=277 | `rgba(63,58,53,0.4)` | 변경 없음 (일치) |
| Signature 카드 overlay | IMAGE + GRAD black 24.4%→90% | gradient + opacity 20% | 변경 없음 (일치) |
| Signature 헤드 타이포 | `#1f1b18` (밝은 BG 위) | 동일 | 변경 없음 |

**비고:** 카드 슬라이더 영역 썸네일은 카드·그radient로 어둡게 보이나, 섹션·슬라이더 프레임(`13:481`·`13:482`)에는 별도 black fill 없음.

---

## 2026-06-08 — [template] smile-clinic image-scale-hover · reservation 패딩

| 항목 | 조치 |
|------|------|
| SIGNATURE | `image-scale-hover` — 카드 `::before` bg scale 1.05 |
| STRENGTH | `image-scale-hover` — panel `::before` bg scale 1.05 |
| Reservation | Figma `13:561` — pad **100/80** · copy↔actions **gap 46** · **fix:** `.scroll-reveal`가 `display:block`로 flex 덮어씀 → panel `display:flex` 유지 |

---

**규칙:** 섹션 head = label/title/desc 개별 · **카드·패널 = 컨테이너 1개** (내부 텍스트 중복 금지)

| 섹션 | scroll-reveal 대상 |
|------|-------------------|
| Hero | title · desc · btn (개별) |
| Signature | head 텍스트 · nav · 카드×6(밴드 진입 시 순차) · more |
| Strength | head 텍스트 · **panel** |
| Process | intro 텍스트 · **step 카드×4** |
| Reservation | **panel** (CTA 박스 전체) |

---

## 2026-06-08 — [template] smile-clinic scroll-reveal 적용

**템플릿:** `smile-clinic` · preset: **`scroll-reveal`**

| 항목 | 조치 |
|------|------|
| HTML | `#hero` · `#signature` · `#strength` · `#process` · `#reservation` + `.scroll-reveal` |
| CSS | mainstream 동일 preset 블록 · `prefers-reduced-motion` 즉시 표시 |
| JS | `initScrollReveal` — hero 로드 순차 · 섹션 IntersectionObserver · 150/180ms stagger |
| 제외 | header/footer · signature **카드**(track `transform` 충돌) |

---

## 2026-06-08 — [rules] cross-template 7패턴 규칙 패치

**범위:** smile-clinic 작업에서 도출된 **템플릿 공통** 재발 방지

| 패턴 | 반영 파일 |
|------|-----------|
| Figma overlay/gradient fills | `30-figma-to-code.mdc` · MCP `Overlays:` · QA |
| Logo PNG bbox | `30-figma-to-code.mdc` · `40-template-code-style.mdc` · QA |
| Shell · gutter · inner | `30-figma-to-code.mdc` · `40-template-code-style.mdc` |
| Full-bleed horizontal scroll | `30-figma-to-code.mdc` · `40` · `50-qa-checklist.mdc` (#9) |
| F5 scroll top | `40-template-code-style.mdc` · `45-interaction-patterns.mdc` · QA |
| Section head tokens | `30` · `40` · QA |
| Section BG MCP 1줄 | `30` · `20-harness-workflow.mdc` · `_docs/figma-to-code-guide.md` |

**로그:** `_logs/failure-log.md` cross-template 항목 추가

---

## 2026-06-08 — [template] smile-clinic Signature 배경·카드 gradient

**템플릿:** `smile-clinic`

| 항목 | Figma MCP | 조치 |
|------|-----------|------|
| Signature 섹션 BG | `section-strength`와 동일 `#fffefe` · `section-treatment` 프레임 자체 fill 없음 | `.signature { background: var(--color-bg) }` · `--color-bg: #fffefe` |
| Signature 카드 overlay | `GRADIENT_LINEAR` 0→100% black · **opacity 20%** · y 24.4%→90% | `.signature-card::after` |

---

## 2026-06-08 — [template] smile-clinic 공통 레이아웃·간격 통합

**템플릿:** `smile-clinic`

| 항목 | 조치 |
|------|------|
| `:root` | `--section-head-gap` · `--section-label-gap` · `--section-title-gap` · `--gap-md` · `--radius-card` · `--surface-card-pad-*` · `--nav-circle-size` |
| 공통 클래스 | `.section-shell` · `.section-shell--gutter` · `.section-head` · `.section-head--spaced` · `.section-head--center` · `.circle-nav-btn` · `.surface-card` · `.is-bleed-x` |
| 간격 통일 | SIGNATURE·STRENGTH head→본문 **64px** (slider `padding-top` 제거) · label→title **16px** |
| HTML | `index.html` 공통 클래스 적용 |

---

## 2026-06-08 — [template] smile-clinic PC 메인 Figma 정합 수정

**템플릿:** `smile-clinic`

| 항목 | 수정 |
|------|------|
| Hero | 하단 정렬 · 그라데이션 26% 수준 · CTA 투명+흰 테두리 |
| Signature | 1920 슬라이더 풀블리드 · 카드 desc `#e9e9e9` · 전체보기 아이콘 색 |
| Strength | 타원 내부 좌우 nav + 중앙 카피 |
| Process | STEP 배지(10% brown bg) · SUIT step title |
| Footer | 좌(오시는길+대표전화) / 우(진료시간) · 구분선 · phone SUIT |
| Header | logo + nav/CTA 그룹 gap 31 |

---

## 2026-06-08 — [template] smile-clinic PC 메인 구현

**템플릿:** `smile-clinic`

| 항목 | 조치 |
|------|------|
| `index.html` | Hero · Signature · Strength · Process · Reservation · Footer |
| `css/style.css` | Figma 수치 기반 PC 스타일 · 768px 기본 대응 |
| `js/main.js` | Signature 슬라이더 4장 · loop 없음 |
| assets | 제공 이미지·아이콘 매칭 반영 |

**미구현:** 소개 3페이지 · 모바일 디자인 확정본 · GNB 1depth 하위 페이지

---

## 2026-06-08 — [template] smile-clinic 폴더·스캐폴드 생성

**템플릿:** `smile-clinic`

| 항목 | 조치 |
|------|------|
| 페이지 | `index.html` · `about-intro.html` · `about-team.html` · `about-place.html` |
| 스타일·스크립트 | `css/style.css`(:root 토큰) · `js/main.js` |
| 납품 에셋 | `assets/images/` · `assets/icons/` |
| 소스 수령 | `_source/images/` · `_source/icons/` (사용자 에셋 투입용) |

**미구현:** 헤더·푸터·섹션 HTML/CSS/JS · 모바일

---

## 2026-06-09 — [project] start.bat · stop.bat 제거

- 루트 `start.bat` · `stop.bat` 삭제
- `47-placeholder-images.mdc` · dev-images.js 주석 갱신

---

| 파일 | 내용 |
|------|------|
| `templates/index.html` | 텍스트 링크 목록 (mainstream) |
| `_harness/package-delivery.js` | 패키징 시 `_delivery/index.html` 동기화 |
| rules · delivery-guide | 허브·신규 템플릿 `<li>` 추가 절차 |

---

**범위:** rules · docs · `_delivery/` · `_harness/package-delivery.js`

| 항목 | 조치 |
|------|------|
| 명칭 | `imweb`/`cafe24` 플랫폼 폴더·규칙명 제거 → `_delivery/{slug}/` |
| 규칙 | `60-imweb-delivery.mdc` → `60-delivery.mdc` |
| 가이드 | `imweb-delivery-guide.md` → `delivery-guide.md` |
| 패키징 | `node _harness/package-delivery.js mainstream` |
| 산출 | `_delivery/mainstream/` — preview·dev 파일 제외 |

**개발본:** `templates/mainstream/` 유지 (preview·dev 검수 가능)

---

## 2026-06-09 — [template] mainstream dev-images → assets 납품 이미지 전환

**템플릿:** `mainstream`

| 항목 | 조치 |
|------|------|
| 이미지 | `_dev-images` 현재 매핑 14슬롯 → `assets/images/{key}.jpg` 복사 |
| HTML | `data-placeholder` 제거 · src `.jpg` 통일 |
| dev 연동 | `index.html` manifest/dev-images/placeholders 스크립트 제거 · `enabled: false` |
| 스크립트 | `js/sync-dev-to-assets.js` (재실행용) |

**유지 assets:** header/footer 로고 · news-bg · cta-bg · icons (Figma export)

---

## 2026-06-09 — [template] mainstream index 최종본·GNB 닫기 아이콘

**템플릿:** `mainstream`

| 항목 | 조치 |
|------|------|
| GNB 닫기 | 오버레이 위 z-index · 헤더 배경 transparent · 토글 동일 위치 |
| index | `start.bat` → `index.html` · 모바일 `overflow-x: clip` (100vw bleed) |
| preview | 섹션 검수용 유지 · 상단 `index` 링크 |

| 파일 | `css/style.css` · `start.bat` · `preview.html` |

---

## 2026-06-09 — [template] mainstream 모바일 works · faq · cta · footer

**템플릿:** `mainstream` · Figma `198:231` · `198:245` · `198:300` · `198:306` · `@768`

| 섹션 | Figma | 조치 |
|------|-------|------|
| stats blue | 390 풀폭 | `100vw` bleed 보정 |
| works | 4칸 세로 450px · caption 항상 노출 | @768 · accordion off |
| faq | 6문항 세로 · 330px · 19/18 | @768 (1920 카피) |
| cta | 390 풀폭 · 27/20 · btn 67px | @768 |
| footer | 로고→정보→SNS→패밀리 순 | @768 reorder |

| 파일 | `css/style.css` · `js/main.js` · `preview.html` default 전체 |

---

## 2026-06-09 — [template] mainstream 모바일 stats · news (Figma mainstream_390)

**템플릿:** `mainstream` · Figma `200:354` · `198:194` · `@768`

| 섹션 | Figma | 조치 |
|------|-------|------|
| stats | 2×2 · 30/18 · value 32 · visual 594px | @768 CSS · overlap 제거 |
| news | pad 60/16 · card 세로 3장 gap 26 · 20/16 | @768 CSS · nav 숨김 · 슬라이더 off |

| 파일 | 내용 |
|------|------|
| `css/style.css` | stats · news @768 |
| `js/main.js` | 모바일 news 슬라이더 skip · `preview=stats-news` |
| `preview.html` | Stats+News 탭 · default |

**카피·사진:** 1920 · `_dev-images` 유지

---

## 2026-06-09 — [template] mainstream 모바일 hero · story (Figma mainstream_390)

**템플릿:** `mainstream` · Figma `198:141` · `198:154` · `@768`

| 섹션 | Figma | 조치 |
|------|-------|------|
| hero | KV 560px · copy CENTER · 15/32/16 · pager 없음 | @768 CSS · pager 숨김 |
| story | pad 60/16 · head 30/18 · card 340×480 가로 스크롤 gap 2 | @768 CSS |

| 파일 | 내용 |
|------|------|
| `css/style.css` | hero · story @768 |
| `js/main.js` | `?preview=hero-story` 검수 모드 |
| `preview.html` | **고정 검수 URL** — 탭·390/전체 전환 (북마크용) |
| `start.bat` | 기본 오픈 `preview.html` |

**검수:** `http://127.0.0.1:8080/preview.html` (주소 고정 · 상단 탭으로 범위 변경)

---

## 2026-06-09 — [template] mainstream 모바일 GNB (Figma mainstream_390_menu)

**템플릿:** `mainstream` · **섹션:** header / GNB · Figma `198:128` · `201:480`

| 파일 | 내용 |
|------|------|
| `index.html` | mo 로고·menu/close PNG · nav close 버튼 |
| `css/style.css` | @768 전체화면 오버레이 · 26/600 · gap 26 · header 80px |
| `js/main.js` | open/close 통합 · close 버튼 |
| `assets/images/` | header-logo-mo/menu/close.png |

**기준:** 카피 1920 유지 · PC GNB 변경 없음

---

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
