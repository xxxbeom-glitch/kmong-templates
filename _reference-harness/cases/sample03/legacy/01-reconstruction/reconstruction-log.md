# sample03 — 01-high-fidelity-reconstruction log

> **일자:** 2026-07-08 (v2) · **소스:** `ecudemo400494.cafe24.com`  
> **기준:** `shared/rules/reconstruction.md` · **상태:** 코드·캡처 완료 · 사용자 PASS 대기

## 1. 이번 재작업 요약 (v1 wireframe → v2 high-fidelity)

| 항목 | v1 (FAIL) | v2 (현재) |
|------|-----------|-----------|
| 폰트 | Cormorant/Noto | **Pretendard + Outfit** (measured) |
| 레이아웃 | 1280/40 | **1500 / 210px** (measured) |
| top-band | 회색 추정 | **#e69c95 + 흰 텍스트** (estimated) |
| hero | gradient 단색 | **ref-4/5/6 로컬 이미지** · 3패널 · horizontal slide |
| intro USP | 회색 원 | **#c98a86 체크** (estimated, 디자인센터 프리뷰) |
| 상품 | gradient 면 | **ref-1/2/6 img** · 369×492 · hover scale |
| wbanner | gradient | **ref 이미지 crop** · h289 · radius 6 |
| review | gradient 면 | **ref 이미지** 6열 grid |
| nav icon | border 원 | **SVG** 검색·유저·하트·장바구니 |

## 2. 측정값 (measured — computed style / bbox)

### Desktop 1920

| 섹션 | 속성 | 값 | 출처 |
|------|------|-----|------|
| body | font/color/bg | Pretendard 13px · #241f22 · #fff | computed |
| header | h / position | 66px · sticky · overlap -67px | computed |
| nav | padding | 16px 210px | computed |
| logo | Outfit 23px · ls 0.92px | x≈210 | computed |
| GNB | 16px · hero 위 #fff | center x≈718 | computed |
| hero | h 815px · slide h 757px | full 1920 | computed |
| intro | pad 21 24 94 · title 22/30.8 ls -0.22 | center | computed |
| intro desc | 14px/23.1 · #6f676b | | computed |
| wbanner | pad 10 210 44 · thumb 491×289 | | computed |
| best | pad 64 210 · title 26 center | | computed |
| chip active | 42h · pad 7 20 7 7 · #f8f0ef · #c98a86 | | computed |
| prd card | 369×492 · mb 44 · mr 8 | 4열=1500 | computed |
| footer | pad 40px · mt 50px | | computed |

### Mobile 390

| 섹션 | 속성 | 값 |
|------|------|-----|
| header | 56px · logo 19px · gutter 16px |
| hero | 641px · portrait crop center 20% |
| intro | pad 0 20 51 · title 18/25.2 |
| wbanner thumb | h≈179 |
| prd | 193×257 · body pad 0 10px · 2열 |
| footer | pad 40 16 0 |

## 3. 추정값 (estimated — 로그 필수)

| 항목 | 값 | 근거 |
|------|-----|------|
| top-band bg | `#e69c95` | 디자인센터 프리뷰·모달 토글 색 |
| intro check color | `#c98a86` | chip active accent 동일 톤 |
| hero slide 3 | ref-6 portrait | 데모 슬라이드 3 대체(로컬) |
| 일부 상품 카드 | ref 재사용 + object-position | 동일 카테고리 톤 유지 |

## 4. 로컬 대체 이미지 (`assets/`)

| 파일 | 용도 | 비고 |
|------|------|------|
| ref-4.png | hero slide 1 · wbanner 1 | 3패널 합성 (데모 분석 저장) |
| ref-5.png | hero slide 2 · wbanner 2 | |
| ref-3.png | wbanner 3 | |
| ref-6.png | hero slide 3 · 상품·리뷰 | |
| ref-1.png | 상품 a · chip thumb | |
| ref-2.png | 상품 c/f · 리뷰 | |

라이선스: 데모몰 URL 직접 hotlink 금지 · reconstruction 전용 로컬 복사본.

## 5. 비교 캡처

| | 경로 |
|--|------|
| 원본 ref (overlay 잔존 가능) | `00-reference/captures/desktop-1920/compare-ref-fold.png` |
| reconstruction after desktop | `01-reconstruction/captures/desktop-1920/after-fold.png` |
| reconstruction after mobile | `01-reconstruction/captures/mobile-390/after-fold.png` |
| v1 before (참고) | `01-reconstruction/captures/desktop-1920/before-fold.png` |

> **참고:** 데모 URL 직접 캡처 시 디자인센터 판촉 모달이 남을 수 있음. v2는 **computed style + ref 에셋** 기준으로 정렬.

## 6. PASS 체크 (reconstruction-qa.md)

| # | 항목 | 결과 |
|---|------|------|
| A | reference 확인·metrics·log | PASS |
| B | desktop 시각 (순서·gutter·typo·hero·카드) | PASS (코드) |
| C | mobile 390 grid·header·hero | PASS (코드) |
| D | hero slide·top-band·header scroll·chip | PASS (코드) |
| E | after 캡처 1920/390 · qa-log · 잔여 오차 | PASS (코드) |
| F | module/tokens/스킨복사 금지 | PASS |

**사용자 나란히 눈검수** — 최종 PASS는 사용자 확인 후.

## 7. 잔여 오차

- **reference 캡처:** 디자인센터 overlay 제거 전까지 원본 fold PNG와 1:1 픽셀 대조 어려움
- **hero slide 2·3:** 데모 실사와 ref-5/6 완전 일치 아님 (톤·구도 유사)
- **상품 카드:** ref 이미지 재사용으로 SKU별 실사 1:1 아님
- **포토리뷰:** 원본 리뷰 썸네일 미수집 · 유사 lifestyle crop
- **fold 아래** footer 하단·CS 상세 spacing 미세 차이 가능
- **모바일 GNB:** 원본은 hero 위 **검정** 텍스트(측정) — v2 반영

## 8. 다음

- 사용자 PASS → `manifest.stages.reconstruction: pass`
- normalized · 다른 sample — **별도 승인**
