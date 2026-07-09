<?php

/**
 * Static pages — COMPANY / FACTORY / CUSTOMER / Legal (P2-3)
 */

function wonkangmetal_page_definitions() {
  return array(
    'company' => array(
      'title'    => 'COMPANY',
      'hub'      => true,
      'redirect' => 'company/overview',
    ),
    'company/overview' => array(
      'title'    => '회사개요',
      'section'  => 'COMPANY',
      'desc'     => '오랜 경험으로 검증된 기술과 품질을 제공합니다.',
      'group'    => 'company',
      'template' => 'original',
      'bg_class' => 'sub-hero--company',
    ),
    'company/ci' => array(
      'title'    => 'CI 소개',
      'section'  => 'COMPANY',
      'desc'     => '오랜 경험으로 검증된 기술과 품질을 제공합니다.',
      'group'    => 'company',
      'template' => 'original',
      'bg_class' => 'sub-hero--company',
    ),
    'company/partners' => array(
      'title'    => '비즈니스 파트너',
      'section'  => 'COMPANY',
      'desc'     => '오랜 경험으로 검증된 기술과 품질을 제공합니다.',
      'group'    => 'company',
      'template' => 'original',
      'bg_class' => 'sub-hero--company',
    ),
    'company/location' => array(
      'title'    => '찾아오시는 길',
      'section'  => 'COMPANY',
      'desc'     => '오랜 경험으로 검증된 기술과 품질을 제공합니다.',
      'group'    => 'company',
      'template' => 'original',
      'bg_class' => 'sub-hero--company',
    ),
    'factory' => array(
      'title'    => 'FACTORY',
      'hub'      => true,
      'redirect' => 'factory/process',
    ),
    'factory/process' => array(
      'title'    => '생산공정',
      'section'  => 'FACTORY',
      'desc'     => '첨단주조분석 시스템으로 최상의 제품 완성도를 구현합니다.',
      'group'    => 'factory',
      'template' => 'original',
      'bg_class' => 'sub-hero--factory',
    ),
    'factory/equipment' => array(
      'title'    => '생산설비',
      'section'  => 'FACTORY',
      'desc'     => '첨단주조분석 시스템으로 최상의 제품 완성도를 구현합니다.',
      'group'    => 'factory',
      'template' => 'original',
      'bg_class' => 'sub-hero--factory',
    ),
    'factory/technology' => array(
      'title'    => '핵심기술',
      'section'  => 'FACTORY',
      'desc'     => '첨단주조분석 시스템으로 최상의 제품 완성도를 구현합니다.',
      'group'    => 'factory',
      'template' => 'original',
      'bg_class' => 'sub-hero--factory',
    ),
    'factory/certificates' => array(
      'title'    => '인증서 현황',
      'section'  => 'FACTORY',
      'desc'     => '첨단주조분석 시스템으로 최상의 제품 완성도를 구현합니다.',
      'group'    => 'factory',
      'template' => 'original',
      'bg_class' => 'sub-hero--factory',
    ),
    'inquiry' => array(
      'title'    => '견적문의',
      'section'  => 'CUSTOMER',
      'desc'     => '빠른 피드백과 정확한 커뮤니케이션을 약속드립니다.',
      'group'    => 'customer',
      'template' => 'original',
      'bg_class' => 'sub-hero--inquiry',
    ),
    'contact' => array(
      'title'    => '컨택트',
      'section'  => 'CUSTOMER',
      'desc'     => '빠른 피드백과 정확한 커뮤니케이션을 약속드립니다.',
      'group'    => 'customer',
      'template' => 'original',
      'bg_class' => 'sub-hero--contact',
    ),
    'privacy-policy' => array(
      'title'    => '개인정보 취급방침',
      'section'  => 'LEGAL',
      'desc'     => '원강금속(주) 개인정보 처리 방침을 안내합니다.',
      'template' => 'original',
      'bg_class' => 'sub-hero--legal',
    ),
    'email-policy' => array(
      'title'    => '이메일 무단 수집거부',
      'section'  => 'LEGAL',
      'desc'     => '이메일 주소 무단 수집 거부 안내입니다.',
      'template' => 'original',
      'bg_class' => 'sub-hero--legal',
    ),
  );
}

