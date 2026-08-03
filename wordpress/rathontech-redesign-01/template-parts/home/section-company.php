<?php
/**
 * Home Section 5 — Company + Contact CTA.
 * Confirmed facts only (planning + company page).
 */

$history = array(
  array(
    'when' => __('2025~', 'rathontech-redesign-01'),
    'text' => __('Rathon-IAM v4.0 · Rathon-SSO v4.5 저작권 등록', 'rathontech-redesign-01'),
  ),
  array(
    'when' => __('최근', 'rathontech-redesign-01'),
    'text' => __('검증필 암호모듈(KCMVP) 인증 획득', 'rathontech-redesign-01'),
  ),
  array(
    'when' => __('최근', 'rathontech-redesign-01'),
    'text' => __('Rathon-SSO v4.0 국제 CC 인증 획득', 'rathontech-redesign-01'),
  ),
  array(
    'when' => __('2024~2026', 'rathontech-redesign-01'),
    'text' => __('청년친화 강소기업 선정 (고용노동부)', 'rathontech-redesign-01'),
  ),
  array(
    'when' => __('2002', 'rathontech-redesign-01'),
    'text' => __('주식회사 라톤테크 창립', 'rathontech-redesign-01'),
  ),
);
?>
<section class="home-company" aria-labelledby="home-company-title">
  <div class="u-container">
    <div class="home-company__layout">
      <div class="home-company__intro">
        <p class="home-company__eyebrow"><?php echo esc_html__('Company', 'rathontech-redesign-01'); ?></p>
        <h2 id="home-company-title" class="home-company__title">
          <?php echo esc_html__('사람과 기술을 안전하게 연결합니다', 'rathontech-redesign-01'); ?>
        </h2>
        <p class="home-company__lead">
          <?php echo esc_html__('2002년부터 IAM·인증 분야에 집중해 온 IT 보안 전문 기업입니다. 통합계정·권한관리, 클라우드 계정관리, 컨설팅으로 고객의 디지털 환경에 안정성과 효율성을 더합니다.', 'rathontech-redesign-01'); ?>
        </p>
        <ul class="home-company__areas" aria-label="<?php echo esc_attr__('핵심 사업 영역', 'rathontech-redesign-01'); ?>">
          <li><?php echo esc_html__('IAM', 'rathontech-redesign-01'); ?></li>
          <li><?php echo esc_html__('Cloud Identity', 'rathontech-redesign-01'); ?></li>
          <li><?php echo esc_html__('Consulting', 'rathontech-redesign-01'); ?></li>
        </ul>
        <a class="btn btn--ghost" href="<?php echo esc_url(rathon_url('company')); ?>">
          <?php echo esc_html__('회사소개 보기', 'rathontech-redesign-01'); ?>
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <div class="home-company__history">
        <h3 class="home-company__sub"><?php echo esc_html__('연혁 요약', 'rathontech-redesign-01'); ?></h3>
        <ol class="home-company__timeline">
          <?php foreach ($history as $item) : ?>
            <li class="home-company__timeline-item">
              <span class="home-company__when"><?php echo esc_html($item['when']); ?></span>
              <span class="home-company__event"><?php echo esc_html($item['text']); ?></span>
            </li>
          <?php endforeach; ?>
        </ol>
      </div>
    </div>

    <aside class="home-company__cta" aria-labelledby="home-cta-title">
      <span class="home-company__cta-media" aria-hidden="true"></span>
      <span class="home-company__cta-veil" aria-hidden="true"></span>
      <div class="home-company__cta-inner">
        <div class="home-company__cta-copy">
          <p class="home-company__cta-eyebrow"><?php echo esc_html__('Online Inquiry', 'rathontech-redesign-01'); ?></p>
          <h3 id="home-cta-title" class="home-company__cta-title">
            <?php echo esc_html__('우리 조직의 계정·권한·인증 환경을 점검해보세요', 'rathontech-redesign-01'); ?>
          </h3>
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

    <dl class="home-company__contact">
      <div>
        <dt><?php echo esc_html__('대표전화', 'rathontech-redesign-01'); ?></dt>
        <dd><a href="tel:028577730">02-857-7730</a></dd>
      </div>
      <div>
        <dt><?php echo esc_html__('주소', 'rathontech-redesign-01'); ?></dt>
        <dd><?php echo esc_html__('서울시 금천구 디지털로 178, A동 619~622호 (가산동, 가산퍼블릭)', 'rathontech-redesign-01'); ?></dd>
      </div>
    </dl>
  </div>
</section>
<?php
unset($history, $item);
