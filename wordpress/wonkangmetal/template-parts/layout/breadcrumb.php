<?php
/**
 * Breadcrumb
 *
 * @var array $args items [{label, url?}]
 */
$args = isset($args) ? $args : array();
$items = isset($args['items']) ? $args['items'] : array();
if (empty($items)) {
  return;
}
?>
<nav class="breadcrumb" aria-label="<?php esc_attr_e('현재 위치', 'wonkangmetal'); ?>">
  <ol class="breadcrumb__list">
    <?php foreach ($items as $index => $item) : ?>
      <li class="breadcrumb__item">
        <?php if (!empty($item['url'])) : ?>
          <a href="<?php echo esc_url($item['url']); ?>"><?php echo esc_html($item['label']); ?></a>
        <?php else : ?>
          <span aria-current="page"><?php echo esc_html($item['label']); ?></span>
        <?php endif; ?>
      </li>
    <?php endforeach; ?>
  </ol>
</nav>
