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

    <section id="business-intro" class="section section--service-intro" aria-labelledby="business-intro-title">
      <div class="section-shell section-shell--gutter service-intro__inner">
        <div class="service-intro__watermark-band" aria-hidden="true">
          <p class="service-intro__watermark"><?php echo esc_html(template_a_get('business.intro.watermark')); ?></p>
        </div>
        <div class="service-intro__copy">
          <h2 id="business-intro-title" class="service-intro__title scroll-reveal"><?php echo template_a_text_br('business.intro.title'); ?></h2>
          <p class="service-intro__body scroll-reveal"><?php echo template_a_text_br('business.intro.body'); ?></p>
        </div>
      </div>
    </section>

    <section id="business-items" class="section section--business-items" aria-labelledby="business-items-title">
      <div class="section-shell section-shell--gutter business-items__inner">
        <h2 id="business-items-title" class="section-title section-title--center scroll-reveal"><?php echo esc_html(template_a_get('business.items_title')); ?></h2>
        <div class="business-items__list">
          <?php
          $business_images = array('images/feature-bg-01.jpg', 'images/feature-bg-02.jpg', 'images/feature-bg-03.jpg', 'images/feature-bg-04.webp');
          foreach (template_a_get('business.items', array()) as $index => $item) :
          ?>
            <article<?php echo $index === 0 ? ' id="business-corporate"' : ($index === 1 ? ' id="business-brand"' : ''); ?> class="business-item scroll-reveal">
              <figure class="business-item__media">
                <img class="business-item__img" src="<?php echo esc_url(template_a_img_url('business.items.' . $index . '.image', isset($business_images[$index]) ? $business_images[$index] : $business_images[0])); ?>" alt="" width="708" height="446" decoding="async">
              </figure>
              <div class="business-item__panel">
                <div class="business-item__text">
                  <div class="business-item__head">
                    <p class="business-item__label"><?php echo esc_html($item['label']); ?></p>
                    <h3 class="business-item__name"><?php echo esc_html($item['title']); ?></h3>
                  </div>
                  <p class="business-item__body"><?php echo nl2br(esc_html($item['body']), false); ?></p>
                </div>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  </main>