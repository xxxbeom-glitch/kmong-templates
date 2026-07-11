<?php

require_once get_template_directory() . '/inc/content-defaults.php';

function template_a_array_is_list($value) {
  if (!is_array($value)) {
    return false;
  }

  return array_keys($value) === range(0, count($value) - 1);
}

function template_a_content_merge($defaults, $saved) {
  if (!is_array($defaults) || !is_array($saved)) {
    return $saved;
  }

  if (template_a_array_is_list($defaults)) {
    return array_values($saved);
  }

  foreach ($saved as $key => $value) {
    if (array_key_exists($key, $defaults)) {
      $defaults[$key] = template_a_content_merge($defaults[$key], $value);
    } else {
      $defaults[$key] = $value;
    }
  }

  return $defaults;
}

function template_a_content_all() {
  static $content = null;

  if ($content === null) {
    $saved = get_option('template_a_content', array());
    $content = template_a_content_merge(
      template_a_content_defaults(),
      is_array($saved) ? $saved : array()
    );
  }

  return $content;
}

function template_a_get($path, $default = null) {
  $value = template_a_content_all();

  foreach (explode('.', (string) $path) as $segment) {
    if (!is_array($value) || !array_key_exists($segment, $value)) {
      return $default;
    }
    $value = $value[$segment];
  }

  return $value;
}

function template_a_img_url($path, $fallback_asset = '') {
  $attachment_id = absint(template_a_get($path, 0));
  if ($attachment_id) {
    $url = wp_get_attachment_image_url($attachment_id, 'full');
    if ($url) {
      return $url;
    }
  }

  return $fallback_asset ? template_a_asset_uri($fallback_asset) : '';
}

function template_a_img($path, $default_theme_rel = '') {
  return template_a_img_url($path, $default_theme_rel);
}

function template_a_text_br($path, $default = '') {
  $value = (string) template_a_get($path, $default);
  $value = preg_replace('/<br\s*\/?>/i', "\n", $value);
  return nl2br(esc_html($value), false);
}
