<?php
/**
 * 여성질환 클리닉 — project-spec §07 · /womens-disease
 */
get_header();

if (have_posts()) {
  while (have_posts()) {
    the_post();
  }
}

hes_womens_clinic_render_page_content('womens-disease');

get_footer();
