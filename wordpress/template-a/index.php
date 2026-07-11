<?php get_header(); ?>
<main id="main" class="main main--subpage">
  <div class="section-shell section-shell--gutter">
    <?php if (have_posts()) : ?>
      <?php while (have_posts()) : the_post(); ?>
        <article <?php post_class(); ?>>
          <h1><?php the_title(); ?></h1>
          <?php the_content(); ?>
        </article>
      <?php endwhile; ?>
    <?php else : ?>
      <p><?php esc_html_e('콘텐츠가 없습니다.', 'template-a'); ?></p>
    <?php endif; ?>
  </div>
</main>
<?php get_footer(); ?>
