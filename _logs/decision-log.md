# Decision Log

## 2026-06-04 — Imweb 전용 하네스 구조 리셋

### 배경
크몽 판매용 웹 템플릿 제작 프로젝트를 Cafe24·공통 모듈·전역 토큰 혼합 구조에서 정리하고, 아임웹 전용 독립 완성형 템플릿 제작 체계로 전환한다.

### 결정 사항

| # | 결정 | 이유 |
|---|------|------|
| 1 | **Imweb-only** — Cafe24 미사용 | 판매·납품 대상이 아임웹으로 확정 |
| 2 | **`_modules` 제거** | 공통 모듈 시스템 미사용 |
| 3 | **`_tokens` 제거** | 전역 디자인 토큰 시스템 폐기 |
| 4 | **템플릿 독립 완성형** | 각 템플릿이 자체 HTML·CSS·JS·assets·`:root` 스타일 보유 |
| 5 | **`.cursorrules`, `AGENTS.md` → `_docs/legacy/`** | 루트 단일 규칙·레거시 문서는 참고용으로만 보관 |
| 6 | **`.cursor/rules/*.mdc`로 Cursor 규칙 재편** | 하네스·Figma·QA·Git 워크플로를 규칙 파일로 분리 |
| 7 | **`_harness`, `_logs`, `_docs`, `_delivery/imweb` 구조 생성** | 작업·기록·가이드·납품 경로 분리 |
| 8 | ~~`templates/template-c` 유지~~ → **legacy 이동** (아래 결정) | 당시 임시 결정, 이후 `templates/` 비움 원칙으로 변경 |
| 9 | **push는 사용자 명시 요청 시만** | 원격 반영은 디자이너가 직접 통제 |

### 영향
- `template-a`, `template-b`, `_common`, `_imgs` → `_docs/legacy/`로 이동
- 신규 작업은 `templates/{slug}/` + `.cursor/rules` + `_harness` 흐름을 따른다.

---

## 2026-06-04 — Figma 프레임명 기반 템플릿 slug

### 결정
- 신규 템플릿의 **이름 기준 = Figma MCP 최상위 프레임명**
- Cursor가 프레임명을 감지 → kebab-case slug로 정규화 **제안** → **사용자 승인 후** `templates/{slug}/` 생성
- 정규화: 소문자 · `template_` 접두어 제거 · 공백·`_` → `-` · `[a-z0-9-]`만

### 이유
- Figma·폴더·납품 경로(`_delivery/imweb/{slug}/`) 이름을 일치시켜 혼선 방지
- 임의 slug·무문의 폴더 생성 방지

### 영향
- `10-project-structure.mdc`, `30-figma-to-code.mdc`, `_docs` 가이드에 반영
- ~~기존 `template-c` 당장 rename 보류~~ → **legacy 이동으로 대체** (아래 결정)

---

## 2026-06-04 — `templates/` 비움 · template-c legacy 이동

### 결정
- **`templates/`는 활성 작업 공간** — 리셋 후 기존 템플릿 폴더를 두지 않는다.
- `templates/template-c/` → `_docs/legacy/templates/template-c/` 이동 (삭제 아님)
- 신규 템플릿만 Figma 프레임명 승인 후 `templates/{slug}/`에 생성

### 이유
- Figma 프레임명 기반 slug 체계와 혼선 방지
- `template-c`는 참고용 legacy, 현재 작업 기준이 아님

### 영향
- `templates/.gitkeep`만 유지 · `start.bat`는 첫 신규 템플릿 생성 후 수정

---

## 2026-06-08 — 반응형 breakpoint·QA 뷰포트 확정

### 결정
- Figma **desktop 1920px** 기준 구현
- **필수 breakpoint:** 1024px(태블릿) · 768px(모바일)
- 768px 이하: 가로 배치 → 세로 스택 · hover-only UI → 터치 대체·비활성화
- **QA 뷰포트 5종:** 1920 · 1440 · 1024 · 768 · 390px
- 규칙 파일: `.cursor/rules/35-responsive.mdc`

### 이유
- 기존 active rules는 768px만 명시 — 태블릿·QA 뷰포트·터치 기준 부족

