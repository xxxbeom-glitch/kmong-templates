  <main id="main" class="main main--subpage">
    <section id="page-hero" class="section section--page-hero" aria-labelledby="page-hero-title">
      <div class="page-hero__media" aria-hidden="true">
        <img
          class="page-hero__img"
          src="<?php echo esc_url(template_a_img_url('about.greeting.hero.image', 'images/hero-bg-02.jpg')); ?>"
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
          <p class="page-hero__label"><?php echo esc_html(template_a_get('about.greeting.hero.label')); ?></p>
          <h1 id="page-hero-title" class="page-hero__title"><?php echo template_a_text_br('about.greeting.hero.title'); ?></h1>
        </div>
      </div>
    </section>

    <section id="greeting-intro" class="section section--greeting-intro" aria-labelledby="greeting-intro-title">
      <div class="section-shell section-shell--gutter greeting-intro__inner">
        <div class="greeting-intro__head">
          <div class="greeting-intro__watermark-band" aria-hidden="true">
            <p class="greeting-intro__watermark"><?php echo esc_html(template_a_get('about.greeting.intro.watermark')); ?></p>
          </div>
          <div class="greeting-intro__copy">
            <h2 id="greeting-intro-title" class="greeting-intro__title scroll-reveal"><?php echo template_a_text_br('about.greeting.intro.title'); ?></h2>
            <p class="greeting-intro__body scroll-reveal"><?php echo template_a_text_br('about.greeting.intro.body'); ?></p>
          </div>
        </div>
        <figure class="greeting-intro__figure scroll-reveal">
          <img
            class="greeting-intro__img"
            src="<?php echo esc_url(template_a_img_url('about.greeting.intro.image', 'images/feature-bg-01.jpg')); ?>"
            alt=""
            width="1440"
            height="771"
            decoding="async"
          >
        </figure>
      </div>
    </section>

    <section id="greeting-vision" class="section section--greeting-vision" aria-labelledby="greeting-vision-title">
      <div class="section-shell section-shell--gutter greeting-vision__inner">
        <h2 id="greeting-vision-title" class="greeting-vision__title scroll-reveal"><?php echo esc_html(template_a_get('about.greeting.vision.title')); ?></h2>
        <div class="greeting-vision__rows">
          <?php foreach (template_a_get('about.greeting.vision.items', array()) as $item) : ?>
            <article class="greeting-vision__row scroll-reveal">
              <div class="greeting-vision__label">
                <h3 class="greeting-vision__label-title"><?php echo esc_html($item['label']); ?></h3>
              </div>
              <div class="greeting-vision__detail">
                <p class="greeting-vision__summary"><?php echo esc_html($item['summary']); ?></p>
                <ul class="greeting-vision__list">
                  <?php foreach (preg_split('/\r\n|\r|\n/', $item['points']) as $point) : ?>
                    <li><?php echo esc_html($point); ?></li>
                  <?php endforeach; ?>
                </ul>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section id="greeting-history" class="section section--greeting-history" aria-labelledby="greeting-history-title" data-year-carousel>
      <div class="greeting-history__shell">
        <div class="section-shell section-shell--gutter greeting-history__head">
          <h2 id="greeting-history-title" class="greeting-history__title scroll-reveal"><?php echo esc_html(template_a_get('about.greeting.history.title')); ?></h2>
        </div>
        <div class="greeting-history__viewport scroll-reveal">
          <div class="greeting-history__track" data-year-carousel-track>
            <?php foreach (template_a_get('about.greeting.history.years', array()) as $index => $year) : ?>
              <article class="greeting-history__year<?php echo $index === 0 ? ' is-active' : ''; ?>" data-year-carousel-item>
                <button type="button" class="greeting-history__year-btn" aria-pressed="<?php echo $index === 0 ? 'true' : 'false'; ?>">
                  <span class="greeting-history__year-label"><?php echo esc_html($year['year']); ?></span>
                </button>
                <ul class="greeting-history__list">
                  <?php foreach ($year['entries'] as $entry) : ?>
                    <li class="greeting-history__item">
                      <span class="greeting-history__month"><?php echo esc_html($entry['month']); ?></span>
                      <span class="greeting-history__text"><?php echo esc_html($entry['text']); ?></span>
                    </li>
                  <?php endforeach; ?>
                </ul>
              </article>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
    </section>
  </main>