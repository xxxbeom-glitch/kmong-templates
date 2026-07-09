<?php
$steps = wonkangmetal_business_steps();
$first = $steps[0];
$total = count($steps);
?>
<section class="main_section main_business" id="biz" aria-labelledby="home-business-title">
  <div class="business_title">
    <div class="main_title">
      <h2 id="home-business-title" class="mask-fill">
        <span class="line1">A Leader in </span>
        <span class="line2">Custom Steel </span>
        <span class="line3">Casting</span>
      </h2>
    </div>
  </div>

  <div class="business_slider business_pc">
    <div class="txt">
      <span><?php echo esc_html($first['eyebrow']); ?></span>
      <h3><?php echo esc_html($first['title']); ?></h3>
      <p><?php echo esc_html($first['desc']); ?></p>
      <nav class="slider_pagenation" aria-label="<?php esc_attr_e('슬라이드 페이지', 'wonkangmetal'); ?>">
        <span class="current_number">1</span>
        <span class="total_number"><?php echo (int) $total; ?></span>
      </nav>
    </div>
    <div class="scroll flex_center" aria-hidden="true">
      scroll
      <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/scroll_down_arrow.png')); ?>" alt="" />
    </div>
    <div class="business_slider_wrap">
      <?php foreach ($steps as $step) : ?>
        <div class="image">
          <img
            src="<?php echo esc_url(wonkangmetal_mirror_img($step['image'])); ?>"
            alt="<?php echo esc_attr($step['title']); ?>"
          />
        </div>
      <?php endforeach; ?>
    </div>
  </div>

  <div class="business_slider_m business_m">
    <div class="swiper">
      <nav class="slider_pagenation" aria-label="<?php esc_attr_e('슬라이드 페이지', 'wonkangmetal'); ?>">
        <span class="current_number">1</span>
        <span class="total_number"><?php echo (int) $total; ?></span>
      </nav>
      <div class="business_slider_wrap swiper-wrapper">
        <?php foreach ($steps as $step) : ?>
          <div class="swiper-slide">
            <div class="image">
              <img
                src="<?php echo esc_url(wonkangmetal_mirror_img($step['image'])); ?>"
                alt="<?php echo esc_attr($step['title']); ?>"
              />
            </div>
            <div class="txt">
              <span><?php echo esc_html($step['eyebrow']); ?></span>
              <h3><?php echo esc_html($step['title']); ?></h3>
              <p><?php echo esc_html($step['desc']); ?></p>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
      <div class="busness_slider_nav">
        <div class="busness_prev">
          <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/busniess_m_prev.png')); ?>" alt="<?php esc_attr_e('이전', 'wonkangmetal'); ?>" />
        </div>
        <div class="busness_next">
          <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/busniess_m_next.png')); ?>" alt="<?php esc_attr_e('다음', 'wonkangmetal'); ?>" />
        </div>
      </div>
    </div>
  </div>
</section>
