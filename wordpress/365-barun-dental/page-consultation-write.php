<?php
/**
 * Template Name: 온라인 상담 작성
 * Figma 511:140
 */
get_header();

$consult_hero_title = '온라인 상담 작성';
$consult_hero_desc = "불편한 부위나 증상, 궁금한 내용을 작성해 주세요.\n작성된 내용은 의료진의 참고 상담을 위해 사용됩니다.";
?>
  <?php
  get_template_part('template-parts/consultation/sub-hero');
  get_template_part('template-parts/consultation/write-form');
  ?>
<?php
get_footer();
