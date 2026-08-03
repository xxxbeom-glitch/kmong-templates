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

/**
 * CTA label markup for button-text-slide-hover.
 *
 * @param string $text Already-translated label.
 */
function rathon_btn_slide_label($text) {
  $safe = esc_html((string) $text);
  return '<span class="btn__label"><span class="btn__track">'
    . '<span class="btn__text">' . $safe . '</span>'
    . '<span class="btn__text" aria-hidden="true">' . $safe . '</span>'
    . '</span></span>';
}
