<?php
/**
 * Home Section 2 — Identity Security System.
 * Catalog: scroll-pin-multi-step — pin + scrub, main/sub × 2.
 */

$iss_steps = array(
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
);
?>
<section
  class="home-iss"
  aria-labelledby="home-iss-title"
  data-iss-pin
  data-iss-steps="<?php echo esc_attr((string) count($iss_steps)); ?>"
>
  <div class="home-iss__pin">
    <div class="u-container home-iss__frame">
      <div class="home-iss__copy" aria-live="polite">
        <?php foreach ($iss_steps as $i => $step) :
          $is_first = ($i === 0);
          ?>
          <article
            class="home-iss__step<?php echo $is_first ? ' is-active' : ''; ?>"
            data-iss-step="<?php echo esc_attr((string) $i); ?>"
            <?php echo $is_first ? '' : ' aria-hidden="true"'; ?>
          >
            <h2 class="home-iss__title" <?php echo $is_first ? 'id="home-iss-title"' : ''; ?>>
              <a class="home-iss__title-link" href="<?php echo esc_url($step['href']); ?>">
                <?php echo esc_html($step['title']); ?>
              </a>
            </h2>
            <p class="home-iss__lead"><?php echo esc_html($step['lead']); ?></p>
          </article>
        <?php endforeach; ?>
      </div>

      <ol class="home-iss__progress" aria-hidden="true">
        <?php foreach ($iss_steps as $i => $step) : ?>
          <li
            class="home-iss__progress-item<?php echo $i === 0 ? ' is-active' : ''; ?>"
            data-iss-progress="<?php echo esc_attr((string) $i); ?>"
          ><?php echo esc_html(str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT)); ?></li>
        <?php endforeach; ?>
      </ol>
    </div>
  </div>
</section>
<?php
unset($iss_steps, $i, $step, $is_first);
