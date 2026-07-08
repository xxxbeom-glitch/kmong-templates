# Browser Capture QA — ptmd869920

**기준:** `_reference-harness/shared/rules/browser-capture-qa.md` · `82` Browser capture  
**일시:** 2026-07-08  
**결과:** **PARTIAL** (멀티페이지 미러 PASS · ZIP 아님)

## 조건

- 원격: https://ecudemo391069.cafe24.com/
- Desktop 1920 · Mobile 390
- method: `playwright-pristine-html-multipage-v4`
- preview: http://127.0.0.1:4180/ (local + live proxy)

## 체크

| 항목 | 상태 | 비고 |
|------|------|------|
| 원격 vs 로컬 fold (1920) | PASS | 헤더·히어로·퀵카테고리 |
| 원격 vs 로컬 fold (390) | PASS | 히어로·GNB·하단탭 |
| full-page 캡처 | PASS | `*-full.png` |
| outline.json | PASS | |
| 멀티페이지 미러 | PASS | **60 pages** · assets ~801 · url-map ~808 |
| 로컬 HTTP 이동 | PASS | `/` · about · basket · category×2 · board · event · search |
| 상품 상세 로컬 | PASS | `/product/.../33/` 등 |
| 클릭 네비 (about·basket) | PASS | 팝업 숨김 후 |
| `/exec` 인터랙션 | PARTIAL | live proxy 의존 |
| 큐 잔여 | PARTIAL | ~190 URL remaining (페이지네이션·이벤트상세 등) |
| 주문서/결제 | SKIP | 의도적 제외 |
| completeness | browser-captured | skin-zip 아님 |

## PASS / PARTIAL 판정

- **로컬에서 주요 페이지 이동 가능** — 수집 목적 PASS (approved partial)
- working-copy · platform-map · release **차단** (Track C + 미구매 데모)

## 증거

- `01-original/pages.json` · `manifest-original.json` · `url-map.json`
- `00-source/captures/desktop-1920/` · `mobile-390/`
- smoke: `scripts/_qa-nav.js`
