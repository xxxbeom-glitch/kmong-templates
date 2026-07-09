<?php
$slides = wonkangmetal_hero_slides();
$slide_classes = array('slide01', 'slide02', 'slide03');
?>
<section class="main_visual" id="home-hero" aria-label="<?php esc_attr_e('메인 비주얼', 'wonkangmetal'); ?>">
  <div class="swiper">
    <div class="swiper-wrapper">
      <?php foreach ($slides as $index => $slide) : ?>
        <?php $slide_class = isset($slide_classes[$index]) ? $slide_classes[$index] : 'slide01'; ?>
        <div class="swiper-slide <?php echo esc_attr($slide_class); ?>">
          <div class="slide_txt">
            <div>
              <span data-splitting><?php echo esc_html($slide['line1']); ?></span>
              <br />
            </div>
            <div>
              <p data-splitting><?php echo esc_html($slide['line2']); ?></p>
            </div>
            <div class="sub_caption">
              <i><?php echo esc_html($slide['caption']); ?></i>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <div class="swiper-button-prev">
      <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/main_slide_prev.png')); ?>" alt="<?php esc_attr_e('이전', 'wonkangmetal'); ?>" />
      <span>PREV</span>
    </div>
    <div class="swiper-button-next">
      <span>NEXT</span>
      <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/main_slide_next.png')); ?>" alt="<?php esc_attr_e('다음', 'wonkangmetal'); ?>" />
    </div>
  </div>
</section>
