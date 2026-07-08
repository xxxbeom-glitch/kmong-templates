# sample03 — Reference Analysis (Knotted.)

> 원본: `../01-original/index.html` · 데모몰 `ecudemo400494.cafe24.com` · 패션

## Meta

- productCode: `PTMD873955`
- 톤: 파스텔·여성의류·헤더 오버랩(메인과 겹침)
- original 수집: 2026-07-08 · 92 files (`01-original/manifest-original.json`)

## Page IA

| # | sectionId | 역할 | keep? | 복원 |
|---|-----------|------|-------|------|
| 1 | top-band | 띠배너(배송·쿠폰·신상) | true | smart-banner |
| 2 | header | Knotted. 로고·카테고리·검색·장바구니·헤더겹침 | true | 모듈 |
| 3 | hero-slide | 메인 비주얼 01/03 | true | 배너 |
| 4 | brand-intro | 브랜드 카피 + USP 3아이콘 | true | 정적 |
| 5 | weekly-banner | WEEKLY NEW 4타일 배너 | true | 배너 |
| 6 | main-display-best | 이번 주 베스트 + 카테고리 칩 + grid | true | **모듈** |
| 7 | main-display-new | 신상 진열 listmain-2 | true | **모듈** |
| 8 | main-display-md | MD 추천 listmain-3 | true | **모듈** |
| 9 | photo-review | 메인 포토리뷰(스킨 옵션) | true | board/리뷰 |
| 10 | footer | 카테고리·CS·약관 | true | layout |

## 원본 파일 근거 (`01-original`)

| 영역 | 원본 경로·힌트 |
|------|----------------|
| 스킨 CSS | `_mirror/.../ind-script/optimizer_user.php` (234KB) |
| 스킨 JS | `_mirror/.../ind-script/optimizer.php` · `_onedesign/js/*` |
| 아이콘 | `_onedesign/css/xeicon.min.css` |
| 슬라이드 | `swiper-bundle.js/css` (로컬+cdn 미러) |
| 폰트 | Pretendard · Outfit (`cdn.jsdelivr` · `fonts.googleapis.com`) |
| 스마트배너 | `app4you.cafe24.com/SmartBanner/*` |
| 상품 이미지 | `web/product/tiny/202606/*` · `file_data/ecudemo400494/*` |
| 포토리뷰 AJAX | `board/review/list_data_all.html` |

## Commerce slot

- top-band: 스마트배너 롤링 (`xans-smart-banner-admin`)
- category: 상의·아우터·스커트/원피스·팬츠… (`nav-item xans-record`)
- product-card: D-day 뱃지·SOLD OUT·할인율·쿠폰적용가·컬러칩
- cart: 헤더 0 카운트
- community: 공지·이벤트·상품문의·사용후기
- multishop: KOR

## 모듈 추정 후보

| 영역 | 근거 | 후보 |
|------|------|------|
| 띠배너 | `xans-smart-banner-admin` | smart-banner (관리자) |
| 카테고리 | `xans-layout-category` / kn-nav | layout_category |
| listmain-1~5 | `xans-product-listmain-N` | product_listmain_N |
| listitem | listSubname·listSalePrice 등 | product_ListItem |
| 포토리뷰 | 스킨 기능 설명 | board_list_8 또는 리뷰 위젯 |
| footer | `xans-layout-footer` | layout_footer |

## 정적 vs 모듈

- **정적:** intro·USP 아이콘·weekly 타일 레이아웃
- **모듈:** 모든 가격·할인기간·쿠폰가·품절·진열 탭

## 인터랙션

- 헤더 오버랩 ON/OFF (히어로 위 투명 헤더)
- hero 슬라이드 (Swiper)
- 베스트 섹션 **카테고리 칩** 필터
- 상품 호버·SOLD OUT 오버레이
- 모바일: 분류 이미지 → 텍스트 리스트 전환(스킨 옵션)

## Desktop / Mobile

- Desktop: 가로 nav·grid4·헤더 겹침
- Mobile: 상단 띠배너 유지·햄버거·grid2·히어로 비율 변경

## 외부 의존 (미수집·런타임)

- `fonts.gstatic.com` — Outfit woff (CSS만 수집)
- `img.echosting.cafe24.com/.../img_loading.gif`
- `cfa-js.cafe24.com/cfa.html` — 분석 iframe

## 수정 위험

- `optimizer_user.php` — 카페24 번들 CSS (경로·쿼리 민감)
- 할인기간·쿠폰가·D-day — 서버·모듈 데이터
- 헤더겹침 — 스킨 옵션·body class 연동
- 로컬 미러 시 `index.html` 상대경로 일부 미해결 가능

## 난이도 · risk

- workingDifficulty: **medium**
- skinRisk: **medium-high**

## 제거 후보

- 디자인센터 「운영하면서 손쉽게」 (`_onedesign/html/feature_guide.html`)
- 중복 listmain — `04-normalized`에서 축소 검토
