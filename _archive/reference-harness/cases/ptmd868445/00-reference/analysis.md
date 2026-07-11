# ptmd868445 — Analysis (MOALUCK)

> Track C · browser-captured · 2026-07-08  
> 디자인센터: https://d.cafe24.com/sample?productCode=PTMD868445&frame=P  
> 데모: https://ecudemo390116.cafe24.com/  
> 미리보기: **http://127.0.0.1:4173/** (`node scripts/preview-original.js ptmd868445`)  
> 근거: captures outline · pages.json · pristine mirror

## Meta

| | |
|--|--|
| 브랜드/표시명 | MOALUCK |
| 등급 | **browser-captured** ≠ skin-zip |
| 수집 | multipage pristine · pages **60** · url-map/assets 별도 |
| remaining | 50 URLs in queue (partial OK) |

## Site map (미러)

| 유형 | 수 |
|------|----|
| home | 1 |
| member | 5 |
| plp | 5 |
| pdp | 40 |
| board | 8 |
| cart | 1 |

## Page IA — 메인 (section class 관찰)

| # | class / 힌트 |
|---|--------------|
| 1 | `ds-section full kv-section` |
| 2 | `ds-section full icon-category` |
| 3 | `ds-section md-pick` |
| 4 | `ds-section` |
| 5 | `ds-section full brand-story` |

### Desktop outline 요약

- **header** `ds-section full` · top 36 · MOALUCK 가을페스타 전체상품 신상품 베스트 공간별 선물 브랜드 이벤트 커뮤니티
- **div** `` · top 108 · 라이프스타일 지금 가장 많이 사랑받는 아이템 일상을 빛내주는 소품 Top 3 라모어 포근한 온기를 담은 플라
- **main** `` · top 108 · 라이프스타일 지금 가장 많이 사랑받는 아이템 일상을 빛내주는 소품 Top 3 라모어 포근한 온기를 담은 플라
- **section** `ds-section full kv-section` · top 108 · 라이프스타일 지금 가장 많이 사랑받는 아이템 일상을 빛내주는 소품 Top 3 라모어 포근한 온기를 담은 플라
- **section** `ds-section full icon-category` · top 814 · 가구 조명 패브릭 키친 라이프스타일 문구/굿즈 뷰티/리빙
- **section** `ds-section md-pick` · top 1118 · MD’S PICK 더보기 WISH ADD 카사라인 루나 우드 체어 139,000원 104,490원 25% W
- **div** `xans-element- xans-product xans-product-listmain-1 xans-product-listma` · top 1118 · MD’S PICK 더보기 WISH ADD 카사라인 루나 우드 체어 139,000원 104,490원 25% W
- **section** `ds-section` · top 1608 · BRAND EXHIBITION 카사라인 디자인으로 완성하는 감각적인 홈 스타일링 빛담 살림나라 소담식기 WI
- **div** `xans-element- xans-product xans-product-listmain-2 xans-product-listma` · top 1882 · WISH ADD 카사라인 루나 우드 체어 139,000원 104,490원 25% WISH ADD 카사라인 누
- **section** `ds-section full brand-story` · top 2350 · BRAND STORY 카사라인 모던한 감각과 정교한 디테일이 조화를 이루는 카사라인은, 일상 공간을 한층 더
- **section** `ds-section` · top 3154 · RANKING 가구 조명 패브릭 1 WISH ADD 카사라인 루나 우드 체어 139,000원 116,100원
- **div** `xans-element- xans-product xans-product-listmain-10 xans-product-listm` · top 3488 · 1 WISH ADD 카사라인 루나 우드 체어 139,000원 116,100원 16% 2 WISH ADD 카사
- **div** `xans-element- xans-product xans-product-listmain-17 xans-product-listm` · top 4731 · BEST 더보기 WISH ADD 라모어 코지 베드사이드 러그 59,000원 44,100원 25% WISH A
- **footer** `xans-element- xans-layout xans-layout-footer` · top 7223 · MOALUCK 회사소개 이용약관 개인정보처리방침 이용안내 법인명(상호): ○○○ 대표자: ○○○ 주소: 00

## 모듈 후보 (unverified)

- `xans-layout-boardinfo`
- `xans-layout-category`
- `xans-layout-footer`
- `xans-layout-info`
- `xans-layout-logotop`
- `xans-layout-orderbasketcount`
- `xans-layout-searchheader`
- `xans-layout-slidepackage`
- `xans-layout-statelogoff`
- `xans-product-listitem`
- `xans-product-listitem-1`
- `xans-product-listitem-10`
- `xans-product-listitem-11`
- `xans-product-listitem-12`
- `xans-product-listitem-17`
- `xans-product-listitem-2`
- `xans-product-listitem-3`
- `xans-product-listitem-5`
- `xans-product-listitem-6`
- `xans-product-listmain`
- `xans-product-listmain-1`
- `xans-product-listmain-10`
- `xans-product-listmain-11`
- `xans-product-listmain-12`
- `xans-product-listmain-17`
- `xans-product-listmain-2`
- `xans-product-listmain-3`
- `xans-product-listmain-5`
- `xans-product-listmain-6`
- `xans-search-hotkeyword`
- `xans-search-recentkeyword`

메인 진열 후보: xans-product-listmain-1, xans-product-listmain-10, xans-product-listmain-11, xans-product-listmain-12, xans-product-listmain-17, xans-product-listmain-2, xans-product-listmain-3, xans-product-listmain-5, xans-product-listmain-6

## Commerce / 공통 셸

| 슬롯 | 근거 |
|------|------|
| header/aside | layout-category · slidepackage · statelogoff |
| 검색 | searchheader / hotkeyword |
| 푸터 | layout-footer |
| 진열 | listmain / listnormal / listitem |
| 배너 | df-bannermanager (관리자) |

## Desktop / Mobile

- Desktop 1920 · Mobile 390 캡처: `00-source/captures/`
- 모바일: 하단탭·드로어 여부는 캡처·스킨별로 확인

## reconstructionDifficulty · skinRisk

| | |
|--|--|
| reconstructionDifficulty | **medium–high** (browser-captured · 배너매니저·멀티 진열) |
| skinRisk | **high** (데모 자산 · ZIP 아님) |

## 제거 후보

- `.sample-sg` · `.mpopup` (preview inject만)

## Track C 다음

| 가능 | 금지 |
|------|------|
| 잔여 미러 · 분석 심화 | working / map / 납품 / 84 |

ZIP 확보 시 **Track A**.
