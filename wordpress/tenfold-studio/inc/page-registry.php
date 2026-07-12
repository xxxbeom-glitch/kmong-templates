<?php

if (!defined('ABSPATH')) {
  exit;
}

/**
 * @return array<string, string> path => title
 */
function tenfold_page_registry() {
  return array(
    'about' => '텐폴드 소개',
    'projects' => '프로젝트',
    'projects/365-green-dental' => '365 초록바른치과',
    'projects/nock-study-lounge' => 'NOCK Study Lounge',
    'projects/you-and-jin-pilates' => '유앤진 필라테스',
    'projects/hyundai-redesign' => '현대건설 웹사이트 리디자인',
    'projects/sk-hynix-redesign' => 'SK하이닉스 웹사이트 리디자인',
    'services' => '서비스',
    'services/standard' => '템플릿형 제작',
    'services/custom' => '커스텀형 제작',
    'contact' => '문의하기',
    'contact-complete' => '문의 완료',
    'privacy' => '개인정보처리방침',
  );
}

/**
 * @param string $page_path
 * @return int
 */
function tenfold_page_depth($page_path) {
  return substr_count($page_path, '/');
}
