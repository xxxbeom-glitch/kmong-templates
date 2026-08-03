<?php
/**
 * Rathontech Redesign 01 — Gate 2 scaffold.
 */

if (!defined('ABSPATH')) {
  exit;
}

define('RATHON_THEME_VERSION', '0.2.0-gate2');

require_once get_template_directory() . '/inc/assets.php';
require_once get_template_directory() . '/inc/helpers.php';

function rathon_setup() {
  add_theme_support('title-tag');
  add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script', 'navigation-widgets'));
}
add_action('after_setup_theme', 'rathon_setup');

function rathon_body_classes($classes) {
  if (is_front_page()) {
    $classes[] = 'page-home';
    $classes[] = 'gate2-home';
  }
  if (is_page_template('page-templates/product-rathon-iam.php') || is_page('rathon-iam')) {
    $classes[] = 'page-product-iam';
    $classes[] = 'gate2-product-iam';
  }
  return array_values(array_unique($classes));
}
add_filter('body_class', 'rathon_body_classes');
