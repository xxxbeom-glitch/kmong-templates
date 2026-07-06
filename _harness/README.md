# Harness

**Harness = 작업 절차**(Figma → 승인 → 구현 → QA → 로그). 상세: `.cursor/rules/20-harness-workflow.mdc`.

## 작업 공간 (확정)

| 구분 | 경로 | 용도 |
|------|------|------|
| **개발·구현** | `templates/{slug}/` | HTML/CSS/JS **유일한 작업 공간** — 여기에 직접 작성 |
| **템플릿 허브 (dev)** | `templates/index.html` | 텍스트 링크 · 신규 slug마다 `<li>` 추가 |
| **템플릿 허브 (납품)** | `_delivery/index.html` | 패키징 시 `templates/index.html` **자동 복사** — 직접 수정 ❌ |
| **납품 복사** | `_delivery/{slug}/` | QA PASS **후** 패키징 (`node _harness/package-delivery.js {slug}`) |
| **WP 개발** | `wordpress/{slug}/` | 운영용 Classic Theme · 상세 `_docs/wordpress-guide.md` |
| **WP 납품** | `_delivery-wp/{slug}/` · `{slug}.zip` | `node _harness/package-delivery-wp.js {slug}` (패키징 **전** 정적 검사 자동 실행) |
| **WP 정적 검사** | `wordpress/{slug}/` | `node _harness/verify-wordpress-static.js {slug}` · 결과 `_logs/wordpress-verify-log.md` · PHP 경로: `WP_VERIFY_PHP` 환경변수 또는 Laragon 기본 경로 |
| **비교 캡처** | `_harness/snapshots/{slug}/` | PNG만 (선택) |
| **인터랙션 카탈로그** | `_harness/interaction-samples/` | 참고 URL 목록 [`index.html`](interaction-samples/index.html) · [`samples.manifest.json`](interaction-samples/samples.manifest.json) |

**진행하지 않음:** `_harness/workbench/`, `review/`, `reports/` — 별도 공간에서 짜고 본문에 씌우는 단계 **사용 안 함**.

## 기본 루프 (섹션 1개)

1. MCP로 해당 섹션 수치·구조 보고
2. 사용자 **「진행」** 승인
3. **`templates/{slug}/`에** 요청 섹션만 HTML/CSS/JS 구현
4. 섹션 QA 후 `_logs/qa-log.md` 기록
5. 사용자 PASS 후 다음 섹션 요청

페이지 전체 완료 후: 전체 납품 QA → `node _harness/package-delivery.js {slug}` · commit(사용자 요청 시)

## 반응형 (필수)

> 상세: `.cursor/rules/35-responsive.mdc`

- **기준:** Figma desktop 1920px
- **breakpoint:** 1024px(태블릿) · 768px(모바일) — 섹션 구현 시 함께 반영
- **768px 이하:** 가로 배치 → 세로 스택 · hover-only UI 대체·비활성화 · hover는 `(hover: hover) and (pointer: fine)` **내부만**
- **모바일 높이:** `100vh` 단독 금지 · hero `100svh` · 메뉴/모달/오버레이 `100dvh` · 하단 고정 UI `safe-area-inset-bottom`
- **form:** 모바일 input/select/textarea **≥16px**
- **QA 뷰포트:** 1920 · 1440 · 1024 · 768 · 390px — overflow·줄바꿈·aspect-ratio·터치 영역(≥44px)
- **실브라우저 QA (납품·페이지):** iPhone Safari · iPhone Chrome · Android Chrome · KakaoTalk 인앱 — `_docs/qa-checklist.md` §3-1

## Context Engineering

AI 작업 품질은 **「무엇을 읽는가」**와 **「무엇을 무시하는가」**에 따라 달라진다.

**기본 원칙:**
- 현재 요청을 최우선으로 본다.
- active rules를 기준으로 작업한다.
- 관련 로그와 decision-log로 이전 결정과 실패를 확인한다.
- Figma MCP 수치는 구현 기준으로 사용한다.
- 오래된 legacy 규칙이나 무관한 템플릿 정보는 현재 작업에 섞지 않는다.
- 충돌 시 `_docs/context-guide.md`의 우선순위를 따른다.

## 로그 = 작업 기억

- **시작:** `_logs` 최근 항목 확인 (`_logs/README.md` 참고)
- **진행:** 이전 승인/보류/FAIL 항목 반영
- **종료:** `change-log.md` + `qa-log.md` 갱신
- **실패 시:** `failure-log.md` 기록
- **결정 변경 시:** `decision-log.md` 기록

## Interaction Presets (PC)

- 카탈로그: `_docs/interaction-presets-guide.md` · `.cursor/rules/46-interaction-presets.mdc`
- **10종 등록 · 섹션 연결은 사용자 선택·승인 후** — `templates/{slug}/`에 직접 구현
- **연결 기록:** `_logs/decision-log.md` · `qa-log.md` (가이드 md 수정 ❌)
- 명령은 **한글명**으로 가능 (예: 「story에 스크롤 등장 적용해줘」)

## Interaction Catalog (harness)

- **허브:** `_harness/interaction-samples/index.html` — 외부 참고 인터랙션 목록·검토
- **정본:** `_harness/interaction-samples/samples.manifest.json`
- 로컬 프리뷰 HTML 없음 · 참고 URL만 관리
