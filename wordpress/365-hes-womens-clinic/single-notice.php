<?php
get_header();
?>

<?php if (have_posts()) : ?>
  <?php while (have_posts()) : the_post(); ?>
    <article <?php post_class('notice-single section-shell section-shell--gutter'); ?>>
      <h1 class="notice-single__title"><?php the_title(); ?></h1>
      <div class="notice-single__content">
        <?php the_content(); ?>
      </div>
    </article>
  <?php endwhile; ?>
<?php endif; ?>

<?php
get_footer();
