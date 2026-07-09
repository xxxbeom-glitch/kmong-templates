<?php
/**
 * Product category archive — /product/category/{term}/
 */
get_header();

$term         = get_queried_object();
$term_slug    = ($term && isset($term->slug)) ? $term->slug : '';
$current_part = sanitize_key(get_query_var('part'));

get_template_part(
  'template-parts/layout/sub',
  'hero',
  array(
    'title'      => single_term_title('', false),
    'desc'       => term_description() ? wp_strip_all_tags(term_description()) : '',
    'section'    => 'PRODUCT',
    'breadcrumb' => wonkangmetal_product_breadcrumb_items(
      array(
        array(
          'label' => single_term_title('', false),
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
    'current' => single_term_title('', false),
    'items'   => wonkangmetal_product_sub_nav_items($term_slug),
  )
);

$part_items = wonkangmetal_product_part_filter_items($term_slug, $current_part);
if (!empty($part_items)) {
  get_template_part(
    'template-parts/product/part',
    'filter',
    array('items' => $part_items)
  );
}
?>

<section class="product-archive product-archive--category">
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
    <p class="product-archive__empty"><?php esc_html_e('해당 분류에 제품이 없습니다.', 'wonkangmetal'); ?></p>
  <?php endif; ?>
  </div>
</section>

<?php
get_footer();
