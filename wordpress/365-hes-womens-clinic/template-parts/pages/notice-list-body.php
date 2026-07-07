<?php
$archive_url = get_post_type_archive_link('notice');
if (!$archive_url) {
  $archive_url = home_url('/notice/');
}

$query = new WP_Query(
  array(
    'post_type' => 'notice',
    'posts_per_page' => 10,
    'orderby' => 'date',
    'order' => 'DESC',
    'post_status' => 'publish',
  )
);
?>

<section class="sub-notice-list">
  <div class="section-shell section-shell--gutter">
    <?php if ($query->have_posts()) : ?>
      <ul class="sub-notice-list__items">
        <?php while ($query->have_posts()) : $query->the_post(); ?>
          <li class="sub-notice-list__item">
            <a class="sub-notice-list__link" href="<?php the_permalink(); ?>">
              <span class="sub-notice-list__title"><?php the_title(); ?></span>
              <time class="sub-notice-list__date" datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                <?php echo esc_html(get_the_date('Y.m.d')); ?>
              </time>
            </a>
          </li>
        <?php endwhile; ?>
      </ul>
      <?php wp_reset_postdata(); ?>
      <p class="sub-notice-list__more-wrap">
        <a class="sub-notice-list__more" href="<?php echo esc_url($archive_url); ?>">전체 공지 보기</a>
      </p>
    <?php else : ?>
      <p class="sub-notice-list__empty">등록된 공지가 없습니다.</p>
      <p class="sub-notice-list__more-wrap">
        <a class="sub-notice-list__more" href="<?php echo esc_url($archive_url); ?>">공지 목록</a>
      </p>
    <?php endif; ?>
  </div>
</section>
