<?php
/**
 * Home — Media Hub (board) section.
 * Layout: left title/tabs + right 2×2 card grid.
 */

$media_items = array(
  array(
    'filter'   => 'news',
    'category' => __('뉴스', 'rathontech-redesign-01'),
    'date'     => '2025.07.20',
    'title'    => __('라톤테크, Zero Trust 기반 통합 인증 플랫폼 고도화 추진', 'rathontech-redesign-01'),
    'href'     => rathon_url('news'),
    'image'    => rathon_asset('images/thumb/anastasiia-rozumna-hUEs9AFpdQg-unsplash.jpg'),
  ),
  array(
    'filter'   => 'news',
    'category' => __('뉴스', 'rathontech-redesign-01'),
    'date'     => '2025.07.20',
    'title'    => __('공공·금융 고객사 대상 IAM·SSO 도입 사례 확대', 'rathontech-redesign-01'),
    'href'     => rathon_url('news'),
    'image'    => rathon_asset('images/thumb/d-koi-_3yUyAOg_ZY-unsplash.jpg'),
  ),
  array(
    'filter'   => 'social',
    'category' => __('인스타그램', 'rathontech-redesign-01'),
    'date'     => '2025.07.20',
    'title'    => __('보안 인식 캠페인 — 계정과 권한, 일상에서 지키는 방법', 'rathontech-redesign-01'),
    'href'     => rathon_url('news'),
    'image'    => rathon_asset('images/thumb/soheb-zaidi-7Czm0mjIaWs-unsplash.jpg'),
  ),
  array(
    'filter'   => 'news',
    'category' => __('뉴스', 'rathontech-redesign-01'),
    'date'     => '2025.07.18',
    'title'    => __('Rathon-IAM, 다중인증·권한 관리 기능 업데이트 공개', 'rathontech-redesign-01'),
    'href'     => rathon_url('news'),
    'image'    => rathon_asset('images/thumb/shubham-dhage-bhiQQm1urPI-unsplash.jpg'),
  ),
);

$tabs = array(
  array('id' => 'all', 'label' => __('전체', 'rathontech-redesign-01')),
  array('id' => 'news', 'label' => __('뉴스', 'rathontech-redesign-01')),
  array('id' => 'social', 'label' => __('소셜미디어', 'rathontech-redesign-01')),
);
?>
<section class="home-media" aria-labelledby="home-media-title" data-media>
  <div class="u-container">
    <div class="home-media__layout">
      <div class="home-media__aside">
        <header class="home-media__head">
          <h2 id="home-media-title" class="home-media__title">
            <?php echo esc_html__('미디어허브', 'rathontech-redesign-01'); ?>
          </h2>
          <p class="home-media__lead">
            <?php echo esc_html__('기업의 최신 소식과 다양한 콘텐츠를 한 곳에서 만나보세요.', 'rathontech-redesign-01'); ?>
          </p>
        </header>

        <nav class="home-media__tabs" aria-label="<?php echo esc_attr__('미디어 카테고리', 'rathontech-redesign-01'); ?>">
          <ul class="home-media__tab-list" role="tablist">
            <?php foreach ($tabs as $i => $tab) : ?>
              <li role="presentation">
                <button
                  type="button"
                  class="home-media__tab<?php echo $i === 0 ? ' is-active' : ''; ?>"
                  role="tab"
                  id="home-media-tab-<?php echo esc_attr($tab['id']); ?>"
                  aria-selected="<?php echo $i === 0 ? 'true' : 'false'; ?>"
                  data-media-filter="<?php echo esc_attr($tab['id']); ?>"
                >
                  <?php echo esc_html($tab['label']); ?>
                </button>
              </li>
            <?php endforeach; ?>
          </ul>
        </nav>
      </div>

      <ul class="home-media__grid" data-media-grid>
        <?php foreach ($media_items as $item) : ?>
          <li class="home-media__item" data-media-cat="<?php echo esc_attr($item['filter']); ?>">
            <a class="home-media__card" href="<?php echo esc_url($item['href']); ?>">
              <span
                class="home-media__thumb"
                style="background-image: url('<?php echo esc_url($item['image']); ?>');"
                aria-hidden="true"
              ></span>
              <span class="home-media__meta">
                <span class="home-media__cat"><?php echo esc_html($item['category']); ?></span>
                <span class="home-media__sep" aria-hidden="true">|</span>
                <time class="home-media__date" datetime="<?php echo esc_attr(str_replace('.', '-', $item['date'])); ?>">
                  <?php echo esc_html($item['date']); ?>
                </time>
              </span>
              <span class="home-media__card-title"><?php echo esc_html($item['title']); ?></span>
            </a>
          </li>
        <?php endforeach; ?>
      </ul>
    </div>
  </div>
</section>
<?php
unset($media_items, $tabs, $item, $tab, $i);
