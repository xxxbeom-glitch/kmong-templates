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

  wp_enqueue_script(
    'tenfold-main',
    tenfold_asset_uri('js/main.js'),
    array('jquery'),
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
