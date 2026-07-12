<?php
/**
 * @var array<int, array{question:string,answer:string}> $items
 * @var string $id_prefix
 */
$items = isset($items) ? $items : array();
$id_prefix = isset($id_prefix) ? $id_prefix : 'faq';
if (!$items) {
  return;
}
?>
<div class="accordion" data-accordion>
  <?php foreach ($items as $index => $item) : ?>
    <?php
    $panel_id = $id_prefix . '-panel-' . $index;
    $button_id = $id_prefix . '-btn-' . $index;
    ?>
    <div class="accordion__item">
      <h3 class="accordion__heading">
        <button
          type="button"
          class="accordion__trigger"
          id="<?php echo esc_attr($button_id); ?>"
          aria-expanded="false"
          aria-controls="<?php echo esc_attr($panel_id); ?>"
          data-accordion-trigger
        >
          <span><?php echo esc_html($item['question']); ?></span>
          <span class="accordion__icon" aria-hidden="true"></span>
        </button>
      </h3>
      <div
        id="<?php echo esc_attr($panel_id); ?>"
        class="accordion__panel"
        role="region"
        aria-labelledby="<?php echo esc_attr($button_id); ?>"
        hidden
        data-accordion-panel
      >
        <div class="accordion__content">
          <p><?php echo esc_html($item['answer']); ?></p>
        </div>
      </div>
    </div>
  <?php endforeach; ?>
</div>
