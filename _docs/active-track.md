# Active Track (현재 기본)

> **갱신:** 2026-07-10 · 상세 결정: `_logs/decision-log.md` 최상단

## 지금 쓰는 것

| 항목 | 값 |
|------|-----|
| **기본 트랙** | **WordPress** |
| **작업 경로** | `wordpress/{slug}/` |
| **디자인 입력** | Figma MCP → 승인 후 구현 |
| **절차** | `.cursor/rules/20-harness-workflow.mdc` (섹션 단위 · QA · 로그) |
| **WP 규칙** | `70-wordpress.mdc` · `71` · `72` |
| **Figma·반응형·인터랙션** | `30` · `35` · `45` · `46` · `47` |
| **납품** | `node _harness/package-delivery-wp.js {slug}` → `_delivery-wp/{slug}.zip` |
| **정적 검사** | `node _harness/verify-wordpress-static.js {slug}` |
| **로그** | `_logs/decision-log.md` · `change-log.md` · `qa-log.md` |

## CMS·콘텐츠 (기본값)

- **관리자 수정:** `notice` CPT만 (hero·GNB·섹션 카피는 **코드 고정**)
- **호스팅:** 카페24 뉴아우토반 WordPress
- **정적 HTML 선행** (`templates/` 먼저) — **기본 아님**

## `_harness/` 역할

**구현 공간 아님.** WP 패키징·검증·(선택) QA PNG·인터랙션 참고 URL만.

- 절차 이름 **Harness Workflow** ≠ 폴더 `_harness/`
- 구현은 **`wordpress/{slug}/`에 직접**

## 동결 (삭제 아님 · 신규 작업 진입 금지)

| 트랙 | 경로 | 규칙 |
|------|------|------|
| Static (크몽 정적) | `templates/{slug}/` · `_delivery/` | `10-static` · `60-delivery` |
| Cafe24 A/B | `cafe24/` · `_release/` | `80`~`84` |
| Reference C | `_reference-harness/` | `83` · `site-clone-fidelity.md` |

재개 시 `decision-log`에 `[active-track: …]` 갱신 후 해당 트랙 규칙 적용.

## 작업 루프 (섹션 1개)

```
decision-log · slug 확인
→ Figma MCP + 댓글·주석 → 사용자 승인
→ wordpress/{slug}/ 섹션 구현
→ QA → qa-log
→ 사용자 PASS → 다음 섹션
→ 전체 PASS → package-delivery-wp.js → 카페24 최종 QA
```

## 읽기 순서

1. 본 문서
2. `_docs/context-guide.md`
3. `_docs/wordpress-guide.md`
4. 해당 slug · 직전 섹션 `_logs/*`

**무시:** `_review_exports/` · `.cursor/rules/archive/` · `_docs/legacy/` · 동결 트랙 규칙(명시 재개 전)
