<?php
$kakao_url = tenfold_kakao_url();
$contact_url = tenfold_url('contact');
?>
<nav class="float-actions" aria-label="빠른 상담">
  <a
    class="float-actions__btn float-actions__btn--kakao"
    href="<?php echo esc_url($kakao_url); ?>"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="카카오톡 상담"
  >
    <span class="float-actions__label" aria-hidden="true">카카오톡 상담</span>
    <span class="float-actions__icon" aria-hidden="true">
      <?php echo tenfold_icon('message-circle', array('class' => 'icon icon--float', 'width' => '26', 'height' => '26')); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- trusted theme SVG ?>
    </span>
  </a>
  <a
    class="float-actions__btn float-actions__btn--contact"
    href="<?php echo esc_url($contact_url); ?>"
    aria-label="문의게시판"
  >
    <span class="float-actions__label" aria-hidden="true">문의게시판</span>
    <span class="float-actions__icon" aria-hidden="true">
      <?php echo tenfold_icon('mail-fill', array('class' => 'icon icon--float', 'width' => '26', 'height' => '26')); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- trusted theme SVG ?>
    </span>
  </a>
</nav>
