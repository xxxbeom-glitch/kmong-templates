<?php

function template_a_acf_settings_id() {
  if (function_exists('acf_add_options_page')) {
    return 'option';
  }

  $page = get_page_by_path('site-settings', OBJECT, 'page');
  return $page ? (int) $page->ID : 0;
}

function template_a_acf_ensure_settings_page() {
  if (function_exists('acf_add_options_page') || !function_exists('acf_add_local_field_group')) {
    return;
  }

  $page = get_page_by_path('site-settings', OBJECT, 'page');
  if ($page) {
    if ($page->post_status !== 'publish') {
      wp_update_post(array('ID' => $page->ID, 'post_status' => 'publish'));
    }
    return;
  }

  wp_insert_post(
    array(
      'post_title' => '사이트 설정',
      'post_name' => 'site-settings',
      'post_status' => 'publish',
      'post_type' => 'page',
      'post_content' => '헤더와 푸터 콘텐츠는 이 페이지의 ACF 필드에서 수정합니다.',
    )
  );
}
add_action('init', 'template_a_acf_ensure_settings_page', 5);

function template_a_acf_field($name, $label, $type = 'text', $extra = array()) {
  return array_merge(
    array(
      'key' => 'field_' . $name,
      'label' => $label,
      'name' => $name,
      'type' => $type,
    ),
    $extra
  );
}

function template_a_acf_tab($name, $label) {
  return template_a_acf_field(
    'ta_tab_' . $name,
    $label,
    'tab',
    array('placement' => 'top', 'endpoint' => 0)
  );
}

function template_a_acf_add_text_fields(&$fields, $definitions) {
  foreach ($definitions as $name => $label) {
    $fields[] = template_a_acf_field($name, $label);
  }
}

function template_a_acf_header_footer_fields() {
  $fields = array(template_a_acf_tab('header', '헤더'));
  template_a_acf_add_text_fields(
    $fields,
    array(
      'ta_logo' => '로고 문구',
      'ta_gnb_1' => 'GNB 1차 - 회사소개',
      'ta_gnb_1_1' => 'GNB 2차 - 회사소개',
      'ta_gnb_1_2' => 'GNB 2차 - CEO 메시지',
      'ta_gnb_1_3' => 'GNB 2차 - 오시는 길',
      'ta_gnb_2' => 'GNB 1차 - 서비스',
      'ta_gnb_2_1' => 'GNB 2차 - 서비스 소개',
      'ta_gnb_2_2' => 'GNB 2차 - 진행 프로세스',
      'ta_gnb_2_3' => 'GNB 2차 - 제작 사례',
      'ta_gnb_3' => 'GNB 1차 - 사업영역',
      'ta_gnb_3_1' => 'GNB 2차 - 기업 홈페이지',
      'ta_gnb_3_2' => 'GNB 2차 - 브랜드 사이트',
      'ta_gnb_4' => 'GNB 1차 - 고객지원',
      'ta_gnb_4_1' => 'GNB 2차 - 주요 소식',
      'ta_gnb_4_2' => 'GNB 2차 - 문의하기',
      'ta_header_cta' => '헤더 문의 버튼',
      'ta_menu_open_label' => '모바일 메뉴 버튼 설명',
      'ta_nav_label' => '주요 메뉴 설명',
      'ta_drawer_label' => '전체 메뉴 설명',
    )
  );

  $fields[] = template_a_acf_tab('footer', '푸터');
  template_a_acf_add_text_fields(
    $fields,
    array(
      'ta_footer_tagline_1' => '푸터 문구 1',
      'ta_footer_tagline_2_prefix' => '푸터 문구 2 - 앞부분',
      'ta_footer_tagline_2_accent' => '푸터 문구 2 - 강조',
      'ta_footer_cta' => '푸터 문의 버튼',
    )
  );
  for ($index = 1; $index <= 6; $index++) {
    $fields[] = template_a_acf_field('ta_company_' . $index . '_label', '회사 정보 ' . $index . ' - 항목명');
    $fields[] = template_a_acf_field('ta_company_' . $index . '_value', '회사 정보 ' . $index . ' - 내용');
  }
  template_a_acf_add_text_fields(
    $fields,
    array(
      'ta_footer_privacy_label' => '개인정보 처리방침 라벨',
      'ta_footer_copyright' => '저작권 문구',
      'ta_top_button_label' => '상단 이동 버튼 설명',
    )
  );

  $fields[] = template_a_acf_tab('quick_consult', '홈 빠른 상담');
  template_a_acf_add_text_fields(
    $fields,
    array(
      'ta_quick_aria_label' => '빠른 상담 영역 설명',
      'ta_quick_title' => '빠른 상담 제목',
      'ta_quick_privacy' => '개인정보 동의 문구',
      'ta_quick_name_label' => '이름 항목명',
      'ta_quick_name_placeholder' => '이름 입력 안내',
      'ta_quick_phone_label' => '연락처 항목명',
      'ta_quick_phone_placeholder' => '연락처 입력 안내',
      'ta_quick_message_label' => '문의 내용 항목명',
      'ta_quick_message_placeholder' => '문의 내용 입력 안내',
      'ta_quick_submit' => '빠른 상담 버튼',
    )
  );

  return $fields;
}

