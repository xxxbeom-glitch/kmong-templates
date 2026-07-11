<?php

if (session_status() === PHP_SESSION_NONE) {
  $cookiePath = '/';

  if (!empty($_SERVER['SCRIPT_NAME'])) {
    $cookiePath = rtrim(dirname(str_replace('\\', '/', $_SERVER['SCRIPT_NAME'])), '/');

    if ($cookiePath === '' || $cookiePath === '.') {
      $cookiePath = '/';
    } else {
      $cookiePath .= '/';
    }
  }

  session_set_cookie_params([
    'lifetime' => 0,
    'path' => $cookiePath,
    'httponly' => true,
    'samesite' => 'Lax',
  ]);
  session_start();
}
