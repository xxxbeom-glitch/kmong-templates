<?php

if (!defined('ABSPATH')) {
  exit;
}

/**
 * @return array<int, array<string, mixed>>
 */
function tenfold_projects() {
  return array(
    array(
      'slug' => '365-green-dental',
      'title' => '365 초록바른치과',
      'category' => '헬스케어',
      'type' => 'Healthcare Website',
      'label' => 'Independent Project',
      'summary' => '신뢰와 정보 접근성을 중심으로 설계한 치과 웹사이트',
      'scope' => array('기획', 'UX/UI 디자인', '반응형 웹', 'WordPress'),
      'industry' => 'Dental / Healthcare',
      'platform' => 'WordPress',
      'status' => 'Independent Project',
      'graphic' => array('tone' => 'green', 'keyword' => 'CARE'),
      'hero_line' => '환자가 필요한 정보를 빠르게 찾고, 상담으로 이어지도록 설계했습니다.',
      'overview' => '지역 치과 홈페이지는 시술명 나열만으로는 신뢰를 만들기 어렵습니다. 방문 전 확인해야 할 진료 정보, 공간 분위기, 상담 경로를 한 흐름으로 정리하는 것이 핵심이었습니다. 주요 사용자는 초진을 고려하는 환자와 보호자이며, 모바일에서 짧은 시간에 진료 범위와 위치를 파악한 뒤 문의로 이동해야 합니다. 이에 정보 우선순위와 섹션 순서를 다시 잡고, WordPress로 운영 가능한 구조까지 맞춰 구축했습니다.',
      'challenges' => array(
        '진료·시설·상담 정보가 분산되어 첫 방문자가 무엇을 먼저 봐야 할지 불명확함',
        '의료 사이트에서 과한 마케팅 톤과 신뢰감 사이의 균형이 필요함',
        '모바일에서도 긴 스크롤 없이 핵심 행동(문의·위치 확인)에 도달해야 함',
      ),
      'direction' => array(
        '정보 구조' => '진료 소개 → 강점 → 공간 → 상담 흐름으로 우선순위를 재배치했습니다.',
        '사용자 흐름' => '모바일 첫 화면에서 브랜드 인상과 핵심 CTA를 동시에 읽히게 구성했습니다.',
        '브랜드 인상' => '차분한 톤과 충분한 여백으로 전문적이면서 부담 없는 인상을 목표로 했습니다.',
        '모바일 기준' => '긴 문단보다 짧은 블록과 명확한 섹션 구분으로 스크롤 피로를 줄였습니다.',
      ),
      'screens' => array('Home', 'About', 'Treatment', 'Contact'),
    ),
    array(
      'slug' => 'nock-study-lounge',
      'title' => 'NOCK Study Lounge',
      'category' => '공간·라이프스타일',
      'type' => 'Space Brand Website',
      'label' => 'Concept Project',
      'summary' => '공간의 분위기와 이용 경험을 담은 스터디라운지 웹사이트',
      'scope' => array('브랜드 기획', 'UX/UI 디자인', '반응형 웹'),
      'industry' => 'Space / Lifestyle',
      'platform' => 'Responsive Web',
      'status' => 'Concept Project',
      'graphic' => array('tone' => 'ink', 'keyword' => 'FOCUS'),
      'hero_line' => '공간이 주는 집중감과 이용 방식을 웹에서도 같은 리듬으로 전달합니다.',
      'overview' => '스터디라운지 사이트는 좌석 요금표만으로는 차별화가 어렵습니다. 방문 전 사용자가 확인하고 싶은 것은 분위기, 이용 규칙, 좌석·시설의 실제 감각입니다. 이 프로젝트는 공간 브랜드의 톤을 유지하면서도, 예약·방문 결정을 돕는 정보 구조를 설계하는 데 초점을 맞췄습니다. 주요 사용자는 장시간 집중이 필요한 학생과 직장인이며, 모바일에서 빠르게 분위기와 이용 방식을 이해해야 합니다.',
      'challenges' => array(
        '공간 사진만으로는 이용 경험이 충분히 전달되지 않음',
        '요금·좌석·규칙 정보가 분산되면 방문 결정이 늦어짐',
        '브랜드 감성과 실용 정보 사이의 위계를 맞춰야 함',
      ),
      'direction' => array(
        '정보 구조' => '브랜드 인상 → 공간 경험 → 이용 안내 → 문의 순으로 구성했습니다.',
        '사용자 흐름' => '첫인상 이후 바로 좌석·시설·이용 방식을 확인할 수 있게 했습니다.',
        '브랜드 인상' => '절제된 타이포와 대비로 집중·정돈된 공간감을 표현했습니다.',
        '모바일 기준' => '이미지와 짧은 카피를 교차해 스크롤 리듬을 만들었습니다.',
      ),
      'screens' => array('Home', 'Space', 'Guide', 'Contact'),
    ),
    array(
      'slug' => 'you-and-jin-pilates',
      'title' => '유앤진 필라테스',
      'category' => '공간·라이프스타일',
      'type' => 'Wellness Brand Website',
      'label' => 'Concept Project',
      'summary' => '전문성과 편안한 인상을 함께 설계한 필라테스 웹사이트',
      'scope' => array('브랜드 기획', 'UX/UI 디자인', '반응형 웹'),
      'industry' => 'Wellness / Fitness',
      'platform' => 'Responsive Web',
      'status' => 'Concept Project',
      'graphic' => array('tone' => 'warm', 'keyword' => 'MOVE'),
      'hero_line' => '전문성과 편안함이 함께 읽히는 웰니스 브랜드 웹사이트입니다.',
      'overview' => '필라테스 스튜디오 사이트는 프로그램 나열만으로는 상담 전환이 약합니다. 초진 사용자는 강사·수업 방식·공간 분위기·예약 방법을 짧은 시간에 파악하려 합니다. 이 프로젝트는 전문성과 부드러운 인상 사이의 균형을 잡고, 상담·문의로 자연스럽게 이어지는 흐름을 설계했습니다.',
      'challenges' => array(
        '전문 용어 중심 구성이 초진 사용자에게 거리감을 줄 수 있음',
        '수업·강사·공간 정보가 분리되면 브랜드 인상이 약해짐',
        '모바일에서 문의 CTA가 묻히지 않도록 배치가 필요함',
      ),
      'direction' => array(
        '정보 구조' => '브랜드 → 프로그램 → 강사/공간 → 문의로 단순화했습니다.',
        '사용자 흐름' => '관심 프로그램 확인 후 바로 상담으로 이동할 수 있게 했습니다.',
        '브랜드 인상' => '부드러운 톤과 정돈된 타이포로 전문적이면서 편안한 인상을 만들었습니다.',
        '모바일 기준' => '카드 남용 없이 섹션 여백과 대비로 위계를 잡았습니다.',
      ),
      'screens' => array('Home', 'Program', 'Studio', 'Contact'),
    ),
    array(
      'slug' => 'hyundai-redesign',
      'title' => '현대건설 웹사이트 리디자인',
      'category' => '기업',
      'type' => 'Corporate Website',
      'label' => 'Redesign Study',
      'summary' => '사업 영역과 프로젝트의 규모감을 재구성한 기업 웹사이트 스터디',
      'scope' => array('UX 전략', 'UI 디자인', '반응형 콘셉트'),
      'industry' => 'Construction / Corporate',
      'platform' => 'Concept',
      'status' => 'Redesign Study',
      'graphic' => array('tone' => 'steel', 'keyword' => 'SCALE'),
      'hero_line' => '사업 규모와 프로젝트 포트폴리오가 한눈에 읽히도록 구조를 재배치한 스터디입니다.',
      'overview' => '대형 건설사 사이트는 정보량이 많아 메뉴와 섹션이 쉽게 무거워집니다. 이 리디자인 스터디는 공식 의뢰가 아닌 포트폴리오 목적의 콘셉트 작업으로, 사업 영역·프로젝트·기업 메시지의 우선순위를 다시 정리하는 데 초점을 맞췄습니다. 목표는 규모감은 유지하면서도 모바일에서 핵심 스토리가 끊기지 않게 하는 것입니다.',
      'challenges' => array(
        '방대한 사업·프로젝트 정보를 과도한 depth 없이 정리해야 함',
        '기업 신뢰감과 현대적 UI 사이의 균형을 맞춰야 함',
        '데스크톱 중심 구조를 모바일 스크롤 경험으로 재해석해야 함',
      ),
      'direction' => array(
        '정보 구조' => '핵심 메시지 → 사업 영역 → 대표 프로젝트 → 기업 정보 순으로 단순화했습니다.',
        '사용자 흐름' => '관심 사업 영역에서 관련 프로젝트로 바로 이어지게 설계했습니다.',
        '브랜드 인상' => '강한 대비와 넓은 여백으로 규모감과 정돈된 인상을 동시에 표현했습니다.',
        '모바일 기준' => '다단 레이아웃을 세로 스택으로 재구성하되, 타이포 위계는 유지했습니다.',
      ),
      'screens' => array('Home', 'Business', 'Projects', 'About'),
    ),
    array(
      'slug' => 'sk-hynix-redesign',
      'title' => 'SK하이닉스 웹사이트 리디자인',
      'category' => '기업',
      'type' => 'Technology Brand Website',
      'label' => 'Redesign Study',
      'summary' => '기술과 브랜드 메시지를 시각적으로 재구성한 웹사이트 스터디',
      'scope' => array('콘텐츠 구조', 'UI 디자인', '반응형 콘셉트'),
      'industry' => 'Semiconductor / Technology',
      'platform' => 'Concept',
      'status' => 'Redesign Study',
      'graphic' => array('tone' => 'blue', 'keyword' => 'TECH'),
      'hero_line' => '기술 메시지를 더 명확한 계층과 시각 리듬으로 재구성한 스터디입니다.',
      'overview' => '기술 기업 사이트는 전문 용어와 뉴스성 콘텐츠가 많아 브랜드 메시지가 분산되기 쉽습니다. 이 리디자인 스터디는 공식 의뢰가 아닌 콘셉트 작업이며, 기술·제품·지속가능 메시지를 사용자가 이해하기 쉬운 순서로 재배치하는 데 초점을 맞췄습니다.',
      'challenges' => array(
        '복잡한 기술 콘텐츠를 비전문가도 따라갈 수 있게 계층화해야 함',
        '브랜드 메시지와 제품/뉴스 정보의 충돌을 줄여야 함',
        '시각적 임팩트와 정보 가독성의 균형을 맞춰야 함',
      ),
      'direction' => array(
        '정보 구조' => '브랜드 메시지 → 핵심 기술 → 제품/사업 → 뉴스성 콘텐츠 순으로 정리했습니다.',
        '사용자 흐름' => '관심 주제에 빠르게 진입할 수 있도록 명확한 섹션 진입점을 두었습니다.',
        '브랜드 인상' => '절제된 컬러와 큰 타이포로 기술 브랜드의 정밀함과 신뢰감을 표현했습니다.',
        '모바일 기준' => '히어로와 핵심 메시지를 먼저 읽고, 상세 정보는 아래로 확장되게 구성했습니다.',
      ),
      'screens' => array('Home', 'Technology', 'Products', 'News'),
    ),
  );
}

/**
 * @param string $slug
 * @return array<string, mixed>|null
 */
function tenfold_get_project($slug) {
  foreach (tenfold_projects() as $project) {
    if ($project['slug'] === $slug) {
      return $project;
    }
  }
  return null;
}

/**
 * @param string $slug
 * @return array<string, mixed>|null
 */
function tenfold_next_project($slug) {
  $projects = tenfold_projects();
  $count = count($projects);
  for ($i = 0; $i < $count; $i++) {
    if ($projects[$i]['slug'] === $slug) {
      return $projects[($i + 1) % $count];
    }
  }
  return null;
}

/**
 * @return string[]
 */
function tenfold_project_filters() {
  return array('전체', '헬스케어', '브랜드', '기업', '공간·라이프스타일');
}
