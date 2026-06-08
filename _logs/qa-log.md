# QA Log

## 2026-06-04 — 구조 리셋 QA

**대상:** Imweb 전용 하네스 구조 리셋 (setup)  
**검수자:** Cursor Agent  
**결과:** **PASS**

### 검수 항목

| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 1 | `.cursor/rules` 9개 존재 | PASS | 00~60 + 55-git-workflow |
| 2 | `_modules` 제거 | PASS | 폴더 없음 |
| 3 | `_tokens` 제거 | PASS | 폴더 없음 |
| 4 | `_delivery/cafe24` 제거 | PASS | 폴더 없음 |
| 5 | `_delivery/imweb` 유지 | PASS | `.gitkeep` 존재 |
| 6 | `templates/template-c` 유지 | PASS | HTML·CSS·JS·assets 무수정 |
| 7 | legacy 이동 확인 | PASS | `_docs/legacy/` 하위에 AGENTS·cursorrules·template-a/b·_common·_imgs·체크리스트 |
| 8 | push 금지 규칙 | PASS | `00-core.mdc`, `55-git-workflow.mdc`에 명시 |
| 9 | `start.bat` / `package.json` 미수정 | PASS | 리셋 범위 준수 |

### FAIL 항목
없음

### 비고
- `_docs/*.md` 본문은 placeholder 상태 — 다음 챕터에서 작성 예정
- `start.bat`는 아직 `template-a` 경로 — 별도 작업에서 수정 예정
