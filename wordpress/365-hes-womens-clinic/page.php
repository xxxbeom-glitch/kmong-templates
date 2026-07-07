<?php
/**
 * Default page template — slug별 커스텀 본문 라우팅
 */
get_header();

if (have_posts()) {
  while (have_posts()) {
    the_post();
    $slug = get_post_field('post_name', get_the_ID());

    if (!hes_womens_clinic_render_page_content($slug)) {
      ?>
      <article <?php post_class('section-shell section-shell--gutter'); ?> style="padding-block: var(--section-pad-y);">
        <h1 class="notice-single__title"><?php the_title(); ?></h1>
        <div class="notice-single__content">
          <?php the_content(); ?>
        </div>
      </article>
      <?php
    }
  }
}

get_footer();
