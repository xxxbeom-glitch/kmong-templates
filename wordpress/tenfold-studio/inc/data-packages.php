<?php

if (!defined('ABSPATH')) {
  exit;
}

/**
 * @return array<string, array<string, mixed>>
 */
function tenfold_packages() {
  return array(
    'standard' => array(
      'slug' => 'standard',
      'eyebrow' => 'PACKAGE 01',
      'name' => 'STANDARD PACKAGE',
      'headline' => "빠르게 시작하되,\n완성도는 놓치지 않도록.",
      'description' => "완성도 있는 기본 디자인과 페이지 구조를 활용해\n브랜드 정보와 콘텐츠에 맞게 조정하는 제작 방식입니다.\n\n처음부터 모든 요소를 새롭게 설계하지 않아\n제작 기간과 비용을 줄이면서도\n안정적인 품질로 구축할 수 있습니다.",
      'summary' => array(
        array('label' => '제작 기간', 'value' => '최대 2주'),
        array('label' => '제작 비용', 'value' => '40만원부터'),
        array('label' => '제작 방식', 'value' => '기본 구조 커스터마이징'),
      ),
      'card_headline' => "빠르게 시작하되,\n완성도는 놓치지 않도록.",
      'card_description' => '준비된 디자인 구조를 바탕으로 브랜드와 콘텐츠에 맞게 조정해 효율적으로 구축합니다.',
      'card_meta' => array('최대 2주', '40만원부터', '기본 구조 커스터마이징'),
      'recommended' => array(
        '빠른 일정 안에 웹사이트를 오픈해야 하는 경우',
        '브랜드와 서비스의 기본 소개가 필요한 경우',
        '복잡한 기능보다 명확한 정보 전달이 중요한 경우',
        '예산과 제작 기간을 효율적으로 관리하고 싶은 경우',
      ),
      'included' => array(
        'Design' => array(
          '브랜드 컬러 적용',
          '콘텐츠 배치와 이미지 교체',
          '기본 UI 커스터마이징',
        ),
        'Build' => array(
          '메인페이지 1개',
          '기본 서브페이지',
          '반응형 웹 구축',
          '기본 문의 기능',
          '필요한 CMS 수정 영역',
        ),
        'Foundation' => array(
          '페이지별 Title과 Meta 기본 설정',
          'Sitemap과 robots 기본 설정',
          '기본 검색 등록 지원',
          '기본 QA와 오픈 지원',
        ),
      ),
      'process' => array(
        array('index' => '01', 'title' => '자료 전달'),
        array('index' => '02', 'title' => '콘텐츠 적용'),
        array('index' => '03', 'title' => '디자인 확인'),
        array('index' => '04', 'title' => '웹사이트 구축'),
        array('index' => '05', 'title' => '검수 및 오픈'),
      ),
      'preparation' => array(
        '로고 파일',
        '회사 또는 브랜드 소개',
        '서비스 설명',
        '사용할 이미지',
        '주소와 연락처',
        '필요한 운영 정보',
      ),
      'preparation_note' => '원고와 이미지가 완전히 준비되지 않았다면 필요한 자료의 범위부터 먼저 정리할 수 있습니다.',
      'addons' => array(
        '추가 페이지',
        '게시판',
        '지도 API',
        '팝업 관리',
        '다국어 페이지',
        '추가 CMS',
        '유지관리',
        '콘텐츠 작성 지원',
      ),
      'notes' => array(
        '제작 기간은 자료 전달과 피드백 일정에 따라 달라질 수 있습니다.',
        '기본 구조를 크게 변경하면 맞춤 제작 범위로 전환될 수 있습니다.',
        '외부 유료 라이선스 비용은 별도일 수 있습니다.',
        '검색 순위와 AI 추천 또는 인용을 보장하지 않습니다.',
        '최종 범위는 견적서에서 확정합니다.',
      ),
      'cta_title' => "STANDARD PACKAGE가\n내 프로젝트에 맞는지 궁금한가요?",
      'cta_description' => "현재 준비 상태와 필요한 범위를 알려주시면\n적합한 제작 방식부터 안내합니다.",
      'cta_primary' => 'STANDARD PACKAGE 문의하기',
      'cta_primary_href' => tenfold_url('contact') . '?package=standard',
      'cta_secondary' => '다른 패키지 비교하기',
      'cta_secondary_href' => tenfold_url('services'),
      'comparison' => array(
        '제작 방식' => '기본 구조 커스터마이징',
        '기획 범위' => '준비된 구조에 콘텐츠·브랜드 반영',
        '디자인 방식' => '기본 UI 커스터마이징',
        '페이지 구성' => '메인 + 기본 서브페이지',
        'CMS' => '필요한 기본 수정 영역',
        '제작 기간' => '최대 2주',
        '비용' => '40만원부터',
        '추천 대상' => '빠른 오픈·명확한 정보 전달이 중요한 경우',
      ),
    ),
    'custom' => array(
      'slug' => 'custom',
      'eyebrow' => 'PACKAGE 02',
      'name' => 'CUSTOM PACKAGE',
      'headline' => "정해진 틀 없이,\n프로젝트에 맞게 처음부터.",
      'description' => "사업의 목적과 콘텐츠 구조를 먼저 정리하고,\n브랜드에 맞는 화면과 사용자 흐름을 새롭게 설계합니다.\n\n단순한 화면 제작을 넘어\n사이트가 무엇을 전달하고 어떻게 작동해야 하는지까지\n프로젝트에 맞게 설계합니다.",
      'summary' => array(
        array('label' => '제작 기간', 'value' => '최대 4주'),
        array('label' => '제작 비용', 'value' => '90만원부터'),
        array('label' => '제작 방식', 'value' => '기획·디자인 맞춤 제작'),
      ),
      'card_headline' => "정해진 틀 없이,\n프로젝트에 맞게 처음부터.",
      'card_description' => '사업의 목적과 콘텐츠 구조를 정리한 뒤 브랜드에 맞는 화면과 사용자 흐름을 새롭게 설계합니다.',
      'card_meta' => array('최대 4주', '90만원부터', '기획·디자인 맞춤 제작'),
      'recommended' => array(
        '브랜드만의 차별화된 웹사이트가 필요한 경우',
        '기존 사이트를 새롭게 리뉴얼하는 경우',
        '메뉴와 콘텐츠 구조부터 정리가 필요한 경우',
        '맞춤 기능이나 CMS 구성이 필요한 경우',
      ),
      'included' => array(
        'Planning' => array(
          '프로젝트 요구사항 정리',
          '사용자와 핵심 행동 정의',
          '메뉴와 페이지 구조 설계',
          '콘텐츠 우선순위 정리',
        ),
        'Design' => array(
          '프로젝트 맞춤 UI 디자인',
          '브랜드 컬러와 이미지 방향',
          '모바일·태블릿·PC 화면 설계',
          '주요 인터랙션 설계',
        ),
        'Build' => array(
          '반응형 웹 구축',
          '프로젝트별 CMS',
          '문의·게시판·필요 기능 연동',
          '개발 QA와 오픈 지원',
        ),
        'Foundation' => array(
          '페이지별 Title과 Meta 기본 설정',
          'Sitemap과 robots 기본 설정',
          '기본 포털 검색 등록 지원',
          '검색과 AI 이해를 고려한 콘텐츠 구조',
        ),
      ),
      'process' => array(
        array('index' => '01', 'title' => '프로젝트 상담'),
        array('index' => '02', 'title' => '구조와 콘텐츠 설계'),
        array('index' => '03', 'title' => 'UX·UI 디자인'),
        array('index' => '04', 'title' => '웹사이트 구축'),
        array('index' => '05', 'title' => '검수 및 오픈'),
      ),
      'preparation' => array(
        '사업 목표와 핵심 사용자',
        '참고 사이트 또는 브랜드 자료',
        '필요한 페이지·기능 범위',
        '기존 사이트 정보(리뉴얼 시)',
        '로고·이미지·원고 현황',
        '운영·수정이 필요한 영역',
      ),
      'preparation_note' => '자료가 모두 준비되지 않아도 괜찮습니다. 상담에서 필요한 범위부터 정리할 수 있습니다.',
      'addons' => array(
        '추가 페이지',
        '게시판과 공지사항',
        '지도 API',
        '다국어 페이지',
        '팝업 관리',
        '추가 CMS',
        '콘텐츠 작성 지원',
        '유지관리',
        '포털 검색 등록 지원',
      ),
      'notes' => array(
        '제작 기간은 자료 전달과 피드백 일정에 따라 달라질 수 있습니다.',
        '맞춤 기능 범위에 따라 일정과 비용이 조정될 수 있습니다.',
        '외부 유료 라이선스 비용은 별도일 수 있습니다.',
        '검색 순위와 AI 추천 또는 인용을 보장하지 않습니다.',
        '최종 범위는 견적서에서 확정합니다.',
      ),
      'cta_title' => "프로젝트에 맞는 구조부터\n새롭게 설계해 보세요.",
      'cta_description' => "현재 준비 상태와 필요한 범위를 알려주시면\n맞춤 제작 방향을 안내합니다.",
      'cta_primary' => 'CUSTOM PACKAGE 문의하기',
      'cta_primary_href' => tenfold_url('contact') . '?package=custom',
      'cta_secondary' => '다른 패키지 비교하기',
      'cta_secondary_href' => tenfold_url('services'),
      'comparison' => array(
        '제작 방식' => '기획·디자인 맞춤 제작',
        '기획 범위' => '목적·사용자·콘텐츠 구조부터 설계',
        '디자인 방식' => '프로젝트 맞춤 UI 디자인',
        '페이지 구성' => '프로젝트에 맞게 구성',
        'CMS' => '프로젝트별 CMS 구성',
        '제작 기간' => '최대 4주',
        '비용' => '90만원부터',
        '추천 대상' => '차별화·리뉴얼·구조 설계가 필요한 경우',
      ),
    ),
  );
}

