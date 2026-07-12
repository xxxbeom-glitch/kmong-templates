<?php
/**
 * @var string $eyebrow
 * @var string $title
 * @var string $description
 * @var string $title_id
 */
$eyebrow = isset($eyebrow) ? $eyebrow : '';
$title = isset($title) ? $title : '';
$description = isset($description) ? $description : '';
$title_id = isset($title_id) ? $title_id : '';
?>
<header class="section-head section-head--spaced">
  <?php if ($eyebrow) : ?>
    <p class="eyebrow"><?php echo esc_html($eyebrow); ?></p>
  <?php endif; ?>
  <?php if ($title) : ?>
    <h2<?php echo $title_id ? ' id="' . esc_attr($title_id) . '"' : ''; ?> class="section-head__title"><?php echo nl2br(esc_html($title)); ?></h2>
  <?php endif; ?>
  <?php if ($description) : ?>
    <p class="section-head__desc"><?php echo nl2br(esc_html($description)); ?></p>
  <?php endif; ?>
</header>
