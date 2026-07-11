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
          <p class="page-hero__label">제작 사례</p>
          <h1 id="page-hero-title" class="page-hero__title">목적이 다른 프로젝트에 맞는<br>웹사이트를 만들어갑니다.</h1>
        </div>
      </div>
    </section>

    <section id="portfolio-intro" class="section section--service-intro" aria-labelledby="portfolio-intro-title">
      <div class="section-shell section-shell--gutter service-intro__inner">
        <div class="service-intro__watermark-band" aria-hidden="true">
          <p class="service-intro__watermark">PORTFOLIO</p>
        </div>
        <div class="service-intro__copy">
          <h2 id="portfolio-intro-title" class="service-intro__title scroll-reveal">다양한 분야에서 완성한 웹사이트를 확인해보세요.</h2>
          <p class="service-intro__body scroll-reveal">각 프로젝트 카드를 선택하면 실제 구축된 웹사이트를 새 창에서 확인할 수 있습니다.</p>
        </div>
      </div>
    </section>

    <section id="portfolio-grid" class="section section--portfolio-grid" aria-labelledby="portfolio-grid-title">
      <div class="section-shell section-shell--gutter portfolio-grid__inner">
        <div class="portfolio-grid__header scroll-reveal">
          <h2 id="portfolio-grid-title" class="portfolio-grid__title section-title section-title--left">주요 프로젝트</h2>
          <div class="portfolio-filter" role="tablist" aria-label="프로젝트 유형">
            <button type="button" class="portfolio-filter__tab filter-tab is-active" role="tab" aria-selected="true">전체</button>
            <button type="button" class="portfolio-filter__tab filter-tab" role="tab" aria-selected="false">기업·기관</button>
            <button type="button" class="portfolio-filter__tab filter-tab" role="tab" aria-selected="false">브랜드</button>
            <button type="button" class="portfolio-filter__tab filter-tab" role="tab" aria-selected="false">의료·전문기관</button>
          </div>
        </div>
        <div class="portfolio-grid__list">
          <div class="portfolio-grid__row">
            <article class="portfolio-card media-card scroll-reveal">
              <img
                class="media-card__img"
                src="<?php echo esc_url(template_a_asset_uri('images/feature-bg-01.jpg')); ?>"
                alt=""
                width="708"
                height="541"
                decoding="async"
              >
              <div class="media-card__overlay" aria-hidden="true"></div>
              <div class="portfolio-card__content">
                <p class="portfolio-card__label">기업·기관</p>
                <h3 class="portfolio-card__name">아크로텍</h3>
              </div>
            </article>
            <article class="portfolio-card media-card scroll-reveal">
              <img
                class="media-card__img"
                src="<?php echo esc_url(template_a_asset_uri('images/feature-bg-02.jpg')); ?>"
                alt=""
                width="708"
                height="541"
                decoding="async"
              >
              <div class="media-card__overlay" aria-hidden="true"></div>
              <div class="portfolio-card__content">
                <p class="portfolio-card__label">브랜드</p>
                <h3 class="portfolio-card__name">모노랩</h3>
              </div>
            </article>
          </div>
          <div class="portfolio-grid__row">
            <article class="portfolio-card media-card scroll-reveal">
              <img
                class="media-card__img"
                src="<?php echo esc_url(template_a_asset_uri('images/feature-bg-03.jpg')); ?>"
                alt=""
                width="708"
                height="541"
                decoding="async"
              >
              <div class="media-card__overlay" aria-hidden="true"></div>
              <div class="portfolio-card__content">
                <p class="portfolio-card__label">의료·전문기관</p>
                <h3 class="portfolio-card__name">메디온클리닉</h3>
              </div>
            </article>
            <article class="portfolio-card media-card scroll-reveal">
              <img
                class="media-card__img"
                src="<?php echo esc_url(template_a_asset_uri('images/feature-bg-04.webp')); ?>"
                alt=""
                width="708"
                height="541"
                decoding="async"
              >
              <div class="media-card__overlay" aria-hidden="true"></div>
              <div class="portfolio-card__content">
                <p class="portfolio-card__label">기업·기관</p>
                <h3 class="portfolio-card__name">모노랩</h3>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>