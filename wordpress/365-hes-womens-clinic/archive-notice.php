<?php
get_header();
?>

<section class="notice-archive section-shell section-shell--gutter">
  <h1 class="notice-archive__title">공지</h1>

  <?php if (have_posts()) : ?>
    <ul class="notice-archive__list">
      <?php while (have_posts()) : the_post(); ?>
        <li class="notice-archive__item">
          <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </li>
      <?php endwhile; ?>
    </ul>
  <?php else : ?>
    <p>등록된 공지가 없습니다.</p>
  <?php endif; ?>
</section>

<?php
get_footer();
