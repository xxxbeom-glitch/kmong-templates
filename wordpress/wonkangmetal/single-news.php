<?php
/**
 * News single — /news/{post-slug}/
 */
get_header();

if (have_posts()) {
  while (have_posts()) {
    the_post();

    $type_slug     = wonkangmetal_news_primary_type_slug();
    $type_label    = wonkangmetal_news_type_label($type_slug);
    $external_url  = get_post_meta(get_the_ID(), 'external_url', true);

    get_template_part(
      'template-parts/layout/sub',
      'hero',
      array(
        'title'      => get_the_title(),
        'desc'       => has_excerpt() ? get_the_excerpt() : '',
        'section'    => 'NEWS',
        'breadcrumb' => wonkangmetal_news_breadcrumb_items(
          array(
            array(
              'label' => get_the_title(),
              'url'   => '',
            ),
          )
        ),
        'bg_class'   => 'sub-hero--news',
      )
    );
    ?>
    <article <?php post_class('news-single sub-page'); ?>>
      <div class="si-inner news-single__inner">
        <div class="news-single__meta">
          <?php if ($type_label) : ?>
            <span class="news-single__type"><?php echo esc_html($type_label); ?></span>
          <?php endif; ?>
          <time class="news-single__date" datetime="<?php echo esc_attr(get_the_date('c')); ?>">
            <?php echo esc_html(get_the_date('Y-m-d')); ?>
          </time>
        </div>

        <div class="news-single__body entry-content">
          <?php the_content(); ?>
        </div>

        <?php if ($external_url) : ?>
          <p class="news-single__external">
            <a class="btn-text" href="<?php echo esc_url($external_url); ?>" target="_blank" rel="noopener noreferrer">
              <?php esc_html_e('원문 보기', 'wonkangmetal'); ?>
            </a>
          </p>
        <?php endif; ?>

        <p class="news-single__back">
          <a class="btn-text" href="<?php echo esc_url(wonkangmetal_news_archive_url($type_slug)); ?>">
            <?php esc_html_e('목록으로', 'wonkangmetal'); ?>
          </a>
        </p>
      </div>
    </article>
    <?php
  }
}

get_footer();
