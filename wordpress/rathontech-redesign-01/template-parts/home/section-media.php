<?php
/**
 * Home — Media Hub (board) section.
 * Layout: left title/tabs + right card grid.
 */

$media_thumbs = array(
  rathon_asset('images/thumb/anastasiia-rozumna-hUEs9AFpdQg-unsplash.jpg'),
  rathon_asset('images/thumb/d-koi-_3yUyAOg_ZY-unsplash.jpg'),
  rathon_asset('images/thumb/soheb-zaidi-7Czm0mjIaWs-unsplash.jpg'),
  rathon_asset('images/thumb/shubham-dhage-bhiQQm1urPI-unsplash.jpg'),
  rathon_asset('images/thumb/dynamic-wang-KZuZAaEojq4-unsplash.jpg'),
  rathon_asset('images/thumb/ela-de-pure-h7lfy7HoIE8-unsplash.jpg'),
  rathon_asset('images/thumb/shubham-dhage-8HaKRwazMrQ-unsplash.jpg'),
);

$media_raw = array(
  array(
    'filter'   => 'notice',
    'category' => __('공지', 'rathontech-redesign-01'),
    'date'     => '2026.08.01',
    'title'    => __('라톤테크 공식 홈페이지 개편 안내', 'rathontech-redesign-01'),
  ),
  array(
    'filter'   => 'notice',
    'category' => __('공지', 'rathontech-redesign-01'),
    'date'     => '2026.07.24',
    'title'    => __('고객 문의 및 기술지원 접수 방법 안내', 'rathontech-redesign-01'),
  ),
  array(
    'filter'   => 'product',
    'category' => __('제품소식', 'rathontech-redesign-01'),
    'date'     => '2026.07.15',
    'title'    => __('Rathon-IAM 주요 기능 업데이트 안내', 'rathontech-redesign-01'),
  ),
  array(
    'filter'   => 'tech',
    'category' => __('기술소식', 'rathontech-redesign-01'),
    'date'     => '2026.07.03',
    'title'    => __('통합 계정관리로 시작하는 접근 보안 체계', 'rathontech-redesign-01'),
  ),
  array(
    'filter'   => 'company',
    'category' => __('회사소식', 'rathontech-redesign-01'),
    'date'     => '2026.06.19',
    'title'    => __('라톤테크 정보보호 기술 연구개발 현황', 'rathontech-redesign-01'),
  ),
  array(
    'filter'   => 'product',
    'category' => __('제품소식', 'rathontech-redesign-01'),
    'date'     => '2026.06.05',
    'title'    => __('기업 환경에 맞는 인증·권한관리 구성 안내', 'rathontech-redesign-01'),
  ),
  array(
    'filter'   => 'tech',
    'category' => __('기술소식', 'rathontech-redesign-01'),
    'date'     => '2026.05.21',
    'title'    => __('복잡한 계정과 접근 권한을 통합 관리하는 방법', 'rathontech-redesign-01'),
  ),
  array(
    'filter'   => 'notice',
    'category' => __('공지', 'rathontech-redesign-01'),
    'date'     => '2026.05.08',
    'title'    => __('개인정보 처리방침 개정 안내', 'rathontech-redesign-01'),
  ),
  array(
    'filter'   => 'company',
    'category' => __('회사소식', 'rathontech-redesign-01'),
    'date'     => '2026.04.23',
    'title'    => __('라톤테크 보안 솔루션 소개 자료 업데이트', 'rathontech-redesign-01'),
  ),
  array(
    'filter'   => 'tech',
    'category' => __('기술소식', 'rathontech-redesign-01'),
    'date'     => '2026.04.09',
    'title'    => __('제로트러스트 환경에서 계정관리가 중요한 이유', 'rathontech-redesign-01'),
  ),
);

$thumb_count = count($media_thumbs);
$media_items = array();
foreach ($media_raw as $i => $row) {
  $row['href']  = rathon_url('news');
  $row['image'] = $media_thumbs[ $i % $thumb_count ];
  $media_items[] = $row;
}

$tabs = array(
  array('id' => 'all', 'label' => __('전체', 'rathontech-redesign-01')),
  array('id' => 'notice', 'label' => __('공지', 'rathontech-redesign-01')),
  array('id' => 'product', 'label' => __('제품소식', 'rathontech-redesign-01')),
  array('id' => 'tech', 'label' => __('기술소식', 'rathontech-redesign-01')),
  array('id' => 'company', 'label' => __('회사소식', 'rathontech-redesign-01')),
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
unset($media_thumbs, $media_raw, $media_items, $tabs, $item, $tab, $i, $row, $thumb_count);
