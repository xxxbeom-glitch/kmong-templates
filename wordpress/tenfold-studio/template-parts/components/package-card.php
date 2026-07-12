<?php
/**
 * @var array<string, mixed> $package
 */
$package = isset($package) ? $package : null;
if (!$package) {
  return;
}
$href = tenfold_url('services/' . $package['slug']);
$recommended = isset($package['card_recommended']) ? $package['card_recommended'] : array();
$summary = isset($package['card_summary']) ? $package['card_summary'] : array();
$cta = isset($package['card_cta']) ? $package['card_cta'] : '자세히 보기';
?>
<article class="package-card">
  <div class="package-card__intro">
    <p class="eyebrow"><?php echo esc_html($package['eyebrow']); ?></p>
    <h3 class="package-card__name"><?php echo esc_html($package['name']); ?></h3>
    <p class="package-card__headline"><?php echo nl2br(esc_html($package['card_headline'])); ?></p>
    <p class="package-card__desc"><?php echo nl2br(esc_html($package['card_description'])); ?></p>
  </div>

  <div class="package-card__section package-card__section--recommend">
    <p class="package-card__label"><?php echo esc_html($package['card_recommended_label']); ?></p>
    <ul class="package-card__checklist">
      <?php foreach ($recommended as $item) : ?>
        <li>
          <span class="package-card__check" aria-hidden="true">
            <?php echo tenfold_icon('check', array('class' => 'icon icon--check', 'width' => '16', 'height' => '16')); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- trusted theme SVG ?>
          </span>
          <span class="package-card__check-text"><?php echo esc_html($item); ?></span>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>

  <div class="package-card__section package-card__section--included">
    <p class="package-card__label"><?php echo esc_html($package['card_included_label']); ?></p>
    <p class="package-card__included"><?php echo esc_html($package['card_included']); ?></p>
  </div>

  <div class="package-card__section package-card__section--summary">
    <dl class="package-card__summary">
      <?php foreach ($summary as $row) : ?>
        <div class="package-card__summary-item">
          <dt><?php echo esc_html($row['label']); ?></dt>
          <dd><?php echo esc_html($row['value']); ?></dd>
        </div>
      <?php endforeach; ?>
    </dl>
    <?php if (!empty($package['card_note'])) : ?>
      <p class="package-card__note"><?php echo esc_html($package['card_note']); ?></p>
    <?php endif; ?>
  </div>

  <div class="package-card__cta">
    <a class="btn btn--secondary" href="<?php echo esc_url($href); ?>"><?php echo esc_html($cta); ?></a>
  </div>
</article>
