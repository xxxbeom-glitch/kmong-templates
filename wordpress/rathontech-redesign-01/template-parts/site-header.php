<?php
/**
 * Site header — full-bleed mega bar, active 1depth 2depth only (thePAY-style).
 * Pattern note: shared panel shell + single visible column (decision-log).
 */
$home     = rathon_url();
$contact  = rathon_url('contact');
$gnb      = rathon_gnb_items();
$is_iam   = is_page_template('page-templates/product-rathon-iam.php') || is_page('rathon-iam');
?>
<header class="site-header" data-site-header data-header-mega>
  <div class="site-header__inner u-container">
    <a class="site-header__logo" href="<?php echo esc_url($home); ?>">RATHON<span>TECH</span></a>

    <nav class="site-header__nav" aria-label="<?php echo esc_attr__('주요 메뉴', 'rathontech-redesign-01'); ?>">
      <ul class="site-header__list">
        <?php foreach ($gnb as $item) :
          $has_mega = count($item['children']) >= 2;
          $item_class = 'site-header__item';
          if ($has_mega) {
            $item_class .= ' site-header__item--has-mega';
          }
          $link_class = 'site-header__link';
          if ($has_mega) {
            $link_class .= ' site-header__trigger';
          }
          if ($is_iam && $item['id'] === 'products') {
            $link_class .= ' is-active';
          }
          ?>
          <li class="<?php echo esc_attr($item_class); ?>">
            <a
              class="<?php echo esc_attr($link_class); ?>"
              href="<?php echo esc_url($item['href']); ?>"
              <?php if ($has_mega) : ?>
                aria-haspopup="true"
                aria-expanded="false"
              <?php endif; ?>
              <?php echo ($is_iam && $item['id'] === 'products') ? 'aria-current="page"' : ''; ?>
            ><?php echo esc_html($item['label']); ?></a>
          </li>
        <?php endforeach; ?>
      </ul>
    </nav>

    <div class="site-header__actions">
      <a class="btn btn--sm btn--primary btn-slide-hover site-header__cta" href="<?php echo esc_url($contact); ?>"><?php echo rathon_btn_slide_label(__('보안 환경 상담하기', 'rathontech-redesign-01')); ?></a>
      <button
        type="button"
        class="site-header__menu-btn"
        data-menu-toggle
        aria-label="<?php echo esc_attr__('메뉴 열기', 'rathontech-redesign-01'); ?>"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <span class="site-header__menu-btn-bars" aria-hidden="true"></span>
      </button>
    </div>
  </div>

  <div id="gnb-mega-panel" class="site-header__mega" hidden inert>
    <div class="site-header__mega-inner u-container">
      <ul class="site-header__mega-list">
        <?php foreach ($gnb as $item) : ?>
          <li class="site-header__mega-col" data-mega-col="<?php echo esc_attr($item['id']); ?>">
            <?php if (count($item['children']) >= 2) : ?>
              <ul class="site-header__mega-sub">
                <?php foreach ($item['children'] as $child) : ?>
                  <li>
                    <a class="site-header__sublink" href="<?php echo esc_url($child['href']); ?>">
                      <?php echo esc_html($child['label']); ?>
                    </a>
                  </li>
                <?php endforeach; ?>
              </ul>
            <?php endif; ?>
          </li>
        <?php endforeach; ?>
      </ul>
    </div>
  </div>

  <div class="site-header__dim" hidden aria-hidden="true"></div>

  <div
    id="mobile-menu"
    class="mobile-menu"
    data-mobile-menu
    hidden
    inert
    role="dialog"
    aria-modal="true"
    aria-label="<?php echo esc_attr__('전체 메뉴', 'rathontech-redesign-01'); ?>"
  >
    <div class="u-container">
      <div class="mobile-menu__top">
        <p class="site-header__logo">RATHON<span>TECH</span></p>
        <button type="button" class="mobile-menu__close" data-menu-close><?php echo esc_html__('닫기', 'rathontech-redesign-01'); ?></button>
      </div>
      <nav aria-label="<?php echo esc_attr__('모바일 메뉴', 'rathontech-redesign-01'); ?>">
        <ul class="mobile-menu__list">
          <?php foreach ($gnb as $item) :
            $has_sub = count($item['children']) >= 2;
            ?>
            <li class="mobile-menu__item<?php echo $has_sub ? ' mobile-menu__item--has-sub' : ''; ?>">
              <?php if ($has_sub) : ?>
                <button
                  type="button"
                  class="mobile-menu__toggle"
                  aria-expanded="false"
                  aria-controls="mobile-sub-<?php echo esc_attr($item['id']); ?>"
                ><?php echo esc_html($item['label']); ?></button>
                <ul id="mobile-sub-<?php echo esc_attr($item['id']); ?>" class="mobile-menu__sub" hidden>
                  <?php foreach ($item['children'] as $child) : ?>
                    <li>
                      <a class="mobile-menu__sublink" href="<?php echo esc_url($child['href']); ?>">
                        <?php echo esc_html($child['label']); ?>
                      </a>
                    </li>
                  <?php endforeach; ?>
                </ul>
              <?php else : ?>
                <a class="mobile-menu__link" href="<?php echo esc_url($item['href']); ?>"><?php echo esc_html($item['label']); ?></a>
              <?php endif; ?>
            </li>
          <?php endforeach; ?>
        </ul>
      </nav>
      <a class="btn btn--md btn--primary btn-slide-hover mobile-menu__cta" href="<?php echo esc_url($contact); ?>"><?php echo rathon_btn_slide_label(__('보안 환경 상담하기', 'rathontech-redesign-01')); ?></a>
    </div>
  </div>
</header>
<?php
unset($home, $contact, $gnb, $is_iam, $item, $child, $has_mega, $has_sub, $item_class, $link_class);
