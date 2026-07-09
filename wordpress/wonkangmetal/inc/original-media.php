<?php

/**
 * Mirror image paths copied under assets/images/mirror/.
 */

function wonkangmetal_mirror_img($relative_path) {
  $relative_path = ltrim(str_replace('\\', '/', (string) $relative_path), '/');

  return wonkangmetal_asset_uri('images/mirror/' . $relative_path);
}

function wonkangmetal_original_content_file($path) {
  $slug = str_replace('/', '-', trim((string) $path, '/'));

  return get_template_directory() . '/content/original/' . $slug . '.html';
}

function wonkangmetal_transform_mirror_html($html) {
  return preg_replace_callback(
    '/\{\{MIRROR_IMG:([^}]+)\}\}/',
    function ($matches) {
      return esc_url(wonkangmetal_mirror_img($matches[1]));
    },
    (string) $html
  );
}

function wonkangmetal_get_original_content_html($path) {
  $file = wonkangmetal_original_content_file($path);

  if (!is_readable($file)) {
    return '';
  }

  return wonkangmetal_transform_mirror_html(file_get_contents($file));
}

function wonkangmetal_has_original_content($path) {
  return is_readable(wonkangmetal_original_content_file($path));
}
