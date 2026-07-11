<?php

return [
  'template_slug' => 'mainstream',
  // Cafe24: 카페24 DB 정보 입력. db_create 는 false 유지.
  'db_host' => 'localhost',
  'db_name' => 'seongb8',
  'db_user' => 'seongb8',
  'db_pass' => 'DB비밀번호',
  'db_create' => false,
  // Laragon 로컬: db_host 127.0.0.1, db_name kmong_mainstream, db_user root, db_pass '', db_create true
  'upload_dir' => dirname(__DIR__) . '/assets/images/uploads',
  'upload_url' => 'assets/images/uploads',
];
