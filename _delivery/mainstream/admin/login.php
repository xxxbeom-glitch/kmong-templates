<?php

require __DIR__ . '/_init.php';

$error = '';
$localCore = dirname($adminDir) . '/_admin-core';
$coreUrl = is_dir($localCore) ? '../_admin-core' : '../../_admin-core';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = trim($_POST['username'] ?? '');
  $password = trim($_POST['password'] ?? '');

  if (admin_attempt_login($username, $password)) {
    cms_redirect('index.php');
  }

  $error = '로그인에 실패했습니다.';
}

if (admin_is_logged_in()) {
  cms_redirect('index.php');
}
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>관리자 로그인 · LUMO</title>
  <link rel="stylesheet" href="<?php echo cms_h($coreUrl); ?>/assets/admin.css">
</head>
<body>
  <div class="admin-login">
    <div class="admin-card" style="width:100%;max-width:420px;">
      <h1 class="admin-title">LUMO 관리자</h1>
      <p class="admin-desc">1차 버전: 아무 아이디·비밀번호로 로그인할 수 있습니다.</p>
      <?php if ($error !== '') : ?>
        <div class="admin-alert admin-alert--error"><?php echo cms_h($error); ?></div>
      <?php endif; ?>
      <form method="post" action="<?php echo cms_h(admin_url('login.php')); ?>">
        <div class="admin-field">
          <label for="username">아이디</label>
          <input type="text" id="username" name="username" autocomplete="username">
        </div>
        <div class="admin-field">
          <label for="password">비밀번호</label>
          <input type="password" id="password" name="password" autocomplete="current-password">
        </div>
        <div class="admin-actions">
          <button type="submit" class="admin-btn">로그인</button>
        </div>
      </form>
    </div>
  </div>
</body>
</html>
