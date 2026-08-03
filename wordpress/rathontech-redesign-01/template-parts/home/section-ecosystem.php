<?php
/**
 * Home Section 3 — Product Ecosystem.
 * Bento cards: title + subtext only.
 */

$eco_cards = array(
  array(
    'id'    => 'core',
    'label' => __('핵심 제품', 'rathontech-redesign-01'),
    'desc'  => __('계정·인증·디렉토리·접근의 중심', 'rathontech-redesign-01'),
    'href'  => rathon_url('products') . '#core',
    /* Placeholder until approved photography is supplied */
    'tone'  => 'tone-a',
  ),
  array(
    'id'    => 'extend',
    'label' => __('확장 제품', 'rathontech-redesign-01'),
    'desc'  => __('암호·Windows 로그인·다중인증', 'rathontech-redesign-01'),
    'href'  => rathon_url('products') . '#extend',
    'tone'  => 'tone-b',
  ),
  array(
    'id'    => 'partner',
    'label' => __('파트너 제품', 'rathontech-redesign-01'),
    'desc'  => __('구축·연동은 라톤테크가 수행', 'rathontech-redesign-01'),
    'href'  => rathon_url('products') . '#partner',
    'tone'  => 'tone-c',
  ),
);
?>
<section class="home-eco" aria-labelledby="home-eco-title">
  <div class="u-container">
    <header class="home-eco__head">
      <p class="home-eco__eyebrow"><?php echo esc_html__('Product Ecosystem', 'rathontech-redesign-01'); ?></p>
      <h2 id="home-eco-title" class="home-eco__title">
        <?php echo esc_html__('솔루션을 실제로 만드는 제품군', 'rathontech-redesign-01'); ?>
      </h2>
      <p class="home-eco__lead">
        <?php echo esc_html__('핵심·확장·파트너로 나눈 제품군을 살펴보세요.', 'rathontech-redesign-01'); ?>
      </p>
    </header>

    <ul class="home-eco__cards">
      <?php foreach ($eco_cards as $card) : ?>
        <li class="home-eco__card">
          <a
            class="home-eco__card-link home-eco__card-link--<?php echo esc_attr($card['tone']); ?>"
            href="<?php echo esc_url($card['href']); ?>"
          >
            <span class="home-eco__card-media" aria-hidden="true"></span>
            <span class="home-eco__card-veil" aria-hidden="true"></span>
            <span class="home-eco__card-body">
              <span class="home-eco__card-label"><?php echo esc_html($card['label']); ?></span>
              <span class="home-eco__card-desc"><?php echo esc_html($card['desc']); ?></span>
            </span>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>
<?php
unset($eco_cards, $card);
