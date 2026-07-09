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
<nav class="news-type-filter" aria-label="<?php esc_attr_e('뉴스 분류 필터', 'wonkangmetal'); ?>">
  <ul class="news-type-filter__list">
    <?php foreach ($items as $item) : ?>
      <li class="news-type-filter__item<?php echo !empty($item['active']) ? ' is-active' : ''; ?>">
        <a href="<?php echo esc_url($item['url']); ?>"><?php echo esc_html($item['label']); ?></a>
      </li>
    <?php endforeach; ?>
  </ul>
</nav>
