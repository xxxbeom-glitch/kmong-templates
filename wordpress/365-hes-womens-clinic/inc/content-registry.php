<?php

function hes_womens_clinic_default_when() {
  return array(
    '증상이 반복되거나 악화되는 경우',
    '통증이 심하거나 일상생활을 방해하는 경우',
    '출혈·발열·심한 복통을 동반하는 경우',
    '임신 가능성이 있는데 증상이 있는 경우',
    '이전 치료 후에도 불편이 지속되는 경우',
  );
}

function hes_womens_clinic_default_exams($items = null) {
  return array(
    'title' => '검사와 진단',
    'desc' => '필요한 검사만 선별해 진행합니다. 실제 시행 검사는 진료 후 안내됩니다.',
    'items' => $items ? $items : array('문진', '진찰', '초음파 검사', '혈액 검사'),
  );
}

function hes_womens_clinic_default_process() {
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

function hes_womens_clinic_detail_page($hero_title, $intro_text, $symptoms, $when = null, $exams = null) {
  return array(
    'type' => 'clinic',
    'hero' => array('title' => $hero_title),
    'intro' => array('text' => $intro_text),
    'relate' => array(
      'title' => '혹시 내 이야기 같으신가요?',
      'symptoms' => array(
        'heading' => '이런 증상이 있다면',
        'items' => $symptoms,
      ),
      'when' => array(
        'heading' => '진료가 필요한 경우',
        'items' => $when ? $when : hes_womens_clinic_default_when(),
      ),
    ),
    'exams' => hes_womens_clinic_default_exams($exams),
    'process' => hes_womens_clinic_default_process(),
  );
}

function hes_womens_clinic_hub_page($path, $hero_title, $intro_text, $areas_title, $areas_guide) {
  $items = array();
  foreach (hes_womens_clinic_hub_children($path) as $child) {
    $items[] = array(
      'label' => $child['label'],
      'url' => $child['url'],
      'image' => '',
    );
  }

  return array(
    'type' => 'clinic',
    'hero' => array('title' => $hero_title),
    'intro' => array('text' => $intro_text),
    'relate' => null,
    'areas' => array(
      'title' => $areas_title,
      'guide' => $areas_guide,
      'subtitle' => '안내 항목',
      'items' => $items,
    ),
    'exams' => null,
    'process' => hes_womens_clinic_default_process(),
  );
}

function hes_womens_clinic_hub_areas_from_children($path, $image_map = array()) {
  $items = array();
  foreach (hes_womens_clinic_hub_children($path) as $child) {
    $key = trim(str_replace(home_url('/'), '', $child['url']), '/');
    $items[] = array(
      'label' => $child['label'],
      'url' => $child['url'],
      'image' => isset($image_map[$key]) ? $image_map[$key] : '',
    );
  }
  return $items;
}

/**
 * path => page render config
 */
function hes_womens_clinic_page_content_config($path) {
  $configs = array(
    'about' => hes_womens_clinic_hub_page(
      'about',
      '병원소개',
      '365일 진료, 서초역 인근, 전원 여의사 3인이 함께하는 여성 전문 의료기관입니다. 여성질환·검진·임신·출산·난임·수술까지 한곳에서 이어지는 진료를 제공합니다.',
      '병원소개 안내',
      '궁금한 항목을 선택해 자세한 내용을 확인해 보세요.'
    ),

    'about/clinic' => array(
      'type' => 'prose',
      'hero' => array('title' => '병원 소개'),
      'intro' => array(
        'text' => '365헤스여성의원은 여성의 건강을 생애주기 전반에서 돌보는 산부인과 전문 클리닉입니다.',
      ),
      'sections' => array(
        array(
          'title' => '365일 진료',
          'paragraphs' => array(
            '평일·주말·공휴일 진료를 운영해 바쁜 일상 속에서도 부담 없이 방문하실 수 있습니다.',
            '정확한 진료시간은 진료 안내 또는 전화 문의를 통해 확인해 주세요.',
          ),
        ),
        array(
          'title' => '전원 여의사 진료',
          'paragraphs' => array(
            '산부인과 전문의 3인이 상담·검사·치료를 진행합니다.',
            '민감한 고민도 편안하게 상담할 수 있는 환경을 지향합니다.',
          ),
        ),
        array(
          'title' => '여성질환 중심 진료',
          'paragraphs' => array(
            '질염·생리불순·부정출혈 등 반복되는 여성질환부터 검진·임신·출산·난임·수술까지 폭넓게 안내합니다.',
          ),
        ),
      ),
    ),

    'about/doctors' => array(
      'type' => 'prose',
      'hero' => array('title' => '의료진 소개'),
      'intro' => array(
        'text' => '각 분야 경험을 갖춘 산부인과 전문의가 함께합니다. 의료진 상세 정보는 확정 후 업데이트됩니다.',
      ),
      'sections' => array(
        array(
          'title' => '진료 분야',
          'list' => array('여성질환·검진', '임신·출산', '난임·가임력', '여성수술'),
        ),
        array(
          'title' => '안내',
          'paragraphs' => array(
            '의료진 사진·이름·진료 일정은 CLIENT REQUIRED 항목으로, 확정 후 반영됩니다.',
          ),
        ),
      ),
    ),

    'about/schedule' => array(
      'type' => 'schedule',
      'hero' => array('title' => '진료 안내'),
      'intro' => array(
        'text' => '365일 연중무휴 진료를 원칙으로 합니다. 아래 시간은 기본 안내이며, 공휴일·이벤트 일정은 공지사항을 확인해 주세요.',
      ),
    ),

    'about/space' => array(
      'type' => 'section-space',
      'hero' => array('title' => '진료 공간'),
    ),

    'about/location' => array(
      'type' => 'section-location',
      'hero' => array('title' => '오시는 길'),
    ),

    'womens-disease' => array(
      'type' => 'clinic',
      'hero' => hes_womens_clinic_womens_disease_hero(),
      'intro' => hes_womens_clinic_womens_disease_intro(),
      'relate' => hes_womens_clinic_womens_disease_relate(),
      'areas' => hes_womens_clinic_womens_disease_areas(),
      'exams' => hes_womens_clinic_womens_disease_exams(),
      'process' => hes_womens_clinic_womens_disease_process(),
    ),

    'womens-disease/vaginitis-cystitis' => hes_womens_clinic_detail_page(
      '질염·방광염',
      '가려움·분비물 변화·소변 불편 등 질염과 방광염 증상은 원인에 따라 치료 방법이 달라집니다. 정확한 검사 후 맞춤 치료를 안내합니다.',
      array('분비물의 양·색·냄새가 달라졌어요', '가려움이나 따가움이 반복돼요', '소변을 볼 때 통증이나 잔뇨감이 있어요', '증상이 치료 후에도 반복돼요'),
      null,
      array('문진', '진찰', '분비물 검사', '소변 검사', '필요 시 초음파 검사')
    ),

    'womens-disease/menstrual-disorder' => hes_womens_clinic_detail_page(
      '생리불순·생리통',
      '생리 주기 변화나 심한 생리통은 호르몬 불균형, 자궁질환 등 다양한 원인이 있을 수 있습니다. 일상에 지장이 있다면 검사와 상담이 필요합니다.',
      array('생리 주기가 불규칙해졌어요', '생리통이 점점 심해졌어요', '생리량이 평소와 많이 달라졌어요', '생리 전 증상이 심해요')
    ),

    'womens-disease/abnormal-bleeding' => hes_womens_clinic_detail_page(
      '부정출혈',
      '생리 기간이 아닌 출혈은 여러 원인이 있을 수 있습니다. 출혈량이 많거나 반복된다면 검사를 통해 원인을 확인하는 것이 중요합니다.',
      array('생리 기간 외 출혈이 있어요', '출혈량이 평소보다 많아요', '혈덩이가 함께 나와요', '복통과 함께 출혈이 있어요')
    ),

    'womens-disease/uterus-ovary' => hes_womens_clinic_detail_page(
      '자궁·난소질환',
      '골반 통증·비정상 출혈·검진 이상 소견 등 자궁·난소 관련 증상은 초음파 등 검사로 상태를 확인한 뒤 치료 방향을 안내합니다.',
      array('아랫배·골반 통증이 지속돼요', '검사에서 자궁·난소 이상 소견이 나왔어요', '생리량·주기 변화가 심해요', '복부 팽만감이 있어요'),
      null,
      array('문진', '진찰', '초음파 검사', '혈액 검사', '필요 시 추가 검사')
    ),

    'womens-disease/menopause' => hes_womens_clinic_detail_page(
      '갱년기 증상',
      '안면 홍조·수면 장애·기분 변화·건조함 등 갱년기 증상은 개인차가 큽니다. 생활습관과 함께 필요한 치료·검진을 안내합니다.',
      array('갑작스러운 열감·홍조가 있어요', '수면이 어렵거나 피로감이 심해요', '건조함·불편감이 늘었어요', '기분 변화가 커졌어요')
    ),

    'checkup' => hes_womens_clinic_hub_page(
      'checkup',
      '여성검진',
      '연령·상황에 맞는 산부인과 검진을 안내합니다. 기본 검진부터 자궁경부암 검사, 예비부부·연령별 검진까지 선택할 수 있습니다.',
      '나에게 맞는 검진 찾기',
      '관심 있는 검진 항목을 선택해 보세요.'
    ),

    'checkup/basic' => hes_womens_clinic_detail_page(
      '기본 검진',
      '산부인과 기본 검진으로 자궁·난소 상태와 일반 여성 건강을 확인합니다. 검진 항목은 연령과 상담 내용에 따라 달라질 수 있습니다.',
      array('정기 검진을 받고 싶어요', '하복부 불편감이 있어요', '이전 검진 이후로 오래 지났어요', '건강 상태를 전반적으로 확인하고 싶어요'),
      null,
      array('문진', '진찰', '초음파 검사', '자궁경부 검사', '필요 시 혈액 검사')
    ),

    'checkup/cervical-cancer' => hes_womens_clinic_detail_page(
      '자궁경부암 검사',
      '자궁경부암 검진은 세포검사 등으로 이상 세포를 조기에 발견하는 데 도움이 됩니다. 검진 주기와 방법은 상담 후 안내합니다.',
      array('자궁경부암 검진 시기가 궁금해요', '이전 검사 결과가 걱정돼요', '정기 검진을 받아야 할 것 같아요'),
      null,
      array('문진', '자궁경부 세포검사', '필요 시 HPV 검사', '필요 시 질 초음파')
    ),

    'checkup/unmarried' => hes_womens_clinic_detail_page(
      '미혼 여성 검진',
      '미혼 여성도 필요한 검사만 선별해 편안하게 검진받을 수 있습니다. 상담을 통해 걱정되는 부분을 먼저 나눠 주세요.',
      array('처음 산부인과 검진이에요', '검진이 불안하고 걱정돼요', '생리 불편이나 통증이 있어요'),
      null,
      array('문진', '진찰', '초음파 검사', '필요 시 추가 검사')
    ),

    'checkup/wedding' => hes_womens_clinic_detail_page(
      '예비부부 검진',
      '결혼을 앞두고 필요한 검진·상담을 안내합니다. 개인 상황에 맞는 검사 항목을 상담 후 결정합니다.',
      array('결혼 전 검진이 필요해요', '임신 준비 전 건강을 확인하고 싶어요', '둘 다 검진이 필요한지 궁금해요')
    ),

    'checkup/age' => hes_womens_clinic_detail_page(
      '연령별 검진',
      '10대·20대·30대·40대 이후 등 연령에 따라 권장 검진 항목이 다릅니다. 현재 연령과 건강 상태에 맞는 검진을 안내합니다.',
      array('나이에 맞는 검진이 궁금해요', '갱년기 전후 검진이 필요해요', '정기 검진 주기를 알고 싶어요')
    ),

    'pregnancy-birth' => hes_womens_clinic_hub_page(
      'pregnancy-birth',
      '임신·출산',
      '임신 확인부터 산전 관리, 고위험 임신 상담, 분만·산후 관리까지 단계별로 안내합니다.',
      '임신·출산 안내',
      '현재 상황에 맞는 항목을 선택해 보세요.'
    ),

    'pregnancy-birth/confirmation' => hes_womens_clinic_detail_page(
      '임신 확인',
      '생리 지연·신체 변화가 있다면 임신 가능성을 확인할 수 있습니다. 검사 방법과 시기는 상담 후 안내합니다.',
      array('생리가 늦어졌어요', '임신 테스트기 결과가 애매해요', '임신 가능성이 걱정돼요', '초기 증상이 있어요'),
      null,
      array('문진', '요β-hCG 검사', '초음파 검사', '필요 시 혈액 검사')
    ),

    'pregnancy-birth/prenatal' => hes_womens_clinic_detail_page(
      '산전 관리',
      '임신 기간 동안 정기 검진과 상담을 통해 산모와 태아 건강을 확인합니다. 검진 일정은 개인별로 안내합니다.',
      array('임신 초기 관리가 궁금해요', '정기 검진 일정을 알고 싶어요', '태아 검사에 대해 상담받고 싶어요')
    ),

    'pregnancy-birth/high-risk' => hes_womens_clinic_detail_page(
      '고위험 임신',
      '기존 질환·이전 임신 이력 등으로 고위험 임신이 우려될 때 맞춤 관리가 필요할 수 있습니다. 상담을 통해 관리 계획을 안내합니다.',
      array('기존 질환이 있어요', '이전 임신·출산 경험이 걱정돼요', '나이·건강 상태 때문에 불안해요')
    ),

    'pregnancy-birth/delivery' => hes_womens_clinic_detail_page(
      '분만',
      '분만 계획과 준비에 대해 상담합니다. 개인 상황에 맞는 분만 방식·입원 절차는 진료 후 안내합니다.',
      array('분만 계획을 세우고 싶어요', '진통·분만 시기가 궁금해요', '입원 준비가 필요해요')
    ),

    'pregnancy-birth/postpartum' => hes_womens_clinic_detail_page(
      '산후 관리',
      '출산 후 회복·건강 관리를 안내합니다. 출혈·통증·수유·정서 변화 등 산후 증상도 상담할 수 있습니다.',
      array('출산 후 회복이 더뎌요', '출혈·통증이 걱정돼요', '수유·몸 상태 상담이 필요해요')
    ),

    'fertility' => hes_womens_clinic_hub_page(
      'fertility',
      '난임·가임력',
      '임신 준비·난임 검사·배란·가임력 상담을 통해 현재 상태를 확인하고 다음 단계를 안내합니다.',
      '난임·가임력 안내',
      '관심 항목을 선택해 보세요.'
    ),

    'fertility/test' => hes_womens_clinic_detail_page(
      '난임 검사',
      '임신이 잘 되지 않을 때 필요한 검사를 단계적으로 안내합니다. 검사 항목은 상담 내용에 따라 달라질 수 있습니다.',
      array('임신이 잘 되지 않아요', '검사를 어디서부터 받아야 할지 모르겠어요', '부부 검사가 필요한지 궁금해요'),
      null,
      array('문진', '호르몬 검사', '초음파 검사', '필요 시 추가 검사')
    ),

    'fertility/ovulation' => hes_womens_clinic_detail_page(
      '배란·가임력',
      '배란 시기·가임력에 대한 상담과 검사를 진행합니다. 생리 주기와 증상을 함께 확인합니다.',
      array('배란 시기를 알고 싶어요', '생리 주기가 불규칙해요', '가임력 검사가 필요해요')
    ),

    'fertility/pregnancy-plan' => hes_womens_clinic_detail_page(
      '임신 준비',
      '임신 전 건강 상태 점검과 생활습관 상담을 통해 준비 기간을 안내합니다.',
      array('임신을 계획하고 있어요', '준비 검진이 필요해요', '복용 중인 약이 걱정돼요')
    ),

    'fertility/treatment' => hes_womens_clinic_detail_page(
      '난임 치료',
      '검사 결과에 따라 난임 치료 방향을 안내합니다. 치료 방법·기간은 개인별로 달라질 수 있습니다.',
      array('난임 치료를 시작하려 해요', '이전 치료 후에도 임신이 안 돼요', '치료 옵션을 비교하고 싶어요')
    ),

    'surgery' => hes_womens_clinic_hub_page(
      'surgery',
      '여성수술',
      '자궁경 검사·수술, 복강경 수술, 외래·입원 수술 등 필요한 시술을 상담 후 안내합니다.',
      '여성수술 안내',
      '관심 있는 수술·시술 항목을 선택해 보세요.'
    ),

    'surgery/hysteroscopy' => hes_womens_clinic_detail_page(
      '자궁경 검사·수술',
      '자궁 내부 상태 확인이 필요할 때 자궁경 검사·시술을 고려할 수 있습니다. 적응증과 과정은 상담 후 안내합니다.',
      array('자궁 내부 검사가 필요하다고 들었어요', '비정상 출혈 원인 확인이 필요해요', '자궁 내 종물이 걱정돼요')
    ),

    'surgery/laparoscopy' => hes_womens_clinic_detail_page(
      '복강경 수술',
      '복강경을 활용한 진단·수술 여부는 증상과 검사 결과에 따라 결정됩니다. 수술 전 상담을 통해 과정을 안내합니다.',
      array('복강경 수술 권유를 받았어요', '복부·골반 통증 원인 확인이 필요해요', '수술 전 준비가 궁금해요')
    ),

    'surgery/outpatient' => hes_womens_clinic_detail_page(
      '외래 수술',
      '당일 또는 외래 기준으로 진행 가능한 시술·수술에 대해 안내합니다. 준비 사항은 상담 후 개별 안내합니다.',
      array('입원 없이 시술이 가능한지 궁금해요', '당일 수술 일정을 알고 싶어요')
    ),

    'surgery/admission' => hes_womens_clinic_detail_page(
      '입원 수술',
      '입원이 필요한 수술은 사전 상담·검사 후 일정을 조율합니다. 회복 기간과 주의사항을 안내합니다.',
      array('입원 수술 일정이 필요해요', '수술 전 검사·준비가 궁금해요', '퇴원 후 관리가 걱정돼요')
    ),

    'support' => hes_womens_clinic_hub_page(
      'support',
      '상담·안내',
      '진료 접수, 카카오톡 상담, FAQ, 공지사항을 통해 병원 이용 정보를 확인할 수 있습니다.',
      '상담·안내',
      '필요한 메뉴를 선택해 주세요.'
    ),

    'support/reservation' => array(
      'type' => 'reservation',
      'hero' => array('title' => '진료 접수'),
      'intro' => array(
        'text' => '온라인 접수 신청 후 병원에서 확인·연락을 드리면 예약이 최종 확정됩니다. 급한 증상이 있으면 대표전화로 문의해 주세요.',
      ),
    ),

    'support/kakao' => array(
      'type' => 'prose',
      'hero' => array('title' => '카카오톡 상담'),
      'intro' => array(
        'text' => '카카오톡으로 간단한 문의를 남기실 수 있습니다. 정확한 진료·예약은 전화 또는 온라인 접수를 이용해 주세요.',
      ),
      'sections' => array(
        array(
          'title' => '이용 안내',
          'list' => array(
            '진료 시간·위치·접수 방법 문의',
            '간단한 증상 상담 (정확한 진단은 내원 후 가능)',
            '검사·수술 준비 관련 일반 안내',
          ),
        ),
        array(
          'title' => '주의',
          'paragraphs' => array(
            '응급·급격한 통증·많은 출혈 등은 카카오톡 대신 즉시 전화 문의를 권장합니다.',
          ),
        ),
      ),
      'cta' => array(
        'label' => '진료 접수하기',
        'url' => home_url('/support/reservation/'),
      ),
    ),

    'support/faq' => array(
      'type' => 'section-faq',
      'hero' => array('title' => '자주 묻는 질문'),
    ),

    'support/notice' => array(
      'type' => 'notice-list',
      'hero' => array('title' => '공지사항'),
      'intro' => array(
        'text' => '병원 운영·진료 안내 등 중요한 소식을 확인하세요.',
      ),
    ),
  );

  return isset($configs[$path]) ? $configs[$path] : null;
}

function hes_womens_clinic_get_page_content($path) {
  return hes_womens_clinic_page_content_config($path);
}
