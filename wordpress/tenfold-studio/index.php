<?php
get_header();
?>
<article class="section section--page">
  <div class="section-shell section-shell--gutter">
    <h1><?php the_title(); ?></h1>
    <?php
    if (have_posts()) {
      while (have_posts()) {
        the_post();
        the_content();
      }
    }
    ?>
  </div>
</article>
<?php
get_footer();
