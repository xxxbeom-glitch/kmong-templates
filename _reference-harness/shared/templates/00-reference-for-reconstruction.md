# DEPRECATED — 00-reference → reconstruction 체크리스트

> **2026-07-08 폐기.** 신 워크플로: `00-source` + `01-original` 수집 → `source-collection.md`

---

# 00-reference → reconstruction 입력 체크리스트 (레거시)

`01-high-fidelity-reconstruction` 착수 전 `00-reference/`에 있어야 할 항목.

## 필수 산출물

- [ ] `analysis.md` — 섹션 IA · keep 여부 · 인터랙션 후보
- [ ] `inventory.json` — URL · viewport · difficulty
- [ ] `captures/desktop-1920/` — fold + (권장) full
- [ ] `captures/mobile-390/` — fold + (권장) full
- [ ] (권장) `captures/*/outline.json` — DOM bbox

## analysis.md에 reconstruction용으로 적을 것

| 항목 | 용도 |
|------|------|
| 섹션 순서·역할 | DOM 순서 대조 |
| 헤더 overlap/sticky | JS·CSS 상태 |
| 슬라이드·tab·chip | 인터랙션 구현 범위 |
| commerce slot | **구조만** — 시각 PASS에 slot만으로 충족 불가 |
| Desktop/Mobile 차이 | 390 breakpoint 설계 |

## reconstruction 착수 시 추가 수집

- DevTools **computed style** (섹션·타이포·컨테이너)
- `reconstruction-metrics.json` 또는 log에 measured 기록
- 판촉 오버레이 제거 후 캡처 (cafe24 데모몰)

## 금지 해석

「정적 복원 가능」= wireframe OK ❌  
→ **시각 재현** 난이도·모듈 의존 표기일 뿐.
