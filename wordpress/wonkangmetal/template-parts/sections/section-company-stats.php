<?php
$stats = wonkangmetal_stats();
?>
<section class="main_section main_company" aria-labelledby="home-company-title">
  <div class="main_inner">
    <div class="main_title">
      <span data-aos="fade-up" data-aos-delay="50"><?php esc_html_e('주조 산업의 혁신을 선도하는 기업', 'wonkangmetal'); ?></span>
      <div data-aos="fade" data-aos-offset="120">
        <h2 id="home-company-title" class="split-title" data-splitting>
          <?php esc_html_e('미래를 주조하는', 'wonkangmetal'); ?><br />
          <?php esc_html_e('기술 파트너', 'wonkangmetal'); ?>
        </h2>
      </div>
      <p data-aos="fade-up" data-aos-delay="150">
        <?php esc_html_e('원강금속은 1988년 창사 이래 지속적인 기술개발과 품질관리에', 'wonkangmetal'); ?><br />
        <?php esc_html_e('주력하고 있으며 중소기업에서는 아시아에서 최초로 VOD', 'wonkangmetal'); ?><br />
        <?php esc_html_e('(Vacuum Oxygen Decarburization) System 도입 및 설치', 'wonkangmetal'); ?><br />
        <?php esc_html_e('등의 설비 증대로 품질 향상에 차별성을 두고자 노력하고 있습니다.', 'wonkangmetal'); ?>
      </p>
    </div>

    <ul class="stats_list">
      <?php foreach ($stats as $stat) : ?>
        <li data-aos="fade-up">
          <p aria-label="<?php echo esc_attr($stat['title']); ?>">
            <strong>
              <?php echo esc_html($stat['value']); ?>
              <?php if (!empty($stat['unit'])) : ?>
                <span class="unit"><?php echo esc_html($stat['unit']); ?></span>
              <?php endif; ?>
            </strong>
          </p>
          <h3><?php echo esc_html($stat['title']); ?></h3>
          <p class="txt"><?php echo esc_html($stat['desc']); ?></p>
        </li>
      <?php endforeach; ?>
      <li data-aos="fade-up">
        <div class="view_more_01">
          <a href="<?php echo esc_url(wonkangmetal_page_url('company/overview')); ?>" aria-label="<?php esc_attr_e('회사개요 바로가기', 'wonkangmetal'); ?>">
            <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/view_more_arrow_w.png')); ?>" alt="" />
          </a>
        </div>
      </li>
    </ul>
  </div>
</section>
