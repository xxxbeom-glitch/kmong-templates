<?php
/**
 * Title: Home Features
 * slug: template-a-blocks/home-features
 * Categories: featured
 */
$img1 = esc_url(get_theme_file_uri('assets/images/feature-bg-01.jpg'));
$img2 = esc_url(get_theme_file_uri('assets/images/feature-bg-02.jpg'));
$img3 = esc_url(get_theme_file_uri('assets/images/feature-bg-03.jpg'));
$img4 = esc_url(get_theme_file_uri('assets/images/feature-bg-04.webp'));
?>
<!-- wp:html -->
<section id="features" class="section section--features" aria-labelledby="features-title">
  <div class="features__shell">
    <div class="features__head">
      <h2 id="features-title" class="features__title">필요한 정보가 자연스럽게 읽히고,<br>문의로 이어지는 흐름을 설계합니다.</h2>
    </div>
    <div class="features__scroll" data-features-scroll data-drag-scroll tabindex="0" aria-label="특징 카드 목록">
      <div class="features__track">
        <article class="features__card">
          <figure class="features__card-media">
            <img class="features__card-img" src="<?php echo $img1; ?>" alt="" width="641" height="460" decoding="async">
          </figure>
          <div class="features__card-body">
            <h3 class="features__card-title">첫 화면에서 전달되는 명확한 인상</h3>
            <p class="features__card-desc">방문자가 처음 마주하는 화면에서 브랜드의 방향과 핵심 메시지를 분명하게 전달합니다.</p>
          </div>
        </article>
        <article class="features__card">
          <figure class="features__card-media">
            <img class="features__card-img" src="<?php echo $img2; ?>" alt="" width="641" height="460" decoding="async">
          </figure>
          <div class="features__card-body">
            <h3 class="features__card-title">목적에 맞게 확장되는 섹션 구조</h3>
            <p class="features__card-desc">기업, 브랜드, 병원, 전문 서비스 등 업종별로 필요한 콘텐츠를 유연하게 구성합니다.</p>
          </div>
        </article>
        <article class="features__card">
          <figure class="features__card-media">
            <img class="features__card-img" src="<?php echo $img3; ?>" alt="" width="641" height="460" decoding="async">
          </figure>
          <div class="features__card-body">
            <h3 class="features__card-title">문의까지 이어지는 사용자 동선</h3>
            <p class="features__card-desc">소개와 강점, 사례, FAQ, 문의 영역을 자연스럽게 연결해 다음 행동을 쉽게 만듭니다.</p>
          </div>
        </article>
        <article class="features__card">
          <figure class="features__card-media">
            <img class="features__card-img" src="<?php echo $img4; ?>" alt="" width="641" height="460" decoding="async">
          </figure>
          <div class="features__card-body">
            <h3 class="features__card-title">운영과 확장을 고려한 구축 방식</h3>
            <p class="features__card-desc">콘텐츠 수정과 페이지 추가, 기능 확장까지 고려해 지속적으로 활용할 수 있는 구조를 만듭니다.</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>
<!-- /wp:html -->
