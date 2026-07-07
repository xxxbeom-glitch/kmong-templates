<?php

function hes_womens_clinic_register_notice() {
  register_post_type(
    'notice',
    array(
      'labels' => array(
        'name' => '공지',
        'singular_name' => '공지',
        'add_new_item' => '공지 추가',
        'edit_item' => '공지 수정',
        'view_item' => '공지 보기',
        'search_items' => '공지 검색',
        'not_found' => '공지가 없습니다.',
      ),
      'public' => true,
      'has_archive' => true,
      'rewrite' => array('slug' => 'notice'),
      'menu_icon' => 'dashicons-megaphone',
      'supports' => array('title', 'editor', 'excerpt'),
      'show_in_rest' => true,
    )
  );
}
add_action('init', 'hes_womens_clinic_register_notice');

function hes_womens_clinic_latest_notice_title() {
  $query = new WP_Query(
    array(
      'post_type' => 'notice',
      'posts_per_page' => 1,
      'orderby' => 'date',
      'order' => 'DESC',
      'post_status' => 'publish',
    )
  );

  if (!$query->have_posts()) {
    return '등록된 공지가 없습니다.';
  }

  $query->the_post();
  $title = get_the_title();
  wp_reset_postdata();

  return $title;
}
