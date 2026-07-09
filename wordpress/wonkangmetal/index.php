<?php
get_header();
?>

<?php if (have_posts()) : ?>
  <?php while (have_posts()) : the_post(); ?>
    <article <?php post_class('sub-page'); ?>>
      <div class="si-inner sub-page__inner">
        <h1 class="sub-page__title"><?php the_title(); ?></h1>
        <div class="sub-page__content entry-content">
          <?php the_content(); ?>
        </div>
      </div>
    </article>
  <?php endwhile; ?>
<?php else : ?>
  <div class="si-inner sub-page__inner">
    <p><?php esc_html_e('콘텐츠가 없습니다.', 'wonkangmetal'); ?></p>
  </div>
<?php endif; ?>

<?php
get_footer();
