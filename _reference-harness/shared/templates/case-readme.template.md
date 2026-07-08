# {slug}

> URL: {sourceUrl} · completeness: {originalCompleteness}

## 단계

| 단계 | 폴더 | 상태 |
|------|------|------|
| 00-source | `00-source/` | |
| 01-original | `01-original/` | 수정 금지 |
| 02-original-qa | `02-original-qa/` | ★ 게이트 |
| 03-analysis | `03-analysis/` | |
| 04-working-copy | `04-working-copy/` | |
| 05-working-qa | `05-working-qa/` | |
| 06-normalized | `06-normalized/` | 선택 |
| 07-final | `07-final/` | |
| 08-platform-map | `08-platform-map/` | |
| 09-platform-qa | `09-platform-qa/` | |

## `_dev/`

compare · page index · inventories · visual-diff (납품 제외)

## 게이트

- originalQa **pass** 또는 **승인 partial** 전 → working-copy **금지**
- change-request 승인 전 → 수정 **금지**

규칙: `shared/rules/workflow.md`
