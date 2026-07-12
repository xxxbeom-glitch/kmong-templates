<?php

if (!defined('ABSPATH')) {
  exit;
}

/**
 * @return array<int, array{question:string,answer:string}>
 */
function tenfold_faqs() {
  return array(
    array(
      'question' => '제작 비용은 어떻게 결정되나요?',
      'answer' => '페이지 수, 디자인 범위와 필요한 기능에 따라 달라집니다. 필요한 범위를 먼저 정리한 뒤 견적을 안내합니다.',
    ),
    array(
      'question' => '제작 기간은 얼마나 걸리나요?',
      'answer' => '스탠다드 패키지는 최대 2주, 맞춤 제작은 최대 4주를 기준으로 합니다. 자료 준비와 프로젝트 범위에 따라 달라질 수 있습니다.',
    ),
    array(
      'question' => '완성 후 직접 수정할 수 있나요?',
      'answer' => '자주 변경되는 콘텐츠는 직접 관리할 수 있도록 구성할 수 있습니다. 관리 범위는 프로젝트에 맞게 정합니다.',
    ),
    array(
      'question' => '유지관리도 맡길 수 있나요?',
      'answer' => '콘텐츠 수정, 업데이트와 운영 관리는 필요한 범위에 따라 별도로 진행할 수 있습니다.',
    ),
    array(
      'question' => '검색 등록도 지원하나요?',
      'answer' => '네이버 서치어드바이저와 Google Search Console 등록, 사이트맵 제출과 기본 수집 상태 점검을 지원할 수 있습니다. 검색 순위 자체를 보장하지는 않습니다.',
    ),
  );
}

/**
 * Shared process steps (home / about / services).
 *
 * @return array<int, array{index:string,title:string,description:string}>
 */
function tenfold_process_steps() {
  return array(
    array(
      'index' => '01',
      'title' => '프로젝트 이해',
      'description' => '사업의 목적과 필요한 범위를 확인합니다.',
    ),
    array(
      'index' => '02',
      'title' => '구조 설계',
      'description' => '메뉴, 페이지와 콘텐츠의 우선순위를 정리합니다.',
    ),
    array(
      'index' => '03',
      'title' => 'UX·UI 디자인',
      'description' => '브랜드와 사용자 흐름에 맞는 화면을 디자인합니다.',
    ),
    array(
      'index' => '04',
      'title' => '웹사이트 구축',
      'description' => '반응형과 필요한 관리 기능을 적용합니다.',
    ),
    array(
      'index' => '05',
      'title' => '검수 및 오픈',
      'description' => '콘텐츠, 링크와 기능을 확인하고 사이트를 오픈합니다.',
    ),
  );
}
