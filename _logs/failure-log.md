# Failure Log

## 2026-07-08 — [reference-harness] ptmd869920 미러 fidelity 후속 이슈

### 증상 (순차 발생)
1. 스타일 붕괴 (레이아웃·폰트 미적용)
2. 퀵카테고리 과다 (로컬 22 ≠ 원격 8)
3. 슬라이더/배너 인터랙션 단절
4. 메인만 미러 → 페이지 이동 불가
5. preview 포트 충돌 · 구 서버가 수정 무시
6. Windows 경로 ENOENT (상품 슬러그 제어문자)
7. 데모 팝업/샘플가이드가 클릭 가로막음

### 원인
1. `optimizer.php?…` query 묶음 파일명 충돌 + HTML 절대경로 잔존 + `.php` MIME
2. post-JS DOM을 entry로 저장 → 배너 manager 재클론
3. `/exec` 미프록시 · preview 미기동
4. BFS 멀티페이지/url-map 네비 미적용
5. EADDRINUSE · 스크립트 수정 후 미재기동
6. URL 디코드 제어문자·예약문자를 경로에 사용
7. original을 고쳐 오버레이 삭제하려 함(immutable 위반 위험)

### 재발 방지 (지침)
- `site-clone-fidelity.md` — 금지 표 · 기술 규칙 · **후속 이슈 표** · preview MIME/재기동 · fidelity 수치
- `browser-capture-qa.md` — CSS MIME · 배너 개수=원격 · preview 재기동 · 슬라이더 init
- `83-reference-harness.mdc` — query-hash+`.css`/`.js` · EADDRINUSE

### 해결
- mirror v3 pristine + query-hash · multipage v4 · preview live proxy · inject 숨김 only

---

## 2026-06-09 — wrap shell PASS · figure UA margin 미검 (smile-clinic intro)

### 증상
- 병원소개: **2단 텍스트는 wrap(1440)에 맞는데 사진만 좁게** 보임 (좌우 ~40px inset)
- Figma MCP·CSS shell 수치는 PASS였으나 **사용자 캡처·재지적**까지 미수정

### 원인
1. QA가 **`.section-shell` max-width·section pad**만 확인 — **자식 요소별 box-model** 미검
2. HTML `<figure>` **UA `margin-inline: 40px`** 기본값 미reset — 형제 `<div>`/`<p>`와 폭 불일치
3. Figma JSON은 자식 x/w=1440으로 동일 — **HTML 태그 선택 → CSS reset** 매핑 체크 없음
4. typography·gap 수정만 **부분 PASS** — 사진+리드+2단 **콘텐츠 묶음** edge 정렬 미실시

### 재발 방지
- `50-qa-checklist.mdc` · `_docs/qa-checklist.md` — **「Wrap 내 DOM · box-model QA」** 5항
- `30-figma-to-code.mdc` — MCP 보고 **Wrap children x/w** 필수
- `20-harness-workflow.mdc` — 섹션 QA 절차에 box-model 단계
- `40-template-code-style.mdc` — `.section-shell` / `.sub-section figure` margin reset 패턴
- @1920 **캡처 또는 DevTools**로 형제 edge 정렬 — shell PASS만으로 완료 **금지**

### 해결
- `templates/smile-clinic/css/style.css` — `.sub-about__figure` · `.sub-section figure` reset (2026-06-09)

---

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

### 재발 방지 (규칙 패치 2026-06-09 — 모바일 @768 gutter · shell)
- **증상:** @768 본문 gutter 미적용·이중 pad · header/본문 시작선 불일치 · PC 2단 grid 잔존 · full-bleed panel 안 gutter · 로고 PNG bbox inset
- **패치:** `35-responsive.mdc` 「모바일 @768」 · `30` 「Shell — @768」 · `40` · `50` 「모바일 @768 gutter · 시작선 QA」 · `20` mobile preview→이식 · `_docs/*` 동기화

### 재발 방지 (규칙 패치 2026-06-09 — MCP JSON Section BG)
- **증상:** fill 없음 → 인접 섹션과 동일 BG 추론 · `#fffefd`/`#f9f9f9`/`#fffefe` 단일 `--color-bg` 통합 · `view_node` 썸네일만으로 Section BG 확정 · `backgroundColor` 노이즈를 BG로 사용
- **대표:** smile-clinic SIGNATURE `#f9f9f9` vs STRENGTH `#fffefd` 누락
- **패치:** `30` 「MCP JSON 분석」 — JSON 우선 · fills vs backgroundColor · 부모 상속 · 인접 Section BG 표 · overlay/섹션 BG 분리 · `20`/`40`/`50`/`figma-to-code-guide`/`qa-checklist` 동기화
