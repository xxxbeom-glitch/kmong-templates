<?php
$part_type = get_post_meta(get_the_ID(), 'part_type', true);
?>
<article <?php post_class('product-card'); ?>>
  <a class="product-card__link" href="<?php the_permalink(); ?>">
    <div class="product-card__media" aria-hidden="true">
      <?php if (has_post_thumbnail()) : ?>
        <?php the_post_thumbnail('medium_large', array('class' => 'product-card__thumb')); ?>
      <?php else : ?>
        <span class="product-card__placeholder"><?php esc_html_e('제품', 'wonkangmetal'); ?></span>
      <?php endif; ?>
    </div>
    <div class="product-card__body">
      <?php if ($part_type) : ?>
        <p class="product-card__meta"><?php echo esc_html(wonkangmetal_product_part_label($part_type)); ?></p>
      <?php endif; ?>
      <h2 class="product-card__title"><?php the_title(); ?></h2>
      <?php if (has_excerpt()) : ?>
        <p class="product-card__excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
      <?php endif; ?>
      <span class="product-card__more"><?php esc_html_e('VIEW MORE', 'wonkangmetal'); ?></span>
    </div>
  </a>
</article>
