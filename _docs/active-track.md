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
| **토큰** | `design-tokens-master.md` · SUIT · **1600** · `_icons/` · 타이포 최소 |
| **디자인** | 기획서·바이브 · UIUX 디렉터 원칙 유지 · 피그마는 줄 때만 |
| **모션** | **GSAP+ScrollTrigger** · Swiper · `46` jQuery preset=승인 시에만 |
| **절차** | `20-harness-workflow.mdc` · `70`~`72` |
| **플러그인 표준** | 델타 문서 표 (Yoast, Wordfence, UpdraftPlus, CF7, W3TC, Smush) |
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
