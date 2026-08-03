# Harness

**절차:** `.cursor/rules/20-harness-workflow.mdc` · **기본 트랙:** `_docs/active-track.md` (WordPress)

> `_harness/` ≠ 구현 공간. 코드는 **`wordpress/{slug}/`**.

## 현재 (WordPress)

| 구분 | 경로 | 용도 |
|------|------|------|
| 개발 | `wordpress/{slug}/` | Classic 테마 PHP·CSS·JS |
| 납품 | `wordpress/{slug}/dist/{slug}.zip` | `node _harness/package-delivery-wp.js {slug}` |
| 검사 | `verify-wordpress-static.js` | (해당 시) |
| 샘플 | `interaction-samples/` | 참고 |

규칙: `70`~`72` · `.cursor/sot/03-wordpress-transition.md`

## 동결

| 트랙 | 스크립트 |
|------|----------|
| 정적 하드코딩 | `package-delivery.js` → `_delivery/` |
