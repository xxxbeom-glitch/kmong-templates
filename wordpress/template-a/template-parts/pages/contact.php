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

    <section id="contact" class="section section--contact-page" aria-labelledby="contact-title">
      <div class="section-shell section-shell--gutter contact-page__inner">
        <h2 id="contact-title" class="contact-page__title scroll-reveal"><?php echo esc_html(template_a_get('contact.section_title')); ?></h2>
        <div class="contact-page__body">
          <figure class="contact-page__figure scroll-reveal">
            <img
              class="contact-page__img"
              src="<?php echo esc_url(template_a_img_url('contact.image', 'images/feature-bg-01.jpg')); ?>"
              alt=""
              width="750"
              height="845"
              decoding="async"
            >
          </figure>
          <form class="contact-page__form scroll-reveal" action="#" method="post" novalidate>
            <div class="contact-page__fields">
              <div class="contact-page__row contact-page__row--2">
                <div class="contact-page__field">
                  <label class="contact-page__label" for="contact-name"><?php echo esc_html(template_a_get('contact.fields.0.label')); ?></label>
                  <input id="contact-name" name="name" type="text" autocomplete="name" placeholder="<?php echo esc_attr(template_a_get('contact.fields.0.placeholder')); ?>" required>
                </div>
                <div class="contact-page__field">
                  <label class="contact-page__label" for="contact-company"><?php echo esc_html(template_a_get('contact.fields.1.label')); ?></label>
                  <input id="contact-company" name="company" type="text" autocomplete="organization" placeholder="<?php echo esc_attr(template_a_get('contact.fields.1.placeholder')); ?>">
                </div>
              </div>
              <div class="contact-page__row contact-page__row--2">
                <div class="contact-page__field">
                  <label class="contact-page__label" for="contact-email"><?php echo esc_html(template_a_get('contact.fields.2.label')); ?></label>
                  <input id="contact-email" name="email" type="email" autocomplete="email" placeholder="<?php echo esc_attr(template_a_get('contact.fields.2.placeholder')); ?>" required>
                </div>
                <div class="contact-page__field">
                  <label class="contact-page__label" for="contact-phone"><?php echo esc_html(template_a_get('contact.fields.3.label')); ?></label>
                  <input id="contact-phone" name="phone" type="tel" autocomplete="tel" placeholder="<?php echo esc_attr(template_a_get('contact.fields.3.placeholder')); ?>" required>
                </div>
              </div>
              <div class="contact-page__row">
                <div class="contact-page__field">
                  <label class="contact-page__label" for="contact-industry"><?php echo esc_html(template_a_get('contact.fields.4.label')); ?></label>
                  <input id="contact-industry" name="industry" type="text" placeholder="<?php echo esc_attr(template_a_get('contact.fields.4.placeholder')); ?>" required>
                </div>
              </div>
              <div class="contact-page__row">
                <div class="contact-page__field">
                  <label class="contact-page__label" for="contact-message"><?php echo esc_html(template_a_get('contact.fields.5.label')); ?></label>
                  <textarea id="contact-message" name="message" rows="6" placeholder="<?php echo esc_attr(template_a_get('contact.fields.5.placeholder')); ?>" required></textarea>
                </div>
              </div>
            </div>
            <label class="contact-page__privacy">
              <input type="checkbox" name="privacy" value="1" required>
              <span><?php echo esc_html(template_a_get('contact.privacy')); ?></span>
            </label>
            <button class="contact-page__submit" type="submit"><?php echo esc_html(template_a_get('contact.submit')); ?></button>
          </form>
        </div>
      </div>
    </section>
  </main>