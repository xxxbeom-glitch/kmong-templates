# QA Checklist

> Cursor 규칙: `.cursor/rules/50-qa-checklist.mdc`  
> **전 항목 PASS = QA PASS** · 하나라도 FAIL이면 완료·commit 금지

결과 기록: `_logs/qa-log.md`

---

## 1. 구조 QA

- [ ] 파일이 `templates/{slug}/` 안에만 존재
- [ ] `index.html`, `css/style.css`, `js/main.js`, `assets/` 구성 완료
- [ ] 다른 템플릿·공통 폴더 import 없음
- [ ] `_modules`, `_tokens` 미사용·미생성

---

## 2. Figma 대조 QA

- [ ] padding / gap / font-size / line-height / color 일치
- [ ] 콘텐츠 폭·좌우 gutter 일치
- [ ] 이미지 aspect-ratio = Figma W/H
- [ ] Auto Layout gap → CSS 1:1 매핑
- [ ] 추측 수치 없음 (승인된 하드코딩 제외)

---

## 3. PC / Mobile 반응형 QA

- [ ] `@media (max-width:768px)` 블록 존재·반영
- [ ] PC·모바일 전체 스크롤 깨짐 없음
- [ ] overflow·가로 스크롤 없음
- [ ] clamp min으로 모바일 가독성 확보
- [ ] 인라인 `style=""` 없음

---

## 4. 인터랙션 QA (해당 시)

- [ ] GNB 햄버거 열림/닫힘
- [ ] GNB `is-active` 해당 페이지 HTML에만 적용
- [ ] FAQ 아코디언 · 캐러셀 · AOS · CTA hover
- [ ] `prefers-reduced-motion` 동작
- [ ] 콘솔 에러 없음

---

## 5. Imweb 납품 QA

- [ ] jQuery 중복 선언 없음
- [ ] 이미지 상대 경로 정상
- [ ] 코드 위젯 삽입 시 레이아웃 깨짐 없음
- [ ] `_delivery/imweb/{slug}/` 복사본 동일 동작 (납품 시)

---

## 6. Git commit 전 QA

- [ ] 위 1~5 해당 항목 PASS
- [ ] `git status` — 요청 범위 밖 변경 파일 없음
- [ ] `templates/template-c` 등 미요청 파일 미수정
- [ ] `_logs/change-log.md` 기록 완료
- [ ] commit message: `[scope] 한글 작업 내용` 형식

---

## 완료 규칙

| 상태 | 허용 |
|------|------|
| QA PASS | 완료 처리 · commit 가능 (사용자 요청 시) |
| QA FAIL | 수정 후 재검수 · 완료 선언 금지 |
| push | 사용자 명시 요청 시만 |
