# Harness

**Harness Workflow** = Figma MCP → 승인 → 구현 → QA → 로그 **절차**. 상세: `.cursor/rules/20-harness-workflow.mdc` · **현재 기본 트랙:** `_docs/active-track.md`.

> **`_harness/` 폴더 ≠ 구현 공간.** 코드는 **`wordpress/{slug}/`** (현재) 또는 트랙별 작업 경로에 직접 작성.

## 현재 (WordPress)

| 구분 | 경로 | 용도 |
|------|------|------|
| **개발·구현** | `wordpress/{slug}/` | Classic Theme PHP · CSS · JS **직접 작성** |
| **WP 납품** | `wordpress/{slug}/dist/{slug}.zip` | `node _harness/package-delivery-wp.js {slug}` |
| **WP 정적 검사** | `wordpress/{slug}/` | `node _harness/verify-wordpress-static.js {slug}` → `_logs/wordpress-verify-log.md` |
| **비교 캡처** | `_harness/snapshots/{slug}/` | PNG만 (선택) |
| **인터랙션 카탈로그** | `_harness/interaction-samples/` | 참고 URL [`index.html`](interaction-samples/index.html) · [`samples.manifest.json`](interaction-samples/samples.manifest.json) |

규칙: `.cursor/rules/70-wordpress.mdc`

## 동결 트랙 (참고만)

| 트랙 | 납품 스크립트 | 작업 경로 |
|------|---------------|-----------|
| Static (크몽) | `package-delivery.js` | `templates/{slug}/` → `_delivery/{slug}/` |
| Cafe24 A/B | `84` release | `cafe24/{slug}/` · `_release/` |
| Reference C | 없음 | `_reference-harness/cases/{slug}/` |

## 기본 루프 (섹션 1개 · WP)

1. Figma MCP로 해당 섹션 수치·구조 보고
2. 사용자 **「진행」** 승인
3. **`wordpress/{slug}/`에** 요청 섹션만 PHP/CSS/JS 구현
4. 섹션 QA → `_logs/qa-log.md`
5. 사용자 PASS → 다음 섹션

전체 완료 후: `package-delivery-wp.js` → 카페24 업로드 QA · commit(사용자 요청 시)

## 반응형 (필수)

> `.cursor/rules/35-responsive.mdc`

- Figma desktop 1920 · `@1024` · `@768`
- QA 뷰포트: 1920 · 1440 · 1024 · 768 · 390px
- WP 납품·페이지 QA: 카페24 업로드 후 공지·permalink 확인 (`70`)

## Context Engineering

- 현재 요청 · **`_docs/active-track.md`** · active rules 우선
- `_logs/` 해당 slug · 직전 섹션만
- 동결 트랙(Cafe24·Reference·Static 신규) 규칙은 **명시 재개 전 무시**
- 충돌: `00-core.mdc`

## 로그

- 시작: `_logs/README.md` · 해당 slug `decision-log` / `qa-log`
- 종료: `change-log.md` + `qa-log.md`

## Interaction Presets

- `46-interaction-presets.mdc` · 샘플 `_harness/interaction-samples/`
- 승인된 preset만 · 기록은 `decision-log` / `qa-log`

## 보관

- `_harness/_archive/` — 일회성 스크립트·덤프 (런타임 코드 배치 금지 구역 정리용)

**진행하지 않음:** `_harness/workbench/`, `review/`, `reports/`
