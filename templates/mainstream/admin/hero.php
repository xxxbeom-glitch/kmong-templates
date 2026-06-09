<?php

require __DIR__ . '/_init.php';
require __DIR__ . '/_layout.php';

admin_require_login('login.php');

$error = '';
$success = '';

if (!$pdo instanceof PDO) {
  admin_layout_start('Hero', 'hero');
  echo '<div class="admin-card"><div class="admin-alert admin-alert--error">DB 연결 후 이용하세요. <a href="' . cms_h(admin_url('install.php')) . '">install.php</a></div></div>';
  admin_layout_end();
  exit;
}

$slug = $config['template_slug'];

if (!cms_tables_ready($pdo)) {
  admin_layout_start('Hero', 'hero');
  echo '<div class="admin-card"><div class="admin-alert admin-alert--error">DB 테이블이 없습니다. <a href="' . cms_h(admin_url('install.php')) . '">install.php</a>에서 설치를 먼저 실행하세요.</div></div>';
  admin_layout_end();
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $label = trim(isset($_POST['label']) ? $_POST['label'] : '');
  $title = trim(isset($_POST['title']) ? $_POST['title'] : '');
  $desc = trim(isset($_POST['desc']) ? $_POST['desc'] : '');

  if ($label === '' || $title === '' || $desc === '') {
    $error = '텍스트 항목을 모두 입력해 주세요.';
  } else {
    $saved = cms_set_field($pdo, $slug, 'hero', 'label', $label)
      && cms_set_field($pdo, $slug, 'hero', 'title', $title)
      && cms_set_field($pdo, $slug, 'hero', 'desc', $desc);

    if (!empty($_FILES['image']['tmp_name'])) {
      $upload = cms_upload_image($_FILES['image'], $config, 'hero');

      if (!$upload['ok']) {
        $error = $upload['error'];
        $saved = false;
      } else {
        $saved = cms_set_field($pdo, $slug, 'hero', 'image', $upload['path']) && $saved;
      }
    }

    if ($saved && $error === '') {
      $success = 'Hero 내용을 저장했습니다.';
    } elseif ($error === '') {
      $error = cms_db_error_message('DB 저장에 실패했습니다. install.php를 다시 실행해 보세요.');
    }
  }
}

$label = cms_get_field($pdo, $slug, 'hero', 'label', 'LUMO BUSINESS SOLUTION');
$title = cms_get_field($pdo, $slug, 'hero', 'title', "좋은 선택은<br>명확한 구조에서 시작됩니다");
$desc = cms_get_field(
  $pdo,
  $slug,
  'hero',
  'desc',
  "루모는 복잡한 비즈니스 과정을 더 단순하게 정리하고,<br class=\"hero__desc-br\">필요한 정보와 실행 흐름을 명확하게 설계합니다."
);
$image = cms_get_field($pdo, $slug, 'hero', 'image', 'assets/images/hero-bg-01.jpg');

admin_layout_start('Hero', 'hero');
?>
<div class="admin-card">
  <h1 class="admin-title">Hero</h1>
  <p class="admin-desc">메인 비주얼 문구와 대표 이미지 1장을 수정합니다. 이미지는 3개 슬라이드에 동일하게 적용됩니다.</p>

  <?php if ($success !== '') : ?>
    <div class="admin-alert admin-alert--success"><?php echo cms_h($success); ?></div>
  <?php endif; ?>

  <?php if ($error !== '') : ?>
    <div class="admin-alert admin-alert--error"><?php echo cms_h($error); ?></div>
  <?php endif; ?>

  <form method="post" action="<?php echo cms_h(admin_url('hero.php')); ?>" enctype="multipart/form-data">
    <div class="admin-field">
      <label for="label">라벨</label>
      <input type="text" id="label" name="label" value="<?php echo cms_h($label); ?>" required>
    </div>
    <div class="admin-field">
      <label for="title">타이틀</label>
      <textarea id="title" name="title" required><?php echo cms_h($title); ?></textarea>
      <small>줄바꿈은 &lt;br&gt; 태그를 사용하세요.</small>
    </div>
    <div class="admin-field">
      <label for="desc">설명</label>
      <textarea id="desc" name="desc" required><?php echo cms_h($desc); ?></textarea>
      <small>모바일 줄바꿈은 &lt;br class="hero__desc-br"&gt; 형태를 유지하세요.</small>
    </div>
    <div class="admin-field">
      <label for="image">대표 이미지</label>
      <img class="admin-preview" src="<?php echo cms_h(site_url($image)); ?>" alt="">
      <input type="file" id="image" name="image" accept="image/jpeg,image/png,image/webp">
      <small>jpg · png · webp, 2MB 이하. 비워두면 기존 이미지를 유지합니다.</small>
    </div>
    <div class="admin-actions">
      <button type="submit" class="admin-btn">저장</button>
      <a class="admin-btn admin-btn--ghost" href="<?php echo cms_h(admin_url('index.php')); ?>">취소</a>
    </div>
  </form>
</div>
<?php
admin_layout_end();
