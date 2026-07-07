<?php

/**
 * Ensure consultation pages exist for local preview / first deploy.
 */
function barun_dental_consultation_page_specs() {
  return array(
    'consultation' => '온라인 상담',
    'consultation-detail' => '온라인 상담 상세',
    'consultation-write' => '온라인 상담 작성',
  );
}

function barun_dental_ensure_consultation_pages() {
  $specs = barun_dental_consultation_page_specs();
  $missing = false;

  foreach ($specs as $slug => $title) {
    if (!get_page_by_path($slug)) {
      $missing = true;
      break;
    }
  }

  if (!$missing && get_option('barun_dental_consultation_pages_ready')) {
    return;
  }

  $changed = false;

  foreach ($specs as $slug => $title) {
    if (get_page_by_path($slug)) {
      continue;
    }

    $result = wp_insert_post(
      array(
        'post_title' => $title,
        'post_name' => $slug,
        'post_status' => 'publish',
        'post_type' => 'page',
      ),
      true
    );

    if (!is_wp_error($result)) {
      $changed = true;
    }
  }

  if ($changed || $missing) {
    flush_rewrite_rules(false);
    update_option('barun_dental_consultation_pages_ready', 1, false);
  }
}
add_action('init', 'barun_dental_ensure_consultation_pages', 20);

function barun_dental_reset_consultation_pages_flag() {
  delete_option('barun_dental_consultation_pages_ready');
}
add_action('after_switch_theme', 'barun_dental_reset_consultation_pages_flag');
