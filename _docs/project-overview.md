# Project Overview

> **현재 기본 트랙:** WordPress — `_docs/active-track.md` · `decision-log` 2026-07-10

## 목적 (현재)

카페24 뉴아우토반 **WordPress Classic Theme** 운영 사이트 제작.

- Figma 1920px → MCP 분석 → **`wordpress/{slug}/`에 테마 직접 구현**
- 스택: PHP 템플릿 · CSS · jQuery (`wp_enqueue_script`) · **공지(`notice`) CPT만 CMS** (나머지 섹션 코드 고정)
- 절차: `.cursor/rules/20-harness-workflow.mdc` · WP: `70-wordpress.mdc`

## 핵심 원칙

- [ ] 각 프로젝트는 `wordpress/{slug}/` 아래 **독립 테마** — workbench·별도 반영 단계 없음
- [ ] slug 승인 전 `wordpress/{slug}/` 생성 금지 · `decision-log`에 `[type: wordpress]`
- [ ] CSS/JS는 `functions.php` enqueue · 템플릿 간 PHP/CSS/JS 공유 **금지**
- [ ] Cursor 규칙: `.cursor/rules/*.mdc` · 가이드: `_docs/*.md`

## 주요 폴더

| 폴더 | 역할 |
|------|------|
| `wordpress/{slug}/` | **개발·구현** — WP 테마 직접 작성 |
| `wordpress/{slug}/dist/{slug}.zip` | QA PASS 후 패키징 (`package-delivery-wp.js`) |
| `_harness/` | WP 패키징·검증·QA PNG·인터랙션 카탈로그 (**코드 작업실 아님**) |
| `_logs/` | 결정·변경·실패·QA |
| `_docs/` | 사람용 가이드 (`active-track.md` · `wordpress-guide.md` 등) |

### 동결 (보관 · 신규 미사용)

| 폴더 | 트랙 |
|------|------|
| `_archive/templates/` | 크몽 정적 HTML · cafe24_shop |
| `_archive/delivery/` | 구 정적·아임웹 납품 |
| `cafe24/` · `_release/` | Cafe24 A/B (미사용 시) |

## 워크플로우 (요약 · WP)

```
Figma MCP 분석 → 승인
→ wordpress/{slug}/ 섹션 1개 구현
→ 섹션 QA → qa-log
→ 사용자 PASS → (반복)
→ package-delivery-wp.js → 카페24 최종 QA
```

## Static 트랙 (동결)

크몽 판매용 HTML은 `templates/{slug}/` + `package-delivery.js` — **현재 신규 진행 안 함**.  
규칙: `10-static-template.mdc` · `60-delivery.mdc`

## WordPress 프로젝트 (예)

| slug | 비고 |
|------|------|
| `365-hes-womens-clinic` | Figma 기준 메인 |
| `365-barun-dental` | Classic Theme |
| `wonkangmetal` | mirror 기반 WP |

상세: `_docs/wordpress-guide.md`

## legacy

`_docs/legacy/` · `_docs/legacy/templates/` — 참고만 · active 기준 아님
