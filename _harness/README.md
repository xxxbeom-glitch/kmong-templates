# Harness

작업·리뷰·스냅샷·리포트용 폴더. 상세 규칙은 `.cursor/rules/20-harness-workflow.mdc`.

## 기본 루프 (섹션 1개)

1. MCP로 해당 섹션 수치·구조 보고
2. 사용자 **「진행」** 승인
3. 요청 섹션만 HTML/CSS/JS 구현
4. 섹션 QA 후 `_logs/qa-log.md` 기록
5. 사용자 PASS 후 다음 섹션 요청

페이지 전체 완료 후: 전체 납품 QA → `_delivery/imweb/{slug}/` · commit(사용자 요청 시)

## 반응형 (필수)

> 상세: `.cursor/rules/35-responsive.mdc`

- **기준:** Figma desktop 1920px
- **breakpoint:** 1024px(태블릿) · 768px(모바일) — 섹션 구현 시 함께 반영
- **768px 이하:** 가로 배치 → 세로 스택 · hover-only UI 대체·비활성화
- **QA 뷰포트:** 1920 · 1440 · 1024 · 768 · 390px — overflow·줄바꿈·aspect-ratio·터치 영역(≥44px)

## Context Engineering

AI 작업 품질은 **「무엇을 읽는가」**와 **「무엇을 무시하는가」**에 따라 달라진다.

**기본 원칙:**
- 현재 요청을 최우선으로 본다.
- active rules를 기준으로 작업한다.
- 관련 로그와 decision-log로 이전 결정과 실패를 확인한다.
- Figma MCP 수치는 구현 기준으로 사용한다.
- 오래된 legacy 규칙이나 무관한 템플릿 정보는 현재 작업에 섞지 않는다.
- 충돌 시 `_docs/context-guide.md`의 우선순위를 따른다.

## 로그 = 작업 기억

- **시작:** `_logs` 최근 항목 확인 (`_logs/README.md` 참고)
- **진행:** 이전 승인/보류/FAIL 항목 반영
- **종료:** `change-log.md` + `qa-log.md` 갱신
- **실패 시:** `failure-log.md` 기록
- **결정 변경 시:** `decision-log.md` 기록
