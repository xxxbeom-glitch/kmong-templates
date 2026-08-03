<?php
/**
 * Minimal site header for Gate 2 screens.
 */
$home = rathon_url();
$contact = rathon_url('contact');
$is_iam = is_page_template('page-templates/product-rathon-iam.php') || is_page('rathon-iam');
?>
<header class="site-header" data-site-header>
  <div class="site-header__inner u-container">
    <a class="site-header__logo" href="<?php echo esc_url($home); ?>">RATHON<span>TECH</span></a>

    <nav class="site-header__nav" aria-label="<?php echo esc_attr__('주요 메뉴', 'rathontech-redesign-01'); ?>">
      <ul class="site-header__list">
        <li><a class="site-header__link" href="<?php echo esc_url(rathon_url('solutions')); ?>"><?php echo esc_html__('솔루션', 'rathontech-redesign-01'); ?></a></li>
        <li><a class="site-header__link<?php echo $is_iam ? ' is-active' : ''; ?>" href="<?php echo esc_url(rathon_url('products')); ?>"><?php echo esc_html__('제품', 'rathontech-redesign-01'); ?></a></li>
        <li><a class="site-header__link" href="<?php echo esc_url(rathon_url('case-studies')); ?>"><?php echo esc_html__('도입사례', 'rathontech-redesign-01'); ?></a></li>
        <li><a class="site-header__link" href="<?php echo esc_url(rathon_url('support/technical-support')); ?>"><?php echo esc_html__('고객지원', 'rathontech-redesign-01'); ?></a></li>
        <li><a class="site-header__link" href="<?php echo esc_url(rathon_url('company')); ?>"><?php echo esc_html__('회사', 'rathontech-redesign-01'); ?></a></li>
      </ul>
    </nav>

    <div class="site-header__actions">
      <a class="btn btn--primary site-header__cta" href="<?php echo esc_url($contact); ?>"><?php echo esc_html__('보안 환경 상담하기', 'rathontech-redesign-01'); ?></a>
      <button
        type="button"
        class="site-header__menu-btn"
        data-menu-toggle
        aria-label="<?php echo esc_attr__('메뉴 열기', 'rathontech-redesign-01'); ?>"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <span class="site-header__menu-btn-bars" aria-hidden="true"></span>
      </button>
    </div>
  </div>

  <div
    id="mobile-menu"
    class="mobile-menu"
    data-mobile-menu
    hidden
    inert
    role="dialog"
    aria-modal="true"
    aria-label="<?php echo esc_attr__('전체 메뉴', 'rathontech-redesign-01'); ?>"
  >
    <div class="u-container">
      <div class="mobile-menu__top">
        <p class="site-header__logo">RATHON<span>TECH</span></p>
        <button type="button" class="mobile-menu__close" data-menu-close><?php echo esc_html__('닫기', 'rathontech-redesign-01'); ?></button>
      </div>
      <nav aria-label="<?php echo esc_attr__('모바일 메뉴', 'rathontech-redesign-01'); ?>">
        <ul class="mobile-menu__list">
          <li><a class="mobile-menu__link" href="<?php echo esc_url(rathon_url('solutions')); ?>"><?php echo esc_html__('솔루션', 'rathontech-redesign-01'); ?></a></li>
          <li><a class="mobile-menu__link" href="<?php echo esc_url(rathon_url('products')); ?>"><?php echo esc_html__('제품', 'rathontech-redesign-01'); ?></a></li>
          <li><a class="mobile-menu__link" href="<?php echo esc_url(rathon_url('case-studies')); ?>"><?php echo esc_html__('도입사례', 'rathontech-redesign-01'); ?></a></li>
          <li><a class="mobile-menu__link" href="<?php echo esc_url(rathon_url('support/technical-support')); ?>"><?php echo esc_html__('고객지원', 'rathontech-redesign-01'); ?></a></li>
          <li><a class="mobile-menu__link" href="<?php echo esc_url(rathon_url('company')); ?>"><?php echo esc_html__('회사', 'rathontech-redesign-01'); ?></a></li>
        </ul>
      </nav>
      <a class="btn btn--primary mobile-menu__cta" href="<?php echo esc_url($contact); ?>"><?php echo esc_html__('보안 환경 상담하기', 'rathontech-redesign-01'); ?></a>
    </div>
  </div>
</header>
<?php
unset($home, $contact, $is_iam);
