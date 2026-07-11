<?php

require __DIR__ . '/_init.php';
require __DIR__ . '/_layout.php';

admin_require_login('login.php');

$flash = cms_flash_get('success');
$dbReady = admin_require_db($pdo);

admin_layout_start('대시보드', 'home');
?>
<div class="admin-card">
  <h1 class="admin-title">콘텐츠 관리</h1>
  <p class="admin-desc">Phase 1: Hero · Story 섹션만 수정할 수 있습니다.</p>

  <?php if ($flash !== '') : ?>
    <div class="admin-alert admin-alert--success"><?php echo cms_h($flash); ?></div>
  <?php endif; ?>

  <?php if (!$dbReady) : ?>
    <div class="admin-alert admin-alert--error">
      DB 연결 실패. <a href="<?php echo cms_h(admin_url('install.php')); ?>">install.php</a>에서 DB를 먼저 설정하세요.
    </div>
  <?php else : ?>
    <ul>
      <li><a href="<?php echo cms_h(admin_url('hero.php')); ?>">Hero — 메인 비주얼 문구·이미지</a></li>
      <li><a href="<?php echo cms_h(admin_url('story.php')); ?>">Story — 섹션 제목·카드(최소 2개)</a></li>
    </ul>
  <?php endif; ?>
</div>
<?php
admin_layout_end();
