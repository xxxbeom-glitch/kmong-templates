<?php

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Light SEO: title, description, OG, robots, sitemap.
 *
 * @return array{title:string,description:string}
 */
function tenfold_seo_for_request() {
  $defaults = array(
    'title' => 'TENFOLD STUDIO | 기획부터 운영까지 완성하는 웹 스튜디오',
    'description' => '기획과 디자인에 강하고, 운영까지 완성하는 웹 스튜디오. 홈페이지 제작이 필요한 소규모 기업·전문 서비스를 위한 웹사이트 기획·디자인·구축.',
  );

  if (is_404()) {
    return array(
      'title' => '페이지를 찾을 수 없습니다 | TENFOLD STUDIO',
      'description' => '요청한 페이지를 찾을 수 없습니다.',
    );
  }

  if (is_front_page()) {
    return $defaults;
  }

  $path = tenfold_get_page_path();
  $map = array(
    'about' => array(
      'title' => '텐폴드 소개 | TENFOLD STUDIO',
      'description' => '기획과 디자인에 강하고, 운영까지 완성하는 웹 스튜디오 텐폴드를 소개합니다.',
    ),
    'projects' => array(
      'title' => '프로젝트 | TENFOLD STUDIO',
      'description' => '브랜드와 서비스의 목적에 맞춰 구조와 경험으로 풀어낸 TENFOLD 프로젝트.',
    ),
    'services' => array(
      'title' => '웹사이트 제작 서비스 | TENFOLD STUDIO',
      'description' => 'STANDARD와 CUSTOM 패키지로 필요한 범위에 맞는 웹사이트 제작 방식을 선택하세요.',
    ),
    'services/standard' => array(
      'title' => 'STANDARD PACKAGE | TENFOLD STUDIO',
      'description' => '준비된 구조를 활용해 빠르게, 완성도 있게 구축하는 STANDARD PACKAGE.',
    ),
    'services/custom' => array(
      'title' => 'CUSTOM PACKAGE | TENFOLD STUDIO',
      'description' => '기획부터 맞춤 설계하는 CUSTOM PACKAGE.',
    ),
    'contact' => array(
      'title' => '프로젝트 문의 | TENFOLD STUDIO',
      'description' => '프로젝트에 대해 이야기해 주세요. 필요한 범위에 맞는 제작 방식을 안내합니다.',
    ),
    'contact-complete' => array(
      'title' => '문의 작성 완료 | TENFOLD STUDIO',
      'description' => '문의 내용 작성 완료 화면입니다.',
    ),
    'privacy' => array(
      'title' => '개인정보처리방침 | TENFOLD STUDIO',
      'description' => '텐폴드 스튜디오 개인정보처리방침 초안.',
    ),
  );

  if (isset($map[$path])) {
    return $map[$path];
  }

  if (strpos($path, 'projects/') === 0) {
    $slug = substr($path, strlen('projects/'));
    $project = tenfold_get_project($slug);
    if ($project) {
      return array(
        'title' => $project['title'] . ' | TENFOLD STUDIO',
        'description' => $project['summary'],
      );
    }
  }

  return $defaults;
}

function tenfold_document_title($title) {
  if (is_admin()) {
    return $title;
  }
  $seo = tenfold_seo_for_request();
  $title['title'] = $seo['title'];
  $title['site'] = '';
  $title['tagline'] = '';
  return $title;
}
add_filter('document_title_parts', 'tenfold_document_title');

function tenfold_seo_head() {
  $seo = tenfold_seo_for_request();
  $url = is_404() ? home_url('/') : (is_singular() ? get_permalink() : home_url(add_query_arg(array(), $GLOBALS['wp']->request)));
  if (is_front_page()) {
    $url = home_url('/');
  } elseif (is_page()) {
    $url = get_permalink();
  }
  $url = esc_url($url);
  $title = esc_attr($seo['title']);
  $desc = esc_attr($seo['description']);
  $site = esc_url(home_url('/'));
  echo '<meta name="description" content="' . $desc . '">' . "\n";
  echo '<link rel="canonical" href="' . $url . '">' . "\n";
  echo '<meta property="og:type" content="website">' . "\n";
  echo '<meta property="og:site_name" content="TENFOLD STUDIO">' . "\n";
  echo '<meta property="og:title" content="' . $title . '">' . "\n";
  echo '<meta property="og:description" content="' . $desc . '">' . "\n";
  echo '<meta property="og:url" content="' . $url . '">' . "\n";
  echo '<meta property="og:locale" content="ko_KR">' . "\n";
  echo '<meta name="twitter:card" content="summary">' . "\n";
  echo '<meta name="twitter:title" content="' . $title . '">' . "\n";
  echo '<meta name="twitter:description" content="' . $desc . '">' . "\n";
  $favicon = tenfold_asset_uri('images/favicon.svg');
  echo '<link rel="icon" href="' . esc_url($favicon) . '" type="image/svg+xml">' . "\n";
  unset($site);
}
add_action('wp_head', 'tenfold_seo_head', 1);

/**
 * Virtual robots.txt and sitemap.xml via query vars.
 */
function tenfold_seo_query_vars($vars) {
  $vars[] = 'tenfold_robots';
  $vars[] = 'tenfold_sitemap';
  return $vars;
}
add_filter('query_vars', 'tenfold_seo_query_vars');

function tenfold_seo_rewrite() {
  add_rewrite_rule('^robots\.txt$', 'index.php?tenfold_robots=1', 'top');
  add_rewrite_rule('^sitemap\.xml$', 'index.php?tenfold_sitemap=1', 'top');
}
add_action('init', 'tenfold_seo_rewrite');

function tenfold_seo_template_redirect() {
  if ((int) get_query_var('tenfold_robots') === 1) {
    header('Content-Type: text/plain; charset=utf-8');
    $sitemap = home_url('/sitemap.xml');
    echo "User-agent: *\nAllow: /\n\nSitemap: " . esc_url_raw($sitemap) . "\n";
    exit;
  }

  if ((int) get_query_var('tenfold_sitemap') === 1) {
    header('Content-Type: application/xml; charset=utf-8');
    $urls = array(home_url('/'));
    foreach (array_keys(tenfold_page_registry()) as $path) {
      $urls[] = tenfold_url($path);
    }
    echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    foreach ($urls as $loc) {
      echo '  <url><loc>' . esc_url($loc) . '</loc></url>' . "\n";
    }
    echo '</urlset>';
    exit;
  }
}
add_action('template_redirect', 'tenfold_seo_template_redirect', 0);

function tenfold_flush_seo_rewrites() {
  tenfold_seo_rewrite();
  flush_rewrite_rules(false);
}
add_action('after_switch_theme', 'tenfold_flush_seo_rewrites');
