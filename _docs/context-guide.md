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

7. **사용자 선호**
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
- Figma에 없는 **CTA, 슬라이더, 인터랙션**

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

**작업 전** 보고에는 아래 3가지를 짧게 포함한다.

- 이번 작업 범위
- 확인한 주요 컨텍스트
- 보류/충돌/주의점

**작업 후** 보고에는 아래 4가지를 포함한다.

- 수정 파일
- 구현 요약
- QA 결과
- 다음 작업 시 주의점
