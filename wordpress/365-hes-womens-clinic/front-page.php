<?php
get_header();
?>

<div class="hero-float-wrap">
  <?php get_template_part('template-parts/section', 'hero'); ?>
  <?php get_template_part('template-parts/section', 'today-status'); ?>
</div>

<?php get_template_part('template-parts/section', 'symptom'); ?>

<?php get_template_part('template-parts/section', 'treatments'); ?>

<?php get_template_part('template-parts/section', 'medical-staff'); ?>

<?php get_template_part('template-parts/section', 'examination'); ?>

<?php get_template_part('template-parts/section', 'space'); ?>

<?php get_template_part('template-parts/section', 'faq'); ?>

<?php get_template_part('template-parts/section', 'location'); ?>

<?php
get_footer();
