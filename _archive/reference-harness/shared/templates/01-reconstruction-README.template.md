# DEPRECATED — 01-reconstruction README 템플릿

> **2026-07-08 폐기.** → `case-readme.template.md` · `01-original-README.template.md`

---

# {caseId} — 01-high-fidelity-reconstruction (레거시)

> 폴더: `01-reconstruction/` · 단계 표기: **01-high-fidelity-reconstruction**

## 목적

{sourceUrl 또는 demoMallUrl} 화면을 캡처·DOM·computed style 기준으로 **새 HTML/CSS/JS**로 재구현.  
구조 mock · wireframe · 색면 placeholder만 맞춘 결과는 **이 단계 PASS 아님**.

## 열기

`index.html` 직접 열기 또는 로컬 서버.

## 비교 캡처

| 뷰포트 | 원본 | reconstruction |
|--------|------|----------------|
| Desktop 1920 | `../00-reference/captures/desktop-1920/` | `captures/desktop-1920/after-fold.png` |
| Mobile 390 | `../00-reference/captures/mobile-390/` | `captures/mobile-390/after-fold.png` |

## 로그·측정

- `reconstruction-log.md` — measured / estimated / before-after / 잔여 오차
- `reconstruction-metrics.json` — (권장) computed style 스냅샷

## PASS 기준

`shared/rules/reconstruction.md` §6 · `reconstruction-qa.md` 전부 충족 + `qa-log` 기록.

## 금지

- `module=` · `{$}` · `shared/tokens`
- 원본 스킨 파일·클래스명 복제
- 비교 캡처·측정 로그 없이 완료 처리
