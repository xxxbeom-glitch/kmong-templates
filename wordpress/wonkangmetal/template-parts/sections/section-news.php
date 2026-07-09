<?php
$news_query = wonkangmetal_get_home_news_query(6);
?>
<section class="main_section main_gallery" aria-labelledby="home-news-title">
  <div class="main_inner">
    <div class="main_title">
      <div>
        <span data-aos="fade-up"><?php esc_html_e('최고를 향한 끊임없는 도전', 'wonkangmetal'); ?></span>
        <div data-aos="fade" data-aos-offset="120">
          <h2 id="home-news-title" class="split-title" data-splitting>wonkang news</h2>
        </div>
      </div>
      <div class="board_slider_nav" data-aos="fade-up">
        <div class="board_slider_prev">
          <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/board_slider_prev_w.png')); ?>" alt="" />
        </div>
        <div class="board_slider_next">
          <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/board_slider_next_w.png')); ?>" alt="" />
        </div>
      </div>
    </div>
  </div>

  <div class="gallery_slider_wrap">
    <div class="board_slider swiper" data-aos="fade-up">
      <div class="swiper-wrapper">
        <?php if ($news_query->have_posts()) : ?>
          <?php
          while ($news_query->have_posts()) {
            $news_query->the_post();
            echo '<div class="swiper-slide">';
            get_template_part('template-parts/news/card', 'home');
            echo '</div>';
          }
          wp_reset_postdata();
          ?>
        <?php else : ?>
          <div class="swiper-slide">
            <p><?php esc_html_e('등록된 뉴스가 없습니다.', 'wonkangmetal'); ?></p>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </div>

  <div class="main_contact">
    <div class="conmtact_title">
      <div data-aos="fade" data-aos-offset="120">
        <h2 class="split-title" data-splitting>contact us</h2>
      </div>
      <p data-aos="fade-up">
        <?php esc_html_e('단순한 제품 공급을 넘어, 원강금속의 기술 노하우와 신뢰를', 'wonkangmetal'); ?><br />
        <?php esc_html_e('바탕으로 성공적인 비전을 함께 만들어 가며 최고의 품질로 보답하겠습니다.', 'wonkangmetal'); ?>
      </p>
    </div>
    <div>
      <div class="view_more_01">
        <a href="<?php echo esc_url(wonkangmetal_page_url('inquiry')); ?>" aria-label="<?php esc_attr_e('견적문의', 'wonkangmetal'); ?>">
          <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/view_more_arrow_w.png')); ?>" alt="" />
        </a>
      </div>
    </div>
  </div>
</section>
