<?php
get_header();
$page_path = template_a_get_page_path();
$parts = array(
  'about/greeting' => 'about-greeting',
  'about/ceo' => 'about-ceo',
  'about/directions' => 'about-directions',
  'service/solution' => 'service-solution',
  'service/process' => 'service-process',
  'service/portfolio' => 'service-portfolio',
  'business' => 'business',
  'contact' => 'contact',
  'privacy' => 'privacy',
);

if (isset($parts[$page_path])) {
  get_template_part('template-parts/pages/' . $parts[$page_path]);
} else {
  while (have_posts()) {
    the_post();
    echo '<main id="main" class="main main--subpage"><div class="section-shell section-shell--gutter">';
    the_content();
    echo '</div></main>';
  }
}
get_footer();
