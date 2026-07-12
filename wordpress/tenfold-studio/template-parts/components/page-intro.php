<?php
/**
 * @var string $eyebrow
 * @var string $title
 * @var string $description
 * @var string $title_tag
 */
$title_tag = isset($title_tag) ? $title_tag : 'h1';
$eyebrow = isset($eyebrow) ? $eyebrow : '';
$title = isset($title) ? $title : '';
$description = isset($description) ? $description : '';
?>
<header class="page-intro">
  <?php if ($eyebrow) : ?>
    <p class="eyebrow"><?php echo esc_html($eyebrow); ?></p>
  <?php endif; ?>
  <?php if ($title) : ?>
    <<?php echo tag_escape($title_tag); ?> class="page-intro__title"><?php echo nl2br(esc_html($title)); ?></<?php echo tag_escape($title_tag); ?>>
  <?php endif; ?>
  <?php if ($description) : ?>
    <p class="page-intro__desc lead"><?php echo nl2br(esc_html($description)); ?></p>
  <?php endif; ?>
</header>