function template_a_acf_home_fields() {
  $fields = array(template_a_acf_tab('home_hero', '히어로'));
  $fields[] = template_a_acf_field('ta_home_hero_title', '히어로 제목', 'textarea', array('rows' => 3, 'new_lines' => ''));
  $fields[] = template_a_acf_field('ta_home_hero_lead', '히어로 설명', 'textarea', array('rows' => 3, 'new_lines' => ''));
  $fields[] = template_a_acf_field('ta_home_hero_progress_label', '슬라이드 버튼 설명');
  for ($index = 1; $index <= 3; $index++) {
    $fields[] = template_a_acf_field(
      'ta_home_hero_slide_' . $index,
      '히어로 이미지 ' . $index,
      'image',
      array('return_format' => 'id', 'preview_size' => 'medium', 'library' => 'all')
    );
  }

  $fields[] = template_a_acf_tab('home_intro', '인트로');
  $fields[] = template_a_acf_field('ta_home_intro_aria_label', '인트로 영역 설명');
  for ($index = 1; $index <= 2; $index++) {
    $fields[] = template_a_acf_field('ta_home_intro_line_' . $index, '인트로 문구 ' . $index);
  }

  $fields[] = template_a_acf_tab('home_features', '특징');
  $fields[] = template_a_acf_field('ta_home_features_title', '특징 제목', 'textarea', array('rows' => 3, 'new_lines' => ''));
  $fields[] = template_a_acf_field('ta_home_features_list_label', '특징 목록 설명');
  for ($index = 1; $index <= 4; $index++) {
    $fields[] = template_a_acf_field('ta_home_feature_' . $index . '_image', '특징 ' . $index . ' - 이미지', 'image', array('return_format' => 'id', 'preview_size' => 'medium'));
    $fields[] = template_a_acf_field('ta_home_feature_' . $index . '_title', '특징 ' . $index . ' - 제목');
    $fields[] = template_a_acf_field('ta_home_feature_' . $index . '_body', '특징 ' . $index . ' - 설명', 'textarea', array('rows' => 3, 'new_lines' => ''));
  }

  $fields[] = template_a_acf_tab('home_services', '서비스 성과');
  $fields[] = template_a_acf_field('ta_home_services_title', '서비스 성과 제목');
  for ($index = 1; $index <= 4; $index++) {
    $fields[] = template_a_acf_field('ta_home_stat_' . $index . '_value', '성과 ' . $index . ' - 수치');
    $fields[] = template_a_acf_field('ta_home_stat_' . $index . '_unit', '성과 ' . $index . ' - 단위');
    $fields[] = template_a_acf_field('ta_home_stat_' . $index . '_label', '성과 ' . $index . ' - 설명');
  }

  $fields[] = template_a_acf_tab('home_reviews', '고객 후기');
  template_a_acf_add_text_fields(
    $fields,
    array(
      'ta_home_reviews_title' => '고객 후기 제목',
      'ta_home_reviews_top_label' => '후기 윗줄 설명',
      'ta_home_reviews_bottom_label' => '후기 아랫줄 설명',
    )
  );
  for ($index = 1; $index <= 20; $index++) {
    $fields[] = template_a_acf_field('ta_home_review_' . $index . '_title', '후기 ' . $index . ' - 제목');
    $fields[] = template_a_acf_field('ta_home_review_' . $index . '_body', '후기 ' . $index . ' - 내용', 'textarea', array('rows' => 3, 'new_lines' => ''));
    $fields[] = template_a_acf_field('ta_home_review_' . $index . '_author', '후기 ' . $index . ' - 작성자');
  }

  $fields[] = template_a_acf_tab('home_faq', '자주 묻는 질문');
  $fields[] = template_a_acf_field('ta_home_faq_title', 'FAQ 제목');
  for ($index = 1; $index <= 5; $index++) {
    $fields[] = template_a_acf_field('ta_home_faq_' . $index . '_question', 'FAQ ' . $index . ' - 질문');
    $fields[] = template_a_acf_field('ta_home_faq_' . $index . '_answer', 'FAQ ' . $index . ' - 답변', 'textarea', array('rows' => 4, 'new_lines' => ''));
  }

  $fields[] = template_a_acf_tab('home_cta', '문의 배너');
  $fields[] = template_a_acf_field('ta_home_cta_image', '문의 배너 이미지', 'image', array('return_format' => 'id', 'preview_size' => 'medium'));
  $fields[] = template_a_acf_field('ta_home_cta_title', '문의 배너 제목', 'textarea', array('rows' => 3, 'new_lines' => ''));
  $fields[] = template_a_acf_field('ta_home_cta_button', '문의 배너 버튼');

  return $fields;
}

