<?php

/**
 * News CPT · news_type taxonomy · sample data (P2-2)
 */

function wonkangmetal_news_type_definitions() {
  return array(
    'news'   => 'NEWS',
    'notice' => 'NOTICE',
  );
}

function wonkangmetal_register_news_cpt() {
  register_post_type(
    'news',
    array(
      'labels' => array(
        'name'          => __('뉴스', 'wonkangmetal'),
        'singular_name' => __('뉴스', 'wonkangmetal'),
        'add_new_item'  => __('뉴스 추가', 'wonkangmetal'),
        'edit_item'     => __('뉴스 수정', 'wonkangmetal'),
        'view_item'     => __('뉴스 보기', 'wonkangmetal'),
        'search_items'  => __('뉴스 검색', 'wonkangmetal'),
        'not_found'     => __('뉴스가 없습니다.', 'wonkangmetal'),
        'all_items'     => __('전체 뉴스', 'wonkangmetal'),
      ),
      'public'       => true,
      'has_archive'  => true,
      'rewrite'      => array(
        'slug'       => 'news',
        'with_front' => false,
      ),
      'menu_icon'    => 'dashicons-megaphone',
      'supports'     => array('title', 'editor', 'excerpt', 'thumbnail'),
      'show_in_rest' => true,
    )
  );
}
add_action('init', 'wonkangmetal_register_news_cpt');

function wonkangmetal_register_news_taxonomy() {
  register_taxonomy(
    'news_type',
    'news',
    array(
      'labels' => array(
        'name'          => __('뉴스 분류', 'wonkangmetal'),
        'singular_name' => __('뉴스 분류', 'wonkangmetal'),
        'search_items'  => __('분류 검색', 'wonkangmetal'),
        'all_items'     => __('전체 분류', 'wonkangmetal'),
        'edit_item'     => __('분류 수정', 'wonkangmetal'),
        'update_item'   => __('분류 업데이트', 'wonkangmetal'),
        'add_new_item'  => __('분류 추가', 'wonkangmetal'),
        'new_item_name' => __('새 분류명', 'wonkangmetal'),
        'menu_name'     => __('뉴스 분류', 'wonkangmetal'),
      ),
      'hierarchical'      => false,
      'public'            => true,
      'show_admin_column' => true,
      'rewrite'           => false,
      'show_in_rest'      => true,
    )
  );
}
add_action('init', 'wonkangmetal_register_news_taxonomy');

function wonkangmetal_news_query_vars($vars) {
  $vars[] = 'type';
  return $vars;
}
add_filter('query_vars', 'wonkangmetal_news_query_vars');

function wonkangmetal_news_archive_query($query) {
  if (is_admin() || !$query->is_main_query()) {
    return;
  }

  if (!is_post_type_archive('news')) {
    return;
  }

  $query->set('post_type', 'news');
  $query->set('posts_per_page', 12);

  $type = sanitize_key(get_query_var('type'));
  if ($type && array_key_exists($type, wonkangmetal_news_type_definitions())) {
    $query->set(
      'tax_query',
      array(
        array(
          'taxonomy' => 'news_type',
          'field'    => 'slug',
          'terms'    => $type,
        ),
      )
    );
  }
}
add_action('pre_get_posts', 'wonkangmetal_news_archive_query');

function wonkangmetal_register_news_meta() {
  register_post_meta(
    'news',
    'external_url',
    array(
      'type'              => 'string',
      'single'            => true,
      'show_in_rest'      => true,
      'sanitize_callback' => 'esc_url_raw',
      'auth_callback'     => function () {
        return current_user_can('edit_posts');
      },
    )
  );
}
add_action('init', 'wonkangmetal_register_news_meta');

function wonkangmetal_news_archive_url($type = '') {
  $url = get_post_type_archive_link('news');

  if (!$url) {
    return home_url('/news/');
  }

  $type = sanitize_key($type);
  if ($type && array_key_exists($type, wonkangmetal_news_type_definitions())) {
    $url = add_query_arg('type', $type, $url);
  }

  return $url;
}

function wonkangmetal_news_type_filter_items($current_type = '') {
  $current_type = sanitize_key($current_type);
  $items        = array(
    array(
      'label'  => __('전체', 'wonkangmetal'),
      'url'    => wonkangmetal_news_archive_url(),
      'active' => ($current_type === ''),
    ),
  );

  foreach (wonkangmetal_news_type_definitions() as $slug => $label) {
    $items[] = array(
      'label'  => $label,
      'url'    => wonkangmetal_news_archive_url($slug),
      'active' => ($current_type === $slug),
    );
  }

  return $items;
}

function wonkangmetal_news_breadcrumb_items($tail = array()) {
  $items = array(
    array(
      'label' => __('HOME', 'wonkangmetal'),
      'url'   => home_url('/'),
    ),
    array(
      'label' => __('NEWS', 'wonkangmetal'),
      'url'   => wonkangmetal_news_archive_url(),
    ),
  );

  return array_merge($items, $tail);
}

