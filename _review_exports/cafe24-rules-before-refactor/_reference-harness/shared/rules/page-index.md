# Page Index & Compare (`_dev/`)

> original **밖에** 둔다. 납품·배포 ZIP에서 **제외**.

## 구조

```
cases/{slug}/_dev/
├── source-original-compare.html
├── original-index.html
├── working-index.html
├── compare-index.html
├── page-inventory.json          # 또는 03-analysis와 심볼릭/복사
├── qa-log.json
├── source-page-inventory.json
├── local-page-inventory.json
├── source-asset-inventory.json
├── local-asset-inventory.json
├── missing-assets.json
├── extra-assets.json
├── broken-links.json
├── external-dependencies.json
├── console-errors.json
├── network-errors.json
└── visual-diff/
    ├── desktop-1920/
    └── mobile-390/
```

파일 통합 가능. 다만 아래 정보는 **항상** 남긴다:  
원본 URL · local original · working-copy · 페이지 목록 · 자산 누락 · 링크 오류 · 외부 의존 · 시각 비교 · QA 상태 · 변경 요청 · 승인 상태.

## 렌더링 원칙

페이지 추가 시 HTML을 수동으로 늘리지 않는다.  
**`page-inventory.json` 기반**으로 index/compare를 생성·갱신한다 (`page-inventory.md`).

## source-original-compare

행: pageId · 페이지명 · source URL · local original 링크 · Desktop/Mobile source·local 캡처 · DOM/CSS/JS/font/image/interaction 상태 · missing 수 · console error 수 · QA 상태 · 메모

## original-index

행: pageId · 이름 · 원본 URL · 로컬 링크 · 카테고리 · 실행 여부 · 누락 asset · 인터랙션 · Desktop/Mobile 캡처

## working-index

행: pageId · 이름 · working 링크 · 작업 상태 · change-request 번호 · 변경 파일 · Desktop/Mobile/Commerce QA · designFreedom · 메모

## compare-index

동일 pageId: Original 열기 · Working 열기 · Desktop/Mobile 비교 · 변경 요청 · 승인 · QA
