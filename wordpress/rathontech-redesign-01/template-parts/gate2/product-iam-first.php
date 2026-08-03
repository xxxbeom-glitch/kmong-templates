<?php
/**
 * Gate 2 — Rathon-IAM product hero + overview first block.
 */
?>
<nav class="product-crumb u-container" aria-label="<?php echo esc_attr__('브레드크럼', 'rathontech-redesign-01'); ?>">
  <ol class="product-crumb__list">
    <li><a href="<?php echo esc_url(rathon_url()); ?>"><?php echo esc_html__('홈', 'rathontech-redesign-01'); ?></a></li>
    <li><a href="<?php echo esc_url(rathon_url('products')); ?>"><?php echo esc_html__('제품', 'rathontech-redesign-01'); ?></a></li>
    <li aria-current="page"><?php echo esc_html__('Rathon-IAM', 'rathontech-redesign-01'); ?></li>
  </ol>
</nav>

<section class="product-hero" aria-labelledby="iam-title">
  <div class="u-container">
    <div class="product-hero__meta">
      <span class="product-hero__chip"><?php echo esc_html__('계정·권한', 'rathontech-redesign-01'); ?></span>
      <span class="product-hero__chip product-hero__chip--own"><?php echo esc_html__('자사 제품', 'rathontech-redesign-01'); ?></span>
    </div>
    <h1 id="iam-title" class="product-hero__title"><?php echo esc_html__('Rathon-IAM', 'rathontech-redesign-01'); ?></h1>
    <p class="product-hero__value">
      <?php echo esc_html__('계정 생성부터 권한 회수까지, 기업 계정과 접근 권한을 중앙에서 관리하는 ID 거버넌스 제품입니다.', 'rathontech-redesign-01'); ?>
    </p>
    <div class="product-hero__actions">
      <a class="btn btn--primary" href="<?php echo esc_url(rathon_url('contact')); ?>"><?php echo esc_html__('문의하기', 'rathontech-redesign-01'); ?></a>
      <a class="btn btn--ghost" href="<?php echo esc_url(rathon_url('case-studies')); ?>"><?php echo esc_html__('관련 도입사례 보기', 'rathontech-redesign-01'); ?></a>
    </div>

    <div class="lifecycle" aria-label="<?php echo esc_attr__('계정 생애주기 흐름', 'rathontech-redesign-01'); ?>">
      <p class="lifecycle__label"><?php echo esc_html__('이 제품의 핵심 표현 — 계정 생애주기·권한 거버넌스', 'rathontech-redesign-01'); ?></p>
      <ol class="lifecycle__steps">
        <li class="lifecycle__step">
          <p class="lifecycle__name"><?php echo esc_html__('생성', 'rathontech-redesign-01'); ?></p>
          <p class="lifecycle__desc"><?php echo esc_html__('입사·계약에 맞춘 계정 발급', 'rathontech-redesign-01'); ?></p>
        </li>
        <li class="lifecycle__step">
          <p class="lifecycle__name"><?php echo esc_html__('권한 부여', 'rathontech-redesign-01'); ?></p>
          <p class="lifecycle__desc"><?php echo esc_html__('역할·정책 기반 접근 설정', 'rathontech-redesign-01'); ?></p>
        </li>
        <li class="lifecycle__step">
          <p class="lifecycle__name"><?php echo esc_html__('변경·검토', 'rathontech-redesign-01'); ?></p>
          <p class="lifecycle__desc"><?php echo esc_html__('이동·직무 변경 시 재조정', 'rathontech-redesign-01'); ?></p>
        </li>
        <li class="lifecycle__step">
          <p class="lifecycle__name"><?php echo esc_html__('회수', 'rathontech-redesign-01'); ?></p>
          <p class="lifecycle__desc"><?php echo esc_html__('퇴사·종료 시 권한 회수', 'rathontech-redesign-01'); ?></p>
        </li>
      </ol>
    </div>
  </div>
</section>

<section class="product-overview" aria-labelledby="iam-overview-title">
  <div class="u-container">
    <header class="product-overview__head">
      <p class="product-overview__eyebrow"><?php echo esc_html__('Product Overview', 'rathontech-redesign-01'); ?></p>
      <h2 id="iam-overview-title" class="product-overview__title"><?php echo esc_html__('무엇을 해결하는 제품인가', 'rathontech-redesign-01'); ?></h2>
    </header>

    <div class="product-overview__grid">
      <article class="overview-block">
        <h3 class="overview-block__title"><?php echo esc_html__('해결 문제', 'rathontech-redesign-01'); ?></h3>
        <p class="overview-block__body">
          <?php echo esc_html__('입사·이동·퇴사에 따라 흩어지는 계정과 권한을 중앙에서 관리하지 못하면 미회수 권한과 운영 부담이 커집니다. Rathon-IAM은 계정 생애주기와 권한을 하나의 거버넌스 흐름으로 정리합니다.', 'rathontech-redesign-01'); ?>
        </p>
      </article>
      <article class="overview-block">
        <h3 class="overview-block__title"><?php echo esc_html__('적용 환경', 'rathontech-redesign-01'); ?></h3>
        <ul class="overview-block__list">
          <li><?php echo esc_html__('기업·금융·공공·교육·제조', 'rathontech-redesign-01'); ?></li>
          <li><?php echo esc_html__('클라우드·온프레미스 혼재 환경', 'rathontech-redesign-01'); ?></li>
          <li><?php echo esc_html__('통합계정·권한관리 솔루션 영역', 'rathontech-redesign-01'); ?></li>
        </ul>
      </article>
      <article class="overview-block">
        <h3 class="overview-block__title"><?php echo esc_html__('제품 설명', 'rathontech-redesign-01'); ?></h3>
        <p class="overview-block__body">
          <?php echo esc_html__('기업 계정과 접근 권한을 중앙에서 관리하는 ID 거버넌스 제품입니다. 계정 생성부터 권한 회수까지 운영 표준을 맞추고, 관련 솔루션·사례와 연결해 도입 근거를 확인합니다.', 'rathontech-redesign-01'); ?>
        </p>
      </article>
    </div>
  </div>
</section>
