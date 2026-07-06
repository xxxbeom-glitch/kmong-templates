<?php
/**
 * Process — Figma 453:478
 */
$steps = array(
  array(
    'num' => '01',
    'title' => '예약 및 접수',
    'desc' => '불편한 증상과 방문 목적을 확인합니다.',
  ),
  array(
    'num' => '02',
    'title' => '정밀검사',
    'desc' => '필요한 검사와 촬영을 진행합니다.',
  ),
  array(
    'num' => '03',
    'title' => '결과 설명',
    'desc' => '검사 결과를 눈으로 확인하며 설명합니다.',
  ),
  array(
    'num' => '04',
    'title' => '맞춤 진료계획',
    'desc' => '치료 순서와 선택지를 함께 정합니다.',
  ),
  array(
    'num' => '05',
    'title' => '치료 및 정기관리',
    'desc' => '치료 후 예방관리까지 이어갑니다.',
  ),
);
?>
<section class="section-process" aria-labelledby="process-title">
  <div class="section-shell section-shell--gutter">
    <div class="section-process__inner">
      <header class="section-process__header">
        <p class="section-process__label scroll-reveal">PATIENT JOURNEY</p>
        <h2 id="process-title" class="section-process__title">
          <span class="section-process__title-line scroll-reveal">처음 방문해도</span>
          <span class="section-process__title-line scroll-reveal">과정을 알 수 있도록</span>
        </h2>
      </header>

      <ol class="section-process__steps">
        <?php foreach ($steps as $step) : ?>
          <li class="section-process__step scroll-reveal">
            <p class="section-process__step-num" aria-hidden="true"><?php echo esc_html($step['num']); ?></p>
            <div class="section-process__step-body">
              <h3 class="section-process__step-title"><?php echo esc_html($step['title']); ?></h3>
              <p class="section-process__step-desc"><?php echo esc_html($step['desc']); ?></p>
            </div>
          </li>
        <?php endforeach; ?>
      </ol>
    </div>
  </div>
</section>
