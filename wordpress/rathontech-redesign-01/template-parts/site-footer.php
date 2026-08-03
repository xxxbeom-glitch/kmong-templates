<?php
/**
 * Site footer — compact · confirmed facts only.
 */
$year = (int) gmdate('Y');
?>
<footer class="site-footer" role="contentinfo">
  <div class="site-footer__inner u-container">
    <div class="site-footer__row">
      <a class="site-footer__brand" href="<?php echo esc_url(home_url('/')); ?>">RATHONTECH</a>
      <div class="site-footer__meta">
        <ul class="site-footer__meta-col">
          <li><?php echo esc_html__('주식회사 라톤테크', 'rathontech-redesign-01'); ?></li>
          <li><?php echo esc_html__('대표 최대량', 'rathontech-redesign-01'); ?></li>
        </ul>
        <ul class="site-footer__meta-col">
          <li><span class="site-footer__label">T.</span> <a href="tel:028577730">02-857-7730</a></li>
          <li><span class="site-footer__label">F.</span> 02-862-6485</li>
          <li>
            <span class="site-footer__label"><?php echo esc_html__('본사', 'rathontech-redesign-01'); ?></span>
            <?php echo esc_html__('서울시 금천구 디지털로 178, A동 619~622호 (가산동, 가산퍼블릭)', 'rathontech-redesign-01'); ?>
          </li>
        </ul>
      </div>
    </div>
    <p class="site-footer__copy">
      &copy; <?php echo esc_html((string) $year); ?>
      <?php echo esc_html__('Rathontech Inc. All Rights Reserved.', 'rathontech-redesign-01'); ?>
    </p>
  </div>
</footer>
<?php
unset($year);
