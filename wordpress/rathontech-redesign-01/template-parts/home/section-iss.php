<?php
/**
 * Home Section 2 — Identity Security System (problem → solution).
 * Editorial list — not four identical cards.
 */

$iss_items = array(
  array(
    'title'       => __('흩어진 계정과 권한', 'rathontech-redesign-01'),
    'desc'        => __('입사·이동·퇴사에 따라 계정과 권한을 자동으로 관리합니다.', 'rathontech-redesign-01'),
    'solution'    => __('통합계정·권한관리', 'rathontech-redesign-01'),
    'href'        => rathon_url('solutions/identity-access-management'),
  ),
  array(
    'title'       => __('반복되고 복잡한 로그인', 'rathontech-redesign-01'),
    'desc'        => __('한 번의 인증과 필요한 추가 인증으로 접근을 단순화합니다.', 'rathontech-redesign-01'),
    'solution'    => __('인증', 'rathontech-redesign-01'),
    'href'        => rathon_url('solutions/authentication'),
  ),
  array(
    'title'       => __('분산된 사용자·자원 정보', 'rathontech-redesign-01'),
    'desc'        => __('디렉토리를 중심으로 사용자와 시스템 정보를 통합합니다.', 'rathontech-redesign-01'),
    'solution'    => __('디렉토리', 'rathontech-redesign-01'),
    'href'        => rathon_url('solutions/directory'),
  ),
  array(
    'title'       => __('클라우드·원격 환경의 위험', 'rathontech-redesign-01'),
    'desc'        => __('사용자·기기·행동을 계속 검증하고 이상 접근을 통제합니다.', 'rathontech-redesign-01'),
    'solution'    => __('Zero Trust', 'rathontech-redesign-01'),
    'href'        => rathon_url('solutions/zero-trust'),
  ),
);
?>
<section class="home-iss" aria-labelledby="home-iss-title">
  <div class="u-container">
    <div class="home-iss__layout">
      <header class="home-iss__intro">
        <p class="home-iss__eyebrow"><?php echo esc_html__('Identity Security System', 'rathontech-redesign-01'); ?></p>
        <h2 id="home-iss-title" class="home-iss__title">
          <?php echo esc_html__('제품명보다 먼저,', 'rathontech-redesign-01'); ?><br>
          <?php echo esc_html__('우리 조직의 문제를 고릅니다', 'rathontech-redesign-01'); ?>
        </h2>
        <p class="home-iss__lead">
          <?php echo esc_html__('계정·인증·디렉토리·접근 통제 중 어디에 구멍이 있는지 확인한 뒤, 맞는 솔루션으로 이어집니다.', 'rathontech-redesign-01'); ?>
        </p>
        <a class="btn btn--ghost home-iss__all" href="<?php echo esc_url(rathon_url('solutions')); ?>">
          <?php echo esc_html__('전체 솔루션 보기', 'rathontech-redesign-01'); ?>
          <span aria-hidden="true">→</span>
        </a>
      </header>

      <ol class="home-iss__list">
        <?php foreach ($iss_items as $i => $item) : ?>
          <li class="home-iss__item">
            <span class="home-iss__index" aria-hidden="true"><?php echo esc_html(str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT)); ?></span>
            <div class="home-iss__body">
              <h3 class="home-iss__item-title"><?php echo esc_html($item['title']); ?></h3>
              <p class="home-iss__item-desc"><?php echo esc_html($item['desc']); ?></p>
              <a class="home-iss__link" href="<?php echo esc_url($item['href']); ?>">
                <?php
                echo esc_html(
                  sprintf(
                    /* translators: %s: solution name */
                    __('솔루션: %s', 'rathontech-redesign-01'),
                    $item['solution']
                  )
                );
                ?>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </li>
        <?php endforeach; ?>
      </ol>
    </div>
  </div>
</section>
<?php
unset($iss_items, $i, $item);
