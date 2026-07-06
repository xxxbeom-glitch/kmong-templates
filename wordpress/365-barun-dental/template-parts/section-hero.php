<?php
/**
 * Hero / KV — Figma 453:348
 */
?>
<section class="section-hero" aria-labelledby="hero-title">
  <div class="section-hero__media" aria-hidden="true">
    <img
      class="section-hero__bg"
      src="<?php echo esc_url(barun_dental_asset_uri('hero-kv')); ?>"
      alt=""
      width="1920"
      height="820"
      decoding="async"
    >
    <div class="section-hero__overlay"></div>
  </div>

  <div class="section-shell section-shell--gutter">
    <div class="section-hero__inner">
      <div class="section-hero__content">
        <div class="section-hero__heading">
          <p class="section-hero__eyebrow">EVERYDAY ORAL CARE · 365</p>
          <div class="section-hero__copy">
            <h1 id="hero-title" class="section-hero__title">
              <span class="section-hero__title-line">매일의 치아를</span>
              <span class="section-hero__title-line">오래, 바르게.</span>
            </h1>
            <div class="section-hero__desc">
              <p>충분히 설명하고 꼭 필요한 만큼 진료합니다.</p>
              <p>치료 이후의 일상까지 오래 살피는 치과입니다.</p>
            </div>
          </div>
        </div>

        <div class="section-hero__cta">
          <a href="#" class="section-hero__btn section-hero__btn--primary btn-slide-hover">
            <?php echo barun_dental_button_slide('진료 예약하기'); ?>
          </a>
          <a href="#" class="section-hero__btn section-hero__btn--outline btn-slide-hover">
            <?php echo barun_dental_button_slide('진료과목 보기'); ?>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
