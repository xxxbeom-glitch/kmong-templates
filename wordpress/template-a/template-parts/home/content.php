  <main id="main" class="main">
    <section id="hero" class="section section--hero" aria-labelledby="hero-title">
      <div class="hero__kv" data-hero-progress-slider>
        <div class="hero__slides" aria-live="polite">
          <?php $hero_images = array('images/hero-bg-01.jpg', 'images/hero-bg-02.jpg', 'images/hero-bg-03.jpg'); ?>
          <?php foreach (template_a_get('home.hero.slides', array()) as $index => $slide) : ?>
            <article class="hero__slide<?php echo $index === 0 ? ' is-active' : ''; ?>">
              <img class="hero__slide-img" src="<?php echo esc_url(template_a_img_url('home.hero.slides.' . $index . '.image', isset($hero_images[$index]) ? $hero_images[$index] : $hero_images[0])); ?>" alt="" width="1920" height="800" decoding="async"<?php echo $index === 0 ? ' fetchpriority="high"' : ''; ?>>
            </article>
          <?php endforeach; ?>
        </div>
        <div class="hero__overlay" aria-hidden="true"></div>
        <div class="section-shell section-shell--gutter hero__inner">
          <div class="hero__copy">
            <h1 id="hero-title" class="hero__title"><?php echo template_a_text_br('home.hero.title'); ?></h1>
            <p class="hero__lead"><?php echo esc_html(template_a_get('home.hero.lead')); ?></p>
          </div>
        </div>
        <div class="section-shell section-shell--gutter hero__progress">
          <button type="button" class="hero__progress-track" aria-label="<?php echo esc_attr(template_a_get('home.hero.progress_label')); ?>">
            <span class="hero__progress-fill"></span>
          </button>
        </div>
      </div>
    </section>

    <section id="intro" class="section section--intro" aria-label="<?php echo esc_attr(template_a_get('home.intro.aria_label')); ?>">
      <div class="section-shell section-shell--gutter intro__inner">
        <h2 class="intro__fill-txt" data-intro-fill>
          <?php foreach (template_a_get('home.intro.lines', array()) as $line) : ?>
            <span class="intro__fill-line">
              <span class="intro__fill-txt-base"><?php echo esc_html($line['text']); ?></span>
              <span class="intro__fill-txt-highlight" aria-hidden="true"><?php echo esc_html($line['text']); ?></span>
            </span>
          <?php endforeach; ?>
        </h2>
      </div>
    </section>

    <section id="features" class="section section--features" aria-labelledby="features-title">
      <div class="features__shell">
        <div class="features__head">
          <h2 id="features-title" class="features__title scroll-reveal"><?php echo template_a_text_br('home.features.title'); ?></h2>
        </div>
        <div
          class="features__scroll"
          data-features-scroll
          data-drag-scroll
          tabindex="0"
          aria-label="<?php echo esc_attr(template_a_get('home.features.list_label')); ?>"
        >
          <div class="features__track">
        <?php $feature_images = array('images/feature-bg-01.jpg', 'images/feature-bg-02.jpg', 'images/feature-bg-03.jpg', 'images/feature-bg-04.webp'); ?>
        <?php foreach (template_a_get('home.features.items', array()) as $index => $item) : ?>
          <article class="features__card">
            <figure class="features__card-media">
              <img class="features__card-img" src="<?php echo esc_url(template_a_img_url('home.features.items.' . $index . '.image', isset($feature_images[$index]) ? $feature_images[$index] : $feature_images[0])); ?>" alt="" width="641" height="460" decoding="async">
            </figure>
            <div class="features__card-body">
              <h3 class="features__card-title"><?php echo esc_html($item['title']); ?></h3>
              <p class="features__card-desc"><?php echo esc_html($item['body']); ?></p>
            </div>
          </article>
        <?php endforeach; ?>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="section section--services" aria-labelledby="services-title">
      <div class="section-shell section-shell--gutter services__inner">
        <h2 id="services-title" class="services__title scroll-reveal"><?php echo esc_html(template_a_get('home.services.title')); ?></h2>
        <div class="services__grid">
          <?php foreach (template_a_get('home.services.stats', array()) as $stat) : ?>
            <article class="services__card scroll-reveal">
              <div class="services__card-content">
                <div class="services__stat">
                  <span class="services__stat-value" data-stats-counter data-count-value="<?php echo esc_attr($stat['value']); ?>">0</span>
                  <span class="services__stat-unit<?php echo $stat['unit'] === '+' ? ' services__stat-unit--plus' : ''; ?>"><?php echo esc_html($stat['unit']); ?></span>
                </div>
                <p class="services__stat-label"><?php echo esc_html($stat['label']); ?></p>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section id="reviews" class="section section--reviews" aria-labelledby="reviews-title">
      <div class="section-shell section-shell--gutter">
        <h2 id="reviews-title" class="reviews__title scroll-reveal"><?php echo esc_html(template_a_get('home.reviews.title')); ?></h2>
      </div>
      <?php
      $review_rows = array_chunk(template_a_get('home.reviews.items', array()), 10);
      ?>
      <div class="reviews__marquee">
      <?php
      foreach ($review_rows as $row_index => $reviews) :
      ?>
        <div class="reviews__row reviews__row--<?php echo $row_index === 0 ? 'left' : 'right'; ?>">
          <div class="reviews__track">
            <?php for ($copy = 0; $copy < 2; $copy++) : ?>
              <div class="reviews__group"<?php echo $copy === 0 ? ' role="list" aria-label="' . esc_attr(template_a_get($row_index === 0 ? 'home.reviews.top_label' : 'home.reviews.bottom_label')) . '"' : ' aria-hidden="true"'; ?>>
                <?php foreach ($reviews as $review) : ?>
                  <article class="reviews__card"<?php echo $copy === 0 ? ' role="listitem"' : ''; ?>>
                    <h3 class="reviews__card-title"><?php echo esc_html($review['title']); ?></h3>
                    <p class="reviews__card-body"><?php echo esc_html($review['body']); ?></p>
                    <p class="reviews__card-author"><?php echo esc_html($review['author']); ?></p>
                  </article>
                <?php endforeach; ?>
              </div>
            <?php endfor; ?>
          </div>
        </div>
      <?php endforeach; ?>
      </div>
      <?php if (false) : ?>
      <div class="reviews__marquee">
        <div class="reviews__row reviews__row--left">
          <div class="reviews__track">
            <div class="reviews__group" role="list" aria-label="고객 후기 — 윗줄">
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">복잡했던 사업 내용이 한눈에 정리됐습니다.</h3>
                <p class="reviews__card-body">여러 자료에 흩어져 있던 회사 소개와 사업 영역을 방문자 관점에서 다시 정리해주었습니다. 고객에게 우리 회사를 설명하기가 훨씬 쉬워졌습니다.</p>
                <p class="reviews__card-author">기업 홈페이지 담당자</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">회사 규모와 전문성이 제대로 전달됩니다.</h3>
                <p class="reviews__card-body">기존 홈페이지는 오래된 정보가 많고 사업의 강점이 잘 보이지 않았습니다. 주요 실적과 기술력을 중심으로 개편한 뒤 기업 이미지가 한층 정돈됐습니다.</p>
                <p class="reviews__card-author">제조기업 경영지원팀</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">내부에서도 활용하기 좋은 홈페이지가 됐습니다.</h3>
                <p class="reviews__card-body">고객 안내뿐 아니라 영업 미팅과 제안 과정에서도 홈페이지를 적극적으로 활용하고 있습니다. 필요한 정보를 빠르게 보여줄 수 있어 실무 만족도가 높습니다.</p>
                <p class="reviews__card-author">B2B 기업 영업팀</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">막연했던 요구사항을 명확하게 정리해주었습니다.</h3>
                <p class="reviews__card-body">처음에는 원하는 분위기만 설명했는데 필요한 페이지와 콘텐츠를 단계적으로 정리해주었습니다. 진행 과정이 명확해 의사결정이 편했습니다.</p>
                <p class="reviews__card-author">스타트업 대표</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">페이지가 많아도 일관된 인상이 유지됩니다.</h3>
                <p class="reviews__card-body">사업 분야가 다양해 페이지 구성이 복잡했지만 동일한 디자인 기준으로 정돈됐습니다. 새로운 사업 페이지를 추가할 때도 확장하기 편한 구조입니다.</p>
                <p class="reviews__card-author">전문기업 마케팅팀</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">브랜드의 분위기가 이전보다 분명해졌습니다.</h3>
                <p class="reviews__card-body">제품 이미지만 나열했던 기존 사이트와 달리 브랜드의 철학과 메시지가 자연스럽게 전달됩니다. 고객에게 보여주고 싶었던 인상을 제대로 구현했습니다.</p>
                <p class="reviews__card-author">브랜드 마케팅 담당자</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">감성과 정보의 균형이 좋았습니다.</h3>
                <p class="reviews__card-body">시각적인 분위기는 유지하면서도 제품과 서비스 정보가 쉽게 읽히도록 구성됐습니다. 디자인에 치우치지 않고 실제 사용성을 함께 고려한 점이 좋았습니다.</p>
                <p class="reviews__card-author">라이프스타일 브랜드 대표</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">브랜드 소개부터 구매 연결까지 자연스럽습니다.</h3>
                <p class="reviews__card-body">브랜드 스토리와 제품 라인업, 외부 쇼핑몰 링크가 하나의 흐름으로 이어집니다. 방문자가 어디로 이동해야 하는지 명확해졌습니다.</p>
                <p class="reviews__card-author">식품 브랜드 운영팀</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">콘텐츠가 바뀌어도 디자인이 쉽게 무너지지 않습니다.</h3>
                <p class="reviews__card-body">사진과 원고를 교체해도 전체적인 스타일이 유지되도록 구성돼 있습니다. 시즌별 콘텐츠를 운영하기에도 부담이 적습니다.</p>
                <p class="reviews__card-author">패션 브랜드 콘텐츠팀</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">작은 브랜드도 전문적으로 보일 수 있었습니다.</h3>
                <p class="reviews__card-body">규모가 크지 않아 보여줄 자료가 부족했지만 핵심 제품과 강점을 중심으로 밀도 있게 구성해주었습니다. 브랜드에 대한 신뢰감이 높아졌습니다.</p>
                <p class="reviews__card-author">소규모 브랜드 대표</p>
              </article>
            </div>
            <div class="reviews__group" aria-hidden="true">
              <article class="reviews__card">
                <h3 class="reviews__card-title">복잡했던 사업 내용이 한눈에 정리됐습니다.</h3>
                <p class="reviews__card-body">여러 자료에 흩어져 있던 회사 소개와 사업 영역을 방문자 관점에서 다시 정리해주었습니다. 고객에게 우리 회사를 설명하기가 훨씬 쉬워졌습니다.</p>
                <p class="reviews__card-author">기업 홈페이지 담당자</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">회사 규모와 전문성이 제대로 전달됩니다.</h3>
                <p class="reviews__card-body">기존 홈페이지는 오래된 정보가 많고 사업의 강점이 잘 보이지 않았습니다. 주요 실적과 기술력을 중심으로 개편한 뒤 기업 이미지가 한층 정돈됐습니다.</p>
                <p class="reviews__card-author">제조기업 경영지원팀</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">내부에서도 활용하기 좋은 홈페이지가 됐습니다.</h3>
                <p class="reviews__card-body">고객 안내뿐 아니라 영업 미팅과 제안 과정에서도 홈페이지를 적극적으로 활용하고 있습니다. 필요한 정보를 빠르게 보여줄 수 있어 실무 만족도가 높습니다.</p>
                <p class="reviews__card-author">B2B 기업 영업팀</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">막연했던 요구사항을 명확하게 정리해주었습니다.</h3>
                <p class="reviews__card-body">처음에는 원하는 분위기만 설명했는데 필요한 페이지와 콘텐츠를 단계적으로 정리해주었습니다. 진행 과정이 명확해 의사결정이 편했습니다.</p>
                <p class="reviews__card-author">스타트업 대표</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">페이지가 많아도 일관된 인상이 유지됩니다.</h3>
                <p class="reviews__card-body">사업 분야가 다양해 페이지 구성이 복잡했지만 동일한 디자인 기준으로 정돈됐습니다. 새로운 사업 페이지를 추가할 때도 확장하기 편한 구조입니다.</p>
                <p class="reviews__card-author">전문기업 마케팅팀</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">브랜드의 분위기가 이전보다 분명해졌습니다.</h3>
                <p class="reviews__card-body">제품 이미지만 나열했던 기존 사이트와 달리 브랜드의 철학과 메시지가 자연스럽게 전달됩니다. 고객에게 보여주고 싶었던 인상을 제대로 구현했습니다.</p>
                <p class="reviews__card-author">브랜드 마케팅 담당자</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">감성과 정보의 균형이 좋았습니다.</h3>
                <p class="reviews__card-body">시각적인 분위기는 유지하면서도 제품과 서비스 정보가 쉽게 읽히도록 구성됐습니다. 디자인에 치우치지 않고 실제 사용성을 함께 고려한 점이 좋았습니다.</p>
                <p class="reviews__card-author">라이프스타일 브랜드 대표</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">브랜드 소개부터 구매 연결까지 자연스럽습니다.</h3>
                <p class="reviews__card-body">브랜드 스토리와 제품 라인업, 외부 쇼핑몰 링크가 하나의 흐름으로 이어집니다. 방문자가 어디로 이동해야 하는지 명확해졌습니다.</p>
                <p class="reviews__card-author">식품 브랜드 운영팀</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">콘텐츠가 바뀌어도 디자인이 쉽게 무너지지 않습니다.</h3>
                <p class="reviews__card-body">사진과 원고를 교체해도 전체적인 스타일이 유지되도록 구성돼 있습니다. 시즌별 콘텐츠를 운영하기에도 부담이 적습니다.</p>
                <p class="reviews__card-author">패션 브랜드 콘텐츠팀</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">작은 브랜드도 전문적으로 보일 수 있었습니다.</h3>
                <p class="reviews__card-body">규모가 크지 않아 보여줄 자료가 부족했지만 핵심 제품과 강점을 중심으로 밀도 있게 구성해주었습니다. 브랜드에 대한 신뢰감이 높아졌습니다.</p>
                <p class="reviews__card-author">소규모 브랜드 대표</p>
              </article>
            </div>
          </div>
        </div>
        <div class="reviews__row reviews__row--right">
          <div class="reviews__track">
            <div class="reviews__group" role="list" aria-label="고객 후기 — 아랫줄">
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">환자가 궁금해하는 정보가 먼저 보입니다.</h3>
                <p class="reviews__card-body">진료과목, 의료진, 진료시간과 예약 방법을 쉽게 찾을 수 있도록 정리됐습니다. 병원 입장보다 환자의 탐색 흐름을 고려한 구성이 만족스럽습니다.</p>
                <p class="reviews__card-author">의료기관 운영팀</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">과한 광고 느낌 없이 신뢰감을 전달합니다.</h3>
                <p class="reviews__card-body">화려한 표현보다 의료진과 진료 과정, 공간 정보를 차분하게 보여줍니다. 병원이 추구하는 전문적인 분위기와 잘 맞았습니다.</p>
                <p class="reviews__card-author">클리닉 원장</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">상담과 예약으로 이동하는 과정이 편리해졌습니다.</h3>
                <p class="reviews__card-body">모바일에서 전화, 상담, 예약 버튼을 쉽게 찾을 수 있어 문의 과정이 단순해졌습니다. 필요한 정보와 행동 버튼의 위치가 명확합니다.</p>
                <p class="reviews__card-author">병원 상담실 담당자</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">의료진과 진료 일정 관리가 편해졌습니다.</h3>
                <p class="reviews__card-body">관리자에서 의료진 정보와 진료시간을 직접 수정할 수 있어 변경사항을 빠르게 반영하고 있습니다. 운영 측면에서도 실용적인 홈페이지입니다.</p>
                <p class="reviews__card-author">의원 행정팀</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">전문 서비스의 내용을 쉽게 전달할 수 있게 됐습니다.</h3>
                <p class="reviews__card-body">고객이 어려워하던 서비스 내용을 질문과 답변 중심으로 정리해주었습니다. 상담 전에 기본 내용을 이해하고 문의하는 고객이 늘었습니다.</p>
                <p class="reviews__card-author">전문 컨설팅 기업</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">상품을 찾고 비교하는 과정이 훨씬 간결해졌습니다.</h3>
                <p class="reviews__card-body">카테고리와 상품 정보를 다시 정리해 고객이 원하는 제품에 빠르게 도달할 수 있습니다. 모바일에서도 탐색이 편리하게 개선됐습니다.</p>
                <p class="reviews__card-author">온라인 쇼핑몰 운영자</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">사용자 화면과 관리자 화면을 함께 고려했습니다.</h3>
                <p class="reviews__card-body">고객이 사용하는 화면뿐 아니라 내부에서 콘텐츠를 등록하고 관리하는 과정까지 설계됐습니다. 반복적인 운영 업무가 이전보다 단순해졌습니다.</p>
                <p class="reviews__card-author">플랫폼 서비스 운영팀</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">필요한 기능을 단계적으로 확장할 수 있습니다.</h3>
                <p class="reviews__card-body">초기에는 핵심 기능으로 시작하고 이후 회원, 예약, 게시판 기능을 추가할 수 있도록 구성했습니다. 예산과 일정에 맞춰 진행할 수 있어 좋았습니다.</p>
                <p class="reviews__card-author">서비스 스타트업 대표</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">수업과 상담 정보가 보기 쉽게 정리됐습니다.</h3>
                <p class="reviews__card-body">프로그램이 많아 설명이 복잡했는데 대상별 과정과 상담 절차가 명확하게 구분됐습니다. 학부모와 수강생 문의에도 활용하기 편합니다.</p>
                <p class="reviews__card-author">교육기관 운영자</p>
              </article>
              <article class="reviews__card" role="listitem">
                <h3 class="reviews__card-title">오픈 이후에도 직접 운영할 수 있어 편합니다.</h3>
                <p class="reviews__card-body">공지사항과 이미지, 주요 원고를 관리자에서 수정할 수 있습니다. 간단한 변경을 외부에 요청하지 않아도 돼 운영 부담이 줄었습니다.</p>
                <p class="reviews__card-author">전문 서비스업 대표</p>
              </article>
            </div>
            <div class="reviews__group" aria-hidden="true">
              <article class="reviews__card">
                <h3 class="reviews__card-title">환자가 궁금해하는 정보가 먼저 보입니다.</h3>
                <p class="reviews__card-body">진료과목, 의료진, 진료시간과 예약 방법을 쉽게 찾을 수 있도록 정리됐습니다. 병원 입장보다 환자의 탐색 흐름을 고려한 구성이 만족스럽습니다.</p>
                <p class="reviews__card-author">의료기관 운영팀</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">과한 광고 느낌 없이 신뢰감을 전달합니다.</h3>
                <p class="reviews__card-body">화려한 표현보다 의료진과 진료 과정, 공간 정보를 차분하게 보여줍니다. 병원이 추구하는 전문적인 분위기와 잘 맞았습니다.</p>
                <p class="reviews__card-author">클리닉 원장</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">상담과 예약으로 이동하는 과정이 편리해졌습니다.</h3>
                <p class="reviews__card-body">모바일에서 전화, 상담, 예약 버튼을 쉽게 찾을 수 있어 문의 과정이 단순해졌습니다. 필요한 정보와 행동 버튼의 위치가 명확합니다.</p>
                <p class="reviews__card-author">병원 상담실 담당자</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">의료진과 진료 일정 관리가 편해졌습니다.</h3>
                <p class="reviews__card-body">관리자에서 의료진 정보와 진료시간을 직접 수정할 수 있어 변경사항을 빠르게 반영하고 있습니다. 운영 측면에서도 실용적인 홈페이지입니다.</p>
                <p class="reviews__card-author">의원 행정팀</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">전문 서비스의 내용을 쉽게 전달할 수 있게 됐습니다.</h3>
                <p class="reviews__card-body">고객이 어려워하던 서비스 내용을 질문과 답변 중심으로 정리해주었습니다. 상담 전에 기본 내용을 이해하고 문의하는 고객이 늘었습니다.</p>
                <p class="reviews__card-author">전문 컨설팅 기업</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">상품을 찾고 비교하는 과정이 훨씬 간결해졌습니다.</h3>
                <p class="reviews__card-body">카테고리와 상품 정보를 다시 정리해 고객이 원하는 제품에 빠르게 도달할 수 있습니다. 모바일에서도 탐색이 편리하게 개선됐습니다.</p>
                <p class="reviews__card-author">온라인 쇼핑몰 운영자</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">사용자 화면과 관리자 화면을 함께 고려했습니다.</h3>
                <p class="reviews__card-body">고객이 사용하는 화면뿐 아니라 내부에서 콘텐츠를 등록하고 관리하는 과정까지 설계됐습니다. 반복적인 운영 업무가 이전보다 단순해졌습니다.</p>
                <p class="reviews__card-author">플랫폼 서비스 운영팀</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">필요한 기능을 단계적으로 확장할 수 있습니다.</h3>
                <p class="reviews__card-body">초기에는 핵심 기능으로 시작하고 이후 회원, 예약, 게시판 기능을 추가할 수 있도록 구성했습니다. 예산과 일정에 맞춰 진행할 수 있어 좋았습니다.</p>
                <p class="reviews__card-author">서비스 스타트업 대표</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">수업과 상담 정보가 보기 쉽게 정리됐습니다.</h3>
                <p class="reviews__card-body">프로그램이 많아 설명이 복잡했는데 대상별 과정과 상담 절차가 명확하게 구분됐습니다. 학부모와 수강생 문의에도 활용하기 편합니다.</p>
                <p class="reviews__card-author">교육기관 운영자</p>
              </article>
              <article class="reviews__card">
                <h3 class="reviews__card-title">오픈 이후에도 직접 운영할 수 있어 편합니다.</h3>
                <p class="reviews__card-body">공지사항과 이미지, 주요 원고를 관리자에서 수정할 수 있습니다. 간단한 변경을 외부에 요청하지 않아도 돼 운영 부담이 줄었습니다.</p>
                <p class="reviews__card-author">전문 서비스업 대표</p>
              </article>
            </div>
          </div>
        </div>
      </div>
      <?php endif; ?>
    </section>

    <section id="faq" class="section section--faq" aria-labelledby="faq-title">
      <div class="section-shell section-shell--gutter">
        <h2 id="faq-title" class="faq__title scroll-reveal"><?php echo esc_html(template_a_get('home.faq.title')); ?></h2>
        <div class="faq__list">
          <?php foreach (template_a_get('home.faq.items', array()) as $index => $item) : ?>
            <details class="faq__item scroll-reveal"<?php echo $index === 0 ? ' open' : ''; ?>>
              <summary class="faq__q"><?php echo esc_html($item['question']); ?></summary>
              <div class="faq__a"><p><?php echo esc_html($item['answer']); ?></p></div>
            </details>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <section id="cta" class="section section--cta" aria-labelledby="cta-title">
      <div class="cta__kv">
        <img
          class="cta__bg"
          src="<?php echo esc_url(template_a_img_url('home.cta.image', 'images/cta-bg.jpg')); ?>"
          alt=""
          width="1920"
          height="600"
          decoding="async"
        >
        <div class="cta__overlay" aria-hidden="true"></div>
        <div class="section-shell section-shell--gutter cta__inner">
          <h2 id="cta-title" class="cta__title scroll-reveal"><?php echo template_a_text_br('home.cta.title'); ?></h2>
          <a class="cta__btn btn-slide-hover scroll-reveal" href="<?php echo esc_url(home_url('/contact/')); ?>">
            <span class="btn__label">
              <span class="btn__track">
                <span class="btn__text"><?php echo esc_html(template_a_get('home.cta.button')); ?></span>
                <span class="btn__text" aria-hidden="true"><?php echo esc_html(template_a_get('home.cta.button')); ?></span>
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>

    <section id="insight" class="section section--insight" aria-labelledby="insight-title">
      <div class="section-shell section-shell--gutter insight__inner">
        <div class="insight__body">
          <h2 id="insight-title" class="insight__title scroll-reveal"><?php echo esc_html(template_a_get('home.insight.title')); ?></h2>
          <ul class="insight__list">
