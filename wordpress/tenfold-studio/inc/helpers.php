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

/**
 * Inline SVG from theme `assets/icons/{name}.svg` (copied from `_icons/`).
 *
 * @param string               $name Icon filename without .svg.
 * @param array<string, mixed> $args Optional: class, width, height.
 * @return string
 */
function tenfold_icon($name, $args = array()) {
  $name = preg_replace('/[^a-z0-9\-]/i', '', (string) $name);
  if ($name === '') {
    return '';
  }

  $path = get_template_directory() . '/assets/icons/' . $name . '.svg';
  if (!file_exists($path)) {
    return '';
  }

  $svg = file_get_contents($path);
  if ($svg === false || $svg === '') {
    return '';
  }

  $class = isset($args['class']) ? (string) $args['class'] : 'icon';
  $width = isset($args['width']) ? (string) $args['width'] : '';
  $height = isset($args['height']) ? (string) $args['height'] : '';

  $svg = preg_replace('/\s(stroke|fill)="(#000000|#000|black)"/i', ' $1="currentColor"', $svg);
  $svg = preg_replace('/<svg\b/', '<svg class="' . esc_attr($class) . '" focusable="false" aria-hidden="true"', $svg, 1);

  if ($width !== '') {
    if (preg_match('/\swidth="[^"]*"/', $svg)) {
      $svg = preg_replace('/\swidth="[^"]*"/', ' width="' . esc_attr($width) . '"', $svg, 1);
    } else {
      $svg = preg_replace('/<svg\b/', '<svg width="' . esc_attr($width) . '"', $svg, 1);
    }
  }

  if ($height !== '') {
    if (preg_match('/\sheight="[^"]*"/', $svg)) {
      $svg = preg_replace('/\sheight="[^"]*"/', ' height="' . esc_attr($height) . '"', $svg, 1);
    } else {
      $svg = preg_replace('/<svg\b/', '<svg height="' . esc_attr($height) . '"', $svg, 1);
    }
  }

  return $svg;
}
