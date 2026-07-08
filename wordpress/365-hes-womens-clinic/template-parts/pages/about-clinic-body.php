<?php
$content = hes_womens_clinic_about_clinic_content();
$paragraphs = array_filter(explode("\n\n", $content['body']));
?>
<section class="about-clinic" aria-labelledby="about-clinic-title">
  <div class="section-shell section-shell--gutter">
    <div class="about-clinic__intro">
      <div class="about-clinic__copy">
        <p class="about-clinic__eyebrow"><?php echo esc_html($content['eyebrow']); ?></p>
        <h2 id="about-clinic-title" class="about-clinic__title">
          <?php echo wp_kses($content['title'], array('br' => array())); ?>
        </h2>
        <?php foreach ($paragraphs as $paragraph) : ?>
          <p class="about-clinic__text"><?php echo esc_html(trim($paragraph)); ?></p>
        <?php endforeach; ?>
      </div>
      <div class="about-clinic__media" data-placeholder aria-hidden="true">
        <span class="screen-reader-text"><?php esc_html_e('병원 소개 이미지', '365-hes-womens-clinic'); ?></span>
      </div>
    </div>
  </div>
</section>

<section class="about-features" aria-labelledby="about-features-title">
  <div class="section-shell section-shell--gutter">
    <h2 id="about-features-title" class="screen-reader-text"><?php esc_html_e('병원 특징', '365-hes-womens-clinic'); ?></h2>
    <ul class="about-features__grid">
      <?php foreach ($content['features'] as $index => $feature) : ?>
        <li class="about-features__item">
          <h3 class="about-features__title"><?php echo esc_html($feature['title']); ?></h3>
          <p class="about-features__desc"><?php echo esc_html($feature['desc']); ?></p>
        </li>
        <?php if ($index < count($content['features']) - 1) : ?>
          <li class="about-features__divider" aria-hidden="true"></li>
        <?php endif; ?>
      <?php endforeach; ?>
    </ul>
  </div>
</section>
