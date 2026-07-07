<?php
$location = hes_womens_clinic_location_content();
?>

<section class="sub-schedule">
  <div class="section-shell section-shell--gutter">
    <div class="sub-schedule__panel">
      <h2 class="sub-schedule__title">진료시간</h2>
      <dl class="sub-schedule__hours">
        <?php foreach ($location['hours'] as $row) : ?>
          <div class="sub-schedule__row">
            <dt><?php echo esc_html($row['label']); ?></dt>
            <dd><?php echo esc_html($row['time']); ?></dd>
          </div>
        <?php endforeach; ?>
      </dl>
      <?php if (!empty($location['hours_note'])) : ?>
        <p class="sub-schedule__note"><?php echo esc_html($location['hours_note']); ?></p>
      <?php endif; ?>
      <p class="sub-schedule__phone">
        대표전화:
        <a href="<?php echo esc_url($location['phone_href']); ?>"><?php echo esc_html($location['phone']); ?></a>
      </p>
    </div>
  </div>
</section>
