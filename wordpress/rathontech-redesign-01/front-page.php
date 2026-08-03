<?php
/**
 * Front page — main sections (IAM deferred).
 */
get_header();
?>
<main id="main" class="site-main">
  <?php get_template_part('template-parts/gate2/home-hero'); ?>
  <?php get_template_part('template-parts/home/section-iss'); ?>
  <?php get_template_part('template-parts/home/section-ecosystem'); ?>
  <?php get_template_part('template-parts/home/section-evidence'); ?>
  <?php get_template_part('template-parts/home/section-company'); ?>
</main>
<?php
get_footer();
