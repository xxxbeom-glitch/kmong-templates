  <main id="main" class="main main--subpage">
    <section id="page-hero" class="section section--page-hero" aria-labelledby="page-hero-title">
      <div class="page-hero__media" aria-hidden="true">
        <img
          class="page-hero__img"
          src="<?php echo esc_url(template_a_img_url('about.ceo.hero.image', 'images/hero-bg-02.jpg')); ?>"
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
          <p class="page-hero__label"><?php echo esc_html(template_a_get('about.ceo.hero.label')); ?></p>
          <h1 id="page-hero-title" class="page-hero__title"><?php echo template_a_text_br('about.ceo.hero.title'); ?></h1>
        </div>
      </div>
    </section>

    <section id="ceo-message" class="section section--ceo-message" aria-labelledby="ceo-message-title">
      <div class="section-shell section-shell--gutter ceo-message__inner">
        <h2 id="ceo-message-title" class="ceo-message__title scroll-reveal"><?php echo esc_html(template_a_get('about.ceo.section_title')); ?></h2>
        <div class="ceo-message__body">
          <div class="ceo-message__photo-col scroll-reveal">
            <figure class="ceo-message__figure">
              <img
                class="ceo-message__img"
                src="<?php echo esc_url(template_a_img_url('about.ceo.image', 'images/feature-bg-02.jpg')); ?>"
                alt=""
                width="625"
                height="946"
                decoding="async"
              >
            </figure>
          </div>
          <div class="ceo-message__text scroll-reveal">
            <blockquote class="ceo-message__quote">
              <p><?php echo template_a_text_br('about.ceo.quote'); ?></p>
            </blockquote>
            <div class="ceo-message__body-text">
              <?php foreach (template_a_get('about.ceo.paragraphs', array()) as $paragraph) : ?>
                <p><?php echo nl2br(esc_html($paragraph['text']), false); ?></p>
              <?php endforeach; ?>
            </div>
            <p class="ceo-message__signature"><?php echo esc_html(template_a_get('about.ceo.signature')); ?></p>
          </div>
        </div>
      </div>
    </section>
  </main>