# ptmd869920 — Source

| 항목 | 값 |
|------|-----|
| caseId | `ptmd869920` |
| displayName | PURE BLANC (퓨어블랑) |
| designCenterUrl | https://d.cafe24.com/sample?productCode=PTMD869920 |
| demoMallUrl | https://ecudemo391069.cafe24.com/ |
| productCode | PTMD869920 |
| collectedAt | 2026-07-08 |
| viewports | Desktop **1920** · Mobile **390** |
| track | **Track C** reference-harness |
| completeness | **browser-captured** (skin-zip 아님) |
| rightsType | demo-analysis |

## 수집 방법

- Playwright headless · 디자인센터 iframe → 데모몰 직접 접속
- 팝업(`.mpopup`) · 샘플 가이드(`.sample-sg`) 닫기/숨김 후 캡처
- 산출: `00-source/captures/` · `01-original/index.rendered.html` (렌더 DOM 스냅샷)

## 수집 체크

- [x] 디자인센터 URL + 데모몰 URL 확정
- [x] Desktop 1920 fold/full + outline.json
- [x] Mobile 390 fold/full + outline.json
- [x] inventory.json · license.md
- [x] analysis.md (메인 IA)
- [ ] skin-zip (미보유 — Track A 불가)
- [ ] 상품 상세·장바구니·주문서 페이지 캡처 (후속)

## Track C 경계

- working skin / upload package / 대표 디자인 전환 **하지 않음**
- 데모 코드·이미지·폰트 **납품 금지**
