<?php

function hes_womens_clinic_asset_uri($key) {
  $map = array(
    'logo-header' => 'logos/header.png',
    'logo-footer' => 'logos/footer.png',
    'hero-kv' => 'hero/kv.png',
    'sub-hero-bg' => 'hero/sub-hero.jpg',
    'icon-chevron-down' => 'icons/chevron-down.png',
    'icon-chevron-up' => 'icons/chevron-up.png',
    'icon-chevron-right' => 'icons/chevron-right.png',
    'icon-arrow-right' => 'icons/arrow-right.png',
    'medical-staff' => 'staff/intro.png',
    'treatment-womens-disease' => 'treatments/womens-disease.png',
    'treatment-checkup' => 'treatments/checkup.png',
    'treatment-prenatal' => 'treatments/prenatal.png',
    'treatment-delivery' => 'treatments/delivery.png',
    'treatment-fertility' => 'treatments/fertility.png',
    'treatment-surgery' => 'treatments/surgery.png',
    'space-lounge' => 'spaces/lounge.png',
    'space-consult' => 'spaces/consult.png',
    'space-exam-a' => 'spaces/exam-a.png',
    'space-exam-b' => 'spaces/exam-b.png',
    'space-exam-c' => 'spaces/exam-c.png',
    'space-surgery' => 'spaces/operating-room.png',
    'space-infusion' => 'spaces/infusion.png',
    'checkup-overview' => 'spaces/exam-b.png',
    'checkup-program-01' => 'spaces/consult.png',
    'checkup-program-02' => 'spaces/exam-a.png',
    'checkup-program-03' => 'spaces/exam-b.png',
    'checkup-program-04' => 'spaces/exam-c.png',
    'checkup-program-05' => 'spaces/lounge.png',
  );

  if (!isset($map[$key])) {
    return '';
  }

  return get_template_directory_uri() . '/assets/' . $map[$key];
}

function hes_womens_clinic_gnb_items() {
  $notice_url = get_post_type_archive_link('notice');
  if (!$notice_url) {
    $notice_url = home_url('/support/notice/');
  }

  return array(
    array(
      'label' => '병원소개',
      'url' => home_url('/about/'),
      'children' => array(
        array('label' => '병원소개', 'url' => home_url('/about/clinic/')),
        array('label' => '의료진소개', 'url' => home_url('/about/doctors/')),
        array('label' => '진료안내', 'url' => home_url('/about/info/')),
      ),
    ),
    array(
      'label' => '여성검진',
      'url' => home_url('/checkup/'),
      'children' => array(
        array('label' => '여성검진 안내', 'url' => home_url('/checkup/')),
        array('label' => '기본 검진', 'url' => home_url('/checkup/basic/')),
        array('label' => '자궁경부암 검사', 'url' => home_url('/checkup/cervical-cancer/')),
        array('label' => '미혼 여성 검진', 'url' => home_url('/checkup/unmarried/')),
        array('label' => '예비부부 검진', 'url' => home_url('/checkup/wedding/')),
        array('label' => '연령별 검진', 'url' => home_url('/checkup/age/')),
      ),
    ),
    array(
      'label' => '여성질환',
      'url' => home_url('/womens-disease/'),
      'children' => array(
        array('label' => '여성질환 클리닉', 'url' => home_url('/womens-disease/')),
        array('label' => '질염·방광염', 'url' => home_url('/womens-disease/vaginitis-cystitis/')),
        array('label' => '생리불순', 'url' => home_url('/womens-disease/menstrual-disorder/')),
        array('label' => '부정출혈', 'url' => home_url('/womens-disease/abnormal-bleeding/')),
        array('label' => '자궁·난소질환', 'url' => home_url('/womens-disease/uterus-ovary/')),
        array('label' => '갱년기', 'url' => home_url('/womens-disease/menopause/')),
      ),
    ),
    array(
      'label' => '임신·출산',
      'url' => home_url('/pregnancy-birth/'),
      'children' => array(
        array('label' => '임신 확인', 'url' => home_url('/pregnancy-birth/confirmation/')),
        array('label' => '산전 관리', 'url' => home_url('/pregnancy-birth/prenatal/')),
        array('label' => '고위험 임신', 'url' => home_url('/pregnancy-birth/high-risk/')),
        array('label' => '분만', 'url' => home_url('/pregnancy-birth/delivery/')),
        array('label' => '산후 관리', 'url' => home_url('/pregnancy-birth/postpartum/')),
      ),
    ),
    array(
      'label' => '난임·가임력',
      'url' => home_url('/fertility/'),
      'children' => array(
        array('label' => '난임 검사', 'url' => home_url('/fertility/test/')),
        array('label' => '배란·가임력', 'url' => home_url('/fertility/ovulation/')),
        array('label' => '임신 준비', 'url' => home_url('/fertility/pregnancy-plan/')),
        array('label' => '난임 치료', 'url' => home_url('/fertility/treatment/')),
      ),
    ),
    array(
      'label' => '여성수술',
      'url' => home_url('/surgery/'),
      'children' => array(
        array('label' => '자궁경 검사·수술', 'url' => home_url('/surgery/hysteroscopy/')),
        array('label' => '복강경 수술', 'url' => home_url('/surgery/laparoscopy/')),
        array('label' => '외래 수술', 'url' => home_url('/surgery/outpatient/')),
        array('label' => '입원 수술', 'url' => home_url('/surgery/admission/')),
      ),
    ),
    array(
      'label' => '상담·안내',
      'url' => home_url('/support/'),
      'children' => array(
        array('label' => '진료 접수', 'url' => home_url('/support/reservation/')),
        array('label' => '카카오톡 상담', 'url' => home_url('/support/kakao/')),
        array('label' => 'FAQ', 'url' => home_url('/support/faq/')),
        array('label' => '공지사항', 'url' => $notice_url),
      ),
    ),
  );
}

