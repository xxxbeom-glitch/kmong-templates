<?php
/**
 * Gate 2 — Main hero: full-bleed media + trust snapshot.
 */
$hero_image = rathon_asset('images/hero/milad-fakurian-eRbgsJ0Ec0o-unsplash.jpg');

$hero_trust = array(
  __('2002년 창립', 'rathontech-redesign-01'),
  __('GS 인증 제품 보유', 'rathontech-redesign-01'),
  __('국제 CC 인증 제품 보유', 'rathontech-redesign-01'),
  __('KCMVP 검증필 암호모듈 보유', 'rathontech-redesign-01'),
);
?>
<section class="home-hero" aria-labelledby="home-hero-title">
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
        <a class="btn btn--primary-on-dark" href="<?php echo esc_url(rathon_url('contact')); ?>">
          <?php echo esc_html__('보안 환경 상담하기', 'rathontech-redesign-01'); ?>
        </a>
        <a class="btn btn--secondary btn--secondary-on-dark" href="<?php echo esc_url(rathon_url('case-studies')); ?>">
          <?php echo esc_html__('도입사례 확인하기', 'rathontech-redesign-01'); ?>
        </a>
      </div>
      <ul class="home-hero__trust" aria-label="<?php echo esc_attr__('신뢰 근거', 'rathontech-redesign-01'); ?>">
        <?php foreach ($hero_trust as $fact) : ?>
          <li class="home-hero__trust-item"><?php echo esc_html($fact); ?></li>
        <?php endforeach; ?>
      </ul>
    </div>
  </div>
</section>
<?php
unset($hero_image, $hero_trust, $fact);
