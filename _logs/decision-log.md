# Decision Log

## 2026-07-11 — `docs/` 아카이브

| # | 결정 |
|---|------|
| 1 | 루트 `docs/` → `_archive/docs/` |
| 2 | 사람용 활성 가이드는 `_docs/`만 |

---

## 2026-07-11 — `_review_exports/` 삭제

| # | 결정 |
|---|------|
| 1 | 카페24 규칙 검수 export `_review_exports/` **삭제** (재보관 안 함) |

---

## 2026-07-11 — `_dev-images/` 삭제

| # | 결정 |
|---|------|
| 1 | 루트 `_dev-images/` **삭제** (재보관 안 함) |
| 2 | 사진은 테마 `assets/images/`에 직접 배치 |
| 3 | `47-placeholder-images` 규칙 → archive |

---

## 2026-07-11 — reference-harness 복제 다운로드본 삭제

| # | 결정 |
|---|------|
| 1 | `_archive/reference-harness/` **삭제** (아카이브 유지 안 함) |
| 2 | 복제·미러 파이프라인 재개 안 함 |
| 3 | 규칙 `83`은 `.cursor/rules/archive/`에만 보관 |

---

## 2026-07-11 — WP 납품을 작업 폴더 dist/ 로

| # | 결정 |
|---|------|
| 1 | 루트 `_delivery/` · `_delivery-wp/` **제거** |
| 2 | 납품 = `wordpress/{slug}/dist/{slug}.zip` 만 (풀린 복사본 없음) |
| 3 | 구 정적·아임웹 납품 → `_archive/delivery/` |
| 4 | `wordpress/*/dist/` git 무시 |

---

## 2026-07-11 — 루트 `templates/` 제거

| # | 결정 |
|---|------|
| 1 | 아카이브 후 남긴 자리표시자(`index.html` · `README` · `.gitkeep`) **삭제** |
| 2 | 정적 내용은 `_archive/templates/`만 유지 · 루트 `templates/` 재생성 안 함 |

---

## 2026-07-11 — WordPress 블록 테마 중심 · 동결 트랙 아카이브

| # | 결정 |
|---|------|
| 1 | 기본 납품 = **블록 테마 (FSE)** · Figma → 섹션 구현/QA → WP ZIP |
| 2 | 컨텐츠 폭 **신규부터 1600** (기존 1440 유지) |
| 3 | MO 작업 = **모바일만** 독립 수정 |
| 4 | 레퍼런스 URL 파악 = **명시 요청 시에만** (복제 실험 중단) |
| 5 | `_reference-harness` → `_archive/reference-harness/` |
| 6 | 정적 `templates/*` · `cafe24_shop` → `_archive/templates/` |
| 7 | Cafe24/Reference 규칙 `80`~`84` → `.cursor/rules/archive/` |
| 8 | 활성 도구 폴더는 `_harness` 유지 (얇게) |

---

## 2026-07-11 — [static] templates 아카이브 이동

| # | 결정 |
|---|------|
| 1 | 정적 작업물 → `_archive/templates/` 보관 (삭제 아님) |
| 2 | ~~`templates/cafe24_shop/` 현위치 유지~~ → **아카이브로 함께 이동** (후속 결정) |
| 3 | 활성 개발은 WordPress `wordpress/{slug}/` |

---

## 2026-07-11 — [repo] 공용 SVG 아이콘 풀 `_icons/`

| # | 결정 |
|---|------|
| 1 | 루트 `_icons/` — `_dev-images`와 같은 공용 자산 풀 |
| 2 | 하위: `ui/` · `social/` · `brand/` |
| 3 | 사용 시 각 테마/템플릿 `assets/icons/`로 복사 (직접 `../../` 링크 금지) |
| 4 | 단순 화살표는 1 SVG + CSS rotate 재사용 |

---

## 2026-07-11 — [wordpress] Template A Blocks (FSE) 메인 1차

| # | 결정 |
|---|------|
| 1 | 사용자 요구: 워드프레스 기본처럼 **디자인(사이트 편집기)** 로 수정 |
| 2 | 클래식 `template-a` 유지 · 신규 블록 테마 `template-a-blocks` |
| 3 | 1차 범위: **메인(홈)만** — 헤더·히어로·인트로·특징·CTA·푸터 |
| 4 | 서브 페이지는 이후 단계 |

---

## 2026-07-11 — [static] template-homepage · 모바일 코드·토큰 정리

| # | 결정 |
|---|------|
| 1 | `@768 :root`에 `--mo-*` 타이포·카드 패딩 토큰을 **PASS 확정값**으로 통합 (`.page-home` 중복 선언 제거) |
| 2 | `--color-surface-overlay-soft` 추가 · `media-card`·사업영역 오버레이 공용 |
| 3 | `@1024`에도 로고·카드·drawer용 `--mo-*` 최소 세트 선언 |
| 4 | 죽은 `is-qa-review` CSS 삭제 (HTML 미사용 · QA PASS 완료) |
| 5 | 화면 수치 변경 없음 — 정리만 |

---

## 2026-07-11 — Template A 관리자 콘텐츠 시스템

- `template_a_content` 단일 옵션의 중첩 배열로 헤더·푸터·홈·서브페이지·공지 UI 문구와 이미지를 관리한다.
- 플러그인/ACF 없이 테마 전용 `Template A 콘텐츠` 관리자 메뉴를 사용한다.
- `notice` 글 제목·본문·날짜는 기존 CPT에 유지하고, 주변 화면 문구와 이미지만 테마 옵션으로 관리한다.
- 옵션이 비어 있으면 테마 기본값과 기존 번들 이미지를 사용해 기존 화면을 유지한다.

## 2026-07-11 — Template A WordPress 정적 포팅

- 트랙: WordPress Classic Theme
- slug / 경로: `template-a` / `wordpress/template-a/`
- 원본: `templates/template-homepage/` (읽기 전용)
- CMS 범위: CPT `notice`만 사용하며 히어로·GNB·섹션 카피는 PHP에 고정
- URL: 페이지 레지스트리로 11개 페이지 자동 생성, 공지 목록은 `/notice/` CPT archive 사용
- 홈 주요 소식: 최신 공지 3건을 `WP_Query`로 출력
- 원본 `privacy.html`의 깨진 한글은 동일한 5개 항목 구조를 유지해 정상 문구로 복구

---

## 2026-07-11 — [static] template-homepage · 모바일 라운드 8px 서브 확장

