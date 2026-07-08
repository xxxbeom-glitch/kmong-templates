<?php
$overview = hes_womens_clinic_checkup_overview();
$programs = hes_womens_clinic_checkup_programs();
$process = hes_womens_clinic_checkup_process();
$program_items = isset($programs['items']) ? $programs['items'] : array();
$program_active = isset($program_items[0]) ? $program_items[0] : null;
$program_active_image = $program_active ? hes_womens_clinic_asset_uri($program_active['image']) : '';
?>

<section class="checkup-overview" aria-labelledby="checkup-overview-title">
  <div class="section-shell section-shell--gutter">
    <div class="checkup-overview__row">
      <div class="checkup-overview__lead">
        <div class="checkup-overview__heading">
          <p class="checkup-overview__eyebrow"><?php echo esc_html($overview['eyebrow']); ?></p>
          <h2 id="checkup-overview-title" class="checkup-overview__title"><?php echo wp_kses($overview['title'], array('br' => array())); ?></h2>
        </div>
        <div class="checkup-overview__copy">
          <?php foreach ($overview['paragraphs'] as $paragraph) : ?>
            <p class="checkup-overview__text"><?php echo esc_html($paragraph); ?></p>
          <?php endforeach; ?>
        </div>
      </div>

      <ul class="checkup-overview__cases">
        <?php foreach ($overview['cases'] as $case) : ?>
          <li class="checkup-overview__case">
            <span class="checkup-overview__check" aria-hidden="true"></span>
            <span class="checkup-overview__case-text"><?php echo esc_html($case); ?></span>
          </li>
        <?php endforeach; ?>
      </ul>
    </div>

    <figure class="checkup-overview__media">
      <img
        src="<?php echo esc_url(hes_womens_clinic_asset_uri($overview['image'])); ?>"
        alt=""
        loading="lazy"
        decoding="async"
      >
    </figure>
  </div>
</section>

<section class="checkup-programs" aria-labelledby="checkup-programs-title">
  <div class="section-shell section-shell--gutter">
    <header class="checkup-programs__header">
      <p class="checkup-programs__eyebrow"><?php echo esc_html($programs['eyebrow']); ?></p>
      <h2 id="checkup-programs-title" class="checkup-programs__title"><?php echo esc_html($programs['title']); ?></h2>
    </header>

    <div class="checkup-programs__content">
      <figure class="checkup-programs__media">
        <img
          class="checkup-programs__img"
          src="<?php echo esc_url($program_active_image); ?>"
          alt=""
          loading="lazy"
          decoding="async"
        >
      </figure>
      <ol class="checkup-programs__list" role="tablist" aria-label="<?php echo esc_attr($programs['title']); ?>">
        <?php foreach ($program_items as $index => $item) : ?>
          <?php
          $is_active = $index === 0;
          $trigger_id = 'checkup-program-tab-' . sanitize_title($item['num']);
          ?>
          <li class="checkup-programs__item<?php echo $is_active ? ' is-active' : ''; ?>">
            <button
              type="button"
              class="checkup-programs__trigger<?php echo $is_active ? ' is-active' : ''; ?>"
              id="<?php echo esc_attr($trigger_id); ?>"
              role="tab"
              aria-selected="<?php echo $is_active ? 'true' : 'false'; ?>"
              data-program-image="<?php echo esc_url(hes_womens_clinic_asset_uri($item['image'])); ?>"
            >
              <span class="checkup-programs__num" aria-hidden="true"><?php echo esc_html($item['num']); ?></span>
              <span class="checkup-programs__copy">
                <span class="checkup-programs__label"><?php echo esc_html($item['label']); ?></span>
                <span class="checkup-programs__desc"><?php echo esc_html($item['desc']); ?></span>
              </span>
            </button>
          </li>
        <?php endforeach; ?>
      </ol>
    </div>
  </div>
</section>

<section class="checkup-process" aria-labelledby="checkup-process-title">
  <div class="section-shell section-shell--gutter">
    <header class="checkup-process__header">
      <p class="checkup-process__eyebrow"><?php echo esc_html($process['eyebrow']); ?></p>
      <h2 id="checkup-process-title" class="checkup-process__title"><?php echo esc_html($process['title']); ?></h2>
    </header>

    <ol class="checkup-process__cards">
      <?php foreach ($process['steps'] as $step) : ?>
        <li class="checkup-process__card">
          <span class="checkup-process__num" aria-hidden="true"><?php echo esc_html($step['num']); ?></span>
          <h3 class="checkup-process__label"><?php echo esc_html($step['label']); ?></h3>
          <p class="checkup-process__desc"><?php echo esc_html($step['desc']); ?></p>
        </li>
      <?php endforeach; ?>
    </ol>
  </div>
</section>
