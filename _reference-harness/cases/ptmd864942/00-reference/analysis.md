# ptmd864942 — Analysis (PTMD864942)

> Track C · browser-captured · 2026-07-08  
> 디자인센터: https://d.cafe24.com/sample?productCode=PTMD864942&frame=P  
> 데모: https://ecudemo383847.cafe24.com/  
> 미리보기: **http://127.0.0.1:4173/** (`node scripts/preview-original.js ptmd864942`)  
> 근거: captures outline · pages.json · pristine mirror

## Meta

| | |
|--|--|
| 브랜드/표시명 | PTMD864942 |
| 등급 | **browser-captured** ≠ skin-zip |
| 수집 | multipage pristine · pages **60** · url-map/assets 별도 |
| remaining | 50 URLs in queue (partial OK) |

## Site map (미러)

| 유형 | 수 |
|------|----|
| home | 1 |
| other | 40 |
| cart | 1 |
| pdp | 9 |
| event | 1 |
| search | 6 |
| member | 2 |

## Page IA — 메인 (section class 관찰)

| # | class / 힌트 |
|---|--------------|
| — | (section 추출 없음 — outline 참고) |

### Desktop outline 요약

- **div** `bn-top df-bannermanager df-bannermanager-bn-top` · top 0 · 신규 회원가입 시 웰컴 쿠폰백 증정! 상단배너 닫기
- **header** `` · top 44 · Brand Best Shop Event Community KR US JP CN
- **div** `` · top 217 · Cart 국내배송상품 (0) 해외배송상품 (0) 장바구니가 비어 있습니다. 쇼핑 계속하기 선택상품 주문 전체
- **div** `` · top 217 · Cart 국내배송상품 (0) 해외배송상품 (0) 장바구니가 비어 있습니다. 쇼핑 계속하기 선택상품 주문 전체
- **footer** `xans-element- xans-layout xans-layout-footer` · top 1300 · Make your skin healthy with natural ingredients Make your sk
- **div** `bn-track df-bannermanager df-bannermanager-bn-track` · top 1300 · Make your skin healthy with natural ingredients Make your sk

## 모듈 후보 (unverified)

- `xans-layout-category`
- `xans-layout-footer`
- `xans-layout-info`
- `xans-layout-logotop`
- `xans-layout-multishoplist`
- `xans-layout-multishoplistitem`
- `xans-layout-multishopshipping`
- `xans-layout-multishopshippingcountrylist`
- `xans-layout-multishopshippinglanguagelist`
- `xans-layout-orderbasketcount`
- `xans-layout-searchheader`
- `xans-layout-statelogoff`
- `xans-product-listitem`
- `xans-product-listitem-1`
- `xans-product-listitem-2`
- `xans-product-listmain`
- `xans-product-listmain-1`
- `xans-product-listmain-2`
- `xans-search-hotkeyword`

메인 진열 후보: xans-product-listmain-1, xans-product-listmain-2

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
