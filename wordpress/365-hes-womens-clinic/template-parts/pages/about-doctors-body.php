<?php
$content = hes_womens_clinic_about_doctors_content();
?>
<section class="about-doctors" aria-labelledby="about-doctors-title">
  <div class="section-shell section-shell--gutter">
    <header class="about-doctors__header">
      <p class="about-doctors__eyebrow"><?php echo esc_html($content['eyebrow']); ?></p>
      <h2 id="about-doctors-title" class="about-doctors__title"><?php echo esc_html($content['title']); ?></h2>
    </header>

    <div class="about-doctors__list">
      <?php foreach ($content['doctors'] as $doctor) : ?>
        <article class="about-doctors__card<?php echo !empty($doctor['reverse']) ? ' about-doctors__card--reverse' : ''; ?>">
          <div class="about-doctors__photo" data-placeholder aria-hidden="true">
            <span class="screen-reader-text"><?php echo esc_html($doctor['name']); ?></span>
          </div>
          <div class="about-doctors__info">
            <div class="about-doctors__head">
              <h3 class="about-doctors__name"><?php echo esc_html($doctor['name']); ?></h3>
              <p class="about-doctors__role"><?php echo esc_html($doctor['role']); ?></p>
            </div>
            <div class="about-doctors__block">
              <p class="about-doctors__label">전문 진료</p>
              <p class="about-doctors__value"><?php echo esc_html($doctor['specialty']); ?></p>
            </div>
            <div class="about-doctors__block">
              <p class="about-doctors__label">주요 경력</p>
              <ul class="about-doctors__careers">
                <?php foreach ($doctor['careers'] as $career) : ?>
                  <li><?php echo esc_html($career); ?></li>
                <?php endforeach; ?>
              </ul>
            </div>
            <div class="about-doctors__block">
              <p class="about-doctors__label">진료 요일</p>
              <p class="about-doctors__value"><?php echo esc_html($doctor['days']); ?></p>
            </div>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
