<?php
/**
 * @var array<int, array{index?:string,title:string,description?:string}> $items
 */
$items = isset($items) ? $items : array();
if (!$items) {
  return;
}
?>
<ol class="numbered-list">
  <?php foreach ($items as $i => $item) : ?>
    <li class="numbered-list__item">
      <span class="numbered-list__index" aria-hidden="true"><?php echo esc_html(isset($item['index']) ? $item['index'] : str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT)); ?></span>
      <div class="numbered-list__body">
        <h3 class="numbered-list__title"><?php echo esc_html($item['title']); ?></h3>
        <?php if (!empty($item['description'])) : ?>
          <p class="numbered-list__desc"><?php echo esc_html($item['description']); ?></p>
        <?php endif; ?>
      </div>
    </li>
  <?php endforeach; ?>
</ol>
