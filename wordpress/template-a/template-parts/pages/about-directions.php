<?php $template_a_sub_hero = template_a_sub_hero(); ?>
  <main id="main" class="main main--subpage">
    <section id="page-hero" class="section section--page-hero" aria-labelledby="page-hero-title">
      <div class="page-hero__media" aria-hidden="true">
        <img
          class="page-hero__img"
          src="<?php echo esc_url($template_a_sub_hero['image_url']); ?>"
          alt=""
          width="1920"
          height="364"
          decoding="async"
          fetchpriority="high"
        >
        <div class="page-hero__overlay"></div>
      </div>
      <div class="section-shell section-shell--gutter page-hero__inner">
        <div class="page-hero__copy">
          <p class="page-hero__label"><?php echo esc_html($template_a_sub_hero['label']); ?></p>
          <h1 id="page-hero-title" class="page-hero__title"><?php echo nl2br(esc_html($template_a_sub_hero['title']), false); ?></h1>
        </div>
      </div>
    </section>

    <section id="directions" class="section section--directions" aria-labelledby="directions-title">
      <div class="section-shell section-shell--gutter directions__inner">
        <h2 id="directions-title" class="directions__title scroll-reveal"><?php echo esc_html(template_a_get('about.directions.section_title')); ?></h2>
        <figure class="directions__figure scroll-reveal">
          <img
            class="directions__img"
            src="<?php echo esc_url(template_a_img_url('about.directions.image', 'images/feature-bg-03.jpg')); ?>"
            alt=""
            width="1440"
            height="771"
            decoding="async"
          >
        </figure>
        <article class="directions__row scroll-reveal">
          <div class="directions__label">
            <h3 class="directions__label-title"><?php echo esc_html(template_a_get('about.directions.address_label')); ?></h3>
          </div>
          <div class="directions__detail">
            <p class="directions__street"><?php echo esc_html(template_a_get('about.directions.address')); ?></p>
            <div class="directions__transit">
              <?php foreach (template_a_get('about.directions.transit', array()) as $transit) : ?>
                <p><?php echo nl2br(esc_html($transit['text']), false); ?></p>
              <?php endforeach; ?>
            </div>
            <div class="directions__actions">
              <a
                class="directions__map-link btn-pill--muted"
                href="https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC%20%EA%B5%AD%ED%9A%8C%EB%8C%80%EB%A1%9C%2066%EA%B8%B8%203"
                target="_blank"
                rel="noopener noreferrer"
              ><?php echo esc_html(template_a_get('about.directions.naver_label')); ?></a>
              <a
                class="directions__map-link btn-pill--muted"
                href="https://map.kakao.com/?q=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC%20%EA%B5%AD%ED%9A%8C%EB%8C%80%EB%A1%9C%2066%EA%B8%B8%203"
                target="_blank"
                rel="noopener noreferrer"
              ><?php echo esc_html(template_a_get('about.directions.kakao_label')); ?></a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>