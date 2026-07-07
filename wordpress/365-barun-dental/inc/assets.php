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
  $icons = trailingslashit(get_template_directory_uri()) . 'assets';

  $map = array(
    'logo-header' => $base . '/logos/header-logo.png',
    'logo-footer' => $base . '/logos/footer-logo.png',

    'consultation-sub-hero' => $icons . '/sub hero.png',
    'icon-lock' => $icons . '/lock.png',
    'icon-list-lock' => $icons . '/list_lock.png',
    'icon-message-circle' => $icons . '/message-circle.png',
    'icon-clipboard-list' => $icons . '/clipboard-list.png',
    'icon-search' => $icons . '/search.png',
    'icon-chevron-down' => $icons . '/chevron-down.png',
    'icon-chevron-left' => $icons . '/chevron-left.png',
    'icon-chevron-right' => $icons . '/chevron-right.png',
    'icon-plus' => $icons . '/plus.png',
    'icon-x' => $icons . '/x.png',
    'icon-info' => $icons . '/info-icon.png',
    'consultation-sample-xray' => $icons . '/source/image.png',

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
 * GNB — Figma 583:54 + decision-log 2026-07-07
 * children 2개 이상만 드롭다운 · URL 미정 시 #
 */
function barun_dental_nav_menu() {
  return array(
    array(
      'label' => '병원소개',
      'href' => '#',
      'children' => array(
        array('label' => '병원소개의 특별함', 'href' => '#'),
        array('label' => '의료진 소개', 'href' => '#'),
        array('label' => '진료안내 및 오시는길', 'href' => '#'),
        array('label' => '감염차단시스템', 'href' => '#'),
      ),
    ),
    array(
      'label' => '임플란트',
      'href' => '#',
      'children' => array(
        array('label' => '일반 임플란트', 'href' => '#'),
        array('label' => '네비게이션 임플란트', 'href' => '#'),
        array('label' => '발치 후 즉시 임플란트', 'href' => '#'),
        array('label' => '고난이도 임플란트', 'href' => '#'),
        array('label' => '임플란트 틀니', 'href' => '#'),
        array('label' => '보험 임플란트', 'href' => '#'),
      ),
    ),
    array(
      'label' => '사랑니 발치',
      'href' => '#',
    ),
    array(
      'label' => '일반진료',
      'href' => '#',
      'children' => array(
        array('label' => '충치 치료', 'href' => '#'),
        array('label' => '신경 치료', 'href' => '#'),
        array('label' => '잇몸 치료', 'href' => '#'),
        array('label' => '틀니', 'href' => '#'),
      ),
    ),
    array(
      'label' => '턱관절 치료',
      'href' => '#',
    ),
    array(
      'label' => '소식',
      'href' => '#',
      'children' => array(
        array('label' => '공지사항', 'href' => '#'),
        array('label' => '블로그', 'href' => '#'),
      ),
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
