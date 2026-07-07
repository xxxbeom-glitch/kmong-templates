<?php
/**
 * S02 Today status — Figma 614:46 · hero 하단 플로팅 카드
 */
$notice_title = hes_womens_clinic_latest_notice_title();
$notice_archive = get_post_type_archive_link('notice');
?>
<aside class="section-today-status" aria-label="<?php esc_attr_e('공지 안내', '365-hes-womens-clinic'); ?>">
  <div class="section-shell section-shell--gutter">
    <div class="section-today-status__card">
      <div class="section-today-status__inner">
        <span class="section-today-status__label">공지사항</span>
        <?php if ($notice_archive) : ?>
          <a class="section-today-status__text" href="<?php echo esc_url($notice_archive); ?>">
            <?php echo esc_html($notice_title); ?>
          </a>
        <?php else : ?>
          <p class="section-today-status__text"><?php echo esc_html($notice_title); ?></p>
        <?php endif; ?>
      </div>
    </div>
  </div>
</aside>
