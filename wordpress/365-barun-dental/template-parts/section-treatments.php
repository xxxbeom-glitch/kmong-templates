<?php
/**
 * Treatments — Figma 453:404
 */
$featured_img = barun_dental_asset_uri('treatments-featured');
$implant_img  = barun_dental_asset_uri('treatments-implant');
?>
<section class="section-treatments" aria-labelledby="treatments-title">
  <div class="section-shell section-shell--gutter">
    <div class="section-treatments__inner">
      <header class="section-treatments__header">
        <p class="section-treatments__label scroll-reveal">TREATMENT</p>
        <h2 id="treatments-title" class="section-treatments__title">
          <span class="section-treatments__title-line scroll-reveal">한 번의 치료보다</span>
          <span class="section-treatments__title-line scroll-reveal">오래가는 구강 건강을 생각합니다.</span>
        </h2>
      </header>

      <div class="section-treatments__content">
        <article class="section-treatments__featured scroll-reveal">
          <?php if ($featured_img) : ?>
            <img
              class="section-treatments__featured-bg"
              src="<?php echo esc_url($featured_img); ?>"
              alt=""
              width="620"
              height="505"
              decoding="async"
            />
          <?php endif; ?>
          <div class="section-treatments__featured-body">
            <div class="section-treatments__featured-head">
              <p class="section-treatments__featured-index">01</p>
              <h3 class="section-treatments__featured-title">자연치아 보존 진료</h3>
            </div>
            <div class="section-treatments__featured-desc">
              <p>가능한 자연치아를 오래 사용할 수 있도록</p>
              <p>정밀한 검사와 단계적인 치료를 진행합니다.</p>
            </div>
          </div>
        </article>

        <div class="section-treatments__aside">
          <div class="section-treatments__cards-row">
            <figure class="section-treatments__media-card scroll-reveal">
              <?php if ($implant_img) : ?>
                <img
                  class="section-treatments__media-img"
                  src="<?php echo esc_url($implant_img); ?>"
                  alt=""
                  width="400"
                  height="276"
                  decoding="async"
                />
              <?php endif; ?>
              <figcaption class="section-treatments__media-caption">
                <p class="section-treatments__media-eyebrow">ADVANCED CARE</p>
                <p class="section-treatments__media-title">임플란트</p>
              </figcaption>
            </figure>

            <article class="section-treatments__info-card scroll-reveal">
              <p class="section-treatments__info-index">02</p>
              <div class="section-treatments__info-body">
                <h3 class="section-treatments__info-title">잇몸·예방관리</h3>
                <div class="section-treatments__info-desc">
                  <p>정기검진과 스케일링 중심으로</p>
                  <p>치료보다 예방을 우선합니다.</p>
                </div>
              </div>
            </article>
          </div>

          <div class="section-treatments__matrix scroll-reveal" role="list">
            <div class="section-treatments__matrix-row">
              <article class="section-treatments__matrix-item" role="listitem">
                <p class="section-treatments__matrix-index">03</p>
                <div class="section-treatments__matrix-copy">
                  <h3 class="section-treatments__matrix-title">충치·신경치료</h3>
                  <p class="section-treatments__matrix-text">자연치아 보존을 우선하는 기본 진료</p>
                </div>
              </article>
              <span class="section-treatments__matrix-vrule" aria-hidden="true"></span>
              <article class="section-treatments__matrix-item" role="listitem">
                <p class="section-treatments__matrix-index">04</p>
                <div class="section-treatments__matrix-copy">
                  <h3 class="section-treatments__matrix-title">보철·심미치료</h3>
                  <p class="section-treatments__matrix-text">기능과 자연스러운 형태를 함께 고려</p>
                </div>
              </article>
            </div>

            <div class="section-treatments__matrix-hrules" aria-hidden="true">
              <span class="section-treatments__matrix-hrule section-treatments__matrix-hrule--left"></span>
              <span class="section-treatments__matrix-hrule-spacer"></span>
              <span class="section-treatments__matrix-hrule section-treatments__matrix-hrule--right"></span>
            </div>

            <div class="section-treatments__matrix-row">
              <article class="section-treatments__matrix-item" role="listitem">
                <p class="section-treatments__matrix-index">05</p>
                <div class="section-treatments__matrix-copy">
                  <h3 class="section-treatments__matrix-title">소아·청소년 진료</h3>
                  <p class="section-treatments__matrix-text">성장 단계에 맞춘 검진과 예방</p>
                </div>
              </article>
              <span class="section-treatments__matrix-vrule" aria-hidden="true"></span>
              <article class="section-treatments__matrix-item" role="listitem">
                <p class="section-treatments__matrix-index">06</p>
                <div class="section-treatments__matrix-copy">
                  <h3 class="section-treatments__matrix-title">턱관절 진료</h3>
                  <p class="section-treatments__matrix-text">통증과 생활 습관을 함께 확인</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