function hes_womens_clinic_phone() {
  return array(
    'display' => '070-0000-0000',
    'href' => 'tel:07000000000',
  );
}

function hes_womens_clinic_footer_meta() {
  $phone = hes_womens_clinic_phone();

  return array(
    'company' => '대표자: 홍길동 | 사업자등록번호: 123-45-67890 | 주소: 서울 서초구 서초대로 123 2층',
    'contact' => '대표전화: ' . $phone['display'] . ' | 팩스: 02-123-4568',
    'instagram' => '#',
    'youtube' => '#',
    'privacy' => '#',
    'non_covered' => '#',
  );
}

function hes_womens_clinic_symptom_items() {
  return array(
    array('label' => '질염이 반복돼요', 'url' => home_url('/womens-disease/')),
    array('label' => '생리가 불규칙해요', 'url' => home_url('/womens-disease/menstrual-disorder/')),
    array('label' => '갑작스러운 출혈이 있어요', 'url' => home_url('/womens-disease/abnormal-bleeding/')),
    array('label' => '임신 여부를 확인하고 싶어요', 'url' => home_url('/pregnancy-birth/confirmation/')),
    array('label' => '임신을 준비하고 있어요', 'url' => home_url('/fertility/pregnancy-plan/')),
    array('label' => '정기검진을 받고 싶어요', 'url' => home_url('/checkup/')),
  );
}

function hes_womens_clinic_treatment_rows() {
  return array(
    array(
      'flip' => false,
      'items' => array(
        array(
          'label' => '여성질환',
          'url' => home_url('/womens-disease/'),
          'image' => 'treatment-womens-disease',
          'wide' => true,
        ),
        array(
          'label' => '여성검진',
          'url' => home_url('/checkup/'),
          'image' => 'treatment-checkup',
          'wide' => false,
        ),
        array(
          'label' => '임신·산전관리',
          'url' => home_url('/pregnancy-birth/'),
          'image' => 'treatment-prenatal',
          'wide' => false,
        ),
      ),
    ),
    array(
      'flip' => true,
      'items' => array(
        array(
          'label' => '분만',
          'url' => home_url('/pregnancy-birth/delivery/'),
          'image' => 'treatment-delivery',
          'wide' => false,
        ),
        array(
          'label' => '난임·가임력',
          'url' => home_url('/fertility/'),
          'image' => 'treatment-fertility',
          'wide' => false,
        ),
        array(
          'label' => '여성수술',
          'url' => home_url('/surgery/'),
          'image' => 'treatment-surgery',
          'wide' => true,
        ),
      ),
    ),
  );
}

