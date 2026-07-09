<?php
/**
 * Product single — /product/{post-slug}/
 */
get_header();

if (have_posts()) {
  while (have_posts()) {
    the_post();

    $category_slug = wonkangmetal_product_primary_category_slug();
    $part_type     = get_post_meta(get_the_ID(), 'part_type', true);
    $category_term = get_term_by('slug', $category_slug, 'product_category');
    $category_name = ($category_term && !is_wp_error($category_term)) ? $category_term->name : '';

    $breadcrumb_tail = array();

    if ($category_name && $category_slug) {
      $breadcrumb_tail[] = array(
        'label' => $category_name,
        'url'   => wonkangmetal_product_category_url($category_slug),
      );
    }

    $breadcrumb_tail[] = array(
      'label' => get_the_title(),
      'url'   => '',
    );

    get_template_part(
      'template-parts/layout/sub',
      'hero',
      array(
        'title'      => get_the_title(),
        'desc'       => has_excerpt() ? get_the_excerpt() : '',
        'section'    => 'PRODUCT',
        'breadcrumb' => wonkangmetal_product_breadcrumb_items($breadcrumb_tail),
        'bg_class'   => 'sub-hero--product',
      )
    );

    get_template_part(
      'template-parts/layout/sub',
      'nav',
      array(
        'current' => $category_name ? $category_name : __('제품', 'wonkangmetal'),
        'items'   => wonkangmetal_product_sub_nav_items($category_slug),
      )
    );
    ?>
    <article <?php post_class('product-single sub-page'); ?>>
      <div class="si-inner product-single__inner">
        <div class="product-single__layout">
          <div class="product-single__media">
            <?php if (has_post_thumbnail()) : ?>
              <?php the_post_thumbnail('large', array('class' => 'product-single__thumb')); ?>
            <?php else : ?>
              <div class="product-single__placeholder" aria-hidden="true">
                <span><?php esc_html_e('제품 이미지', 'wonkangmetal'); ?></span>
              </div>
            <?php endif; ?>
          </div>

          <div class="product-single__content">
            <?php if ($category_name) : ?>
              <p class="product-single__category"><?php echo esc_html($category_name); ?></p>
            <?php endif; ?>

            <?php if ($part_type) : ?>
              <p class="product-single__part"><?php echo esc_html(wonkangmetal_product_part_label($part_type)); ?></p>
            <?php endif; ?>

            <h2 class="screen-reader-text"><?php the_title(); ?></h2>

            <div class="product-single__body entry-content">
              <?php the_content(); ?>
            </div>

            <?php if ($category_slug) : ?>
              <p class="product-single__back">
                <a class="btn-text" href="<?php echo esc_url(wonkangmetal_product_category_url($category_slug)); ?>">
                  <?php esc_html_e('목록으로', 'wonkangmetal'); ?>
                </a>
              </p>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </article>
    <?php
  }
}

get_footer();
