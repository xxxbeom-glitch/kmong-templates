<?php

if (!defined('ABSPATH')) {
  exit;
}

function rathon_asset_path($relative) {
  return get_template_directory() . '/assets/' . ltrim($relative, '/');
}

function rathon_asset_uri($relative) {
  return trailingslashit(get_template_directory_uri()) . 'assets/' . ltrim($relative, '/');
}

function rathon_asset_ver($relative) {
  $file = rathon_asset_path($relative);
  return file_exists($file) ? (string) filemtime($file) : RATHON_THEME_VERSION;
}

function rathon_enqueue_assets() {
  wp_enqueue_style(
    'rathon-fonts',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap',
    array(),
    null
  );

  wp_enqueue_style(
    'rathon-tokens',
    rathon_asset_uri('css/tokens.css'),
    array('rathon-fonts'),
    rathon_asset_ver('css/tokens.css')
  );

  wp_enqueue_style(
    'rathon-base',
    rathon_asset_uri('css/base.css'),
    array('rathon-tokens'),
    rathon_asset_ver('css/base.css')
  );

  wp_enqueue_style(
    'rathon-header',
    rathon_asset_uri('css/header.css'),
    array('rathon-base'),
    rathon_asset_ver('css/header.css')
  );

  wp_enqueue_script(
    'rathon-main',
    rathon_asset_uri('js/main.js'),
    array(),
    rathon_asset_ver('js/main.js'),
    true
  );

  wp_enqueue_script(
    'rathon-nav',
    rathon_asset_uri('js/nav.js'),
    array('rathon-main'),
    rathon_asset_ver('js/nav.js'),
    true
  );

  if (is_front_page()) {
    wp_enqueue_style(
      'rathon-home-hero',
      rathon_asset_uri('css/home-hero.css'),
      array('rathon-header'),
      rathon_asset_ver('css/home-hero.css')
    );

    wp_enqueue_style(
      'rathon-swiper',
      'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
      array(),
      '11'
    );
    wp_enqueue_script(
      'rathon-swiper',
      'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
      array(),
      '11',
      true
    );

    wp_enqueue_style(
      'rathon-home-iss',
      rathon_asset_uri('css/home-iss.css'),
      array('rathon-home-hero', 'rathon-swiper'),
      rathon_asset_ver('css/home-iss.css')
    );
    wp_enqueue_script(
      'rathon-iss-slider',
      rathon_asset_uri('js/iss-slider.js'),
      array('rathon-swiper'),
      rathon_asset_ver('js/iss-slider.js'),
      true
    );
    wp_enqueue_style(
      'rathon-home-eco',
      rathon_asset_uri('css/home-ecosystem.css'),
      array('rathon-home-iss'),
      rathon_asset_ver('css/home-ecosystem.css')
    );
    wp_enqueue_style(
      'rathon-home-evidence',
      rathon_asset_uri('css/home-evidence.css'),
      array('rathon-home-eco'),
      rathon_asset_ver('css/home-evidence.css')
    );
    wp_enqueue_script(
      'rathon-evidence-pager',
      rathon_asset_uri('js/evidence-pager.js'),
      array(),
      rathon_asset_ver('js/evidence-pager.js'),
      true
    );
    wp_enqueue_style(
      'rathon-home-company',
      rathon_asset_uri('css/home-company.css'),
      array('rathon-home-evidence'),
      rathon_asset_ver('css/home-company.css')
    );
  }

  if (is_page_template('page-templates/product-rathon-iam.php') || is_page('rathon-iam')) {
    wp_enqueue_style(
      'rathon-product-iam',
      rathon_asset_uri('css/product-iam.css'),
      array('rathon-header'),
      rathon_asset_ver('css/product-iam.css')
    );
  }
}
add_action('wp_enqueue_scripts', 'rathon_enqueue_assets');
