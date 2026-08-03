# Active Track (현재 기본)

> **갱신:** 2026-08-03 · 결정: `_logs/decision-log.md`  
> **진행 중:** WordPress 커스텀 테마 (크몽 납품)  
> **규칙 SoT:** `.cursor/rules/` · `PROJECT_CONTEXT.md` · WP 델타·전환 문서

## 지금 쓰는 것

| 항목 | 값 |
|------|-----|
| **기본 트랙** | **WordPress** (Classic 커스텀 테마) |
| **작업 경로** | `wordpress/{slug}/` |
| **납품** | `package-delivery-wp.js` → `wordpress/{slug}/dist/{slug}.zip` |
| **사업 SoT** | `PROJECT_CONTEXT.md` + `PROJECT_CONTEXT_wordpress_delta.md` |
| **WP 구현 델타** | `WORDPRESS_TRANSITION_CHANGES.md` |
| **서브페이지 UI/UX** | `WORDPRESS_SUBPAGE_UIUX_INSTRUCTION.md` (유형·맵·CPT·관리자) |
| **토큰** | `design-tokens-master.md` · SUIT · **1600** · `_icons/`원본→테마 `assets/icons/` · 타이포 최소 · 카드 24/24 · 그림자=중립 alpha |
| **디자인** | 기획서·바이브 · do-dont · **`25-uiux-design-director`**(SoT 하위) · 피그마는 줄 때만 · A~F 확정 |
| **모션** | 필요 시 **GSAP+ScrollTrigger** · 슬라이더 필요 시 **Swiper** (전 테마 의무 아님) · `46`=승인 시만 |
| **절차** | `20-harness-workflow.mdc` · `70`~`72` |
| **플러그인 표준** | 델타 문서 표 (후보) · §6 재확인 |
| **소식/공지 CMS** | **미결정** (기본 글 / CPT / 동반 플러그인) · 확정 전 임의 구현 금지 |
| **QA** | `50` + WP 전용 QA (`TRANSITION` §10) · `_logs/qa-log.md` |
| **SEO/AEO/GEO** | on-demand `73` |

## 동결

| 내용 | 경로 |
|------|------|
| 하드코딩 정적 | `templates/` · `_delivery/` |
| 개인 site | `_archive/site/` |
| 구 정적·Cafe24 | `_archive/` · `archive/80`~`84` |

## CMS·호스팅

- **CMS:** WordPress 관리자 = 고객 콘텐츠 수정 도구  
- **호스팅:** 카페24 WordPress (고객 명의)  
- **관리자 없는 정적 납품:** 기본 옵션에서 **제외** (델타 2-5)
