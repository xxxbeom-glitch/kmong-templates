<?php

require_once __DIR__ . '/bootstrap.php';

function admin_is_logged_in()
{
  return !empty($_SESSION['admin_logged_in']);
}

/** 1차: 임의 입력으로 로그인 (추후 실 인증으로 교체) */
function admin_attempt_login($username, $password)
{
  $_SESSION['admin_logged_in'] = true;
  $_SESSION['admin_user'] = $username !== '' ? $username : 'admin';

  return true;
}

function admin_require_login($loginPath)
{
  if (!admin_is_logged_in()) {
    if (
      function_exists('admin_url') &&
      $loginPath !== '' &&
      $loginPath[0] !== '/' &&
      strpos($loginPath, '://') === false
    ) {
      $loginPath = admin_url($loginPath);
    }

    header('Location: ' . $loginPath);
    exit;
  }
}

function admin_logout()
{
  $_SESSION = [];

  if (session_status() === PHP_SESSION_ACTIVE) {
    session_destroy();
  }
}
