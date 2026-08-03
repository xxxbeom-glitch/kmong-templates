<?php
/**
 * Home — Media Hub (board list, no thumbnails).
 * Layout: section head · list rows.
 */

$media_raw = array(
  array(
    'category' => __('공지', 'rathontech-redesign-01'),
    'date'     => '2026.08.01',
    'title'    => __('라톤테크 공식 홈페이지 개편 안내', 'rathontech-redesign-01'),
  ),
  array(
    'category' => __('공지', 'rathontech-redesign-01'),
    'date'     => '2026.07.24',
    'title'    => __('고객 문의 및 기술지원 접수 방법 안내', 'rathontech-redesign-01'),
  ),
  array(
    'category' => __('제품소식', 'rathontech-redesign-01'),
    'date'     => '2026.07.15',
    'title'    => __('Rathon-IAM 주요 기능 업데이트 안내', 'rathontech-redesign-01'),
  ),
  array(
    'category' => __('기술소식', 'rathontech-redesign-01'),
    'date'     => '2026.07.03',
    'title'    => __('통합 계정관리로 시작하는 접근 보안 체계', 'rathontech-redesign-01'),
  ),
  array(
    'category' => __('회사소식', 'rathontech-redesign-01'),
    'date'     => '2026.06.19',
    'title'    => __('라톤테크 정보보호 기술 연구개발 현황', 'rathontech-redesign-01'),
  ),
  array(
    'category' => __('제품소식', 'rathontech-redesign-01'),
    'date'     => '2026.06.05',
    'title'    => __('기업 환경에 맞는 인증·권한관리 구성 안내', 'rathontech-redesign-01'),
  ),
  array(
    'category' => __('기술소식', 'rathontech-redesign-01'),
    'date'     => '2026.05.21',
    'title'    => __('복잡한 계정과 접근 권한을 통합 관리하는 방법', 'rathontech-redesign-01'),
  ),
  array(
    'category' => __('공지', 'rathontech-redesign-01'),
    'date'     => '2026.05.08',
    'title'    => __('개인정보 처리방침 개정 안내', 'rathontech-redesign-01'),
  ),
  array(
    'category' => __('회사소식', 'rathontech-redesign-01'),
    'date'     => '2026.04.23',
    'title'    => __('라톤테크 보안 솔루션 소개 자료 업데이트', 'rathontech-redesign-01'),
  ),
  array(
    'category' => __('기술소식', 'rathontech-redesign-01'),
    'date'     => '2026.04.09',
    'title'    => __('제로트러스트 환경에서 계정관리가 중요한 이유', 'rathontech-redesign-01'),
  ),
);

$media_items = array();
foreach ($media_raw as $row) {
  $row['href']   = rathon_url('news');
  $media_items[] = $row;
}

/* Home section shows latest 5 rows */
$media_items = array_slice($media_items, 0, 5);
?>
<section class="home-media" aria-labelledby="home-media-title">
  <div class="u-container">
    <header class="home-media__head" data-reveal>
      <h2 id="home-media-title" class="home-media__title">
        <?php echo esc_html__('미디어허브', 'rathontech-redesign-01'); ?>
      </h2>
      <p class="home-media__lead">
        <?php echo esc_html__('기업의 최신 소식과 다양한 콘텐츠를 한 곳에서 만나보세요.', 'rathontech-redesign-01'); ?>
      </p>
    </header>

    <ul class="home-media__list">
      <?php foreach ($media_items as $i => $item) : ?>
        <li class="home-media__item" data-reveal style="--reveal-delay: <?php echo esc_attr(number_format(0.06 * ($i + 1), 2, '.', '')); ?>s">
          <a class="home-media__row" href="<?php echo esc_url($item['href']); ?>">
            <span class="home-media__cat"><?php echo esc_html($item['category']); ?></span>
            <span class="home-media__row-title"><?php echo esc_html($item['title']); ?></span>
            <time class="home-media__date" datetime="<?php echo esc_attr(str_replace('.', '-', $item['date'])); ?>">
              <?php echo esc_html($item['date']); ?>
            </time>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>
<?php
unset($media_raw, $media_items, $item, $row, $i);
