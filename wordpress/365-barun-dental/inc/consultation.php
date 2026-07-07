<?php

/**
 * Online consultation pages — Figma 504:136 · 538:148 · 511:140
 * Static mock data (CMS 연동 전)
 */

function barun_dental_consultation_url($view = 'list') {
  $slugs = array(
    'list' => 'consultation',
    'detail' => 'consultation-detail',
    'write' => 'consultation-write',
  );

  $slug = isset($slugs[$view]) ? $slugs[$view] : $slugs['list'];
  $page = get_page_by_path($slug);

  if ($page) {
    return get_permalink($page);
  }

  return home_url('/' . $slug . '/');
}

function barun_dental_consultation_categories() {
  return array(
    '전체',
    '임플란트',
    '충치·신경치료',
    '치아교정',
    '사랑니',
    '잇몸치료',
    '심미치료',
    '기타',
  );
}

function barun_dental_consultation_form_categories() {
  return array(
    '임플란트',
    '충치·신경치료',
    '치아교정',
    '사랑니',
    '잇몸치료',
    '심미치료',
    '기타',
    '전체',
  );
}

function barun_dental_consultation_call_times() {
  return array(
    '09:00 – 11:00',
    '11:00 – 13:00',
    '14:00 – 16:00',
    '16:00 – 18:00',
    '18:00 – 20:00',
  );
}

function barun_dental_consultation_posts() {
  return array(
    array(
      'id' => 1,
      'category' => '임플란트',
      'title' => '어금니 발치 후 치료 시기가 궁금합니다',
      'author' => '김*수',
      'date' => '2026.07.05',
      'status' => 'answered',
      'locked' => true,
    ),
    array(
      'id' => 2,
      'category' => '충치·신경치료',
      'title' => '충치 치료 후 통증이 지속됩니다',
      'author' => '이*영',
      'date' => '2026.07.04',
      'status' => 'waiting',
      'locked' => true,
    ),
    array(
      'id' => 3,
      'category' => '치아교정',
      'title' => '교정 기간과 비용이 궁금합니다',
      'author' => '박*민',
      'date' => '2026.07.03',
      'status' => 'answered',
      'locked' => true,
    ),
    array(
      'id' => 4,
      'category' => '사랑니',
      'title' => '사랑니 발치 전 상담 받고 싶습니다',
      'author' => '최*진',
      'date' => '2026.07.02',
      'status' => 'waiting',
      'locked' => true,
    ),
    array(
      'id' => 5,
      'category' => '심미치료',
      'title' => '라미네이트 시술 가능 여부 문의',
      'author' => '정*아',
      'date' => '2026.07.01',
      'status' => 'waiting',
      'locked' => true,
    ),
    array(
      'id' => 6,
      'category' => '잇몸치료',
      'title' => '잇몸 출혈이 지속적으로 발생합니다',
      'author' => '김*호',
      'date' => '2026.06.30',
      'status' => 'answered',
      'locked' => true,
    ),
    array(
      'id' => 7,
      'category' => '심미치료',
      'title' => '치아 변색 원인이 궁금합니다',
      'author' => '윤*서',
      'date' => '2026.06.29',
      'status' => 'waiting',
      'locked' => true,
    ),
    array(
      'id' => 8,
      'category' => '충치·신경치료',
      'title' => '오른쪽 어금니에 통증이 있습니다',
      'author' => '한*우',
      'date' => '2026.06.28',
      'status' => 'answered',
      'locked' => true,
    ),
    array(
      'id' => 9,
      'category' => '치아교정',
      'title' => '교정 중 불편한 부분을 문의드립니다',
      'author' => '송*연',
      'date' => '2026.06.27',
      'status' => 'waiting',
      'locked' => true,
    ),
    array(
      'id' => 10,
      'category' => '사랑니',
      'title' => '사랑니 발치 후 주의사항을 알고 싶습니다',
      'author' => '오*준',
      'date' => '2026.06.26',
      'status' => 'answered',
      'locked' => true,
    ),
  );
}

function barun_dental_consultation_detail() {
  return array(
    'status' => 'answered',
    'status_label' => '답변완료',
    'title' => '어금니 발치 후 임플란트 식립 시기가 어떻게 되나요?',
    'category' => '임플란트',
    'date' => '2026.07.05',
    'author' => '김*수',
    'body' => array(
      '안녕하세요. 어금니 통증이 있어 상담 드립니다.',
      '오른쪽 아래 어금니 쪽이 많이 아프고 통증이 있어서 발치를 하게 되었습니다. 치과에서도 임플란트를 해야 한다고 했는데, 보통 발치하고 바로 심는 경우도 있고 시간을 두고 심는 경우도 있다고 들었습니다.',
      '제 경우처럼 염증이 있었던 발치의 경우면 보통 어느 정도의 회복 기간을 거치고 임플란트 수술을 진행하게 되는지 궁금합니다. 수술 후 일상생활 복귀까지 시간도 함께 안내해 주시면 감사하겠습니다. 답변 기다리겠습니다. 감사합니다.',
    ),
    'attachment' => array(
      'name' => 'X-ray_image_01.jpg',
      'size' => '245KB',
    ),
  );
}

function barun_dental_consultation_privacy_text() {
  return "개인정보 수집 및 이용 동의\n\n"
    . "1. 수집하는 개인정보 항목\n   이름, 연락처(전화번호)\n\n"
    . "2. 개인정보 수집 및 이용 목적\n   온라인 상담 접수 및 답변 안내\n\n"
    . "3. 보유 및 이용 기간\n   상담 완료 후 1년\n\n"
    . "4. 동의 거부 권리\n   동의를 거부할 수 있으나, 상담 접수가 제한될 수 있습니다.";
}

function barun_dental_consultation_status_label($status) {
  return $status === 'answered' ? '답변완료' : '답변대기';
}
