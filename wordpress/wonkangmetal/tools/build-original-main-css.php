<?php
/**
 * Build assets/css/pages/original-main.css from mirror s_main.css (main body rules).
 */

$theme   = dirname(__DIR__);
$mirror  = realpath($theme . '/../../_reference-harness/cases/wonkangmetal/01-original/_mirror/www.wonkangmetal.co.kr');
$outFile = $theme . '/assets/css/pages/original-main.css';

if (!$mirror) {
  fwrite(STDERR, "Mirror not found.\n");
  exit(1);
}

function read_lines_from($file, $startLine = 1, $endLine = null) {
  $lines = file($file, FILE_IGNORE_NEW_LINES);
  if ($lines === false) {
    return '';
  }

  $offset = $startLine - 1;
  $length = $endLine === null ? null : ($endLine - $startLine + 1);

  return implode("\n", array_slice($lines, $offset, $length)) . "\n";
}

function fix_mirror_urls($css) {
  $replacements = array(
    "url(/img/" => "url(../images/mirror/img/",
    "url('/img/" => "url('../images/mirror/img/",
    'url("/img/' => 'url("../images/mirror/img/',
    "url(./img/" => "url(../images/mirror/img/",
    "url(/data/" => "url(../images/mirror/data/",
    "url('/data/" => "url('../images/mirror/data/",
    'url("/data/' => 'url("../images/mirror/data/',
    "content: url(/img/" => "content: url(../images/mirror/img/",
  );

  return str_replace(array_keys($replacements), array_values($replacements), $css);
}

$mainCss = $mirror . '/css/s_main.css';

$chunks = array(
  "/* --- utilities (s_main) --- */\n" . read_lines_from($mainCss, 38, 42) . read_lines_from($mainCss, 61, 65),
  "/* --- shell + main sections (s_main 503–1821) --- */\n" . read_lines_from($mainCss, 503, 1821),
);

$css = "/* Original main page styles — imported from mirror s_main.css, URL-remapped */\n\n";
$css .= fix_mirror_urls(implode("\n", $chunks));

$css .= "\n/* WP: static hero (no Swiper bundle) */\n";
$css .= ".main_visual [data-hero-slider] .swiper-slide { display: none; }\n";
$css .= ".main_visual [data-hero-slider] .swiper-slide.is-active { display: flex; }\n";
$css .= ".main_visual .sub_caption.show { opacity: 1; transform: translateY(0); }\n";

$css .= "\n/* WP: static news row (no Swiper bundle) */\n";
$css .= ".main_gallery .board_slider .swiper-wrapper { display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory; }\n";
$css .= ".main_gallery .board_slider .swiper-slide { flex: 0 0 min(420px, 85vw); scroll-snap-align: start; }\n";

file_put_contents($outFile, $css);
fwrite(STDOUT, "Wrote original-main.css (" . strlen($css) . " bytes)\n");
