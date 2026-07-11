# Cafe24 Release Guide

실행 규칙: `.cursor/rules/84-cafe24-release.mdc`  
보고서 골격: `_archive/docs/cafe24/release-templates/`

## 한 줄 원칙

working skin → release candidate → upload package → **test design** → QA → (승인) production → rollback 보관.

## Agent 기본 동작

1. `_release/{slug}/`에 RC · upload package · reports · hashes 준비  
2. 체크리스트·안내문 작성  
3. **인증·업로드 실행은 사용자가 명시하고 test design이 확인된 경우만**

운영 대표 전환·운영 자동 업로드는 Agent가 임의로 하지 않음.  
인증 정보(문서·채팅 영구 저장 금지).

## Track C

배포·upload package **해당 없음**.

## Small patch

`84` §13. commerce 관련이면 간소화 금지.

## 관련

`80` · `82` · `popup-rules.md` · `CAFE24_RULES_OVERVIEW.md`
