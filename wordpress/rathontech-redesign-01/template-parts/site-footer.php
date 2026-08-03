<?php
/**
 * Site footer — brand left · meta one line · copy right (clinic-footer layout).
 */
$year = (int) gmdate('Y');
?>
<footer class="site-footer" role="contentinfo">
  <div class="site-footer__inner u-container">
    <div class="site-footer__brand-block">
      <a class="site-footer__brand" href="<?php echo esc_url(home_url('/')); ?>">
        <?php echo esc_html__('주식회사 라톤테크', 'rathontech-redesign-01'); ?>
      </a>
      <p class="site-footer__meta">
        <span class="site-footer__token">
          <span class="site-footer__label"><?php echo esc_html__('전화', 'rathontech-redesign-01'); ?></span>
          <a class="site-footer__value" href="tel:028577730">02-857-7730</a>
        </span>
        <span class="site-footer__sep" aria-hidden="true">|</span>
        <span class="site-footer__token">
          <span class="site-footer__label"><?php echo esc_html__('팩스', 'rathontech-redesign-01'); ?></span>
          <span class="site-footer__value">02-862-6485</span>
        </span>
        <span class="site-footer__sep" aria-hidden="true">|</span>
        <span class="site-footer__token">
          <span class="site-footer__label"><?php echo esc_html__('이메일', 'rathontech-redesign-01'); ?></span>
          <a class="site-footer__value" href="mailto:management@rathontech.com">management@rathontech.com</a>
        </span>
        <span class="site-footer__sep" aria-hidden="true">|</span>
        <span class="site-footer__token">
          <span class="site-footer__label"><?php echo esc_html__('주소', 'rathontech-redesign-01'); ?></span>
          <span class="site-footer__value"><?php echo esc_html__('서울시 금천구 디지털로 178, A동 619~622호 (가산동, 가산퍼블릭)', 'rathontech-redesign-01'); ?></span>
        </span>
        <span class="site-footer__sep" aria-hidden="true">|</span>
        <span class="site-footer__token">
          <span class="site-footer__label"><?php echo esc_html__('사업자등록번호', 'rathontech-redesign-01'); ?></span>
          <span class="site-footer__value">107-86-16786</span>
        </span>
        <span class="site-footer__sep" aria-hidden="true">|</span>
        <span class="site-footer__token">
          <span class="site-footer__label"><?php echo esc_html__('대표자', 'rathontech-redesign-01'); ?></span>
          <span class="site-footer__value"><?php echo esc_html__('최대량', 'rathontech-redesign-01'); ?></span>
        </span>
        <span class="site-footer__sep" aria-hidden="true">|</span>
        <span class="site-footer__token">
          <span class="site-footer__label"><?php echo esc_html__('개인정보관리책임자', 'rathontech-redesign-01'); ?></span>
          <span class="site-footer__value"><?php echo esc_html__('박연숙', 'rathontech-redesign-01'); ?></span>
        </span>
      </p>
    </div>
    <p class="site-footer__copy">
      &copy; <?php echo esc_html((string) $year); ?>
      <?php echo esc_html__('RATHONTECH INC. ALL RIGHTS RESERVED.', 'rathontech-redesign-01'); ?>
    </p>
  </div>
</footer>
<?php
unset($year);
