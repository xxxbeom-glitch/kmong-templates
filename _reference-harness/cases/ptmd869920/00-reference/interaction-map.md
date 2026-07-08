# ptmd869920 — Interaction map

> Track C. 로컬 재현은 `preview-original.js` + live proxy 기준.

| ID | 트리거 | 기대 동작 | 로컬 재현 | 비고 |
|----|--------|-----------|-----------|------|
| I-hero | 로드 / next | 카드 슬라이드 전환 | PASS (proxy) | pristine 필수 |
| I-cate-count | 로드 | 퀵카테고리 **8** | PASS | post-JS면 이중 |
| I-prd-slide | 화살표·스와이프 | 상품 행 이동 | PARTIAL | swiper |
| I-hotdeal-timer | 틱 | 남은 시간 감소 | PARTIAL | JS |
| I-aside | 메뉴 | 드로어 오픈 | OK | |
| I-nav | 링크 클릭 | PLP/PDP/보드 이동 | PASS | 미러+proxy |
| I-search | 검색 아이콘 | 레이어·핫키워드 | PARTIAL | |
| I-pdp-thumb | 썸네일 | 대표 이미지 변경 | PARTIAL | |
| I-add-cart | 담기 | 카트 반영 | LIVE | `/exec` |
| I-mobile-tab | 탭 | 화면 이동 | OK | 390 |
| I-popup | — | — | **제외** | preview hide |

검수 URL: http://127.0.0.1:4180/