function template_a_acf_register_fields() {
  if (!function_exists('acf_add_local_field_group')) {
    return;
  }

  template_a_acf_ensure_settings_page();

  $settings_locations = array();

  if (function_exists('acf_add_options_page')) {
    acf_add_options_page(
      array(
        'page_title' => 'Template A 설정',
        'menu_title' => 'Template A 설정',
        'menu_slug' => 'template-a-settings',
        'capability' => 'edit_theme_options',
        'redirect' => false,
        'icon_url' => 'dashicons-admin-customizer',
        'position' => 58,
      )
    );
    $settings_locations[] = array(array('param' => 'options_page', 'operator' => '==', 'value' => 'template-a-settings'));
  }

  $settings_id = (int) template_a_acf_settings_id();
  if ($settings_id > 0) {
    $settings_locations[] = array(array('param' => 'page', 'operator' => '==', 'value' => (string) $settings_id));
  }

  // 무료 ACF: 왼쪽 메뉴에서도 편집 (페이지 편집기에 칸이 안 보일 때 대비)
  // admin_menu는 acf/init 밖에서 등록 — 아래 template_a_acf_register_free_admin_menu 훅 참고

  if (!$settings_locations) {
    return;
  }

  acf_add_local_field_group(
    array(
      'key' => 'group_template_a_header_footer',
      'title' => '헤더·푸터',
      'fields' => template_a_acf_header_footer_fields(),
      'location' => $settings_locations,
      'menu_order' => 0,
      'position' => 'normal',
      'style' => 'default',
      'active' => true,
      'show_in_rest' => 1,
      'description' => '왼쪽 메뉴 Template A 설정, 또는 페이지 > 사이트 설정에서 수정합니다.',
    )
  );

  acf_add_local_field_group(
    array(
      'key' => 'group_template_a_home',
      'title' => '메인',
      'fields' => template_a_acf_home_fields(),
      'location' => array(array(array('param' => 'page_type', 'operator' => '==', 'value' => 'front_page'))),
      'menu_order' => 1,
      'position' => 'normal',
      'style' => 'default',
      'active' => true,
      'show_in_rest' => 1,
    )
  );

  $sub_hero_rules = array(
    array('param' => 'post_type', 'operator' => '==', 'value' => 'page'),
    array('param' => 'page_type', 'operator' => '!=', 'value' => 'front_page'),
  );
  if ($settings_id > 0) {
    $sub_hero_rules[] = array('param' => 'page', 'operator' => '!=', 'value' => (string) $settings_id);
  }

  acf_add_local_field_group(
    array(
      'key' => 'group_template_a_sub_hero',
      'title' => '서브히어로',
      'fields' => array(
        template_a_acf_field('ta_sub_hero_label', '상단 라벨'),
        template_a_acf_field('ta_sub_hero_title', '상단 제목', 'textarea', array('rows' => 3, 'new_lines' => '')),
        template_a_acf_field('ta_sub_hero_image', '배경 이미지', 'image', array('return_format' => 'id', 'preview_size' => 'medium')),
      ),
      'location' => array($sub_hero_rules),
      'menu_order' => 0,
      'position' => 'normal',
      'style' => 'default',
      'active' => true,
      'show_in_rest' => 1,
    )
  );
}
add_action('acf/init', 'template_a_acf_register_fields');

