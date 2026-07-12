<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php
$nav_items = tenfold_nav_items();
$current = tenfold_current_nav_key();
?>
  <header id="header" class="site-header" data-site-header>
    <div class="site-header__bar">
      <div class="site-header__inner section-shell section-shell--gutter">
        <a class="site-header__logo" href="<?php echo esc_url(tenfold_url()); ?>">TENFOLD</a>
        <nav class="site-header__nav site-header__nav--desktop" aria-label="주요 메뉴">
          <ul class="site-header__list">
            <?php foreach ($nav_items as $item) : ?>
              <li>
                <a
                  class="site-header__link<?php echo $current === $item['key'] ? ' is-active' : ''; ?>"
                  href="<?php echo esc_url($item['href']); ?>"
                  <?php echo $current === $item['key'] ? ' aria-current="page"' : ''; ?>
                ><?php echo esc_html($item['label']); ?></a>
              </li>
            <?php endforeach; ?>
          </ul>
        </nav>
        <button
          type="button"
          class="site-header__menu-btn"
          data-menu-toggle
          aria-label="메뉴 열기"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span class="site-header__menu-label">Menu</span>
        </button>
      </div>
    </div>

    <div
      id="mobile-menu"
      class="mobile-menu"
      data-mobile-menu
      hidden
      inert
      role="dialog"
      aria-modal="true"
      aria-label="전체 메뉴"
    >
      <div class="mobile-menu__panel">
        <div class="mobile-menu__top section-shell section-shell--gutter">
          <p class="mobile-menu__brand">TENFOLD STUDIO</p>
          <button type="button" class="mobile-menu__close" data-menu-close aria-label="메뉴 닫기">Close</button>
        </div>
        <nav class="mobile-menu__nav section-shell section-shell--gutter" aria-label="모바일 메뉴">
          <ul class="mobile-menu__list">
            <?php foreach ($nav_items as $item) : ?>
              <li>
                <a
                  class="mobile-menu__link<?php echo $current === $item['key'] ? ' is-active' : ''; ?>"
                  href="<?php echo esc_url($item['href']); ?>"
                  <?php echo $current === $item['key'] ? ' aria-current="page"' : ''; ?>
                >
                  <span class="mobile-menu__index"><?php echo esc_html($item['index']); ?></span>
                  <span class="mobile-menu__label"><?php echo esc_html($item['label']); ?></span>
                </a>
              </li>
            <?php endforeach; ?>
          </ul>
        </nav>
        <div class="mobile-menu__footer section-shell section-shell--gutter">
          <a class="mobile-menu__email" href="mailto:tenfold@tenfold.kr">tenfold@tenfold.kr</a>
        </div>
      </div>
    </div>
  </header>
  <main id="main" class="site-main">
