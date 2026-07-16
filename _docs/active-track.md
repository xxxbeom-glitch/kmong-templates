# Active Track (현재 기본)

> **갱신:** 2026-07-16 · 결정 상세: `_logs/decision-log.md`  
> **진행 중:** 개인 사이트 (하드코딩 · 관리자 없음)  
> **규칙 SoT:** `.cursor/rules/` · 사람용 장문 가이드는 `_archive/docs/guides/`

## 지금 쓰는 것

| 항목 | 값 |
|------|-----|
| **기본 트랙** | **개인 정적 사이트** (HTML/CSS/JS · CMS 없음) |
| **작업 경로** | `site/` (없으면 생성 후 작업) |
| **포트폴리오** | `site/` 안 하드코딩 페이지·목록 |
| **호스팅** | **Vercel** |
| **레포 이름** | `kmong-templates` **유지** (변경 없음) |
| **디자인 입력** | Figma MCP → 승인 후 구현 (해당 시) |
| **절차** | `20-harness-workflow.mdc` (경로만 `site/`) |
| **컨텍스트·충돌** | `00-core.mdc` |
| **Figma·반응형·인터랙션** | `30` · `35` · `40` · `45` · `46` — glob **`site/**`** 포함 |
| **QA** | `50` → `_logs/qa-log.md` · 배포 = Vercel (`site/`) |
| **로그** | `_logs/decision-log` · `change-log` · `qa-log` |
| **SEO/AEO/GEO** | **on-demand** `73` · 자동 실행 금지 |

## `_docs/` · `_harness/`

| 폴더 | 역할 |
|------|------|
| `_docs/` | **`active-track.md`만** (현황 1장) |
| `_harness/` | 구 패키징·검증·샘플 (**구현 공간 아님** · 신규 개인 사이트에 필수 아님) |

## 동결 (폴더는 유지 · 신규 작업 금지)

| 내용 | 경로 | 비고 |
|------|------|------|
| **WordPress** | `wordpress/` · 규칙 `70`~`72` | **삭제 안 함** · 명시 재개 전 미적용 |
| 구 정적 템플릿(크몽) | `_archive/templates/` | 판매용 정적과 별개 |
| Cafe24 / Reference | `_archive/` · rules `archive/80`~`84` | 동결 |

- 루트 `templates/` · `docs/` · `_delivery*` **없음**
- 모바일 작업 시 **MO만** 수정

## CMS·호스팅

- **CMS / 관리자:** 없음 (하드코딩만)
- **호스팅:** Vercel
- **WP 테마 판매 계획:** 철회 · `wordpress/`는 보관만
