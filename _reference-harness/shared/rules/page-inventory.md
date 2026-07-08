# Page Inventory Schema

공통 스키마. `_dev/page-inventory.json` · analysis — **선택 도구** (모든 소수정에 강제 아님).

## 필수 필드

| 필드 | 값 |
|------|-----|
| pageId · name · category | |
| sourceUrl · originalPath · workingPath | |
| designFreedom | `free` \| `guarded` \| `locked` |
| functionalRisk | `low` \| `medium` \| `high` \| `critical` |
| allowedChange | `visual-only` \| `wrapper-only` \| `structural` \| `functional` |
| commerceContract | `preserve` \| `verified-change` |
| desktopQa · mobileQa · commerceQa | status enum |
| notes | |

## 레거시 `risk: no-touch` (docs/cafe24 JSON)

**페이지 전체 디자인 금지가 아님.**  
검증 없이 **기능 계약**(module · form · hidden · `{$form.*}` · 필수 ID · data · onclick · 카페24 JS · 결제·주문 연결)을 바꾸지 말 것. → `80-cafe24-core`.

## 카페24 designFreedom 예

| 값 | 예 |
|----|-----|
| free | 메인·배너·브랜드 카피 |
| guarded | 목록·상세 상단·검색 (contract 유지) |
| locked | 주문서·결제·인증 핵심 |

`guarded`/`locked` + `commerceContract: preserve`: module/`{$}`/form/hidden **임의 변경 금지**.
