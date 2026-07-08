# Original Immutable Archive

> `01-original/` = **수정 금지** 기준본·복구본. QA·디버그 산출물은 `_dev/`에만 둔다.

## 절대 금지 (01-original 내부)

- HTML / CSS / JS 내용 수정
- 이미지 교체·압축·리사이즈
- 웹폰트 제거·교체
- 파일명 변경 · 폴더 이동 · 경로 수정
- 포매터 · minify · unminify
- 라이브러리 버전 변경 · 파일 삭제
- 클래스명 / ID 변경
- debug script · outline CSS · page index HTML **삽입**
- preview용 rewrite를 original에 덮어쓰기

미리보기 경로 매핑은 **서버(`scripts/preview-original.js`) 또는 `_dev/`** 에서만 처리한다.

## 무결성 기록 (`manifest-original.json` 또는 revision manifest)

필수:

| 필드 | 설명 |
|------|------|
| file path | 상대 경로 |
| bytes | 크기 |
| mime / contentType | MIME |
| checksum | sha256 권장 |
| fileCount · totalBytes | 합계 |
| collectedAt | ISO 시각 |
| sourceUrl | 출처 |
| tool · toolVersion | 수집 도구 |
| viewport | 수집 시 뷰포트 |
| userAgent | UA |
| authState | 로그인·cookie 유무 |

## originalCompleteness

| 값 | 의미 |
|----|------|
| `skin-zip` | 구매·보유 스킨 ZIP / 원본 패키지 전체 |
| `site-archive` | 고객·소유 사이트 정식 archive |
| `browser-captured` | 공개 데모 URL에서 브라우저가 받은 클라이언트 리소스만 |
| `incomplete` | 핵심 자산 누락 · PASS 불가 |

`browser-captured`를 `skin-zip`과 **같은 등급으로 표시 금지**.

## QA / debug 위치

```
cases/{slug}/
├── 01-original/     ← 불변
└── _dev/            ← compare · index · inventories · visual-diff
```

`_dev/`는 납품 ZIP·운영 배포에서 **제외**.
