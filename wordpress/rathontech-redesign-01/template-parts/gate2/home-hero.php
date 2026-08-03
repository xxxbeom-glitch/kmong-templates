<?php
/**
 * Gate 2 — Main hero: full-bleed media layout, project tokens for UI.
 */
?>
<section class="home-hero" aria-labelledby="home-hero-title">
  <div class="home-hero__media" aria-hidden="true">
    <?php
    /**
     * Placeholder only. Replace with approved image or <video> later.
     */
    ?>
    <div class="home-hero__media-placeholder"></div>
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
        <a class="btn btn--primary" href="<?php echo esc_url(rathon_url('contact')); ?>">
          <?php echo esc_html__('보안 환경 상담하기', 'rathontech-redesign-01'); ?>
        </a>
        <a class="btn btn--secondary btn--secondary-on-dark" href="<?php echo esc_url(rathon_url('case-studies')); ?>">
          <?php echo esc_html__('도입사례 확인하기', 'rathontech-redesign-01'); ?>
        </a>
      </div>
    </div>
  </div>
</section>
