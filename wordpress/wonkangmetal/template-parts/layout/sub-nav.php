<?php
/**
 * Sub navigation — 원본 sub_nav 대응 (placeholder)
 *
 * @var array $args items [{label, url, active?}], current
 */
$args = isset($args) ? $args : array();
$items   = isset($args['items']) ? $args['items'] : array();
$current = isset($args['current']) ? $args['current'] : '';
if (empty($items)) {
  return;
}
?>
<nav class="sub-nav" aria-label="<?php esc_attr_e('서브 메뉴', 'wonkangmetal'); ?>">
  <div class="si-inner sub-nav__inner">
    <?php if ($current) : ?>
      <div class="sub-nav__current"><?php echo esc_html($current); ?></div>
    <?php endif; ?>
    <ul class="sub-nav__list">
      <?php foreach ($items as $item) : ?>
        <li class="sub-nav__item<?php echo !empty($item['active']) ? ' is-active' : ''; ?>">
          <a href="<?php echo esc_url($item['url']); ?>"><?php echo esc_html($item['label']); ?></a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</nav>
