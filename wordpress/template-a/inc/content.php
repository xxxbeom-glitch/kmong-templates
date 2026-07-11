<?php

require_once get_template_directory() . '/inc/content-defaults.php';

function template_a_content_all() {
  static $content = null;

  if ($content === null) {
    $content = template_a_content_defaults();
  }

  return $content;
}

function template_a_get_default($path, $default = null) {
  $value = template_a_content_all();

  foreach (explode('.', (string) $path) as $segment) {
    if (!is_array($value) || !array_key_exists($segment, $value)) {
      return $default;
    }
    $value = $value[$segment];
  }

  return $value;
}

function template_a_acf_map() {
  static $map = null;
  if ($map !== null) {
    return $map;
  }

  $map = array(
    'site.logo' => 'ta_logo',
    'site.header_cta' => 'ta_header_cta',
    'site.menu_open_label' => 'ta_menu_open_label',
    'site.nav_label' => 'ta_nav_label',
    'site.drawer_label' => 'ta_drawer_label',
    'site.footer.tagline_1' => 'ta_footer_tagline_1',
    'site.footer.tagline_2_prefix' => 'ta_footer_tagline_2_prefix',
    'site.footer.tagline_2_accent' => 'ta_footer_tagline_2_accent',
    'site.footer.cta' => 'ta_footer_cta',
    'site.footer.privacy_label' => 'ta_footer_privacy_label',
    'site.footer.copyright' => 'ta_footer_copyright',
    'site.quick_consult.aria_label' => 'ta_quick_aria_label',
    'site.quick_consult.title' => 'ta_quick_title',
    'site.quick_consult.privacy' => 'ta_quick_privacy',
    'site.quick_consult.name_label' => 'ta_quick_name_label',
    'site.quick_consult.name_placeholder' => 'ta_quick_name_placeholder',
    'site.quick_consult.phone_label' => 'ta_quick_phone_label',
    'site.quick_consult.phone_placeholder' => 'ta_quick_phone_placeholder',
    'site.quick_consult.message_label' => 'ta_quick_message_label',
    'site.quick_consult.message_placeholder' => 'ta_quick_message_placeholder',
    'site.quick_consult.submit' => 'ta_quick_submit',
    'site.top_button_label' => 'ta_top_button_label',
    'home.hero.title' => 'ta_home_hero_title',
    'home.hero.lead' => 'ta_home_hero_lead',
    'home.hero.progress_label' => 'ta_home_hero_progress_label',
    'home.intro.aria_label' => 'ta_home_intro_aria_label',
    'home.features.title' => 'ta_home_features_title',
    'home.features.list_label' => 'ta_home_features_list_label',
    'home.services.title' => 'ta_home_services_title',
    'home.reviews.title' => 'ta_home_reviews_title',
    'home.reviews.top_label' => 'ta_home_reviews_top_label',
    'home.reviews.bottom_label' => 'ta_home_reviews_bottom_label',
    'home.faq.title' => 'ta_home_faq_title',
    'home.cta.image' => 'ta_home_cta_image',
    'home.cta.title' => 'ta_home_cta_title',
    'home.cta.button' => 'ta_home_cta_button',
  );

  $gnb_item_counts = array(3, 3, 2, 2);
  foreach ($gnb_item_counts as $menu_index => $item_count) {
    $field_index = $menu_index + 1;
    $map['site.gnb.' . $menu_index . '.label'] = 'ta_gnb_' . $field_index;
    for ($item_index = 0; $item_index < $item_count; $item_index++) {
      $map['site.gnb.' . $menu_index . '.items.' . $item_index . '.label'] = 'ta_gnb_' . $field_index . '_' . ($item_index + 1);
    }
  }

  for ($index = 0; $index < 6; $index++) {
    $field_index = $index + 1;
    $map['site.footer.company_fields.' . $index . '.label'] = 'ta_company_' . $field_index . '_label';
    $map['site.footer.company_fields.' . $index . '.value'] = 'ta_company_' . $field_index . '_value';
  }
  for ($index = 0; $index < 3; $index++) {
    $map['home.hero.slides.' . $index . '.image'] = 'ta_home_hero_slide_' . ($index + 1);
  }
  for ($index = 0; $index < 2; $index++) {
    $map['home.intro.lines.' . $index . '.text'] = 'ta_home_intro_line_' . ($index + 1);
  }
  for ($index = 0; $index < 4; $index++) {
    $field_index = $index + 1;
    $map['home.features.items.' . $index . '.image'] = 'ta_home_feature_' . $field_index . '_image';
    $map['home.features.items.' . $index . '.title'] = 'ta_home_feature_' . $field_index . '_title';
    $map['home.features.items.' . $index . '.body'] = 'ta_home_feature_' . $field_index . '_body';
    $map['home.services.stats.' . $index . '.value'] = 'ta_home_stat_' . $field_index . '_value';
    $map['home.services.stats.' . $index . '.unit'] = 'ta_home_stat_' . $field_index . '_unit';
    $map['home.services.stats.' . $index . '.label'] = 'ta_home_stat_' . $field_index . '_label';
  }
  for ($index = 0; $index < 20; $index++) {
    $field_index = $index + 1;
    $map['home.reviews.items.' . $index . '.title'] = 'ta_home_review_' . $field_index . '_title';
    $map['home.reviews.items.' . $index . '.body'] = 'ta_home_review_' . $field_index . '_body';
    $map['home.reviews.items.' . $index . '.author'] = 'ta_home_review_' . $field_index . '_author';
  }
  for ($index = 0; $index < 5; $index++) {
    $field_index = $index + 1;
    $map['home.faq.items.' . $index . '.question'] = 'ta_home_faq_' . $field_index . '_question';
    $map['home.faq.items.' . $index . '.answer'] = 'ta_home_faq_' . $field_index . '_answer';
  }

  return $map;
}

