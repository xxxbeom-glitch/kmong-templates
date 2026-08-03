<?php
/**
 * Home Section 2 — Identity Security System.
 * Title page-nav: 4 states · main 1줄 + sub 1줄 (from former cards).
 */

$iss_pages = array(
  array(
    'title' => __('흩어진 계정과 권한', 'rathontech-redesign-01'),
    'lead'  => __('입사·이동·퇴사에 맞춘 계정·권한 자동 관리로 이어집니다.', 'rathontech-redesign-01'),
    'href'  => rathon_url('solutions/identity-access-management'),
  ),
  array(
    'title' => __('반복되고 복잡한 로그인', 'rathontech-redesign-01'),
    'lead'  => __('한 번의 인증과 필요한 추가 인증으로 접근을 단순화합니다.', 'rathontech-redesign-01'),
    'href'  => rathon_url('solutions/authentication'),
  ),
  array(
    'title' => __('분산된 사용자·자원 정보', 'rathontech-redesign-01'),
    'lead'  => __('디렉토리를 중심으로 사용자와 시스템 정보를 통합합니다.', 'rathontech-redesign-01'),
    'href'  => rathon_url('solutions/directory'),
  ),
  array(
    'title' => __('클라우드·원격 환경의 위험', 'rathontech-redesign-01'),
    'lead'  => __('사용자·기기·행동을 계속 검증하고 이상 접근을 통제합니다.', 'rathontech-redesign-01'),
    'href'  => rathon_url('solutions/zero-trust'),
  ),
);
?>
<section class="home-iss" aria-labelledby="home-iss-title" data-iss-pager>
  <div class="u-container">
    <div class="home-iss__stage">
      <?php foreach ($iss_pages as $i => $page) :
        $is_first = ($i === 0);
        $panel_id = 'home-iss-panel-' . ($i + 1);
        ?>
        <article
          class="home-iss__panel<?php echo $is_first ? ' is-active' : ''; ?>"
          id="<?php echo esc_attr($panel_id); ?>"
          data-iss-panel="<?php echo esc_attr((string) $i); ?>"
          <?php echo $is_first ? '' : ' hidden'; ?>
        >
          <h2 class="home-iss__title" <?php echo $is_first ? 'id="home-iss-title"' : ''; ?>>
            <a class="home-iss__title-link" href="<?php echo esc_url($page['href']); ?>">
              <?php echo esc_html($page['title']); ?>
            </a>
          </h2>
          <p class="home-iss__lead"><?php echo esc_html($page['lead']); ?></p>
        </article>
      <?php endforeach; ?>

      <nav class="home-iss__nav" aria-label="<?php echo esc_attr__('문제별 솔루션 페이지', 'rathontech-redesign-01'); ?>">
        <ol class="home-iss__pages">
          <?php foreach ($iss_pages as $i => $page) :
            $n = $i + 1;
            $is_first = ($i === 0);
            ?>
            <li>
              <button
                type="button"
                class="home-iss__page<?php echo $is_first ? ' is-active' : ''; ?>"
                data-iss-page="<?php echo esc_attr((string) $i); ?>"
                aria-controls="home-iss-panel-<?php echo esc_attr((string) $n); ?>"
                aria-current="<?php echo $is_first ? 'true' : 'false'; ?>"
                aria-label="<?php echo esc_attr(sprintf(/* translators: %d: page number */ __('문제 %d페이지', 'rathontech-redesign-01'), $n)); ?>"
              ><?php echo esc_html(str_pad((string) $n, 2, '0', STR_PAD_LEFT)); ?></button>
            </li>
          <?php endforeach; ?>
        </ol>
      </nav>
    </div>
  </div>
</section>
<?php
unset($iss_pages, $i, $page, $is_first, $panel_id, $n);
