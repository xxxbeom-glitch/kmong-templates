# Style / Mirror QA — ptmd869920 (recheck)

**일시:** 2026-07-08  
**미리보기:** http://127.0.0.1:4176/

## 원인 (이전 복제가 스타일 깨진 이유)

1. `optimizer.php?filename=…&type=css` 여러 묶음이 **같은 파일명**으로 덮여 저장됨  
2. HTML `href`가 `/ind-script/optimizer.php?…` **절대경로**로 남아, 로컬에서 잘못된/단일 CSS만 로드  
3. 해시 저장 후에도 확장자가 `.php`면 `Content-Type`이 CSS가 아니어서 브라우저가 스타일 무시

## 수정

- `mirror-original.js` v2: 쿼리 해시 + `.css`/`.js` 확장자  
- `preview-original.js`: `url-map.json` 매핑 · CSS MIME · 샘플가이드 숨김  
- `01-original` 재미러 (약 208 url-map)

## 재검수 결과

| 항목 | 결과 |
|------|------|
| 메인 CSS HTTP 200 + `text/css` | PASS (`optimizer.*.css` 26KB · `optimizer_user.*.css` 266KB) |
| styleSheets 읽힘 | PASS (readable 6 · rules ≈ 2529) |
| 폰트 | PASS (Pretendard Variable) |
| 헤더 높이 | PASS (~70px) |
| 샘플 가이드 오버레이 | PASS (미리보기 inject로 숨김) |
| YouTube / Eclog 일부 | FAIL/무시 (오프라인·외부 — 레이아웃 핵심 아님) |
| crypto-js.min.js | 404 (부수 스크립트) |

증거: `02-original-qa/compare/local-fixed-1920.png` · `style-qa-local.json`

## 결론

**스타일 반영 재검수: PASS (메인 레이아웃)**  
browser-captured 한계(영상·일부 외부 JS)는 남음. skin-zip 아님.
