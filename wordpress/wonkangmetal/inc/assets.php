<?php

function wonkangmetal_asset_uri($path = '') {
  return trailingslashit(get_template_directory_uri()) . 'assets/' . ltrim($path, '/');
}

function wonkangmetal_enqueue_assets() {
  $theme = wp_get_theme();
  $ver   = $theme->get('Version');

  wp_enqueue_style(
    'wonkangmetal-pretendard',
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css',
    array(),
    '1.3.9'
  );

  wp_enqueue_style(
    'wonkangmetal-raleway',
    'https://fonts.googleapis.com/css2?family=Raleway:wght@500;600;700;800&display=swap',
    array(),
    null
  );

  $styles = array(
    'wonkangmetal-tokens'      => 'css/tokens.css',
    'wonkangmetal-base'        => 'css/base.css',
    'wonkangmetal-layout'      => 'css/layout.css',
    'wonkangmetal-components'  => 'css/components.css',
    'wonkangmetal-sub'         => 'css/pages/sub.css',
    'wonkangmetal-responsive'  => 'css/responsive.css',
    'wonkangmetal-original-shell' => 'css/original-shell.css',
  );

  $prev = array('wonkangmetal-pretendard', 'wonkangmetal-raleway');
  foreach ($styles as $handle => $file) {
    wp_enqueue_style($handle, wonkangmetal_asset_uri($file), $prev, $ver);
    $prev = array($handle);
  }

  wp_enqueue_script(
    'wonkangmetal-navigation',
    wonkangmetal_asset_uri('js/navigation.js'),
    array(),
    $ver,
    true
  );

  wp_enqueue_script(
    'wonkangmetal-main',
    wonkangmetal_asset_uri('js/main.js'),
    array('wonkangmetal-navigation'),
    $ver,
    true
  );

  if (is_front_page()) {
    wp_enqueue_style(
      'wonkangmetal-swiper',
      'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
      array(),
      '11'
    );
    wp_enqueue_style(
      'wonkangmetal-splitting',
      'https://unpkg.com/splitting/dist/splitting.css',
      array(),
      '1.0.6'
    );
    wp_enqueue_style(
      'wonkangmetal-aos',
      'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css',
      array(),
      '2.3.4'
    );

    wp_enqueue_style(
      'wonkangmetal-original-main',
      wonkangmetal_asset_uri('css/pages/original-main.css'),
      array('wonkangmetal-swiper', 'wonkangmetal-splitting', 'wonkangmetal-aos'),
      $ver
    );

    wp_enqueue_style(
      'wonkangmetal-home',
      wonkangmetal_asset_uri('css/pages/home.css'),
      array('wonkangmetal-original-main'),
      $ver
    );

    wp_enqueue_script(
      'wonkangmetal-swiper',
      'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
      array(),
      '11',
      true
    );
    wp_enqueue_script(
      'wonkangmetal-splitting',
      'https://unpkg.com/splitting/dist/splitting.min.js',
      array(),
      '1.0.6',
      true
    );
    wp_enqueue_script(
      'wonkangmetal-gsap',
      'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
      array(),
      '3',
      true
    );
    wp_enqueue_script(
      'wonkangmetal-scrolltrigger',
      'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
      array('wonkangmetal-gsap'),
      '3',
      true
    );
    wp_enqueue_script(
      'wonkangmetal-aos',
      'https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js',
      array(),
      '2.3.4',
      true
    );
    wp_enqueue_script(
      'wonkangmetal-main-home',
      wonkangmetal_asset_uri('js/main-home.js'),
      array(
        'wonkangmetal-swiper',
        'wonkangmetal-splitting',
        'wonkangmetal-gsap',
        'wonkangmetal-scrolltrigger',
        'wonkangmetal-aos',
      ),
      $ver,
      true
    );
  }

  if (is_post_type_archive('product') || is_singular('product') || is_tax('product_category')) {
    wp_enqueue_style(
      'wonkangmetal-product',
      wonkangmetal_asset_uri('css/pages/product.css'),
      array('wonkangmetal-sub'),
      $ver
    );
  }

  if (is_post_type_archive('news') || is_singular('news')) {
    wp_enqueue_style(
      'wonkangmetal-news',
      wonkangmetal_asset_uri('css/pages/news.css'),
      array('wonkangmetal-sub'),
      $ver
    );
  }

  if (is_page() && wonkangmetal_is_theme_page()) {
    wp_enqueue_style(
      'wonkangmetal-pages',
      wonkangmetal_asset_uri('css/pages/pages.css'),
      array('wonkangmetal-sub'),
      $ver
    );

    $page_path = wonkangmetal_get_page_path();
    if ($page_path && wonkangmetal_has_original_content($page_path)) {
      wp_enqueue_style(
        'wonkangmetal-original-sub',
        wonkangmetal_asset_uri('css/pages/original-sub.css'),
        array('wonkangmetal-pages'),
        $ver
      );
    }
  }
}
add_action('wp_enqueue_scripts', 'wonkangmetal_enqueue_assets');
