<?php
/**
 * @var array<string, mixed> $package
 */
$package = isset($package) ? $package : null;
if (!$package) {
  return;
}
?>
<article class="package-detail">
  <section class="section section--page-intro">
    <div class="section-shell section-shell--gutter">
      <p class="eyebrow"><?php echo esc_html($package['eyebrow']); ?></p>
      <h1 class="package-detail__name"><?php echo nl2br(esc_html(str_replace(' ', "\n", $package['name']))); ?></h1>
      <p class="package-detail__headline"><?php echo nl2br(esc_html($package['headline'])); ?></p>
      <p class="lead"><?php echo nl2br(esc_html($package['description'])); ?></p>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="summary-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="summary-title" class="visually-hidden">요약</h2>
      <dl class="summary-grid">
        <?php foreach ($package['summary'] as $row) : ?>
          <div class="summary-grid__item">
            <dt><?php echo esc_html($row['label']); ?></dt>
            <dd><?php echo esc_html($row['value']); ?></dd>
          </div>
        <?php endforeach; ?>
      </dl>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="recommended-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="recommended-title">이런 경우에 적합합니다</h2>
      <ul class="bullet-list">
        <?php foreach ($package['recommended'] as $item) : ?>
          <li><?php echo esc_html($item); ?></li>
        <?php endforeach; ?>
      </ul>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="included-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="included-title">포함 내용</h2>
      <div class="included-groups">
        <?php foreach ($package['included'] as $group => $items) : ?>
          <div class="included-group">
            <h3><?php echo esc_html($group); ?></h3>
            <ul class="bullet-list">
              <?php foreach ($items as $item) : ?>
                <li><?php echo esc_html($item); ?></li>
              <?php endforeach; ?>
            </ul>
          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="pkg-process-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="pkg-process-title">진행 과정</h2>
      <?php tenfold_part('components/timeline', array('steps' => $package['process'])); ?>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="prep-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="prep-title">준비해 주시면 좋은 자료</h2>
      <ul class="bullet-list">
        <?php foreach ($package['preparation'] as $item) : ?>
          <li><?php echo esc_html($item); ?></li>
        <?php endforeach; ?>
      </ul>
      <p class="note"><?php echo esc_html($package['preparation_note']); ?></p>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="pkg-addons-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="pkg-addons-title">추가 가능 항목</h2>
      <ul class="tag-list">
        <?php foreach ($package['addons'] as $addon) : ?>
          <li><span class="tag tag--outline"><?php echo esc_html($addon); ?></span></li>
        <?php endforeach; ?>
      </ul>
    </div>
  </section>

  <section class="section section--compact" aria-labelledby="notes-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="notes-title">유의사항</h2>
      <ul class="bullet-list">
        <?php foreach ($package['notes'] as $note) : ?>
          <li><?php echo esc_html($note); ?></li>
        <?php endforeach; ?>
      </ul>
    </div>
  </section>

  <section class="section section--closing-cta" aria-labelledby="pkg-cta-title">
    <div class="section-shell section-shell--gutter">
      <h2 id="pkg-cta-title"><?php echo nl2br(esc_html($package['cta_title'])); ?></h2>
      <?php if (!empty($package['cta_description'])) : ?>
        <p class="lead"><?php echo nl2br(esc_html($package['cta_description'])); ?></p>
      <?php endif; ?>
      <div class="btn-row">
        <a class="btn btn--primary" href="<?php echo esc_url($package['cta_primary_href']); ?>"><?php echo esc_html($package['cta_primary']); ?></a>
        <a class="btn btn--secondary" href="<?php echo esc_url($package['cta_secondary_href']); ?>"><?php echo esc_html($package['cta_secondary']); ?></a>
      </div>
    </div>
  </section>
</article>
