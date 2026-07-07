<?php
/**
 * List board — Figma 504:136
 */
$posts = barun_dental_consultation_posts();
$categories = barun_dental_consultation_categories();
$list_url = barun_dental_consultation_url('list');
$detail_url = barun_dental_consultation_url('detail');
$write_url = barun_dental_consultation_url('write');
?>
<section class="section-consult-list" aria-label="온라인 상담 목록">
  <div class="section-shell section-shell--gutter">
    <div class="section-consult-list__filters" role="tablist" aria-label="상담 분야 필터">
      <?php foreach ($categories as $index => $category) : ?>
        <button
          type="button"
          class="section-consult-list__filter<?php echo $index === 0 ? ' is-active' : ''; ?>"
          role="tab"
          aria-selected="<?php echo $index === 0 ? 'true' : 'false'; ?>"
        ><?php echo esc_html($category); ?></button>
      <?php endforeach; ?>
    </div>

    <div class="section-consult-list__board">
      <div class="section-consult-list__head" role="row">
        <span class="section-consult-list__cell section-consult-list__cell--num" role="columnheader">번호</span>
        <span class="section-consult-list__cell section-consult-list__cell--category" role="columnheader">상담분야</span>
        <span class="section-consult-list__cell section-consult-list__cell--title" role="columnheader">제목</span>
        <span class="section-consult-list__cell section-consult-list__cell--author" role="columnheader">작성자</span>
        <span class="section-consult-list__cell section-consult-list__cell--date" role="columnheader">작성일</span>
        <span class="section-consult-list__cell section-consult-list__cell--status" role="columnheader">답변상태</span>
      </div>

      <?php foreach ($posts as $post) : ?>
        <a
          href="<?php echo esc_url($detail_url); ?>"
          class="section-consult-list__row"
          role="row"
        >
          <span class="section-consult-list__cell section-consult-list__cell--num" role="cell">
            <?php echo esc_html((string) $post['id']); ?>
          </span>
          <span class="section-consult-list__cell section-consult-list__cell--category" role="cell">
            <?php echo esc_html($post['category']); ?>
          </span>
          <span class="section-consult-list__cell section-consult-list__cell--title" role="cell">
            <span class="section-consult-list__title-text"><?php echo esc_html($post['title']); ?></span>
            <?php if (!empty($post['locked'])) : ?>
              <img
                class="section-consult-list__lock"
                src="<?php echo esc_url(barun_dental_asset_uri('icon-list-lock')); ?>"
                alt="비밀글"
                width="14"
                height="14"
                decoding="async"
              >
            <?php endif; ?>
          </span>
          <span class="section-consult-list__cell section-consult-list__cell--author" role="cell">
            <?php echo esc_html($post['author']); ?>
          </span>
          <span class="section-consult-list__cell section-consult-list__cell--date" role="cell">
            <?php echo esc_html($post['date']); ?>
          </span>
          <span class="section-consult-list__cell section-consult-list__cell--status" role="cell">
            <span class="section-consult-list__badge section-consult-list__badge--<?php echo esc_attr($post['status']); ?>">
              <?php echo esc_html(barun_dental_consultation_status_label($post['status'])); ?>
            </span>
          </span>
        </a>
      <?php endforeach; ?>
    </div>

    <div class="section-consult-list__bottom">
      <form class="section-consult-list__search" action="<?php echo esc_url($list_url); ?>" method="get" role="search">
        <div class="section-consult-list__search-group">
          <label class="screen-reader-text" for="consult-search-field">검색</label>
          <div class="section-consult-list__search-type">
            <span class="section-consult-list__search-type-label">제목</span>
            <img src="<?php echo esc_url(barun_dental_asset_uri('icon-chevron-down')); ?>" alt="" width="14" height="14" decoding="async">
          </div>
          <input
            id="consult-search-field"
            class="section-consult-list__search-input"
            type="search"
            name="s"
            placeholder="검색어를 입력하세요"
          >
          <button type="submit" class="section-consult-list__search-btn" aria-label="검색">
            <img src="<?php echo esc_url(barun_dental_asset_uri('icon-search')); ?>" alt="" width="18" height="18" decoding="async">
          </button>
        </div>
      </form>

      <nav class="section-consult-list__pagination" aria-label="페이지">
        <a href="<?php echo esc_url($list_url); ?>" class="section-consult-list__page section-consult-list__page--prev" aria-label="이전 페이지">
          <img src="<?php echo esc_url(barun_dental_asset_uri('icon-chevron-left')); ?>" alt="" width="14" height="14" decoding="async">
        </a>
        <?php for ($page = 1; $page <= 5; $page += 1) : ?>
          <a
            href="<?php echo esc_url($list_url); ?>"
            class="section-consult-list__page<?php echo $page === 1 ? ' is-active' : ''; ?>"
            <?php echo $page === 1 ? 'aria-current="page"' : ''; ?>
          ><?php echo esc_html((string) $page); ?></a>
        <?php endfor; ?>
        <a href="<?php echo esc_url($list_url); ?>" class="section-consult-list__page section-consult-list__page--next" aria-label="다음 페이지">
          <img src="<?php echo esc_url(barun_dental_asset_uri('icon-chevron-right')); ?>" alt="" width="14" height="14" decoding="async">
        </a>
      </nav>

      <a href="<?php echo esc_url($write_url); ?>" class="section-consult-list__write-btn">작성하기</a>
    </div>
  </div>
</section>
