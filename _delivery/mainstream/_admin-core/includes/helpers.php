<?php

function cms_h($value)
{
  return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function admin_url($file)
{
  $base = $GLOBALS['cms_admin_base'] ?? '';

  if ($base === '' || $base === '.') {
    $scriptName = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '');
    $base = rtrim(dirname($scriptName), '/');
  }

  return $base . '/' . ltrim($file, '/');
}

function site_url($file = 'index.html')
{
  $base = $GLOBALS['cms_site_base'] ?? '';

  if ($base === '' || $base === '.') {
    $base = rtrim(dirname(admin_url('index.php')), '/');
  }

  return $base . '/' . ltrim($file, '/');
}

function cms_redirect($path)
{
  if ($path !== '' && $path[0] !== '/' && strpos($path, '://') === false) {
    $path = admin_url($path);
  }

  header('Location: ' . $path);
  exit;
}

function cms_flash_set($key, $message)
{
  $_SESSION['cms_flash'][$key] = $message;
}

function cms_flash_get($key)
{
  if (empty($_SESSION['cms_flash'][$key])) {
    return '';
  }

  $message = $_SESSION['cms_flash'][$key];
  unset($_SESSION['cms_flash'][$key]);

  return $message;
}

function cms_load_config($adminDir)
{
  $sample = $adminDir . '/config.sample.php';
  $configFile = $adminDir . '/config.php';

  if (is_file($configFile)) {
    $config = require $configFile;

    if (!is_array($config)) {
      throw new RuntimeException('config.php가 배열을 반환해야 합니다.');
    }

    return $config;
  }

  if (is_file($sample)) {
    return require $sample;
  }

  throw new RuntimeException('config.php 또는 config.sample.php가 없습니다.');
}

function cms_admin_core_path($adminDir)
{
  $localCore = dirname($adminDir) . '/_admin-core';

  if (is_dir($localCore)) {
    return $localCore;
  }

  return dirname($adminDir, 2) . '/_admin-core';
}

function cms_admin_core_url($adminDir)
{
  $localCore = dirname($adminDir) . '/_admin-core';

  if (is_dir($localCore)) {
    return '../_admin-core';
  }

  return '../../_admin-core';
}

function cms_bootstrap($adminDir)
{
  $coreIncludes = dirname($adminDir, 2) . '/_admin-core/includes';

  require_once $coreIncludes . '/bootstrap.php';
  require_once $coreIncludes . '/auth.php';
  require_once $coreIncludes . '/db.php';
  require_once $coreIncludes . '/upload.php';

  $config = cms_load_config($adminDir);
  $pdo = null;

  try {
    $pdo = cms_pdo($config);
  } catch (Throwable $e) {
    $pdo = null;
  }

  return [$config, $pdo];
}
