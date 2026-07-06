<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header id="header" class="site-header">
  <div class="section-shell section-shell--gutter">
    <div class="site-header__inner">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="site-header__logo">
        <img
          class="site-header__logo-img"
          src="<?php echo esc_url(barun_dental_asset_uri('logo-header')); ?>"
          alt="365 초록바른치과"
          width="229"
          height="49"
          decoding="async"
        >
      </a>

      <div class="site-header__right">
        <nav id="site-navigation" class="site-header__nav" aria-label="<?php esc_attr_e('Primary', '365-barun-dental'); ?>">
          <ul class="site-header__menu">
            <li><a href="#" class="site-header__link">병원소개</a></li>
            <li><a href="#" class="site-header__link">진료과목</a></li>
            <li><a href="#" class="site-header__link">의료진</a></li>
            <li><a href="#" class="site-header__link">병원둘러보기</a></li>
            <li><a href="#" class="site-header__link">진료안내</a></li>
          </ul>
        </nav>

        <a href="#" class="site-header__cta btn-slide-hover">
          <?php echo barun_dental_button_slide('상담·예약'); ?>
        </a>

        <button type="button" class="site-header__toggle" aria-expanded="false" aria-controls="site-navigation">
          <span class="site-header__toggle-bar" aria-hidden="true"></span>
          <span class="screen-reader-text">메뉴 열기</span>
        </button>
      </div>
    </div>
  </div>
</header>

<main class="site-main">
