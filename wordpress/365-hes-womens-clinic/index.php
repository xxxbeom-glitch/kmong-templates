<?php
get_header();
?>

<?php if (have_posts()) : ?>
  <?php while (have_posts()) : the_post(); ?>
    <article <?php post_class('section-shell section-shell--gutter'); ?> style="padding-block: var(--section-pad-y);">
      <h1 class="notice-single__title"><?php the_title(); ?></h1>
      <div class="notice-single__content">
        <?php the_content(); ?>
      </div>
    </article>
  <?php endwhile; ?>
<?php endif; ?>

<?php
get_footer();
