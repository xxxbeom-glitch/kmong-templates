<?php
/**
 * S06 Examination system — Figma 614:284
 */
$steps = hes_womens_clinic_examination_steps();
?>
<section class="section-examination" aria-labelledby="examination-title">
  <div class="section-shell section-shell--gutter">
    <header class="section-examination__header">
      <p class="section-examination__eyebrow">SYSTEM</p>
      <h2 id="examination-title" class="section-examination__title">체계적인 진료 시스템</h2>
    </header>

    <ol class="section-examination__steps">
      <?php foreach ($steps as $index => $step) : ?>
        <li class="section-examination__item">
          <div class="section-examination__circle">
            <span class="section-examination__num" aria-hidden="true"><?php echo esc_html($step['num']); ?></span>
            <span class="section-examination__label"><?php echo esc_html($step['label']); ?></span>
          </div>
          <?php if ($index < count($steps) - 1) : ?>
            <span class="section-examination__chevron" aria-hidden="true">
              <img
                src="<?php echo esc_url(hes_womens_clinic_asset_uri('icon-chevron-right')); ?>"
                alt=""
                width="24"
                height="24"
                decoding="async"
              >
            </span>
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
    </ol>
  </div>
</section>
