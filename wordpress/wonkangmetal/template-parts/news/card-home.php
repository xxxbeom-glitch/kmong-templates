<?php
$post_id      = get_the_ID();
$type_slug    = wonkangmetal_news_primary_type_slug($post_id);
$type_label   = wonkangmetal_news_type_label($type_slug);
$item_url     = wonkangmetal_news_item_url($post_id);
$is_external  = wonkangmetal_news_item_is_external($post_id);
$link_attrs   = $is_external ? ' target="_blank" rel="noopener noreferrer"' : '';
$label        = $type_label ? $type_label : 'NEWS';
?>
<a href="<?php echo esc_url($item_url); ?>"<?php echo $link_attrs; ?>>
  <figure class="img_wrap">
    <?php if (has_post_thumbnail()) : ?>
      <?php the_post_thumbnail('medium_large', array('alt' => get_the_title())); ?>
    <?php else : ?>
      <span class="img_wrap__placeholder" aria-hidden="true"></span>
    <?php endif; ?>
  </figure>
  <span class="category"><?php echo esc_html($label); ?></span>
  <h3><?php the_title(); ?></h3>
  <span class="date"><?php echo esc_html(get_the_date('Y-m-d')); ?></span>
</a>
