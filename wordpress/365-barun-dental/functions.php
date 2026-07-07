<?php

require_once get_template_directory() . '/inc/assets.php';
require_once get_template_directory() . '/inc/consultation.php';
require_once get_template_directory() . '/inc/consultation-pages.php';

function barun_dental_setup() {
  add_theme_support('title-tag');
}
add_action('after_setup_theme', 'barun_dental_setup');

function barun_dental_enqueue_assets() {
  $theme = wp_get_theme();

  wp_enqueue_style(
    'suit',
    'https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css',
    array(),
    '1.0.0'
  );

  wp_enqueue_style(
    'barun-dental-style',
    get_stylesheet_uri(),
    array('suit'),
    $theme->get('Version')
  );

  wp_enqueue_script(
    'barun-dental-main',
    get_template_directory_uri() . '/assets/js/main.js',
    array('jquery'),
    $theme->get('Version'),
    true
  );

  wp_localize_script(
    'barun-dental-main',
    'barunDentalAssets',
    array(
      'images' => barun_dental_asset_map(),
      'digitalFeatures' => barun_dental_digital_features(),
      'spaceGallery' => barun_dental_space_gallery(),
      'icons' => array(
        'icon-x' => barun_dental_asset_uri('icon-x'),
      ),
    )
  );
}
add_action('wp_enqueue_scripts', 'barun_dental_enqueue_assets');
