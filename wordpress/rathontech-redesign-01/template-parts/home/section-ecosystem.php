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
    'image' => rathon_asset('images/thumb/dynamic-wang-KZuZAaEojq4-unsplash.jpg'),
  ),
  array(
    'id'    => 'extend',
    'label' => __('확장 제품', 'rathontech-redesign-01'),
    'desc'  => __('암호·Windows 로그인·다중인증', 'rathontech-redesign-01'),
    'href'  => rathon_url('products') . '#extend',
    'image' => rathon_asset('images/thumb/shubham-dhage-8HaKRwazMrQ-unsplash.jpg'),
  ),
  array(
    'id'    => 'partner',
    'label' => __('파트너 제품', 'rathontech-redesign-01'),
    'desc'  => __('구축·연동은 라톤테크가 수행', 'rathontech-redesign-01'),
    'href'  => rathon_url('products') . '#partner',
    'image' => rathon_asset('images/thumb/ela-de-pure-h7lfy7HoIE8-unsplash.jpg'),
  ),
);
?>
<section class="home-eco" aria-labelledby="home-eco-title">
  <div class="u-container">
    <header class="home-eco__head" data-reveal>
      <h2 id="home-eco-title" class="home-eco__title">
        <?php echo esc_html__('솔루션을 실제로 만드는 제품군', 'rathontech-redesign-01'); ?>
      </h2>
      <p class="home-eco__lead">
        <?php echo esc_html__('핵심·확장·파트너로 나눈 제품군을 살펴보세요.', 'rathontech-redesign-01'); ?>
      </p>
    </header>

    <ul class="home-eco__cards">
      <?php foreach ($eco_cards as $i => $card) : ?>
        <li class="home-eco__card" data-reveal style="--reveal-delay: <?php echo esc_attr(number_format(0.1 * ($i + 1), 2, '.', '')); ?>s">
          <a class="home-eco__card-link" href="<?php echo esc_url($card['href']); ?>">
            <span
              class="home-eco__card-media"
              style="background-image: url('<?php echo esc_url($card['image']); ?>');"
              aria-hidden="true"
            ></span>
            <span class="home-eco__card-veil" aria-hidden="true"></span>
            <span class="home-eco__card-body">
              <span class="home-eco__card-copy">
                <span class="home-eco__card-label"><?php echo esc_html($card['label']); ?></span>
                <span class="home-eco__card-desc"><?php echo esc_html($card['desc']); ?></span>
              </span>
              <span class="home-eco__card-arrow" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </span>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>
</section>
<?php
unset($eco_cards, $card, $i);
