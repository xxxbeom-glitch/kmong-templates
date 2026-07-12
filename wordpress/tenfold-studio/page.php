<?php
get_header();
$path = tenfold_get_page_path();
$template = tenfold_content_template_for_path($path);

if ($template === 'projects/detail') {
  $slug = basename($path);
  $project = tenfold_get_project($slug);
  if ($project) {
    tenfold_part('projects/detail', array('project' => $project));
  } else {
    echo '<div class="section-shell section-shell--gutter"><p>프로젝트를 찾을 수 없습니다.</p></div>';
  }
} elseif ($template === 'services/detail') {
  $slug = basename($path);
  $package = tenfold_get_package($slug);
  if ($package) {
    tenfold_part('services/detail', array('package' => $package));
  } else {
    echo '<div class="section-shell section-shell--gutter"><p>패키지를 찾을 수 없습니다.</p></div>';
  }
} elseif ($template) {
  tenfold_part($template);
} else {
  ?>
  <article class="section section--page">
    <div class="section-shell section-shell--gutter">
      <h1><?php the_title(); ?></h1>
      <?php the_content(); ?>
    </div>
  </article>
  <?php
}

$compact = ($path === 'contact-complete');
get_footer(null, array('compact' => $compact));
