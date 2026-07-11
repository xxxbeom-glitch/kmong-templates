<?php

function cms_db_last_error()
{
  return isset($GLOBALS['cms_db_last_error']) ? (string) $GLOBALS['cms_db_last_error'] : '';
}

function cms_db_set_error($message)
{
  $GLOBALS['cms_db_last_error'] = (string) $message;
}

function cms_db_clear_error()
{
  $GLOBALS['cms_db_last_error'] = '';
}

function cms_pdo($config)
{
  static $key = null;
  static $pdo = null;

  $nextKey = md5(
    ($config['db_host'] ?? '') .
    ($config['db_name'] ?? '') .
    ($config['db_user'] ?? '')
  );

  if ($pdo instanceof PDO && $key === $nextKey) {
    return $pdo;
  }

  $dsn = 'mysql:host=' . $config['db_host'] . ';dbname=' . $config['db_name'] . ';charset=utf8mb4';

  $pdo = new PDO($dsn, $config['db_user'], $config['db_pass'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  ]);

  $key = $nextKey;

  return $pdo;
}

function cms_tables_ready($pdo)
{
  try {
    $stmt = $pdo->query("SHOW TABLES LIKE 'cms_content'");
    $content = $stmt->fetchColumn();
    $stmt = $pdo->query("SHOW TABLES LIKE 'cms_story_cards'");
    $story = $stmt->fetchColumn();

    return !empty($content) && !empty($story);
  } catch (Throwable $e) {
    return false;
  }
}

function cms_get_field($pdo, $slug, $section, $key, $default = '')
{
  try {
    $stmt = $pdo->prepare(
      'SELECT field_value FROM cms_content
       WHERE template_slug = :slug AND section = :section AND field_key = :key
       LIMIT 1'
    );
    $stmt->execute([
      ':slug' => $slug,
      ':section' => $section,
      ':key' => $key,
    ]);
    $row = $stmt->fetch();

    if (!$row) {
      return $default;
    }

    return $row['field_value'];
  } catch (Throwable $e) {
    return $default;
  }
}

function cms_set_field($pdo, $slug, $section, $key, $value)
{
  cms_db_clear_error();

  try {
    $check = $pdo->prepare(
      'SELECT id FROM cms_content
       WHERE template_slug = :slug AND section = :section AND field_key = :key
       LIMIT 1'
    );
    $check->execute([
      ':slug' => $slug,
      ':section' => $section,
      ':key' => $key,
    ]);
    $row = $check->fetch();

    if ($row) {
      $stmt = $pdo->prepare(
        'UPDATE cms_content
         SET field_value = :value, updated_at = CURRENT_TIMESTAMP
         WHERE id = :id'
      );
      $stmt->execute([
        ':value' => $value,
        ':id' => $row['id'],
      ]);
    } else {
      $stmt = $pdo->prepare(
        'INSERT INTO cms_content (template_slug, section, field_key, field_value)
         VALUES (:slug, :section, :key, :value)'
      );
      $stmt->execute([
        ':slug' => $slug,
        ':section' => $section,
        ':key' => $key,
        ':value' => $value,
      ]);
    }

    return true;
  } catch (Throwable $e) {
    cms_db_set_error($e->getMessage());

    return false;
  }
}

function cms_get_story_cards($pdo, $slug)
{
  try {
    $stmt = $pdo->prepare(
      'SELECT id, sort_order, title, description, image_path
       FROM cms_story_cards
       WHERE template_slug = :slug AND is_active = 1
       ORDER BY sort_order ASC'
    );
    $stmt->execute([':slug' => $slug]);

    return $stmt->fetchAll();
  } catch (Throwable $e) {
    return [];
  }
}

function cms_count_active_story_cards($pdo, $slug)
{
  try {
    $stmt = $pdo->prepare(
      'SELECT COUNT(*) AS cnt FROM cms_story_cards
       WHERE template_slug = :slug AND is_active = 1'
    );
    $stmt->execute([':slug' => $slug]);
    $row = $stmt->fetch();

    return (int) $row['cnt'];
  } catch (Throwable $e) {
    return 0;
  }
}

function cms_deactivate_story_card($pdo, $slug, $cardId)
{
  cms_db_clear_error();

  try {
    $active = cms_count_active_story_cards($pdo, $slug);

    if ($active <= 2) {
      return false;
    }

    $stmt = $pdo->prepare(
      'UPDATE cms_story_cards SET is_active = 0
       WHERE id = :id AND template_slug = :slug'
    );
    $stmt->execute([':id' => $cardId, ':slug' => $slug]);

    return $stmt->rowCount() > 0;
  } catch (Throwable $e) {
    cms_db_set_error($e->getMessage());

    return false;
  }
}

function cms_update_story_card($pdo, $slug, $cardId, $title, $description, $imagePath = null)
{
  cms_db_clear_error();

  try {
    if ($imagePath !== null && $imagePath !== '') {
      $stmt = $pdo->prepare(
        'UPDATE cms_story_cards
         SET title = :title, description = :description, image_path = :image_path
         WHERE id = :id AND template_slug = :slug AND is_active = 1'
      );
      $stmt->execute([
        ':title' => $title,
        ':description' => $description,
        ':image_path' => $imagePath,
        ':id' => $cardId,
        ':slug' => $slug,
      ]);

      return true;
    }

    $stmt = $pdo->prepare(
      'UPDATE cms_story_cards
       SET title = :title, description = :description
       WHERE id = :id AND template_slug = :slug AND is_active = 1'
    );
    $stmt->execute([
      ':title' => $title,
      ':description' => $description,
      ':id' => $cardId,
      ':slug' => $slug,
    ]);

    return true;
  } catch (Throwable $e) {
    cms_db_set_error($e->getMessage());

    return false;
  }
}

function cms_db_error_message($fallback)
{
  $detail = cms_db_last_error();

  if ($detail === '') {
    return $fallback;
  }

  return $fallback . ' (' . $detail . ')';
}
