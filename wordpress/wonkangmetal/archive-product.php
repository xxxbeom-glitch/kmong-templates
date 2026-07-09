<?php
/**
 * Product archive — /product/
 */
get_header();

get_template_part(
  'template-parts/layout/sub',
  'hero',
  array(
    'title'      => __('제품', 'wonkangmetal'),
    'desc'       => __('원강금속 주조 솔루션 제품 라인업', 'wonkangmetal'),
    'section'    => 'PRODUCT',
    'breadcrumb' => wonkangmetal_product_breadcrumb_items(
      array(
        array(
          'label' => __('전체 제품', 'wonkangmetal'),
          'url'   => '',
        ),
      )
    ),
    'bg_class'   => 'sub-hero--product',
  )
);

get_template_part(
  'template-parts/layout/sub',
  'nav',
  array(
    'current' => __('제품', 'wonkangmetal'),
    'items'   => wonkangmetal_product_sub_nav_items(''),
  )
);
?>

<section class="product-archive">
  <div class="si-inner product-archive__inner">
  <?php if (have_posts()) : ?>
    <ul class="product-grid">
      <?php
      while (have_posts()) {
        the_post();
        echo '<li class="product-grid__item">';
        get_template_part('template-parts/product/card');
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
    <p class="product-archive__empty"><?php esc_html_e('등록된 제품이 없습니다.', 'wonkangmetal'); ?></p>
  <?php endif; ?>
  </div>
</section>

<?php
get_footer();
