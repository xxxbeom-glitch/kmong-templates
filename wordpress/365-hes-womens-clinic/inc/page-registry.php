<?php

/**
 * 설계서 §04-2 IA — 전체 페이지 경로·제목
 * path => title (부모 경로는 슬래시로 구분)
 */
function hes_womens_clinic_page_registry() {
  return array(
    'about' => '병원소개',
    'about/clinic' => '병원 소개',
    'about/doctors' => '의료진 소개',
    'about/schedule' => '진료 안내',
    'about/space' => '진료 공간',
    'about/location' => '오시는 길',

    'womens-disease' => '여성질환',
    'womens-disease/vaginitis-cystitis' => '질염·방광염',
    'womens-disease/menstrual-disorder' => '생리불순·생리통',
    'womens-disease/abnormal-bleeding' => '부정출혈',
    'womens-disease/uterus-ovary' => '자궁·난소질환',
    'womens-disease/menopause' => '갱년기 증상',

    'checkup' => '여성검진',
    'checkup/basic' => '기본 검진',
    'checkup/cervical-cancer' => '자궁경부암 검사',
    'checkup/unmarried' => '미혼 여성 검진',
    'checkup/wedding' => '예비부부 검진',
    'checkup/age' => '연령별 검진',

    'pregnancy-birth' => '임신·출산',
    'pregnancy-birth/confirmation' => '임신 확인',
    'pregnancy-birth/prenatal' => '산전 관리',
    'pregnancy-birth/high-risk' => '고위험 임신',
    'pregnancy-birth/delivery' => '분만',
    'pregnancy-birth/postpartum' => '산후 관리',

    'fertility' => '난임·가임력',
    'fertility/test' => '난임 검사',
    'fertility/ovulation' => '배란·가임력',
    'fertility/pregnancy-plan' => '임신 준비',
    'fertility/treatment' => '난임 치료',

    'surgery' => '여성수술',
    'surgery/hysteroscopy' => '자궁경 검사·수술',
    'surgery/laparoscopy' => '복강경 수술',
    'surgery/outpatient' => '외래 수술',
    'surgery/admission' => '입원 수술',

    'support' => '상담·안내',
    'support/reservation' => '진료 접수',
    'support/kakao' => '카카오톡 상담',
    'support/faq' => 'FAQ',
    'support/notice' => '공지사항',
  );
}

/** path 깊이 (부모 우선 생성용) */
function hes_womens_clinic_page_depth($path) {
  return substr_count($path, '/');
}

/** GNB 하위 링크용 — 허브 페이지의 직계 자식 */
function hes_womens_clinic_hub_children($hub_path) {
  $registry = hes_womens_clinic_page_registry();
  $children = array();
  $prefix = $hub_path . '/';

  foreach ($registry as $path => $title) {
    if (strpos($path, $prefix) !== 0) {
      continue;
    }
    $rest = substr($path, strlen($prefix));
    if (strpos($rest, '/') !== false) {
      continue;
    }
    $children[] = array(
      'label' => $title,
      'url' => home_url('/' . $path . '/'),
    );
  }

  return $children;
}
