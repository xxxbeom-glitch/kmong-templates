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
      <svg width="26" height="24" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
        <path fill="currentColor" d="M11.5 0C5.15 0 0 3.85 0 8.61c0 3.09 2.18 5.8 5.46 7.32-.24.85-.87 3.07-1 3.55s.23.59.48.43l4.43-2.85a15.15 15.15 0 0 0 2.13.15c6.35 0 11.5-3.85 11.5-8.6S17.85 0 11.5 0Z"/>
      </svg>
    </span>
  </a>
  <a
    class="float-actions__btn float-actions__btn--contact"
    href="<?php echo esc_url($contact_url); ?>"
    aria-label="문의게시판"
  >
    <span class="float-actions__label" aria-hidden="true">문의게시판</span>
    <span class="float-actions__icon" aria-hidden="true">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M17.8 9.8 13.8 13c-.5.4-1.1.6-1.8.6-.6 0-1.2-.2-1.8-.6l-4-3.3c-.3-.3-.4-.7-.1-1.1.3-.4.7-.4 1.1-.1l4 3.2c.5.4 1.2.4 1.6 0l4-3.2c.3-.3.8-.2 1.1.1.3.4.2.9-.1 1.2ZM16.4 3.4H7.6C4.7 3.4 2.5 5.8 2.5 8.9v6.2c0 1.6.6 3.1 1.6 4.1.9.9 2.1 1.4 3.5 1.4h8.8c1.3 0 2.5-.5 3.5-1.4 1-1 1.6-2.5 1.6-4.1V8.9c0-3.1-2.2-5.5-5.1-5.5Z"/>
      </svg>
    </span>
  </a>
</nav>
