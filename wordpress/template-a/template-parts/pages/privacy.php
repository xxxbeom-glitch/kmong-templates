  <main id="main" class="main main--subpage">
    <section id="privacy" class="section section--privacy" aria-labelledby="privacy-title">
      <div class="section-shell section-shell--gutter privacy__inner">
        <h1 id="privacy-title" class="privacy__title scroll-reveal"><?php echo esc_html(template_a_get('privacy.title')); ?></h1>
        <div class="privacy__body">
          <p class="privacy__intro scroll-reveal"><?php echo esc_html(template_a_get('privacy.intro')); ?></p>
          <?php foreach (template_a_get('privacy.sections', array()) as $index => $section) : ?>
            <section class="privacy__section scroll-reveal" aria-labelledby="privacy-s<?php echo esc_attr($index + 1); ?>">
              <h2 id="privacy-s<?php echo esc_attr($index + 1); ?>" class="privacy__section-title"><?php echo esc_html($section['title']); ?></h2>
              <div class="privacy__section-body"><?php echo wp_kses_post($section['body']); ?></div>
            </section>
          <?php endforeach; ?>
        </div>
      </div>
    </section>
  </main>