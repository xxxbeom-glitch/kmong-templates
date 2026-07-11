# sample03 — Knotted. (노티드 원디자인)

> 트랙: cafe24-skin · 데모: https://ecudemo400494.cafe24.com/

## 단계

| 단계 | 폴더 | 상태 |
|------|------|------|
| 00-source | `00-source/` | 진행 |
| 01-original | `01-original/` | 수집 |
| 02-analysis | `02-analysis/` | 진행 |
| 03-working-copy | `03-working-copy/` | 대기 |
| 04-normalized | `04-normalized/` | 선택 |
| 05-final | `05-final/` | 대기 |
| 06-platform-map | `06-platform-map/` | 대기 |

## 레거시

| 경로 | 비고 |
|------|------|
| `00-reference/` | 구 캡처·분석 — `00-source`/`02-analysis`로 이전 |
| `legacy/01-reconstruction/` | 구 「새 HTML 재구현」 — 신 워크플로 미사용 |

## 게이트

- `01-original` 수집 PASS + 라이선스 확인 → `02-analysis` 완료
- 수정 범위 승인 전 → `03-working-copy` 금지

규칙: `../../shared/rules/workflow.md`
