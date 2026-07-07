<?php
/**
 * S08 FAQ — Figma 614:344
 */
$items = hes_womens_clinic_faq_items();
$hide_header = !empty($args['hide_header']);
?>
<section class="section-faq" aria-labelledby="faq-title">
  <div class="section-shell section-shell--gutter">
    <?php if (!$hide_header) : ?>
    <header class="section-faq__header">
      <p class="section-faq__eyebrow">FAQ</p>
      <h2 id="faq-title" class="section-faq__title">자주 하는 질문</h2>
    </header>
    <?php else : ?>
    <h2 id="faq-title" class="screen-reader-text">자주 묻는 질문</h2>
    <?php endif; ?>

    <div class="section-faq__list">
      <?php foreach ($items as $index => $item) : ?>
        <?php $is_open = $index === 0; ?>
        <article class="section-faq__item<?php echo $is_open ? ' is-open' : ''; ?>">
          <button
            type="button"
            class="section-faq__trigger"
            aria-expanded="<?php echo $is_open ? 'true' : 'false'; ?>"
          >
            <span class="section-faq__question">
              <span class="section-faq__question-mark">Q.</span>
              <span class="section-faq__question-text"><?php echo esc_html($item['question']); ?></span>
            </span>
            <span class="section-faq__icon" aria-hidden="true">
              <img
                class="section-faq__icon-img section-faq__icon-img--down"
                src="<?php echo esc_url(hes_womens_clinic_asset_uri('icon-chevron-down')); ?>"
                alt=""
                width="20"
                height="20"
                decoding="async"
              >
              <img
                class="section-faq__icon-img section-faq__icon-img--up"
                src="<?php echo esc_url(hes_womens_clinic_asset_uri('icon-chevron-up')); ?>"
                alt=""
                width="20"
                height="20"
                decoding="async"
              >
            </span>
          </button>
          <div class="section-faq__panel"<?php echo $is_open ? '' : ' hidden'; ?>>
            <p class="section-faq__answer"><?php echo esc_html($item['answer']); ?></p>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>
