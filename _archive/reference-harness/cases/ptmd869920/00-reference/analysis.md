# ptmd869920 — Analysis (PURE BLANC)

> Track C · browser-captured · 분석 보강 2026-07-08  
> 디자인센터: [PTMD869920](https://d.cafe24.com/sample?productCode=PTMD869920)  
> 데모: https://ecudemo391069.cafe24.com/  
> 로컬 미리보기: **http://127.0.0.1:4173/** (`preview-original.js` · 고정 포트)  
> 근거: `00-source/captures/*-outline.json` · `01-original/pages.json` · `02-original-qa/analysis-extract.json`

## Meta

| | |
|--|--|
| 브랜드(데모) | PURE BLANC / 퓨어블랑 |
| 업종 | 스킨케어·뷰티 EC |
| 톤 | 미니멀 · 화이트 베이스 · 딥그린 띠배너 · **라운드 히어로 카드** |
| 등급 | **browser-captured** ≠ skin-zip |
| 수집 | 멀티페이지 미러 **60p** · assets ~800+ · remaining 큐 있음 |
| 분석 범위 | 메인 IA + PLP/PDP/장바구니/보드/회원 **공통 골격** |

---

## Site map (미러 기준)

| 유형 | 수량 | 대표 URL |
|------|------|----------|
| home | 1 | `/` |
| PLP (카테고리) | 18 | `/category/유형별/28/` · `고민별/58/` · `핫딜/54/` · 하위 카테고리 |
| PDP (상품상세) | 13 | `/product/레티놀-바운스-세럼/33/` 등 |
| search | 8 | `/product/search.html?keyword=…` |
| board | 7 | 리뷰·공지·문의·FAQ |
| member | 7 | 로그인·회원가입 (myshop 리다이렉트 포함) |
| cart | 1 | `/order/basket.html` |
| event | 1 | `/event/list.html?cate_no=56` |
| about | 1 | `/about.html` |
| other | 3 | recent_view 등 |

**사이트 맵(사용자 여정)**

```
메인
 ├─ GNB: 유형별 / 고민별 / 핫딜 / 리뷰 / 이벤트 / 브랜드 / 고객지원
 ├─ 퀵카테고리(원형) → 검색·카테고리
 ├─ 상품 카드 → PDP
 ├─ 장바구니 → (로그인·주문서 — Track C 게이트 제외)
 └─ 사이드(slidepackage): 회원·카테고리·보드·마이메뉴
```

의도적 제외: 주문서·결제·로그아웃 · 잔여 remaining(~50+ 큐) 페이지네이션·이벤트 상세 등.

---

## Page IA — 메인 (Desktop 1920 / Mobile 390)

| # | sectionId | 역할 | Desktop | Mobile | keep? |
|---|-----------|------|---------|--------|-------|
| 0 | top-promo | 가입 혜택 띠 (신규 5,000원 쿠폰 등) | full · ~40px | full | true |
| 1 | header | 로고 · GNB · 검색/마이/카트 | sticky ~70px | 로고+아이콘 · GNB 스크롤 ~101px | true |
| 2 | aside-slide | 햄버거/슬라이드 패키지 | 오버레이 | 풀스크린 드로어 | true |
| 3 | hero-slide | 메인 배너 (**센터 카드+peek**) | `#mainBannerRoot` ~631 | ~529 | true |
| 4 | cate-banner | 원형 퀵카테고리 8 | 가로열 | 가로 스크롤·높이↑ | true |
| 5 | listmain-1 | 베스트 · slide-prd | 가로 슬라이드 | 카드 | true |
| 6 | sub-banner | 배송·첫구매·쿠폰 3카드 | 3열 | 스택 | true |
| 7 | listmain-2 | 핫딜 + 타이머 | id=`time-sale` | 동일 | true |
| 8 | listmain-3 | 신제품 | 슬라이드 | 카드 | true |
| 9 | full-banner | 가입 5% CTA | full | full | true |
| 10 | listmain-4 | 쇼츠/영상 연동 | shorts-wrap | 동일 | true |
| 11 | listnormal | 고민별 추천 | 탭+상품 | 스택 | true |
| 12 | main-video | 메인 영상 밴드 | ~720 | 축소 | true |
| 13 | main-review | 베스트 리뷰 캐러셀 | 카드 | 카드 | true |
| 14 | mid-banner | 브랜드 스토리 | 이미지+카피 | 스택 | true |
| 15 | footer | 회사·약관·CS | 다열 | 스택 | true |
| — | mobile-tabbar | 하단 5탭 | 숨김 | 카테고리·최근·홈·마이·카트 | true |

오버레이(분석/검수 시 제외): `.mpopup` · `.sample-sg` — **스킨 본체와 분리**.

---

## Page IA — 하위 화면

### PLP (목록) — `/category/…`

| 블록 | 역할 | DOM/근거 | 비고 |
|------|------|----------|------|
| 공통 헤더·사이드·푸터 | 레이아웃 | layout_* | 메인과 동일 셸 |
| head / menu | 카테고리 타이틀·하위메뉴 | `xans-product-headcategory` · `menupackage` · `normalmenu` | |
| 정렬·뷰 | 정렬/표시 | `orderby` · `imagestyle` · `displaycategory` | |
| 상품 그리드 | 목록 | `listnormal` + `listitem` · `colorchip` | listmain 아님 |
| 추천 띠 | 상단 추천 | `listrecommend` | 있을 수 있음 |
| 검색 힌트 | 인기검색 | `xans-search-hotkeyword` | |

유형별(28) · 고민별(58) · 핫딜(54) 구조 동일 계열. 핫딜은 메인 `listmain-2`와 타이머 패턴 공유 가능.

### PDP (상세) — `/product/…/33/` 등

| 블록 | 역할 | DOM/근거 |
|------|------|----------|
| 상단 갤러리 | 대표+추가이미지 | `xans-product-image` · `addimage` |
| 상품 정보 | 명·가격·할인 | `xans-product-detail` · `detaildesign` · `regulardiscount` |
| 옵션·수량 | 구매 옵션 | `xans-product-option` |
| 액션 | 장바구니·구매·관심 | `xans-product-action` |
| 추가구성 | 관련 상품 세트 | `addproduct` |
| 탭/추가정보 | 상세HTML·정보 | `additional` |
| 리뷰·Q&A | 상품 리뷰/문의 | `review` · `reviewpaging` · `qna` · `qnapaging` |
| 관련상품 | 하단 추천 | `relation` · `relationlist` |

샘플 상품명(진입): **레티놀 바운스 세럼**.

### 장바구니 — `/order/basket.html`

| 블록 | DOM/근거 |
|------|----------|
| 패키지·탭 | `xans-order-basketpackage` · `tabinfo` |
| 가이드/빈 카트 | `basketguide` · `empty` |
| 합계·주문 | `totalorder` |

데모 시 빈 카트 UI 위주 — 담기 동작은 `/exec`·세션(라이브 프록시) 의존.

### 보드 · 회원 · about

| 화면 | URL 예 | 역할 |
|------|--------|------|
| 포토리뷰 | `/board/review/list_photo.html?board_no=4` | 갤러리형 리뷰 |
| 공지 | `/board/free/list.html?board_no=1` | 공지 리스트 |
| FAQ | `/board/faq/list.html?board_no=3` | FAQ |
| 상품Q&A | `/board/product/list.html?board_no=6` | 문의 |
| 가입 | `/member/join.html` | 회원가입 폼 |
| 로그인 | `/member/login.html?…` | returnUrl로 myshop 유도 |
| about | `/about.html` | 브랜드/소개 정적 |

---

## Commerce slot

| slotId | 위치 | 데이터 | 모듈 의존 |
|--------|------|--------|-----------|
| top-promo | 최상단 띠 | 쿠폰·혜택 카피 | 배너/정적 |
| member-state | 헤더·사이드 | 로그인/회원가입 | layout_statelogoff / on |
| cart-count | 헤더 | 숫자 뱃지 | orderbasketcount 추정 |
| category-tree | GNB·사이드 | 유형별·고민별·핫딜… | layout_category |
| search | 헤더 패널 | 검색·인기키워드 | layout_searchheader · search_hotkeyword |
| board-nav | 사이드·풋터 | 공지·리뷰·FAQ | layout_boardinfo |
| product-card | 진열/목록 | 이미지·명·요약·정가·할인가·%·리뷰 | listmain/listnormal + listitem |
| sale-timer | 핫딜 | 남은 시간 | 커스텀 JS + listmain-2 |
| pdp-price-option | 상세 | 가격·옵션·액션 | product_detail · option · action |
| cart-lines | 장바구니 | 라인·합계 | order_basket* |
| review-block | 메인·PDP | 리뷰 카드 | 보드/상품리뷰 연동 |

---

## 카페24 모듈 추정 후보 (미검증 · map 확정 아님)

| 영역 | xans/DOM 근거 | 추정 후보 |
|------|---------------|-----------|
| 카테고리 | `xans-layout-category` | layout_category |
| 슬라이드 메뉴 | `xans-layout-slidepackage` | layout_slidepackage |
| 로그아웃헤더 | `xans-layout-statelogoff` | layout_statelogoff |
| 검색헤더 | `xans-layout-searchheader` | layout_searchheader |
| 보드링크 | `xans-layout-boardinfo` | layout_boardinfo |
| 푸터 | `xans-layout-footer` | layout_footer |
| 로고 | `xans-layout-logotop` (PDP 등) | layout_logotop |
| 메인진열 1–4 | `xans-product-listmain-N` | product_listmain_N |
| 상품카드 | `xans-product-listitem-N` | product_ListItem |
| 고민별/목록 | `xans-product-listnormal` | product_listnormal |
| PLP 메뉴팩 | `menupackage` · `normalmenu` · `headcategory` | product_menupackage 계열 |
| 상세 | `xans-product-detail` · image · option · action | product_detail* |
| 상세 리뷰/QNA | `review` · `qna` | product_review / qna |
| 장바구니 | `xans-order-basketpackage` 등 | order_basketpackage |
| 인기검색 | `xans-search-hotkeyword` | product_searchdata / hotkeyword |
| 배너 전반 | `df-bannermanager-*` | 배너매니저 (ADMIN) |

모듈명은 렌더 class 기준 **후보**. 확정은 ZIP / `templates/cafe24_shop` 조회 · Track A/B에서만.

---

## 정적 vs 모듈

| 정적·마크업으로 복원 가능 | 실제 모듈·관리자 데이터 필요 |
|--------------------------|------------------------------|
| 히어로 카드 레이아웃·라운드·peek | 배너 이미지·링크·장수 |
| 섹션 타이틀·여백·색 토큰 | listmain 상품명·가격·할인·리뷰수 |
| 퀵카테고리 원형 UI 프레임 | 아이콘·카테고리 URL |
| about·브랜드 스토리 카피 골격 | 배너매니저 mid-banner 자산 |
| 푸터 그리드 레이아웃 | 사업자 정보·약관 URL |

---

## 인터랙션

| ID | 동작 | 근거 / 의존 |
|----|------|-------------|
| I-hero | 메인 배너 Swiper · 자동재생·페이지 | `#mainBannerRoot` · `/exec` 가능 |
| I-cate-quick | 원형 퀵카테고리 가로 스크롤 | cate-banner · pristine 시 8개 |
| I-prd-slide | 베스트/핫딜/신제품 상품 슬라이드 | `.slide-prd` · swiper |
| I-hotdeal-timer | 핫딜 남은 시간 | `#time-sale` |
| I-gnb-aside | 사이드 드로어 열기 | slidepackage |
| I-header-sticky | 스크롤 시 헤더 고정 | header sticky |
| I-search | 검색 레이어·핫키워드 | searchheader |
| I-pdp-gallery | 상세 썸네일 전환 | addimage |
| I-pdp-cart | 장바구니 담기 | action + `/exec`/세션 |
| I-mobile-tab | 하단 5탭 | mobile 전용 |
| I-popup | 하루닫기 팝업 · 샘플가이드 | **데모 제외** (preview inject) |

---

## Desktop / Mobile 차이

| 항목 | Desktop 1920 | Mobile 390 |
|------|--------------|------------|
| 헤더 높이 | ~70 | ~101 (유틸 줄 증가) |
| GNB | 가로 텍스트 | 스크롤·드로어 비중↑ |
| 히어로 | 센터 카드+양옆 peek | 카드형·세로 비중 |
| 퀵카테고리 | 1행 원형 | 높이↑·스크롤 |
| 상품 진열 | 다열 슬라이드 | 카드·2열 경향 |
| 하단탭 | 없음 | 5탭 고정 |
| 전체 스크롤 길이(메인) | container ~7159 | ~5223 |

---

## 디자인 패턴 · 스타일 토큰 (관찰)

| 토큰/패턴 | 관찰 |
|-----------|------|
| BG | 화이트 위주 · 섹션 간 여백 큼 |
| Accent | 딥그린 promo 띠 · 핫딜 레드 닷(GNB) |
| Hero | **풀블리드가 아닌 카드형 슬라이드** — 차별 포인트 |
| Type | 한글 산세리프(Pretendard 계열) · 로고 워드마크 |
| Card | 라운드 · 세럼/핑크·라벤더 비주얼 |
| Price | 할인가 강조 + 정가 취소선 · `is-sale` |
| Motion | AOS(`aos-init`) · swiper · scroll-effect |

상세 수치 토큰표는 Figma/ZIP 없을 때 **추정**이므로 Track A 전에는 레이아웃 패턴 위주로만 사용.

---

## reconstructionDifficulty · skinRisk

| 항목 | 등급 | 사유 |
|------|------|------|
| reconstructionDifficulty | **medium–high** | 카드형 히어로·멀티 listmain·쇼츠/영상·고민별 listnormal·사이드 IA |
| skinRisk | **high** (납품 시) | 배너매니저 다수 · 데모 자산 권리 · browser-captured ≠ ZIP |
| commerceRisk | **medium** | 옵션·카트·회원은 모듈 필수 · 프록시 없이는 인터랙션 불완전 |

---

## 제거·분리 후보 (분석 시)

- `.sample-sg` — 디자인센터 샘플 가이드  
- `.mpopup` / `df-bannermanager-popup` — 데모 팝업  
- YouTube/광고 트래커 — 레이아웃 비핵심  

---

## 파일럿(카페24) 매핑 메모 — **구매 ZIP 이후만**

| 파일럿 UI | 이 스킨에서 대응 |
|-----------|------------------|
| 헤더·푸터 | header + slidepackage + footer |
| 메인 진열 | listmain-1~4 + listitem |
| 목록 카드 | PLP listnormal + listitem |
| 상세 상단 | product detail · image · option · action |
| Desktop / Mobile 390 | 위 차이표 |

→ Track C만으로는 **working / map / upload 금지**. ZIP 확보 후 **Track A**.

---

## 산출물 · 다음

| 파일 | 상태 |
|------|------|
| 본 문서 `00-reference/analysis.md` | **보강 완료** |
| `component-map.md` · `interaction-map.md` | 동봉 |
| `02-original-qa/analysis-extract.json` | DOM 추출 증거 |

| 다음 (선택) | 하지 말 것 |
|-------------|------------|
| remaining 미러 · 이벤트 상세 캡처 | demo → working skin |
| ZIP 구매 후 Track A | Track B로 데모 HTML 납품 이식 |
| style-guide 수치 확정(관리자/ZIP) | `84` 배포 |

## 금지 (확인)

- 본 케이스 자산 → `cafe24/{slug}` · `_release` · 고객 납품 사용 금지
