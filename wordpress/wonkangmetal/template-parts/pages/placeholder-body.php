<?php
/**
 * Placeholder page body — P2-3
 *
 * @var array $args path, title, placeholder
 */
$args        = isset($args) ? $args : array();
$title       = isset($args['title']) ? $args['title'] : get_the_title();
$placeholder = isset($args['placeholder']) ? $args['placeholder'] : '';
?>
<article <?php post_class('sub-page page-placeholder'); ?>>
  <div class="si-inner sub-page__inner">
    <div class="page-placeholder__panel sub-page__placeholder">
      <p class="page-placeholder__lead">
        <?php
        if ($placeholder) {
          echo esc_html($placeholder);
        } else {
          esc_html_e('이 페이지 본문은 다음 단계에서 원본 콘텐츠로 구성됩니다.', 'wonkangmetal');
        }
        ?>
      </p>
      <p class="page-placeholder__note">
        <?php
        printf(
          /* translators: %s: page title */
          esc_html__('현재 단계(P2-3)에서는 %s 페이지의 레이아웃·메뉴 연결만 구성되어 있습니다.', 'wonkangmetal'),
          esc_html($title)
        );
        ?>
      </p>
    </div>
  </div>
</article>
