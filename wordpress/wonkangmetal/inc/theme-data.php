<?php

function wonkangmetal_site_brand() {
  return array(
    'name'       => '원강금속(주)',
    'tagline'    => 'WONKANG METAL',
    'hq_address' => '충남 홍성군 갈산면 내포로 1607-56',
    'hq_phone'   => '041-630-8000',
    'hq_fax'     => '041-630-8099',
    'branch_address' => '인천 연수구 송도과학로56 송도BT센터 1613호',
    'branch_phone'   => '032-811-1653~5',
    'branch_fax'     => '032-811-1659',
    'email'      => 'jmlee@wonkangmetal.com',
  );
}

function wonkangmetal_hero_slides() {
  return array(
    array(
      'line1' => 'Life to Metal,',
      'line2' => 'Value to Technology',
      'caption' => '금속에 생명을, 기술에 가치를',
    ),
    array(
      'line1' => 'PASSION',
      'line2' => 'beyond TOMORROW',
      'caption' => '내일을 넘어서는 열정',
    ),
    array(
      'line1' => 'Keep the Quality.',
      'line2' => 'Build the Future',
      'caption' => '품질을 지키고 미래를 만들어갑니다.',
    ),
  );
}

function wonkangmetal_stats() {
  return array(
    array(
      'value' => '1988',
      'unit'  => '',
      'title' => '원강금속 창사',
      'desc'  => '원강금속은 끊임없는 기술 개발과 협력, 신뢰를 바탕으로 임직원 모두가 고객과 함께 성장하는 기업',
    ),
    array(
      'value' => '1000',
      'unit'  => 't',
      'title' => '수출 중량',
      'desc'  => '연간 최대 1,000톤 이상의 수출 중량을 달성하였으며 2030년까지 2,000만 달러 수출 달성을 목표',
    ),
    array(
      'value' => '40',
      'unit'  => '%',
      'title' => '듀플렉스 강종',
      'desc'  => '2005년 아시아 최초로 슈퍼 듀플렉스 스테인리스강을 제품화에 성공하며 현재 강종 40% 이상 취급',
    ),
  );
}

function wonkangmetal_solution_items() {
  return array(
    array('label' => '일반 펌프부품', 'subtitle' => 'Casing / Impeller', 'category' => 'pump-general'),
    array('label' => '고압 펌프부품', 'subtitle' => 'Casing / Impeller', 'category' => 'pump-high-pressure'),
    array('label' => '밸브부품', 'subtitle' => 'Body / Bonnet / Yoke etc', 'category' => 'valve'),
    array('label' => '산업기계부품', 'subtitle' => 'Centrifugal compressors', 'category' => 'industrial'),
  );
}

function wonkangmetal_vision_items() {
  return array(
    array(
      'title' => 'Innovation',
      'desc'  => '최신 기술을 적극 도입하여 지속적인 혁신을 실현합니다.',
    ),
    array(
      'title' => 'Partnership',
      'desc'  => '파트너사와 협력, 공급망을 확고히 유지 및 확대하여 생산에 흔들림이 없도록 하겠습니다.',
    ),
    array(
      'title' => 'Reliability',
      'desc'  => '핵심 공정 내재화로 품질 일관성과 고객 신뢰를 확보합니다.',
    ),
    array(
      'title' => 'Ambition',
      'desc'  => '기술 혁신과 공정 경쟁력을 바탕으로 업계를 선도하는 기업이 되겠습니다.',
    ),
  );
}

function wonkangmetal_news_placeholders() {
  return array(
    array('title' => '원강금속 뉴스 샘플 01', 'date' => '2025-09-10'),
    array('title' => '원강금속 뉴스 샘플 02', 'date' => '2025-08-22'),
    array('title' => '원강금속 뉴스 샘플 03', 'date' => '2025-07-15'),
  );
}

function wonkangmetal_business_steps() {
  return array(
    array(
      'eyebrow' => '정밀 주조분석 시스템',
      'title'   => 'MAGMASOFT',
      'desc'    => '원강금속은 MAGMASOFT를 활용해 주조 공정 전반의 응력, 유동, 응고 패턴을 사전에 시뮬레이션함으로써 타사 대비 현저히 낮은 불량률과 높은 제품 완성도를 확보하고 있습니다.',
      'image'   => 'img/business_image_02.png',
    ),
    array(
      'eyebrow' => '회수철 정련작업',
      'title'   => 'REFINING',
      'desc'    => '원강금속의 회수철 정련작업은 용탕의 질이 깨끗하며, 단가 절감이 가능합니다.',
      'image'   => 'img/business_image_02.png',
    ),
    array(
      'eyebrow' => '주물사 관리',
      'title'   => 'SAND QUALITY',
      'desc'    => '샌드메탈 비율을 10:1로 유지하며, 재생사 LOI(강열 감량)를 0.6 이하로 엄격하게 관리하여 주물사 품질을 최상으로 유지합니다.',
      'image'   => 'img/business_image_03.png',
    ),
    array(
      'eyebrow' => '초고속 정밀화 측정',
      'title'   => '3D SCAN',
      'desc'    => '초고속 3D 스캔 장비를 활용해 제품을 정밀하게 측정합니다. 1,800,000m/s의 속도와 0.015mm의 정확도로 측정 시간을 기존 대비 3분의 1로 단축시킵니다.',
      'image'   => 'img/business_image_04.png',
    ),
    array(
      'eyebrow' => '듀플렉스에 최적화된 열처리로',
      'title'   => 'HEAT TREATMENT',
      'desc'    => '듀플렉스(Duplex) 강종에 최적화된 열처리로를 자체 보유하여 우수한 제품 조직을 확보합니다. 또한, 설비 내재화를 통해 합리적인 가격 경쟁력을 갖추고 있습니다.',
      'image'   => 'img/business_image_04.png',
    ),
  );
}
