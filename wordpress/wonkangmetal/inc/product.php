<?php

/**
 * Product CPT · product_category taxonomy · sample data (P2-1)
 */

function wonkangmetal_product_category_definitions() {
  return array(
    'pump-general'       => '일반 펌프부품',
    'pump-high-pressure' => '고압 펌프부품',
    'valve'              => '밸브부품',
    'industrial'         => '산업기계부품',
  );
}

function wonkangmetal_product_pump_category_slugs() {
  return array('pump-general', 'pump-high-pressure');
}

function wonkangmetal_is_pump_category($slug) {
  return in_array($slug, wonkangmetal_product_pump_category_slugs(), true);
}

function wonkangmetal_register_product_cpt() {
  register_post_type(
    'product',
    array(
      'labels' => array(
        'name'          => __('제품', 'wonkangmetal'),
        'singular_name' => __('제품', 'wonkangmetal'),
        'add_new_item'  => __('제품 추가', 'wonkangmetal'),
        'edit_item'     => __('제품 수정', 'wonkangmetal'),
        'view_item'     => __('제품 보기', 'wonkangmetal'),
        'search_items'  => __('제품 검색', 'wonkangmetal'),
        'not_found'     => __('제품이 없습니다.', 'wonkangmetal'),
        'all_items'     => __('전체 제품', 'wonkangmetal'),
      ),
      'public'       => true,
      'has_archive'  => true,
      'rewrite'      => array(
        'slug'       => 'product',
        'with_front' => false,
      ),
      'menu_icon'    => 'dashicons-hammer',
      'supports'     => array('title', 'editor', 'excerpt', 'thumbnail'),
      'show_in_rest' => true,
    )
  );
}
add_action('init', 'wonkangmetal_register_product_cpt');

function wonkangmetal_register_product_taxonomy() {
  register_taxonomy(
    'product_category',
    'product',
    array(
      'labels' => array(
        'name'          => __('제품 분류', 'wonkangmetal'),
        'singular_name' => __('제품 분류', 'wonkangmetal'),
        'search_items'  => __('분류 검색', 'wonkangmetal'),
        'all_items'     => __('전체 분류', 'wonkangmetal'),
        'edit_item'     => __('분류 수정', 'wonkangmetal'),
        'update_item'   => __('분류 업데이트', 'wonkangmetal'),
        'add_new_item'  => __('분류 추가', 'wonkangmetal'),
        'new_item_name' => __('새 분류명', 'wonkangmetal'),
        'menu_name'     => __('제품 분류', 'wonkangmetal'),
      ),
      'hierarchical'      => true,
      'public'            => true,
      'show_admin_column' => true,
      'rewrite'           => array(
        'slug'         => 'product/category',
        'with_front'   => false,
        'hierarchical' => true,
      ),
      'show_in_rest'      => true,
    )
  );
}
add_action('init', 'wonkangmetal_register_product_taxonomy');

function wonkangmetal_product_query_vars($vars) {
  $vars[] = 'part';
  return $vars;
}
add_filter('query_vars', 'wonkangmetal_product_query_vars');

function wonkangmetal_product_archive_query($query) {
  if (is_admin() || !$query->is_main_query()) {
    return;
  }

  if (!is_post_type_archive('product') && !is_tax('product_category')) {
    return;
  }

  $query->set('post_type', 'product');
  $query->set('posts_per_page', 12);

  $part = sanitize_key(get_query_var('part'));
  if ($part && in_array($part, array('casing', 'impeller'), true)) {
    $query->set(
      'meta_query',
      array(
        array(
          'key'   => 'part_type',
          'value' => $part,
        ),
      )
    );
  }
}
add_action('pre_get_posts', 'wonkangmetal_product_archive_query');

function wonkangmetal_register_product_meta() {
  register_post_meta(
    'product',
    'part_type',
    array(
      'type'              => 'string',
      'single'            => true,
      'show_in_rest'      => true,
      'sanitize_callback' => 'wonkangmetal_sanitize_part_type',
      'auth_callback'     => function () {
        return current_user_can('edit_posts');
      },
    )
  );
}
add_action('init', 'wonkangmetal_register_product_meta');

