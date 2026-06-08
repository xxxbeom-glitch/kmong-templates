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
- `start.bat`는 아직 `template-a` 경로 — 별도 작업에서 수정 예정

---

## 2026-06-04 — docs 본문 정리 QA

**대상:** `_docs/*.md` 4개 본문 작성  
**검수자:** Cursor Agent  
**결과:** **PASS**

### 검수 항목

| # | 항목 | 결과 |
|---|------|------|
| 1 | 4개 문서 placeholder 제거·본문 작성 | PASS |
| 2 | Cafe24·`_modules`·`_tokens` 언급 없음 | PASS |
| 3 | 독립 완성형 템플릿 기준 일관 | PASS |
| 4 | `.cursor/rules`와 충돌 없음 (docs=사람용, rules=Cursor용) | PASS |
| 5 | `template-c` / `package.json` / `start.bat` 미수정 | PASS |
| 6 | 문서 간 breakpoint(768)·clamp·납품 경로 일치 | PASS |

### FAIL 항목
없음

---

## 2026-06-04 — Figma 프레임명 slug 규칙 QA

**대상:** rules·docs·logs Figma 프레임명 기반 템플릿 생성 규칙 반영  
**검수자:** Cursor Agent  
**결과:** **PASS**

### 검수 항목

| # | 항목 | 결과 |
|---|------|------|
| 1 | `10-project-structure.mdc` slug 정규화·승인 규칙 | PASS |
| 2 | `30-figma-to-code.mdc` MCP 프레임명·섹션 보고 | PASS |
| 3 | `_docs` 2개 문서 반영·rules와 일치 | PASS |
| 4 | `decision-log`·`change-log` 기록 | PASS |
| 5 | `template-c`·`start.bat` 미수정 | PASS |
| 6 | 예시(`ontheblue`, `claire-clinic`) 정확 | PASS |

### FAIL 항목
없음
