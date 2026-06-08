# Decision Log

## 2026-06-04 — Imweb 전용 하네스 구조 리셋

### 배경
크몽 판매용 웹 템플릿 제작 프로젝트를 Cafe24·공통 모듈·전역 토큰 혼합 구조에서 정리하고, 아임웹 전용 독립 완성형 템플릿 제작 체계로 전환한다.

### 결정 사항

| # | 결정 | 이유 |
|---|------|------|
| 1 | **Imweb-only** — Cafe24 미사용 | 판매·납품 대상이 아임웹으로 확정 |
| 2 | **`_modules` 제거** | 공통 모듈 시스템 미사용 |
| 3 | **`_tokens` 제거** | 전역 디자인 토큰 시스템 폐기 |
| 4 | **템플릿 독립 완성형** | 각 템플릿이 자체 HTML·CSS·JS·assets·`:root` 스타일 보유 |
| 5 | **`.cursorrules`, `AGENTS.md` → `_docs/legacy/`** | 루트 단일 규칙·레거시 문서는 참고용으로만 보관 |
| 6 | **`.cursor/rules/*.mdc`로 Cursor 규칙 재편** | 하네스·Figma·QA·Git 워크플로를 규칙 파일로 분리 |
| 7 | **`_harness`, `_logs`, `_docs`, `_delivery/imweb` 구조 생성** | 작업·기록·가이드·납품 경로 분리 |
| 8 | **`templates/template-c` 유지** | 독립 완성형 기준에 가장 부합하는 기존 템플릿 |
| 9 | **push는 사용자 명시 요청 시만** | 원격 반영은 디자이너가 직접 통제 |

### 영향
- `template-a`, `template-b`, `_common`, `_imgs` → `_docs/legacy/`로 이동
- 신규 작업은 `templates/{slug}/` + `.cursor/rules` + `_harness` 흐름을 따른다.

---

## 2026-06-04 — Figma 프레임명 기반 템플릿 slug

### 결정
- 신규 템플릿의 **이름 기준 = Figma MCP 최상위 프레임명**
- Cursor가 프레임명을 감지 → kebab-case slug로 정규화 **제안** → **사용자 승인 후** `templates/{slug}/` 생성
- 정규화: 소문자 · `template_` 접두어 제거 · 공백·`_` → `-` · `[a-z0-9-]`만

### 이유
- Figma·폴더·납품 경로(`_delivery/imweb/{slug}/`) 이름을 일치시켜 혼선 방지
- 임의 slug·무문의 폴더 생성 방지

### 영향
- `10-project-structure.mdc`, `30-figma-to-code.mdc`, `_docs` 가이드에 반영
- 기존 `template-c`는 당장 rename 하지 않음 (별도 승인 시 진행)
