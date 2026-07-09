<?php
/**
 * Mobile menu overlay
 */
?>
<div class="site-mobile-menu menu_sidebar" id="site-mobile-menu" hidden>
  <nav class="site-nav site-nav--mobile mobile_gnb" aria-label="<?php esc_attr_e('모바일 메뉴', 'wonkangmetal'); ?>">
    <ul class="site-nav__list site-nav__list--mobile">
      <?php foreach (wonkangmetal_nav_menu() as $item) : ?>
        <?php wonkangmetal_render_nav_item($item, true, 'header'); ?>
      <?php endforeach; ?>
    </ul>
  </nav>
</div>