### 영향
- `00-core`, `20-harness-workflow`, `30-figma-to-code`, `40-template-code-style`, `45-interaction-patterns`, `50-qa-checklist` · `_docs/figma-to-code-guide.md` · `_docs/qa-checklist.md` · `_harness/README.md` 갱신

---

## 2026-06-08 — mainstream 템플릿 작업 기준

### 결정
| 항목 | 내용 |
|------|------|
| Figma | `mainstream` (`146:943`) · slug `mainstream` |
| GNB 카피 | Figma MCP 기준 (스크린샷과 동일 확인) |
| header | Auto Layout 전환됨 — 구현 시 MCP 재확인 |
| hero 슬라이더 | 1차 **디자인만**(정적) · 인터랙션 **추후** |
| 반응형 | `35-responsive.mdc` 적용 |

### 영향
- `templates/mainstream/` 섹션별 구현 시 위 기준 따름

---

## 2026-06-08 — mainstream 섹션 QA 루프 복귀

### 결정
- **3섹션 일괄·관망 모드 종료** — header~works **소급 QA·qa-log 기록** 완료
- **이후 섹션(faq·cta·footer):** 구현 → **섹션 QA → qa-log PASS → 사용자 PASS** 필수
- gap · align · fluid — `50-qa-checklist` · bbox 교차 검증 적용

### 이유
- story align · works gap 등 **QA 생략**으로 사용자 확인 전까지 미검출
- 규칙(`20-harness-workflow`)과 실제 진행 불일치

### 영향
- `_logs/qa-log.md` mainstream 섹션 6건 추가
- `failure-log` works gap 항목 · rules gap bbox 보강

---

## 2026-06-08 — QA: 섹션별 검수 항상 필수

### 결정
- **구현 방식**(섹션 1개 / 일괄·풀)과 무관하게 **섹션별 QA + qa-log 1건씩** 필수
- 일괄·풀: 구현만 한 번에 → **섹션 QA × N** → **페이지 통합 QA** 1회
- **금지:** 통합 QA만 하고 섹션 QA 생략

### 이유
- 사용자 확정 — story align · works gap 등 **섹션 단위** 검수 없으면 누락

### 영향
- `20-harness-workflow.mdc` · `_docs/qa-checklist.md` 갱신

---

## 2026-06-08 — 사용자 커뮤니케이션 (디자이너)

### 결정
- 사용자 **비개발 UI 디자이너** — Agent 보고는 **짧·쉬운 말·Figma 용어** 우선
- 개발 용어는 **쉬운 뜻 병기** · PASS/FAIL → **맞음/틀림** 병행 가능
- 원인 분석·재발방지 **장문**은 사용자 **요청 시**만

### 영향
- `20-harness-workflow.mdc` 「사용자 커뮤니케이션」
- `_docs/context-guide.md` 작업 보고 원칙

---

## 2026-06-08 — Story 카드 이미지 Fill(cover) 확정

### 결정
- 카드 이미지 = **틀(Figma 비율) + Fill** — `object-fit: cover` · 가운데 잘림
- 원본 크기·비율 달라도 **카드 크기에 맞게 축소** 후 틀 꽉 채움
- HTML `width`/`height` = **틀 비율** (원본 px attribute 금지)

### 이유
- 사용자 확인 — B 원본 테스트 후 **가장 적합**

### 영향
- `30-figma-to-code.mdc` 「Image · card fill」
- `templates/mainstream` story CSS

---

## 2026-06-08 — Section shell · full-bleed 분류 (섹션 공통)

### 결정
- 섹션마다 MCP bbox로 **Shell 타입** 분류 — **guttered / full-bleed / breakout**
- Figma 분석 보고·QA·구현 **3단계 모두** Shell 1줄 필수 (CTA만 예외 **금지**)
- full-bleed·breakout band → `.is-bleed-x` + band **내부**만 gutter

### 이유
- CTA bg 풀폭을 **다른 섹션 gutter 패턴**으로 구현 → 구현·재확인·QA 모두 미검출
- stats·CTA 등 **섹션마다** 좌우 방식이 다를 수 있음 — 수동 사후 수정 반복 방지

### 영향
- `30-figma-to-code.mdc` 「Section shell · full-bleed」
- `50-qa-checklist.mdc` Fluid scale #7·#8
- `20-harness-workflow.mdc` Figma 보고 Shell 1줄

---
