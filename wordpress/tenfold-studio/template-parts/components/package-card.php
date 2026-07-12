<?php
/**
 * @var array<string, mixed> $package
 */
$package = isset($package) ? $package : null;
if (!$package) {
  return;
}
$href = tenfold_url('services/' . $package['slug']);
?>
<article class="package-card">
  <p class="eyebrow"><?php echo esc_html($package['eyebrow']); ?></p>
  <h3 class="package-card__name"><?php echo esc_html($package['name']); ?></h3>
  <p class="package-card__headline"><?php echo nl2br(esc_html($package['card_headline'])); ?></p>
  <p class="package-card__desc"><?php echo esc_html($package['card_description']); ?></p>
  <ul class="package-card__meta">
    <?php foreach ($package['card_meta'] as $meta) : ?>
      <li><?php echo esc_html($meta); ?></li>
    <?php endforeach; ?>
  </ul>
  <a class="btn btn--secondary" href="<?php echo esc_url($href); ?>">구성 확인하기</a>
</article>
