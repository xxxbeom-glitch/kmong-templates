<?php
/**
 * Sub-hero — Figma Sub Hero / 서브페이지 (공통)
 *
 * @var array $args title, desc, breadcrumb, title_id
 */
$defaults = hes_womens_clinic_default_sub_hero();
$title = isset($args['title']) ? $args['title'] : $defaults['title'];
$desc = isset($args['desc']) ? $args['desc'] : $defaults['desc'];
$breadcrumb = isset($args['breadcrumb']) ? $args['breadcrumb'] : array();
$title_id = isset($args['title_id']) ? $args['title_id'] : 'sub-hero-title';
$bg_url = hes_womens_clinic_asset_uri('sub-hero-bg');
?>
<section class="section-sub-hero" aria-labelledby="<?php echo esc_attr($title_id); ?>">
  <div class="section-sub-hero__media" aria-hidden="true">
    <?php if ($bg_url) : ?>
      <img
        class="section-sub-hero__bg"
        src="<?php echo esc_url($bg_url); ?>"
        alt=""
        width="1920"
        height="440"
        decoding="async"
      >
    <?php endif; ?>
    <div class="section-sub-hero__overlay"></div>
  </div>

  <div class="section-shell section-shell--gutter">
    <div class="section-sub-hero__inner">
      <?php if (!empty($breadcrumb)) : ?>
        <nav class="section-sub-hero__breadcrumb" aria-label="<?php esc_attr_e('현재 위치', '365-hes-womens-clinic'); ?>">
          <ol class="section-sub-hero__breadcrumb-list">
            <?php foreach ($breadcrumb as $index => $crumb) : ?>
              <li class="section-sub-hero__breadcrumb-item">
                <?php if (!empty($crumb['url'])) : ?>
                  <a class="section-sub-hero__breadcrumb-link" href="<?php echo esc_url($crumb['url']); ?>">
                    <?php echo esc_html($crumb['label']); ?>
                  </a>
                <?php else : ?>
                  <span class="section-sub-hero__breadcrumb-current" aria-current="page">
                    <?php echo esc_html($crumb['label']); ?>
                  </span>
                <?php endif; ?>
                <?php if ($index < count($breadcrumb) - 1) : ?>
                  <span class="section-sub-hero__breadcrumb-sep" aria-hidden="true">&gt;</span>
                <?php endif; ?>
              </li>
            <?php endforeach; ?>
          </ol>
        </nav>
      <?php endif; ?>

      <h1 id="<?php echo esc_attr($title_id); ?>" class="section-sub-hero__title">
        <?php echo wp_kses($title, array('br' => array())); ?>
      </h1>

      <?php if ($desc) : ?>
        <p class="section-sub-hero__desc">
          <?php echo wp_kses($desc, array('br' => array())); ?>
        </p>
      <?php endif; ?>
    </div>
  </div>
</section>