function template_a_acf_post_id($path) {
  if (strpos($path, 'site.') === 0) {
    return function_exists('template_a_acf_settings_id') ? template_a_acf_settings_id() : 0;
  }
  if (strpos($path, 'home.') === 0) {
    $front_page_id = (int) get_option('page_on_front');
    return $front_page_id ?: get_queried_object_id();
  }
  return 0;
}

function template_a_acf_value($path, $default) {
  if (!function_exists('get_field')) {
    return $default;
  }

  $map = template_a_acf_map();
  if (isset($map[$path])) {
    $post_id = template_a_acf_post_id($path);
    if (!$post_id) {
      return $default;
    }
    $value = get_field($map[$path], $post_id);
    return $value === false || $value === null || $value === '' ? $default : $value;
  }

  if (!is_array($default)) {
    return $default;
  }

  foreach ($default as $key => $value) {
    $default[$key] = template_a_acf_value($path . '.' . $key, $value);
  }
  return $default;
}

function template_a_get($path, $default = null) {
  $value = template_a_get_default($path, $default);
  return template_a_acf_value((string) $path, $value);
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

function template_a_sub_hero() {
  $page_path = function_exists('template_a_get_page_path') ? template_a_get_page_path() : '';
  $default_paths = array(
    'about/greeting' => 'about.greeting.hero',
    'about/ceo' => 'about.ceo.hero',
    'about/directions' => 'about.directions.hero',
    'service/solution' => 'service.solution.hero',
    'service/process' => 'service.process.hero',
    'service/portfolio' => 'service.portfolio.hero',
    'business' => 'business.hero',
    'contact' => 'contact.hero',
  );
  $default_path = isset($default_paths[$page_path]) ? $default_paths[$page_path] : '';
  $page_id = get_queried_object_id();
  $page = $page_id ? get_post($page_id) : null;
  $parent = $page && $page->post_parent ? get_post($page->post_parent) : null;
  $label_fallback = $default_path ? template_a_get_default($default_path . '.label', '') : ($parent ? get_the_title($parent) : get_the_title($page));
  $title_fallback = $default_path ? template_a_get_default($default_path . '.title', '') : get_the_title($page);
  $image_id_fallback = $default_path ? absint(template_a_get_default($default_path . '.image', 0)) : 0;

  $label = $label_fallback;
  $title = $title_fallback;
  $image_id = $image_id_fallback;
  if (function_exists('get_field') && $page_id) {
    $acf_label = get_field('ta_sub_hero_label', $page_id);
    $acf_title = get_field('ta_sub_hero_title', $page_id);
    $acf_image = get_field('ta_sub_hero_image', $page_id);
    $label = $acf_label === false || $acf_label === null || $acf_label === '' ? $label : $acf_label;
    $title = $acf_title === false || $acf_title === null || $acf_title === '' ? $title : $acf_title;
    $image_id = $acf_image ? absint($acf_image) : $image_id;
  }

  $image_url = $image_id ? wp_get_attachment_image_url($image_id, 'full') : '';
  return array(
    'label' => $label,
    'title' => $title,
    'image_url' => $image_url ?: template_a_asset_uri('images/hero-bg-02.jpg'),
  );
}
