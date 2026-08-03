<?php
/**
 * Fallback page template.
 */
get_header();
?>
<main id="main" class="site-main u-container">
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <article <?php post_class(); ?> style="padding: 64px 0;">
      <h1><?php the_title(); ?></h1>
      <div><?php the_content(); ?></div>
    </article>
  <?php endwhile; endif; ?>
</main>
<?php
get_footer();
