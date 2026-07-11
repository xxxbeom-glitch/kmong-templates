<?php

require_once get_template_directory() . '/inc/assets.php';
require_once get_template_directory() . '/inc/content.php';
require_once get_template_directory() . '/inc/notice.php';
require_once get_template_directory() . '/inc/pages.php';
if (is_admin()) {
  require_once get_template_directory() . '/inc/admin-content.php';
}

function template_a_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
}
add_action('after_setup_theme', 'template_a_setup');

function template_a_body_classes($classes) {
  if (is_front_page()) {
    $classes[] = 'page-home';
  } elseif (is_post_type_archive('notice')) {
    $classes[] = 'page-news';
  } elseif (is_singular('notice')) {
    $classes[] = 'page-news-view';
  } elseif (is_page()) {
    $page_path = template_a_get_page_path();
    $map = array(
      'about/greeting' => 'page-about-greeting',
      'about/ceo' => 'page-about-ceo',
      'about/directions' => 'page-about-directions',
      'service/solution' => 'page-service-solution',
      'service/process' => 'page-service-process',
      'service/portfolio' => 'page-service-portfolio',
      'business' => 'page-service-list',
      'contact' => 'page-contact',
      'privacy' => 'page-privacy',
    );
    if (isset($map[$page_path])) {
      $classes[] = $map[$page_path];
    }
  }
  return array_values(array_unique($classes));
}
add_filter('body_class', 'template_a_body_classes');
