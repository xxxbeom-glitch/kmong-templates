<?php
/**
 * Contact page — 연락처 안내 (문의 폼 없음, P2-3)
 */
$brand = wonkangmetal_site_brand();
?>
<article <?php post_class('sub-page page-contact'); ?>>
  <div class="si-inner sub-page__inner">
    <div class="page-contact__grid">
      <section class="page-contact__block" aria-labelledby="contact-hq-title">
        <h2 id="contact-hq-title" class="page-contact__heading"><?php esc_html_e('본사', 'wonkangmetal'); ?></h2>
        <ul class="page-contact__list">
          <li><span class="page-contact__label"><?php esc_html_e('주소', 'wonkangmetal'); ?></span> <?php echo esc_html($brand['hq_address']); ?></li>
          <li><span class="page-contact__label"><?php esc_html_e('전화', 'wonkangmetal'); ?></span> <?php echo esc_html($brand['hq_phone']); ?></li>
          <li><span class="page-contact__label"><?php esc_html_e('팩스', 'wonkangmetal'); ?></span> <?php echo esc_html($brand['hq_fax']); ?></li>
        </ul>
      </section>

      <section class="page-contact__block" aria-labelledby="contact-branch-title">
        <h2 id="contact-branch-title" class="page-contact__heading"><?php esc_html_e('영업소', 'wonkangmetal'); ?></h2>
        <ul class="page-contact__list">
          <li><span class="page-contact__label"><?php esc_html_e('주소', 'wonkangmetal'); ?></span> <?php echo esc_html($brand['branch_address']); ?></li>
          <li><span class="page-contact__label"><?php esc_html_e('전화', 'wonkangmetal'); ?></span> <?php echo esc_html($brand['branch_phone']); ?></li>
          <li><span class="page-contact__label"><?php esc_html_e('팩스', 'wonkangmetal'); ?></span> <?php echo esc_html($brand['branch_fax']); ?></li>
        </ul>
      </section>

      <section class="page-contact__block" aria-labelledby="contact-email-title">
        <h2 id="contact-email-title" class="page-contact__heading"><?php esc_html_e('이메일', 'wonkangmetal'); ?></h2>
        <p class="page-contact__email">
          <a href="mailto:<?php echo esc_attr($brand['email']); ?>"><?php echo esc_html($brand['email']); ?></a>
        </p>
      </section>
    </div>

    <div class="page-contact__map-placeholder sub-page__placeholder" role="img" aria-label="<?php esc_attr_e('지도 영역 placeholder', 'wonkangmetal'); ?>">
      <p><?php esc_html_e('지도는 이후 단계에서 구성됩니다.', 'wonkangmetal'); ?></p>
    </div>
  </div>
</article>