/**
 * @param string $slug
 * @return array<string, mixed>|null
 */
function tenfold_get_package($slug) {
  $packages = tenfold_packages();
  return isset($packages[$slug]) ? $packages[$slug] : null;
}

/**
 * @return array<int, string>
 */
function tenfold_common_foundation() {
  return array(
    '모바일·태블릿·PC 반응형',
    '기본 CMS 수정 영역',
    '기본 문의 기능',
    '검색엔진이 이해하기 쉬운 HTML 구조',
    '페이지별 Title과 Meta 기본 설정',
    'Sitemap과 robots 기본 설정',
    '기본 접근성 점검',
    '브라우저와 기기 검수',
    '오픈 지원',
  );
}

/**
 * @return array<int, string>
 */
function tenfold_service_addons() {
  return array(
    '추가 페이지',
    '게시판과 공지사항',
    '지도 API',
    '다국어 페이지',
    '팝업 관리',
    '추가 CMS',
    '콘텐츠 작성 지원',
    '유지관리',
    '포털 검색 등록 지원',
  );
}

/**
 * @return array<int, string>
 */
function tenfold_comparison_keys() {
  return array(
    '제작 방식',
    '기획 범위',
    '디자인 방식',
    '페이지 구성',
    'CMS',
    '제작 기간',
    '비용',
    '추천 대상',
  );
}
