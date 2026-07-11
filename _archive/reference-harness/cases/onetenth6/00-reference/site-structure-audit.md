# Site Structure Audit — onetenth6 (Business 06)

**원본:** https://onetenth6.mycafe24.com/ · **Home - 십분의일 - 비즈니스 06**

---

## 1. File Map

| 유형 | 목록 |
|------|------|
| HTML | `index.html` + 한글 slug 페이지 + `products/*` + `news/*` + `faq` + `contact` |
| 테마 | `wp-content/themes/onetenth*` (미러에 CSS/JS 일부) |
| 플러그인 | `elementor/` · `bdthemes-element-pack/` · `kboard/` |
| 업로드 | `wp-content/uploads/elementor/css/post-*.css` · 이미지·Pretendard woff |
| 노이즈 | `wp-json/**` · `feed/` · `oembed` — 분석용·콘텐츠 아님 |

## 2. Page Structure

```
body.wp-theme-onetenth-child
  #wrapper-navbar.uicore-navbar
  main / .entry-content
    .elementor.elementor-{pageId}
      .e-con.e-parent (Flex containers)
        .elementor-widget-heading | button | image | html | video | carousel
  footer (Elementor template)
  FAB 문의 버튼
```

## 3. Section Inventory (메인)

| # | 역할 | 비고 |
|---|------|------|
| H | Hero | 새로운 생각, 새로운 시선… |
| 1 | Hero | Business 06 |
| 2 | Our Story + 카운터 4종 (설립연도·프로젝트·클라우드·만족도) | Business 06 |
| 3 | Innovation 4카드 | Business 06 |
| 4 | Our Business | Business 06 |
| 5 | 상담 CTA band | Business 06 |
| 6 | News 최신 3건 | Business 06 |
| F | Footer + FAB | 공통 |

## 4. Component Candidates

- `layout-header` — UICore + Elementor kit-661
- `layout-footer` — Elementor library section
- `section-hero` · `section-proof` · `section-pricing` · `section-faq`
- `ui-carousel` — testimonial / news
- `ui-counter` — animated stats (06)

## 5. Naming Audit

| KEEP | `uicore-*` · `elementor-element-*` · `e-con` · `data-id` |
| RENAME | Elementor hash id → 의미 slug (이식 시) |
| REMOVE | wp-json · feed · oembed 미러 |
| REVIEW | HTML widget inline `<style>` 블록 — SoT 분리 필요 |

## 6. Asset Audit

| HIGH | 십분의일 브랜드·후기 실명·placeholder 주소/사업자 |
| MEDIUM | YouTube embed · Elementor generated CSS per post |
| LOW | Pretendard mirror woff · FA |

## 7. CSS Audit

- Elementor frontend + post-{id}.css (페이지별)
- Element Pack bdt-uikit + widget CSS
- UICore theme styles
- HTML widget inline styles (메인 대형)

## 8. JS Audit

- Elementor frontend + Element Pack
- UICore navigation / sticky / mobile menu
- Swiper·GSAP (HTML widget inline, 03 등)
- KBoard (게시판 페이지)

## 9. Original Trace Risk

| HIGH | Elementor data-id·DB coupling · KBoard shortcode |
| MEDIUM | WP Rocket lazy/preload attributes |
| LOW | Rank Math JSON-LD |

## 10. Refactor Priority

| P0 | Header/Footer shell · GNB IA |
| P1 | 메인 섹션 마크업 (variant별) |
| P2 | news/products CPT · KBoard 대체 |
| P3 | 애니메이션·motion FX |

## 11. Do Not Modify Yet

- `01-original/**` immutable
- `wp-json` 미러 파일 — 참고만
