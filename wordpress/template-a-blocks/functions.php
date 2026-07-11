<?php

function template_a_blocks_setup() {
  add_theme_support('wp-block-styles');
  add_theme_support('editor-styles');
  add_editor_style('assets/css/style.css');
  add_theme_support('responsive-embeds');
  add_theme_support('post-thumbnails');
  add_theme_support('title-tag');
}
add_action('after_setup_theme', 'template_a_blocks_setup');

function template_a_blocks_enqueue_assets() {
  wp_enqueue_style(
    'template-a-blocks-pretendard',
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css',
    array(),
    null
  );

  $css = get_template_directory() . '/assets/css/style.css';
  wp_enqueue_style(
    'template-a-blocks-main',
    get_template_directory_uri() . '/assets/css/style.css',
    array('template-a-blocks-pretendard'),
    file_exists($css) ? (string) filemtime($css) : wp_get_theme()->get('Version')
  );

  if (is_front_page()) {
    wp_enqueue_script(
      'template-a-blocks-gsap',
      'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
      array(),
      '3.12.5',
      true
    );
    wp_enqueue_script(
      'template-a-blocks-scrolltrigger',
      'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js',
      array('template-a-blocks-gsap'),
      '3.12.5',
      true
    );
    $js = get_template_directory() . '/assets/js/main.js';
    wp_enqueue_script(
      'template-a-blocks-main',
      get_template_directory_uri() . '/assets/js/main.js',
      array('jquery', 'template-a-blocks-scrolltrigger'),
      file_exists($js) ? (string) filemtime($js) : wp_get_theme()->get('Version'),
      true
    );
  }
}
add_action('wp_enqueue_scripts', 'template_a_blocks_enqueue_assets');

function template_a_blocks_body_class($classes) {
  if (is_front_page()) {
    $classes[] = 'page-home';
  }
  return $classes;
}
add_filter('body_class', 'template_a_blocks_body_class');
