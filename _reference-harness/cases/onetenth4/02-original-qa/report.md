# Browser Capture QA — onetenth4 (Business 04)

| | |
|--|--|
| 원격 | https://onetenth4.mycafe24.com/ |
| 수집일 | 2026-07-09 |
| 방법 | Playwright capture + BFS mirror (max 80) |

## 결과: **PASS (partial queue)**

| # | 항목 | 결과 |
|---|------|------|
| 1 | Desktop 1920 캡처 | PASS |
| 2 | Mobile 390 캡처 | PASS |
| 3 | 미러 index + 한글 페이지 | PASS |
| 4 | products/news/contact | PASS |
| 5 | remaining 큐 | PARTIAL — 11건 (wp-json/oembed/?p=) |
| 6 | 플랫폼 식별 | WordPress + Elementor (카페24 호스팅) |

**비고:** 콘텐츠 페이지는 충분히 수집. 잔여 큐는 WP API 메타 URL — Track C 분석에 필수 아님.
