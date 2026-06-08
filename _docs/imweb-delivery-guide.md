# Imweb Delivery Guide

> Cursor 규칙: `.cursor/rules/60-imweb-delivery.mdc`

## 납품 경로

```
_delivery/imweb/{template-slug}/
├── index.html
├── about.html          (있을 경우)
├── css/style.css
├── js/main.js
└── assets/
    ├── images/
    └── icons/
```

- `{template-slug}` = `templates/` 폴더명과 동일하게 유지
- 납품물은 **해당 템플릿 파일 복사본** — 독립 실행 가능해야 함

---

## 복사 전 체크리스트

- [ ] `_docs/qa-checklist.md` QA **PASS** 완료
- [ ] `_logs/qa-log.md`에 결과 기록됨
- [ ] 개발용·불필요 파일 제외 (아래 참고)

---

## 포함할 파일

- [ ] 모든 `.html` (메인 + 서브페이지)
- [ ] `css/style.css`
- [ ] `js/main.js`
- [ ] `assets/images/`, `assets/icons/` 전체

---

## 제외할 것

- [ ] `node_modules/`, `package.json`, `.git/`
- [ ] `.cursor/`, `_harness/`, `_logs/`, `_docs/`
- [ ] `_docs/legacy/`, 다른 템플릿 폴더
- [ ] 미사용 이미지·CSS·JS

---

## 이미지 경로

- [ ] HTML·CSS 내 경로가 **상대 경로** (`assets/images/...`)
- [ ] 복사 후에도 경로 깨짐 없음 (폴더 구조 동일 유지)
- [ ] 이미지 용량 1MB 이하 권장
- [ ] `alt`, `width`, `height`, `decoding="async"` 속성 확인

---

## jQuery · 아임웹 주의

- [ ] 아임웹 사이트에 jQuery가 이미 로드되면 **템플릿 HTML에서 중복 선언 제거**
- [ ] `$` 그대로 사용 (별도 noConflict 패턴 불필요)
- [ ] 코드 위젯 삽입 영역에서 overflow·고정폭 깨짐 없는지 확인
- [ ] 콘솔 에러 없음

---

## 납품 후 확인

- [ ] 아임웹 관리자에서 코드 위젯 삽입 테스트
- [ ] PC·모바일 스크롤 전체 확인
- [ ] GNB·링크·폼·인터랙션 동작 확인

---

## 워크플로우

```
templates/{slug}/ 개발 완료 → QA PASS → _delivery/imweb/{slug}/ 복사 → 아임웹 삽입 테스트
```
