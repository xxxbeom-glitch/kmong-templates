# Original Compatibility Gap Report

Generated: 2026-07-09T05:38:14.606Z

## 1. Summary

- Original main class count: **84**
- WP template class count: **196**
- Critical original classes missing in WP templates: **54**
- Key CSS selectors with no DOM match (sampled): **124**
- JS selectors with no DOM match: **22**

## 2. DOM Structure Gaps

| Area | Original | WP |
|---|---|---|
| Wrapper | `<main> (no class)` | `<main class="site-main" id="site-main">` |
| Header root | `<header class="s_header flex_center">` | `<header class="site-header" id="site-header">` |
| Header logo | `<h1><a><img logo_w.png>` | `<div class="site-header__brand"><a><span text>` |
| GNB | `<nav class="pc_gnb"><ul id="s_gnb">` | `<nav class="site-nav site-nav--desktop"><ul class="site-nav__list">` |
| Mobile menu | `<div class="menu_sidebar"><nav class="mobile_gnb">` | `<div class="site-mobile-menu">` |
| Footer root | `<footer id="si_footer">` | `<footer class="site-footer" id="site-footer">` |
| Footer TOP | `<div class="top flex_center">` | `<button class="site-footer__top">` |
| Sub hero | `<section class="sub_visual sub_visual_bg0N">` | `<section class="sub-hero sub-hero--*">` |
| Sub nav | `<nav class="sub_nav"><ul><li class="active">` | `<nav class="sub-nav"><li class="is-active">` |
| Product card | `b_board / bo_list gallery` | `<article class="product-card">` |
| News archive | `news-card in board_slider slide` | `news-card vs card-home (main only original)` |

## 3. Missing Core Original Classes (by area)

### header

- `.s_header`
- `.pc_gnb`
- `.s_gnb`
- `.utils`
- `.contact_button`
- `.lang_box`
- `.menu_hamberger`
- `.menu_sidebar`
- `.mobile_gnb`
- `.scrolled`
- `.hide`
- `.active`
- `.is-open`

### main

- `.slide01`
- `.slide02`
- `.slide03`
- `.is-anim`
- `.base`
- `.reveal`
- `.ink`
- `.count`
- `.part_01`
- `.part_02`
- `.part_03`
- `.part_04`
- `.vision_01`
- `.vision_02`
- `.vision_03`
- `.vision_04`

### footer

- `.si_footer`
- `.footer_logo`
- `.footer_content`
- `.info`
- `.footer_utils`
- `.copyright`
- `.top`

### sub (WP layout tpl)

- `.sub_visual`
- `.sub_visual_bg01`
- `.sub_visual_bg02`
- `.sub_visual_bg03`
- `.sub_visual_bg04`
- `.sub_visual_bg05`
- `.sub_nav`
- `.active`
- `.si_inner`
- `.sub_section`
- `.sub_board`

### board (WP product/news)

- `.bo_list`
- `.bo_cate`
- `.bo_sch`
- `.tbl_head01`
- `.td_subject`
- `.list_item`
- `.gallery_list`

## 4. Present Core Original Classes (by area)

### header (1)

`flex_center`

### main (63)

`main_visual`, `slide_txt`, `sub_caption`, `main_section`, `main_business`, `business_title`, `mask-fill`, `line1`, `line2`, `line3`, `business_slider`, `business_pc`, `business_m`, `business_slider_m`, `slider_pagenation`, `current_number`, `total_number`, `scroll`, `business_slider_wrap`, `busness_slider_nav`, `busness_prev`, `busness_next`, `img_wrap`, `main_company`, `main_inner`, `main_title`, `split-title`, `stats_list`, `unit`, `txt`, `view_more_01`, `view_more_02`, `text-top`, `text-bottom`, `arrows`, `arrow`, `a1`, `a2`, `main_solution`, `parts`, `parts_list`, `main_vision`, `quality_bg`, `vision_item`, `main_vision_m`, `vision_slider`, `vision_slider_nav`, `vision_prev`, `vision_next`, `main_customer`, `image_pc`, `image_m`, `content`, `main_gallery`, `gallery_slider_wrap`, `board_slider`, `board_slider_nav`, `board_slider_prev`, `board_slider_next`, `category`, `date`, `main_contact`, `conmtact_title`

### footer (0)



### sub (WP layout tpl) (1)

`breadcrumb`

### board (WP product/news) (0)



## 5. Failed JS Selectors (s_script.js → WP DOM)

