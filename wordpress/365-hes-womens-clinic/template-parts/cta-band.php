<?php
/**
 * CTA band — 서브페이지 하단 공통 (hes-style-guide §5-2)
 *
 * @var array $args title, desc, primary_label, primary_url, secondary_label, secondary_url, phone_label
 */
$title = isset($args['title']) ? $args['title'] : '';
$desc = isset($args['desc']) ? $args['desc'] : '';
$primary_label = isset($args['primary_label']) ? $args['primary_label'] : '진료 접수';
$primary_url = isset($args['primary_url']) ? $args['primary_url'] : home_url('/support/reservation/');
$secondary_label = isset($args['secondary_label']) ? $args['secondary_label'] : '';
$secondary_url = isset($args['secondary_url']) ? $args['secondary_url'] : '';
$phone_label = isset($args['phone_label']) ? $args['phone_label'] : '전화 문의';
$phone = hes_womens_clinic_phone();
?>
<section class="section-cta-band" aria-labelledby="cta-band-title">
  <div class="section-shell section-shell--gutter">
    <div class="section-cta-band__inner">
      <div class="section-cta-band__copy">
        <?php if ($title) : ?>
          <h2 id="cta-band-title" class="section-cta-band__title"><?php echo esc_html($title); ?></h2>
        <?php endif; ?>
        <?php if ($desc) : ?>
          <p class="section-cta-band__desc"><?php echo esc_html($desc); ?></p>
        <?php endif; ?>
      </div>
      <div class="section-cta-band__actions">
        <a class="section-cta-band__btn section-cta-band__btn--primary" href="<?php echo esc_url($primary_url); ?>">
          <?php echo esc_html($primary_label); ?>
        </a>
        <?php if ($secondary_label && $secondary_url) : ?>
          <a class="section-cta-band__btn section-cta-band__btn--ghost" href="<?php echo esc_url($secondary_url); ?>">
            <?php echo esc_html($secondary_label); ?>
          </a>
        <?php endif; ?>
        <a class="section-cta-band__btn section-cta-band__btn--ghost" href="<?php echo esc_url($phone['href']); ?>">
          <?php echo esc_html($phone_label); ?>
        </a>
      </div>
    </div>
  </div>
</section>
