<?php

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Theme home URL helper.
 */
function rathon_url($path = '') {
  $path = ltrim((string) $path, '/');
  return $path === '' ? home_url('/') : home_url('/' . $path . '/');
}

/**
 * Escaped theme asset URI.
 */
function rathon_asset($path) {
  return esc_url(trailingslashit(get_template_directory_uri()) . 'assets/' . ltrim($path, '/'));
}
