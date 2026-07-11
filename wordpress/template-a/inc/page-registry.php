<?php

function template_a_page_registry() {
  return array(
    'about' => '회사소개',
    'about/greeting' => '회사소개',
    'about/ceo' => 'CEO 메시지',
    'about/directions' => '오시는 길',
    'service' => '서비스',
    'service/solution' => '서비스 소개',
    'service/process' => '진행 프로세스',
    'service/portfolio' => '제작 사례',
    'business' => '사업영역',
    'contact' => '문의하기',
    'privacy' => '개인정보처리방침',
  );
}

function template_a_page_depth($page_path) {
  return substr_count($page_path, '/');
}
