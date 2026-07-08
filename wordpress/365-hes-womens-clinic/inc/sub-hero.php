<?php

function hes_womens_clinic_default_sub_hero() {
  return array(
    'title' => '여성의 건강을<br>가까운 일상에서 살핍니다',
    'desc' => '일상적인 여성질환부터 검진, 임신과 출산,<br>치료가 필요한 순간까지 함께합니다.',
  );
}

function hes_womens_clinic_merge_sub_hero($overrides = array()) {
  $defaults = hes_womens_clinic_default_sub_hero();
  $merged = array_merge($defaults, $overrides);

  if (isset($overrides['title']) && !isset($overrides['desc'])) {
    $merged['desc'] = '';
  }

  return $merged;
}

function hes_womens_clinic_build_sub_hero_breadcrumb($path) {
  $registry = hes_womens_clinic_page_registry();
  $items = array(
    array(
      'label' => '홈',
      'url' => home_url('/'),
    ),
  );

  if (!$path) {
    return $items;
  }

  if (preg_match('#^about/.+#', $path)) {
    $items[] = array(
      'label' => $registry['about'],
      'url' => home_url('/about/'),
    );
    return $items;
  }

  $parts = explode('/', $path);
  if (count($parts) === 1 && isset($registry[$path])) {
    $items[] = array(
      'label' => $registry[$path],
      'url' => '',
    );
    return $items;
  }

  $hub = $parts[0];
  if (isset($registry[$hub])) {
    $items[] = array(
      'label' => $registry[$hub],
      'url' => home_url('/' . $hub . '/'),
    );
  }

  return $items;
}
