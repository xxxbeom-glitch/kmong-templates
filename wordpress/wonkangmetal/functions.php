<?php

require_once get_template_directory() . '/inc/assets.php';
require_once get_template_directory() . '/inc/original-media.php';
require_once get_template_directory() . '/inc/product.php';
require_once get_template_directory() . '/inc/news.php';
require_once get_template_directory() . '/inc/pages.php';
require_once get_template_directory() . '/inc/menus.php';
require_once get_template_directory() . '/inc/theme-data.php';

function wonkangmetal_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));

  register_nav_menus(
    array(
      'primary' => __('Primary Menu', 'wonkangmetal'),
      'footer'  => __('Footer Menu', 'wonkangmetal'),
    )
  );
}
add_action('after_setup_theme', 'wonkangmetal_setup');
