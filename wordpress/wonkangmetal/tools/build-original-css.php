<?php
/**
 * Build assets/css/pages/original-sub.css from mirror styles (body-only rules).
 */

$theme   = dirname(__DIR__);
$mirror  = realpath($theme . '/../../_reference-harness/cases/wonkangmetal/01-original/_mirror/www.wonkangmetal.co.kr');
$outFile = $theme . '/assets/css/pages/original-sub.css';

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
  );

  return str_replace(array_keys($replacements), array_values($replacements), $css);
}

$chunks = array(
  "/* --- s_main.css (shared title/button tokens) --- */\n" . read_lines_from($mirror . '/css/s_main.css', 515, 523) . read_lines_from($mirror . '/css/s_main.css', 572, 629),
  "/* --- s_sub.css (sub page body) --- */\n" . read_lines_from($mirror . '/css/s_sub.css', 99),
  "/* --- history board skin --- */\n" . read_lines_from($mirror . '/mobile/skin/board/history/style.css', 270),
  "/* --- partner board skin --- */\n" . read_lines_from($mirror . '/mobile/skin/board/partner/style.css', 535),
  "/* --- cert board skin --- */\n" . read_lines_from($mirror . '/mobile/skin/board/cert/style.css', 257),
  "/* --- inquiry write skin --- */\n" . read_lines_from($mirror . '/mobile/skin/board/inquiry/style.css', 637),
  "/* --- b_board list (equipment) --- */\n" . read_lines_from($mirror . '/css/b_board.css', 73) . read_lines_from($mirror . '/css/b_board.css', 197),
);

$css = "/* Original subpage body styles — imported from mirror, URL-remapped */\n\n";
$css .= fix_mirror_urls(implode("\n", $chunks));

$css .= "\n/* WP shell: original markup sits inside theme page wrapper */\n";
$css .= ".page-original .si_inner,\n.page-original .si-inner { max-width: 1820px; margin: 0 auto; width: 100%; padding: 0; }\n";
$css .= "@media screen and (max-width: 1820px) {\n";
$css .= "  .page-original .si_inner,\n  .page-original .si-inner { padding: 0 20px; }\n";
$css .= "}\n";
$css .= ".page-original .sub_board { padding-left: 20px; padding-right: 20px; }\n";

file_put_contents($outFile, $css);
fwrite(STDOUT, "Wrote original-sub.css (" . strlen($css) . " bytes)\n");
