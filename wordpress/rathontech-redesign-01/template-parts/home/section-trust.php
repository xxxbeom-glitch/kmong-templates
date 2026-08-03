<?php
/**
 * Home — Trust Quiet Zone (인증·신뢰 요약).
 * Facts only · no fake logos or metrics.
 */

$trust_items = array(
  array(
    'label' => __('창립', 'rathontech-redesign-01'),
    'value' => __('2002년', 'rathontech-redesign-01'),
    'note'  => __('IAM·인증 분야에 집중', 'rathontech-redesign-01'),
  ),
  array(
    'label' => __('인증', 'rathontech-redesign-01'),
    'value' => __('GS 인증', 'rathontech-redesign-01'),
    'note'  => __('GS 인증 제품 보유', 'rathontech-redesign-01'),
  ),
  array(
    'label' => __('인증', 'rathontech-redesign-01'),
    'value' => __('국제 CC', 'rathontech-redesign-01'),
    'note'  => __('국제 CC 인증 제품 보유', 'rathontech-redesign-01'),
  ),
  array(
    'label' => __('암호', 'rathontech-redesign-01'),
    'value' => __('KCMVP', 'rathontech-redesign-01'),
    'note'  => __('검증필 암호모듈 보유', 'rathontech-redesign-01'),
  ),
);
?>
<section class="home-trust" aria-labelledby="home-trust-title">
  <div class="u-container">
    <header class="home-trust__head">
      <h2 id="home-trust-title" class="home-trust__title">
        <?php echo esc_html__('신뢰의 근거', 'rathontech-redesign-01'); ?>
      </h2>
      <p class="home-trust__lead">
        <?php echo esc_html__('확인된 인증과 이력만 짧게 정리했습니다.', 'rathontech-redesign-01'); ?>
      </p>
    </header>

    <ul class="home-trust__grid">
      <?php foreach ($trust_items as $item) : ?>
        <li class="home-trust__item">
          <span class="home-trust__label"><?php echo esc_html($item['label']); ?></span>
          <span class="home-trust__value"><?php echo esc_html($item['value']); ?></span>
          <span class="home-trust__note"><?php echo esc_html($item['note']); ?></span>
        </li>
      <?php endforeach; ?>
    </ul>

    <p class="home-trust__foot">
      <a class="btn btn--ghost" href="<?php echo esc_url(rathon_url('certifications')); ?>">
        <?php echo esc_html__('인증현황 자세히 보기', 'rathontech-redesign-01'); ?>
      </a>
    </p>
  </div>
</section>
<?php
unset($trust_items, $item);
