<?php

$adminDir = __DIR__;
$GLOBALS['cms_admin_dir'] = $adminDir;

$scriptName = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '');
$adminBase = rtrim(dirname($scriptName), '/');

if ($adminBase === '' || $adminBase === '.') {
  $adminBase = '/mainstream/admin';
}

$GLOBALS['cms_admin_base'] = $adminBase;
$GLOBALS['cms_site_base'] = rtrim(dirname($adminBase), '/');

$localCore = dirname($adminDir) . '/_admin-core';
$coreDir = is_dir($localCore) ? $localCore : dirname($adminDir, 2) . '/_admin-core';
$coreIncludes = $coreDir . '/includes';

require_once $coreIncludes . '/bootstrap.php';
require_once $coreIncludes . '/helpers.php';
require_once $coreIncludes . '/auth.php';
require_once $coreIncludes . '/db.php';
require_once $coreIncludes . '/upload.php';
require_once $coreIncludes . '/seed.php';

$config = cms_load_config($adminDir);
$pdo = null;

try {
  $pdo = cms_pdo($config);
} catch (Throwable $e) {
  $pdo = null;
}
