<?php
/**
 * 클리닉형 본문 — 인트로 · 공감 2열 · 영역 그리드 · 검사 · 진료 과정
 *
 * @var array $args intro, relate, areas, exams, process
 */
$intro = isset($args['intro']) ? $args['intro'] : array();
$relate = isset($args['relate']) ? $args['relate'] : null;
$areas = isset($args['areas']) ? $args['areas'] : null;
$exams = isset($args['exams']) ? $args['exams'] : null;
$process = isset($args['process']) ? $args['process'] : null;
$chevron_icon = hes_womens_clinic_asset_uri('icon-chevron-right');
$arrow_icon = hes_womens_clinic_asset_uri('icon-arrow-right');
?>

<?php if (!empty($intro['text'])) : ?>
  <section class="sub-intro" aria-label="<?php esc_attr_e('클리닉 소개', '365-hes-womens-clinic'); ?>">
    <div class="section-shell section-shell--gutter">
      <p class="sub-intro__text"><?php echo esc_html($intro['text']); ?></p>
    </div>
  </section>
<?php endif; ?>

<?php if (!empty($relate)) : ?>
  <section class="sub-relate" aria-labelledby="clinic-relate-title">
    <div class="section-shell section-shell--gutter">
      <header class="sub-relate__header">
        <h2 id="clinic-relate-title" class="sub-relate__title"><?php echo esc_html($relate['title']); ?></h2>
      </header>
      <div class="sub-relate__columns">
        <?php if (!empty($relate['symptoms'])) : ?>
          <div class="sub-relate__col">
            <h3 class="sub-relate__col-title"><?php echo esc_html($relate['symptoms']['heading']); ?></h3>
            <ul class="sub-relate__list">
              <?php foreach ($relate['symptoms']['items'] as $item) : ?>
                <li class="sub-relate__item"><?php echo esc_html($item); ?></li>
              <?php endforeach; ?>
            </ul>
          </div>
        <?php endif; ?>
        <?php if (!empty($relate['when'])) : ?>
          <div class="sub-relate__col">
            <h3 class="sub-relate__col-title"><?php echo esc_html($relate['when']['heading']); ?></h3>
            <ul class="sub-relate__list">
              <?php foreach ($relate['when']['items'] as $item) : ?>
                <li class="sub-relate__item"><?php echo esc_html($item); ?></li>
              <?php endforeach; ?>
            </ul>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </section>
<?php endif; ?>

<?php if (!empty($areas['items'])) : ?>
  <section class="sub-areas" aria-labelledby="clinic-areas-title">
    <div class="section-shell section-shell--gutter">
      <?php if (!empty($areas['title'])) : ?>
        <header class="sub-areas__header">
          <h2 id="clinic-areas-title" class="sub-areas__title"><?php echo esc_html($areas['title']); ?></h2>
          <?php if (!empty($areas['guide'])) : ?>
            <p class="sub-areas__guide"><?php echo esc_html($areas['guide']); ?></p>
          <?php endif; ?>
        </header>
      <?php endif; ?>
      <?php if (!empty($areas['subtitle'])) : ?>
        <h3 class="sub-areas__subtitle"><?php echo esc_html($areas['subtitle']); ?></h3>
      <?php endif; ?>
      <ul class="sub-areas__grid">
        <?php foreach ($areas['items'] as $item) : ?>
          <li>
            <a class="sub-areas__card<?php echo !empty($item['image']) ? ' sub-areas__card--image' : ''; ?>" href="<?php echo esc_url($item['url']); ?>">
              <?php if (!empty($item['image'])) : ?>
                <img class="sub-areas__card-img" src="<?php echo esc_url(hes_womens_clinic_asset_uri($item['image'])); ?>" alt="" loading="lazy" decoding="async">
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
<?php endif; ?>

<?php if (!empty($exams['items'])) : ?>
  <section class="sub-exams" aria-labelledby="clinic-exams-title">
    <div class="section-shell section-shell--gutter">
      <header class="sub-exams__header">
        <h2 id="clinic-exams-title" class="sub-exams__title"><?php echo esc_html($exams['title']); ?></h2>
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
<?php endif; ?>

<?php if (!empty($process['steps'])) : ?>
  <section class="sub-process section-examination" aria-labelledby="clinic-process-title">
    <div class="section-shell section-shell--gutter">
      <header class="section-examination__header">
        <h2 id="clinic-process-title" class="section-examination__title"><?php echo esc_html($process['title']); ?></h2>
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
<?php endif; ?>
