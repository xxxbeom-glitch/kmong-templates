<?php
/**
 * Space — Figma 453:543
 */
$gallery = barun_dental_space_gallery();
?>
<section class="section-space" aria-labelledby="space-title">
  <div class="section-shell section-shell--gutter">
    <div class="section-space__inner">
      <header class="section-space__header">
        <p class="section-space__label scroll-reveal">SPACE</p>
        <h2 id="space-title" class="section-space__title">
          <span class="section-space__title-line scroll-reveal">머무는 시간까지</span>
          <span class="section-space__title-line scroll-reveal">편안할 수 있도록</span>
        </h2>
      </header>

      <div class="section-space__gallery" role="list">
        <?php foreach ($gallery as $item) : ?>
          <?php $img = barun_dental_asset_uri($item['image']); ?>
          <figure class="section-space__card scroll-reveal" role="listitem">
            <?php if ($img) : ?>
              <img
                class="section-space__card-img"
                src="<?php echo esc_url($img); ?>"
                alt=""
                width="500"
                height="420"
                decoding="async"
              />
            <?php endif; ?>
            <figcaption class="section-space__caption">
              <p class="section-space__eyebrow"><?php echo esc_html($item['eyebrow']); ?></p>
              <p class="section-space__card-title"><?php echo esc_html($item['title']); ?></p>
            </figcaption>
          </figure>
        <?php endforeach; ?>
      </div>
    </div>
  </div>
</section>
