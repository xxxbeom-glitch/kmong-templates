<?php
/**
 * Home Section 2 — Identity Security System.
 * Planning §: 4 problem axes · left title TOC + right cards (~1.9).
 */

$iss_items = array(
  array(
    'title'  => __('흩어진 계정과 권한', 'rathontech-redesign-01'),
    'points' => array(
      __('입사·이동·퇴사에 맞춘 계정·권한 자동 관리', 'rathontech-redesign-01'),
      __('역할 기반 권한으로 운영 표준화', 'rathontech-redesign-01'),
      __('통합계정·권한관리 솔루션으로 연결', 'rathontech-redesign-01'),
    ),
    'href'   => rathon_url('solutions/identity-access-management'),
  ),
  array(
    'title'  => __('반복되고 복잡한 로그인', 'rathontech-redesign-01'),
    'points' => array(
      __('한 번의 인증으로 여러 시스템 접근', 'rathontech-redesign-01'),
      __('필요한 순간에만 추가 인증 적용', 'rathontech-redesign-01'),
      __('인증 솔루션으로 연결', 'rathontech-redesign-01'),
    ),
    'href'   => rathon_url('solutions/authentication'),
  ),
  array(
    'title'  => __('분산된 사용자·자원 정보', 'rathontech-redesign-01'),
    'points' => array(
      __('디렉토리 중심의 사용자·시스템 정보 통합', 'rathontech-redesign-01'),
      __('빠른 검색과 일관된 접근 통제', 'rathontech-redesign-01'),
      __('디렉토리 솔루션으로 연결', 'rathontech-redesign-01'),
    ),
    'href'   => rathon_url('solutions/directory'),
  ),
  array(
    'title'  => __('클라우드·원격 환경의 위험', 'rathontech-redesign-01'),
    'points' => array(
      __('사용자·기기·행동의 지속 검증', 'rathontech-redesign-01'),
      __('이상 접근을 탐지하고 통제', 'rathontech-redesign-01'),
      __('Zero Trust 솔루션으로 연결', 'rathontech-redesign-01'),
    ),
    'href'   => rathon_url('solutions/zero-trust'),
  ),
);

$iss_labels = array_map(
  static function ($item) {
    return $item['title'];
  },
  $iss_items
);
?>
<section class="home-iss" aria-labelledby="home-iss-title">
  <div class="u-container">
    <header class="home-iss__head">
      <h2 id="home-iss-title" class="home-iss__title">
        <?php echo esc_html__('조직의 문제로 보안 솔루션을 고릅니다', 'rathontech-redesign-01'); ?>
      </h2>
      <p class="home-iss__lead">
        <?php echo esc_html__('계정·인증·디렉토리·접근 통제 중 맞는 솔루션으로 이어집니다.', 'rathontech-redesign-01'); ?>
      </p>
    </header>

    <div class="home-iss__layout">
      <nav class="home-iss__nav" aria-label="<?php echo esc_attr__('문제별 솔루션', 'rathontech-redesign-01'); ?>">
        <p class="home-iss__nav-label" aria-hidden="true"><?php echo esc_html__('문제 선택', 'rathontech-redesign-01'); ?></p>
        <div
          class="home-iss__pagination"
          data-iss-pagination
          role="tablist"
          aria-orientation="vertical"
        ></div>
      </nav>

      <div class="home-iss__slider-shell">
        <div
          class="swiper home-iss-swiper"
          data-iss-swiper
          data-iss-labels="<?php echo esc_attr(wp_json_encode(array_values($iss_labels), JSON_UNESCAPED_UNICODE)); ?>"
        >
          <div class="swiper-wrapper">
            <?php foreach ($iss_items as $i => $item) : ?>
              <div class="swiper-slide" role="group" aria-label="<?php echo esc_attr($item['title']); ?>">
                <article class="home-iss__card">
                  <p class="home-iss__index" aria-hidden="true"><?php echo esc_html(str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT)); ?></p>
                  <h3 class="home-iss__card-title">
                    <a href="<?php echo esc_url($item['href']); ?>"><?php echo esc_html($item['title']); ?></a>
                  </h3>
                  <ul class="home-iss__points">
                    <?php foreach ($item['points'] as $point) : ?>
                      <li><?php echo esc_html($point); ?></li>
                    <?php endforeach; ?>
                  </ul>
                </article>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<?php
unset($iss_items, $iss_labels, $i, $item, $point);
