<?php get_header(); ?>
<main id="main" class="main main--subpage">
  <section id="page-hero" class="section section--page-hero" aria-labelledby="page-hero-title">
    <div class="page-hero__media" aria-hidden="true">
      <img class="page-hero__img" src="<?php echo esc_url(template_a_img_url('notice.hero.image', 'images/hero-bg-02.jpg')); ?>" alt="" width="1920" height="364" decoding="async" fetchpriority="high">
      <div class="page-hero__overlay"></div>
    </div>
    <div class="section-shell section-shell--gutter page-hero__inner">
      <div class="page-hero__copy">
        <p class="page-hero__label"><?php echo esc_html(template_a_get('notice.hero.label')); ?></p>
        <h1 id="page-hero-title" class="page-hero__title"><?php echo template_a_text_br('notice.hero.title'); ?></h1>
      </div>
    </div>
  </section>
  <section id="news-list" class="section section--news" aria-labelledby="news-title">
    <div class="section-shell section-shell--gutter news__inner">
      <div class="news__header scroll-reveal">
        <h2 id="news-title" class="section-title section-title--left"><?php echo esc_html(template_a_get('notice.archive_title')); ?></h2>
        <div class="news-filter" aria-label="<?php echo esc_attr(template_a_get('notice.filter_label')); ?>">
          <span class="filter-tab is-active"><?php echo esc_html(template_a_get('notice.category')); ?></span>
        </div>
      </div>
      <div class="news__list" role="list">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
          <a class="news-item" role="listitem" href="<?php the_permalink(); ?>" data-news-category="notice">
            <span class="news-item__main">
              <span class="news-item__badge news-item__badge--notice"><?php echo esc_html(template_a_get('notice.category')); ?></span>
              <span class="news-item__title"><?php the_title(); ?></span>
            </span>
            <time class="news-item__date" datetime="<?php echo esc_attr(get_the_date('Y-m-d')); ?>"><?php echo esc_html(get_the_date('Y.m.d')); ?></time>
          </a>
        <?php endwhile; else : ?>
          <p><?php echo esc_html(template_a_get('notice.empty')); ?></p>
        <?php endif; ?>
      </div>
      <?php
      $pagination = paginate_links(array('type' => 'array', 'prev_text' => template_a_get('notice.prev_page'), 'next_text' => template_a_get('notice.next_page')));
      if ($pagination) :
      ?>
        <nav class="news-pagination" aria-label="<?php echo esc_attr(template_a_get('notice.pagination_label')); ?>">
          <ol class="news-pagination__pages">
            <?php foreach ($pagination as $link) : ?>
              <li class="news-pagination__page"><?php echo wp_kses_post($link); ?></li>
            <?php endforeach; ?>
          </ol>
        </nav>
      <?php endif; ?>
    </div>
  </section>
</main>
<?php get_footer(); ?>
