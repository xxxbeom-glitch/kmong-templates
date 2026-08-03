<?php
/**
 * Gate 2 — Main hero + Signature Move + trust strip.
 */
?>
<section class="home-hero" aria-labelledby="home-hero-title">
  <div class="u-container home-hero__grid">
    <div class="home-hero__copy">
      <p class="home-hero__eyebrow"><?php echo esc_html__('Identity & Access Security', 'rathontech-redesign-01'); ?></p>
      <h1 id="home-hero-title" class="home-hero__title">
        <?php echo esc_html__('계정과 권한, 인증을', 'rathontech-redesign-01'); ?><br>
        <?php echo esc_html__('하나의 보안 체계로 연결합니다', 'rathontech-redesign-01'); ?>
      </h1>
      <p class="home-hero__lead">
        <?php echo esc_html__('IAM·SSO·MFA부터 Zero Trust까지, 기업의 사용자와 시스템 접근을 안전하고 효율적으로 관리합니다.', 'rathontech-redesign-01'); ?>
      </p>
      <div class="home-hero__actions">
        <a class="btn btn--primary" href="<?php echo esc_url(rathon_url('contact')); ?>"><?php echo esc_html__('보안 환경 상담하기', 'rathontech-redesign-01'); ?></a>
        <a class="btn btn--secondary" href="<?php echo esc_url(rathon_url('case-studies')); ?>"><?php echo esc_html__('도입사례 확인하기', 'rathontech-redesign-01'); ?></a>
      </div>
    </div>

    <div class="flow-graph" data-flow-graph>
      <p class="flow-graph__label"><?php echo esc_html__('Identity 연결 흐름', 'rathontech-redesign-01'); ?></p>

      <div class="flow-graph__track" aria-hidden="false">
        <article class="flow-node">
          <span class="flow-node__index">1</span>
          <div>
            <h2 class="flow-node__title"><?php echo esc_html__('사용자', 'rathontech-redesign-01'); ?></h2>
            <p class="flow-node__desc"><?php echo esc_html__('임직원·파트너·시스템 계정', 'rathontech-redesign-01'); ?></p>
          </div>
        </article>
        <article class="flow-node">
          <span class="flow-node__index">2</span>
          <div>
            <h2 class="flow-node__title"><?php echo esc_html__('인증', 'rathontech-redesign-01'); ?></h2>
            <p class="flow-node__desc"><?php echo esc_html__('SSO·MFA로 신원 확인', 'rathontech-redesign-01'); ?></p>
          </div>
        </article>
        <article class="flow-node">
          <span class="flow-node__index">3</span>
          <div>
            <h2 class="flow-node__title"><?php echo esc_html__('정책 판단', 'rathontech-redesign-01'); ?></h2>
            <p class="flow-node__desc"><?php echo esc_html__('권한·위험·정책 평가', 'rathontech-redesign-01'); ?></p>
          </div>
        </article>
        <article class="flow-node">
          <span class="flow-node__index">4</span>
          <div>
            <h2 class="flow-node__title"><?php echo esc_html__('업무 시스템', 'rathontech-redesign-01'); ?></h2>
            <p class="flow-node__desc"><?php echo esc_html__('허용된 자원에만 접근', 'rathontech-redesign-01'); ?></p>
          </div>
        </article>
      </div>

      <svg class="flow-graph__svg" viewBox="0 0 560 220" role="img" aria-label="<?php echo esc_attr__('사용자에서 인증, 정책 판단, 업무 시스템으로 이어지는 연결 그래프', 'rathontech-redesign-01'); ?>">
        <path class="flow-graph__edge" d="M70 110 H490" />
        <path class="flow-graph__edge-draw" d="M70 110 H490" pathLength="240" />

        <g>
          <circle class="flow-graph__node-ring is-active" cx="70" cy="110" r="28" />
          <circle class="flow-graph__dot" cx="70" cy="110" r="5" style="animation-delay:0.15s" />
          <text class="flow-graph__node-label" x="70" y="168" text-anchor="middle"><?php echo esc_html__('사용자', 'rathontech-redesign-01'); ?></text>
          <text class="flow-graph__node-sub" x="70" y="186" text-anchor="middle"><?php echo esc_html__('계정', 'rathontech-redesign-01'); ?></text>
        </g>
        <g>
          <circle class="flow-graph__node-ring is-active" cx="210" cy="110" r="28" />
          <circle class="flow-graph__dot" cx="210" cy="110" r="5" style="animation-delay:0.4s" />
          <text class="flow-graph__node-label" x="210" y="168" text-anchor="middle"><?php echo esc_html__('인증', 'rathontech-redesign-01'); ?></text>
          <text class="flow-graph__node-sub" x="210" y="186" text-anchor="middle"><?php echo esc_html__('SSO · MFA', 'rathontech-redesign-01'); ?></text>
        </g>
        <g>
          <circle class="flow-graph__node-ring is-active" cx="350" cy="110" r="28" />
          <circle class="flow-graph__dot" cx="350" cy="110" r="5" style="animation-delay:0.65s" />
          <text class="flow-graph__node-label" x="350" y="168" text-anchor="middle"><?php echo esc_html__('정책 판단', 'rathontech-redesign-01'); ?></text>
          <text class="flow-graph__node-sub" x="350" y="186" text-anchor="middle"><?php echo esc_html__('권한 · 위험', 'rathontech-redesign-01'); ?></text>
        </g>
        <g>
          <circle class="flow-graph__node-ring is-active" cx="490" cy="110" r="28" />
          <circle class="flow-graph__dot" cx="490" cy="110" r="5" style="animation-delay:0.9s" />
          <text class="flow-graph__node-label" x="490" y="168" text-anchor="middle"><?php echo esc_html__('업무 시스템', 'rathontech-redesign-01'); ?></text>
          <text class="flow-graph__node-sub" x="490" y="186" text-anchor="middle"><?php echo esc_html__('접근', 'rathontech-redesign-01'); ?></text>
        </g>
      </svg>
    </div>
  </div>

  <div class="u-container">
    <div class="trust-strip" aria-label="<?php echo esc_attr__('신뢰 근거', 'rathontech-redesign-01'); ?>">
      <ul class="trust-strip__list">
        <li class="trust-strip__item">
          <p class="trust-strip__value"><?php echo esc_html__('2002', 'rathontech-redesign-01'); ?></p>
          <p class="trust-strip__label"><?php echo esc_html__('창립', 'rathontech-redesign-01'); ?></p>
        </li>
        <li class="trust-strip__item">
          <p class="trust-strip__value"><?php echo esc_html__('GS 인증', 'rathontech-redesign-01'); ?></p>
          <p class="trust-strip__label"><?php echo esc_html__('제품 보유', 'rathontech-redesign-01'); ?></p>
        </li>
        <li class="trust-strip__item">
          <p class="trust-strip__value"><?php echo esc_html__('국제 CC', 'rathontech-redesign-01'); ?></p>
          <p class="trust-strip__label"><?php echo esc_html__('인증 제품 보유', 'rathontech-redesign-01'); ?></p>
        </li>
        <li class="trust-strip__item">
          <p class="trust-strip__value"><?php echo esc_html__('KCMVP', 'rathontech-redesign-01'); ?></p>
          <p class="trust-strip__label"><?php echo esc_html__('검증필 암호모듈', 'rathontech-redesign-01'); ?></p>
        </li>
      </ul>
    </div>
  </div>
</section>
