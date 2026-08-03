<?php
/**
 * Home — Contact CTA band only (Company intro removed from main).
 * Full-bleed band (no card / no section margin).
 */
$cta_image = rathon_asset('images/hero/dynamic-wang-irn9H9-Kfq4-unsplash.jpg');
?>
<section class="home-cta" aria-labelledby="home-cta-title">
  <aside class="home-company__cta" aria-labelledby="home-cta-title">
    <span
      class="home-company__cta-media"
      style="background-image: url('<?php echo esc_url($cta_image); ?>');"
      aria-hidden="true"
    ></span>
    <span class="home-company__cta-veil" aria-hidden="true"></span>
    <div class="u-container home-company__cta-inner">
      <div class="home-company__cta-copy">
        <p class="home-company__cta-eyebrow"><?php echo esc_html__('Online Inquiry', 'rathontech-redesign-01'); ?></p>
        <h2 id="home-cta-title" class="home-company__cta-title">
          <?php echo esc_html__('우리 조직의 계정·권한·인증 환경을 점검해보세요', 'rathontech-redesign-01'); ?>
        </h2>
        <p class="home-company__cta-lead">
          <?php echo esc_html__('현재 시스템과 보안 요구사항을 확인한 뒤 적합한 방향을 안내합니다.', 'rathontech-redesign-01'); ?>
        </p>
      </div>
      <div class="home-company__cta-actions">
        <a class="home-company__cta-btn home-company__cta-btn--primary" href="<?php echo esc_url(rathon_url('contact')); ?>">
          <?php echo esc_html__('보안 환경 상담하기', 'rathontech-redesign-01'); ?>
        </a>
        <a class="home-company__cta-btn home-company__cta-btn--ghost" href="tel:028577730">
          <?php echo esc_html__('전화 상담 02-857-7730', 'rathontech-redesign-01'); ?>
        </a>
      </div>
    </div>
  </aside>
</section>
<?php
unset($cta_image);
