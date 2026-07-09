<?php

/**
 * GNB — PRODUCT(P2-1) · COMPANY/FACTORY/CUSTOMER(P2-3) URL 연결.
 */
function wonkangmetal_nav_menu() {
  $inquiry_url = wonkangmetal_page_url('inquiry');
  $contact_url = wonkangmetal_page_url('contact');

  $product_children = array();
  foreach (wonkangmetal_product_category_definitions() as $slug => $label) {
    $product_children[] = array(
      'label' => $label,
      'href'  => wonkangmetal_product_category_url($slug),
    );
  }

  return array(
    array(
      'label'    => 'COMPANY',
      'href'     => wonkangmetal_page_url('company/overview'),
      'children' => array(
        array('label' => '회사개요', 'href' => wonkangmetal_page_url('company/overview')),
        array('label' => 'CI 소개', 'href' => wonkangmetal_page_url('company/ci')),
        array('label' => '비즈니스 파트너', 'href' => wonkangmetal_page_url('company/partners')),
        array('label' => '찾아오시는 길', 'href' => wonkangmetal_page_url('company/location')),
        array('label' => '회사소식', 'href' => wonkangmetal_news_archive_url()),
      ),
    ),
    array(
      'label'    => 'FACTORY',
      'href'     => wonkangmetal_page_url('factory/process'),
      'children' => array(
        array('label' => '생산공정', 'href' => wonkangmetal_page_url('factory/process')),
        array('label' => '생산설비', 'href' => wonkangmetal_page_url('factory/equipment')),
        array('label' => '핵심기술', 'href' => wonkangmetal_page_url('factory/technology')),
        array('label' => '인증서 현황', 'href' => wonkangmetal_page_url('factory/certificates')),
      ),
    ),
    array(
      'label'    => 'PRODUCT',
      'href'     => wonkangmetal_product_category_url('pump-general'),
      'children' => $product_children,
    ),
    array(
      'label'    => 'CUSTOMER',
      'href'     => $inquiry_url,
      'children' => array(
        array('label' => '견적문의', 'href' => $inquiry_url),
        array('label' => '컨택트', 'href' => $contact_url),
      ),
    ),
  );
}

/**
 * @param array  $item
 * @param bool   $is_mobile
 * @param string $context header|footer
 */
function wonkangmetal_render_nav_item($item, $is_mobile = false, $context = 'header') {
  $children     = isset($item['children']) ? $item['children'] : array();
  $has_children = count($children) > 0;
  $item_class   = 'site-nav__item' . ($has_children ? ' site-nav__item--has-children' : '');
  $href         = isset($item['href']) ? $item['href'] : home_url('/');
  $label        = isset($item['label']) ? $item['label'] : '';
  $use_links    = $context === 'footer' || (!$is_mobile && $context === 'header' && $has_children);
  ?>
  <li class="<?php echo esc_attr($item_class); ?>">
  <?php if ($has_children && $is_mobile) : ?>
    <button
      type="button"
      class="site-nav__trigger"
      aria-expanded="false"
      data-mobile-submenu
    >
      <?php echo esc_html($label); ?>
    </button>
    <ul class="site-nav__submenu" hidden>
      <?php foreach ($children as $child) : ?>
        <li>
          <a class="site-nav__sublink" href="<?php echo esc_url($child['href']); ?>">
            <?php echo esc_html($child['label']); ?>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  <?php elseif ($has_children && $use_links) : ?>
    <a class="site-nav__link" href="<?php echo esc_url($href); ?>">
      <?php echo esc_html($label); ?>
    </a>
    <ul class="site-nav__submenu">
      <?php foreach ($children as $child) : ?>
        <li>
          <a class="site-nav__sublink" href="<?php echo esc_url($child['href']); ?>">
            <?php echo esc_html($child['label']); ?>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  <?php else : ?>
    <a class="site-nav__link" href="<?php echo esc_url($href); ?>">
      <?php echo esc_html($label); ?>
    </a>
  <?php endif; ?>
  </li>
  <?php
}
