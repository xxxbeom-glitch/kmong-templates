<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php
$template_a_gnb = array_slice(template_a_get('site.gnb', array()), 0, 4);
$template_a_gnb_urls = array(
  array(home_url('/about/greeting/'), home_url('/about/ceo/'), home_url('/about/directions/')),
  array(home_url('/service/solution/'), home_url('/service/process/'), home_url('/service/portfolio/')),
  array(home_url('/business/#business-corporate'), home_url('/business/#business-brand')),
  array(get_post_type_archive_link('notice'), home_url('/contact/')),
);
$template_a_gnb_ids = array('about', 'service', 'business', 'support');
?>
  <header class="site-header" data-header-mega>
    <div class="site-header__bar">
      <div class="site-header__shell site-header__inner">
        <a class="site-header__logo" href="<?php echo esc_url(home_url('/')); ?>"><?php echo esc_html(template_a_get('site.logo')); ?></a>
        <div class="site-header__menu">
          <nav class="site-header__nav" aria-label="<?php echo esc_attr(template_a_get('site.nav_label')); ?>">
            <ul class="site-header__list">
              <?php foreach ($template_a_gnb as $index => $menu) : ?>
                <li class="site-header__item site-header__item--has-mega">
                  <a href="<?php echo esc_url($template_a_gnb_urls[$index][0]); ?>" class="site-header__link site-header__trigger" aria-haspopup="true" aria-expanded="false"><?php echo esc_html($menu['label']); ?></a>
                </li>
              <?php endforeach; ?>
            </ul>
          </nav>
          <a class="btn-cta btn-cta--header" href="<?php echo esc_url(home_url('/contact/')); ?>"><?php echo esc_html(template_a_get('site.header_cta')); ?></a>
          <button type="button" class="site-header__menu-btn" aria-label="<?php echo esc_attr(template_a_get('site.menu_open_label')); ?>" aria-controls="mobile-nav" aria-expanded="false">
            <span class="site-header__menu-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
    <nav id="mobile-nav" class="site-header__drawer" hidden inert aria-label="<?php echo esc_attr(template_a_get('site.drawer_label')); ?>">
      <div class="site-header__drawer-inner">
        <ul class="site-header__drawer-list">
          <?php foreach ($template_a_gnb as $index => $menu) : ?>
            <li class="site-header__drawer-item">
              <button type="button" class="site-header__drawer-toggle" aria-expanded="false" aria-controls="drawer-<?php echo esc_attr($template_a_gnb_ids[$index]); ?>"><?php echo esc_html($menu['label']); ?></button>
              <ul id="drawer-<?php echo esc_attr($template_a_gnb_ids[$index]); ?>" class="site-header__drawer-sub" hidden>
                <?php foreach (array_slice($menu['items'], 0, count($template_a_gnb_urls[$index])) as $item_index => $item) : ?>
                  <li><a class="site-header__drawer-link" href="<?php echo esc_url($template_a_gnb_urls[$index][$item_index]); ?>"><?php echo esc_html($item['label']); ?></a></li>
                <?php endforeach; ?>
              </ul>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
    </nav>
    <div id="gnb-mega-panel" class="site-header__mega" hidden inert>
      <div class="site-header__shell site-header__mega-inner">
        <ul class="site-header__mega-list">
          <?php foreach ($template_a_gnb as $index => $menu) : ?>
            <li class="site-header__mega-col">
              <ul class="site-header__mega-sub">
                <?php foreach (array_slice($menu['items'], 0, count($template_a_gnb_urls[$index])) as $item_index => $item) : ?>
                  <li><a class="site-header__sublink" href="<?php echo esc_url($template_a_gnb_urls[$index][$item_index]); ?>"><?php echo esc_html($item['label']); ?></a></li>
                <?php endforeach; ?>
              </ul>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>
    </div>
    <div class="site-header__dim" hidden aria-hidden="true"></div>
  </header>
