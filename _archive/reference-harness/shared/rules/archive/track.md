# Reference harness — track rules

## 격리

- 산출물은 `_reference-harness/` 안만.
- `templates/` · `wordpress/` · `cafe24/` · `_harness/` 런타임과 섞지 않음.
- `07-final` PASS·승인 후 제품 승격.

## 목적

원본(또는 보유 스킨) **수집 → immutable original → source↔original QA → 복사본에서만 요청 수정**.  
새 HTML reconstruction은 **기본 아님** (fallback only).

## 단계

| # | 폴더 | 요약 |
|---|------|------|
| 00 | `00-source/` | 메타·라이선스·캡처·request inventory |
| 01 | `01-original/` | 불변 archive |
| 02 | `02-original-qa/` | ★ 게이트 |
| 03 | `03-analysis/` | 분석 산출물 |
| 04 | `04-working-copy/` | 복사본 수정 |
| 05 | `05-working-qa/` | original↔working QA |
| 06 | `06-normalized/` | 선택 정리 |
| 07 | `07-final/` | 납품 패키지 |
| 08 | `08-platform-map/` | WP·cafe24 map |
| 09 | `09-platform-qa/` | 플랫폼 QA |

**SoT:** `workflow.md` 및 sibling rules · **에이전트:** `.cursor/rules/83-reference-harness.mdc`

## 레거시 폴더 (즉시 rename 금지)

| 구 | 신 |
|----|-----|
| `00-reference/` | → `00-source` + 분석 일부 |
| `02-analysis/` | → `03-analysis` |
| `03-working-copy/` | → `04-working-copy` |
| `04-normalized/` | → `06-normalized` |
| `05-final/` | → `07-final` |
| `06-platform-map/` / `03-cafe24-map/` | → `08-platform-map` |
| `01-reconstruction/` | legacy / optional fallback |

## 뷰포트

Desktop **1920** · Mobile **390**
