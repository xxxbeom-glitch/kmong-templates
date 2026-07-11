# Active Track (현재 기본)

> **갱신:** 2026-07-11 · 상세: `_logs/decision-log.md`

## 지금 쓰는 것

| 항목 | 값 |
|------|-----|
| **기본 트랙** | **WordPress (블록 테마)** |
| **작업 경로** | `wordpress/{slug}/` |
| **디자인 입력** | Figma MCP → 승인 후 구현 |
| **컨텐츠 폭 (신규)** | **1600** (구 작업 1440 유지) |
| **절차** | `.cursor/rules/20-harness-workflow.mdc` (섹션 단위 · QA · 로그) |
| **WP 규칙** | `70-wordpress.mdc` · `71` · `72` |
| **Figma·반응형·인터랙션** | `30` · `35` · `45` · `46` · `47` |
| **납품** | `node _harness/package-delivery-wp.js {slug}` → `wordpress/{slug}/dist/{slug}.zip` |
| **정적 검사** | `node _harness/verify-wordpress-static.js {slug}` |
| **로그** | `_logs/decision-log.md` · `change-log.md` · `qa-log.md` |

## `_harness/` 역할

**구현 공간 아님.** WP 패키징·검증·(선택) QA PNG·인터랙션 참고만.

## 아카이브 (사용 안 함 · 삭제 아님)

| 내용 | 경로 |
|------|------|
| 정적 템플릿 + cafe24_shop | `_archive/templates/` |
| 구 정적·아임웹 납품 | `_archive/delivery/` |
| Cafe24 / Reference 규칙 | `.cursor/rules/archive/80`~`84` |

- 루트 `templates/` · `_delivery/` · `_delivery-wp/` · `_reference-harness/` **없음**
- 사이트 복제 다운로드본(`reference-harness`) **삭제** (아카이브에도 없음)
- WP ZIP은 `wordpress/{slug}/dist/` (커밋 안 함)
- 레퍼런스 URL **인터랙션 파악만** — 사용자가 **명시한 경우만**
- 모바일 작업 시 **MO만** 수정 (PC 스타일 동시 변경 금지)

## CMS·호스팅

- **호스팅:** 카페24 WordPress
- **정적 HTML 선행** — 기본 아님
