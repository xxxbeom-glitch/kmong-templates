# Browser Capture QA — wonkangmetal

**기준:** `_reference-harness/shared/rules/browser-capture-qa.md` · `site-clone-fidelity.md`  
**일시:** 2026-07-09  
**결과:** **PARTIAL** (멀티페이지 미러 PASS · KO/EN/JP · 큐 잔여)

## 조건

- 원격: http://www.wonkangmetal.co.kr/
- Desktop 1920 · Mobile 390
- method: `playwright-pristine-html-multipage-v4`
- preview: **http://127.0.0.1:4210/** (local + live proxy)

## 체크

| 항목 | 상태 | 비고 |
|------|------|------|
| 원격 vs 로컬 fold (1920) | PASS | 헤더·메인 비주얼·비즈니스 섹션 |
| 원격 vs 로컬 fold (390) | PASS | `mobile-390-*.png` |
| full-page 캡처 | PASS | `00-source/captures/` |
| outline.json | PASS | `main_visual` · `main_business` · `main_company` 등 |
| 멀티페이지 미러 | PASS | **220 pages** · assets ~1392 · url-map ~1473 |
| 로컬 HTTP 이동 | PASS | `/` · `page/page0103.php` · `bbs/board.php?bo_table=news` → 200 |
| KO / EN / JP 진입 | PASS | `index.php` · `index_en.php` · `index_jp.php` |
| 게시판·제품 상세 | PARTIAL | 주요 보드·wr_id 다수 수집 · 큐 잔여 160 |
| 외부 링크 redirect | SKIP | `bbs/link.php` 일부 timeout |
| 로그인·다운로드 | SKIP | `login.php` · `.ai` 다운로드 |
| completeness | browser-captured | skin-zip 아님 |

## PASS / PARTIAL 판정

- **로컬에서 주요 IA·페이지 이동 가능** — 수집 목적 PASS (approved partial)
- 잔여 큐: EN/JP 제품 상세·정렬 파라미터 변형 등 — 필요 시 `maxPages` 상향 재수집
- working-copy · platform-map · release **차단** (Track C · 공개 사이트 분석용)

## 증거

- `01-original/pages.json` · `manifest-original.json` · `url-map.json`
- `00-source/captures/desktop-1920/` · `mobile-390/`
