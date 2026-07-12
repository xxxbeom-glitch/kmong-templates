<?php
/**
 * @var array<int, array{index:string,title:string,description?:string}> $steps
 */
$steps = isset($steps) ? $steps : array();
if (!$steps) {
  return;
}
?>
<ol class="timeline">
  <?php foreach ($steps as $step) : ?>
    <li class="timeline__item">
      <span class="timeline__index" aria-hidden="true"><?php echo esc_html($step['index']); ?></span>
      <div class="timeline__body">
        <h3 class="timeline__title"><?php echo esc_html($step['title']); ?></h3>
        <?php if (!empty($step['description'])) : ?>
          <p class="timeline__desc"><?php echo esc_html($step['description']); ?></p>
        <?php endif; ?>
      </div>
    </li>
  <?php endforeach; ?>
</ol>