function wonkangmetal_page_depth($path) {
  return substr_count($path, '/');
}

function wonkangmetal_page_spec($path) {
  $definitions = wonkangmetal_page_definitions();

  return isset($definitions[$path]) ? $definitions[$path] : null;
}

function wonkangmetal_get_page_path($post = null) {
  if (!$post) {
    $post = get_queried_object();
  }

  if (!$post || empty($post->post_name) || $post->post_type !== 'page') {
    return '';
  }

  $segments  = array($post->post_name);
  $parent_id = (int) $post->post_parent;

  while ($parent_id) {
    $parent = get_post($parent_id);
    if (!$parent) {
      break;
    }
    array_unshift($segments, $parent->post_name);
    $parent_id = (int) $parent->post_parent;
  }

  return implode('/', $segments);
}

function wonkangmetal_page_url($path) {
  $path = trim((string) $path, '/');

  if ($path === '') {
    return home_url('/');
  }

  $page = get_page_by_path($path);

  if ($page) {
    return get_permalink($page);
  }

  return home_url('/' . $path . '/');
}

function wonkangmetal_page_group_definitions($group) {
  $items = array();

  foreach (wonkangmetal_page_definitions() as $path => $spec) {
    if (!empty($spec['hub']) || empty($spec['group']) || $spec['group'] !== $group) {
      continue;
    }

    $items[$path] = $spec['title'];
  }

  return $items;
}

function wonkangmetal_page_sub_nav_items($group, $active_path = '') {
  $items = array();

  foreach (wonkangmetal_page_group_definitions($group) as $path => $label) {
    $items[] = array(
      'label'  => $label,
      'url'    => wonkangmetal_page_url($path),
      'active' => ($path === $active_path),
    );
  }

  return $items;
}

function wonkangmetal_page_breadcrumb_items($path) {
  $items = array(
    array(
      'label' => __('HOME', 'wonkangmetal'),
      'url'   => home_url('/'),
    ),
  );

  $spec = wonkangmetal_page_spec($path);
  if (!$spec) {
    return $items;
  }

  if (!empty($spec['section']) && !in_array($spec['section'], array('LEGAL'), true)) {
    $section_url = '';

    if (!empty($spec['group'])) {
      $group_paths = array_keys(wonkangmetal_page_group_definitions($spec['group']));
      if (!empty($group_paths[0])) {
        $section_url = wonkangmetal_page_url($group_paths[0]);
      }
    } elseif (in_array($path, array('inquiry', 'contact'), true)) {
      $section_url = wonkangmetal_page_url('inquiry');
    }

    $items[] = array(
      'label' => $spec['section'],
      'url'   => $section_url,
    );
  }

  $items[] = array(
    'label' => $spec['title'],
    'url'   => '',
  );

  return $items;
}

function wonkangmetal_is_theme_page($post = null) {
  $path = wonkangmetal_get_page_path($post);

  return $path !== '' && wonkangmetal_page_spec($path) !== null;
}