| # | 결정 |
|---|------|
| 1 | `--mo-radius-card: 0.5rem` → `@768 :root` (메인·서브 공통) |
| 2 | 카드·이미지 figure 일괄 적용 (service/process/portfolio/business/intro/directions/ceo/contact 등) |

---

## 2026-07-11 — [static] template-homepage · 서비스 3페이지 모바일

| # | 결정 |
|---|------|
| 1 | 대상: `service-solution` · `service-process` · `service-portfolio` (`@768`만) |
| 2 | intro 타이포 정리 · 카드/스텝 `min-height` 해제 후 비율(카드 16:9 · 포트폴리오 4:3) |
| 3 | 패딩·라운딩·본문 br 해제 · 스택은 기존 `@1024` 유지 |
| 4 | PC 원본 유지 |

---


## 2026-07-11 — [static] template-homepage · 오시는길 모바일

| # | 결정 |
|---|------|
| 1 | `about-directions.html` 모바일 검수 시작 |
| 2 | 서브히어로는 공통 토큰 적용됨 · 본문(지도·주소) 검수 대기 |

---


## 2026-07-11 — [static] template-homepage · CEO 메시지 모바일

| # | 결정 |
|---|------|
| 1 | `@768` 사진 너비 = **텍스트와 동일** (셸 안 100% · max-width 해제) · PC 유지 |
| 2 | 섹션 단위 검수 진행 중 |

---


## 2026-07-10 — [static] template-homepage · 서브 공통 모바일 (@768)

| # | 결정 |
|---|------|
| 1 | **공통 (전 서브 page-hero):** 높이 275 · 상하 패딩 · 카피 max 280 · 타이틀 24/lh1.35 · 강제 br 해제 |
| 2 | **공통 (greeting-intro · service-intro):** 워터마크 키움·lh1 · 타이틀/본문 강제 br 해제 |
| 3 | **greeting-intro 이미지:** 16:9 (해당 섹션만) |
| 4 | **전용 유지:** vision 타이포 · history 세로 나열 (about-greeting만) |
| 5 | about-greeting QA 모드 해제 · 전체 섹션 복귀 |

---


## 2026-07-10 — [static] template-homepage · 회사소개(about-greeting) 모바일 QA

| # | 결정 |
|---|------|
| 1 | 폰 검수: `is-qa-review` + `data-qa-show` · **헤더·푸터 유지** |
| 2 | 순서: hero → intro → vision → history → footer → all |
| 3 | **1차 PASS** · 공통 항목은 서브 전체에 반영 · QA 모드 해제 |
| 4 | QA 섹션 숨김·히어로 조정 = **`@768` 모바일만** · PC는 전체 원본 |

---


## 2026-07-10 — [static] template-homepage · 모바일 햄버거 메뉴

| # | 결정 |
|---|------|
| 1 | `@1024` 이하 전체화면 drawer · GNB 2depth 아코디언 · CTA |
| 2 | 햄버거↔X 토글 · body scroll lock · Escape/리사이즈 닫기 |
| 3 | Figma 모바일 메뉴 시안 없음 — 기존 mega 링크 구조 재사용 |

---

## 2026-07-10 — [static] template-homepage · 메인 모바일 1차 PASS

| # | 결정 |
|---|------|
| 1 | **메인 모바일 1차 전체 PASS** (사용자 확정) — 헤더~빠른상담까지 |
| 2 | 보류: (검수 시) btn-top 별도 · ~~햄버거 메뉴 패널~~ → **구현됨** |
| 3 | QA 모드(`is-qa-review`) 해제 · 전체 화면 복귀 |

---

## 2026-07-10 — [static] template-homepage · 메인 모바일 타이포

| # | 결정 |
|---|------|
| 1 | **범위:** `.page-home` + `@768`만 · 서브페이지 미적용 |
| 2 | PC→모바일 가독 스케일 (Figma 모바일 없음) · body **floor 16** |
| 3 | 예: hero 80→32 · section 46→26 · heading 30→18 · intro/cta 28 · stat 36 · lh 역할별 |

---

## 2026-07-10 — [static] template-homepage · 모바일 헤더 (로고+햄버거)

| # | 결정 |
|---|------|
| 1 | `@1024` 이하 헤더: **로고 + 햄버거만** · CTA·GNB 숨김 |
| 2 | 햄버거 메뉴 패널·동작은 **추후** · 지금은 `pointer-events: none` (눌러도 안 열림) |

---

## 2026-07-10 — [static] template-homepage · 메인 모바일 QA (섹션 단위)

| # | 결정 |
|---|------|
| 1 | 폰 검수: `body.is-qa-review` + `data-qa-show`로 **한 섹션씩** 공개 |
| 2 | 순서: header → hero → intro → features → services → reviews → faq → cta → insight → footer → quick-consult → all |
| 3 | 사용자 PASS마다 다음 `data-qa-show`로 진행 · 전부 PASS 후 QA 모드 제거 |
| 4 | **header:** 로고+햄버거 · CTA 숨김 · 메뉴 패널 추후 |
| 5 | **hero:** 텍스트 세로·가로 중앙 · 타임라인 풀폭·바닥 붙임 |
| 6 | **intro**~**footer** · **services** 2×2 · **reviews** 모바일 1줄 스와이프 → **quick-consult 진행 중** |

---

## 2026-07-10 — [static] template-homepage · 최종 코드 정리

| # | 결정 |
|---|------|
| 1 | 죽은 CSS 삭제: `year-label--sm` · `item--no-month` · `@768 .hero__lead-br` |
| 2 | HTML 유틸 병행 BEM 훅 제거: CTA·pill·title·filter·media img/overlay 별칭 |
| 3 | body와 동일하던 page-* BG 5규칙 · 미사용 `--header-logo-menu-gap` 삭제 |
| 4 | JS 훅(`portfolio-filter__tab` · mega · `news-view__list-btn` order)은 유지 |

---

## 2026-07-10 — [static] template-homepage · 서브 본문 shell 1600 통일

| # | 결정 |
|---|------|
| 1 | 서브페이지 **본문·서브히어로** → `.section-shell.section-shell--gutter` (**1600**) · 메인·푸터와 동일 |
| 2 | **헤더**만 1440(`site-header__shell`) 유지 · bar/mega는 full viewport |
| 3 | `.content-shell` 제거 · 연혁 캐러셀 inset도 layout(1600) 토큰으로 맞춤 |

---

