# QA Checklist

> Cursor 규칙: `.cursor/rules/50-qa-checklist.mdc`  
> **전 항목 PASS = QA PASS** · 하나라도 FAIL이면 완료·commit 금지

결과 기록: `_logs/qa-log.md` (**섹션 1개 = qa-log 1건**)

---

## 섹션 QA 루프 (매 섹션 필수)

> 규칙: `.cursor/rules/20-harness-workflow.mdc` 「섹션 QA 절차」

1. 해당 섹션만 **§2~§4** 체크 (구조 QA는 최초 1회 또는 변경 시)
2. Fluid scale QA — **1920 · 2560+** 필수
3. FAIL → 수정 → **재검수** (PASS 전 다음 섹션 금지)
4. **`_logs/qa-log.md` 기록** → 사용자 PASS → 다음 섹션

**금지:** qa-log 미기록 · 일괄·풀 구현 후 **섹션 QA 생략** · 통합 QA만으로 섹션 QA 대체

### 일괄·풀 구현 시 (구현만 묶음, QA는 섹션별)

| 단계 | 내용 |
|------|------|
| 1 | N섹션 구현 (한 번에) |
| 2 | **섹션 QA × N** — faq, cta, … 각각 §2~§4 · **qa-log N건** |
| 3 | **페이지 통합 QA** 1회 — 섹션 경계·스크롤·GNB · **§3-1 실브라우저 4종** |
| 4 | 사용자 PASS |

---

## 0. 작업 전 — 로그 확인

- [ ] 작업 시작 전 해당 템플릿 및 직전 섹션 관련 `_logs` 최근 항목 확인
- [ ] 이전 QA FAIL / 보류 / 사용자 승인 사항 반영

---

## 1. 구조 QA

- [ ] 파일이 `templates/{slug}/` 안에만 존재
- [ ] `index.html`, `css/style.css`, `js/main.js`, `assets/` 구성 완료
- [ ] 다른 템플릿·공통 폴더 import 없음
- [ ] `_modules`, `_tokens` 미사용·미생성

---

## 2. Figma 대조 QA

