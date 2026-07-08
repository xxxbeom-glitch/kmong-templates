# Page Inventory Schema

공통 스키마. `_dev/page-inventory.json` · `03-analysis/page-inventory.json`에 사용.

## 필수 필드

| 필드 | 타입 / 값 |
|------|-----------|
| pageId | string |
| name | string |
| category | string |
| sourceUrl | string \| null |
| originalPath | string \| null |
| workingPath | string \| null |
| designFreedom | `free` \| `guarded` \| `no-touch` |
| sourceOriginalQa | `not-started` \| `working` \| `review` \| `pass` \| `partial` \| `fail` \| `blocked` |
| desktopQa | same status enum |
| mobileQa | same status enum |
| commerceQa | same status enum \| `n/a` |
| notes | string |

## 카페24 추가 필드

| 필드 | 설명 |
|------|------|
| pageType | main · list · detail · member · order · board · … |
| moduleCount | number |
| variableCount | number |
| layoutDirective | boolean / notes |
| formIntegrity | ok \| risk \| unknown |
| commerceDependency | low \| medium \| high |
| designFreedom | 아래 매핑 |

### designFreedom (cafe24)

| 값 | 예 |
|----|-----|
| free | 메인 · 콘텐츠 · 상품 목록 · 배너 · 브랜드 |
| guarded | 상세 · 로그인 · 가입 · 장바구니 · 게시판 폼 · 검색 |
| no-touch | 주문서 핵심 · 결제 · 주문 처리 · 회원 인증 · 서버 연동 |

`guarded` / `no-touch`: module · `{$}` · form name/action · hidden input **임의 변경 금지**.