<?php
$template_a_notices = new WP_Query(
  array(
    'post_type' => 'notice',
    'posts_per_page' => 3,
    'orderby' => 'date',
    'order' => 'DESC',
    'post_status' => 'publish',
  )
);
if ($template_a_notices->have_posts()) :
  while ($template_a_notices->have_posts()) :
    $template_a_notices->the_post();
?>
  <li class="insight__item scroll-reveal">
    <a class="insight__link" href="<?php the_permalink(); ?>">
      <span class="insight__link-main">
        <span class="insight__tag"><?php echo esc_html(template_a_get('home.insight.tag')); ?></span>
        <span class="insight__link-title"><?php the_title(); ?></span>
      </span>
      <time class="insight__date" datetime="<?php echo esc_attr(get_the_date('Y-m-d')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time>
    </a>
  </li>
<?php
  endwhile;
else :
?>
  <li class="insight__item">
    <span class="insight__link">
      <span class="insight__link-main">
        <span class="insight__tag"><?php echo esc_html(template_a_get('home.insight.tag')); ?></span>
        <span class="insight__link-title"><?php echo esc_html(template_a_get('home.insight.empty')); ?></span>
      </span>
    </span>
  </li>
<?php
endif;
wp_reset_postdata();
?>
</ul>
        </div>
        <p class="insight__more">
          <a class="btn-pill btn-pill--accent btn-slide-hover scroll-reveal" href="<?php echo esc_url(get_post_type_archive_link('notice')); ?>">
            <span class="btn__label">
              <span class="btn__track">
                <span class="btn__text"><?php echo esc_html(template_a_get('home.insight.more')); ?></span>
                <span class="btn__text" aria-hidden="true"><?php echo esc_html(template_a_get('home.insight.more')); ?></span>
              </span>
            </span>
          </a>
        </p>
      </div>
    </section>
  </main>