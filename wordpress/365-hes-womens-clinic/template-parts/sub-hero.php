<?php
/**
 * Sub-hero — 서브페이지 공통 (타이틀만 · 중앙 정렬)
 *
 * @var array $args title, title_id
 */
$title = isset($args['title']) ? $args['title'] : get_the_title();
$title_id = isset($args['title_id']) ? $args['title_id'] : 'sub-hero-title';
?>
<section class="section-sub-hero" aria-labelledby="<?php echo esc_attr($title_id); ?>">
  <div class="section-shell section-shell--gutter">
    <div class="section-sub-hero__inner">
      <h1 id="<?php echo esc_attr($title_id); ?>" class="section-sub-hero__title">
        <?php echo wp_kses($title, array('br' => array())); ?>
      </h1>
    </div>
  </div>
</section>
