  <main id="main" class="main main--subpage">
    <section id="page-hero" class="section section--page-hero" aria-labelledby="page-hero-title">
      <div class="page-hero__media" aria-hidden="true">
        <img
          class="page-hero__img"
          src="<?php echo esc_url(template_a_img_url('service.process.hero.image', 'images/hero-bg-02.jpg')); ?>"
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
          <p class="page-hero__label"><?php echo esc_html(template_a_get('service.process.hero.label')); ?></p>
          <h1 id="page-hero-title" class="page-hero__title"><?php echo template_a_text_br('service.process.hero.title'); ?></h1>
        </div>
      </div>
    </section>

    <section id="process-intro" class="section section--service-intro" aria-labelledby="process-intro-title">
      <div class="section-shell section-shell--gutter service-intro__inner">
        <div class="service-intro__watermark-band" aria-hidden="true">
          <p class="service-intro__watermark"><?php echo esc_html(template_a_get('service.process.intro.watermark')); ?></p>
        </div>
        <div class="service-intro__copy">
          <h2 id="process-intro-title" class="service-intro__title scroll-reveal"><?php echo template_a_text_br('service.process.intro.title'); ?></h2>
          <p class="service-intro__body scroll-reveal"><?php echo template_a_text_br('service.process.intro.body'); ?></p>
        </div>
      </div>
    </section>

    <section id="process-steps" class="section section--process-steps" aria-labelledby="process-steps-title">
      <div class="section-shell section-shell--gutter process-steps__inner">
        <h2 id="process-steps-title" class="section-title section-title--center scroll-reveal"><?php echo esc_html(template_a_get('service.process.steps_title')); ?></h2>
        <div class="process-steps__grid">
          <?php foreach (array_chunk(template_a_get('service.process.steps', array()), 2) as $row) : ?>
            <div class="process-steps__row">
              <?php foreach ($row as $step) : ?>
                <article class="process-step<?php echo count($row) === 1 ? ' process-step--full' : ''; ?> scroll-reveal">
                  <div class="process-step__head">
                    <p class="process-step__label"><?php echo esc_html($step['label']); ?></p>
                    <h3 class="process-step__name"><?php echo esc_html($step['title']); ?></h3>
                  </div>
                  <p class="process-step__body"><?php echo nl2br(esc_html($step['body']), false); ?></p>
                </article>
              <?php endforeach; ?>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  </main>