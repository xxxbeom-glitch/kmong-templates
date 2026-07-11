# Cafe24 docs index

> JSON 인벤토리 + 팝업 규칙 + 규칙 개요.  
> **원본:** `templates/cafe24_shop/` 수정 금지 · JSON은 Agent가 대량 재작성하지 않음(별도 요청 시).

## 파일 역할

| 파일 | 역할 |
|------|------|
| `modules.json` | `module="…"` 고유명·등장·인스턴스(`_N`)·파일 경로 |
| `variables.json` | `{$…}` baseName · modifiers · contexts |
| `forms.json` | `html-form` / `module-form-structure` / `hidden-input` |
| `pages.json` | 페이지·directive·commerce·popup layout 여부 |
| `directives.json` | `@layout` `@css` `@js` `@import` `@contents` |
| `popup-rules.md` | 팝업·레이어 분류 · 하루 닫기 · custom-promo |
| `release.md` · `release-templates/` | 배포·패키징 요약 · 보고서 골격 (`84`) |
| `CAFE24_RULES_OVERVIEW.md` | 사람용 최상위 설명 (실행은 `.cursor/rules`) |
| `README.md` | 본 파일 |

## 인벤토리의 성격

- **검색 색인**이다. 공식 변수 사전이 아니다.
- `purpose: "unknown"` 의미를 JSON만 보고 **추측하지 않는다.**
- 레거시 `risk: "no-touch"` = 페이지 전체 디자인 금지가 아니라 **검증 없이 기능 계약 변경 금지** (`80-cafe24-core`).

## 조회 우선순위 (`80`)

1. 현재 **working skin**  
2. **`_archive/docs/cafe24/`** 인벤토리  
3. **`templates/cafe24_shop/`** (global syntax reference)  
4. 카페24 공식 문서  
5. 미확인 → 생성 금지 · `unverified`

## popup-rules.md 사용 시점

팝업·모달·레이어·`@layout(...popup.html)` · 「오늘 하루」 관련 수정 **전**.

## 배포 (`84`)

Track A/B만. 요약 `release.md` · 템플릿 `release-templates/`.  
working → production 직업로드 금지 · 인증 없으면 업로드 안 함.

## 우선순위

**working skin / project original** > 인벤토리 > `cafe24_shop` 참고.

확인되지 않은 module·변수 **생성 금지.**
