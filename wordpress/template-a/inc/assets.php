<?php

function template_a_asset_uri($path = '') {
  $base = trailingslashit(get_template_directory_uri()) . 'assets/';
  return $base . ltrim($path, '/');
}

function template_a_asset_version($relative_path) {
  $file = get_template_directory() . '/assets/' . ltrim($relative_path, '/');
  return file_exists($file) ? (string) filemtime($file) : wp_get_theme()->get('Version');
}

function template_a_enqueue_assets() {
  wp_enqueue_style(
    'template-a-pretendard',
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css',
    array(),
    null
  );
  wp_enqueue_style(
    'template-a-main',
    template_a_asset_uri('css/style.css'),
    array('template-a-pretendard'),
    template_a_asset_version('css/style.css')
  );

  if (is_front_page()) {
    wp_enqueue_script('template-a-gsap', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js', array(), '3.12.5', true);
    wp_enqueue_script('template-a-scrolltrigger', 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js', array('template-a-gsap'), '3.12.5', true);
    $dependencies = array('jquery', 'template-a-scrolltrigger');
  } else {
    $dependencies = array('jquery');
  }

  wp_enqueue_script(
    'template-a-main',
    template_a_asset_uri('js/main.js'),
    $dependencies,
    template_a_asset_version('js/main.js'),
    true
  );
}
add_action('wp_enqueue_scripts', 'template_a_enqueue_assets');
