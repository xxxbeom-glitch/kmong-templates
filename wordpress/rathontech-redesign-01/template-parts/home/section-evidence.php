<?php
/**
 * Home Section 4 — Evidence.
 * Thumb → label → subtext × 3, with page nav 1–3.
 */

$evidence_pages = array(
  array(
    array(
      'client' => __('대림그룹', 'rathontech-redesign-01'),
      'sub'    => __('통합 인증·계정관리 · Rathon-SSO로 인증 정책 표준화', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/daelim-sso'),
      'tone'   => 'tone-a',
    ),
    array(
      'client' => __('LIG넥스원', 'rathontech-redesign-01'),
      'sub'    => __('계정·권한관리 고도화 · Rathon-IAM으로 관리 자동화·표준화', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/lig-nex1-iam'),
      'tone'   => 'tone-b',
    ),
    array(
      'client' => __('SK하이닉스', 'rathontech-redesign-01'),
      'sub'    => __('통합 접근제어 · Rathon-AM으로 Zero Trust 접근통제', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/sk-hynix-am'),
      'tone'   => 'tone-c',
    ),
  ),
  array(
    array(
      'client' => __('신한투자증권', 'rathontech-redesign-01'),
      'sub'    => __('차세대 인증·권한관리 · Rathon-SSO, Rathon-IAM', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/shinhan-investment'),
      'tone'   => 'tone-a',
    ),
    array(
      'client' => __('전남대학교', 'rathontech-redesign-01'),
      'sub'    => __('인증·계정관리 고도화 · Rathon-SSO 기반 통합 로그인', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/jnu'),
      'tone'   => 'tone-b',
    ),
    array(
      'client' => __('서민금융진흥원', 'rathontech-redesign-01'),
      'sub'    => __('SSO 구축 · 통합 로그인과 중앙 보안 정책', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/kinfa'),
      'tone'   => 'tone-c',
    ),
  ),
  array(
    array(
      'client' => __('호텔신라', 'rathontech-redesign-01'),
      'sub'    => __('통합계정관리 재구축 · Rathon-IAM으로 감사 대응·효율 향상', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/shilla'),
      'tone'   => 'tone-a',
    ),
    array(
      'client' => __('문화체육관광부', 'rathontech-redesign-01'),
      'sub'    => __('계정 통합관리 · 포털·업무시스템 계정 동기화', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/mcst'),
      'tone'   => 'tone-b',
    ),
    array(
      'client' => __('인천국제공항공사', 'rathontech-redesign-01'),
      'sub'    => __('계정관리 업그레이드 · 전자결재 환경의 관리 안정성', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/iiac'),
      'tone'   => 'tone-c',
    ),
  ),
);

$page_count = count($evidence_pages);
$initial    = $evidence_pages[0];
?>
<section class="home-evidence" aria-labelledby="home-evidence-title" data-evidence>
  <div class="u-container">
    <header class="home-evidence__head">
      <h2 id="home-evidence-title" class="home-evidence__title">
        <?php echo esc_html__('도입 증거', 'rathontech-redesign-01'); ?>
      </h2>
    </header>

    <ul class="home-evidence__grid" data-evidence-grid>
      <?php foreach ($initial as $case) : ?>
        <li class="home-evidence__item">
          <a class="home-evidence__card" href="<?php echo esc_url($case['href']); ?>">
            <span class="home-evidence__thumb home-evidence__thumb--<?php echo esc_attr($case['tone']); ?>" aria-hidden="true"></span>
            <span class="home-evidence__label"><?php echo esc_html($case['client']); ?></span>
            <span class="home-evidence__sub"><?php echo esc_html($case['sub']); ?></span>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>

    <nav class="home-evidence__pager" aria-label="<?php echo esc_attr__('도입 증거 페이지', 'rathontech-redesign-01'); ?>">
      <ul class="home-evidence__pages">
        <?php for ($p = 1; $p <= $page_count; $p++) : ?>
          <li>
            <button
              type="button"
              class="home-evidence__page<?php echo $p === 1 ? ' is-active' : ''; ?>"
              data-evidence-page="<?php echo esc_attr((string) $p); ?>"
              aria-label="<?php echo esc_attr(sprintf(/* translators: %d: page number */ __('%d페이지', 'rathontech-redesign-01'), $p)); ?>"
              <?php echo $p === 1 ? 'aria-current="page"' : ''; ?>
            ><?php echo esc_html((string) $p); ?></button>
          </li>
        <?php endfor; ?>
      </ul>
    </nav>

    <script type="application/json" data-evidence-pages><?php echo wp_json_encode($evidence_pages, JSON_UNESCAPED_UNICODE); ?></script>
  </div>
</section>
<?php
unset($evidence_pages, $page_count, $initial, $case, $p);
