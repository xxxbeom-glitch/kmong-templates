<?php

require_once get_template_directory() . '/inc/content-schema.php';

function template_a_content_admin_menu() {
  add_menu_page(
    'Template A 콘텐츠',
    'Template A 콘텐츠',
    'edit_theme_options',
    'template-a-content',
    'template_a_content_admin_page',
    'dashicons-edit',
    59
  );
}
add_action('admin_menu', 'template_a_content_admin_menu');

function template_a_content_admin_assets($hook) {
  if ($hook !== 'toplevel_page_template-a-content') {
    return;
  }

  wp_enqueue_media();
  wp_enqueue_style(
    'template-a-admin-content',
    template_a_asset_uri('css/admin-content.css'),
    array(),
    template_a_asset_version('css/admin-content.css')
  );
  wp_enqueue_script(
    'template-a-admin-content',
    template_a_asset_uri('js/admin-content.js'),
    array('jquery'),
    template_a_asset_version('js/admin-content.js'),
    true
  );
}
add_action('admin_enqueue_scripts', 'template_a_content_admin_assets');

function template_a_content_sanitize($value, $default, $key = '') {
  if (is_array($default)) {
    if (template_a_array_is_list($default)) {
      $clean = array();
      $sample = isset($default[0]) ? $default[0] : array();
      foreach (is_array($value) ? $value : array() as $row) {
        $clean[] = template_a_content_sanitize($row, $sample);
      }
      return $clean;
    }

    $clean = array();
    foreach ($default as $child_key => $child_default) {
      $child_value = is_array($value) && array_key_exists($child_key, $value)
        ? $value[$child_key]
        : $child_default;
      $clean[$child_key] = template_a_content_sanitize($child_value, $child_default, $child_key);
    }
    return $clean;
  }

  if ($key === 'image') {
    return absint($value);
  }

  if (is_string($default) && strpos($default, '<p>') !== false) {
    return wp_kses_post($value);
  }

  return is_string($default) && (strpos($default, "\n") !== false || strlen($default) > 160)
    ? sanitize_textarea_field($value)
    : sanitize_text_field($value);
}

function template_a_content_admin_save() {
  if (
    empty($_POST['template_a_content_action']) ||
    $_POST['template_a_content_action'] !== 'save'
  ) {
    return;
  }

  if (!current_user_can('edit_theme_options')) {
    wp_die(esc_html__('You are not allowed to edit theme options.', 'template-a'));
  }

  check_admin_referer('template_a_content_save');
  $schema = template_a_content_schema();
  $active_tab = isset($_POST['template_a_content_active_tab'])
    ? sanitize_key(wp_unslash($_POST['template_a_content_active_tab']))
    : '';
  if (!isset($schema[$active_tab])) {
    wp_die(esc_html__('Invalid content tab.', 'template-a'));
  }

  $submitted = isset($_POST['template_a_content'])
    ? wp_unslash($_POST['template_a_content'])
    : array();
  $defaults = template_a_content_defaults();
  $saved = get_option('template_a_content', array());
  $saved = is_array($saved) ? $saved : array();
  foreach ($schema[$active_tab]['fields'] as $root_field) {
    $root = $root_field['key'];
    $root_value = isset($submitted[$root]) ? $submitted[$root] : array();
    $saved[$root] = template_a_content_sanitize($root_value, $defaults[$root], $root);
  }
  update_option('template_a_content', $saved);

  wp_safe_redirect(add_query_arg(
    array('page' => 'template-a-content', 'updated' => '1'),
    admin_url('admin.php')
  ));
  exit;
}
add_action('admin_init', 'template_a_content_admin_save');

function template_a_content_input_name($path) {
  $segments = explode('.', $path);
  $name = 'template_a_content[' . array_shift($segments) . ']';
  foreach ($segments as $segment) {
    $name .= '[' . $segment . ']';
  }
  return $name;
}

function template_a_content_value_at($content, $path, $fallback = '') {
  foreach (explode('.', $path) as $segment) {
    if (!is_array($content) || !array_key_exists($segment, $content)) {
      return $fallback;
    }
    $content = $content[$segment];
  }
  return $content;
}

