<?php

require __DIR__ . '/_init.php';
require __DIR__ . '/_layout.php';

admin_require_login('login.php');

$error = '';
$success = '';

if (!$pdo instanceof PDO) {
  admin_layout_start('Story', 'story');
  echo '<div class="admin-card"><div class="admin-alert admin-alert--error">DB 연결 후 이용하세요. <a href="' . cms_h(admin_url('install.php')) . '">install.php</a></div></div>';
  admin_layout_end();
  exit;
}

$slug = $config['template_slug'];

if (!cms_tables_ready($pdo)) {
  admin_layout_start('Story', 'story');
  echo '<div class="admin-card"><div class="admin-alert admin-alert--error">DB 테이블이 없습니다. <a href="' . cms_h(admin_url('install.php')) . '">install.php</a>에서 설치를 먼저 실행하세요.</div></div>';
  admin_layout_end();
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = isset($_POST['action']) ? $_POST['action'] : 'save';

  if ($action === 'delete_card') {
    $cardId = (int) (isset($_POST['card_id']) ? $_POST['card_id'] : 0);

    if (!cms_deactivate_story_card($pdo, $slug, $cardId)) {
      $error = '카드는 최소 2개를 유지해야 합니다.';
    } else {
      $success = 'Story 카드를 숨겼습니다.';
    }
  } else {
    $storyTitle = trim(isset($_POST['story_title']) ? $_POST['story_title'] : '');
    $storyDesc = trim(isset($_POST['story_desc']) ? $_POST['story_desc'] : '');

    if ($storyTitle === '' || $storyDesc === '') {
      $error = '섹션 제목과 설명을 입력해 주세요.';
    } else {
      $saved = cms_set_field($pdo, $slug, 'story', 'title', $storyTitle)
        && cms_set_field($pdo, $slug, 'story', 'desc', $storyDesc);

      $cards = cms_get_story_cards($pdo, $slug);

      foreach ($cards as $card) {
        $cardId = (int) $card['id'];
        $title = trim(isset($_POST['card_title'][$cardId]) ? $_POST['card_title'][$cardId] : '');
        $description = trim(isset($_POST['card_desc'][$cardId]) ? $_POST['card_desc'][$cardId] : '');

        if ($title === '' || $description === '') {
          $error = '모든 카드의 제목·설명을 입력해 주세요.';
          $saved = false;
          break;
        }

        $imagePath = null;
        $fileKey = 'card_image_' . $cardId;

        if (!empty($_FILES[$fileKey]['tmp_name'])) {
          $upload = cms_upload_image($_FILES[$fileKey], $config, 'story-' . $cardId);

          if (!$upload['ok']) {
            $error = $upload['error'];
            $saved = false;
            break;
          }

          $imagePath = $upload['path'];
        }

        if (!cms_update_story_card($pdo, $slug, $cardId, $title, $description, $imagePath)) {
          $error = cms_db_error_message('Story 카드 저장에 실패했습니다.');
          $saved = false;
          break;
        }
      }

      if ($saved && $error === '') {
        $success = 'Story 내용을 저장했습니다.';
      } elseif ($error === '') {
        $error = cms_db_error_message('DB 저장에 실패했습니다. install.php를 다시 실행해 보세요.');
      }
    }
  }
}

$storyTitle = cms_get_field($pdo, $slug, 'story', 'title', '우리의 기준을 소개합니다');
$storyDesc = cms_get_field(
  $pdo,
  $slug,
  'story',
  'desc',
  '루모는 비즈니스의 본질을 더 분명하게 만들기 위해 전략, 구조, 실행의 흐름을 함께 설계합니다.'
);
$cards = cms_get_story_cards($pdo, $slug);
$activeCount = cms_count_active_story_cards($pdo, $slug);

admin_layout_start('Story', 'story');
?>
<div class="admin-card">
  <h1 class="admin-title">Story</h1>
  <p class="admin-desc">섹션 문구와 카드 내용을 수정합니다. 카드 추가는 불가하며, 삭제는 최대 1개(최소 2개 유지)입니다.</p>

  <?php if ($success !== '') : ?>
    <div class="admin-alert admin-alert--success"><?php echo cms_h($success); ?></div>
  <?php endif; ?>

  <?php if ($error !== '') : ?>
    <div class="admin-alert admin-alert--error"><?php echo cms_h($error); ?></div>
  <?php endif; ?>

  <?php if (count($cards) === 0) : ?>
    <div class="admin-alert admin-alert--error">Story 카드 데이터가 없습니다. <a href="<?php echo cms_h(admin_url('install.php')); ?>">install.php</a>를 실행하세요.</div>
  <?php else : ?>
    <form method="post" action="<?php echo cms_h(admin_url('story.php')); ?>" enctype="multipart/form-data">
      <input type="hidden" name="action" value="save">

      <div class="admin-field">
        <label for="story_title">섹션 제목</label>
        <input type="text" id="story_title" name="story_title" value="<?php echo cms_h($storyTitle); ?>" required>
      </div>
      <div class="admin-field">
        <label for="story_desc">섹션 설명</label>
        <textarea id="story_desc" name="story_desc" required><?php echo cms_h($storyDesc); ?></textarea>
      </div>

      <?php foreach ($cards as $index => $card) : ?>
        <?php $cardId = (int) $card['id']; ?>
        <div class="admin-story-card">
          <h2>카드 <?php echo $index + 1; ?></h2>
          <div class="admin-field">
            <label for="card_title_<?php echo $cardId; ?>">카드 제목</label>
            <input
              type="text"
              id="card_title_<?php echo $cardId; ?>"
              name="card_title[<?php echo $cardId; ?>]"
              value="<?php echo cms_h($card['title']); ?>"
              required
            >
          </div>
          <div class="admin-field">
            <label for="card_desc_<?php echo $cardId; ?>">카드 설명</label>
            <textarea id="card_desc_<?php echo $cardId; ?>" name="card_desc[<?php echo $cardId; ?>]" required><?php echo cms_h($card['description']); ?></textarea>
          </div>
          <div class="admin-field">
            <label for="card_image_<?php echo $cardId; ?>">카드 이미지</label>
            <img class="admin-preview" src="<?php echo cms_h(site_url($card['image_path'])); ?>" alt="">
            <input type="file" id="card_image_<?php echo $cardId; ?>" name="card_image_<?php echo $cardId; ?>" accept="image/jpeg,image/png,image/webp">
          </div>
        </div>
      <?php endforeach; ?>

      <div class="admin-actions">
        <button type="submit" class="admin-btn">저장</button>
        <a class="admin-btn admin-btn--ghost" href="<?php echo cms_h(admin_url('index.php')); ?>">취소</a>
      </div>
    </form>

    <?php if ($activeCount > 2) : ?>
      <?php foreach ($cards as $index => $card) : ?>
        <?php $cardId = (int) $card['id']; ?>
        <div class="admin-story-card">
          <form method="post" action="<?php echo cms_h(admin_url('story.php')); ?>" onsubmit="return confirm('카드 <?php echo $index + 1; ?>을(를) 숨기시겠습니까?');">
            <input type="hidden" name="action" value="delete_card">
            <input type="hidden" name="card_id" value="<?php echo $cardId; ?>">
            <button type="submit" class="admin-btn admin-btn--danger">카드 <?php echo $index + 1; ?> 숨기기</button>
          </form>
        </div>
      <?php endforeach; ?>
    <?php endif; ?>
  <?php endif; ?>
</div>
<?php
admin_layout_end();
