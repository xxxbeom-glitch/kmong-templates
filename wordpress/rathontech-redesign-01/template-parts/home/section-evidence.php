<?php
/**
 * Home Section 4 — Evidence.
 * Layout: 3 media cards (thumb → label → subtext). Our tokens only.
 */

$cases = array(
  array(
    'client'  => __('대림그룹', 'rathontech-redesign-01'),
    'sub'     => __('통합 인증·계정관리 · Rathon-SSO로 인증 정책 표준화', 'rathontech-redesign-01'),
    'href'    => rathon_url('case-studies/daelim-sso'),
    'tone'    => 'tone-a',
  ),
  array(
    'client'  => __('LIG넥스원', 'rathontech-redesign-01'),
    'sub'     => __('계정·권한관리 고도화 · Rathon-IAM으로 관리 자동화·표준화', 'rathontech-redesign-01'),
    'href'    => rathon_url('case-studies/lig-nex1-iam'),
    'tone'    => 'tone-b',
  ),
  array(
    'client'  => __('SK하이닉스', 'rathontech-redesign-01'),
    'sub'     => __('통합 접근제어 · Rathon-AM으로 Zero Trust 접근통제', 'rathontech-redesign-01'),
    'href'    => rathon_url('case-studies/sk-hynix-am'),
    'tone'    => 'tone-c',
  ),
);
?>
<section class="home-evidence" aria-labelledby="home-evidence-title">
  <div class="u-container">
    <header class="home-evidence__head">
      <h2 id="home-evidence-title" class="home-evidence__title">
        <?php echo esc_html__('도입 증거', 'rathontech-redesign-01'); ?>
      </h2>
    </header>

    <ul class="home-evidence__grid">
      <?php foreach ($cases as $case) : ?>
        <li class="home-evidence__item">
          <a class="home-evidence__card" href="<?php echo esc_url($case['href']); ?>">
            <span class="home-evidence__thumb home-evidence__thumb--<?php echo esc_attr($case['tone']); ?>" aria-hidden="true"></span>
            <span class="home-evidence__label"><?php echo esc_html($case['client']); ?></span>
            <span class="home-evidence__sub"><?php echo esc_html($case['sub']); ?></span>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>
<?php
unset($cases, $case);
