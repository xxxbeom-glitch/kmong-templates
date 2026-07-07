<?php

require_once get_template_directory() . '/inc/assets.php';
require_once get_template_directory() . '/inc/notice.php';
require_once get_template_directory() . '/inc/page-registry.php';
require_once get_template_directory() . '/inc/content-womens-disease.php';
require_once get_template_directory() . '/inc/content-registry.php';
require_once get_template_directory() . '/inc/pages.php';

function hes_womens_clinic_setup() {
  add_theme_support('title-tag');
}
add_action('after_setup_theme', 'hes_womens_clinic_setup');

function hes_womens_clinic_enqueue_assets() {
  $theme = wp_get_theme();

  wp_enqueue_style(
    'suit',
    'https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css',
    array(),
    '1.0.0'
  );

  wp_enqueue_style(
    'hes-womens-clinic-style',
    get_stylesheet_uri(),
    array('suit'),
    $theme->get('Version')
  );

  wp_enqueue_script(
    'hes-womens-clinic-main',
    get_template_directory_uri() . '/assets/js/main.js',
    array('jquery'),
    $theme->get('Version'),
    true
  );
}
add_action('wp_enqueue_scripts', 'hes_womens_clinic_enqueue_assets');
