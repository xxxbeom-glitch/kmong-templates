<?php
/**
 * @var array $args items [{label, url, active?}]
 */
$args  = isset($args) ? $args : array();
$items = isset($args['items']) ? $args['items'] : array();

if (empty($items)) {
  return;
}
?>
<nav class="product-part-filter" aria-label="<?php esc_attr_e('부품 유형 필터', 'wonkangmetal'); ?>">
  <ul class="product-part-filter__list">
    <?php foreach ($items as $item) : ?>
      <li class="product-part-filter__item<?php echo !empty($item['active']) ? ' is-active' : ''; ?>">
        <a href="<?php echo esc_url($item['url']); ?>"><?php echo esc_html($item['label']); ?></a>
      </li>
    <?php endforeach; ?>
  </ul>
</nav>
