# Cafe24 Popup Rules

> **global syntax reference:** `templates/cafe24_shop/` (read-only).  
> 적용: Track A/B 스킨 · working skin · (B) map · QA. **원본·참고본을 이 문서만으로 수정하지 않는다.**  
> 규칙 연결: `80-cafe24-core.mdc` · `82-cafe24-qa.mdc`

## 1. 정적 HTML로 단정하지 않음

다음을 **단독 정적 HTML 페이지**로 취급하지 않는다.

- `@layout(...popup.html)` 을 쓰는 페이지  
  (예: `<!--@layout(/layout/basic/popup.html)-->`)
- `body#popup` · `layout/basic/popup.html` · `layout/basic/js/popup.js` 의존 화면
- 경로·파일명에 `popup`이 포함된 **기능 팝업** (주소록, 쿠폰, 옵션 등)

`templates/cafe24_shop/` 에 **`/popup/` 폴더가 없다**는 사실만으로  
「카페24 관리자 팝업 기능이 없다」고 **단정하지 않는다.**  
팝업은 레이아웃·모듈·관리자 설정으로 동작하는 경우가 많다.

## 2. 기능 팝업 — 구조 유지

상품 · 주문 · 회원 · 쿠폰 · 주소 등 **커머스·회원 기능 팝업**은 다음을 유지한다.

- `module="..."`
- `{$변수}` · `{$form.*}`
- input / hidden input
- 카페24/스킨 JS (`popup.js`, `OrderApply.*`, `{$…popup}` onclick 등)
- `@layout` / `@css` / `@js` / `@import` 지시문

임의로 하드코딩 모달로 **대체·재작성 금지.**  
인벤토리 레거시 `risk: "no-touch"` → **commerceContract: preserve** (페이지 전체 디자인 금지가 아님 · `80`).

## 3. ‘오늘 하루 열지 않기’

다음이 **실제로 존재할 때만** ‘오늘 하루 열지 않기’ 기능으로 분류한다.

- `{$checkbox_today_open}`
- 동일 목적의 확인된 마크업  
  (예: `cafe24_shop` 내 `member/certification_layer.html`, `member/update_event.html`)

추측으로 기능을 넣거나, 관련 코드 없이 “하루 닫기”를 구현했다고 기록하지 않는다.  
기존 기능이 있을 때 수정 시 **관리자 연동·체크박스 id/변수**를 함부로 제거하지 않는다.

헤더 띠배너 등의 `data-ez-role="disable-term"` 도 **별도 확인된 경우에만** 유사 기능으로 기록한다.

## 4. 커스텀 홍보 모달 (`custom-promo-modal`)

아래를 **모두** 만족할 때만 후보로 분류한다.

- `module` 없음 (또는 커머스 무관이 명확)
- 커머스/`{$form.*}` · 주문·회원·상품 옵션 input 없음
- 홍보·공지·디자인 판촉 목적의 레이어

이때만 별도 하드코딩 모달로 다루는 것을 허용한다.  
기능 팝업과 **섞지 않는다.**

데모 mall의 벤더 판촉 오버레이는 보통 이쪽이며,  
`browser-captured-demo` 자산은 납품 working base로 쓰지 않는다.

## 5. 작업 전 체크

| 확인 | 내용 |
|------|------|
| layout | `@layout(...popup.html)` 여부 |
| module / 변수 | 존재 시 기능 팝업으로 분류 |
| form / hidden | commerce면 구조 유지 |
| 하루 닫기 | `{$checkbox_today_open}` 등 **실재할 때만** |
| `/popup/` 부재 | 기능 부재로 해석하지 않음 |

관련 인벤토리: `_archive/docs/cafe24/pages.json` (`usesPopupLayout`), `modules.json`, `forms.json`, `variables.json`.
