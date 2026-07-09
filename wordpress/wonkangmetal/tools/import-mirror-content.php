<?php
/**
 * One-off CLI: extract original subpage body HTML from mirror into theme content/original/.
 *
 * Usage: php tools/import-mirror-content.php
 */

$theme_dir  = dirname(__DIR__);
$mirror_dir = realpath($theme_dir . '/../../_reference-harness/cases/wonkangmetal/01-original/_mirror/www.wonkangmetal.co.kr');

if (!$mirror_dir || !is_dir($mirror_dir)) {
  fwrite(STDERR, "Mirror not found.\n");
  exit(1);
}

$out_dir = $theme_dir . '/content/original';
if (!is_dir($out_dir)) {
  mkdir($out_dir, 0755, true);
}

$sources = array(
  'company/overview'     => array('file' => 'bbs/board.fca406bb5462.html', 'mode' => 'board'),
  'company/ci'           => array('file' => 'page/page0103.php', 'mode' => 'sub_section'),
  'company/partners'     => array('file' => 'bbs/board.fb5f37fcd0f1.html', 'mode' => 'board'),
  'company/location'     => array('file' => 'page/page0105.php', 'mode' => 'sub_section'),
  'factory/process'      => array('file' => 'page/page0201.php', 'mode' => 'process'),
  'factory/equipment'    => array('file' => 'bbs/board.00c73d6bfc63.html', 'mode' => 'board'),
  'factory/technology'   => array('file' => 'page/page0203.php', 'mode' => 'sub_section'),
  'factory/certificates' => array('file' => 'bbs/board.b03e0a352c48.html', 'mode' => 'board'),
  'contact'              => array('file' => 'page/page0403.php', 'mode' => 'sub_section'),
  'privacy-policy'       => array('file' => 'page/page0502.php', 'mode' => 'sub_section'),
  'email-policy'         => array('file' => 'page/page0503.php', 'mode' => 'sub_section'),
  'inquiry'              => array('file' => 'bbs/write.38a7e4a4ac48.html', 'mode' => 'inquiry'),
);

function extract_html_fragment($html, $mode) {
  if ($mode === 'sub_section') {
    if (preg_match('/<section class="sub_section[^"]*"[^>]*>.*?<\/section>/s', $html, $m)) {
      return $m[0];
    }
    return '';
  }

  if ($mode === 'process') {
    if (preg_match('/<section class="sub_seciton[^"]*"[^>]*>.*?<\/section>\s*<div id="k_pop_01"/s', $html, $m)) {
      return preg_replace('/\s*<div id="k_pop_01".*$/s', '', $m[0]);
    }
    return '';
  }

  if ($mode === 'board') {
    if (preg_match('/<section class="b_bd_sec sub_content_wrap sub_board">\s*<div>(.*?)<\/div>\s*<\/section>/s', $html, $m)) {
      return '<section class="b_bd_sec sub_content_wrap sub_board"><div>' . $m[1] . '</div></section>';
    }
    return '';
  }

  if ($mode === 'inquiry') {
    $parts = array();
    if (preg_match('/<p class="fs_20 font_m ip"[^>]*>.*?<\/p>/s', $html, $m)) {
      $parts[] = $m[0];
    }
    if (preg_match('/<section id="bo_w">.*?<\/section>/s', $html, $m)) {
      $parts[] = '<div class="si_inner">' . $m[0] . '</div>';
    }
    return implode("\n", $parts);
  }

  return '';
}

function normalize_mirror_html($html) {
  $html = preg_replace('/\r\n?/', "\n", $html);

  // Strip mirror-only scripts/styles linked to external demo assets.
  $html = preg_replace('/<script\b[^>]*>.*?<\/script>/is', '', $html);
  $html = preg_replace('/<link[^>]+simplelightbox[^>]*>/i', '', $html);
  $html = preg_replace('/<link[^>]+demo\.css[^>]*>/i', '', $html);
  $html = preg_replace('/<style\b[^>]*>.*?<\/style>/is', '', $html);

  // Disable board/gnuboard form posts — keep markup only.
  $html = preg_replace('/<form\b([^>]*)action="[^"]*"([^>]*)>/i', '<form$1action="#" method="post"$2>', $html);
  $html = preg_replace('/<form\b([^>]*)onsubmit="[^"]*"([^>]*)>/i', '<form$1onsubmit="return false;"$2>', $html);
  $html = preg_replace('/\sonclick="location\.href=[^"]*"/i', '', $html);

  // Image URL tokens for runtime rewrite.
  $patterns = array(
    '#/_mirror/www\.wonkangmetal\.co\.kr/img/([^"\')\s]+)#i' => '{{MIRROR_IMG:img/$1}}',
    '#/_mirror/www\.wonkangmetal\.co\.kr/data/file/([^"\')\s]+)#i' => '{{MIRROR_IMG:data/file/$1}}',
    '#https?://www\.wonkangmetal\.co\.kr/data/file/([^"\')\s]+)#i' => '{{MIRROR_IMG:data/file/$1}}',
    '#https?://www\.wonkangmetal\.co\.kr/img/([^"\')\s]+)#i' => '{{MIRROR_IMG:img/$1}}',
  );
  foreach ($patterns as $pattern => $replacement) {
    $html = preg_replace($pattern, $replacement, $html);
  }

  // Download links — keep label, disable broken mirror paths.
  $html = preg_replace('#href="/download/[^"]+"#i', 'href="#"', $html);

  return trim($html) . "\n";
}

function disable_inquiry_form_fields($html) {
  $html = preg_replace('/<(input|select|textarea)\b/i', '<$1 disabled ', $html);
  $html = preg_replace('/<button\b(?![^>]*type=)/i', '<button type="button" disabled ', $html);
  $html = preg_replace('/<button\b([^>]*type="submit")/i', '<button type="button" disabled$1', $html);

  return $html;
}

$written = 0;
foreach ($sources as $path => $spec) {
  $source = $mirror_dir . '/' . str_replace('/', DIRECTORY_SEPARATOR, $spec['file']);
  if (!is_readable($source)) {
    fwrite(STDERR, "Missing source: {$spec['file']}\n");
    continue;
  }

  $raw      = file_get_contents($source);
  $fragment = extract_html_fragment($raw, $spec['mode']);
  if ($fragment === '') {
    fwrite(STDERR, "Extract failed: {$path}\n");
    continue;
  }

  $html = normalize_mirror_html($fragment);
  if ($spec['mode'] === 'inquiry') {
    $html = disable_inquiry_form_fields($html);
  }

  $slug = str_replace('/', '-', $path);
  $out  = $out_dir . '/' . $slug . '.html';
  file_put_contents($out, $html);
  fwrite(STDOUT, "Wrote {$slug}.html\n");
  $written++;
}

fwrite(STDOUT, "Done. {$written} files.\n");