function wonkangmetal_seed_pages() {
  $definitions = wonkangmetal_page_definitions();
  $paths       = array_keys($definitions);

  usort(
    $paths,
    function ($a, $b) {
      return wonkangmetal_page_depth($a) <=> wonkangmetal_page_depth($b);
    }
  );

  $changed = false;

  foreach ($paths as $path) {
    $spec      = $definitions[$path];
    $existing  = get_page_by_path($path);

    if ($existing) {
      if ($existing->post_status !== 'publish' || $existing->post_title !== $spec['title']) {
        wp_update_post(
          array(
            'ID'          => $existing->ID,
            'post_status' => 'publish',
            'post_title'  => $spec['title'],
          )
        );
        $changed = true;
      }
      continue;
    }
    $parent_id = 0;

    if (strpos($path, '/') !== false) {
      $parent_path = substr($path, 0, strrpos($path, '/'));
      $parent      = get_page_by_path($parent_path);
      if ($parent) {
        $parent_id = $parent->ID;
      }
    }

    $result = wp_insert_post(
      array(
        'post_title'  => $spec['title'],
        'post_name'   => basename($path),
        'post_parent' => $parent_id,
        'post_status' => 'publish',
        'post_type'   => 'page',
        'post_content'=> '',
      ),
      true
    );

    if (!is_wp_error($result)) {
      $changed = true;
    }
  }

  if ($changed) {
    flush_rewrite_rules(false);
  }

  update_option('wonkangmetal_pages_seeded', '1', false);
}

function wonkangmetal_maybe_seed_pages() {
  wonkangmetal_seed_pages();
}
add_action('init', 'wonkangmetal_maybe_seed_pages', 20);

function wonkangmetal_maybe_flush_pages_rewrites() {
  if (get_option('wonkangmetal_pages_rewrite_version') === '2') {
    return;
  }

  flush_rewrite_rules(false);
  update_option('wonkangmetal_pages_rewrite_version', '2', false);
}
add_action('init', 'wonkangmetal_maybe_flush_pages_rewrites', 99);

function wonkangmetal_redirect_hub_pages() {
  if (is_admin() || !is_page()) {
    return;
  }

  $path = wonkangmetal_get_page_path();
  $spec = wonkangmetal_page_spec($path);

  if (!$spec || empty($spec['hub']) || empty($spec['redirect'])) {
    return;
  }

  wp_safe_redirect(wonkangmetal_page_url($spec['redirect']), 301);
  exit;
}
add_action('template_redirect', 'wonkangmetal_redirect_hub_pages', 1);

function wonkangmetal_render_page_shell($path) {
  $spec = wonkangmetal_page_spec($path);

  if (!$spec || !empty($spec['hub'])) {
    return false;
  }

  get_template_part(
    'template-parts/layout/sub',
    'hero',
    array(
      'title'      => $spec['title'],
      'desc'       => isset($spec['desc']) ? $spec['desc'] : '',
      'section'    => isset($spec['section']) ? $spec['section'] : '',
      'breadcrumb' => wonkangmetal_page_breadcrumb_items($path),
      'bg_class'   => isset($spec['bg_class']) ? $spec['bg_class'] : 'sub-hero--default',
    )
  );

  if (!empty($spec['group']) && in_array($spec['group'], array('company', 'factory', 'customer'), true)) {
    get_template_part(
      'template-parts/layout/sub',
      'nav',
      array(
        'current' => $spec['title'],
        'items'   => wonkangmetal_page_sub_nav_items($spec['group'], $path),
      )
    );
  }

  return true;
}

function wonkangmetal_render_page_content($path) {
  $spec = wonkangmetal_page_spec($path);

  if (!$spec || !empty($spec['hub'])) {
    return false;
  }

  if (!wonkangmetal_render_page_shell($path)) {
    return false;
  }

  switch ($spec['template']) {
    case 'original':
      get_template_part(
        'template-parts/pages/original',
        'body',
        array(
          'path' => $path,
        )
      );
      break;

    case 'placeholder':
      get_template_part(
        'template-parts/pages/placeholder',
        'body',
        array(
          'path'        => $path,
          'title'       => $spec['title'],
          'placeholder' => isset($spec['placeholder']) ? $spec['placeholder'] : '',
        )
      );
      break;

    default:
      return false;
  }

  return true;
}

function wonkangmetal_pages_flush_rewrites() {
  wonkangmetal_seed_pages();
  flush_rewrite_rules();
}
add_action('after_switch_theme', 'wonkangmetal_pages_flush_rewrites');
