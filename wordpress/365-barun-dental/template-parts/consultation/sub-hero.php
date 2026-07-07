<?php
/**
 * Sub-hero — consultation pages
 *
 * @var string $consult_hero_title
 * @var string $consult_hero_desc
 */
$consult_hero_title = isset($consult_hero_title) ? $consult_hero_title : '온라인 상담';
$consult_hero_desc = isset($consult_hero_desc)
  ? $consult_hero_desc
  : "치아와 구강 건강에 대해 궁금한 내용을 남겨주세요.\n의료진 확인 후 순차적으로 안내드립니다.";
?>
<section class="section-consult-sub-hero" aria-labelledby="consult-sub-hero-title">
  <div class="section-consult-sub-hero__media" aria-hidden="true">
    <img
      class="section-consult-sub-hero__bg"
      src="<?php echo esc_url(barun_dental_asset_uri('consultation-sub-hero')); ?>"
      alt=""
      width="1920"
      height="320"
      decoding="async"
    >
    <div class="section-consult-sub-hero__overlay"></div>
  </div>

  <div class="section-shell section-shell--gutter">
    <div class="section-consult-sub-hero__inner">
      <p class="section-consult-sub-hero__eyebrow">ONLINE CONSULTATION</p>
      <h1 id="consult-sub-hero-title" class="section-consult-sub-hero__title">
        <?php echo esc_html($consult_hero_title); ?>
      </h1>
      <p class="section-consult-sub-hero__desc">
        <?php echo nl2br(esc_html($consult_hero_desc)); ?>
      </p>
    </div>
  </div>
</section>
