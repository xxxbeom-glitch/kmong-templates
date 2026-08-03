<?php
/**
 * Home Section 2 — Identity Security System.
 * Catalog: scroll-pin-multi-step — pin + scrub, main/sub × 2 (vision · company).
 */

$iss_steps = array(
  array(
    'title' => __('모든 연결이 신뢰 위에서 시작되는 세상을 만듭니다.', 'rathontech-redesign-01'),
    'lead'  => __('라톤테크는 흩어진 계정과 접근 권한을 하나의 체계로 연결해 더 안전한 디지털 환경을 설계합니다.', 'rathontech-redesign-01'),
  ),
  array(
    'title' => __('복잡한 접근을 정리하고, 디지털 신뢰의 기준을 세웁니다.', 'rathontech-redesign-01'),
    'lead'  => __('인증부터 권한 관리까지, 기업의 모든 디지털 접점을 보호하는 통합 보안 기술을 만들어갑니다.', 'rathontech-redesign-01'),
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
              <?php echo esc_html($step['title']); ?>
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
