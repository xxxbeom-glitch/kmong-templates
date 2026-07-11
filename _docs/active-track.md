# Active Track (현재 기본)

> **갱신:** 2026-07-11 · 결정 상세: `_logs/decision-log.md`  
> **규칙 SoT:** `.cursor/rules/` · 사람용 장문 가이드는 `_archive/docs/guides/`

## 지금 쓰는 것

| 항목 | 값 |
|------|-----|
| **기본 트랙** | **WordPress (블록 테마)** |
| **작업 경로** | `wordpress/{slug}/` |
| **디자인 입력** | Figma MCP → 승인 후 구현 |
| **컨텐츠 폭 (신규)** | **1600** (구 작업 1440 유지) |
| **절차** | `20-harness-workflow.mdc` |
| **컨텍스트·충돌** | `00-core.mdc` |
| **WP** | `70` · `71` · `72` |
| **Figma·반응형·인터랙션** | `30` · `35` · `45` · `46` (`47` archive) |
| **QA** | `50-qa-checklist.mdc` → `_logs/qa-log.md` |
| **납품** | `package-delivery-wp.js` → `wordpress/{slug}/dist/{slug}.zip` |
| **정적 검사** | `verify-wordpress-static.js` |
| **로그** | `_logs/decision-log` · `change-log` · `qa-log` |

## `_docs/` · `_harness/`

| 폴더 | 역할 |
|------|------|
| `_docs/` | **`active-track.md`만** (현황 1장) |
| `_harness/` | 패키징·검증 스크립트 · 인터랙션 샘플 (**구현 공간 아님**) |

## 아카이브

| 내용 | 경로 |
|------|------|
| 구 사람용 가이드 | `_archive/docs/guides/` |
| `_docs/legacy` | `_archive/docs/legacy/` |
| 정적 템플릿 · cafe24_shop | `_archive/templates/` |
| 구 납품 | `_archive/delivery/` |
| 구 `docs/cafe24` | `_archive/docs/cafe24/` |
| Cafe24/Reference 규칙 | `.cursor/rules/archive/` |
| 헤스 병원 전용 규칙(75) | `.cursor/rules/archive/75-hes-womens-clinic.mdc` |

- 루트 `templates/` · `docs/` · `_delivery*` · `_reference-harness` · `_dev-images` · `_review_exports` **없음**
- 모바일 작업 시 **MO만** 수정 · 레퍼런스 URL은 **명시 요청 시에만** 인터랙션 파악

## CMS·호스팅

- **호스팅:** 카페24 WordPress
- **정적 HTML 선행** — 기본 아님
