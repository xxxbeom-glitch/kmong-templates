  <main id="main" class="main main--subpage">
    <section id="page-hero" class="section section--page-hero" aria-labelledby="page-hero-title">
      <div class="page-hero__media" aria-hidden="true">
        <img
          class="page-hero__img"
          src="<?php echo esc_url(template_a_img_url('service.solution.hero.image', 'images/hero-bg-02.jpg')); ?>"
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
          <p class="page-hero__label"><?php echo esc_html(template_a_get('service.solution.hero.label')); ?></p>
          <h1 id="page-hero-title" class="page-hero__title"><?php echo template_a_text_br('service.solution.hero.title'); ?></h1>
        </div>
      </div>
    </section>

    <section id="service-intro" class="section section--service-intro" aria-labelledby="service-intro-title">
      <div class="section-shell section-shell--gutter service-intro__inner">
        <div class="service-intro__watermark-band" aria-hidden="true">
          <p class="service-intro__watermark"><?php echo esc_html(template_a_get('service.solution.intro.watermark')); ?></p>
        </div>
        <div class="service-intro__copy">
          <h2 id="service-intro-title" class="service-intro__title scroll-reveal"><?php echo template_a_text_br('service.solution.intro.title'); ?></h2>
          <p class="service-intro__body scroll-reveal"><?php echo template_a_text_br('service.solution.intro.body'); ?></p>
        </div>
      </div>
    </section>

    <section id="service-cards" class="section section--service-cards" aria-labelledby="service-cards-title">
      <div class="section-shell section-shell--gutter service-cards__inner">
        <h2 id="service-cards-title" class="section-title section-title--center scroll-reveal"><?php echo esc_html(template_a_get('service.solution.cards_title')); ?></h2>
        <div class="service-cards__grid">
          <?php
          $service_cards = template_a_get('service.solution.cards', array());
          $service_card_classes = array('wide', 'narrow', 'narrow', 'wide', 'full');
          $service_card_images = array('images/feature-bg-01.jpg', 'images/feature-bg-02.jpg', 'images/feature-bg-03.jpg', 'images/feature-bg-04.webp', 'images/service-bg-01.jpg');
          foreach (array_chunk($service_cards, 2, true) as $row) :
          ?>
            <div class="service-cards__row">
              <?php foreach ($row as $index => $card) : ?>
                <?php $card_class = isset($service_card_classes[$index]) ? $service_card_classes[$index] : 'narrow'; ?>
                <article class="service-card media-card service-card--<?php echo esc_attr($card_class); ?> scroll-reveal">
                  <img class="media-card__img" src="<?php echo esc_url(template_a_img_url('service.solution.cards.' . $index . '.image', isset($service_card_images[$index]) ? $service_card_images[$index] : $service_card_images[0])); ?>" alt="" width="<?php echo $index === 4 ? '1440' : ($card_class === 'wide' ? '874' : '542'); ?>" height="446" decoding="async">
                  <div class="media-card__overlay" aria-hidden="true"></div>
                  <div class="service-card__content">
                    <h3 class="service-card__title"><?php echo esc_html($card['title']); ?></h3>
                    <p class="service-card__body"><?php echo nl2br(esc_html($card['body']), false); ?></p>
                  </div>
                </article>
              <?php endforeach; ?>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  </main>