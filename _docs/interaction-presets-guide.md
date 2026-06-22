# Interaction Presets Guide (PC)

> Cursor 규칙: `.cursor/rules/46-interaction-presets.mdc`  
> 구현 방식: `.cursor/rules/45-interaction-patterns.mdc`

## 한 줄 요약

- **10가지 인터랙션**을 프로젝트 표준으로 등록해 두었습니다.
- **지금은 가이드만** — 템플릿에 **자동으로 붙지 않습니다.**
- 나중에 이 표의 **한글명**으로 「story에 **스크롤 등장** 적용해줘」처럼 **연결·승인** 후 구현합니다.

## 이렇게 말하면 됩니다

| 예시 명령 |
|-----------|
| 「stats에 **숫자 카운트업** 적용해줘」 |
| 「news 카드에 **이미지 확대 호버** + **가로 드래그** 연결해줘」 |
| 「hero **히어로 슬라이더** 적용해줘」 |
| 「CTA 버튼 **버튼 글자 슬라이드** 넣어줘」 |

- **한글명** 또는 **영문 ID** 둘 다 OK — 같은 preset입니다.
- 로그·QA에는 **영문 ID**로 기록합니다.

## 적용 순서

1. Figma·섹션 구현 범위 확인  
2. 아래 표에서 **한글명(또는 ID) 선택**  
3. **승인** (채팅 또는 decision-log)  
4. 구현 → 섹션 QA  

**금지:** 승인 없이 AI가 마음대로 인터랙션 추가.

## 슬라이더 방향 버튼 (공통 · preset 외)

`prev` / `next` 화살표가 있는 슬라이더(성공사례·카드 슬라이드 등):

| 위치 | `prev` | `next` |
|------|--------|--------|
| 첫 슬라이드 | **disabled** | 활성 |
| 중간 | 활성 | 활성 |
| 마지막 | 활성 | **disabled** |

- JS: 인덱스 변경마다 `prop("disabled", …)` 동기화
- HTML: 첫 화면에서 `prev`에 `disabled` 초기값
- CSS: `:disabled` 시각 비활성(opacity 등) 필수

구현 상세: `.cursor/rules/45-interaction-patterns.mdc`

## 섹션당 권장 개수

| 종류 | 한글명 예시 | 섹션당 |
|------|-------------|--------|
| 등장·타이핑 | 스크롤 등장, 타이핑 연출 | **1개** |
| 슬라이드·드래그 | 히어로 슬라이더, 가로 드래그 | **1개** |
| hover | 호버 톤, 이미지 확대 호버 등 | **합쳐서 2개 이하** |
| 숫자 | 숫자 카운트업 | **1개** |

## Preset 목록 (한글명 · ID)

| 한글명 | ID | 한 줄 설명 |
|--------|-----|------------|
| **스크롤 등장** | `scroll-reveal` | 스크롤 시 블록이 살짝 올라오며 나타남 |
| **호버 톤** | `hover-tone` | hover 시 버튼·링크 밝기/투명도만 변경 |
| **이미지 확대 호버** | `image-scale-hover` | hover 시 이미지 살짝 확대 (틀 안에서 잘림) |
| **흑백→컬러 호버** | `grayscale-hover-color` | 흑백 → hover 시 컬러 |
| **가로 드래그** | `drag-scroll` | 마우스 드래그로 가로 스크롤 |
| **버튼 글자 슬라이드** | `button-text-slide-hover` | 버튼 hover 시 글자 슬라이드 |
| **타이핑 연출** | `typing-text` | 타이핑 연출 (hero 등 짧은 문구) |
| **카드 넓히기 호버** | `expand-card-hover` | hover 시 카드·패널 넓어짐 (works형) |
| **숫자 카운트업** | `stats-counter` | 숫자 카운트업 |
| **히어로 슬라이더** | `hero-progress-slider` | hero 슬라이드 + pager/progress |

상세(목적·위치·금지)는 **`46-interaction-presets.mdc`** 카탈로그 본문.

## 템플릿별 연결은 이 파일에 쓰지 않음

- 이 문서 = **공통 카탈로그·한글명·명령 예시**만. **템플릿마다 수정하지 않음.**
- 「mainstream story에 scroll-reveal 연결됨」 같은 **연결 현황** → `_logs/decision-log.md` · `_logs/qa-log.md`
- 기록 형식: `[template {slug}] {section-id}: preset — scroll-reveal`

## 전역 규칙

- 승인 없는 인터랙션 추가 금지  
- 한 섹션에 너무 많은 motion 금지  
- 콘텐츠 읽기 방해 금지  
- 같은 요소에 애니메이션 겹치기 금지  
- preset **이름(ID) 통일** — 표에 없는 이름 쓰지 않기  

## Figma에 없는 motion

Figma에 없어도, **카탈로그 한글명·ID를 승인**하면 적용 가능 (`decision-log` 기록).
