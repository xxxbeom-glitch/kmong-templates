<?php

function cms_upload_image($file, $config, $prefix)
{
  if (empty($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])) {
    return ['ok' => false, 'error' => '업로드 파일이 없습니다.'];
  }

  if (!empty($file['error']) && $file['error'] !== UPLOAD_ERR_OK) {
    return ['ok' => false, 'error' => '업로드 중 오류가 발생했습니다. (코드 ' . (int) $file['error'] . ')'];
  }

  $maxBytes = 2 * 1024 * 1024;

  if ($file['size'] > $maxBytes) {
    return ['ok' => false, 'error' => '이미지는 2MB 이하만 가능합니다.'];
  }

  $mime = '';

  if (class_exists('finfo')) {
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = (string) $finfo->file($file['tmp_name']);
  } else {
    $mime = (string) mime_content_type($file['tmp_name']);
  }

  $allowed = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
  ];

  if (empty($allowed[$mime])) {
    return ['ok' => false, 'error' => 'jpg, png, webp만 업로드할 수 있습니다.'];
  }

  $uploadDir = rtrim($config['upload_dir'], '/\\');

  if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) {
    return ['ok' => false, 'error' => '업로드 폴더를 만들 수 없습니다.'];
  }

  $filename = $prefix . '-' . date('Ymd-His') . '-' . bin2hex(random_bytes(4)) . '.' . $allowed[$mime];
  $dest = $uploadDir . DIRECTORY_SEPARATOR . $filename;

  if (!move_uploaded_file($file['tmp_name'], $dest)) {
    return ['ok' => false, 'error' => '파일 저장에 실패했습니다. uploads 폴더 권한을 확인하세요.'];
  }

  $urlBase = rtrim($config['upload_url'], '/');

  return [
    'ok' => true,
    'path' => $urlBase . '/' . $filename,
  ];
}
