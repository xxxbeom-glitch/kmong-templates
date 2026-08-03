<?php
/**
 * Home Section 2 — Identity Security System.
 * PC: home-wheel.js steps copies; last copy then natural scroll.
 * MO: both copies stacked (no wheel hijack).
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

$iss_video = rathon_asset_uri('videos/12421435_960_540_30fps.mp4');
?>
<section
  class="home-iss"
  aria-labelledby="home-iss-title"
  data-iss-pin
  data-iss-next=".home-eco"
>
  <div class="home-iss__pin">
    <div class="home-iss__media" aria-hidden="true">
      <video
        class="home-iss__video"
        data-iss-video
        src="<?php echo esc_url($iss_video); ?>"
        muted
        loop
        playsinline
        autoplay
        preload="metadata"
      ></video>
      <div class="home-iss__veil"></div>
    </div>

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
      <div class="home-iss__actions">
        <a class="btn btn--lg btn--primary-on-dark btn-slide-hover" href="<?php echo esc_url(rathon_url('company')); ?>">
          <?php echo rathon_btn_slide_label(__('회사비전 보기', 'rathontech-redesign-01')); ?>
        </a>
      </div>
    </div>
  </div>
</section>
<?php
unset($iss_steps, $iss_video, $i, $step, $is_first);