| Selector | Missing classes | Missing ids |
|---|---|---|
| `.s_header` | .s_header | - |
| `.s_header nav > ul > li.is-open > ul` | .s_header, .is-open | - |
| `.proc` | .proc | - |
| `.proc_tabs li` | .proc_tabs | - |
| `.proc_copy_body` | .proc_copy_body | - |
| `.proc_swiper .swiper-slide` | .proc_swiper | - |
| `.copy` | .copy | - |
| `footer .top` | .top | - |
| `.base` | .base | - |
| `.reveal` | .reveal | - |
| `header.s_header .menu_sidebar .mobile_gnb #s_gnb` | .s_header, .menu_sidebar, .mobile_gnb | #s_gnb |
| `.lang_box` | .lang_box | - |
| `.menu_hamberger` | .menu_hamberger | - |
| `.menu_sidebar` | .menu_sidebar | - |
| `.sub_nav` | .sub_nav | - |
| `.proc_stage` | .proc_stage | - |
| `.char` | .char | - |
| `:scope > li.active` | .active | - |
| `.proc_tabs li button` | .proc_tabs | - |
| `.proc_swiper` | .proc_swiper | - |
| `.proc .proc_nav .swiper-button-next` | .proc, .proc_nav | - |
| `.proc .proc_nav .swiper-button-prev` | .proc, .proc_nav | - |

## 6. Failed CSS Selectors (sample, key prefixes)

| Selector | Missing |
|---|---|
| `header.s_header` | .s_header |
| `header.s_header.hide` | .s_header, .hide |
| `header.s_header::after` | .s_header |
| `header.s_header.scrolled::after` | .s_header, .scrolled |
| `header.s_header.active::after` | .s_header, .active |
| `header.s_header.active::before` | .s_header, .active |
| `header.s_header:hover::before` | .s_header |
| `header.s_header.menu-open::before` | .s_header, .menu-open |
| `header.s_header:hover nav.pc_gnb > ul > li > ul` | .s_header, .pc_gnb |
| `header.s_header nav.pc_gnb > ul > li.is-open > ul` | .s_header, .pc_gnb, .is-open |
| `header.s_header nav > ul > li > ul` | .s_header |
| `header.s_header nav > ul` | .s_header |
| `header.s_header nav > ul > li` | .s_header |
| `header.s_header nav > ul > li > a` | .s_header |
| `header.s_header nav > ul > li > a.active` | .s_header, .active |
| `header.s_header > h1` | .s_header |
| `header.s_header > .utils` | .s_header, .utils |
| `header.s_header nav.pc_gnb > ul > li > ul` | .s_header, .pc_gnb |
| `header.s_header nav > ul > li > ul a` | .s_header |
| `header.s_header nav > ul > li > ul a:hover` | .s_header |
| `/* --- Utils --- */
header.s_header .utils` | .s_header, .utils |
| `header.s_header .menu_hamberger` | .s_header, .menu_hamberger |
| `header.s_header .menu_hamberger span` | .s_header, .menu_hamberger |
| `header.s_header .utils .contact_button` | .s_header, .utils, .contact_button |
| `header.s_header .utils .contact_button img` | .s_header, .utils, .contact_button |
| `header.s_header .utils ul` | .s_header, .utils |
| `header.s_header .utils ul a` | .s_header, .utils |
| `header.s_header .utils ul a:hover` | .s_header, .utils |
| `header.s_header .utils ul a.active` | .s_header, .utils, .active |
| `header.s_header .utils .lang_box` | .s_header, .utils, .lang_box |
| `header.s_header .utils .lang_box button img` | .s_header, .utils, .lang_box |
| `.menu_hamberger.active span:nth-child(1)` | .menu_hamberger, .active |
| `.menu_hamberger.active span:nth-child(2)` | .menu_hamberger, .active |
| `/* 모바일 메뉴 */
header.s_header .menu_sidebar` | .s_header, .menu_sidebar |
| `header.s_header .menu_sidebar.active` | .s_header, .menu_sidebar, .active |
| `header.s_header .menu_sidebar nav > ul` | .s_header, .menu_sidebar |
| `header.s_header .menu_sidebar nav > ul > li` | .s_header, .menu_sidebar |
| `header.s_header .menu_sidebar nav > ul > li.active` | .s_header, .menu_sidebar, .active |
| `header.s_header .menu_sidebar nav > ul > li::after` | .s_header, .menu_sidebar |
| `header.s_header .menu_sidebar nav > ul > li > a` | .s_header, .menu_sidebar |

## 7. Recovery Plan (DOM/class dual-bind)

See report section 7 in chat / follow-up implementation.