function wonkangmetal_sanitize_part_type($value) {
  $value = sanitize_key($value);
  return in_array($value, array('casing', 'impeller'), true) ? $value : '';
}

function wonkangmetal_product_archive_url() {
  return get_post_type_archive_link('product');
}

function wonkangmetal_product_category_url($slug, $part = '') {
  $term = get_term_by('slug', $slug, 'product_category');

  if (!$term || is_wp_error($term)) {
    return wonkangmetal_product_archive_url();
  }

  $url = get_term_link($term);

  if (is_wp_error($url)) {
    return wonkangmetal_product_archive_url();
  }

  if ($part && wonkangmetal_is_pump_category($slug)) {
    $url = add_query_arg('part', sanitize_key($part), $url);
  }

  return $url;
}

function wonkangmetal_product_sub_nav_items($active_slug = '') {
  $items = array();

  foreach (wonkangmetal_product_category_definitions() as $slug => $label) {
    $items[] = array(
      'label'  => $label,
      'url'    => wonkangmetal_product_category_url($slug),
      'active' => ($slug === $active_slug),
    );
  }

  return $items;
}

function wonkangmetal_product_part_filter_items($category_slug, $current_part = '') {
  if (!wonkangmetal_is_pump_category($category_slug)) {
    return array();
  }

  $base_url = wonkangmetal_product_category_url($category_slug);
  $parts    = array(
    'casing'   => 'Casing',
    'impeller' => 'Impeller',
  );
  $items    = array(
    array(
      'label'  => __('전체', 'wonkangmetal'),
      'url'    => $base_url,
      'active' => ($current_part === ''),
    ),
  );

  foreach ($parts as $slug => $label) {
    $items[] = array(
      'label'  => $label,
      'url'    => add_query_arg('part', $slug, $base_url),
      'active' => ($current_part === $slug),
    );
  }

  return $items;
}

function wonkangmetal_product_breadcrumb_items($tail = array()) {
  $items = array(
    array(
      'label' => __('HOME', 'wonkangmetal'),
      'url'   => home_url('/'),
    ),
    array(
      'label' => __('PRODUCT', 'wonkangmetal'),
      'url'   => wonkangmetal_product_archive_url(),
    ),
  );

  return array_merge($items, $tail);
}

function wonkangmetal_product_primary_category_slug($post_id = 0) {
  $post_id = $post_id ? $post_id : get_the_ID();
  $terms   = wp_get_post_terms($post_id, 'product_category', array('orderby' => 'term_id'));

  if (is_wp_error($terms) || empty($terms)) {
    return '';
  }

  return $terms[0]->slug;
}

function wonkangmetal_product_part_label($part_type) {
  $labels = array(
    'casing'   => 'Casing',
    'impeller' => 'Impeller',
  );

  return isset($labels[$part_type]) ? $labels[$part_type] : '';
}

function wonkangmetal_seed_product_terms() {
  foreach (wonkangmetal_product_category_definitions() as $slug => $name) {
    if (!term_exists($slug, 'product_category')) {
      wp_insert_term($name, 'product_category', array('slug' => $slug));
    }
  }
}