function wonkangmetal_news_primary_type_slug($post_id = 0) {
  $post_id = $post_id ? $post_id : get_the_ID();
  $terms   = wp_get_post_terms($post_id, 'news_type', array('orderby' => 'term_id'));

  if (is_wp_error($terms) || empty($terms)) {
    return '';
  }

  return $terms[0]->slug;
}

function wonkangmetal_news_type_label($type_slug) {
  $definitions = wonkangmetal_news_type_definitions();

  return isset($definitions[$type_slug]) ? $definitions[$type_slug] : '';
}

function wonkangmetal_news_item_is_external($post_id = 0) {
  $post_id = $post_id ? $post_id : get_the_ID();
  $url     = get_post_meta($post_id, 'external_url', true);

  return !empty($url);
}

function wonkangmetal_news_item_url($post_id = 0) {
  $post_id = $post_id ? $post_id : get_the_ID();

  if (wonkangmetal_news_item_is_external($post_id)) {
    return get_post_meta($post_id, 'external_url', true);
  }

  return get_permalink($post_id);
}

function wonkangmetal_get_home_news_query($count = 3) {
  $count = max(1, absint($count));

  return new WP_Query(
    array(
      'post_type'      => 'news',
      'post_status'    => 'publish',
      'posts_per_page' => $count,
      'orderby'        => 'date',
      'order'          => 'DESC',
      'no_found_rows'  => true,
    )
  );
}

function wonkangmetal_seed_news_terms() {
  foreach (wonkangmetal_news_type_definitions() as $slug => $name) {
    if (!term_exists($slug, 'news_type')) {
      wp_insert_term($name, 'news_type', array('slug' => $slug));
    }
  }
}

function wonkangmetal_seed_news_samples() {
  wonkangmetal_seed_news_terms();

  $samples = array(
    array(
      'slug'     => 'sample-notice-01',
      'title'    => '생산 일정 안내 샘플',
      'excerpt'  => '생산 일정 변경 안내 샘플 공지입니다.',
      'content'  => '<p>원강금속 생산 일정 안내 샘플 공지 본문입니다. P2-5에서 원본 데이터로 교체 예정입니다.</p>',
      'type'     => 'notice',
      'external' => '',
      'date'     => '2025-09-01 10:00:00',
    ),
    array(
      'slug'     => 'sample-news-01',
      'title'    => '제조 기술 업데이트 샘플',
      'excerpt'  => '제조 기술 업데이트 관련 뉴스 샘플입니다.',
      'content'  => '<p>제조 기술 업데이트 샘플 뉴스 상세 본문입니다.</p>',
      'type'     => 'news',
      'external' => '',
      'date'     => '2025-09-10 10:00:00',
    ),
    array(
      'slug'     => 'sample-news-02',
      'title'    => '글로벌 파트너십 소식 샘플',
      'excerpt'  => '글로벌 파트너십 관련 외부 링크 뉴스 샘플입니다.',
      'content'  => '<p>글로벌 파트너십 소식 샘플 본문입니다. 목록에서는 external_url로 연결됩니다.</p>',
      'type'     => 'news',
      'external' => 'https://example.com/wonkangmetal-partnership',
      'date'     => '2025-09-15 10:00:00',
    ),
  );

  foreach ($samples as $sample) {
    $existing = get_page_by_path($sample['slug'], OBJECT, 'news');

    if ($existing) {
      continue;
    }

    $post_id = wp_insert_post(
      array(
        'post_type'    => 'news',
        'post_status'  => 'publish',
        'post_name'    => $sample['slug'],
        'post_title'   => $sample['title'],
        'post_excerpt' => $sample['excerpt'],
        'post_content' => $sample['content'],
        'post_date'    => $sample['date'],
      ),
      true
    );

    if (is_wp_error($post_id)) {
      continue;
    }

    wp_set_object_terms($post_id, $sample['type'], 'news_type', false);

    if (!empty($sample['external'])) {
      update_post_meta($post_id, 'external_url', $sample['external']);
    }
  }

  update_option('wonkangmetal_news_samples_seeded', '1', false);
}

function wonkangmetal_maybe_seed_news_samples() {
  if (get_option('wonkangmetal_news_samples_seeded')) {
    return;
  }

  wonkangmetal_seed_news_samples();
}
add_action('init', 'wonkangmetal_maybe_seed_news_samples', 20);

function wonkangmetal_maybe_flush_news_rewrites() {
  if (get_option('wonkangmetal_news_rewrite_version') === '1') {
    return;
  }

  flush_rewrite_rules(false);
  update_option('wonkangmetal_news_rewrite_version', '1', false);
}
add_action('init', 'wonkangmetal_maybe_flush_news_rewrites', 99);

function wonkangmetal_news_flush_rewrites() {
  wonkangmetal_seed_news_samples();
  flush_rewrite_rules();
}
add_action('after_switch_theme', 'wonkangmetal_news_flush_rewrites');
