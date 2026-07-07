<?php
/**
 * 여성질환 클리닉 — OK 클리닉식 정보 배열
 * 인트로 → 공감 2열 → 질환 그리드 → 검사 → 진료 과정
 */
$intro = hes_womens_clinic_womens_disease_intro();
$relate = hes_womens_clinic_womens_disease_relate();
$areas = hes_womens_clinic_womens_disease_areas();
$exams = hes_womens_clinic_womens_disease_exams();
$process = hes_womens_clinic_womens_disease_process();
$chevron_icon = hes_womens_clinic_asset_uri('icon-chevron-right');
$arrow_icon = hes_womens_clinic_asset_uri('icon-arrow-right');
?>

<!-- 인트로 -->
<section class="sub-intro" aria-label="<?php esc_attr_e('클리닉 소개', '365-hes-womens-clinic'); ?>">
  <div class="section-shell section-shell--gutter">
    <p class="sub-intro__text"><?php echo esc_html($intro['text']); ?></p>
  </div>
</section>

<!-- D02 + D04 공감 2열 -->
<section class="sub-relate" aria-labelledby="wd-relate-title">
  <div class="section-shell section-shell--gutter">
    <header class="sub-relate__header">
      <h2 id="wd-relate-title" class="sub-relate__title"><?php echo esc_html($relate['title']); ?></h2>
    </header>
    <div class="sub-relate__columns">
      <div class="sub-relate__col">
        <h3 class="sub-relate__col-title"><?php echo esc_html($relate['symptoms']['heading']); ?></h3>
        <ul class="sub-relate__list">
          <?php foreach ($relate['symptoms']['items'] as $item) : ?>
            <li class="sub-relate__item"><?php echo esc_html($item); ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
      <div class="sub-relate__col">
        <h3 class="sub-relate__col-title"><?php echo esc_html($relate['when']['heading']); ?></h3>
        <ul class="sub-relate__list">
          <?php foreach ($relate['when']['items'] as $item) : ?>
            <li class="sub-relate__item"><?php echo esc_html($item); ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- D03 주요 진료 영역 -->
<section class="sub-areas" aria-labelledby="wd-areas-title">
  <div class="section-shell section-shell--gutter">
    <header class="sub-areas__header">
      <h2 id="wd-areas-title" class="sub-areas__title"><?php echo esc_html($areas['title']); ?></h2>
      <?php if (!empty($areas['guide'])) : ?>
        <p class="sub-areas__guide"><?php echo esc_html($areas['guide']); ?></p>
      <?php endif; ?>
    </header>
    <h3 class="sub-areas__subtitle"><?php echo esc_html($areas['subtitle']); ?></h3>
    <ul class="sub-areas__grid">
      <?php foreach ($areas['items'] as $item) : ?>
        <li>
          <a class="sub-areas__card<?php echo !empty($item['image']) ? ' sub-areas__card--image' : ''; ?>" href="<?php echo esc_url($item['url']); ?>">
            <?php if (!empty($item['image'])) : ?>
              <img
                class="sub-areas__card-img"
                src="<?php echo esc_url(hes_womens_clinic_asset_uri($item['image'])); ?>"
                alt=""
                loading="lazy"
                decoding="async"
              >
              <span class="sub-areas__card-overlay" aria-hidden="true"></span>
            <?php endif; ?>
            <span class="sub-areas__card-label"><?php echo esc_html($item['label']); ?></span>
            <span class="sub-areas__card-arrow" aria-hidden="true">
              <img src="<?php echo esc_url($arrow_icon); ?>" alt="" width="18" height="18" decoding="async">
            </span>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>

<!-- D05 검사와 진단 -->
<section class="sub-exams" aria-labelledby="wd-exams-title">
  <div class="section-shell section-shell--gutter">
    <header class="sub-exams__header">
      <h2 id="wd-exams-title" class="sub-exams__title"><?php echo esc_html($exams['title']); ?></h2>
      <?php if (!empty($exams['desc'])) : ?>
        <p class="sub-exams__desc"><?php echo esc_html($exams['desc']); ?></p>
      <?php endif; ?>
    </header>
    <ul class="sub-exams__grid">
      <?php foreach ($exams['items'] as $item) : ?>
        <li class="sub-exams__card"><?php echo esc_html($item); ?></li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>

<!-- D06 진료 과정 -->
<section class="sub-process section-examination" aria-labelledby="wd-process-title">
  <div class="section-shell section-shell--gutter">
    <header class="section-examination__header">
      <h2 id="wd-process-title" class="section-examination__title"><?php echo esc_html($process['title']); ?></h2>
      <?php if (!empty($process['desc'])) : ?>
        <p class="sub-process__desc"><?php echo esc_html($process['desc']); ?></p>
      <?php endif; ?>
    </header>
    <ol class="section-examination__steps">
      <?php foreach ($process['steps'] as $index => $step) : ?>
        <li class="section-examination__item">
          <div class="section-examination__circle">
            <span class="section-examination__num" aria-hidden="true"><?php echo esc_html($step['num']); ?></span>
            <span class="section-examination__label"><?php echo esc_html($step['label']); ?></span>
          </div>
          <?php if ($index < count($process['steps']) - 1) : ?>
            <span class="section-examination__chevron" aria-hidden="true">
              <img src="<?php echo esc_url($chevron_icon); ?>" alt="" width="24" height="24" decoding="async">
            </span>
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
    </ol>
  </div>
</section>
