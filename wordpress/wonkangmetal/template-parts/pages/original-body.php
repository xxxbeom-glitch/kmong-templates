<?php
/**
 * Original mirror body markup (structure + copy preserved).
 *
 * @var string $path Theme page path key.
 */
$path = isset($args['path']) ? (string) $args['path'] : '';
$html = wonkangmetal_get_original_content_html($path);
?>
<article <?php post_class('page-original'); ?>>
  <?php
  if ($html !== '') {
    // Trusted static import from project mirror — not user-authored post content.
    echo $html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
  } else {
    ?>
    <div class="si-inner sub-page__inner">
      <p class="sub-page__placeholder"><?php esc_html_e('원본 콘텐츠를 불러올 수 없습니다.', 'wonkangmetal'); ?></p>
    </div>
    <?php
  }
  ?>
</article>