## 2026-07-10 — [static] template-homepage · 푸터 shell 1600 복구

| # | 결정 |
|---|------|
| 1 | **푸터** 컨텐츠 → `.section-shell.section-shell--gutter` (**1600** · 메인 섹션과 동일) |
| 2 | ~~서브페이지 본문만 `.content-shell` (1440)~~ → **이후 1600 통일** |
| 3 | 공통 클래스 정리(1~5) 때 푸터를 1440로 묶은 것 → **회귀**로 정정 |

---

## 2026-07-10 — [static] template-homepage · 코드 정리 (죽은 CSS·선택자)

| # | 결정 |
|---|------|
| 1 | 미사용 CSS 삭제: `sub-cta*` · 메인 `contact__*` / `section--contact` |
| 2 | 공유 유틸 선택자에서 구 BEM 별칭 제거 — HTML에 붙은 `btn-pill`/`btn-cta`/`section-title`/`filter-tab`/`media-card`만 사용 |
| 3 | 레이아웃 전용 규칙(`news-view__list-btn` order 등)은 BEM 유지 |

---

## 2026-07-10 — [static] template-homepage · 토큰 연결 (색·라운드·글자)

| # | 결정 |
|---|------|
| 1 | 반복 하드코딩 색 → 기존 color 토큰 연결 (`#fff`·뱃지·보더·본문색) |
| 2 | pill 보더 `#dbdbdb` → `--color-border-default`(`#d9d9d9`)로 통일 (미세 차이) |
| 3 | 라운드 추가: `--radius-md` 0.75 · `--radius-pill` 999 · 기존 `--radius-lg` |
| 4 | 반복 글자: heading-xl / heading-md / body-lg 사이즈만 토큰 연결 |
| 5 | 리뷰 호버 `#4a6cf7`·레이아웃 1600/1440·섹션 전용 clamp는 유지 |

---

## 2026-07-10 — [static] template-homepage · 공통 클래스 정리 (1~5)

| # | 결정 |
|---|------|
| 1 | **pill:** `.btn-pill` · `--accent`(채움 호버) · `--muted`(지도 링크) |
| 2 | **CTA:** `.btn-cta` · `--header` / `--footer` 사이즈 |
| 3 | **미디어:** `.media-card` + `__img` / `__overlay` (service·portfolio 공유) |
| 4 | **타이틀·탭:** `.section-title`(--center/--left) · `.filter-tab` |
| 5 | **shell:** 서브 본문 → `.content-shell` (1440) · 헤더 bar/mega만 `.site-header__shell` · 메인·**푸터** gutter는 `.section-shell--gutter`(1600) — **이후 서브도 1600 통일** |

---

## 2026-07-10 — [static] template-homepage · 상단으로 가기 (btn-top)

