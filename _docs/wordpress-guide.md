# WordPress 운영 트랙 가이드

> **현재 기본 트랙:** `_docs/active-track.md` · Cursor 규칙: `.cursor/rules/70-wordpress.mdc` · 트랙 분기: `00-project-router.mdc`

## 언제 쓰나

| 트랙 | 용도 | 폴더 |
|------|------|------|
| **static** | 크몽 판매용 정적 HTML | `templates/{slug}/` |
| **wordpress** | 카페24 뉴아우토반 **실제 운영** 사이트 | `wordpress/{slug}/` |

- 기존 `templates/*`를 WordPress로 **바꾸지 않음**
- Figma부터 `wordpress/{slug}/`에 **테마로 직접** 만듦 (정적 HTML 먼저 만들기 **기본 아님**)

## 폴더 · 납품

```
wordpress/{slug}/     ← 개발
_delivery-wp/{slug}/    ← 패키징 복사본
_delivery-wp/{slug}.zip ← 카페24 업로드용
```

```bash
node _harness/package-delivery-wp.js {slug}
```

카페24 WordPress → `wp-content/themes/{slug}/` 에 업로드 후 테마 활성화.

## 테마 최소 파일

- `style.css` (Theme Header)
- `functions.php` (enqueue · notice CPT)
- `header.php` · `footer.php`
- `front-page.php` (메인 + **최신 공지 3건**)
- `index.php`
- `archive-notice.php` · `single-notice.php`
- `assets/css/` · `assets/js/` · `assets/images/`

## 공지 (관리자 수정 — 이것만)

| 항목 | 값 |
|------|-----|
| CPT slug | `notice` |
| 목록 URL | `/notice/` (고유주소 저장 후) |
| 메인 | 최신 **3건** |

관리자 → 글(공지)에서 등록·수정·삭제. hero·섹션 문구 등은 코드 고정(1차).

## 작업 순서 (섹션 1개)

1. `decision-log`에 `[type: wordpress]` · slug 승인
2. Figma MCP 보고 → 사용자 승인
3. `wordpress/{slug}/`에 섹션 구현
4. 섹션 QA → `qa-log`
5. 전체 완료 후 패키징 → 카페24 최종 QA

## 개발 중 확인 방법

### A. 로컬 WordPress (섹션 맞출 때 권장)

1. PC에 Local WP / Laragon 등으로 WordPress 설치
2. `wordpress/{slug}/`를 `wp-content/themes/{slug}/`에 복사(또는 폴더 연결)
3. 관리자에서 테마 활성화 → `http://localhost/...` 새로고침으로 반복 확인
4. 완성 후 `package-delivery-wp.js` → 카페24 업로드

### B. 카페24 직접 업로드 (최종·공지 테스트)

1. `package-delivery-wp.js {slug}` → ZIP
2. WordPress 관리자 → 외모 → 테마 → 업로드
3. 테마 활성화 → **설정 → 고유주소** 저장
4. 공지 등록 → 목록/상세/메인 3건 확인

로컬에서 레이아웃, 카페24에서 공지·permalink 최종 확인을 권장.

## decision-log 예시

```
[type: wordpress]
slug: {slug}
theme-slug: {slug}
hosting: 카페24 뉴아우토반 WordPress
cms: notice CPT only · main 3 posts
static 변환: 없음
```

## 규칙 확장

첫 프로젝트 이후 공지·QA·납품이 복잡해지면 `70-wordpress.mdc`를 여러 파일로 분리.
