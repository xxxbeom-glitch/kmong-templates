# ptmd869920 — Analysis (PURE BLANC)

> Track C · browser-captured · 2026-07-08  
> 디자인센터: [PTMD869920](https://d.cafe24.com/sample?productCode=PTMD869920) · 데모: https://ecudemo391069.cafe24.com/

## Meta

| | |
|--|--|
| 브랜드(데모) | PURE BLANC / 퓨어블랑 |
| 업종 | 스킨케어·뷰티 EC |
| 톤 | 미니멀 · 화이트 베이스 · 딥그린 띠배너 · 라운드 히어로 카드 |
| 등급 | **browser-captured** ≠ skin-zip |

## Page IA (메인)

| # | sectionId | 역할 | Desktop | Mobile | 비고 |
|---|-----------|------|---------|--------|------|
| 1 | top-promo | 가입 혜택 띠배너 | full | full | 深绿 바 |
| 2 | header | 로고 PURE BLANC · GNB · 검색/마이/카트 | sticky 약 70px | 로고+아이콘 · GNB 스크롤 | `header` · layout_category |
| 3 | hero-slide | 메인 배너 슬라이드 (10장·중앙 카드형) | 둥근 카드·좌우 peek | 풀폭 카드 | df-bannermanager |
| 4 | cate-banner | 원형 퀵카테고리 (EVENT/ALL/세럼…) | 가로열 | 가로 스크롤 | df-bannermanager-ca* |
| 5 | listmain-1 | 베스트 상품 | 가로 진열 | 카드 | `xans-product-listmain-1` |
| 6 | sub-banner | 배송·첫구매·쿠폰 혜택 띠 | 3카드형 | 스택/슬림 | df-bannermanager |
| 7 | listmain-2 | 핫딜 | 진열 | 진열 | `listmain-2` |
| 8 | listmain-3 | 신제품 | 진열 | 진열 | `listmain-3` |
| 9 | full-banner | 가입 5% 쿠폰 CTA | full | full | df-bannermanager |
| 10 | listmain-4 | 쇼츠/영상 연동 상품 | 쇼츠 썸네일 | 동일 | `listmain-4` |
| 11 | concern-by-concern | 고민별 추천 + 목록 | `listnormal` | 스택 | 탭/카피+상품 |
| 12 | main-video | 메인 영상 밴드 | 와이드 | 축소 | df-bannermanager-main-video |
| 13 | main-review | 베스트 리뷰 | 카드 캐러셀 | 카드 | 커스텀+리뷰 연동 추정 |
| 14 | mid-banner | 브랜드 스토리 | 이미지+카피 | 스택 | df-bannermanager |
| 15 | footer | 회사·약관·CS | 다열 | 스택 | `xans-layout-footer` |
| — | mobile-tabbar | 하단 고정 탭 | (숨김) | 카테고리·최근·홈·마이·카트 | layout |

오버레이(분석 시 닫음): `.mpopup` 하루닫기 · `.sample-sg` 샘플 가이드 — **판매 스킨 본체와 분리**해서 봄.

## Commerce 힌트 (후보 · unverified)

| 영역 | DOM | 추정 | 검증 |
|------|-----|------|------|
| GNB 카테고리 | `xans-layout-category` | layout_category | unverified |
| 사이드 메뉴 | `xans-layout-slidepackage` | layout_slide* | unverified |
| 회원 상태 | `xans-layout-statelogoff` | layout_statelogoff | unverified |
| 게시판 링크 | `xans-layout-boardinfo` | layout_boardinfo | unverified |
| 메인진열 1–4 | `xans-product-listmain-N` | product_listmain_N | unverified |
| 고민별 | `xans-product-listnormal` | product_listnormal | unverified |
| 푸터 | `xans-layout-footer` | layout_footer | unverified |
| 배너들 | `df-bannermanager-*` | 배너매니저(관리자) | ADMIN_CHECK_REQUIRED |

모듈명은 렌더 class만으로 확정하지 않음 (`80` 조회 순서 · 인벤토리/스킨 ZIP 필요).

## 디자인 패턴 메모

- 히어로: **센터 카드 + 좌우 peek** (풀블리드와 다름)
- GNB: 텍스트 링크 · 핫딜 레드 닷
- 퀵카테고리: **원형 썸네일** 행
- 모바일: **하단 5탭** 고정
- 색: 화이트·블랙 로고 · 그린 promo · 상품 핑크/라벤더 비주얼

## 다음 단계 (선택)

| 요청 시 | 하지 말 것 |
|---------|------------|
| 상세/목록/장바구니 추가 캡처 | demo → working skin |
| pattern catalog 확장 | upload package / `84` 배포 |
| 구매 ZIP 확보 후 **Track A** | Track B map으로 데모 HTML 이식 |

## 금지 (확인)

- 이 케이스 자산을 `cafe24/{slug}` · `_release` · 고객 납품에 사용하지 않음
