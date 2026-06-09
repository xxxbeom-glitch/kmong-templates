# Delivery Guide

> Cursor 규칙: `.cursor/rules/60-delivery.mdc`

## 납품 경로

```
_delivery/{template-slug}/
├── index.html
├── about.html          (있을 경우)
├── css/style.css
├── js/main.js
└── assets/
    ├── images/
    └── icons/

_delivery/index.html      ← templates/index.html 복사본 (템플릿 목록 허브)
```

- `{template-slug}` = `templates/` 폴더명과 동일하게 유지
- 납품물은 **해당 템플릿 파일 복사본** — 독립 실행 가능해야 함

---

## 패키징

```bash
node _harness/package-delivery.js mainstream
```

| 포함 | 제외 (dev 전용) |
|------|-----------------|
| `index.html` | `preview.html` |
| `css/style.css` (preview CSS 제거) | `_dev-images/` |
| `js/main.js` (preview 분기 제거) | `dev-images.js`, `placeholders.js`, `sync-dev-to-assets.js` |
| `assets/images/`, `assets/icons/` | |

**허브:** `templates/index.html`에 템플릿 링크 추가 → 패키징 시 `_delivery/index.html` 자동 동기화

---

## 템플릿 허브 (`templates/index.html`)

신규 템플릿 승인 후 목록에 한 줄 추가:

```html
<li><a href="{slug}/index.html">{slug}</a></li>
```

`node _harness/package-delivery.js {slug}` 실행할 때마다 `_delivery/index.html`도 같이 갱신됨.

---

## 복사 전 체크리스트

- [ ] `_docs/qa-checklist.md` QA **PASS** 완료
- [ ] `_logs/qa-log.md`에 결과 기록됨
- [ ] 개발용·불필요 파일 제외 (위 표)

---

## 이미지 경로

- [ ] HTML·CSS 내 경로가 **상대 경로** (`assets/images/...`)
- [ ] 복사 후에도 경로 깨짐 없음 (폴더 구조 동일 유지)
- [ ] 이미지 용량 1MB 이하 권장
- [ ] `alt`, `width`, `height`, `decoding="async"` 속성 확인

---

## jQuery · 삽입 주의

- [ ] 호스팅/빌더에 jQuery가 이미 로드되면 **템플릿 HTML에서 중복 선언 제거**
- [ ] `$` 그대로 사용
- [ ] 삽입 영역에서 overflow·고정폭 깨짐 없는지 확인
- [ ] 콘솔 에러 없음

---

## 납품 후 확인

- [ ] PC·모바일 스크롤 전체 확인
- [ ] GNB·링크·인터랙션 동작 확인
- [ ] `_delivery/{slug}/index.html` 로컬 오프라인 미리보기

---

## 워크플로우

```
templates/{slug}/ 개발 완료 → QA PASS → node _harness/package-delivery.js {slug} → 호스팅·ZIP 납품
```