function template_a_content_render_field($field, $value, $path) {
  $type = $field['type'];
  $name = template_a_content_input_name($path);
  $id = 'template-a-' . sanitize_html_class(str_replace('.', '-', $path));

  if ($type === 'group') {
    echo '<fieldset class="template-a-content__group"><legend>' . esc_html($field['label']) . '</legend>';
    foreach ($field['fields'] as $child) {
      $child_value = is_array($value) && array_key_exists($child['key'], $value)
        ? $value[$child['key']]
        : '';
      template_a_content_render_field($child, $child_value, $path . '.' . $child['key']);
    }
    echo '</fieldset>';
    return;
  }

  if ($type === 'repeater') {
    $marker = '__INDEX_' . substr(md5($path), 0, 8) . '__';
    echo '<fieldset class="template-a-repeater" data-repeater data-index-marker="' . esc_attr($marker) . '"><legend>' . esc_html($field['label']) . '</legend>';
    echo '<div class="template-a-repeater__rows" data-repeater-rows>';
    foreach (is_array($value) ? array_values($value) : array() as $index => $row) {
      template_a_content_render_repeater_row($field, $row, $path, (string) $index);
    }
    echo '</div>';
    echo '<template data-repeater-template>';
    template_a_content_render_repeater_row($field, array(), $path, $marker);
    echo '</template>';
    echo '<button type="button" class="button" data-repeater-add>항목 추가</button>';
    echo '</fieldset>';
    return;
  }

  echo '<div class="template-a-content__field template-a-content__field--' . esc_attr($type) . '">';
  echo '<label for="' . esc_attr($id) . '">' . esc_html($field['label']) . '</label>';

  if ($type === 'image') {
    $attachment_id = absint($value);
    $preview = $attachment_id ? wp_get_attachment_image_url($attachment_id, 'medium') : '';
    echo '<div class="template-a-image-field" data-image-field>';
    echo '<div class="template-a-image-field__preview" data-image-preview>';
    if ($preview) {
      echo '<img src="' . esc_url($preview) . '" alt="">';
    }
    echo '</div>';
    echo '<input type="hidden" id="' . esc_attr($id) . '" name="' . esc_attr($name) . '" value="' . esc_attr($attachment_id) . '" data-image-id>';
    echo '<button type="button" class="button" data-image-select>선택</button> ';
    echo '<button type="button" class="button-link-delete" data-image-remove>제거</button>';
    echo '</div>';
  } elseif ($type === 'textarea' || $type === 'html') {
    echo '<textarea id="' . esc_attr($id) . '" name="' . esc_attr($name) . '" rows="' . ($type === 'html' ? '10' : '4') . '">' . esc_textarea($value) . '</textarea>';
    if ($type === 'html') {
      echo '<p class="description">문단(p), 줄바꿈(br), 강조(strong) 등 안전한 HTML을 사용할 수 있습니다.</p>';
    }
  } else {
    echo '<input type="text" id="' . esc_attr($id) . '" name="' . esc_attr($name) . '" value="' . esc_attr($value) . '">';
  }

  echo '</div>';
}

function template_a_content_render_repeater_row($field, $row, $path, $index) {
  echo '<div class="template-a-repeater__row" data-repeater-row>';
  echo '<div class="template-a-repeater__row-head"><strong>항목</strong><button type="button" class="button-link-delete" data-repeater-remove>삭제</button></div>';
  foreach ($field['fields'] as $child) {
    $value = is_array($row) && array_key_exists($child['key'], $row) ? $row[$child['key']] : '';
    template_a_content_render_field($child, $value, $path . '.' . $index . '.' . $child['key']);
  }
  echo '</div>';
}

function template_a_content_admin_page() {
  if (!current_user_can('edit_theme_options')) {
    return;
  }

  $schema = template_a_content_schema();
  $content = template_a_content_all();
  $active_tab = isset($_GET['tab']) && isset($schema[$_GET['tab']])
    ? sanitize_key($_GET['tab'])
    : 'common';

  echo '<div class="wrap template-a-content">';
  echo '<h1>Template A 콘텐츠</h1>';
  if (isset($_GET['updated'])) {
    echo '<div class="notice notice-success is-dismissible"><p>콘텐츠를 저장했습니다.</p></div>';
  }
  echo '<nav class="nav-tab-wrapper">';
  foreach ($schema as $tab_key => $tab) {
    $url = add_query_arg(array('page' => 'template-a-content', 'tab' => $tab_key), admin_url('admin.php'));
    echo '<a class="nav-tab ' . ($active_tab === $tab_key ? 'nav-tab-active' : '') . '" href="' . esc_url($url) . '">' . esc_html($tab['label']) . '</a>';
  }
  echo '</nav>';
  echo '<form method="post">';
  wp_nonce_field('template_a_content_save');
  echo '<input type="hidden" name="template_a_content_action" value="save">';
  echo '<input type="hidden" name="template_a_content_active_tab" value="' . esc_attr($active_tab) . '">';

  foreach ($schema as $tab_key => $tab) {
    echo '<section class="template-a-content__panel ' . ($active_tab === $tab_key ? 'is-active' : '') . '" data-content-panel="' . esc_attr($tab_key) . '">';
    if ($active_tab === $tab_key) {
      foreach ($tab['fields'] as $field) {
        $value = isset($content[$field['key']]) ? $content[$field['key']] : array();
        template_a_content_render_field($field, $value, $field['key']);
      }
    }
    echo '</section>';
  }

  submit_button('변경사항 저장');
  echo '</form></div>';
}
