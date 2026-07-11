<?php

function template_a_content_label($key) {
  $labels = array(
    'site' => '공통 설정', 'home' => '홈', 'about' => '회사소개',
    'service' => '서비스', 'business' => '사업영역', 'contact' => '문의',
    'privacy' => '개인정보처리방침', 'notice' => '공지 UI',
    'hero' => '상단 비주얼', 'intro' => '소개', 'footer' => '푸터',
    'quick_consult' => '빠른 상담', 'gnb' => '메뉴', 'items' => '항목',
    'slides' => '슬라이드', 'features' => '특징', 'services' => '성과',
    'reviews' => '고객 후기', 'faq' => '자주 묻는 질문', 'cta' => '문의 배너',
    'insight' => '주요 소식', 'greeting' => '인사말', 'ceo' => 'CEO 메시지',
    'directions' => '오시는 길', 'solution' => '서비스 소개',
    'process' => '진행 프로세스', 'portfolio' => '제작 사례',
    'vision' => '핵심 기준', 'history' => '연혁', 'years' => '연도',
    'entries' => '연혁 항목', 'cards' => '카드', 'steps' => '단계',
    'stats' => '성과 수치', 'filters' => '필터', 'sections' => '본문 항목',
    'fields' => '입력 항목', 'company_fields' => '회사 정보',
    'paragraphs' => '본문 문단', 'transit' => '교통 안내',
    'image' => '이미지', 'title' => '제목', 'label' => '라벨',
    'body' => '본문', 'text' => '문구', 'lead' => '설명', 'watermark' => '워터마크',
    'summary' => '요약', 'points' => '목록', 'year' => '연도',
    'month' => '월', 'name' => '이름', 'placeholder' => '입력 안내',
    'author' => '작성자 표기', 'question' => '질문', 'answer' => '답변',
    'unit' => '단위', 'value' => '값', 'tag' => '분류',
    'more' => '더보기', 'empty' => '빈 목록 안내', 'button' => '버튼',
  );

  return isset($labels[$key]) ? $labels[$key] : str_replace('_', ' ', $key);
}

function template_a_content_field_schema($key, $value, $path) {
  $field = array(
    'key' => (string) $key,
    'path' => $path,
    'label' => template_a_content_label($key),
  );

  if (is_array($value)) {
    if (template_a_array_is_list($value)) {
      $field['type'] = 'repeater';
      $field['fields'] = array();
      $sample = isset($value[0]) && is_array($value[0]) ? $value[0] : array();
      foreach ($sample as $sub_key => $sub_value) {
        $field['fields'][] = template_a_content_field_schema(
          $sub_key,
          $sub_value,
          $path . '.__index__.' . $sub_key
        );
      }
      return $field;
    }

    $field['type'] = 'group';
    $field['fields'] = array();
    foreach ($value as $sub_key => $sub_value) {
      $field['fields'][] = template_a_content_field_schema(
        $sub_key,
        $sub_value,
        $path . '.' . $sub_key
      );
    }
    return $field;
  }

  if ($key === 'image') {
    $field['type'] = 'image';
  } elseif (is_string($value) && strpos($value, '<p>') !== false) {
    $field['type'] = 'html';
  } elseif (is_string($value) && (strpos($value, "\n") !== false || strlen($value) > 160)) {
    $field['type'] = 'textarea';
  } else {
    $field['type'] = 'text';
  }

  return $field;
}

function template_a_content_schema() {
  $defaults = template_a_content_defaults();
  $tabs = array(
    'common' => array('label' => '공통(헤더·푸터)', 'roots' => array('site')),
    'home' => array('label' => '홈', 'roots' => array('home')),
    'about' => array('label' => '회사소개', 'roots' => array('about')),
    'service' => array('label' => '서비스', 'roots' => array('service')),
    'business' => array('label' => '사업영역', 'roots' => array('business')),
    'contact' => array('label' => '문의·약관', 'roots' => array('contact', 'privacy')),
    'notice' => array('label' => '공지 UI', 'roots' => array('notice')),
  );

  foreach ($tabs as $tab_key => $tab) {
    $tabs[$tab_key]['fields'] = array();
    foreach ($tab['roots'] as $root) {
      $tabs[$tab_key]['fields'][] = template_a_content_field_schema(
        $root,
        $defaults[$root],
        $root
      );
    }
    unset($tabs[$tab_key]['roots']);
  }

  return $tabs;
}
