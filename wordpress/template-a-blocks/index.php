<?php
/**
 * Template A Blocks — fallback for classic requests.
 * Front-end rendering uses block templates under /templates.
 */
if (!defined('ABSPATH')) {
  exit;
}
wp_head();
echo '<p>' . esc_html__('This is a block theme. Open Appearance → Editor to customize.', 'template-a-blocks') . '</p>';
wp_footer();
