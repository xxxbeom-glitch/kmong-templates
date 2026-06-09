<?php

function cms_seed_mainstream($pdo, $slug)
{
  $heroFields = [
    'label' => 'LUMO BUSINESS SOLUTION',
    'title' => "좋은 선택은<br>명확한 구조에서 시작됩니다",
    'desc' => "루모는 복잡한 비즈니스 과정을 더 단순하게 정리하고,<br class=\"hero__desc-br\">필요한 정보와 실행 흐름을 명확하게 설계합니다.",
    'image' => 'assets/images/hero-bg-01.jpg',
  ];

  foreach ($heroFields as $key => $value) {
    cms_set_field($pdo, $slug, 'hero', $key, $value);
  }

  cms_set_field($pdo, $slug, 'story', 'title', '우리의 기준을 소개합니다');
  cms_set_field(
    $pdo,
    $slug,
    'story',
    'desc',
    '루모는 비즈니스의 본질을 더 분명하게 만들기 위해 전략, 구조, 실행의 흐름을 함께 설계합니다.'
  );

  $stmt = $pdo->prepare('SELECT COUNT(*) AS cnt FROM cms_story_cards WHERE template_slug = :slug');
  $stmt->execute([':slug' => $slug]);
  $count = (int) $stmt->fetchColumn();

  if ($count > 0) {
    return;
  }

  $cards = [
    [
      'title' => '전략적 사고',
      'description' => '복잡한 상황 속에서도 우선순위를 명확하게 정리합니다.',
      'image_path' => 'assets/images/story-card-01.jpg',
    ],
    [
      'title' => '구조적 설계',
      'description' => '흐름이 끊기지 않도록 정보와 기능을 체계적으로 배치합니다.',
      'image_path' => 'assets/images/story-card-02.jpg',
    ],
    [
      'title' => '실행 중심',
      'description' => '아이디어에 머물지 않고 실제 결과로 이어질 수 있게 만듭니다.',
      'image_path' => 'assets/images/story-card-03.jpg',
    ],
  ];

  $insert = $pdo->prepare(
    'INSERT INTO cms_story_cards (template_slug, sort_order, title, description, image_path, is_active)
     VALUES (:slug, :sort_order, :title, :description, :image_path, 1)'
  );

  foreach ($cards as $index => $card) {
    $insert->execute([
      ':slug' => $slug,
      ':sort_order' => $index + 1,
      ':title' => $card['title'],
      ':description' => $card['description'],
      ':image_path' => $card['image_path'],
    ]);
  }
}

function cms_public_payload($pdo, $slug)
{
  return [
    'hero' => [
      'label' => cms_get_field($pdo, $slug, 'hero', 'label'),
      'title' => cms_get_field($pdo, $slug, 'hero', 'title'),
      'desc' => cms_get_field($pdo, $slug, 'hero', 'desc'),
      'image' => cms_get_field($pdo, $slug, 'hero', 'image'),
    ],
    'story' => [
      'title' => cms_get_field($pdo, $slug, 'story', 'title'),
      'desc' => cms_get_field($pdo, $slug, 'story', 'desc'),
    ],
    'storyCards' => cms_get_story_cards($pdo, $slug),
  ];
}
