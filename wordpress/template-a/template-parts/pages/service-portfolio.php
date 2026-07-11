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

    <section id="portfolio-intro" class="section section--service-intro" aria-labelledby="portfolio-intro-title">
      <div class="section-shell section-shell--gutter service-intro__inner">
        <div class="service-intro__watermark-band" aria-hidden="true">
          <p class="service-intro__watermark"><?php echo esc_html(template_a_get('service.portfolio.intro.watermark')); ?></p>
        </div>
        <div class="service-intro__copy">
          <h2 id="portfolio-intro-title" class="service-intro__title scroll-reveal"><?php echo template_a_text_br('service.portfolio.intro.title'); ?></h2>
          <p class="service-intro__body scroll-reveal"><?php echo template_a_text_br('service.portfolio.intro.body'); ?></p>
        </div>
      </div>
    </section>

    <section id="portfolio-grid" class="section section--portfolio-grid" aria-labelledby="portfolio-grid-title">
      <div class="section-shell section-shell--gutter portfolio-grid__inner">
        <div class="portfolio-grid__header scroll-reveal">
          <h2 id="portfolio-grid-title" class="portfolio-grid__title section-title section-title--left"><?php echo esc_html(template_a_get('service.portfolio.grid_title')); ?></h2>
          <div class="portfolio-filter" role="tablist" aria-label="<?php echo esc_attr(template_a_get('service.portfolio.filter_label')); ?>">
            <?php foreach (template_a_get('service.portfolio.filters', array()) as $index => $filter) : ?>
              <button type="button" class="portfolio-filter__tab filter-tab<?php echo $index === 0 ? ' is-active' : ''; ?>" role="tab" aria-selected="<?php echo $index === 0 ? 'true' : 'false'; ?>"><?php echo esc_html($filter['label']); ?></button>
            <?php endforeach; ?>
          </div>
        </div>
        <div class="portfolio-grid__list">
          <?php
          $portfolio_images = array('images/feature-bg-01.jpg', 'images/feature-bg-02.jpg', 'images/feature-bg-03.jpg', 'images/feature-bg-04.webp');
          foreach (array_chunk(template_a_get('service.portfolio.items', array()), 2, true) as $row) :
          ?>
            <div class="portfolio-grid__row">
              <?php foreach ($row as $index => $item) : ?>
                <article class="portfolio-card media-card scroll-reveal">
                  <img class="media-card__img" src="<?php echo esc_url(template_a_img_url('service.portfolio.items.' . $index . '.image', isset($portfolio_images[$index]) ? $portfolio_images[$index] : $portfolio_images[0])); ?>" alt="" width="708" height="541" decoding="async">
                  <div class="media-card__overlay" aria-hidden="true"></div>
                  <div class="portfolio-card__content">
                    <p class="portfolio-card__label"><?php echo esc_html($item['label']); ?></p>
                    <h3 class="portfolio-card__name"><?php echo esc_html($item['title']); ?></h3>
                  </div>
                </article>
              <?php endforeach; ?>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  </main>