<?php

require __DIR__ . '/_init.php';
require __DIR__ . '/_layout.php';

admin_require_login('login.php');

$message = '';
$error = '';
$done = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  try {
    $dbName = $config['db_name'];
    $allowCreateDb = !empty($config['db_create']);

    if ($allowCreateDb) {
      $pdoInstall = new PDO(
        'mysql:host=' . $config['db_host'] . ';charset=utf8mb4',
        $config['db_user'],
        $config['db_pass'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
      );
      $pdoInstall->exec(
        'CREATE DATABASE IF NOT EXISTS `' . str_replace('`', '``', $dbName) . '` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci'
      );
      $pdoInstall->exec('USE `' . str_replace('`', '``', $dbName) . '`');
    } else {
      $pdoInstall = new PDO(
        'mysql:host=' . $config['db_host'] . ';dbname=' . $dbName . ';charset=utf8mb4',
        $config['db_user'],
        $config['db_pass'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
      );
    }

    $schema = file_get_contents(cms_admin_core_path($GLOBALS['cms_admin_dir']) . '/sql/schema.sql');

    if ($schema === false) {
      throw new RuntimeException('schema.sql을 읽을 수 없습니다.');
    }

    foreach (array_filter(array_map('trim', explode(';', $schema))) as $statement) {
      if ($statement !== '') {
        $pdoInstall->exec($statement);
      }
    }

    $pdo = cms_pdo($config);
    cms_seed_mainstream($pdo, $config['template_slug']);

    $uploadDir = $config['upload_dir'];

    if (!is_dir($uploadDir)) {
      mkdir($uploadDir, 0755, true);
    }

    $done = true;
    $message = 'DB 설치와 기본 데이터 입력이 완료되었습니다.';
  } catch (Throwable $e) {
    $error = '설치 실패: ' . $e->getMessage();
  }
}

admin_layout_start('DB 설치', 'home');
?>
<div class="admin-card">
  <h1 class="admin-title">DB 설치</h1>
  <p class="admin-desc">MySQL에 테이블을 만들고 기본 Hero·Story 데이터를 넣습니다. Cafe24는 DB를 먼저 만든 뒤 config.php만 맞추면 됩니다.</p>

  <?php if ($message !== '') : ?>
    <div class="admin-alert admin-alert--success"><?php echo cms_h($message); ?> <a href="<?php echo cms_h(admin_url('index.php')); ?>">대시보드로 이동</a></div>
  <?php endif; ?>

  <?php if ($error !== '') : ?>
    <div class="admin-alert admin-alert--error"><?php echo cms_h($error); ?></div>
  <?php endif; ?>

  <?php if (!$done) : ?>
    <p>config.php의 DB 정보: <strong><?php echo cms_h($config['db_host']); ?></strong> / <strong><?php echo cms_h($config['db_name']); ?></strong></p>
    <form method="post" action="<?php echo cms_h(admin_url('install.php')); ?>">
      <div class="admin-actions">
        <button type="submit" class="admin-btn">설치 실행</button>
      </div>
    </form>
  <?php endif; ?>
</div>
<?php
admin_layout_end();
