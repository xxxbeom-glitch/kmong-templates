<?php
/**
 * Gate 2 — Main hero: full-bleed media layout, project tokens for UI.
 */
$hero_image = rathon_asset('images/hero/milad-fakurian-eRbgsJ0Ec0o-unsplash.jpg');
?>
<section class="home-hero" aria-labelledby="home-hero-title" data-hero-snap>
  <div class="home-hero__media" aria-hidden="true">
    <img
      class="home-hero__media-img"
      src="<?php echo $hero_image; ?>"
      alt=""
      width="1920"
      height="1080"
      decoding="async"
      fetchpriority="high"
    >
  </div>
  <div class="home-hero__veil" aria-hidden="true"></div>

  <div class="u-container">
    <div class="home-hero__copy">
      <h1 id="home-hero-title" class="home-hero__title">
        <?php echo esc_html__('계정과 권한, 인증을', 'rathontech-redesign-01'); ?><br>
        <?php echo esc_html__('하나의 보안 체계로 연결합니다', 'rathontech-redesign-01'); ?>
      </h1>
      <p class="home-hero__lead">
        <?php echo esc_html__('IAM·SSO·MFA부터 Zero Trust까지, 기업의 사용자와 시스템 접근을 안전하고 효율적으로 관리합니다.', 'rathontech-redesign-01'); ?>
      </p>
      <div class="home-hero__actions">
        <a class="btn btn--lg btn--primary-on-dark btn-slide-hover" href="<?php echo esc_url(rathon_url('contact')); ?>">
          <?php echo rathon_btn_slide_label(__('보안 환경 상담하기', 'rathontech-redesign-01')); ?>
        </a>
        <a class="btn btn--lg btn--secondary btn--secondary-on-dark btn-slide-hover" href="<?php echo esc_url(rathon_url('case-studies')); ?>">
          <?php echo rathon_btn_slide_label(__('도입사례 확인하기', 'rathontech-redesign-01')); ?>
        </a>
      </div>
    </div>
  </div>
</section>
<?php
unset($hero_image);
