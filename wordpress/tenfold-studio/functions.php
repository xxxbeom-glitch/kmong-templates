<?php
/**
 * TENFOLD STUDIO theme bootstrap.
 */

if (!defined('ABSPATH')) {
  exit;
}

require_once get_template_directory() . '/inc/page-registry.php';
require_once get_template_directory() . '/inc/pages.php';
require_once get_template_directory() . '/inc/helpers.php';
require_once get_template_directory() . '/inc/data-navigation.php';
require_once get_template_directory() . '/inc/data-projects.php';
require_once get_template_directory() . '/inc/data-packages.php';
require_once get_template_directory() . '/inc/data-faqs.php';
require_once get_template_directory() . '/inc/assets.php';
require_once get_template_directory() . '/inc/seo.php';

function tenfold_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
}
add_action('after_setup_theme', 'tenfold_setup');

function tenfold_body_classes($classes) {
  if (is_front_page()) {
    $classes[] = 'page-home';
  } elseif (is_404()) {
    $classes[] = 'page-404';
  } elseif (is_page()) {
    $path = tenfold_get_page_path();
    $slug = $path ? str_replace('/', '-', $path) : '';
    if ($slug) {
      $classes[] = 'page-' . sanitize_html_class($slug);
    }
  }
  return array_values(array_unique($classes));
}
add_filter('body_class', 'tenfold_body_classes');
