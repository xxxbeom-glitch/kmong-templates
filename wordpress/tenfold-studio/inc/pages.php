<?php

if (!defined('ABSPATH')) {
  exit;
}

/**
 * @param WP_Post|null $post
 * @return string
 */
function tenfold_get_page_path($post = null) {
  $post = $post ?: get_queried_object();
  if (!$post || empty($post->post_name) || !($post instanceof WP_Post)) {
    return '';
  }
  if ($post->post_type !== 'page') {
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

function tenfold_ensure_pages() {
  $registry = tenfold_page_registry();
  $paths = array_keys($registry);
  usort(
    $paths,
    function ($a, $b) {
      return tenfold_page_depth($a) <=> tenfold_page_depth($b);
    }
  );

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
add_action('init', 'tenfold_ensure_pages', 20);

/**
 * Map page path to template-parts content slug.
 *
 * @param string $path
 * @return string
 */
function tenfold_content_template_for_path($path) {
  $map = array(
    'about' => 'about/page',
    'projects' => 'projects/list',
    'projects/365-green-dental' => 'projects/detail',
    'projects/nock-study-lounge' => 'projects/detail',
    'projects/you-and-jin-pilates' => 'projects/detail',
    'projects/hyundai-redesign' => 'projects/detail',
    'projects/sk-hynix-redesign' => 'projects/detail',
    'services' => 'services/page',
    'services/standard' => 'services/detail',
    'services/custom' => 'services/detail',
    'contact' => 'contact/page',
    'contact-complete' => 'contact/complete',
    'privacy' => 'privacy/page',
  );
  return isset($map[$path]) ? $map[$path] : '';
}
