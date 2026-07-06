<?php

/**
 * Theme image manifest — Figma section key → assets/images path.
 */
function barun_dental_asset_map() {
  static $map = null;

  if ($map !== null) {
    return $map;
  }

  $base = trailingslashit(get_template_directory_uri()) . 'assets/images';

  $map = array(
    'logo-header' => $base . '/logos/header-logo.png',
    'logo-footer' => $base . '/logos/footer-logo.png',

    'hero-main' => $base . '/01-hero/hero-main.png',
    'hero-kv' => $base . '/04-process/patient-care.png',

    'philosophy-consultation' => $base . '/02-philosophy/consultation-room.png',

    'treatments-implant' => $base . '/03-treatments/implant-illustration.png',
    'treatments-featured' => $base . '/03-treatments/featured-card.png',

    'process-care' => $base . '/04-process/patient-care.png',

    'digital-tab-scanner' => $base . '/05-digital/tab-scanner.png',
    'digital-tab-imaging' => $base . '/05-digital/tab-imaging.png',
    'digital-tab-examination' => $base . '/05-digital/tab-examination.png',

    'space-treatment-room' => $base . '/06-space/gallery/treatment-room.png',
    'space-gallery-lobby' => $base . '/01-hero/hero-main.png',
    'space-gallery-treatment' => $base . '/06-space/gallery/treatment-room.png',
    'space-gallery-xray' => $base . '/05-digital/tab-imaging.png',
    'space-gallery-consultation' => $base . '/02-philosophy/consultation-room.png',
    'space-smile-01' => $base . '/06-space/gallery/smile-01.jpg',
    'space-smile-02' => $base . '/06-space/gallery/smile-02.jpg',
    'space-smile-03' => $base . '/06-space/gallery/smile-03.jpg',
    'space-smile-04' => $base . '/06-space/gallery/smile-04.jpg',
  );

  return $map;
}

function barun_dental_asset_uri($key) {
  $map = barun_dental_asset_map();
  return isset($map[$key]) ? $map[$key] : '';
}

function barun_dental_asset_path($key) {
  $uri = barun_dental_asset_uri($key);

  if ($uri === '') {
    return '';
  }

  $theme_uri = trailingslashit(get_template_directory_uri());
  $theme_dir = trailingslashit(get_template_directory());

  if (strpos($uri, $theme_uri) !== 0) {
    return '';
  }

  return $theme_dir . ltrim(substr($uri, strlen($theme_uri)), '/');
}

function barun_dental_digital_features() {
  return array(
    array(
      'id' => 'scanner',
      'num' => '01',
      'title' => '디지털 구강스캐너',
      'desc' => '치아와 구강 상태를 입체적으로 확인합니다.',
      'image' => 'digital-tab-scanner',
    ),
    array(
      'id' => 'imaging',
      'num' => '02',
      'title' => '디지털 영상진단',
      'desc' => '육안으로 확인하기 어려운 부분까지 검사합니다.',
      'image' => 'digital-tab-imaging',
    ),
    array(
      'id' => 'monitor',
      'num' => '03',
      'title' => '상담 모니터 시스템',
      'desc' => '촬영 결과와 치료 계획을 화면으로 설명합니다.',
      'image' => 'digital-tab-examination',
    ),
    array(
      'id' => 'sterilization',
      'num' => '04',
      'title' => '독립 멸균 시스템',
      'desc' => '진료 기구의 세척·소독·보관 과정을 분리합니다.',
      'image' => 'space-treatment-room',
    ),
  );
}

function barun_dental_space_gallery() {
  return array(
    array(
      'eyebrow' => 'Lounge',
      'title' => '대기실',
      'image' => 'space-gallery-lobby',
    ),
    array(
      'eyebrow' => 'Dental Room',
      'title' => '진료실',
      'image' => 'space-gallery-treatment',
    ),
    array(
      'eyebrow' => 'Dental X-ray Room',
      'title' => '엑스레이실',
      'image' => 'space-gallery-xray',
    ),
    array(
      'eyebrow' => 'Consultation Room',
      'title' => '상담실',
      'image' => 'space-gallery-consultation',
    ),
  );
}

/**
 * Preset button-text-slide-hover — duplicate label track markup.
 */
function barun_dental_button_slide($label) {
  $text = esc_html($label);

  return '<span class="btn__label"><span class="btn__track">'
    . '<span class="btn__text" aria-hidden="true">' . $text . '</span>'
    . '<span class="btn__text">' . $text . '</span>'
    . '</span></span>';
}
