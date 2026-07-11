<?php
/**
 * Title: Home CTA
 * slug: template-a-blocks/home-cta
 * Categories: call-to-action, banner
 */
$img = esc_url(get_theme_file_uri('assets/images/cta-bg.jpg'));
?>
<!-- wp:cover {"url":"<?php echo $img; ?>","dimRatio":50,"minHeight":320,"align":"full","className":"section section--cta"} -->
<div class="wp-block-cover alignfull section section--cta" style="min-height:320px"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-50 has-background-dim"></span><img class="wp-block-cover__image-background" alt="" src="<?php echo $img; ?>" data-object-fit="cover"/><div class="wp-block-cover__inner-container">
	<!-- wp:heading {"textAlign":"center","textColor":"on-dark","fontSize":"x-large"} -->
	<h2 class="wp-block-heading has-text-align-center has-on-dark-color has-text-color has-x-large-font-size">프로젝트를 시작할 준비가 되셨나요?</h2>
	<!-- /wp:heading -->

	<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
	<div class="wp-block-buttons">
		<!-- wp:button -->
		<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/contact/">프로젝트 문의하기</a></div>
		<!-- /wp:button -->
	</div>
	<!-- /wp:buttons -->
</div></div>
<!-- /wp:cover -->
