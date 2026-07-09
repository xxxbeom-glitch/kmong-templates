<?php
/**
 * News archive — /news/ · ?type=news · ?type=notice
 */
get_header();

$current_type = sanitize_key(get_query_var('type'));

get_template_part(
  'template-parts/layout/sub',
  'hero',
  array(
    'title'      => __('뉴스', 'wonkangmetal'),
    'desc'       => __('원강금속의 소식과 공지를 확인하세요.', 'wonkangmetal'),
    'section'    => 'NEWS',
    'breadcrumb' => wonkangmetal_news_breadcrumb_items(
      array(
        array(
          'label' => __('전체 뉴스', 'wonkangmetal'),
          'url'   => '',
        ),
      )
    ),
    'bg_class'   => 'sub-hero--news',
  )
);

get_template_part(
  'template-parts/news/type',
  'filter',
  array(
    'items' => wonkangmetal_news_type_filter_items($current_type),
  )
);
?>

<section class="news-archive">
  <div class="si-inner news-archive__inner">
  <?php if (have_posts()) : ?>
    <ul class="news-grid">
      <?php
      while (have_posts()) {
        the_post();
        echo '<li class="news-grid__item">';
        get_template_part('template-parts/news/card');
        echo '</li>';
      }
      ?>
    </ul>
    <?php the_posts_pagination(
      array(
        'mid_size'  => 2,
        'prev_text' => __('이전', 'wonkangmetal'),
        'next_text' => __('다음', 'wonkangmetal'),
      )
    ); ?>
  <?php else : ?>
    <p class="news-archive__empty"><?php esc_html_e('등록된 뉴스가 없습니다.', 'wonkangmetal'); ?></p>
  <?php endif; ?>
  </div>
</section>

<?php
get_footer();
