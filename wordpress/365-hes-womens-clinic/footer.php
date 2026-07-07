<?php
$footer = hes_womens_clinic_footer_meta();
?>
</main>

<footer id="footer" class="site-footer">
  <div class="section-shell section-shell--gutter site-footer__inner">
    <div class="site-footer__top">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="site-footer__logo">
        <img
          class="site-footer__logo-img"
          src="<?php echo esc_url(hes_womens_clinic_asset_uri('logo-footer')); ?>"
          alt="<?php echo esc_attr(get_bloginfo('name')); ?>"
          width="239"
          height="78"
          loading="lazy"
          decoding="async"
        >
      </a>

      <div class="site-footer__social">
        <a
          class="site-footer__social-link"
          href="<?php echo esc_url($footer['instagram']); ?>"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span aria-hidden="true">IG</span>
          <span class="screen-reader-text">Instagram</span>
        </a>
        <a
          class="site-footer__social-link"
          href="<?php echo esc_url($footer['youtube']); ?>"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span aria-hidden="true">YT</span>
          <span class="screen-reader-text">YouTube</span>
        </a>
      </div>
    </div>

    <div class="site-footer__main">
      <hr class="site-footer__divider">

      <div class="site-footer__legal-row">
        <div class="site-footer__meta">
          <p class="site-footer__company"><?php echo esc_html($footer['company']); ?></p>
          <p class="site-footer__contact"><?php echo esc_html($footer['contact']); ?></p>
        </div>

        <div class="site-footer__links">
          <a class="site-footer__link site-footer__link--strong" href="<?php echo esc_url($footer['privacy']); ?>">
            개인정보처리방침
          </a>
          <a class="site-footer__link" href="<?php echo esc_url($footer['non_covered']); ?>">
            비급여 안내
          </a>
        </div>
      </div>

      <p class="site-footer__copy">
        Copyright &copy; 2024 365 Hess Women's Clinic. All rights reserved.
      </p>
    </div>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
