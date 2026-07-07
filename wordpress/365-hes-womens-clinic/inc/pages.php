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

  if (!empty($content['hero'])) {
    get_template_part('template-parts/sub-hero', null, $content['hero']);
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

    case 'schedule':
      if (!empty($content['intro'])) {
        get_template_part('template-parts/pages/clinic-body', null, array('intro' => $content['intro']));
      }
      get_template_part('template-parts/pages/schedule-body');
      break;

    case 'section-space':
      get_template_part('template-parts/section', 'space', array('hide_header' => true));
      break;

    case 'section-location':
      get_template_part('template-parts/section', 'location', array('hide_header' => true));
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
