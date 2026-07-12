<?php

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Current nav key for aria-current / is-active.
 *
 * @return string about|projects|services|contact|''
 */
function tenfold_current_nav_key() {
  if (is_front_page()) {
    return '';
  }
  if (is_404()) {
    return '';
  }
  $path = tenfold_get_page_path();
  if ($path === 'about' || strpos($path, 'about/') === 0) {
    return 'about';
  }
  if ($path === 'projects' || strpos($path, 'projects/') === 0) {
    return 'projects';
  }
  if ($path === 'services' || strpos($path, 'services/') === 0) {
    return 'services';
  }
  if ($path === 'contact' || $path === 'contact-complete') {
    return 'contact';
  }
  return '';
}

/**
 * @param string $path Relative path without leading slash.
 * @return string
 */
function tenfold_url($path = '') {
  $path = ltrim((string) $path, '/');
  if ($path === '') {
    return home_url('/');
  }
  return home_url('/' . trailingslashit($path));
}

/**
 * Load a template part with locals.
 *
 * @param string               $slug Template part path under template-parts/.
 * @param array<string, mixed> $args Variables.
 */
function tenfold_part($slug, $args = array()) {
  $path = get_template_directory() . '/template-parts/' . ltrim($slug, '/') . '.php';
  if (!file_exists($path)) {
    return;
  }
  // phpcs:ignore WordPress.PHP.DontExtract.extract_extract -- scoped template locals
  extract($args, EXTR_SKIP);
  include $path;
}

/**
 * Kakao channel / open chat URL.
 * 실제 채널 주소가 정해지면 이 값을 바꾸거나 `tenfold_kakao_url` 필터로 덮어쓴다.
 *
 * @return string
 */
function tenfold_kakao_url() {
  $url = 'https://pf.kakao.com/';
  return apply_filters('tenfold_kakao_url', $url);
}
