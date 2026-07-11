  <footer id="footer" class="site-footer" aria-labelledby="footer-tagline">
    <div class="section-shell section-shell--gutter site-footer__inner">
      <div class="site-footer__top">
        <p id="footer-tagline" class="site-footer__tagline">
          <?php echo esc_html(template_a_get('site.footer.tagline_1')); ?><br>
          <span class="site-footer__tagline-line2"><?php echo esc_html(template_a_get('site.footer.tagline_2_prefix')); ?> <span class="site-footer__tagline-accent"><?php echo esc_html(template_a_get('site.footer.tagline_2_accent')); ?></span></span>
        </p>
        <a class="btn-cta btn-cta--footer" href="<?php echo esc_url(home_url('/contact/')); ?>"><?php echo esc_html(template_a_get('site.footer.cta')); ?></a>
      </div>
      <div class="site-footer__bottom">
        <div class="site-footer__info">
          <?php foreach (array_chunk(template_a_get('site.footer.company_fields', array()), 3) as $row) : ?>
            <div class="site-footer__info-row">
              <?php foreach ($row as $field) : ?>
                <div class="site-footer__info-item">
                  <span class="site-footer__info-label"><?php echo esc_html($field['label']); ?></span>
                  <span class="site-footer__info-value"><?php echo esc_html($field['value']); ?></span>
                </div>
              <?php endforeach; ?>
            </div>
          <?php endforeach; ?>
        </div>
        <div class="site-footer__legal">
          <a class="site-footer__privacy" href="<?php echo esc_url(home_url('/privacy/')); ?>"><?php echo esc_html(template_a_get('site.footer.privacy_label')); ?></a>
          <p class="site-footer__copy"><?php echo esc_html(template_a_get('site.footer.copyright')); ?></p>
        </div>
      </div>
    </div>
  </footer>
<?php if (is_front_page()) : ?>
  <aside class="quick-consult" data-quick-consult aria-label="<?php echo esc_attr(template_a_get('site.quick_consult.aria_label')); ?>">
    <form class="quick-consult__form" action="<?php echo esc_url(home_url('/contact/')); ?>" method="get">
      <div class="section-shell section-shell--gutter">
        <div class="quick-consult__container">
          <div class="quick-consult__header">
            <p class="quick-consult__title"><?php echo esc_html(template_a_get('site.quick_consult.title')); ?></p>
            <label class="quick-consult__privacy">
              <input type="checkbox" name="privacy" checked>
              <span><?php echo esc_html(template_a_get('site.quick_consult.privacy')); ?></span>
            </label>
          </div>
          <div class="quick-consult__row">
            <label class="quick-consult__field quick-consult__field--name">
              <span class="visually-hidden"><?php echo esc_html(template_a_get('site.quick_consult.name_label')); ?></span>
              <input type="text" name="name" placeholder="<?php echo esc_attr(template_a_get('site.quick_consult.name_placeholder')); ?>" autocomplete="name">
            </label>
            <label class="quick-consult__field quick-consult__field--phone">
              <span class="visually-hidden"><?php echo esc_html(template_a_get('site.quick_consult.phone_label')); ?></span>
              <input type="tel" name="phone" placeholder="<?php echo esc_attr(template_a_get('site.quick_consult.phone_placeholder')); ?>" autocomplete="tel">
            </label>
            <label class="quick-consult__field quick-consult__field--message">
              <span class="visually-hidden"><?php echo esc_html(template_a_get('site.quick_consult.message_label')); ?></span>
              <input type="text" name="message" placeholder="<?php echo esc_attr(template_a_get('site.quick_consult.message_placeholder')); ?>">
            </label>
            <button type="submit" class="quick-consult__submit"><?php echo esc_html(template_a_get('site.quick_consult.submit')); ?></button>
          </div>
        </div>
      </div>
    </form>
  </aside>
<?php endif; ?>
  <button type="button" class="btn-top" aria-label="<?php echo esc_attr(template_a_get('site.top_button_label')); ?>">
    <span class="btn-top__icon" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4.25v11.5" stroke="#111111" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M5.25 8.75 10 4.25l4.75 4.5" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </button>
<?php wp_footer(); ?>
</body>
</html>
