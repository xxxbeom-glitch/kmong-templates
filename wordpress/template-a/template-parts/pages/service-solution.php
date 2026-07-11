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
          <p class="page-hero__label">서비스 소개</p>
          <h1 id="page-hero-title" class="page-hero__title">기획부터 운영까지,<br>필요한 웹 구축 서비스를 제공합니다.</h1>
        </div>
      </div>
    </section>

    <section id="service-intro" class="section section--service-intro" aria-labelledby="service-intro-title">
      <div class="section-shell section-shell--gutter service-intro__inner">
        <div class="service-intro__watermark-band" aria-hidden="true">
          <p class="service-intro__watermark">WEB SERVICE</p>
        </div>
        <div class="service-intro__copy">
          <h2 id="service-intro-title" class="service-intro__title scroll-reveal">비즈니스의 목적을 이해하고,<br>필요한 웹 환경을 설계합니다.</h2>
          <p class="service-intro__body scroll-reveal">기업과 브랜드가 전달해야 할 가치, 고객이 원하는 정보, 실제 운영에 필요한 기능을 함께 고려해<br>지속적으로 활용할 수 있는 웹사이트를 구축합니다.</p>
        </div>
      </div>
    </section>

    <section id="service-cards" class="section section--service-cards" aria-labelledby="service-cards-title">
      <div class="section-shell section-shell--gutter service-cards__inner">
        <h2 id="service-cards-title" class="section-title section-title--center scroll-reveal">웹사이트 구축에 필요한 과정을 하나의 흐름으로 연결합니다.</h2>
        <div class="service-cards__grid">
          <div class="service-cards__row">
            <article class="service-card media-card service-card--wide scroll-reveal">
              <img
                class="media-card__img"
                src="<?php echo esc_url(template_a_asset_uri('images/feature-bg-01.jpg')); ?>"
                alt=""
                width="874"
                height="446"
                decoding="async"
              >
              <div class="media-card__overlay" aria-hidden="true"></div>
              <div class="service-card__content">
                <h3 class="service-card__title">기획·전략</h3>
                <p class="service-card__body">비즈니스 목표와 사용자 요구를 분석해 사이트의 역할, 메뉴 구조와 콘텐츠 우선순위를 정의합니다.</p>
              </div>
            </article>
            <article class="service-card media-card service-card--narrow scroll-reveal">
              <img
                class="media-card__img"
                src="<?php echo esc_url(template_a_asset_uri('images/feature-bg-02.jpg')); ?>"
                alt=""
                width="542"
                height="446"
                decoding="async"
              >
              <div class="media-card__overlay" aria-hidden="true"></div>
              <div class="service-card__content">
                <h3 class="service-card__title">UI·UX 디자인</h3>
                <p class="service-card__body">브랜드의 인상을 유지하면서도 정보가 명확하게<br>전달되는 화면과 사용자 경험을 설계합니다.</p>
              </div>
            </article>
          </div>
          <div class="service-cards__row">
            <article class="service-card media-card service-card--narrow scroll-reveal">
              <img
                class="media-card__img"
                src="<?php echo esc_url(template_a_asset_uri('images/feature-bg-03.jpg')); ?>"
                alt=""
                width="542"
                height="446"
                decoding="async"
              >
              <div class="media-card__overlay" aria-hidden="true"></div>
              <div class="service-card__content">
                <h3 class="service-card__title">반응형 웹 개발</h3>
                <p class="service-card__body">PC와 모바일 등 다양한 환경에서 안정적으로 작동하는 웹사이트를 구현합니다.</p>
              </div>
            </article>
            <article class="service-card media-card service-card--wide scroll-reveal">
              <img
                class="media-card__img"
                src="<?php echo esc_url(template_a_asset_uri('images/feature-bg-04.webp')); ?>"
                alt=""
                width="874"
                height="446"
                decoding="async"
              >
              <div class="media-card__overlay" aria-hidden="true"></div>
              <div class="service-card__content">
                <h3 class="service-card__title">관리자·CMS</h3>
                <p class="service-card__body">공지사항, 이미지, 주요 콘텐츠를 담당자가 직접 수정하고 관리할 수 있는<br>환경을 구축합니다.</p>
              </div>
            </article>
          </div>
          <div class="service-cards__row">
            <article class="service-card media-card service-card--full scroll-reveal">
              <img
                class="media-card__img"
                src="<?php echo esc_url(template_a_asset_uri('images/service-bg-01.jpg')); ?>"
                alt=""
                width="1440"
                height="446"
                decoding="async"
              >
              <div class="media-card__overlay" aria-hidden="true"></div>
              <div class="service-card__content">
                <h3 class="service-card__title">운영·유지관리</h3>
                <p class="service-card__body">오픈 이후 콘텐츠 수정, 기능 개선, 시스템 점검과 오류 대응을 지원합니다.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>