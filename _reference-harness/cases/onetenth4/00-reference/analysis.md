# onetenth4 — Analysis (Business 04)

**십분의일 - 비즈니스 04** · https://onetenth4.mycafe24.com/

> Track C · browser-captured · 2026-07-09  
> **플랫폼:** WordPress (Cafe24 mycafe24 호스팅) — 카페24 쇼핑몰 스킨(PTMD) **아님**

## Meta

| | |
|--|--|
| 제작사 | 십분의일 (One-tenth) — 프리미엄 WP 템플릿 판매 |
| 템플릿 변형 | **Business 04** |
| 테마 | `wp-theme-onetenth / onetenth-child` |
| 빌더 | Elementor + bdthemes Element Pack + UICore header |
| 플러그인 | KBoard 6.6 · Rank Math · (WP Rocket 흔적) |
| 미러 | **80** URLs · 콘텐츠성 **~34** · remaining **11** (대부분 wp-json/oembed) |

## 메인 IA

**Hero:** Creative Design · 성공적인 비즈니스, 십분의일

1. Hero + 3초만에 문의하기 FAB
2. ABOUT US — 템플릿 판매 카피
3. 서비스/비즈니스 소개 블록
4. News · Contact CTA

**비고:** 08과 유사한 크리에이티브/랜딩형이나 레이아웃·섹션 수 다름

## 공통 GNB / 푸터

- **Header:** `#wrapper-navbar` · `.uicore-navbar` · sticky · 모바일 드로어 (`ui-a-dsmm-expand`)
- **Footer:** Address / Contact / 사업자 placeholder · 개인정보처리방침 · `3초만에 문의하기` FAB
- **메뉴:** 회사소개 · 사업분야 · 제품소개 · 고객지원(공지·뉴스·FAQ·문의)

## Site map (콘텐츠 URL)

- `/ — front`
- `/인사말/ · /연혁/ · /오시는-길/`
- `/사업분야-디자인-1/ · /사업분야-디자인-2/`
- `/제품소개/ · /products/{slug}/`
- `/공지사항/ · /뉴스/ · /news/{slug}/`
- `/faq/ · /contact/`
- `/terms_page/privacy-policy/`

## 모듈 후보 (Track B/C 분석)

| 후보 | 근거 |
|------|------|
| `layout-header` | UICore navbar + Elementor kit |
| `layout-footer` | Elementor footer template |
| `section-hero` | Elementor container + heading/button |
| `section-stats` | 카운터 위젯 (06) |
| `section-cards` | 4열 innovation / pricing |
| `section-news` | WP Query news CPT |
| `section-faq` | accordion (08) |
| `section-contact-cta` | contact 링크 band |
| board-notice | KBoard 또는 페이지 빌더 |
| product-cpt | `/products/` custom post type |

## reconstructionDifficulty

| | |
|--|--|
| 난이도 | **high** — Elementor DB-rendered HTML · inline widget CSS · Element Pack 의존 |
| 리스크 | 데모 placeholder(주소·사업자)·KBoard·WP admin API 미포함 |
| 권장 트랙 | ZIP/테마 원본 확보 시 **WordPress 트랙** · 정적 이식은 섹션 단위 재구현 |

## Track C 경계

| 가능 | 금지 |
|------|------|
| 미러·분석·preview | working skin · 납품 · 84 upload |
