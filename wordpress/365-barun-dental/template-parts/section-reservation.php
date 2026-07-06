<?php
/**
 * Reservation CTA — Figma 453:582
 */
?>
<section class="section-reservation" aria-labelledby="reservation-title">
  <div class="section-shell section-shell--gutter">
    <div class="section-reservation__inner">
      <header class="section-reservation__header">
        <p class="section-reservation__label scroll-reveal">RESERVATION</p>
        <h2 id="reservation-title" class="section-reservation__title">
          <span class="section-reservation__title-line scroll-reveal">미뤄두었던 치아 고민,</span>
          <span class="section-reservation__title-line scroll-reveal">검진부터 차근히 시작하세요.</span>
        </h2>
      </header>

      <div class="section-reservation__cta">
        <a href="#" class="section-reservation__btn section-reservation__btn--primary btn-slide-hover scroll-reveal">
          <?php echo barun_dental_button_slide('카카오톡 상담하기'); ?>
        </a>
        <a href="#" class="section-reservation__btn section-reservation__btn--outline btn-slide-hover scroll-reveal">
          <?php echo barun_dental_button_slide('상담 게시판 가기'); ?>
        </a>
      </div>
    </div>
  </div>
</section>