function wonkangmetal_seed_product_samples() {
  wonkangmetal_seed_product_terms();

  $samples = array(
    array(
      'slug'     => 'casing-pump-general',
      'title'    => 'Casing — 일반펌프 샘플',
      'excerpt'  => '일반 펌프부품 Casing 샘플 제품입니다.',
      'content'  => '<p>원강금속 일반 펌프부품 Casing 라인업 샘플 콘텐츠입니다. P2-5에서 원본 데이터로 교체 예정입니다.</p>',
      'category' => 'pump-general',
      'part'     => 'casing',
    ),
    array(
      'slug'     => 'impeller-pump-general',
      'title'    => 'Impeller — 일반펌프 샘플',
      'excerpt'  => '일반 펌프부품 Impeller 샘플 제품입니다.',
      'content'  => '<p>일반 펌프 Impeller 부품 샘플 상세 본문입니다.</p>',
      'category' => 'pump-general',
      'part'     => 'impeller',
    ),
    array(
      'slug'     => 'casing-pump-high-pressure',
      'title'    => 'Casing — 고압펌프 샘플',
      'excerpt'  => '고압 펌프부품 Casing 샘플 제품입니다.',
      'content'  => '<p>고압 펌프 Casing 부품 샘플 상세 본문입니다.</p>',
      'category' => 'pump-high-pressure',
      'part'     => 'casing',
    ),
    array(
      'slug'     => 'valve-part-sample',
      'title'    => '밸브부품 샘플',
      'excerpt'  => '밸브부품 라인업 샘플 제품입니다.',
      'content'  => '<p>밸브부품 샘플 상세 본문입니다.</p>',
      'category' => 'valve',
      'part'     => '',
    ),
    array(
      'slug'     => 'industrial-part-sample',
      'title'    => '산업기계부품 샘플',
      'excerpt'  => '산업기계부품 라인업 샘플 제품입니다.',
      'content'  => '<p>산업기계부품 샘플 상세 본문입니다.</p>',
      'category' => 'industrial',
      'part'     => '',
    ),
  );

  foreach ($samples as $sample) {
    $existing = get_page_by_path($sample['slug'], OBJECT, 'product');

    if ($existing) {
      continue;
    }

    $post_id = wp_insert_post(
      array(
        'post_type'    => 'product',
        'post_status'  => 'publish',
        'post_name'    => $sample['slug'],
        'post_title'   => $sample['title'],
        'post_excerpt' => $sample['excerpt'],
        'post_content' => $sample['content'],
      ),
      true
    );

    if (is_wp_error($post_id)) {
      continue;
    }

    wp_set_object_terms($post_id, $sample['category'], 'product_category', false);

    if (!empty($sample['part'])) {
      update_post_meta($post_id, 'part_type', $sample['part']);
    }
  }

  update_option('wonkangmetal_product_samples_seeded', '1', false);
}

function wonkangmetal_maybe_seed_product_samples() {
  if (get_option('wonkangmetal_product_samples_seeded')) {
    return;
  }

  wonkangmetal_seed_product_samples();
}
add_action('init', 'wonkangmetal_maybe_seed_product_samples', 20);

/**
 * CPT attachment rewrite (`product/{slug}/{file}`)가 `product/category/{term}`보다
 * 먼저 매칭되어 taxonomy 404가 나므로 category 규칙을 최상단으로 올린다.
 */
function wonkangmetal_product_prioritize_taxonomy_rewrites($rules) {
  $taxonomy_rules = array();
  $other_rules    = array();

  foreach ($rules as $pattern => $rewrite) {
    if (strpos($pattern, 'product/category/') === 0) {
      $taxonomy_rules[$pattern] = $rewrite;
    } else {
      $other_rules[$pattern] = $rewrite;
    }
  }

  if (empty($taxonomy_rules)) {
    return $rules;
  }

  return array_merge($taxonomy_rules, $other_rules);
}
add_filter('rewrite_rules_array', 'wonkangmetal_product_prioritize_taxonomy_rewrites');

function wonkangmetal_maybe_flush_product_rewrites() {
  if (get_option('wonkangmetal_product_rewrite_version') === '2') {
    return;
  }

  flush_rewrite_rules(false);
  update_option('wonkangmetal_product_rewrite_version', '2', false);
}
add_action('init', 'wonkangmetal_maybe_flush_product_rewrites', 99);

function wonkangmetal_product_flush_rewrites() {
  wonkangmetal_seed_product_samples();
  flush_rewrite_rules();
}
add_action('after_switch_theme', 'wonkangmetal_product_flush_rewrites');
