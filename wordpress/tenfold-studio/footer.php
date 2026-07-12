<?php
$footer_compact = !empty($compact);
$nav_items = tenfold_nav_items();
?>
  </main>
<?php if (!$footer_compact) : ?>
  <section class="section section--footer-cta" aria-labelledby="footer-cta-title">
    <div class="section-shell section-shell--gutter footer-cta">
      <div class="footer-cta__copy">
        <h2 id="footer-cta-title" class="footer-cta__title">홈페이지 제작, 어디서부터 시작할지 정해지지 않아도 괜찮습니다.</h2>
      </div>
      <div class="footer-cta__action">
        <a class="btn btn--primary footer-cta__btn" href="<?php echo esc_url(tenfold_url('contact')); ?>">프로젝트 문의하기</a>
      </div>
    </div>
  </section>
<?php endif; ?>
  <footer id="footer" class="site-footer<?php echo $footer_compact ? ' site-footer--compact' : ''; ?>">
    <div class="section-shell section-shell--gutter">
      <?php if (!$footer_compact) : ?>
        <div class="site-footer__row">
          <div class="site-footer__brand">
            <p class="site-footer__name">TENFOLD STUDIO</p>
          </div>
          <ul class="site-footer__nav">
            <?php foreach ($nav_items as $item) : ?>
              <li><a href="<?php echo esc_url($item['href']); ?>"><?php echo esc_html($item['label']); ?></a></li>
            <?php endforeach; ?>
          </ul>
          <div class="site-footer__aside">
            <a href="mailto:tenfold@tenfold.kr">tenfold@tenfold.kr</a>
            <a href="<?php echo esc_url(tenfold_url('privacy')); ?>">개인정보처리방침</a>
          </div>
        </div>
      <?php else : ?>
        <div class="site-footer__compact-row">
          <a class="site-footer__name" href="<?php echo esc_url(tenfold_url()); ?>">TENFOLD STUDIO</a>
          <a href="mailto:tenfold@tenfold.kr">tenfold@tenfold.kr</a>
        </div>
      <?php endif; ?>
      <p class="site-footer__copy">© 2026 TENFOLD STUDIO. All rights reserved.</p>
    </div>
  </footer>
<?php tenfold_part('components/float-actions'); ?>
<?php wp_footer(); ?>
</body>
</html>
