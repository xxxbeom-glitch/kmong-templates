<?php
/**
 * Home Section 4 — Evidence.
 * Thumb → label → subtext × 4 per page, pager 1–3.
 */

$evidence_thumbs = array(
  rathon_asset('images/thumb/anastasiia-rozumna-hUEs9AFpdQg-unsplash.jpg'),
  rathon_asset('images/thumb/d-koi-_3yUyAOg_ZY-unsplash.jpg'),
  rathon_asset('images/thumb/soheb-zaidi-7Czm0mjIaWs-unsplash.jpg'),
  rathon_asset('images/thumb/shubham-dhage-bhiQQm1urPI-unsplash.jpg'),
  rathon_asset('images/thumb/dynamic-wang-KZuZAaEojq4-unsplash.jpg'),
  rathon_asset('images/thumb/ela-de-pure-h7lfy7HoIE8-unsplash.jpg'),
  rathon_asset('images/thumb/shubham-dhage-8HaKRwazMrQ-unsplash.jpg'),
);

$evidence_raw = array(
  array(
    array(
      'client' => __('대림그룹', 'rathontech-redesign-01'),
      'sub'    => __('통합 인증·계정관리 · Rathon-SSO', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/daelim-sso'),
    ),
    array(
      'client' => __('LIG넥스원', 'rathontech-redesign-01'),
      'sub'    => __('계정·권한관리 · Rathon-IAM', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/lig-nex1-iam'),
    ),
    array(
      'client' => __('SK하이닉스', 'rathontech-redesign-01'),
      'sub'    => __('통합 접근제어 · Rathon-AM', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/sk-hynix-am'),
    ),
    array(
      'client' => __('신한투자증권', 'rathontech-redesign-01'),
      'sub'    => __('차세대 인증·권한 · SSO·IAM', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/shinhan-investment'),
    ),
  ),
  array(
    array(
      'client' => __('전남대학교', 'rathontech-redesign-01'),
      'sub'    => __('인증·계정관리 · Rathon-SSO', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/jnu'),
    ),
    array(
      'client' => __('서민금융진흥원', 'rathontech-redesign-01'),
      'sub'    => __('SSO 구축 · 중앙 보안 정책', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/kinfa'),
    ),
    array(
      'client' => __('호텔신라', 'rathontech-redesign-01'),
      'sub'    => __('통합계정관리 · Rathon-IAM', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/shilla'),
    ),
    array(
      'client' => __('문화체육관광부', 'rathontech-redesign-01'),
      'sub'    => __('계정 통합관리 · 시스템 동기화', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/mcst'),
    ),
  ),
  array(
    array(
      'client' => __('인천국제공항공사', 'rathontech-redesign-01'),
      'sub'    => __('계정관리 · 전자결재 안정성', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/iiac'),
    ),
    array(
      'client' => __('신한금융투자', 'rathontech-redesign-01'),
      'sub'    => __('통합인증 · SSO·IAM 표준화', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/shinhan-fi'),
    ),
    array(
      'client' => __('LG전자', 'rathontech-redesign-01'),
      'sub'    => __('통합인증 · 서비스 연속성', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/lge'),
    ),
    array(
      'client' => __('인천국제공항공사', 'rathontech-redesign-01'),
      'sub'    => __('LDAP · 전자결재 안정성', 'rathontech-redesign-01'),
      'href'   => rathon_url('case-studies/iiac-ldap'),
    ),
  ),
);

$evidence_pages = array();
$thumb_i        = 0;
$thumb_count    = count($evidence_thumbs);
foreach ($evidence_raw as $page) {
  $mapped = array();
  foreach ($page as $case) {
    $case['image'] = $evidence_thumbs[ $thumb_i % $thumb_count ];
    $thumb_i++;
    $mapped[] = $case;
  }
  $evidence_pages[] = $mapped;
}

$page_count = count($evidence_pages);
$initial    = $evidence_pages[0];
?>
<section class="home-evidence" aria-labelledby="home-evidence-title" data-evidence>
  <div class="u-container">
    <header class="home-evidence__head">
      <h2 id="home-evidence-title" class="home-evidence__title">
        <?php echo esc_html__('도입 증거', 'rathontech-redesign-01'); ?>
      </h2>
      <p class="home-evidence__lead">
        <?php echo esc_html__('대표 도입사례로 적용 결과를 확인하세요.', 'rathontech-redesign-01'); ?>
      </p>
    </header>

    <ul class="home-evidence__grid" data-evidence-grid>
      <?php foreach ($initial as $case) : ?>
        <li class="home-evidence__item">
          <a class="home-evidence__card" href="<?php echo esc_url($case['href']); ?>">
            <span
              class="home-evidence__thumb"
              style="background-image: url('<?php echo esc_url($case['image']); ?>');"
              aria-hidden="true"
            ></span>
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

    <script type="application/json" data-evidence-pages><?php echo wp_json_encode($evidence_pages, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?></script>
  </div>
</section>
<?php
unset($evidence_thumbs, $evidence_raw, $evidence_pages, $page_count, $initial, $case, $p, $thumb_i, $thumb_count, $page, $mapped);
