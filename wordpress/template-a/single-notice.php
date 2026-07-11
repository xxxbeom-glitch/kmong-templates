<?php get_header(); ?>
<main id="main" class="main main--subpage">
  <section id="page-hero" class="section section--page-hero" aria-labelledby="page-hero-title">
    <div class="page-hero__media" aria-hidden="true">
      <img class="page-hero__img" src="<?php echo esc_url(template_a_asset_uri('images/hero-bg-02.jpg')); ?>" alt="" width="1920" height="364" decoding="async" fetchpriority="high">
      <div class="page-hero__overlay"></div>
    </div>
    <div class="section-shell section-shell--gutter page-hero__inner">
      <div class="page-hero__copy">
        <p class="page-hero__label">주요 소식</p>
        <h1 id="page-hero-title" class="page-hero__title">텐폴드 스튜디오의 새로운 소식을 전합니다.</h1>
      </div>
    </div>
  </section>
  <?php while (have_posts()) : the_post(); ?>
    <section id="news-view" class="section section--news-view" aria-labelledby="news-view-title">
      <div class="section-shell section-shell--gutter news-view__inner">
        <article class="news-view__article scroll-reveal">
          <header class="news-view__header">
            <h2 id="news-view-title" class="news-view__title"><?php the_title(); ?></h2>
            <time class="news-view__date" datetime="<?php echo esc_attr(get_the_date('Y-m-d')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time>
          </header>
          <div class="news-view__body">
            <div class="news-view__content"><?php the_content(); ?></div>
          </div>
        </article>
        <?php $previous = get_previous_post(); $next = get_next_post(); ?>
        <nav class="news-view__nav" aria-label="글 이동">
          <?php if ($previous) : ?>
            <a class="news-view__nav-link news-view__nav-link--prev" href="<?php echo esc_url(get_permalink($previous)); ?>"><span>이전 글</span></a>
          <?php else : ?>
            <span class="news-view__nav-link news-view__nav-link--prev"></span>
          <?php endif; ?>
          <a class="news-view__list-btn btn-pill btn-pill--accent btn-slide-hover" href="<?php echo esc_url(get_post_type_archive_link('notice')); ?>">
            <span class="btn__label"><span class="btn__track"><span class="btn__text">글 목록 보기</span><span class="btn__text" aria-hidden="true">글 목록 보기</span></span></span>
          </a>
          <?php if ($next) : ?>
            <a class="news-view__nav-link news-view__nav-link--next" href="<?php echo esc_url(get_permalink($next)); ?>"><span>다음 글</span></a>
          <?php else : ?>
            <span class="news-view__nav-link news-view__nav-link--next"></span>
          <?php endif; ?>
        </nav>
      </div>
    </section>
  <?php endwhile; ?>
</main>
<?php get_footer(); ?>
