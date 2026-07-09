<?php
$items = wonkangmetal_solution_items();
$product_url = wonkangmetal_product_category_url('pump-general');
$part_classes = array('part_01', 'part_02', 'part_03', 'part_04');
$delays = array(50, 150, 250, 350);
?>
<section class="main_section main_solution" aria-labelledby="home-solution-title">
  <div class="main_inner">
    <div class="main_title">
      <div>
        <div data-aos="fade" data-aos-offset="120">
          <h2 id="home-solution-title" class="split-title" data-splitting>Casting solution</h2>
        </div>
      </div>
      <a href="<?php echo esc_url($product_url); ?>" class="view_more_02">
        <span class="text text-top" data-splitting>VIEW MORE</span>
        <span class="text text-bottom" data-splitting>VIEW MORE</span>
        <span class="arrows">
          <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/view_more_arrow01.png')); ?>" alt="" class="arrow a1" />
          <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/view_more_arrow02.png')); ?>" alt="" class="arrow a2" />
        </span>
      </a>
    </div>

    <section class="parts" aria-label="<?php esc_attr_e('제품군', 'wonkangmetal'); ?>">
      <ul class="parts_list">
        <?php foreach ($items as $index => $item) : ?>
          <?php
          $category   = isset($item['category']) ? $item['category'] : '';
          $url        = $category ? wonkangmetal_product_category_url($category) : '#';
          $part_class = isset($part_classes[$index]) ? $part_classes[$index] : 'part_01';
          $delay      = isset($delays[$index]) ? $delays[$index] : 50;
          ?>
          <li class="<?php echo esc_attr($part_class); ?>" data-aos="fade-up" data-aos-delay="<?php echo (int) $delay; ?>">
            <a href="<?php echo esc_url($url); ?>">
              <h3><?php echo esc_html($item['label']); ?></h3>
              <?php if (!empty($item['subtitle'])) : ?>
                <p><?php echo esc_html($item['subtitle']); ?></p>
              <?php endif; ?>
            </a>
          </li>
        <?php endforeach; ?>
      </ul>
    </section>
  </div>
</section>
