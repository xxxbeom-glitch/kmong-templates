  <main id="main" class="main main--subpage">
    <section id="page-hero" class="section section--page-hero" aria-labelledby="page-hero-title">
      <div class="page-hero__media" aria-hidden="true">
        <img
          class="page-hero__img"
          src="<?php echo esc_url(template_a_asset_uri('images/hero-bg-02.jpg')); ?>"
          alt=""
          width="1920"
          height="364"
          decoding="async"
          fetchpriority="high"
        >
        <div class="page-hero__overlay"></div>
      </div>
      <div class="section-shell section-shell--gutter page-hero__inner">
        <div class="page-hero__copy">
          <p class="page-hero__label">프로젝트 문의</p>
          <h1 id="page-hero-title" class="page-hero__title">새로운 프로젝트를 함께 시작해보세요.</h1>
        </div>
      </div>
    </section>

    <section id="contact" class="section section--contact-page" aria-labelledby="contact-title">
      <div class="section-shell section-shell--gutter contact-page__inner">
        <h2 id="contact-title" class="contact-page__title scroll-reveal">프로젝트 문의</h2>
        <div class="contact-page__body">
          <figure class="contact-page__figure scroll-reveal">
            <img
              class="contact-page__img"
              src="<?php echo esc_url(template_a_asset_uri('images/feature-bg-01.jpg')); ?>"
              alt=""
              width="750"
              height="845"
              decoding="async"
            >
          </figure>
          <form class="contact-page__form scroll-reveal" action="#" method="post" novalidate>
            <div class="contact-page__fields">
              <div class="contact-page__row contact-page__row--2">
                <div class="contact-page__field">
                  <label class="contact-page__label" for="contact-name">이름</label>
                  <input id="contact-name" name="name" type="text" autocomplete="name" placeholder="이름을 입력해주세요" required>
                </div>
                <div class="contact-page__field">
                  <label class="contact-page__label" for="contact-company">업체명</label>
                  <input id="contact-company" name="company" type="text" autocomplete="organization" placeholder="업체명을 적어주세요 (선택)">
                </div>
              </div>
              <div class="contact-page__row contact-page__row--2">
                <div class="contact-page__field">
                  <label class="contact-page__label" for="contact-email">이메일 주소</label>
                  <input id="contact-email" name="email" type="email" autocomplete="email" placeholder="이메일을 입력해주세요" required>
                </div>
                <div class="contact-page__field">
                  <label class="contact-page__label" for="contact-phone">연락처</label>
                  <input id="contact-phone" name="phone" type="tel" autocomplete="tel" placeholder="연락처를 입력해주세요" required>
                </div>
              </div>
              <div class="contact-page__row">
                <div class="contact-page__field">
                  <label class="contact-page__label" for="contact-industry">업종 유형</label>
                  <input id="contact-industry" name="industry" type="text" placeholder="(필수) 수집 항목: 이름, 연락처 / 목적: 프로젝트 상담 / 보유기간: 상담 완료 후 1년" required>
                </div>
              </div>
              <div class="contact-page__row">
                <div class="contact-page__field">
                  <label class="contact-page__label" for="contact-message">문의내용</label>
                  <textarea id="contact-message" name="message" rows="6" placeholder="원하는 사이트 방향, 필요한 페이지, 참고 사이트를 적어주세요" required></textarea>
                </div>
              </div>
            </div>
            <label class="contact-page__privacy">
              <input type="checkbox" name="privacy" value="1" required>
              <span>[필수] 개인정보 수집·이용 동의</span>
            </label>
            <button class="contact-page__submit" type="submit">문의 보내기</button>
          </form>
        </div>
      </div>
    </section>
  </main>