# sample04 — Reference Analysis (Sage)

> 데모몰: `ecudemo387382.cafe24.com` · 뷰티 · 다국어·숏폼 강조

## Meta

- productCode: `PTMD867235`
- 톤: 블랙 히어로 · 산세리프 · 아카이브/쇼츠 콘텐츠형

## Page IA

| # | sectionId | 역할 | keep? | 복원 |
|---|-----------|------|-------|------|
| 1 | header | ABOUT·SHOP·ARCHIVE·COMMUNITY + LOGIN·장바구니·언어 | true | 모듈 |
| 2 | hero-cta | LESS FORM… + SHOP NOW 풀폭 | true | 배너 |
| 3 | sub-banner | New Arrival / Best 탭 배너 | true | 배너 |
| 4 | main-display-products | Products slick 슬라이드 | true | **모듈** |
| 5 | archive-gallery | Archive 이미지 보드 | true | **모듈** |
| 6 | story-section | 브랜드 스토리 + READ MORE | true | 정적/배너 |
| 7 | shorts-picks | Shorts 상품 가로 스크롤 | true | listnormal |
| 8 | marquee-text | 하단 흐르는 텍스트 | true | 정적 |
| 9 | footer | ABOUT·LEGAL·SOCIAL·COMPANY | true | layout |
| 10 | notice-popup | Sage Notice 텍스트 팝업 | optional | 팝업 |

## Commerce slot

- language: KR/EN (`xans-record` multishop)
- category: BEST·ALL·SKIN CARE·BODY… (대형 메가메뉴)
- member: LOGIN · MY PAGE
- cart: 0
- product-card: 할인율·리뷰 4.8·타임세일 카운트
- archive: `xans-board-list-8` 갤러리형
- shorts: `xans-product-listnormal` 가로 리스트

## 모듈 추정 후보

| 영역 | 근거 | 후보 |
|------|------|------|
| 카테고리 | cate_list xans-record | layout_category |
| 메인진열 | slick prdList | product_listmain_1 |
| 아카이브 | `xans-board-list-8` | board_list_8 |
| 숏폼 진열 | `xans-product-listnormal` | product_listnormal |
| 푸터 | `xans-layout-footer` | layout_footer |
| 언어 | multishop list | layout_multishop |

## 정적 vs 모듈

- **정적:** 히어로 타이포·스토리 섹션·마키
- **모듈:** 상품·리뷰점수·게시 아카이브·숏폼 목록

## 인터랙션

- hero·sub-banner 슬라이드/탭
- Products **slick** 캐러셀
- Archive 호버·슬라이드
- Shorts 가로 드래그
- 언어선택 드롭다운
- notice-popup

## Desktop / Mobile

- Desktop: 메가메뉴·Archive PC 전용(`only_pc`)
- Mobile: SHORTS+·햄버거·단일열 카드

## 난이도 · risk

- reconstructionDifficulty: **medium-high**
- skinRisk: **medium** (slick+board8+listnormal 혼합·다국어)

## 제거 후보

- notice-popup (텍스트형 — 리뷰 업그레이드 안내)
- 디자인센터 언어선택 툴팁 오버레이
