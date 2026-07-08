# Rules Investigation Notes (2026-07-08)

이번 턴은 **규칙만** 수정. case 결과물 미수정.

## 1. 수정 전 흐름

`00-source → 01-original → 02-analysis → 03-working-copy → 04-normalized → 05-final → 06-platform-map`

## 2. reconstruction 중심 문제 문구 (수정됨)

- 구 README “high-fidelity reconstruction” 잔존 (deprecated 문서로 격리)
- cafe24 map 문구에 `01-high-fidelity-reconstruction` (→ working-copy로 수정)
- sample03 legacy reconstruction을 original로 오해할 여지 → legacy-migration 재분류

## 3. source-to-original QA가 빠진 위치 (보강)

workflow 게이트 · stage-gates · 83 · manifest stages · cafe24 진입 조건

## 4–5. 수정 파일 · 핵심

| 파일 | 핵심 |
|------|------|
| workflow/track/stage-gates | 10단계 + originalQa 게이트 |
| original-*.md · page-* · cafe24-original | 신규 SoT |
| README · templates · 83 · 00-tracks · 80–82 | 연계 |
| legacy-migration | case 재분류 표 |

## 6. 새 폴더 구조

문서상 `00`…`09` + `_dev/`. **기존 case rename 보류.**

## 7. 마이그레이션 영향

sample03 `02-analysis` 경로 · preview 스크립트 · cafe24 glob 병행 · manifest 키 확대

## 8. cafe24 충돌

번호 `06→08` · ZIP vs demo 등급 — `cafe24-original.md`로 해소. map 승인 게이트 유지.

## 9. 라이선스

`license.md` — archive 공개·무단 납품·데모 상업 사용 금지
