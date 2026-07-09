<?php
$items = wonkangmetal_vision_items();
$vision_classes = array('vision_01', 'vision_02', 'vision_03', 'vision_04');
$tech_url = wonkangmetal_page_url('factory/technology');
?>
<section class="main_section main_vision" aria-labelledby="home-vision-title">
  <img
    src="<?php echo esc_url(wonkangmetal_mirror_img('img/quality_bg.png')); ?>"
    alt=""
    aria-hidden="true"
    class="quality_bg"
  />
  <div class="main_inner">
    <div class="main_title">
      <span data-aos="fade-up"><?php esc_html_e('최고를 향한 원강금속의 약속', 'wonkangmetal'); ?></span>
      <div data-aos="fade" data-aos-offset="120">
        <h2 id="home-vision-title" class="split-title" data-splitting>
          Trust with<br />
          high quality
        </h2>
      </div>
      <a href="<?php echo esc_url($tech_url); ?>" class="view_more_02" data-aos="fade-up">
        <span class="text text-top" data-splitting>VIEW MORE</span>
        <span class="text text-bottom" data-splitting>VIEW MORE</span>
        <span class="arrows">
          <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/view_more_arrow01.png')); ?>" alt="" class="arrow a1" />
          <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/view_more_arrow02.png')); ?>" alt="" class="arrow a2" />
        </span>
      </a>
    </div>
    <ul>
      <?php foreach ($items as $index => $item) : ?>
        <?php $vision_class = isset($vision_classes[$index]) ? $vision_classes[$index] : 'vision_01'; ?>
        <li class="vision_item <?php echo esc_attr($vision_class); ?>" data-aos="fade-up">
          <h3><?php echo esc_html($item['title']); ?></h3>
          <p><?php echo esc_html($item['desc']); ?></p>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>

<section class="main_section main_vision main_vision_m" aria-hidden="true">
  <div class="main_inner">
    <div class="main_title">
      <span data-aos="fade-up"><?php esc_html_e('최고를 향한 원강금속의 약속', 'wonkangmetal'); ?></span>
      <div data-aos="fade" data-aos-offset="120">
        <h2 class="split-title" data-splitting>
          Trust with<br />
          high quality
        </h2>
      </div>
      <a href="<?php echo esc_url($tech_url); ?>" class="view_more_02" data-aos="fade-up">
        <span class="text text-top" data-splitting>VIEW MORE</span>
        <span class="text text-bottom" data-splitting>VIEW MORE</span>
        <span class="arrows">
          <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/view_more_arrow01.png')); ?>" alt="" class="arrow a1" />
          <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/view_more_arrow02.png')); ?>" alt="" class="arrow a2" />
        </span>
      </a>
    </div>
  </div>

  <div class="vision_slider swiper" data-aos="fade-up">
    <ul class="swiper-wrapper">
      <?php foreach ($items as $index => $item) : ?>
        <?php $vision_class = isset($vision_classes[$index]) ? $vision_classes[$index] : 'vision_01'; ?>
        <li class="swiper-slide vision_item <?php echo esc_attr($vision_class); ?>">
          <h3><?php echo esc_html($item['title']); ?></h3>
          <p><?php echo esc_html($item['desc']); ?></p>
        </li>
      <?php endforeach; ?>
    </ul>
    <div class="vision_slider_nav">
      <div class="vision_prev">
        <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/board_slider_prev_w.png')); ?>" alt="<?php esc_attr_e('이전', 'wonkangmetal'); ?>" />
      </div>
      <div class="vision_next">
        <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/board_slider_next_w.png')); ?>" alt="<?php esc_attr_e('다음', 'wonkangmetal'); ?>" />
      </div>
    </div>
  </div>
</section>
