# Project Overview

## 목적

크몽 판매용 **아임웹(Imweb) 전용** HTML/CSS/jQuery 완성형 웹 템플릿을 제작한다.

- Figma 1920px 디자인 → Cursor 구현 → QA → `_delivery/imweb/` 납품
- 스택: 순수 HTML + CSS + jQuery 3.x(CDN). 빌드 도구·프레임워크 없음

## 핵심 원칙

- [ ] 각 템플릿은 `templates/{slug}/` 아래 **독립 완성형**
- [ ] 템플릿마다 자체 `index.html`, `css/style.css`, `js/main.js`, `assets/` 보유
- [ ] 색·폰트·레이아웃 변수는 해당 템플릿 `css/style.css` `:root`에만 정의
- [ ] 공통 모듈·전역 토큰·템플릿 간 CSS/JS import **사용 안 함**
- [ ] Cursor 규칙: `.cursor/rules/*.mdc` · 상세 가이드: `_docs/*.md`

## 주요 폴더

| 폴더 | 역할 |
|------|------|
| `templates/{slug}/` | 개발 중인 독립 템플릿 |
| `_delivery/imweb/{slug}/` | 아임웹 납품 스냅샷 |
| `.cursor/rules/` | Cursor 에이전트 규칙 |
| `_harness/` | 작업·리뷰·스냅샷·리포트 |
| `_logs/` | 결정·변경·실패·QA 기록 |
| `_docs/` | 사람이 읽는 가이드 (본 문서들) |
| `_docs/legacy/` | 리셋 이전 자료 (참고만, 수정 금지) |

## 워크플로우 (요약)

```
Figma 디자인 → MCP 수치 전달 → 구조 분석·승인 → 섹션 구현 → QA → 로그 → commit
```

자세한 흐름: `.cursor/rules/20-harness-workflow.mdc`

## 신규 템플릿 추가 기준

### 1. slug 결정 (Figma 프레임명 기준)

- [ ] Figma MCP에서 **최상위 프레임명** 확인
- [ ] 아래 규칙으로 slug 정규화 후 **제안 → 사용자 승인**
  - 소문자 · `template_` 접두어 제거(가능 시)
  - 공백·`_` → `-` · kebab-case · `[a-z0-9-]`만
- [ ] 승인 후 `templates/{slug}/` 생성

| Figma frame | Proposed slug | 폴더 |
|-------------|---------------|------|
| `template_ontheblue` | `ontheblue` | `templates/ontheblue/` |
| `template_claire_clinic` | `claire-clinic` | `templates/claire-clinic/` |

### 2. 필수 파일

1. `templates/{slug}/` 폴더 생성 (승인 후)
2. 필수 파일 배치:
   - [ ] `index.html`
   - [ ] `css/style.css` (`:root` 변수 포함)
   - [ ] `js/main.js`
   - [ ] `assets/images/`, `assets/icons/`
3. 서브페이지는 같은 폴더에 `about.html` 등 추가
4. 다른 템플릿 파일 참조·import 없이 단독 동작 확인
5. 완료 후 `_delivery/imweb/{slug}/`에 QA 통과본 복사 (`{slug}` = 승인된 slug)

## 현재 템플릿

| slug | 상태 | 비고 |
|------|------|------|
| `template-c` | 개발 중 | 노바 스튜디오 랜딩 (이름 변경 예정) |
