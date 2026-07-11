<?php

require_once get_template_directory() . '/inc/page-registry.php';

function template_a_get_page_path($post = null) {
  $post = $post ?: get_queried_object();
  if (!$post || empty($post->post_name)) {
    return '';
  }

  $segments = array($post->post_name);
  $parent_id = (int) $post->post_parent;
  while ($parent_id) {
    $parent = get_post($parent_id);
    if (!$parent) {
      break;
    }
    array_unshift($segments, $parent->post_name);
    $parent_id = (int) $parent->post_parent;
  }

  return implode('/', $segments);
}

function template_a_ensure_pages() {
  $registry = template_a_page_registry();
  $paths = array_keys($registry);
  usort($paths, function ($a, $b) {
    return template_a_page_depth($a) <=> template_a_page_depth($b);
  });

  $changed = false;
  foreach ($paths as $page_path) {
    if (get_page_by_path($page_path)) {
      continue;
    }

    $parent_id = 0;
    if (strpos($page_path, '/') !== false) {
      $parent_path = substr($page_path, 0, strrpos($page_path, '/'));
      $parent = get_page_by_path($parent_path);
      $parent_id = $parent ? (int) $parent->ID : 0;
    }

    $result = wp_insert_post(
      array(
        'post_title' => $registry[$page_path],
        'post_name' => basename($page_path),
        'post_parent' => $parent_id,
        'post_status' => 'publish',
        'post_type' => 'page',
      ),
      true
    );

    if (!is_wp_error($result)) {
      $changed = true;
    }
  }

  if ($changed) {
    flush_rewrite_rules(false);
  }
}
add_action('init', 'template_a_ensure_pages', 20);

function template_a_redirect_parent_pages() {
  if (is_page('about')) {
    wp_safe_redirect(home_url('/about/greeting/'), 301);
    exit;
  }
  if (is_page('service')) {
    wp_safe_redirect(home_url('/service/solution/'), 301);
    exit;
  }
}
add_action('template_redirect', 'template_a_redirect_parent_pages');
