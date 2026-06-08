# Context Guide

이 문서는 Cursor/AI가 작업 전 확인해야 할 **컨텍스트 우선순위**를 정의한다.

## 목적

컨텍스트를 많이 넣는 것이 아니라, **현재 작업에 필요한 정보만** 올바른 순서로 확인한다.  
불필요한 과거 정보, 오래된 결정, 작업 범위 밖 내용을 끌어와 코드가 복잡해지는 것을 방지한다.

## 작업 전 컨텍스트 확인 순서

1. **현재 사용자 요청**
   - 이번에 작업할 템플릿
   - 이번에 작업할 섹션
   - 수정 허용 파일
   - 코딩 승인 여부

2. **Active rules**
   - `.cursor/rules/*.mdc`
   - 작업 순서
   - 금지사항
   - QA 기준
   - 섹션 단위 루프
   - 로그 확인 규칙

3. **프로젝트 개요**
   - `_docs/project-overview.md`
   - Imweb-only
   - `templates/{slug}/` 독립 구조
   - 공유 `_modules` / `_tokens` 금지

4. **로그**
   - `_logs/decision-log.md`
   - `_logs/change-log.md`
   - `_logs/qa-log.md`
   - `_logs/failure-log.md`
   - 단, **해당 템플릿과 직전 섹션** 관련 항목을 우선 확인한다.

5. **템플릿별 확정 기준**
   - 템플릿 slug
   - 컨테이너 폭
   - gutter
   - 보류 항목
   - 완료/PASS 섹션

6. **Figma MCP 분석 결과**
   - frame / node-id
   - section size
   - padding
   - gap
   - font-size / line-height / weight
   - color
   - image ratio
   - Auto Layout 구조

7. **Interaction preset** (인터랙션 작업·승인 시)
   - `.cursor/rules/46-interaction-presets.mdc` · `_docs/interaction-presets-guide.md`
   - **사용자가 선택·승인한 preset ID만** — 카탈로그 10종 전체 ≠ 자동 적용

8. **사용자 선호**
   - **비개발 UI 디자이너** — 설명은 **짧고·Figma 말·쉬운 한국어** (`20-harness-workflow.mdc` 「사용자 커뮤니케이션」)
   - 단순 구조 우선
   - 과한 공통화 금지
   - 템플릿별 독립 구현
   - 한눈에 확인 가능한 보고
   - 승인 전 코딩 금지

## 무시해야 할 컨텍스트

- 현재 작업 범위와 무관한 **다른 템플릿** 정보
- 사용자가 **폐기한** 이전 결정
- active rules가 아닌 **legacy 문서**의 오래된 규칙
- 현재 섹션과 무관한 **과거 QA** 항목
- **추측성** 해석
- 사용자가 승인하지 않은 **기능 추가**
- Figma·**46 preset 승인** 없는 **CTA, 슬라이더, 커스텀 motion** (카탈로그 ID 승인 시 적용 가능 — `decision-log`)

## 충돌 시 우선순위

충돌이 발생하면 아래 순서를 따른다.

1. 최신 사용자 명시 승인/지시
2. active rules
3. `decision-log.md`
4. 현재 작업 범위
5. Figma MCP 수치
6. `qa-log.md` / `failure-log.md`
7. `change-log.md`
8. legacy 문서

모호하면 구현하지 말고 **질문**한다.

## 작업 보고 원칙

> 상세: `.cursor/rules/20-harness-workflow.mdc` 「사용자 커뮤니케이션」

**작업 전** — 3~5줄 이내

- 이번에 할 **섹션** (Figma 이름)
- **눈에 보이는 수치** (여백, 글자, 정렬, 이미지 비율)
- **물어볼 것** (있을 때만)

**작업 후** — 짧게

- **뭐 바꿨는지** (bullet 3~5개)
- **어디서 보면 되는지** (파일·새로고침)
- **확인 부탁** 1줄
- QA는 **맞음/틀림** + 고친 점만 (장문 분석은 요청 시)

**피하기:** flex, clamp, bbox, shell 같은 **개발 용어만** 길게 나열
