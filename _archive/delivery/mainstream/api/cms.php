<?php

header('Content-Type: application/json; charset=utf-8');

$adminDir = dirname(__DIR__) . '/admin';
$localCore = dirname($adminDir) . '/_admin-core';
$coreDir = is_dir($localCore) ? $localCore : dirname($adminDir, 2) . '/_admin-core';
$coreIncludes = $coreDir . '/includes';

require_once $coreIncludes . '/bootstrap.php';
require_once $coreIncludes . '/helpers.php';
require_once $coreIncludes . '/db.php';
require_once $coreIncludes . '/seed.php';

$config = cms_load_config($adminDir);

try {
  $pdo = cms_pdo($config);
  $payload = cms_public_payload($pdo, $config['template_slug']);

  echo json_encode([
    'ok' => true,
    'data' => $payload,
  ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $e) {
  http_response_code(503);
  echo json_encode([
    'ok' => false,
    'error' => 'cms_unavailable',
  ], JSON_UNESCAPED_UNICODE);
}
