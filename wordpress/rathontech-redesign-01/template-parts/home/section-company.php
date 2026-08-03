<?php
/**
 * Home — Contact CTA band only (Company intro removed from main).
 * Full-bleed band (no card / no section margin).
 */
$cta_image = rathon_asset('images/hero/mike-kononov-lFv0V3_2H6s-unsplash.jpg');
?>
<section class="home-cta" aria-labelledby="home-cta-title">
  <aside class="home-company__cta" aria-labelledby="home-cta-title">
    <span class="home-company__cta-media" aria-hidden="true">
      <img
        class="home-company__cta-media-img"
        src="<?php echo $cta_image; ?>"
        alt=""
        width="2400"
        height="1600"
        decoding="async"
        loading="lazy"
      >
    </span>
    <span class="home-company__cta-veil" aria-hidden="true"></span>
    <div class="u-container home-company__cta-inner">
      <div class="home-company__cta-copy" data-reveal>
        <h2 id="home-cta-title" class="home-company__cta-title">
          <?php echo esc_html__('우리 조직의 계정·권한·인증 환경을 점검해보세요', 'rathontech-redesign-01'); ?>
        </h2>
      </div>
      <div class="home-company__cta-actions" data-reveal style="--reveal-delay: 0.14s">
        <a class="btn btn--lg btn--primary-on-dark" href="<?php echo esc_url(rathon_url('contact')); ?>">
          <?php echo esc_html__('보안 환경 상담하기', 'rathontech-redesign-01'); ?>
        </a>
        <a class="btn btn--lg btn--secondary btn--secondary-on-dark" href="tel:028577730">
          <?php echo esc_html__('전화 상담 02-857-7730', 'rathontech-redesign-01'); ?>
        </a>
      </div>
    </div>
  </aside>
</section>
<?php
unset($cta_image);
