<?php
/**
 * Digital — Figma 453:516
 */
$features = barun_dental_digital_features();
$default_img = '';

if (!empty($features[0]['image'])) {
  $default_img = barun_dental_asset_uri($features[0]['image']);
}
?>
<section class="section-digital" aria-labelledby="digital-title">
  <div class="section-shell section-shell--gutter">
    <div class="section-digital__inner">
      <header class="section-digital__header">
        <p class="section-digital__label scroll-reveal">DIGITAL CARE</p>
        <h2 id="digital-title" class="section-digital__title">
          <span class="section-digital__title-line scroll-reveal">눈으로 확인하고</span>
          <span class="section-digital__title-line scroll-reveal">이해할 수 있는 진료</span>
        </h2>
      </header>

      <div class="section-digital__content">
        <figure class="section-digital__media scroll-reveal">
          <?php if ($default_img) : ?>
            <img
              class="section-digital__img"
              src="<?php echo esc_url($default_img); ?>"
              alt=""
              width="908"
              height="723"
              decoding="async"
            />
          <?php endif; ?>
        </figure>

        <div class="section-digital__list" role="list">
          <?php foreach ($features as $index => $feature) : ?>
            <?php
            $image_uri = barun_dental_asset_uri($feature['image']);
            $is_first  = $index === 0;
            ?>
            <?php if ($index > 0) : ?>
              <span class="section-digital__divider" aria-hidden="true"></span>
            <?php endif; ?>

            <article
              class="section-digital__item scroll-reveal<?php echo $is_first ? ' is-active' : ''; ?>"
              role="listitem"
            >
              <button
                type="button"
                class="section-digital__trigger"
                data-image="<?php echo esc_url($image_uri); ?>"
                aria-pressed="<?php echo $is_first ? 'true' : 'false'; ?>"
              >
                <span class="section-digital__num" aria-hidden="true"><?php echo esc_html($feature['num']); ?></span>
                <span class="section-digital__copy">
                  <span class="section-digital__item-title"><?php echo esc_html($feature['title']); ?></span>
                  <span class="section-digital__item-desc"><?php echo esc_html($feature['desc']); ?></span>
                </span>
              </button>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</section>
