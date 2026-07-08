# Source-to-Original QA

> 폴더: `02-original-qa/` · 산출·캡처·로그는 `_dev/`와 공유 가능.  
> **originalQa = pass | 사용자 승인 partial 전 working-copy 금지.**

## 흐름

```
source capture
→ original download (01-original)
→ source-to-original QA (02-original-qa)
→ original PASS | approved partial
→ analysis → working-copy …
```

## 비교 축

| remote / ZIP | local |
|--------------|-------|
| rendered DOM | local rendered DOM |
| request inventory | file inventory |
| CSS/JS/font/image URLs | saved assets |
| page links | page inventory |
| screenshots 1920/390 | local screenshots |

동적 timestamp · session · random ID는 비교 전 **normalize**.

## 수집 범위 (클라이언트만)

브라우저가 받은 HTML/CSS/JS/정적 자산만 원본 수집 대상.

**URL만으로 확보했다고 보지 않음:**

- 서버 내부 PHP · 비공개 템플릿
- 카페24 서버 모듈 원본 · 관리자 로직 · DB 코드

데모 URL(`browser-captured`): 판매 스킨 전체 보유로 **간주 금지** (`cafe24-original.md`).

## 필수 검사

rendered DOM · HTML 구조 · CSS/JS request · 이미지·SVG·아이콘·배지·로고 · 웹폰트 · background-image · video/poster · JSON/정적 데이터 · 외부 라이브러리 · iframe · 내부 링크 · 주요 페이지 · Desktop 1920 · Mobile 390 · 메뉴·슬라이더·탭·팝업·호버·sticky·스크롤 · console error · network error · broken link · external CDN

## 권장

normalized DOM hash · checksum · 크기 비교 · HTTP status · MIME · 누락 요청 · 깨진 상대경로

## PASS (전부)

- 주요 페이지 로컬 오픈
- HTML 구조 실질 일치
- 핵심 CSS/JS 로드
- 이미지·SVG·아이콘·배지·웹폰트·background 표시
- 주요 인터랙션 정상 **또는** 제한 기록
- Desktop 1920 + Mobile 390 비교 캡처
- missing / broken / external / console·network 목록
- 로컬 재현 불가 항목 명시
- 사용자가 `_dev/source-original-compare` 등으로 확인 가능

## PASS 금지 → FAIL

구조만 유사 HTML · 색면 placeholder · 임의 이미지/폰트 대체 · CSS/웹폰트/이미지 누락 · 인터랙션 삭제 · 내부 페이지 미수집 · 한 viewport만 · 비교 캡처 없음 · 누락 미기록 · **original을 고쳐 맞춤** · 새 CSS 재디자인

## PARTIAL

불완전 항목 + working-copy 진행 가능 여부를 **사용자 승인** 후에만 다음 단계.

## 산출물 (최소)

`02-original-qa/report.md` · `_dev/qa-log.json` · missing/broken/external/console/network JSON · `visual-diff/desktop-1920|mobile-390/`
