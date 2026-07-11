<?php

function template_a_register_notice() {
  register_post_type(
    'notice',
    array(
      'labels' => array(
        'name' => '공지사항',
        'singular_name' => '공지사항',
        'add_new_item' => '공지사항 추가',
        'edit_item' => '공지사항 수정',
      ),
      'public' => true,
      'has_archive' => true,
      'rewrite' => array('slug' => 'notice', 'with_front' => false),
      'menu_icon' => 'dashicons-megaphone',
      'supports' => array('title', 'editor'),
      'show_in_rest' => true,
    )
  );
}
add_action('init', 'template_a_register_notice');

function template_a_flush_notice_rewrite() {
  template_a_register_notice();
  flush_rewrite_rules();
}
add_action('after_switch_theme', 'template_a_flush_notice_rewrite');
