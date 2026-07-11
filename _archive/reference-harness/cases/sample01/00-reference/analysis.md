# sample01 — Reference Analysis (Rêverio)

> 수집: 2026-07-08 · 데모몰 iframe `ecudemo370921.cafe24.com` · Desktop 1920 / Mobile 390 캡처

## Meta

- 디자인센터: `PTMD855689`
- 데모몰: https://ecudemo370921.cafe24.com/
- 업종: 뷰티·멀티 카테고리 (패션/식품 등 확장형 **SKIN** 스킨)
- 톤: 미니멀 프리미엄 · 세리프 로고 · 다크/라이트 헤더 변형

## Page IA (섹션 순서)

| # | sectionId | 역할 | Desktop | Mobile | keep? | 복원 |
|---|-----------|------|---------|--------|-------|------|
| 1 | header | 띠배너·로고·유틸(검색·회원·장바구니·포인트)·다국어 | sticky·다층 | 햄버거·드로어 | true | **모듈 필수** |
| 2 | hero-slide | 메인 풀비주얼 슬라이드 + 카피 | full-bleed | 동일·세로 | true | 배너+정적 |
| 3 | vendor-design-popup | 「하나의 스킨, 다양한 디자인」 판촉 레이어 | overlay | overlay | **false** | 제외 |
| 4 | vendor-popup-banner | 배너매니저 데모 팝업 | floating | floating | **false** | 제외 |
| 5 | brand-text-band | 브랜드 한줄 카피(한/영) | gutter | stack | true | 배너/정적 |
| 6 | icon-category | 스킨케어·메이크업 등 아이콘 카테고리 바 | swiper | 1열·스와이프 | true | 배너+링크 |
| 7 | main-display-weekly | Weekly Best 상품 슬라이드 | slide 4+ | 2열 카드 | true | **모듈 필수** |
| 8 | grid-banner-brand | 브랜드/기획전/매거진 3그리드 배너 | 3열 | 1열 | true | 배너 |
| 9 | main-display-tabbed | 카테고리 탭 + 상품 그리드 | tab+grid4 | 탭·2열 | true | **모듈 필수** |
| 10 | footer | CS·약관·SNS | gutter | stack | true | layout+정적 |

※ 전체 높이 ~11,000px — 하단 추가 진열·리뷰·배너는 캡처 outline 60건 한도로 **후속 스크롤 검증** 필요.

## Commerce slot

| slotId | 위치 | 데이터 | 모듈 의존 |
|--------|------|--------|-----------|
| top-notice | 헤더 상단 | 회원가입 포인트·당일배송 문구 | 띠배너/공지 |
| member-state | 헤더·사이드 | 로그인/회원가입·주문조회 | statelogoff/on |
| point-balance | 헤더 | +5,000 P | 회원 적립금 |
| cart-count | 헤더 | 0 | orderbasketcount |
| multishop-lang | 헤더 | 한국어/KRW·EN/JP/CN | multishoplist |
| category-tree | GNB·사이드 | 베스트·타임세일·대분류+소분류 | layout_category |
| search-layer | 검색 패널 | 인기검색어·최근검색·최근본상품 | search_hotkeyword 등 |
| product-card | 진열 | 이미지·명·요약·정가·할인가·%·리뷰수 | listmain + listitem |
| review-count | 카드 | 리뷰 : N | 상품 리뷰 연동 |
| community-nav | 사이드 | NOTICE·REVIEW·Q&A·EVENT·FAQ | boardinfo |

## 카페24 모듈 추정 후보 (map 단계 확정 · 본 문서는 후보만)

| 영역 | xans/DOM 근거 | 추정 모듈 후보 |
|------|---------------|----------------|
| 카테고리 | `xans-layout-category` | layout_category |
| 로그아웃 헤더 | `xans-layout-statelogoff` | layout_statelogoff |
| 장바구니 | 헤더 카운트 UI | layout_orderbasketcount |
| 검색 | `xans-search-hotkeyword` | product_searchdata / hotkeyword |
| 메인진열 1 | `xans-product-listmain-1` | product_listmain_1 |
| 메인진열 3 | `xans-product-listmain-3` | product_listmain_3 |
| 상품 스펙 | `xans-product-listitem-*` | product_ListItem |
| 게시판 링크 | `xans-layout-boardinfo` | layout_boardinfo |
| 푸터 | `xans-layout-footer` | layout_footer |
| 커스텀 배너 | `webpublic-banner-area` | 배너매니저·user-defined (관리자) |

## 정적 vs 모듈

| 정적 복원 가능 | 실제 모듈 필요 |
|----------------|----------------|
| hero 비주얼 레이아웃·타이포 | 상품명·가격·할인·리뷰수 |
| 브랜드 텍스트 밴드 마크업 | 카테고리 트리·다국어 |
| 그리드 배너 프레임 | 장바구니 수·회원 상태 |
| 섹션 타이틀·간격 토큰 | 검색·최근본상품 |

## 인터랙션

- 헤더: 스크롤 시 `scroll-up` 클래스 · 햄버거 → 카테고리/커뮤니티 **사이드 드로어**
- hero: 메인 슬라이드 자동재생·페이지네이션
- icon-category: swiper 가로 스크롤
- weekly best: 상품 **swiper** + 화살표
- tabbed display: 카테고리 탭 클릭 시 그리드 필터(클라이언트/진열설정 연동 추정)
- 팝업: 「오늘 하루 열지 않기」(vendor 데모 — 제외)

## Desktop / Mobile 차이

| 항목 | Desktop 1920 | Mobile 390 |
|------|--------------|------------|
| GNB | 아이콘 유틸 노출 | 햄버거·검색·장바구니 아이콘 |
| 카테고리 | 헤더+사이드 패널 | 드로어 풀스크린 |
| 상품 진열 | grid4 / slide 다열 | 2열 카드·세로 스와이프 |
| 판촉 레이어 | 디자인센터 오버레이 잔존 가능 | 동일 |

## reconstruction 난이도 · skinRisk

| 항목 | 등급 | 사유 |
|------|------|------|
| reconstructionDifficulty | **high** | 멀티 헤더 변형·사이드 3종 카테고리·슬라이드+탭 혼합 |
| skinRisk | **high** | webpublic 배너매니저 의존·다국어·포인트·깊은 카테고리 depth |

## 제거 후보

- `vendor-design-popup` — 스킨 마케팅 오버레이
- `vendor-popup-banner` — 배너매니저 설명 팝업
- 상단디자인01~10 캐러셀 — 판촉 콘텐츠

## 파일럿 매핑 메모

- **헤더·푸터·listmain·listitem·상세상단** → cafe24-skin 파일럿 범위
- 상세 상단은 **별도 URL 캡처 후** 보완
