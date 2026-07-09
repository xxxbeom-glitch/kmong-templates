<?php
/**
 * Sub visual — 원본 sub_visual 대응
 *
 * @var array $args title, desc, section, breadcrumb
 */
$args = isset($args) ? $args : array();
$title      = isset($args['title']) ? $args['title'] : get_the_title();
$desc       = isset($args['desc']) ? $args['desc'] : '';
$section    = isset($args['section']) ? $args['section'] : '';
$breadcrumb = isset($args['breadcrumb']) ? $args['breadcrumb'] : array();
$bg_class   = isset($args['bg_class']) ? $args['bg_class'] : 'sub-hero--default';
?>
<section class="sub-hero <?php echo esc_attr($bg_class); ?>" aria-labelledby="sub-hero-title">
  <div class="si-inner sub-hero__inner">
    <?php if (!empty($breadcrumb)) : ?>
      <?php
      get_template_part(
        'template-parts/layout/breadcrumb',
        null,
        array('items' => $breadcrumb)
      );
      ?>
    <?php endif; ?>

    <?php if ($section) : ?>
      <p class="sub-hero__section"><?php echo esc_html($section); ?></p>
    <?php endif; ?>

    <h1 id="sub-hero-title" class="sub-hero__title"><?php echo esc_html($title); ?></h1>

    <?php if ($desc) : ?>
      <p class="sub-hero__desc"><?php echo esc_html($desc); ?></p>
    <?php endif; ?>
  </div>
</section>
