# sample03 — 01-high-fidelity-reconstruction

> 폴더: `01-reconstruction/` · Knotted. PTMD873955

## 목적

데모몰 화면을 캡처·DOM·computed style 기준 **high-fidelity visual reconstruction**.  
구조 mock · wire면 · 단색 placeholder **PASS 아님**.

## 열기

`index.html` 직접 열기 또는 로컬 서버.

## 비교 캡처

| 뷰포트 | 원본 | reconstruction |
|--------|------|----------------|
| Desktop 1920 | `../00-reference/captures/desktop-1920/compare-ref-fold.png` | `captures/desktop-1920/after-fold.png` |
| Mobile 390 | `../00-reference/captures/mobile-390/compare-ref-fold.png` | `captures/mobile-390/after-fold.png` |

## 로그·측정

- `reconstruction-log.md`
- `reconstruction-metrics.json` · `reconstruction-metrics-v2.json`
- `extracted-tokens.json`

## 이미지

`assets/ref-*.png` — 데모몰 분석용 **로컬 대체** (라이선스: 무단 재배포 금지 · reconstruction 전용)

## PASS

`shared/rules/reconstruction.md` §6 · `reconstruction-qa.md`
