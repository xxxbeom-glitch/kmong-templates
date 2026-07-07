<?php
/**
 * S05 Medical staff — Figma 614:191
 */
$staff = hes_womens_clinic_medical_staff_content();
?>
<section class="section-medical-staff" aria-labelledby="medical-staff-title">
  <div class="section-medical-staff__media" aria-hidden="true">
    <img
      class="section-medical-staff__bg"
      src="<?php echo esc_url(hes_womens_clinic_asset_uri('medical-staff')); ?>"
      alt=""
      width="1920"
      height="560"
      loading="lazy"
      decoding="async"
    >
    <div class="section-medical-staff__overlay"></div>
  </div>

  <div class="section-shell section-shell--gutter">
    <div class="section-medical-staff__inner">
      <div class="section-medical-staff__copy">
        <p class="section-medical-staff__eyebrow"><?php echo esc_html($staff['eyebrow']); ?></p>
        <h2 id="medical-staff-title" class="section-medical-staff__title">
          <?php echo wp_kses($staff['title'], array('br' => array())); ?>
        </h2>
      </div>
      <a class="section-medical-staff__cta" href="<?php echo esc_url($staff['cta_url']); ?>">
        <?php echo esc_html($staff['cta_label']); ?>
      </a>
    </div>
  </div>
</section>