function hes_womens_clinic_medical_staff_content() {
  return array(
    'eyebrow' => 'TEAMS',
    'title' => '각 분야 전문가들이 모여<br>신뢰할 수 있는 진료를 제공합니다',
    'cta_label' => '의료진 소개',
    'cta_url' => home_url('/about/doctors/'),
  );
}

function hes_womens_clinic_examination_steps() {
  return array(
    array('num' => '01', 'label' => '상담'),
    array('num' => '02', 'label' => '검사'),
    array('num' => '03', 'label' => '진단'),
    array('num' => '04', 'label' => '치료계획'),
    array('num' => '05', 'label' => '치료 또는 수술'),
    array('num' => '06', 'label' => '회복과 추적관리'),
  );
}

function hes_womens_clinic_space_items() {
  return array(
    array('label' => '라운지', 'image' => 'space-lounge'),
    array('label' => '진료실A', 'image' => 'space-exam-a'),
    array('label' => '진료실B', 'image' => 'space-exam-b'),
    array('label' => '진료실C', 'image' => 'space-exam-c'),
    array('label' => '수술실', 'image' => 'space-surgery'),
    array('label' => '상담실', 'image' => 'space-consult'),
    array('label' => '수액실', 'image' => 'space-infusion'),
  );
}

function hes_womens_clinic_faq_items() {
  return array(
    array(
      'question' => '일반 진료가 가능한가요?',
      'answer' => '네, 365헤스여성의원은 365일 연중무휴로 진료를 운영합니다. 평일, 주말, 공휴일 모두 진료가 가능하며, 정확한 진료시간은 상단 진료시간 안내 또는 전화 문의를 통해 확인하실 수 있습니다.',
    ),
    array(
      'question' => '처음 산부인과를 방문할 때 무엇을 준비해야 하나요?',
      'answer' => '신분증과 기존 검사 기록, 복용 중인 약 목록을 준비해 주시면 진료에 도움이 됩니다. 임신 가능성이 있거나 생리 주기 관련 상담이라면 마지막 생리 시작일을 미리 확인해 주세요.',
    ),
    array(
      'question' => '임신 확인은 언제부터 가능한가요?',
      'answer' => '검사 방법과 생리 주기에 따라 시기가 달라질 수 있습니다. 빠르면 예정일 다음날부터 확인이 가능한 경우도 있으니, 증상과 주기를 알려주시면 적절한 검사 시점을 안내해 드립니다.',
    ),
    array(
      'question' => '온라인 접수 후 바로 예약이 확정되나요?',
      'answer' => '온라인 접수는 예약 신청 단계입니다. 접수 후 병원에서 확인하여 연락드리며, 최종 일정은 상담을 통해 확정됩니다.',
    ),
    array(
      'question' => '예약 없이 방문할 수 있나요?',
      'answer' => '예약 없이도 방문하실 수 있습니다. 다만 대기 시간이 발생할 수 있어, 가능하시면 사전 예약 또는 전화 문의를 권장드립니다.',
    ),
    array(
      'question' => '주차장이 없으면 어디를 이용해야 하나요?',
      'answer' => '병원 전용 주차장은 운영하지 않습니다. 인근 유료 주차장 이용 또는 서초역 인근 대중교통 이용을 안내해 드리고 있으니, 방문 전 위치 안내를 참고해 주세요.',
    ),
  );
}

function hes_womens_clinic_location_content() {
  $phone = hes_womens_clinic_phone();

  return array(
    'address' => '서울 서초구 서초대로 123, 헤스타워 2층',
    'access' => '서초역 3번 출구 도보 2분 거리 (약 150m)',
    'phone' => $phone['display'],
    'phone_href' => $phone['href'],
    'hours' => array(
      array('label' => '평일', 'time' => '09:00 - 18:00'),
      array('label' => '토요일', 'time' => '09:00 - 15:00'),
      array('label' => '일요일·공휴일', 'time' => '09:00 - 13:00'),
      array('label' => '점심시간', 'time' => '13:00 - 14:00'),
    ),
    'hours_note' => '* 365일 연중무휴로 진료합니다.',
  );
}
