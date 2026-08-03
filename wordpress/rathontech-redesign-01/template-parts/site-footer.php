<?php
/**
 * Site footer — brand left · contact facts one line below.
 */
$year = (int) gmdate('Y');
?>
<footer class="site-footer" role="contentinfo">
  <div class="site-footer__inner u-container">
    <div class="site-footer__brand-block">
      <a class="site-footer__brand" href="<?php echo esc_url(home_url('/')); ?>">
        <?php echo esc_html__('주식회사 라톤테크', 'rathontech-redesign-01'); ?>
      </a>
      <ul class="site-footer__meta-line">
        <li>
          <span class="site-footer__label"><?php echo esc_html__('전화', 'rathontech-redesign-01'); ?></span>
          <a href="tel:028577730">02-857-7730</a>
        </li>
        <li>
          <span class="site-footer__label"><?php echo esc_html__('팩스', 'rathontech-redesign-01'); ?></span>
          02-862-6485
        </li>
        <li>
          <span class="site-footer__label"><?php echo esc_html__('이메일', 'rathontech-redesign-01'); ?></span>
          <a href="mailto:management@rathontech.com">management@rathontech.com</a>
        </li>
        <li>
          <span class="site-footer__label"><?php echo esc_html__('주소', 'rathontech-redesign-01'); ?></span>
          <?php echo esc_html__('서울시 금천구 디지털로 178, A동 619~622호 (가산동, 가산퍼블릭)', 'rathontech-redesign-01'); ?>
        </li>
        <li>
          <span class="site-footer__label"><?php echo esc_html__('사업자등록번호', 'rathontech-redesign-01'); ?></span>
          107-86-16786
        </li>
        <li>
          <span class="site-footer__label"><?php echo esc_html__('대표자', 'rathontech-redesign-01'); ?></span>
          <?php echo esc_html__('최대량', 'rathontech-redesign-01'); ?>
        </li>
        <li>
          <span class="site-footer__label"><?php echo esc_html__('개인정보관리책임자', 'rathontech-redesign-01'); ?></span>
          <?php echo esc_html__('박연숙', 'rathontech-redesign-01'); ?>
        </li>
      </ul>
    </div>
    <p class="site-footer__copy">
      &copy; <?php echo esc_html((string) $year); ?>
      <?php echo esc_html__('Rathontech Inc. All Rights Reserved.', 'rathontech-redesign-01'); ?>
    </p>
  </div>
</footer>
<?php
unset($year);
