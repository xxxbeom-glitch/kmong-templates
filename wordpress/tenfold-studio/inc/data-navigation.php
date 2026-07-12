<?php

if (!defined('ABSPATH')) {
  exit;
}

/**
 * @return array<int, array{key:string,label:string,href:string,index:string}>
 */
function tenfold_nav_items() {
  return array(
    array(
      'key' => 'about',
      'label' => '텐폴드 소개',
      'href' => tenfold_url('about'),
      'index' => '01',
    ),
    array(
      'key' => 'projects',
      'label' => '프로젝트',
      'href' => tenfold_url('projects'),
      'index' => '02',
    ),
    array(
      'key' => 'services',
      'label' => '서비스',
      'href' => tenfold_url('services'),
      'index' => '03',
    ),
    array(
      'key' => 'contact',
      'label' => '문의하기',
      'href' => tenfold_url('contact'),
      'index' => '04',
    ),
  );
}
