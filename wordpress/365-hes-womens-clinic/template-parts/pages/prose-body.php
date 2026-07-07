<?php
/**
 * @var array $args intro, sections[], cta
 */
$intro = isset($args['intro']) ? $args['intro'] : array();
$sections = isset($args['sections']) ? $args['sections'] : array();
$cta = isset($args['cta']) ? $args['cta'] : null;
?>

<?php if (!empty($intro['text'])) : ?>
  <section class="sub-intro">
    <div class="section-shell section-shell--gutter">
      <p class="sub-intro__text"><?php echo esc_html($intro['text']); ?></p>
    </div>
  </section>
<?php endif; ?>

<section class="sub-prose">
  <div class="section-shell section-shell--gutter">
    <?php foreach ($sections as $section) : ?>
      <article class="sub-prose__block">
        <?php if (!empty($section['title'])) : ?>
          <h2 class="sub-prose__title"><?php echo esc_html($section['title']); ?></h2>
        <?php endif; ?>
        <?php if (!empty($section['paragraphs'])) : ?>
          <?php foreach ($section['paragraphs'] as $paragraph) : ?>
            <p class="sub-prose__text"><?php echo esc_html($paragraph); ?></p>
          <?php endforeach; ?>
        <?php endif; ?>
        <?php if (!empty($section['list'])) : ?>
          <ul class="sub-prose__list">
            <?php foreach ($section['list'] as $item) : ?>
              <li><?php echo esc_html($item); ?></li>
            <?php endforeach; ?>
          </ul>
        <?php endif; ?>
      </article>
    <?php endforeach; ?>
    <?php if (!empty($cta['label']) && !empty($cta['url'])) : ?>
      <p class="sub-prose__cta-wrap">
        <a class="sub-prose__cta" href="<?php echo esc_url($cta['url']); ?>"><?php echo esc_html($cta['label']); ?></a>
      </p>
    <?php endif; ?>
  </div>
</section>