| # | 결정 |
|---|------|
| 1 | 참고: [HDC홀딩스](https://hdc-holdings.com/ko) `.btn-top` — 우측 하단 흰 원 + 검정 ↑ |
| 2 | 히어로/서브히어로 지나야 표시 (`is-active`) · 클릭 시 `scrollTo(0,0)` |
| 3 | 메인 빠른상담 바 위에 자동 올림 (`:has(.quick-consult:not(.is-hidden))`) |
| 4 | 전 HTML 페이지 공통 |

---

## 2026-07-10 — [static] template-homepage · preset 1~4 적용

| # | 결정 |
|---|------|
| 1 | `stats-counter` — 메인 `#services` 통계 4카드 · duration 1.6s · 접미사(`+` `%` `년`)는 별도 unit 유지 |
| 2 | `image-scale-hover` — `service-card` · `portfolio-card` · `business-item` 이미지 · scale 1.05 · fine pointer only |
| 3 | `hover-tone` — 메인 insight 행 · `news.html` 리스트 행 opacity 0.85 · 리뷰는 기존 BG 호버 유지 |
| 4 | `button-text-slide-hover` — `cta__btn` · `insight__more-btn` · `news-view__list-btn` |

---

## 2026-07-10 — [static] template-homepage · 고객지원 페이지

| # | 결정 |
|---|------|
| 1 | GNB「공지사항」→ `news.html` (Figma `806:2060` · 화면명 **주요 소식**) |
| 2 | GNB「문의하기」→ `contact.html` (Figma `806:2208` · 화면명 **프로젝트 문의**) — **구현 완료** |
| 3 | 메인 `#contact` 폼 섹션 제거 · 문의는 전용 페이지로 |
| 4 | 글 상세 → `news-view.html` (Figma `817:2672` · 프레임명 **news-view**) · 목록/메인 첫 글 연결 · 이전·다음 `#` 목업 |
| 5 | 개인정보처리방침 → `privacy.html` (Figma `817:2623`) · **서브히어로 없음** · 푸터 연결 |

---

## 2026-07-10 — [static] template-homepage · S05 reviews 레이아웃

| # | 결정 |
|---|------|
| 1 | S05 = **`infinite-card-marquee` 유지** (2줄 무한 마퀴 ←/→) — 2×2 그리드 **아님** |
| 2 | Figma `763:1742`에서 반영할 것 = **카드 높이 422** · **섹션 padT160 / padB100** · r24 · 원고 |
| 3 | 2026-07-10 「마퀴→2×2」결정은 본 항목으로 **철회** |

---

## 2026-07-10 — [static] template-homepage · GNB 포트폴리오 제거

| # | 결정 |
|---|------|
| 1 | 상단 GNB「포트폴리오」메뉴 및 메가메뉴 해당 컬럼(전체 보기·기업 홈페이지·병원·클리닉) **제거** |
| 2 | GNB = 회사소개 · 서비스 · 고객지원 (3열) · 메가 CSS 3컬럼 |
| 3 | 제작 사례는 서비스 하위 `service-portfolio.html` (Figma `802:1958`) |

---

## 2026-07-10 — [active-track] WordPress 기본 · Cafe24·Reference·Static 동결

| # | 결정 |
|---|------|
| 1 | **현재 기본 트랙:** WordPress · 작업 경로 `wordpress/{slug}/` |
| 2 | **개발 방식:** Figma MCP → 승인 → **WP Classic Theme 직접 구현** (하드코딩 섹션 + `notice` CPT 기본) |
| 3 | **Harness 절차:** `20-harness-workflow.mdc` 리듬 유지 · 구현 출력만 WP (`70`~`72`) |
| 4 | **`_harness/`:** WP 패키징·검증 도구함 — `package-delivery-wp.js` · `verify-wordpress-static.js` |
| 5 | **동결 (삭제 X):** Static 신규 · Cafe24 A/B · Reference C — `_reference-harness/` 신규 mirror·케이스 추가 중단 |
| 6 | **SoT 1장:** `_docs/active-track.md` · router · context-guide · project-overview 동기화 |

**재개 시:** 본 항목 아래에 `[active-track: …]` 갱신 후 해당 트랙 규칙 적용.

---

## 2026-07-09 — [static] template-homepage · shell · 진행 방식

| # | 결정 |
|---|------|
| 1 | **Figma:** `template-homepage-1920` (`763:1905` · [Dev](https://www.figma.com/design/XSWmFlkkzLChor3uaf7veF/%ED%8F%AC%ED%8F%AC%ED%8F%AC%ED%8F%AC%ED%8F%B4?node-id=763-1905&m=dev)) |
| 2 | **slug:** `template-homepage` · 경로 `templates/template-homepage/` |
| 3 | **Shell:** Figma 1440 → **콘텐츠 1600px** @1920 · 좌우 gutter **160px** (`clamp(16px, 8.3333vw, 160px)`) |
| 4 | **헤더·푸터:** Figma 미설계 → **맨 마지막** 섹션 일괄 |
| 5 | **진행:** 섹션 단위 구현 → 사용자 PASS → 다음 (S01 히어부터) |
| 6 | **onetenth8 working-copy 덮어쓰기 중단** — 본 템플릿은 정적 신규 |
| 7 | **S02 intro** — Creative 08 동일 scroll text-fill (GSAP pin+scrub) |
| 8 | **디자인 토큰** — 사용자 제공 color·typography → `:root` |
| 9 | **Header:** Figma `770:2656` · `gnb-full-expand` · 딤 20% · 닫기 220ms |
| 10 | **Header shell:** 콘텐츠 **1440px** @1920 · gutter **240px** · 로고–메뉴 gap **250px** · GNB 슬롯 **120px** · 항목 gap **66px** |
| 11 | **Footer:** Figma `770:2979` · shell 1440/240 · BG `#181719` |
| 12 | **Header interaction:** scroll auto-hide (down hide · up show) |
| 13 | **S01:** `hero-progress-slider` · **S02:** GSAP text-fill · **S04:** `drag-scroll` |
| 15 | **about-greeting:** Figma `770:2111` · `about-greeting.html` · shell **1440/240**(header 동일) |
| 16 | **about-greeting S04:** `year-carousel` — 연도 클릭 시 1번 자리로 슬라이드 · 비활성 opacity 20% |
| 17 | **about-directions:** Figma `796:5` · `about-directions.html` · shell 1440/240 |
| 18 | **about-ceo:** Figma `796:211` · `about-ceo.html` · 사진 pill 383×500 · text gap 106 |
| 19 | **service-solution:** Figma `799:774` · `service-solution.html` · shell 1440/240 · 모자이크 카드 · CTA 제외 |
| 20 | **service-list:** Figma `802:1702` · `service-list.html` · 가로 카드 4종 · CTA 제외 |
| 21 | **service-process:** Figma `802:1826` · `service-process.html` · STEP 01–07 · CTA 제외 |

**preset 기록:**
```
[template template-homepage] header: gnb-pattern — gnb-full-expand
[template template-homepage] greeting-history: preset — year-carousel
[template template-homepage] header: interaction — scroll auto-hide (down hide · up show)
[template template-homepage] S01: preset — hero-progress-slider
[template template-homepage] S04: preset — drag-scroll
[template template-homepage] S03-S09: preset — scroll-reveal
[template template-homepage] S05 reviews: catalog — infinite-card-marquee
```

---

## 2026-07-08 · [reference-harness] 브라우저 복제 = 한 번에 사이트 전체

**확정:** URL/데모 복제 요청 시 단계 분할(캡처만→나중에 미러) **금지**.  
**기준:** `site-clone-fidelity.md` · 시각·페이지 이동·인터랙션 동일(preview+live proxy 허용).  
**등급:** 여전히 Track C · skin-zip과 혼동 금지 · 납품 승격 금지.

---

## 2026-07-07 — [wordpress] 365-hes-womens-clinic 킥오프 · Figma 기준 확정

| # | 결정 |
|---|------|
| 1 | **트랙:** WordPress · slug **`365-hes-womens-clinic`** · `wordpress/365-hes-womens-clinic/` |
| 2 | **디자인 기준:** Figma `365hes-homepage-1920` (`614:4`) **우선** — `docs/365hes-womens-clinic-project-spec.md`는 참고(디자인 과정에서 삭제·수정 반영) |
| 3 | **Figma 파일:** `XSWmFlkkzLChor3uaf7veF` (포포포포폴) |
| 4 | **1차 메인 섹션:** S00 Header · S01 Hero · S02 Today status(공지) · S03~S09 · S10 Footer — 생애주기·임신흐름·의료진 3카드 등 **설계서 항목은 Figma에 없으면 미구현** |
| 5 | **CMS 1단계:** `notice` CPT · 메인 최신 **1건** → S02 공지 바 |
| 6 | **호스팅:** 카페24 뉴아우토반 WordPress (`70-wordpress.mdc` 기본값) |
| 7 | **로컬 확인:** Laragon 등 — `README.md` 절차 |

---

## 2026-07-07 — [wordpress] 365-barun-dental GNB · `gnb-item-panel` 확정

| # | 결정 |
|---|------|
| 0 | **GNB 패턴 ID:** `gnb-item-panel` (`46` · `45` · `interaction-presets-guide`) |
| 1 | **1depth 6개:** 병원소개 · 임플란트 · 사랑니 발치 · 일반진료 · 턱관절 치료 · 소식 + CTA 상담·예약 |
| 2 | **2depth 트리:** 병원소개 4 · 임플란트 6 · 사랑니 1 · 일반진료 4 · 턱관절 1 · 소식 2 |
| 3 | **URL:** 전 항목 `#` placeholder |
| 4 | **모바일 GNB:** 보류 — `@1024` 햄버거 + 중첩 `.site-header__dropdown` |
| 5 | **2depth 1개** (사랑니 · 턱관절) → 1depth 직링크 · 패널 없음 |
| 6 | **2depth 2개 이상** → 해당 1depth `li` 안 **개별 패널** · hover 트리거 |
| 7 | **1depth gap:** `clamp(27px, 3.8021vw, 73px)` — Figma `583:54` 기준 **+15px** |
| 8 | **딤:** opacity **20%** (`--header-dim-opacity: 0.2`) · 헤더 **아래만** · 패널 열릴 때 |
| 9 | **닫기:** mouseleave · 딤·바깥 클릭 · `Escape` · **220ms** 지연 |
| 10 | **패널 위치 (Figma annotation):** `position: fixed` · `headerInner.bottom − 12px` overlap · `trigger.left − 16px` |
| 11 | **패널 스타일:** pad 30/18 · radius 8 · shadow `0 8px 24px rgba(0,0,0,0.12)` · BG `#fff` |
| 12 | **활성 표시:** 1depth `font-weight: 600` (`.is-open`) |
| 13 | **한 시점에 패널 1개만** — 다른 1depth hover 시 이전 패널 닫힘 |

**2depth 패널 유무**

| 1depth | 2depth 수 | 패널 |
|--------|-----------|------|
| 병원소개 | 4 | O |
| 임플란트 | 6 | O |
| 사랑니 발치 | 1 | X (직링크) |
| 일반진료 | 4 | O |
| 턱관절 치료 | 1 | X (직링크) |
| 소식 | 2 | O |

> **이전:** 2026-07-07 중 `gnb-full-expand`로 전환했으나 사용자 요청으로 **`gnb-item-panel` 복원** (Figma `583:54` 개별 박스 스펙).

---

## 2026-07-07 — [project] `scroll-reveal` 등장 단위 기본값 (전 템플릿)

| # | 결정 |
|---|------|
| 1 | **카드**(사진·패널 BG·캡션 프레임) → **루트 1개** `scroll-reveal` · 배경+내용 **함께** 등장 |
| 2 | **섹션 헤드** → label · title 줄 · lead 문장 **각각** |
| 3 | **비카드 리스트 행** → 번호 · 제목 · 본문 **각각** |
| 4 | 카드 루트에 `scroll-reveal` 시 **자식에 동일 클래스 금지** |
| 5 | JS band/batch 일괄 재생 **금지** — 개별 observe + 문서순 큐 |
| 6 | 규칙: `46-interaction-presets.mdc` · `45-interaction-patterns.mdc` · `_docs/interaction-presets-guide.md` · QA `50` · `_docs/qa-checklist.md` §4 |
| 7 | 참고 구현: `wordpress/365-barun-dental/` |

---

## 2026-07-06 — [wordpress] 365-barun-dental 인터랙션 (추천 preset · 사용자 승인)

| # | 결정 |
|---|------|
| 1 | **scroll-reveal** — philosophy · treatments · process · digital · space · reservation (hero 제외) |
| 1-1 | **scroll-reveal 단위** — **카드**(배경+내용 한 덩어리) · **섹션 헤드·본문**(라벨·제목 줄·문장) 세부 등장 |
| 2 | **hover-tone** — GNB 링크 · 푸터 약관 링크 |
| 3 | **image-scale-hover** — treatments 피처드·미디어 카드 · space 갤러리 |
| 4 | **button-text-slide-hover** — header CTA · hero CTA ×2 · reservation CTA ×2 |
| 5 | **유지** — digital 탭 클릭·opacity·이미지 교환 (Figma 주석, catalog 외) |

---

## 2026-07-06 — [wordpress] 365-barun-dental 신규 테마 (header · footer)

| # | 결정 |
|---|------|
| 1 | slug **`365-barun-dental`** · 경로 `wordpress/365-barun-dental/` |
| 2 | Figma `포포포포폴` · `00_page-home` (`XSWmFlkkzLChor3uaf7veF` · node `453:330`) |
| 3 | 1차 범위: **00_Header + 11_Footer** · 본문 섹션 보류 |
| 4 | **Shell:** header guttered 1440 + pad 240 · footer inner **720** + pad **600** (1920 기준) |
| 5 | 로고: Figma VECTOR 미수출 → 임시 SVG · 납품 전 교체 |

---

## 2026-06-08 — [template] hd-ec 인터랙션 (사용자 승인 · 순차 적용)

| # | 결정 |
|---|------|
| 1 | **순서:** ① `scroll-reveal` → ② `hover-tone` → ③ `image-scale-hover` → ④ `stats-counter` → ⑤ `button-text-slide-hover` |
| 2 | **적용:** 한 preset씩 구현 → 사용자 확인 → 다음 |
| 3 | **유지:** projects `drag-scroll` (기존) |
| 4 | **보류 해제:** vision → `scroll-pin-scale-card` (2026-06-08 사용자 승인) |

```
[template hd-ec] vision: catalog — scroll-pin-scale-card
[template hd-ec] business: preset — scroll-reveal · hover-tone (CTA) · image-scale-hover · button-text-slide-hover (CTA)
[template hd-ec] projects: preset — scroll-reveal · drag-scroll · image-scale-hover
[template hd-ec] newsroom: preset — scroll-reveal · hover-tone · button-text-slide-hover
[template hd-ec] investor: preset — scroll-reveal · hover-tone · image-scale-hover (panel) · stats-counter
[template hd-ec] careers: preset — scroll-reveal · hover-tone · button-text-slide-hover
[template hd-ec] header: interaction — scroll auto-hide (down hide · up show)
[template hd-ec] footer: preset — hover-tone
```

---

## 2026-06-08 — [template] hd-ec 신규 템플릿 (header · hero)

| # | 결정 |
|---|------|
| 1 | slug **`hd-ec`** · 경로 `templates/hd-ec/` |
| 2 | Figma `portfolio_HD_E&C_main` (`XSWmFlkkzLChor3uaf7veF` · node `199:951`) |
| 3 | 1차 범위: **header + hero 정적** · pin/scrub 등 인터랙션 **보류** |
| 4 | PC @1920 우선 · 모바일 768은 nav 숨김만 |
| 5 | **Shell:** hero full-bleed · vision **뷰포트 풀폭 + pad 40px** (max-width cap 없음) · header guttered |

### 레이아웃 그리드 (Figma @1920 · 사용자 확정)

| 항목 | 값 |
|------|-----|
| 열 개수 | **12** |
| 유형 | 늘리기(Stretch) · 열 너비 자동 |
| 마진(좌우) | **40px** |
| 간격(Gutter) | **24px** |
| 콘텐츠 폭 | **1840px** (1920 − 40×2) |
| 1열 너비 | **≈131.33px** ((1840 − 11×24) ÷ 12) |
| 섹션 간격 | **180px** (`Frame 68` itemSpacing) |

---

## 2026-06-08 — [template] skhynix-redesign 인터랙션 (Package B · 사용자 승인)

| # | 결정 |
|---|------|
| 1 | **스크롤:** `scroll-behavior: smooth` (full-page wheel snap **미적용**) |
| 2 | **preset:** `scroll-reveal` · `stats-counter` · `hover-tone` · `drag-scroll`(sustainability) · news filter/pagination JS |

```
[template skhynix-redesign] products: preset — scroll-reveal, hover-tone
[template skhynix-redesign] heritage: preset — scroll-reveal, stats-counter
[template skhynix-redesign] sustainability: preset — scroll-reveal, drag-scroll
[template skhynix-redesign] news: preset — scroll-reveal, hover-tone · filter/pagination JS
[template skhynix-redesign] investor: preset — scroll-reveal, hover-tone
```

---

## 2026-06-08 — [template] skhynix-redesign 신규 템플릿

| # | 결정 |
|---|------|
| 1 | slug **`skhynix-redesign`** · 경로 `templates/skhynix-redesign/` |
| 2 | Figma `portfolio_skhynix_main` (`XSWmFlkkzLChor3uaf7veF` · node `98:2344`) |
| 3 | 범위: **PC 메인 1페이지** (nav · hero · products · heritage · sustainability · news · investor · footer) |
| 4 | 모바일 — **추후 진행** (768px 대응 보류) |
| 5 | 에셋: 사용자 `_source/` 투입 후 `assets/`로 정리·매핑 |

---

## 2026-06-08 — [template] tesla-redesign 신규 템플릿

| # | 결정 |
|---|------|
| 1 | slug **`tesla-redesign`** · 경로 `templates/tesla-redesign/` |
| 2 | Figma `portfolio_tesla_main` (`XSWmFlkkzLChor3uaf7veF` · node `1:25`) |
| 3 | 범위: **PC 메인 1페이지** (nav · hero · models · fsd · charging · technology · experience · footer) |
| 4 | 모바일 — **추후 진행** (768px 대응 보류) |
| 5 | 에셋: 사용자 `_source/` 투입 후 `assets/`로 정리·매핑 |
| 6 | **section-hero 비주얼 = 영상** (`assets/videos/hero-bg.mp4`) · 정적 배경 이미지 없음 |
| 7 | **인터랙션 (2026-06-08 사용자 승인):** `scroll-reveal` · `hero-progress-slider` · `button-text-slide-hover` |
| 8 | **hero → models 자석 스크롤** (PC · 휠 1회 스냅 · 2026-06-08 사용자 요청) |
| 9 | **models 섹션 고정형 카드 스크롤** (PC · sticky + 우측 카드 연동 · 2026-06-08 사용자 요청) |

```
[template tesla-redesign] hero: preset — hero-progress-slider (3장 · 6s · loop · progress · arrows)
[template tesla-redesign] sections: preset — scroll-reveal (models·fsd·charging·technology·experience)
[template tesla-redesign] CTA: preset — button-text-slide-hover
```

---

## 2026-06-08 — [template] smile-clinic 신규 템플릿

| # | 결정 |
|---|------|
| 1 | slug `smile-clinic` · 경로 `templates/smile-clinic/` |
| 2 | 범위: PC 메인 + 소개 3페이지(병원소개·의료진·둘러보기) + GNB 2depth |
| 3 | 진료과목·장비·이벤트·예약 페이지 **미포함** |
| 4 | Signature 슬라이더: 카드 6장(4장 반복) · **loop** · PC 3장 노출 |
| 5 | 모바일 디자인 **추후** — 768px 대응은 디자인 확정 후 → **2026-06-09 타이포·1~3섹션 기준값 확정** (`decision-log` 해당 항목) |
| 8 | **모바일 검증:** PC `@media` 전 · `index-mobile.html` + `css/mobile.css` 섹션별 구현 → PASS 후 `style.css` 반응형 이식 (2026-06-09) |
| 6 | **인터랙션:** PC 메인 — `scroll-reveal` (2026-06-08 사용자 승인) |
| 7 | **인터랙션:** SIGNATURE · STRENGTH — `image-scale-hover` (2026-06-08 사용자 승인) |

---

## 2026-06-09 — [template] smile-clinic 모바일 타이포·레이아웃 기준값 확정

**Figma:** `37:2249` · **사용자 PASS** · 구현: `templates/smile-clinic/css/mobile.css`

### 타이포 배율 (PC @1920 → mobile @390)

| 역할 | PC | 배율 | mobile px | CSS 변수 |
|------|-----|------|-----------|----------|
| 큰 제목 (hero·section title) | 46 | × **0.75** | **35** | `--mo-fs-display` |
| 중간 제목 (card title 등) | 30 | × **0.825** | **25** | `--mo-fs-heading` |
| 본문 (desc·card desc) | 20 / 22 | min **16** | **16** | `--mo-fs-body` · `--mo-fs-body-lg` |
| UI·버튼·nav | 18 | min **16** | **16** | `--mo-fs-ui` · `--mo-fs-nav` |
| section label | 17 | 유지 | **17** | `--mo-fs-label` |

**line-height:** display **1.42** · body **1.58** · heading **1.35** · body-lg **1.45**

### 레이아웃 (1차 PASS — header · hero · signature)

| 항목 | 값 |
|------|-----|
| `--side-padding` | 20px · **모바일 `@768` `.section-shell` 좌우 gutter 기본값** |
| `--header-height` | 64px |
| hero `min-height` | 560px |
| `--section-padding-y` | 64px |
| `--signature-card-w` | 272px |
| signature card h | 380px |

### 운영

| # | 결정 |
|---|------|
| 1 | 이후 모바일 섹션·`@768` 이식 시 **위 변수·배율 그대로** — 임의 px 금지 |
| 2 | 프리뷰: `index-mobile.html` · 최종 이식: **`style.css` `@768`** (2026-06-09 완료) |

---

## 2026-06-09 — 납품 경로 플랫폼 중립화

### 배경
호스팅·납품 대상이 아임웹에서 일반 웹 호스팅으로 변경. 규칙·하네스에서 `imweb`/`cafe24` 등 플랫폼 지정 명칭 제거.

### 결정

| # | 결정 |
|---|------|
| 1 | 납품 경로 `_delivery/{slug}/` (플랫폼 하위 폴더 없음) |
| 2 | 규칙 `60-delivery.mdc` · `_docs/delivery-guide.md` |
| 3 | 패키징 `node _harness/package-delivery.js {slug}` — dev·preview 제외 |
| 4 | 개발본 `templates/{slug}/` 유지 — preview·dev 검수 계속 |

---

## 2026-06-04 — Imweb 전용 하네스 구조 리셋

### 배경
크몽 판매용 웹 템플릿 제작 프로젝트를 Cafe24·공통 모듈·전역 토큰 혼합 구조에서 정리하고, 아임웹 전용 독립 완성형 템플릿 제작 체계로 전환한다.

### 결정 사항

| # | 결정 | 이유 |
|---|------|------|
| 1 | **Imweb-only** — Cafe24 미사용 | 판매·납품 대상이 아임웹으로 확정 |
| 2 | **`_modules` 제거** | 공통 모듈 시스템 미사용 |
| 3 | **`_tokens` 제거** | 전역 디자인 토큰 시스템 폐기 |
| 4 | **템플릿 독립 완성형** | 각 템플릿이 자체 HTML·CSS·JS·assets·`:root` 스타일 보유 |
| 5 | **`.cursorrules`, `AGENTS.md` → `_docs/legacy/`** | 루트 단일 규칙·레거시 문서는 참고용으로만 보관 |
| 6 | **`.cursor/rules/*.mdc`로 Cursor 규칙 재편** | 하네스·Figma·QA·Git 워크플로를 규칙 파일로 분리 |
| 7 | **`_harness`, `_logs`, `_docs`, `_delivery/imweb` 구조 생성** | 작업·기록·가이드·납품 경로 분리 |
| 8 | ~~`templates/template-c` 유지~~ → **legacy 이동** (아래 결정) | 당시 임시 결정, 이후 `templates/` 비움 원칙으로 변경 |
| 9 | **push는 사용자 명시 요청 시만** | 원격 반영은 디자이너가 직접 통제 |

### 영향
- `template-a`, `template-b`, `_common`, `_imgs` → `_docs/legacy/`로 이동
- 신규 작업은 `templates/{slug}/` + `.cursor/rules` + `_harness` 흐름을 따른다.

---

## 2026-06-04 — Figma 프레임명 기반 템플릿 slug

### 결정
- 신규 템플릿의 **이름 기준 = Figma MCP 최상위 프레임명**
- Cursor가 프레임명을 감지 → kebab-case slug로 정규화 **제안** → **사용자 승인 후** `templates/{slug}/` 생성
- 정규화: 소문자 · `template_` 접두어 제거 · 공백·`_` → `-` · `[a-z0-9-]`만

### 이유
- Figma·폴더·납품 경로(`_delivery/imweb/{slug}/`) 이름을 일치시켜 혼선 방지
- 임의 slug·무문의 폴더 생성 방지

### 영향
- `10-project-structure.mdc`, `30-figma-to-code.mdc`, `_docs` 가이드에 반영
- ~~기존 `template-c` 당장 rename 보류~~ → **legacy 이동으로 대체** (아래 결정)

---

## 2026-06-04 — `templates/` 비움 · template-c legacy 이동

### 결정
- **`templates/`는 활성 작업 공간** — 리셋 후 기존 템플릿 폴더를 두지 않는다.
- `templates/template-c/` → `_docs/legacy/templates/template-c/` 이동 (삭제 아님)
- 신규 템플릿만 Figma 프레임명 승인 후 `templates/{slug}/`에 생성

### 이유
- Figma 프레임명 기반 slug 체계와 혼선 방지
- `template-c`는 참고용 legacy, 현재 작업 기준이 아님

### 영향
- `templates/.gitkeep`만 유지 · `start.bat`는 첫 신규 템플릿 생성 후 수정

---

## 2026-06-08 — 반응형 breakpoint·QA 뷰포트 확정

### 결정
- Figma **desktop 1920px** 기준 구현
- **필수 breakpoint:** 1024px(태블릿) · 768px(모바일)
- 768px 이하: 가로 배치 → 세로 스택 · hover-only UI → 터치 대체·비활성화
- **QA 뷰포트 5종:** 1920 · 1440 · 1024 · 768 · 390px
- 규칙 파일: `.cursor/rules/35-responsive.mdc`

### 이유
- 기존 active rules는 768px만 명시 — 태블릿·QA 뷰포트·터치 기준 부족

### 영향
- `00-core`, `20-harness-workflow`, `30-figma-to-code`, `40-template-code-style`, `45-interaction-patterns`, `50-qa-checklist` · `_docs/figma-to-code-guide.md` · `_docs/qa-checklist.md` · `_harness/README.md` 갱신

---

## 2026-06-08 — mainstream 템플릿 작업 기준

### 결정
| 항목 | 내용 |
|------|------|
| Figma | `mainstream` (`146:943`) · slug `mainstream` |
| GNB 카피 | Figma MCP 기준 (스크린샷과 동일 확인) |
| header | Auto Layout 전환됨 — 구현 시 MCP 재확인 |
| hero 슬라이더 | ~~1차 **디자인만**(정적) · 인터랙션 **추후**~~ → **`hero-progress-slider` 연결** (2026-06-08) |
| 반응형 | `35-responsive.mdc` 적용 |

### 영향
- `templates/mainstream/` 섹션별 구현 시 위 기준 따름

---

## 2026-06-08 — mainstream 섹션 QA 루프 복귀

### 결정
- **3섹션 일괄·관망 모드 종료** — header~works **소급 QA·qa-log 기록** 완료
- **이후 섹션(faq·cta·footer):** 구현 → **섹션 QA → qa-log PASS → 사용자 PASS** 필수
- gap · align · fluid — `50-qa-checklist` · bbox 교차 검증 적용

### 이유
- story align · works gap 등 **QA 생략**으로 사용자 확인 전까지 미검출
- 규칙(`20-harness-workflow`)과 실제 진행 불일치

### 영향
- `_logs/qa-log.md` mainstream 섹션 6건 추가
- `failure-log` works gap 항목 · rules gap bbox 보강

---

## 2026-06-08 — QA: 섹션별 검수 항상 필수

### 결정
- **구현 방식**(섹션 1개 / 일괄·풀)과 무관하게 **섹션별 QA + qa-log 1건씩** 필수
- 일괄·풀: 구현만 한 번에 → **섹션 QA × N** → **페이지 통합 QA** 1회
- **금지:** 통합 QA만 하고 섹션 QA 생략

### 이유
- 사용자 확정 — story align · works gap 등 **섹션 단위** 검수 없으면 누락

### 영향
- `20-harness-workflow.mdc` · `_docs/qa-checklist.md` 갱신

---

## 2026-06-08 — 사용자 커뮤니케이션 (디자이너)

### 결정
- 사용자 **비개발 UI 디자이너** — Agent 보고는 **짧·쉬운 말·Figma 용어** 우선
- 개발 용어는 **쉬운 뜻 병기** · PASS/FAIL → **맞음/틀림** 병행 가능
- 원인 분석·재발방지 **장문**은 사용자 **요청 시**만

### 영향
- `20-harness-workflow.mdc` 「사용자 커뮤니케이션」
- `_docs/context-guide.md` 작업 보고 원칙

---

## 2026-06-08 — Story 카드 이미지 Fill(cover) 확정

### 결정
- 카드 이미지 = **틀(Figma 비율) + Fill** — `object-fit: cover` · 가운데 잘림
- 원본 크기·비율 달라도 **카드 크기에 맞게 축소** 후 틀 꽉 채움
- HTML `width`/`height` = **틀 비율** (원본 px attribute 금지)

### 이유
- 사용자 확인 — B 원본 테스트 후 **가장 적합**

### 영향
- `30-figma-to-code.mdc` 「Image · card fill」
- `templates/mainstream` story CSS

---

## 2026-06-08 — Section shell · full-bleed 분류 (섹션 공통)

### 결정
- 섹션마다 MCP bbox로 **Shell 타입** 분류 — **guttered / full-bleed / breakout**
- Figma 분석 보고·QA·구현 **3단계 모두** Shell 1줄 필수 (CTA만 예외 **금지**)
- full-bleed·breakout band → `.is-bleed-x` + band **내부**만 gutter

### 이유
- CTA bg 풀폭을 **다른 섹션 gutter 패턴**으로 구현 → 구현·재확인·QA 모두 미검출
- stats·CTA 등 **섹션마다** 좌우 방식이 다를 수 있음 — 수동 사후 수정 반복 방지

### 영향
- `30-figma-to-code.mdc` 「Section shell · full-bleed」
- `50-qa-checklist.mdc` Fluid scale #7·#8
- `20-harness-workflow.mdc` Figma 보고 Shell 1줄

---

## 2026-06-08 — 별도 개발 공간(workbench) 미사용 확정

### 결정
- 템플릿 구현은 **`templates/{slug}/`에만 직접** — workbench·임시 복사→반영 단계 **진행하지 않음**
- `_harness/` = **절차 이름 + snapshots(PNG)** — 코드 작업실 아님
- `_delivery/imweb/` = QA PASS **후 납품 복사**만 — 중간 스테이징 아님
- `_harness/workbench/`, `review/`, `reports/` — **생성·사용 금지** (초기 설계 잔재)

### 영향
- `10-project-structure.mdc` · `20-harness-workflow.mdc` · `60-imweb-delivery.mdc`
- `_harness/README.md` · `_docs/project-overview.md`

---

## 2026-06-08 — PC Interaction Preset 카탈로그 (10종)

### 결정
- **preset ID 10종** 카탈로그 등록 — `46-interaction-presets.mdc` · `_docs/interaction-presets-guide.md`
- **템플릿·섹션 연결은 사용자가 후속 선택·승인** — 카탈로그만 있고 **자동 적용 없음**
- **범위: PC (@1920)** · 구현 방식은 기존 `45-interaction-patterns.mdc`
- Figma에 없는 motion도 **preset ID 승인 시** 적용 가능 (`context-guide` 정리)

### preset ID · 한글명 (고정)

| 한글명 | ID |
|--------|-----|
| 스크롤 등장 | `scroll-reveal` |
| 호버 톤 | `hover-tone` |
| 이미지 확대 호버 | `image-scale-hover` |
| 흑백→컬러 호버 | `grayscale-hover-color` |
| 가로 드래그 | `drag-scroll` |
| 버튼 글자 슬라이드 | `button-text-slide-hover` |
| 타이핑 연출 | `typing-text` |
| 카드 넓히기 호버 | `expand-card-hover` |
| 숫자 카운트업 | `stats-counter` |
| 히어로 슬라이더 | `hero-progress-slider` |

명령·대화는 **한글명** 가능 · 로그는 **ID** 기록.

### 영향
- `20-harness-workflow.mdc` · `45` · `50` · `_docs/qa-checklist.md` · `_docs/context-guide.md`

### mainstream 연결 (2026-06-08)
```
[template mainstream] hero · story · stats · news · works · faq · cta: preset — scroll-reveal
[template mainstream] hero: preset — hero-progress-slider
```
- hero: 아이브로·메인카피·서브·pager **개별** (사용자 승인 · 로드 시 순차 등장)
- hero 슬라이더: 3장 · autoplay 6s · pager/progress (2026-06-08 연결)
- header · footer 제외

---

## 2026-06-08 — [template] guyeon-lawfirm 서브·네비 확정

| # | 결정 |
|---|------|
| 1 | 구연 소개 GNB·서브탭 라벨: **구연 소개 · 변호사 소개 · 업무 원칙 · 구연의 원칙** (Figma 서브 탭 기준) |
| 2 | 메인 팀 섹션 카피: eyebrow **TEAM** · title **각자의 역할로 사건을 더 촘촘하게 살핍니다.** (Figma `130:620` 기준) |
| 3 | 변호사 **6명** (서브 3×2) — **변호사 소개 PC**·메인 슬라이더 동기화 · **6번째 프로필·`team_card_06` 확정 전 메인은 5명 유지** |
| 4 | 모바일 서브페이지·`@768` 이식 — **보류** (사용자 2026-06-08) |

---

## 2026-07-11 — [wordpress] template-a ACF 콘텐츠 편집 범위

- ACF 편집: 헤더·푸터·홈(소식 제외)·WP 페이지 서브히어로만.
- ACF 무료: `페이지 > 사이트 설정`; ACF PRO: `Template A 설정` 옵션 페이지.
- 서브페이지 본문·홈 소식·공지 화면은 코드 기본값만 사용하며, 기존 `template_a_content` 옵션은 무시.
- 빈 ACF 필드는 `inc/content-defaults.php`의 현재 디자인 기본값으로 대체.

---
