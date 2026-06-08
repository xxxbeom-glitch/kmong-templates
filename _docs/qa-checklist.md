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
| 3 | **페이지 통합 QA** 1회 — 섹션 경계·스크롤·GNB |
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
- [ ] 레이아웃 깨짐·가로 overflow 없음
- [ ] 텍스트 줄바꿈·이미지 aspect-ratio 유지
- [ ] 768px 이하 버튼·링크 터치 영역 **≥44×44px**
- [ ] hover-only UI → 터치 환경 대체·비활성화
- [ ] clamp min으로 모바일 가독성 확보
- [ ] 인라인 `style=""` 없음

---

## 4. 인터랙션 QA (해당 시)

> preset 카탈로그: `_docs/interaction-presets-guide.md` · `46-interaction-presets.mdc`

- [ ] GNB 햄버거 열림/닫힘
- [ ] GNB `is-active` 해당 페이지 HTML에만 적용
- [ ] FAQ 아코디언 · 캐러셀 · AOS · CTA hover
- [ ] **Preset ID** = 사용자 승인 목록 · 섹션당 상한 · **중복 animation 없음**
- [ ] `prefers-reduced-motion` 동작
- [ ] 콘솔 에러 없음

---

## 5. Imweb 납품 QA

- [ ] jQuery 중복 선언 없음
- [ ] 이미지 상대 경로 정상
- [ ] 코드 위젯 삽입 시 레이아웃 깨짐 없음
- [ ] `_delivery/imweb/{slug}/` 복사본 동일 동작 (납품 시)

---

## 6. 작업 후 — 로그 기록

- [ ] `_logs/change-log.md` 기록 완료
- [ ] `_logs/qa-log.md` 기록 완료
- [ ] FAIL 또는 재발 가능 이슈가 있으면 `_logs/failure-log.md` 기록 완료

---

## 7. Git commit 전 QA

- [ ] 위 1~5 해당 항목 PASS
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
