<?php
/**
 * S07 Our space — Figma 614:313
 */
$spaces = hes_womens_clinic_space_items();
$tab_group_id = 'space-tabs';
$panel_id = 'space-panel';
?>
<section class="section-space" aria-labelledby="space-title">
  <div class="section-shell section-shell--gutter">
    <header class="section-space__header">
      <p class="section-space__eyebrow">OUR SPACE</p>
      <h2 id="space-title" class="section-space__title">진료 환경과 프라이버시</h2>
    </header>

    <div class="section-space__panel">
      <div
        id="<?php echo esc_attr($tab_group_id); ?>"
        class="section-space__tabs"
        role="tablist"
        aria-label="<?php esc_attr_e('공간 안내', '365-hes-womens-clinic'); ?>"
      >
        <?php foreach ($spaces as $index => $space) : ?>
          <?php
          $tab_id = $tab_group_id . '-tab-' . $index;
          $is_active = $index === 0;
          ?>
          <button
            type="button"
            id="<?php echo esc_attr($tab_id); ?>"
            class="section-space__tab<?php echo $is_active ? ' is-active' : ''; ?>"
            role="tab"
            aria-selected="<?php echo $is_active ? 'true' : 'false'; ?>"
            aria-controls="<?php echo esc_attr($panel_id); ?>"
            data-space-image="<?php echo esc_url(hes_womens_clinic_asset_uri($space['image'])); ?>"
            data-space-label="<?php echo esc_attr($space['label']); ?>"
          >
            <?php echo esc_html($space['label']); ?>
          </button>
        <?php endforeach; ?>
      </div>

      <div
        id="<?php echo esc_attr($panel_id); ?>"
        class="section-space__card"
        role="tabpanel"
        aria-labelledby="<?php echo esc_attr($tab_group_id); ?>-tab-0"
      >
        <img
          class="section-space__card-img"
          src="<?php echo esc_url(hes_womens_clinic_asset_uri($spaces[0]['image'])); ?>"
          alt=""
          width="1440"
          height="682"
          loading="lazy"
          decoding="async"
        >
        <span class="section-space__card-overlay" aria-hidden="true"></span>
        <p class="section-space__card-title"><?php echo esc_html($spaces[0]['label']); ?></p>
      </div>
    </div>
  </div>
</section>
