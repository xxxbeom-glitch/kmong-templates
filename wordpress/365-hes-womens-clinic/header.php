<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header id="header" class="site-header">
  <div class="site-header__dim" aria-hidden="true" hidden></div>

  <div class="section-shell section-shell--gutter">
    <div class="site-header__inner">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="site-header__logo">
        <img
          class="site-header__logo-img"
          src="<?php echo esc_url(hes_womens_clinic_asset_uri('logo-header')); ?>"
          alt="<?php echo esc_attr(get_bloginfo('name')); ?>"
          width="182"
          height="54"
          decoding="async"
        >
      </a>

      <nav id="site-navigation" class="site-header__nav" aria-label="<?php esc_attr_e('주 메뉴', '365-hes-womens-clinic'); ?>">
        <ul class="site-header__menu">
          <?php foreach (hes_womens_clinic_gnb_items() as $item) : ?>
            <?php
            $children = isset($item['children']) ? $item['children'] : array();
            $has_dropdown = count($children) > 0;
            $item_url = isset($item['url']) ? $item['url'] : '#';
            ?>
            <li class="site-header__item<?php echo $has_dropdown ? ' site-header__item--dropdown' : ''; ?>">
              <?php if ($has_dropdown) : ?>
                <button
                  type="button"
                  class="site-header__trigger"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <?php echo esc_html($item['label']); ?>
                </button>
                <div class="site-header__dropdown" hidden>
                  <ul class="site-header__submenu">
                    <?php foreach ($children as $child) : ?>
                      <li>
                        <a
                          class="site-header__sublink"
                          href="<?php echo esc_url($child['url']); ?>"
                        ><?php echo esc_html($child['label']); ?></a>
                      </li>
                    <?php endforeach; ?>
                  </ul>
                </div>
              <?php else : ?>
                <a class="site-header__link" href="<?php echo esc_url($item_url); ?>">
                  <?php echo esc_html($item['label']); ?>
                </a>
              <?php endif; ?>
            </li>
          <?php endforeach; ?>
        </ul>
      </nav>

      <a class="site-header__cta" href="<?php echo esc_url(home_url('/support/reservation/')); ?>">진료 상담</a>

      <button
        type="button"
        class="site-header__toggle"
        aria-expanded="false"
        aria-controls="site-navigation"
      >
        <span class="site-header__toggle-bar" aria-hidden="true"></span>
        <span class="screen-reader-text"><?php esc_html_e('메뉴 열기', '365-hes-womens-clinic'); ?></span>
      </button>
    </div>
  </div>
</header>

<main class="site-main">
