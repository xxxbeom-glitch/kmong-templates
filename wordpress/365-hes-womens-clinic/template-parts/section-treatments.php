<?php
/**
 * S04 Main treatments — Figma 614:88
 */
$rows = hes_womens_clinic_treatment_rows();
?>
<section class="section-treatments" aria-labelledby="treatments-title">
  <div class="section-shell section-shell--gutter">
    <header class="section-treatments__header">
      <p class="section-treatments__eyebrow">SIGNATURE</p>
      <h2 id="treatments-title" class="section-treatments__title">대표 진료</h2>
    </header>

    <div class="section-treatments__rows">
      <?php foreach ($rows as $row) : ?>
        <div class="section-treatments__row<?php echo $row['flip'] ? ' section-treatments__row--flip' : ''; ?>">
          <?php foreach ($row['items'] as $item) : ?>
            <a
              class="section-treatments__card<?php echo $item['wide'] ? ' section-treatments__card--wide' : ''; ?>"
              href="<?php echo esc_url($item['url']); ?>"
            >
              <img
                class="section-treatments__card-img"
                src="<?php echo esc_url(hes_womens_clinic_asset_uri($item['image'])); ?>"
                alt=""
                width="754"
                height="400"
                loading="lazy"
                decoding="async"
              >
              <span class="section-treatments__card-overlay" aria-hidden="true"></span>
              <span class="section-treatments__card-title"><?php echo esc_html($item['label']); ?></span>
            </a>
          <?php endforeach; ?>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>
