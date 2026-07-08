<?php

function hes_womens_clinic_checkup_hero() {
  return array(
    'title' => '여성의 건강을<br>더 세심하게 바라봅니다',
    'desc' => '일상적인 여성질환부터 정기검진까지,<br>몸의 변화와 불편을 편안하게 상담합니다.',
  );
}

function hes_womens_clinic_checkup_overview() {
  return array(
    'eyebrow' => 'CHECKUP',
    'title' => '이런 경우 여성검진을<br>고려할 수 있습니다',
    'paragraphs' => array(
      '여성의 건강은 생애주기에 따라 세심한 관리가 필요합니다. 증상이 나타나기 전 정기적인 검진을 통해 자궁과 난소의 건강을 지키는 것이 무엇보다 중요합니다.',
      '365헤스여성의원은 개개인의 연령과 건강 상태에 맞춘 체계적인 검진 프로그램을 제공하여 여성의 일상을 건강하게 살핍니다.',
    ),
    'cases' => array(
      '정기적인 여성 건강검진이 필요한 경우',
      '자궁과 난소 상태를 확인하고 싶은 경우',
      '결혼이나 임신을 준비하는 경우',
      '연령에 맞는 검진이 궁금한 경우',
    ),
    'image' => 'checkup-overview',
  );
}

function hes_womens_clinic_checkup_programs() {
  return array(
    'eyebrow' => 'PROGRAMS',
    'title' => '맞춤 검진 프로그램',
    'items' => array(
      array(
        'num' => '01',
        'label' => '여성 기본검진',
        'desc' => '현재의 여성 건강 상태를 확인하는 기본검진',
        'image' => 'checkup-program-01',
      ),
      array(
        'num' => '02',
        'label' => '자궁경부암 검사',
        'desc' => '자궁경부 세포의 변화를 확인하는 검사',
        'image' => 'checkup-program-02',
      ),
      array(
        'num' => '03',
        'label' => '미혼 여성검진',
        'desc' => '증상과 성경험 여부를 고려한 검진',
        'image' => 'checkup-program-03',
      ),
      array(
        'num' => '04',
        'label' => '웨딩검진',
        'desc' => '결혼과 임신 계획 전 확인하는 검진',
        'image' => 'checkup-program-04',
      ),
      array(
        'num' => '05',
        'label' => '연령별 검진',
        'desc' => '생애주기와 건강 변화에 맞춘 검진',
        'image' => 'checkup-program-05',
      ),
    ),
  );
}

function hes_womens_clinic_checkup_process() {
  return array(
    'eyebrow' => 'PROCESS',
    'title' => '진료 진행 과정',
    'steps' => array(
      array(
        'num' => '01',
        'label' => '문진',
        'desc' => '방문 목적 및 기본 상태를 파악하는 초진 상담이 이루어집니다',
      ),
      array(
        'num' => '02',
        'label' => '검사',
        'desc' => '신체 검사 및 기기 검사를 통해 정확한 상태를 확인합니다',
      ),
      array(
        'num' => '03',
        'label' => '결과 확인',
        'desc' => '검사 결과를 분석하고 진단 내용을 상세히 설명합니다',
      ),
      array(
        'num' => '04',
        'label' => '필요 시 추가 진료',
        'desc' => '필요에 따라 추가 검사나 치료를 진행합니다',
      ),
    ),
  );
}
