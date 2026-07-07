<?php
/**
 * S03 Symptom finder — Figma 614:61
 */
$symptoms = hes_womens_clinic_symptom_items();
?>
<section class="section-symptom" aria-labelledby="symptom-title">
  <div class="section-shell section-shell--gutter">
    <header class="section-symptom__header">
      <p class="section-symptom__eyebrow">SYMPTOM FINDER</p>
      <h2 id="symptom-title" class="section-symptom__title">지금 어떤 불편이 있으신가요?</h2>
    </header>

    <div class="section-symptom__grid">
      <?php foreach ($symptoms as $item) : ?>
        <a class="section-symptom__card" href="<?php echo esc_url($item['url']); ?>">
          <span class="section-symptom__card-text"><?php echo esc_html($item['label']); ?></span>
          <span class="section-symptom__card-icon" aria-hidden="true">
            <img
              src="<?php echo esc_url(hes_womens_clinic_asset_uri('icon-arrow-right')); ?>"
              alt=""
              width="20"
              height="20"
              decoding="async"
            >
          </span>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
