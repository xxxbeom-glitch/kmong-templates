<?php

/**
 * Subpage auto-registration for local preview / first deploy.
 */
function hes_womens_clinic_page_specs() {
  return array(
    'womens-disease' => '여성질환',
  );
}

function hes_womens_clinic_ensure_pages() {
  $specs = hes_womens_clinic_page_specs();
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
  if (!$post || empty($post->post_name)) {
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
 * Render custom page body by slug. Returns true when handled.
 */
function hes_womens_clinic_render_page_content($slug) {
  switch ($slug) {
    case 'womens-disease':
      get_template_part('template-parts/sub-hero', null, hes_womens_clinic_womens_disease_hero());
      get_template_part('template-parts/pages/womens-disease-content');
      return true;
    default:
      return false;
  }
}

function hes_womens_clinic_reset_pages_flag() {
  delete_option('hes_womens_clinic_pages_ready');
}
add_action('after_switch_theme', 'hes_womens_clinic_reset_pages_flag');

/**
 * Breadcrumb items: array of ['label' => '', 'url' => ''] · last item url optional.
 */
function hes_womens_clinic_breadcrumb_items($items) {
  $trail = array(
    array(
      'label' => '홈',
      'url' => home_url('/'),
    ),
  );

  return array_merge($trail, $items);
}
