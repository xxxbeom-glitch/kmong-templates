<?php
/**
 * Home Section 3 — Product Ecosystem.
 * Grouped lists (core / extension / partner) — not 10 identical cards.
 */

$product_groups = array(
  array(
    'id'    => 'core',
    'label' => __('라톤테크 핵심 제품', 'rathontech-redesign-01'),
    'note'  => __('계정·인증·디렉토리·접근의 중심 제품군', 'rathontech-redesign-01'),
    'items' => array(
      array(
        'name' => 'Rathon-IAM',
        'role' => __('기업 계정과 접근 권한을 중앙에서 관리하는 ID 거버넌스', 'rathontech-redesign-01'),
        'href' => rathon_url('products/rathon-iam'),
      ),
      array(
        'name' => 'Rathon-SSO',
        'role' => __('한 번의 로그인으로 여러 업무 시스템에 접근하는 통합인증', 'rathontech-redesign-01'),
        'href' => rathon_url('products/rathon-sso'),
      ),
      array(
        'name' => 'Rathon-LDAP',
        'role' => __('디렉토리 기반 사용자·그룹·시스템 계정 통합관리', 'rathontech-redesign-01'),
        'href' => rathon_url('products/rathon-ldap'),
      ),
      array(
        'name' => 'Rathon-AM',
        'role' => __('장치·위치·행동 위험을 평가해 접근을 제어', 'rathontech-redesign-01'),
        'href' => rathon_url('products/rathon-am'),
      ),
    ),
  ),
  array(
    'id'    => 'extend',
    'label' => __('보안 확장 제품', 'rathontech-redesign-01'),
    'note'  => __('암호·Windows 로그인·다중인증으로 보안 영역을 넓힙니다', 'rathontech-redesign-01'),
    'items' => array(
      array(
        'name' => 'RTJCrypto',
        'role' => __('국가·공공기관 환경을 위한 검증필 암호모듈', 'rathontech-redesign-01'),
        'href' => rathon_url('products/rtjcrypto'),
      ),
      array(
        'name' => 'WinLogin',
        'role' => __('스마트폰·OTP·NFC를 활용한 비밀번호 없는 Windows 로그인', 'rathontech-redesign-01'),
        'href' => rathon_url('products/winlogin'),
      ),
      array(
        'name' => 'MFA',
        'role' => __('생체인증·OTP·간편인증을 통합하는 다중인증', 'rathontech-redesign-01'),
        'href' => rathon_url('products/mfa'),
      ),
    ),
  ),
  array(
    'id'    => 'partner',
    'label' => __('파트너 제품', 'rathontech-redesign-01'),
    'note'  => __('구축·연동은 라톤테크가 수행합니다', 'rathontech-redesign-01'),
    'items' => array(
      array(
        'name' => 'Symantec SiteMinder',
        'role' => __('웹 애플리케이션 접근을 중앙에서 통합 관리하는 인증', 'rathontech-redesign-01'),
        'href' => rathon_url('products/symantec-siteminder'),
      ),
      array(
        'name' => 'IBM-SAM',
        'role' => __('인증·권한·SSO·리버스 프록시를 제공하는 접근관리', 'rathontech-redesign-01'),
        'href' => rathon_url('products/ibm-sam'),
      ),
      array(
        'name' => 'IBM-SDS',
        'role' => __('LDAP 기반 사용자·시스템 정보 중앙관리 디렉토리', 'rathontech-redesign-01'),
        'href' => rathon_url('products/ibm-sds'),
      ),
    ),
  ),
);
?>
<section class="home-eco" aria-labelledby="home-eco-title">
  <div class="u-container">
    <header class="home-eco__head">
      <div class="home-eco__head-copy">
        <p class="home-eco__eyebrow"><?php echo esc_html__('Product Ecosystem', 'rathontech-redesign-01'); ?></p>
        <h2 id="home-eco-title" class="home-eco__title">
          <?php echo esc_html__('솔루션을 실제로 만드는 제품군', 'rathontech-redesign-01'); ?>
        </h2>
        <p class="home-eco__lead">
          <?php echo esc_html__('자사 핵심·확장 제품과 파트너 제품을 구분해 보여 드립니다. 각 제품은 역할 한 줄로 먼저 파악한 뒤 상세로 이어집니다.', 'rathontech-redesign-01'); ?>
        </p>
      </div>
      <a class="btn btn--primary home-eco__cta" href="<?php echo esc_url(rathon_url('products')); ?>">
        <?php echo esc_html__('전체 제품 보기', 'rathontech-redesign-01'); ?>
      </a>
    </header>

    <div class="home-eco__groups">
      <?php foreach ($product_groups as $group) : ?>
        <section class="home-eco__group" aria-labelledby="eco-<?php echo esc_attr($group['id']); ?>">
          <div class="home-eco__group-head">
            <h3 id="eco-<?php echo esc_attr($group['id']); ?>" class="home-eco__group-title">
              <?php echo esc_html($group['label']); ?>
            </h3>
            <p class="home-eco__group-note"><?php echo esc_html($group['note']); ?></p>
          </div>
          <ul class="home-eco__list">
            <?php foreach ($group['items'] as $item) : ?>
              <li class="home-eco__row">
                <a class="home-eco__row-link" href="<?php echo esc_url($item['href']); ?>">
                  <span class="home-eco__name"><?php echo esc_html($item['name']); ?></span>
                  <span class="home-eco__role"><?php echo esc_html($item['role']); ?></span>
                  <span class="home-eco__go" aria-hidden="true">→</span>
                </a>
              </li>
            <?php endforeach; ?>
          </ul>
        </section>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php
unset($product_groups, $group, $item);
