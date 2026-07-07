<?php
/**
 * S09 Location — Figma 614:368
 */
$location = hes_womens_clinic_location_content();
?>
<section class="section-location" aria-labelledby="location-title">
  <div class="section-shell section-shell--gutter">
    <header class="section-location__header">
      <p class="section-location__eyebrow">LOCATION</p>
      <h2 id="location-title" class="section-location__title">오시는 길</h2>
    </header>

    <div class="section-location__content">
      <div class="section-location__map" aria-hidden="true"></div>

      <div class="section-location__info">
        <div class="section-location__block">
          <p class="section-location__label">오시는 길</p>
          <p class="section-location__address"><?php echo esc_html($location['address']); ?></p>
          <p class="section-location__sub"><?php echo esc_html($location['access']); ?></p>
        </div>

        <div class="section-location__block">
          <p class="section-location__label">대표 전화</p>
          <a class="section-location__phone" href="<?php echo esc_url($location['phone_href']); ?>">
            <?php echo esc_html($location['phone']); ?>
          </a>
        </div>

        <div class="section-location__hours">
          <h3 class="section-location__hours-title">진료시간 안내</h3>
          <dl class="section-location__hours-list">
            <?php foreach ($location['hours'] as $row) : ?>
              <div class="section-location__hours-row">
                <dt><?php echo esc_html($row['label']); ?></dt>
                <dd><?php echo esc_html($row['time']); ?></dd>
              </div>
            <?php endforeach; ?>
          </dl>
          <p class="section-location__hours-note"><?php echo esc_html($location['hours_note']); ?></p>
        </div>
      </div>
    </div>
  </div>
</section>
