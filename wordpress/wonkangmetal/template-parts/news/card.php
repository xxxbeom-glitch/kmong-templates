<?php
$post_id      = get_the_ID();
$type_slug    = wonkangmetal_news_primary_type_slug($post_id);
$type_label   = wonkangmetal_news_type_label($type_slug);
$item_url     = wonkangmetal_news_item_url($post_id);
$is_external  = wonkangmetal_news_item_is_external($post_id);
$link_attrs   = '';

if ($is_external) {
  $link_attrs = ' target="_blank" rel="noopener noreferrer"';
}
?>
<a href="<?php echo esc_url($item_url); ?>" class="news-card"<?php echo $link_attrs; ?>>
  <div class="news-card__thumb" aria-hidden="true">
    <?php if (has_post_thumbnail()) : ?>
      <?php the_post_thumbnail('medium_large', array('class' => 'news-card__image')); ?>
    <?php else : ?>
      <span class="news-card__placeholder"><?php echo esc_html($type_label ? $type_label : 'NEWS'); ?></span>
    <?php endif; ?>
  </div>
  <?php if ($type_label) : ?>
    <p class="news-card__type"><?php echo esc_html($type_label); ?></p>
  <?php endif; ?>
  <h3 class="news-card__title"><?php the_title(); ?></h3>
  <time class="news-card__date" datetime="<?php echo esc_attr(get_the_date('c')); ?>">
    <?php echo esc_html(get_the_date('Y-m-d')); ?>
  </time>
</a>
