<?php
/**
 * Home Section 4 — Evidence (Quiet Zone).
 * Cases 3 + industry summary + cert facts. No fake metrics/logos.
 */

$cases = array(
  array(
    'client'  => __('대림그룹', 'rathontech-redesign-01'),
    'problem' => __('통합 인증·계정관리', 'rathontech-redesign-01'),
    'product' => 'Rathon-SSO',
    'result'  => __('단일 로그인과 인증 정책 표준화', 'rathontech-redesign-01'),
    'href'    => rathon_url('case-studies/daelim-sso'),
  ),
  array(
    'client'  => __('LIG넥스원', 'rathontech-redesign-01'),
    'problem' => __('계정·권한관리 고도화', 'rathontech-redesign-01'),
    'product' => 'Rathon-IAM',
    'result'  => __('노후 IM 교체와 관리 자동화·표준화', 'rathontech-redesign-01'),
    'href'    => rathon_url('case-studies/lig-nex1-iam'),
  ),
  array(
    'client'  => __('SK하이닉스', 'rathontech-redesign-01'),
    'problem' => __('통합 접근제어', 'rathontech-redesign-01'),
    'product' => 'Rathon-AM',
    'result'  => __('Zero Trust 기반 위험 평가와 접근통제', 'rathontech-redesign-01'),
    'href'    => rathon_url('case-studies/sk-hynix-am'),
  ),
);

$industries = array(
  __('금융', 'rathontech-redesign-01'),
  __('제조', 'rathontech-redesign-01'),
  __('공공·교육', 'rathontech-redesign-01'),
  __('건설', 'rathontech-redesign-01'),
  __('일반기업', 'rathontech-redesign-01'),
);

$certs = array(
  array(
    'name' => __('GS 인증', 'rathontech-redesign-01'),
    'note' => __('제품 보유', 'rathontech-redesign-01'),
  ),
  array(
    'name' => __('국제 CC', 'rathontech-redesign-01'),
    'note' => __('인증 제품 보유', 'rathontech-redesign-01'),
  ),
  array(
    'name' => __('KCMVP', 'rathontech-redesign-01'),
    'note' => __('검증필 암호모듈', 'rathontech-redesign-01'),
  ),
);
?>
<section class="home-evidence" aria-labelledby="home-evidence-title">
  <div class="u-container">
    <header class="home-evidence__head">
      <p class="home-evidence__eyebrow"><?php echo esc_html__('Evidence', 'rathontech-redesign-01'); ?></p>
      <h2 id="home-evidence-title" class="home-evidence__title">
        <?php echo esc_html__('도입 증거로 확인합니다', 'rathontech-redesign-01'); ?>
      </h2>
      <p class="home-evidence__lead">
        <?php echo esc_html__('대표 사례, 고객군, 인증 사실만 짧게 정리했습니다.', 'rathontech-redesign-01'); ?>
      </p>
    </header>

    <div class="home-evidence__cases-wrap">
      <h3 class="home-evidence__sub"><?php echo esc_html__('대표 도입사례', 'rathontech-redesign-01'); ?></h3>
      <ul class="home-evidence__cases">
        <?php foreach ($cases as $case) : ?>
          <li class="home-evidence__case">
            <a class="home-evidence__case-link" href="<?php echo esc_url($case['href']); ?>">
              <p class="home-evidence__client"><?php echo esc_html($case['client']); ?></p>
              <p class="home-evidence__problem"><?php echo esc_html($case['problem']); ?></p>
              <p class="home-evidence__meta">
                <span class="home-evidence__product"><?php echo esc_html($case['product']); ?></span>
              </p>
              <p class="home-evidence__result"><?php echo esc_html($case['result']); ?></p>
            </a>
          </li>
        <?php endforeach; ?>
      </ul>
      <p class="home-evidence__more-wrap">
        <a class="btn btn--ghost" href="<?php echo esc_url(rathon_url('case-studies')); ?>">
          <?php echo esc_html__('전체 도입사례 보기', 'rathontech-redesign-01'); ?>
          <span aria-hidden="true">→</span>
        </a>
      </p>
    </div>

    <div class="home-evidence__split">
      <div class="home-evidence__block">
        <h3 class="home-evidence__sub"><?php echo esc_html__('고객군', 'rathontech-redesign-01'); ?></h3>
        <p class="home-evidence__block-note">
          <?php echo esc_html__('로고는 권리 확인 후 배치합니다. 지금은 산업군만 표시합니다.', 'rathontech-redesign-01'); ?>
        </p>
        <ul class="home-evidence__industries">
          <?php foreach ($industries as $industry) : ?>
            <li><?php echo esc_html($industry); ?></li>
          <?php endforeach; ?>
        </ul>
      </div>

      <div class="home-evidence__block">
        <h3 class="home-evidence__sub"><?php echo esc_html__('인증', 'rathontech-redesign-01'); ?></h3>
        <p class="home-evidence__block-note">
          <?php echo esc_html__('원본 인증현황 기준으로 확인된 항목입니다.', 'rathontech-redesign-01'); ?>
        </p>
        <ul class="home-evidence__certs">
          <?php foreach ($certs as $cert) : ?>
            <li class="home-evidence__cert">
              <span class="home-evidence__cert-name"><?php echo esc_html($cert['name']); ?></span>
              <span class="home-evidence__cert-note"><?php echo esc_html($cert['note']); ?></span>
            </li>
          <?php endforeach; ?>
        </ul>
        <p class="home-evidence__more-wrap home-evidence__more-wrap--tight">
          <a class="btn btn--ghost" href="<?php echo esc_url(rathon_url('company/certifications')); ?>">
            <?php echo esc_html__('인증현황 보기', 'rathontech-redesign-01'); ?>
            <span aria-hidden="true">→</span>
          </a>
        </p>
      </div>
    </div>
  </div>
</section>
<?php
unset($cases, $case, $industries, $industry, $certs, $cert);
