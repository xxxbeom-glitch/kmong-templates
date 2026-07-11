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
          <p class="page-hero__label">오시는길</p>
          <h1 id="page-hero-title" class="page-hero__title">텐폴드 스튜디오로<br>오시는 길을 안내합니다.</h1>
        </div>
      </div>
    </section>

    <section id="directions" class="section section--directions" aria-labelledby="directions-title">
      <div class="section-shell section-shell--gutter directions__inner">
        <h2 id="directions-title" class="directions__title scroll-reveal">오시는 길</h2>
        <figure class="directions__figure scroll-reveal">
          <img
            class="directions__img"
            src="<?php echo esc_url(template_a_asset_uri('images/feature-bg-03.jpg')); ?>"
            alt=""
            width="1440"
            height="771"
            decoding="async"
          >
        </figure>
        <article class="directions__row scroll-reveal">
          <div class="directions__label">
            <h3 class="directions__label-title">주소</h3>
          </div>
          <div class="directions__detail">
            <p class="directions__street">서울특별시 영등포구 국회대로66길 3, 현대카드빌딩 2관 5층</p>
            <div class="directions__transit">
              <p>9호선 국회의사당역 1번 출구에서 도보 약 90m</p>
              <p>국회의사당역 정류장 하차<br>1002, 163, 461, 463, 6623, 6713번</p>
            </div>
            <div class="directions__actions">
              <a
                class="directions__map-link btn-pill--muted"
                href="https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC%20%EA%B5%AD%ED%9A%8C%EB%8C%80%EB%A1%9C%2066%EA%B8%B8%203"
                target="_blank"
                rel="noopener noreferrer"
              >네이버 지도</a>
              <a
                class="directions__map-link btn-pill--muted"
                href="https://map.kakao.com/?q=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%98%81%EB%93%B1%ED%8F%AC%EA%B5%AC%20%EA%B5%AD%ED%9A%8C%EB%8C%80%EB%A1%9C%2066%EA%B8%B8%203"
                target="_blank"
                rel="noopener noreferrer"
              >카카오 지도</a>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>