- [ ] **Section shell** — guttered / full-bleed / breakout · @1920 bg가 끝까지인지 (`50-qa-checklist.mdc` #7·#8)
- [ ] **Section BG** · **Overlays (gradient/opacity)** — MCP 보고 1줄씩과 일치
- [ ] **Shell · inner** — section gutter + `.section-shell` (pad 이중 없음) · **section-head** 토큰
- [ ] padding / gap / font-size / line-height / color — MCP → **clamp/vw**
- [ ] **gap bbox 검증** — `itemSpacing` + **인접 자식 bbox 간격** (불일치 시 bbox 우선)
- [ ] **text-align · head alignment** = Figma `textAlignHorizontal` / Auto Layout (섹션 head vs card 등 **블록별**)
- [ ] 콘텐츠 폭·gutter — **해당 템플릿 MCP** (고정 1840 가정 없음)
- [ ] 이미지 aspect-ratio = Figma W/H
- [ ] Auto Layout gap → CSS (**itemSpacing + bbox 실측**)
- [ ] 추측 수치 없음 (승인된 하드코딩 제외)

### 2-1. Fluid scale QA (필수)

> 규칙: `30-figma-to-code.mdc` 「Fluid scale」 · 체크: `50-qa-checklist.mdc`

| 뷰포트 | 확인 |
|--------|------|
| **1920** | MCP gutter·shell·font 비율 1:1 |
| **2560+** | shell cap 없이 gutter vw만, 콘텐츠 가로 채움 |
| 1440 · 1024 · 768 · 390 | 비례 축소·breakpoint 구조 |

- [ ] font-size computed — 1920 ↔ 2560 **비례** (px 고정 FAIL)
- [ ] shell `max-width: {content_px}` cap **없음** (inner narrow 제외)
- [ ] gutter pad + shell max-width **이중 없음**

---

## 3. PC / Tablet / Mobile 반응형 QA

> 상세: `.cursor/rules/35-responsive.mdc`

- [ ] `@media (max-width:1024px)` · `@media (max-width:768px)` 블록 존재·반영
- [ ] **QA 뷰포트 5종** 확인: **1920 · 1440 · 1024 · 768 · 390px**
- [ ] 레이아웃 깨짐·**가로 overflow 없음** (`.is-bleed-x` 좌우 margin · bleed 자식 `100%` · `overflow-x: clip`)
- [ ] **로고 `<img>`** computed ≈ Figma bbox (±2px)
- [ ] 텍스트 줄바꿈·이미지 aspect-ratio 유지
- [ ] 768px 이하 버튼·링크 터치 영역 **≥44×44px**
- [ ] hover-only UI → 터치 환경 대체·비활성화
- [ ] hover 스타일 → **`@media (hover: hover) and (pointer: fine)` 내부만** (미디어쿼리 밖 `:hover` 금지)
- [ ] **768px 이하 full-screen 높이** — `height`/`min-height`/`max-height: 100vh` **단독 금지**
- [ ] hero · first-view → **`min-height: 100svh`** (fallback 허용, vh 단독 금지)
- [ ] 모바일 메뉴 · 모달 · 전체화면 오버레이 → **`height` 또는 `min-height: 100dvh`**
- [ ] 하단 고정 CTA · floating · quick menu → **`env(safe-area-inset-bottom)`** (`viewport-fit=cover` 해당 시)
- [ ] `input` / `select` / `textarea` — 모바일 **font-size ≥ 16px** (자동 확대 방지)
- [ ] 모바일 텍스트 블록 — **고정 height 지양** · `min-height`/`auto` · 충분한 `line-height` · `word-break: keep-all` 검토
- [ ] clamp min으로 모바일 가독성 확보
- [ ] 인라인 `style=""` 없음

### 3-1. 모바일 실브라우저 QA (페이지·납품 QA 필수)

> DevTools 뷰포트만으로 모바일 PASS **금지** · `35-responsive.mdc` · `50-qa-checklist.mdc`

| 환경 | 확인 |
|------|------|
| **iPhone Safari** | 공통 6항 |
| **iPhone Chrome** | 공통 6항 |
| **Android Chrome** | 공통 6항 |
| **KakaoTalk 인앱브라우저** | 공통 6항 + 인앱 하단 UI |

**공통 6항:**

- [ ] hero / first-view 높이 (주소창·하단 바 변동 시 잘림·빈 여백 없음)
- [ ] 하단 고정 CTA가 홈 인디케이터·인앱 바에 **가려지지 않음**
- [ ] 모바일 메뉴 / 모달 높이·**내부 스크롤** 정상
- [ ] input 터치 시 **화면 자동 확대 없음**
- [ ] 터치 후 **hover 효과 잔상 없음**
- [ ] **한글 줄바꿈·텍스트 잘림** 없음 (iOS/Android 렌더링 차이 확인)

---

## 4. 인터랙션 QA (해당 시)

> preset 카탈로그: `_docs/interaction-presets-guide.md` · `46-interaction-presets.mdc`

- [ ] **F5 새로고침** — 페이지 top (`main.js` scrollRestoration + pageshow)
- [ ] GNB 햄버거 열림/닫힘
- [ ] GNB `is-active` 해당 페이지 HTML에만 적용
- [ ] FAQ 아코디언 · 캐러셀 · AOS · CTA hover
- [ ] **Preset ID** = 사용자 승인 목록 · 섹션당 상한 · **중복 animation 없음**
- [ ] `prefers-reduced-motion` 동작
- [ ] 콘솔 에러 없음

---

## 5. 납품 QA

- [ ] jQuery 중복 선언 없음
- [ ] 이미지 상대 경로 정상
- [ ] HTML/CSS 삽입·호스팅 시 레이아웃 깨짐 없음
- [ ] `_delivery/{slug}/` 패키지 오프라인 동작 (`node _harness/package-delivery.js {slug}`)

---

## 6. 작업 후 — 로그 기록

- [ ] `_logs/change-log.md` 기록 완료
- [ ] `_logs/qa-log.md` 기록 완료
- [ ] FAIL 또는 재발 가능 이슈가 있으면 `_logs/failure-log.md` 기록 완료

---

## 7. Git commit 전 QA

- [ ] 위 1~5 해당 항목 PASS (납품·페이지 QA 시 **§3-1 실브라우저 4종** 포함)
- [ ] §6 로그 기록 완료
- [ ] `git status` — 요청 범위 밖 변경 파일 없음
- [ ] 미요청 템플릿·파일 미수정
- [ ] commit message: `[scope] 한글 작업 내용` 형식

---

## 완료 규칙

| 상태 | 허용 |
|------|------|
| QA PASS | 완료 처리 · commit 가능 (사용자 요청 시) |
| QA FAIL | 수정 후 재검수 · 완료 선언 금지 |
| push | 사용자 명시 요청 시만 |
