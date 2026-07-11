  <footer id="footer" class="site-footer" aria-labelledby="footer-tagline">
    <div class="section-shell section-shell--gutter site-footer__inner">
      <div class="site-footer__top">
        <p id="footer-tagline" class="site-footer__tagline">
          혁신으로 미래를 설계하다<br>
          <span class="site-footer__tagline-line2">미래를 여는 <span class="site-footer__tagline-accent">최적의 기술 솔루션</span></span>
        </p>
        <a class="btn-cta btn-cta--footer" href="<?php echo esc_url(home_url('/contact/')); ?>">프로젝트 의뢰하기</a>
      </div>
      <div class="site-footer__bottom">
        <div class="site-footer__info">
          <div class="site-footer__info-row">
            <div class="site-footer__info-item">
              <span class="site-footer__info-label">상호명</span>
              <span class="site-footer__info-value">텐폴드</span>
            </div>
            <div class="site-footer__info-item">
              <span class="site-footer__info-label">대표자</span>
              <span class="site-footer__info-value">박성범</span>
            </div>
            <div class="site-footer__info-item">
              <span class="site-footer__info-label">사업자번호</span>
              <span class="site-footer__info-value">000-00-00000</span>
            </div>
          </div>
          <div class="site-footer__info-row">
            <div class="site-footer__info-item">
              <span class="site-footer__info-label">주소</span>
              <span class="site-footer__info-value">서울시 관악구 남부순환로</span>
            </div>
            <div class="site-footer__info-item">
              <span class="site-footer__info-label">대표전화</span>
              <span class="site-footer__info-value">070-0000-0000</span>
            </div>
            <div class="site-footer__info-item">
              <span class="site-footer__info-label">이메일</span>
              <span class="site-footer__info-value">tenfold@tenfold.kr</span>
            </div>
          </div>
        </div>
        <div class="site-footer__legal">
          <a class="site-footer__privacy" href="<?php echo esc_url(home_url('/privacy/')); ?>">개인정보 처리방침</a>
          <p class="site-footer__copy">TENFOLD STUDIO. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </footer>
<?php if (is_front_page()) : ?>
  <aside class="quick-consult" data-quick-consult aria-label="빠른 상담">
    <form class="quick-consult__form" action="<?php echo esc_url(home_url('/contact/')); ?>" method="get">
      <div class="section-shell section-shell--gutter">
        <div class="quick-consult__container">
          <div class="quick-consult__header">
            <p class="quick-consult__title">빠른 상담 하기</p>
            <label class="quick-consult__privacy">
              <input type="checkbox" name="privacy" checked>
              <span>[필수] 개인정보 수집·이용 동의</span>
            </label>
          </div>
          <div class="quick-consult__row">
            <label class="quick-consult__field quick-consult__field--name">
              <span class="visually-hidden">이름</span>
              <input type="text" name="name" placeholder="이름을 입력해주세요" autocomplete="name">
            </label>
            <label class="quick-consult__field quick-consult__field--phone">
              <span class="visually-hidden">연락처</span>
              <input type="tel" name="phone" placeholder="연락가능한 전화번호를 입력해주세요" autocomplete="tel">
            </label>
            <label class="quick-consult__field quick-consult__field--message">
              <span class="visually-hidden">문의 내용</span>
              <input type="text" name="message" placeholder="간단한 문의 내용을 적어주세요">
            </label>
            <button type="submit" class="quick-consult__submit">프로젝트 문의하기</button>
          </div>
        </div>
      </div>
    </form>
  </aside>
<?php endif; ?>
  <button type="button" class="btn-top" aria-label="상단으로 가기">
    <span class="btn-top__icon" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4.25v11.5" stroke="#111111" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M5.25 8.75 10 4.25l4.75 4.5" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
  </button>
<?php wp_footer(); ?>
</body>
</html>
