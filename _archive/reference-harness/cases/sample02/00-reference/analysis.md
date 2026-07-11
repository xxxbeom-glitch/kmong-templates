# sample02 — Reference Analysis (FLOMÉ)

> 데모몰: `ecudemo371233.cafe24.com` · 뷰티/클린 뷰티 감성

## Meta

- productCode: `PTMD856032`
- 톤: 자연광 히어로 · 세리프 타이포 · 미니멀 3단계 루틴 스토리

## Page IA

| # | sectionId | 역할 | keep? | 복원 |
|---|-----------|------|-------|------|
| 1 | header | Shop/About/News/Community + 검색·회원·장바구니 | true | 모듈 |
| 2 | hero-slide | Flow into me. 풀비주얼 | true | 배너 |
| 3 | layer-popup | 우하단 프로모 팝업 | optional | 배너/팝업 |
| 4 | scroll-story | SVG·텍스트·제품 모션 스토리(banner02) | true | 정적+배너 |
| 5 | brand-values | 3가지 가치 카드(01~03) | true | 정적 |
| 6 | main-display-products | Our Products grid3 | true | **모듈** |
| 7 | brand-banner | FLOMÉ 브랜드 풀폭 배너 | true | 배너 |
| 8 | marquee-ticker | Flow into me. 가로 흐름 텍스트 | true | 정적+JS |
| 9 | board-news | FLOMÉ NEWS 게시 목록 | true | **모듈** |
| 10 | footer | 약관·CS·계좌 | true | layout |

## Commerce slot

- category: Shop > Essence/Cleanser/Cream (`xans-layout-category`)
- member/cart: 헤더 아이콘 (statelogoff·basket 추정)
- product-card: SHOP NOW CTA·요약·정가·할인가·타임세일 카운트
- board: NEWS 목록 (날짜·제목)
- bank-info: 사이드/푸터 계좌 안내

## 모듈 추정 후보

| 영역 | 근거 | 후보 |
|------|------|------|
| 카테고리 | `xans-layout-category` | layout_category |
| 메인진열 | `xans-product-listmain-1` | product_listmain_1 |
| 카드 스펙 | `xans-product-listitem-1` | product_ListItem |
| 게시판 | `xans-board-listpackage-1` | board_listpackage_1 |
| 푸터 | `xans-layout-footer` | layout_footer |
| 배너 | `webpublic-banner-area` | user-defined |

## 정적 vs 모듈

- **정적:** 스크롤 스토리 레이아웃·마키·가치 카드 프레임
- **모듈:** 상품 가격/할인·타임세일 타이머·게시글 목록

## 인터랙션

- hero 슬라이드
- banner02: 스크롤 연동 텍스트/제품 패럴랙스(AOS)
- marquee 무한 스크롤
- layer-popup 닫기·오늘하루열지않기
- 모바일: 사이드 카테고리 드로어

## Desktop / Mobile

- Desktop: 좌 GNB 텍스트 + 중앙 로고 + 우 아이콘
- Mobile: 햄버거·풀폭 히어로·상품 1~2열

## 난이도 · risk

- reconstructionDifficulty: **medium-high** (스크롤 모션·SVG)
- skinRisk: **medium** (배너매니저·게시판 연동)

## 제거 후보

- layer-popup (포트폴리오 시 placeholder 가능)
- 과도한 스크롤 모션 — normalized에서 단순화 검토
