<?php

function hes_womens_clinic_about_clinic_content() {
  return array(
    'eyebrow' => 'ABOUT',
    'title' => '필요한 순간,<br>편안하게 찾을 수 있는<br>여성의원',
    'body' => "365헤스여성의원은 여성질환을 중심으로\n검진, 임신·출산, 난임·가임력, 여성수술까지 진료합니다.\n\n증상과 검사 결과를 이해하기 쉽게 설명하고, 필요한 치료와 이후의 관리까지 이어서 안내합니다.",
    'features' => array(
      array(
        'title' => '365일 진료',
        'desc' => '평일뿐 아니라 주말과 공휴일에도 진료합니다.',
      ),
      array(
        'title' => '전원 여의사 3인',
        'desc' => '여성 의료진이 민감한 증상과 고민을 상담합니다.',
      ),
      array(
        'title' => '여성 건강 통합 진료',
        'desc' => '여성질환부터 임신·출산과 수술까지 이어서 진료합니다.',
      ),
    ),
  );
}

function hes_womens_clinic_about_doctors_content() {
  return array(
    'eyebrow' => 'MEDICAL TEAM',
    'title' => '의료진 소개',
    'doctors' => array(
      array(
        'name' => '한연준 원장',
        'role' => '산부인과 전문의',
        'specialty' => '여성질환·여성검진',
        'careers' => array(
          '서울대학교병원 산부인과 전공의 수료',
          '분당서울대학교병원 산부인과 임상강사',
          '前 인제대학교 일산백병원 진료교수',
          '도곡함춘 산부인과 진료과장',
        ),
        'days' => '월, 화, 수, 목, 금',
        'reverse' => false,
      ),
      array(
        'name' => '장원호 원장',
        'role' => '산부인과 전문의',
        'specialty' => '여성질환·여성검진',
        'careers' => array(
          '서울대학교병원 산부인과 전공의 수료',
          '분당서울대학교병원 산부인과 임상강사',
          '前 인제대학교 일산백병원 진료교수',
          '도곡함춘 산부인과 진료과장',
        ),
        'days' => '월, 화, 수, 목, 금, 토',
        'reverse' => true,
      ),
      array(
        'name' => '김지연 원장',
        'role' => '산부인과 전문의',
        'specialty' => '여성질환·여성검진',
        'careers' => array(
          '서울대학교병원 산부인과 전공의 수료',
          '분당서울대학교병원 산부인과 임상강사',
          '前 인제대학교 일산백병원 진료교수',
        ),
        'days' => '월, 수, 금',
        'reverse' => false,
      ),
    ),
  );
}

function hes_womens_clinic_schedule_table_content() {
  return array(
    'eyebrow' => 'SCHEDULE',
    'title' => '진료시간',
    'note' => '진료 일정은 변경될 수 있습니다. 방문 전 확인해 주세요.',
    'columns' => array('구분', '월', '화', '수', '목', '금', '토', '일'),
    'rows' => array(
      array(
        'label' => '진료시작',
        'values' => array('09:00', '09:00', '09:00', '09:00', '09:00', '09:00', '휴진'),
      ),
      array(
        'label' => '진료종료',
        'values' => array('18:00', '18:00', '18:00', '18:00', '18:00', '13:00', '휴진'),
      ),
      array(
        'label' => '점심시간',
        'values' => array('13:00-14:00', '13:00-14:00', '13:00-14:00', '13:00-14:00', '13:00-14:00', '-', '휴진'),
      ),
      array(
        'label' => '야간진료',
        'values' => array('-', '-', '-', '-', '-', '-', '휴진'),
      ),
    ),
  );
}
