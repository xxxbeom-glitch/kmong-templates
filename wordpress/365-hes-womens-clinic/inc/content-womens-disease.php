<?php

function hes_womens_clinic_womens_disease_hero() {
  return array(
    'title' => '반복되는 불편을 참지 않도록<br>여성질환을 세심하게 확인합니다',
  );
}

/** 히어로 하단 인트로 (설계서 D01 보조문구) */
function hes_womens_clinic_womens_disease_intro() {
  return array(
    'text' => '질염, 방광염, 생리불순, 부정출혈, 자궁·난소질환까지 다양한 원인으로 불편이 반복될 수 있습니다. 365헤스여성의원은 전원 여의사가 상담과 검사를 진행하며, 증상에 맞는 진료를 안내합니다.',
  );
}

/** D02 + D04 — 공감 2열 */
function hes_womens_clinic_womens_disease_relate() {
  return array(
    'title' => '혹시 내 이야기 같으신가요?',
    'symptoms' => array(
      'heading' => '이런 증상이 있다면',
      'items' => array(
        '분비물의 양·색·냄새가 달라졌어요',
        '가려움이나 통증이 반복돼요',
        '소변을 볼 때 불편해요',
        '생리 주기가 불규칙해졌어요',
        '생리통이 일상생활을 방해해요',
        '생리 기간이 아닌데 출혈이 있어요',
        '골반이나 아랫배 통증이 지속돼요',
      ),
    ),
    'when' => array(
      'heading' => '진료가 필요한 경우',
      'items' => array(
        '증상이 반복되는 경우',
        '출혈량이 갑자기 많아진 경우',
        '통증이 심하거나 오래 지속되는 경우',
        '임신 가능성이 있는 상태에서 출혈이 있는 경우',
        '발열이나 심한 복통을 동반하는 경우',
      ),
    ),
  );
}

/** D03 주요 진료 영역 — 균일 카드 그리드 */
function hes_womens_clinic_womens_disease_areas() {
  return array(
    'title' => '반복되는 불편, 제대로 알아야 건강을 지킬 수 있습니다',
    'guide' => '관심 있는 질환을 눌러 자세한 내용을 확인해 보세요.',
    'subtitle' => '주요 진료 영역',
    'items' => array(
      array(
        'label' => '질염·외음부질환',
        'url' => home_url('/womens-disease/vaginitis-cystitis/'),
        'image' => 'treatment-womens-disease',
      ),
      array(
        'label' => '방광염',
        'url' => home_url('/womens-disease/vaginitis-cystitis/'),
        'image' => 'treatment-checkup',
      ),
      array(
        'label' => '생리불순·생리통',
        'url' => home_url('/womens-disease/menstrual-disorder/'),
        'image' => '',
      ),
      array(
        'label' => '부정출혈',
        'url' => home_url('/womens-disease/abnormal-bleeding/'),
        'image' => '',
      ),
      array(
        'label' => '골반염',
        'url' => home_url('/womens-disease/uterus-ovary/'),
        'image' => '',
      ),
      array(
        'label' => '자궁·난소질환',
        'url' => home_url('/womens-disease/uterus-ovary/'),
        'image' => '',
      ),
      array(
        'label' => '갱년기 증상',
        'url' => home_url('/womens-disease/menopause/'),
        'image' => '',
      ),
    ),
  );
}

/** D05 검사와 진단 */
function hes_womens_clinic_womens_disease_exams() {
  return array(
    'title' => '증상에 맞는 검사와 진단',
    'desc' => '필요한 검사만 선별해 진행합니다. 실제 시행 검사는 진료 후 안내됩니다.',
    'items' => array(
      '문진',
      '진찰',
      '분비물 검사',
      '소변 검사',
      '초음파 검사',
      '자궁경부 검사',
      '혈액 검사',
    ),
  );
}

/** D06 진료 과정 */
function hes_womens_clinic_womens_disease_process() {
  return array(
    'title' => '진료 과정',
    'desc' => '상담부터 경과 확인까지 단계별로 안내합니다.',
    'steps' => array(
      array('num' => '01', 'label' => '증상 상담'),
      array('num' => '02', 'label' => '필요한 검사'),
      array('num' => '03', 'label' => '결과 설명'),
      array('num' => '04', 'label' => '개인별 치료계획'),
      array('num' => '05', 'label' => '치료 후 경과 확인'),
    ),
  );
}
