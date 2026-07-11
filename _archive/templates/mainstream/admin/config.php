<?php

if (is_file(__DIR__ . '/config.local.php')) {
  return require __DIR__ . '/config.local.php';
}

return require __DIR__ . '/config.sample.php';
