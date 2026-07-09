</main>

<footer class="site-footer" id="si_footer">
  <button type="button" class="site-footer__top top flex_center" data-scroll-top>
    <img src="<?php echo esc_url(wonkangmetal_mirror_img('img/top_arrow.png')); ?>" alt="" width="16" height="16" />
    TOP
  </button>

  <div class="footer_logo site-footer__brand">
    <img
      src="<?php echo esc_url(wonkangmetal_mirror_img('img/logo_w.png')); ?>"
      alt="<?php echo esc_attr(wonkangmetal_site_brand()['name']); ?>"
      class="site-footer__logo-img"
      width="146"
      height="40"
    />
  </div>

  <div class="footer_content site-footer__content">
    <?php $brand = wonkangmetal_site_brand(); ?>
    <ul class="info site-footer__info">
      <li>
        <h3><?php esc_html_e('본사', 'wonkangmetal'); ?></h3>
        <span><?php echo esc_html('주소 : ' . $brand['hq_address']); ?></span>
        <span><?php echo esc_html('전화 : ' . $brand['hq_phone']); ?></span>
        <span><?php echo esc_html('팩스 : ' . $brand['hq_fax']); ?></span>
      </li>
      <li>
        <h3><?php esc_html_e('영업소', 'wonkangmetal'); ?></h3>
        <span><?php echo esc_html('주소 : ' . $brand['branch_address']); ?></span>
        <span><?php echo esc_html('전화 : ' . $brand['branch_phone']); ?></span>
        <span><?php echo esc_html('팩스 : ' . $brand['branch_fax']); ?></span>
      </li>
      <li>
        <h3><?php esc_html_e('메일', 'wonkangmetal'); ?></h3>
        <span><?php echo esc_html($brand['email']); ?></span>
      </li>
    </ul>

    <nav class="site-footer__nav pc_gnb" aria-label="<?php esc_attr_e('푸터 메뉴', 'wonkangmetal'); ?>">
      <ul class="site-nav__list site-nav__list--footer">
        <?php foreach (wonkangmetal_nav_menu() as $item) : ?>
          <?php wonkangmetal_render_nav_item($item, false, 'footer'); ?>
        <?php endforeach; ?>
      </ul>
    </nav>
  </div>

  <div class="footer_utils site-footer__utils">
    <ul class="site-footer__legal">
      <li><a href="<?php echo esc_url(wonkangmetal_page_url('privacy-policy')); ?>"><?php esc_html_e('개인정보 취급방침', 'wonkangmetal'); ?></a></li>
      <li><a href="<?php echo esc_url(wonkangmetal_page_url('email-policy')); ?>"><?php esc_html_e('이메일 무단 수집거부', 'wonkangmetal'); ?></a></li>
    </ul>
    <p class="copyright site-footer__copy">
      &copy; <?php echo esc_html(gmdate('Y')); ?>
      <?php echo esc_html($brand['name']); ?>.
      <?php esc_html_e('All rights reserved.', 'wonkangmetal'); ?>
    </p>
  </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
