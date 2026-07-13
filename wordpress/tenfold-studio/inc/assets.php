<?php

if (!defined('ABSPATH')) {
  exit;
}

function tenfold_asset_uri($path = '') {
  return trailingslashit(get_template_directory_uri()) . 'assets/' . ltrim($path, '/');
}

function tenfold_asset_version($relative_path) {
  $file = get_template_directory() . '/assets/' . ltrim($relative_path, '/');
  return file_exists($file) ? (string) filemtime($file) : wp_get_theme()->get('Version');
}

function tenfold_enqueue_assets() {
  wp_enqueue_style(
    'tenfold-pretendard',
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css',
    array(),
    null
  );

  wp_enqueue_style(
    'tenfold-main',
    tenfold_asset_uri('css/style.css'),
    array('tenfold-pretendard'),
    tenfold_asset_version('css/style.css')
  );

  $main_deps = array('jquery');

  if (is_front_page()) {
    wp_enqueue_style(
      'tenfold-swiper',
      'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
      array(),
      '11'
    );
    wp_enqueue_script(
      'tenfold-swiper',
      'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
      array(),
      '11',
      true
    );
    $main_deps[] = 'tenfold-swiper';
  }

  wp_enqueue_script(
    'tenfold-main',
    tenfold_asset_uri('js/main.js'),
    $main_deps,
    tenfold_asset_version('js/main.js'),
    true
  );

  wp_localize_script(
    'tenfold-main',
    'tenfoldData',
    array(
      'homeUrl' => home_url('/'),
      'contactCompleteUrl' => tenfold_url('contact-complete'),
    )
  );
}
add_action('wp_enqueue_scripts', 'tenfold_enqueue_assets');
