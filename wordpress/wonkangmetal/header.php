<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header s_header flex_center" id="site-header">
  <h1 class="site-header__brand">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="site-header__logo">
      <img
        src="<?php echo esc_url(wonkangmetal_mirror_img('img/logo_w.png')); ?>"
        alt="<?php echo esc_attr(wonkangmetal_site_brand()['name']); ?>"
        class="site-header__logo-img"
        width="146"
        height="40"
      />
      <span class="site-header__logo-text screen-reader-text"><?php echo esc_html(wonkangmetal_site_brand()['name']); ?></span>
    </a>
  </h1>

  <nav class="site-header__nav site-nav site-nav--desktop pc_gnb" aria-label="<?php esc_attr_e('주 메뉴', 'wonkangmetal'); ?>">
    <ul id="s_gnb" class="site-nav__list">
      <?php foreach (wonkangmetal_nav_menu() as $item) : ?>
        <?php wonkangmetal_render_nav_item($item, false, 'header'); ?>
      <?php endforeach; ?>
    </ul>
  </nav>

  <div class="site-header__utils utils">
    <a href="<?php echo esc_url(wonkangmetal_page_url('contact')); ?>" class="site-header__contact btn-cta contact_button" aria-label="<?php esc_attr_e('문의', 'wonkangmetal'); ?>">
      <span>CONTACT</span>
      <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/utils_contact.png')); ?>" alt="" width="20" height="20" />
    </a>

    <div class="lang_box lang-box site-header__lang" aria-label="<?php esc_attr_e('언어 선택', 'wonkangmetal'); ?>">
      <button type="button" class="lang-box__toggle" aria-expanded="false" disabled title="<?php esc_attr_e('다국어는 P3에서 지원 예정', 'wonkangmetal'); ?>">
        <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/lang_icon.png')); ?>" alt="<?php esc_attr_e('언어 선택', 'wonkangmetal'); ?>" width="24" height="24" />
      </button>
      <ul>
        <li><a href="<?php echo esc_url(home_url('/')); ?>" class="active">KO</a></li>
        <li><span class="lang-box__pending" title="P3">EN</span></li>
        <li><span class="lang-box__pending" title="P3">JP</span></li>
      </ul>
    </div>

    <button
      type="button"
      class="site-header__menu-toggle menu-hamburger menu_hamberger"
      aria-expanded="false"
      aria-controls="site-mobile-menu"
    >
      <span class="menu-hamburger__bar" aria-hidden="true"></span>
      <span class="menu-hamburger__bar" aria-hidden="true"></span>
      <span class="screen-reader-text"><?php esc_html_e('메뉴 열기', 'wonkangmetal'); ?></span>
    </button>
  </div>

  <?php get_template_part('template-parts/layout/mobile', 'menu'); ?>
</header>

<main class="site-main" id="site-main">
