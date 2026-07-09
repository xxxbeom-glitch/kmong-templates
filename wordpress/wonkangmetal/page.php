<?php
/**
 * Default page template — P2-3 path별 sub-hero · sub-nav · 본문 라우팅
 */
get_header();

if (have_posts()) {
  while (have_posts()) {
    the_post();

    $path = wonkangmetal_get_page_path(get_post());

    if (wonkangmetal_render_page_content($path)) {
      continue;
    }

    get_template_part(
      'template-parts/layout/sub',
      'hero',
      array(
        'title'      => get_the_title(),
        'desc'       => '',
        'section'    => '',
        'breadcrumb' => array(
          array('label' => __('HOME', 'wonkangmetal'), 'url' => home_url('/')),
          array('label' => get_the_title(), 'url' => ''),
        ),
      )
    );
    ?>
    <article <?php post_class('sub-page'); ?>>
      <div class="si-inner sub-page__inner">
        <?php if (get_the_content()) : ?>
          <div class="sub-page__content entry-content">
            <?php the_content(); ?>
          </div>
        <?php else : ?>
          <div class="sub-page__placeholder">
            <p><?php esc_html_e('이 페이지 본문은 다음 단계에서 템플릿 또는 ACF로 구성됩니다.', 'wonkangmetal'); ?></p>
          </div>
        <?php endif; ?>
      </div>
    </article>
    <?php
  }
}

get_footer();
