<?php

function admin_layout_start($title, $active = '')
{
  $adminDir = $GLOBALS['cms_admin_dir'] ?? __DIR__;
  $localCore = dirname($adminDir) . '/_admin-core';
  $coreUrl = is_dir($localCore) ? '../_admin-core' : '../../_admin-core';
  ?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo cms_h($title); ?> · LUMO 관리</title>
  <link rel="stylesheet" href="<?php echo cms_h($coreUrl); ?>/assets/admin.css">
</head>
<body>
  <div class="admin-wrap">
    <div class="admin-nav">
      <a href="<?php echo cms_h(admin_url('index.php')); ?>" class="<?php echo $active === 'home' ? 'is-active' : ''; ?>">대시보드</a>
      <a href="<?php echo cms_h(admin_url('hero.php')); ?>" class="<?php echo $active === 'hero' ? 'is-active' : ''; ?>">Hero</a>
      <a href="<?php echo cms_h(admin_url('story.php')); ?>" class="<?php echo $active === 'story' ? 'is-active' : ''; ?>">Story</a>
      <a href="<?php echo cms_h(site_url('index.html')); ?>" target="_blank" rel="noopener">사이트 보기</a>
      <a href="<?php echo cms_h(admin_url('logout.php')); ?>">로그아웃</a>
    </div>
  <?php
}

function admin_layout_end()
{
  ?>
  </div>
</body>
</html>
  <?php
}

function admin_require_db($pdo)
{
  if (!$pdo instanceof PDO) {
    return false;
  }

  return true;
}
