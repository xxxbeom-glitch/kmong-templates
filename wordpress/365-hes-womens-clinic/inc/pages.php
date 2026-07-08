<?php

require_once get_template_directory() . '/inc/page-registry.php';

/**
 * WordPress 페이지 전체 경로 (about/clinic 등)
 */
function hes_womens_clinic_get_page_path($post = null) {
  if (!$post) {
    $post = get_queried_object();
  }
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

function hes_womens_clinic_page_specs() {
  return hes_womens_clinic_page_registry();
}

function hes_womens_clinic_ensure_pages() {
  $specs = hes_womens_clinic_page_specs();
  $paths = array_keys($specs);

  usort(
    $paths,
    function ($a, $b) {
      return hes_womens_clinic_page_depth($a) <=> hes_womens_clinic_page_depth($b);
    }
  );

  $changed = false;

  foreach ($paths as $path) {
    if (get_page_by_path($path)) {
      continue;
    }

    $parent_id = 0;
    if (strpos($path, '/') !== false) {
      $parent_path = substr($path, 0, strrpos($path, '/'));
      $parent = get_page_by_path($parent_path);
      if ($parent) {
        $parent_id = $parent->ID;
      }
    }

    $slug = basename($path);
    $result = wp_insert_post(
      array(
        'post_title' => $specs[$path],
        'post_name' => $slug,
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
add_action('init', 'hes_womens_clinic_ensure_pages', 20);

function hes_womens_clinic_prune_obsolete_pages() {
  $removed_paths = array('about/schedule', 'about/space', 'about/location');

  foreach ($removed_paths as $path) {
    $page = get_page_by_path($path);
    if ($page) {
      wp_trash_post($page->ID);
    }
  }
}
add_action('init', 'hes_womens_clinic_prune_obsolete_pages', 25);

function hes_womens_clinic_redirect_obsolete_paths() {
  if (is_admin()) {
    return;
  }

  $request_path = isset($_SERVER['REQUEST_URI']) ? wp_parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) : '';
  $request_path = trim((string) $request_path, '/');

  $home_path = trim((string) wp_parse_url(home_url('/'), PHP_URL_PATH), '/');
  if ($home_path && strpos($request_path, $home_path) === 0) {
    $request_path = trim(substr($request_path, strlen($home_path)), '/');
  }

  $redirects = array(
    'about/schedule' => 'about/info',
    'about/space' => 'about/info',
    'about/location' => 'about/info',
  );

  if (isset($redirects[$request_path])) {
    wp_safe_redirect(home_url('/' . $redirects[$request_path] . '/'), 301);
    exit;
  }
}
add_action('template_redirect', 'hes_womens_clinic_redirect_obsolete_paths', 1);

function hes_womens_clinic_page_template($template) {
  if (!is_page()) {
    return $template;
  }

  $post = get_queried_object();
  if (!$post || !empty($post->post_parent)) {
    return $template;
  }

  $custom = get_template_directory() . '/page-' . $post->post_name . '.php';
  if (file_exists($custom)) {
    return $custom;
  }

  return $template;
}
add_filter('template_include', 'hes_womens_clinic_page_template', 20);

/**
 * Render custom page body by full path. Returns true when handled.
 */
function hes_womens_clinic_render_page_content($path) {
  $content = hes_womens_clinic_get_page_content($path);
  if (!$content) {
    return false;
  }

  if (array_key_exists('hero', $content)) {
    $hero = hes_womens_clinic_merge_sub_hero($content['hero']);
    $hero['breadcrumb'] = hes_womens_clinic_build_sub_hero_breadcrumb($path);
    get_template_part('template-parts/sub-hero', null, $hero);
  }

  switch ($content['type']) {
    case 'clinic':
      get_template_part(
        'template-parts/pages/clinic-body',
        null,
        array(
          'intro' => isset($content['intro']) ? $content['intro'] : array(),
          'relate' => isset($content['relate']) ? $content['relate'] : null,
          'areas' => isset($content['areas']) ? $content['areas'] : null,
          'exams' => isset($content['exams']) ? $content['exams'] : null,
          'process' => isset($content['process']) ? $content['process'] : null,
        )
      );
      break;

    case 'about-clinic':
      get_template_part('template-parts/pages/about-clinic-body');
      break;

    case 'about-doctors':
      get_template_part('template-parts/pages/about-doctors-body');
      break;

    case 'about-info':
      get_template_part('template-parts/section', 'location');
      get_template_part('template-parts/pages/schedule-table-body');
      get_template_part('template-parts/section', 'space');
      break;

    case 'prose':
      get_template_part(
        'template-parts/pages/prose-body',
        null,
        array(
          'intro' => isset($content['intro']) ? $content['intro'] : array(),
          'sections' => isset($content['sections']) ? $content['sections'] : array(),
          'cta' => isset($content['cta']) ? $content['cta'] : null,
        )
      );
      break;

    case 'section-faq':
      get_template_part('template-parts/section', 'faq', array('hide_header' => true));
      break;

    case 'reservation':
      if (!empty($content['intro'])) {
        get_template_part('template-parts/pages/clinic-body', null, array('intro' => $content['intro']));
      }
      get_template_part('template-parts/pages/reservation-body');
      break;

    case 'notice-list':
      if (!empty($content['intro'])) {
        get_template_part('template-parts/pages/clinic-body', null, array('intro' => $content['intro']));
      }
      get_template_part('template-parts/pages/notice-list-body');
      break;

    default:
      return false;
  }

  return true;
}

function hes_womens_clinic_reset_pages_flag() {
  delete_option('hes_womens_clinic_pages_ready');
}
add_action('after_switch_theme', 'hes_womens_clinic_reset_pages_flag');

function hes_womens_clinic_breadcrumb_items($items) {
  $trail = array(
    array(
      'label' => '홈',
      'url' => home_url('/'),
    ),
  );

  return array_merge($trail, $items);
}