function template_a_acf_register_free_admin_menu() {
  if (function_exists('acf_add_options_page') || !function_exists('acf_add_local_field_group')) {
    return;
  }

  add_menu_page(
    'Template A 설정',
    'Template A 설정',
    'edit_theme_options',
    'template-a-settings',
    'template_a_acf_render_free_settings_page',
    'dashicons-admin-customizer',
    58
  );
}
add_action('admin_menu', 'template_a_acf_register_free_admin_menu');

function template_a_acf_render_free_settings_page() {
  if (!function_exists('acf_form')) {
    echo '<div class="wrap"><h1>Template A 설정</h1><p>ACF 플러그인을 활성화해 주세요.</p></div>';
    return;
  }

  $post_id = (int) template_a_acf_settings_id();
  if ($post_id <= 0) {
    template_a_acf_ensure_settings_page();
    $post_id = (int) template_a_acf_settings_id();
  }

  echo '<div class="wrap">';
  echo '<h1>Template A 설정</h1>';
  echo '<p>헤더·푸터 문구와 메뉴 이름을 여기서 수정한 뒤 저장하세요.</p>';

  if ($post_id <= 0) {
    echo '<div class="notice notice-error"><p>사이트 설정 페이지를 만들 수 없습니다. 페이지 목록에서 「사이트 설정」을 확인해 주세요.</p></div></div>';
    return;
  }

  acf_form(
    array(
      'post_id' => $post_id,
      'field_groups' => array('group_template_a_header_footer'),
      'submit_value' => '저장',
      'updated_message' => '저장되었습니다.',
      'html_submit_button' => '<input type="submit" class="button button-primary button-large" value="%s" />',
    )
  );
  echo '</div>';
}

function template_a_acf_free_form_head() {
  $page = isset($_GET['page']) ? sanitize_key(wp_unslash($_GET['page'])) : '';
  if ($page === 'template-a-settings' && function_exists('acf_form_head')) {
    acf_form_head();
  }
}
add_action('admin_init', 'template_a_acf_free_form_head');

function template_a_acf_hide_settings_page($query) {
  if (is_admin() || !$query->is_main_query()) {
    return;
  }
  if ($query->is_page('site-settings') && !current_user_can('edit_theme_options')) {
    $query->set_404();
    status_header(404);
  }
}
add_action('pre_get_posts', 'template_a_acf_hide_settings_page');

function template_a_acf_missing_notice() {
  if (!current_user_can('manage_options') || function_exists('acf_add_local_field_group')) {
    return;
  }
  echo '<div class="notice notice-warning"><p>' . esc_html__('Template A 콘텐츠 편집을 사용하려면 ACF 플러그인을 활성화하세요.', 'template-a') . '</p></div>';
}
add_action('admin_notices', 'template_a_acf_missing_notice');
