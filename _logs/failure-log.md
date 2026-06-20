# Failure Log

## 2026-06-08 — mainstream layout shell cap (재발 방지)

### 증상
- 넓은 모니터(2560+ 등)에서 hero·story·header 좌우 **여백 과다**
- Figma 의도(1920 기준 gutter 40 + 콘텐츠 거의 풀폭)와 **비율 불일치**

### 원인
1. shell에 `max-width: 1840px` / `clamp(..., 1840px)` cap 적용
2. `.container`에 `max-width 1920` + `padding 40` + 자식 `max-width 1840` **이중·삼중 축소**
3. active rules에 **「1920 = 설계 기준, ultrawide shell cap 금지」** 명시 없음 → legacy `template-c` clamp 패턴을 shell에 오적용

### 재발 방지
- `.cursor/rules/30-figma-to-code.mdc` 「1920 shell · fluid」 추가
- shell: `padding-inline: max(20px, gutter÷19.2 vw)` + 자식 `width:100%`
- **내부 narrow 프레임**(hero copy 1440 등)만 `max-width` cap
- QA **2560+** 뷰포트 필수

### 해결
- `templates/mainstream/css/style.css` — gutter vw only, shell cap 제거 (2026-06-08)

---

## 2026-06-08 — mainstream CTA full-bleed 미적용 (재발 방지)

### 증상
- CTA 배경이 좌우 **40px 마진** 안에 들어감 — Figma bg Frame **1920 풀폭**과 불일치
- 구현·스냅샷 재확인·qa-log PASS 후에도 **사용자 지적까지** 미수정

### 원인
1. **모든 섹션**에 `padding-inline: var(--layout-pad-x)` 습관 적용
2. MCP에서 bg **1920** vs text **1840** bbox **미분류**
3. QA에 **full-bleed vs guttered** 구분 항목 없음
4. stats는 `100vw` 패턴 있었으나 CTA에 **교차 참조 없음**

### 재발 방지
- `30-figma-to-code.mdc` 「Section shell · full-bleed」·`.is-bleed-x`
- Figma 보고 · QA checklist Shell 타입 + @1920 **양끝 bg** 확인

### 해결
- `templates/mainstream/css/style.css` — CTA section pad-x 0 · panel 100vw (2026-06-08)

---

## 2026-06-08 — mainstream story head text-align 누락 (재발 방지)

### 증상
- story 섹션 타이틀·설명이 **좌측 정렬**로 구현됨
- Figma `146:1397` — title/desc `textAlignHorizontal: CENTER`, 풀폭(1840) TEXT 박스

### 원인 (5가지)
1. **MCP 파싱 범위:** padding/gap/font-size만 추출 · **`textAlignHorizontal` 미확인**
2. **규칙 공백:** `30-figma-to-code`에 text-align 매핑 없음 → CSS 기본값 `left` 적용
3. **QA 공백:** 체크리스트에 **정렬 대조 항목 없음** · story 섹션 formal QA·PASS 생략(3섹션 일괄)
4. **오해 소지:** TEXT 박스 w=1840·x=640만 보면 “풀폭 좌측”으로 오판 · **박스 내부 center** 구분 실패
5. **같은 섹션 혼동:** story **card body**는 좌하단 정렬 → head(중앙)와 **블록별 정렬이 다름**을 구분 안 함

### 재발 방지
- `30-figma-to-code.mdc` 「Typography · alignment」 — `textAlignHorizontal` → `text-align` 1:1
- `20-harness-workflow.mdc` Figma 보고에 **text-align / flex alignment** 필수
- `50-qa-checklist.mdc` · `_docs/qa-checklist.md` — head·title 정렬 체크
- MCP 분석 보고 시 head/title/body **블록별** align 명시

### 해결
- `story__head` — `text-align: center` · `align-items: center` (2026-06-08)

---

## 2026-06-08 — mainstream works gallery gap 오판 (재발 방지)

### 증상
- works 카드 사이 **간격 10px** — Figma는 **밀착(gap 0)**

### 원인
1. MCP `itemSpacing: 10`만 적용 · **bbox `gapFromPrev: 0` 미확인**
2. 자식 폭 합 959+294×3=1840 = 부모 폭 → gap 자리 없음
3. **섹션 QA·qa-log 생략** (일괄 구현 관망 모드)

### 재발 방지
- `30-figma-to-code.mdc` 「Gap · spacing」— bbox 교차 검증
- `50-qa-checklist.mdc` gap bbox 항목
- **섹션마다 qa-log PASS** (`20-harness-workflow.mdc`)

### 해결
- `.works-gallery { gap: 0 }` (2026-06-08)

---

## 2026-06-04 — 구조 리셋

No failure recorded.

---

## 2026-06-08 — cross-template: overlay · gutter · bleed · logo · scroll (재발 방지)

> smile-clinic 등에서 반복된 **템플릿 공통** 실패 유형 — 디자인별이 아니 규칙화.

### 증상 (대표)
1. 카드 **gradient overlay**·섹션 **배경색** Figma와 불일치 (PNG export만 구현)
2. **로고** DevTools 높이 ≪ Figma (여백 큰 PNG + `contain`+고정 height)
3. 섹션 **title 시작 x** 다른 섹션과 불일치 (inner에 gutter pad + max-width 이중)
4. **가로 스크롤** (`.is-bleed-x` 한쪽 margin · bleed 자식 `100vw` 중복)
5. **F5** 후 스크롤 중간 위치 복원
6. 섹션 head **label→title→본문** 간격 섹션마다 상이 (ad-hoc margin)

### 재발 방지 (규칙 패치 2026-06-08)
- `30-figma-to-code.mdc` — Fill·overlay·gradient · Shell·gutter·inner · Logo·icon · bleed overflow · MCP `Section BG`/`Overlays`
- `40-template-code-style.mdc` — `.section-shell` · `.section-head` · logo img · `main.js` scroll top · `overflow-x: clip`
- `45-interaction-patterns.mdc` — scroll restoration
- `50-qa-checklist.mdc` · `_docs/qa-checklist.md` — Section BG · Overlays · horizontal scroll · logo · F5
- `20-harness-workflow.mdc` — MCP 보고 필수 1줄 확장
