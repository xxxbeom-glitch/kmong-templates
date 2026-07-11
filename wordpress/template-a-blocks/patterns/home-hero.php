<?php
/**
 * Title: Home Hero
 * slug: template-a-blocks/home-hero
 * Categories: featured, banner
 * Viewport width: 1400
 */
$img = esc_url(get_theme_file_uri('assets/images/hero-bg-01.jpg'));
?>
<!-- wp:cover {"url":"<?php echo $img; ?>","dimRatio":40,"minHeight":85,"minHeightUnit":"vh","align":"full","className":"section section--hero"} -->
<div class="wp-block-cover alignfull section section--hero" style="min-height:85vh"><span aria-hidden="true" class="wp-block-cover__background has-background-dim-40 has-background-dim"></span><img class="wp-block-cover__image-background" alt="" src="<?php echo $img; ?>" data-object-fit="cover"/><div class="wp-block-cover__inner-container">
	<!-- wp:group {"layout":{"type":"constrained","contentSize":"1600px"}} -->
	<div class="wp-block-group">
		<!-- wp:heading {"textAlign":"center","level":1,"textColor":"on-dark","fontSize":"xx-large"} -->
		<h1 class="wp-block-heading has-text-align-center has-on-dark-color has-text-color has-xx-large-font-size">브랜드의 기준을 세우는<br>웹사이트 구축 파트너</h1>
		<!-- /wp:heading -->

		<!-- wp:paragraph {"align":"center","textColor":"on-dark","fontSize":"large"} -->
		<p class="has-text-align-center has-on-dark-color has-text-color has-large-font-size">기업의 첫인상부터 고객 문의까지, 목적에 맞는 정보 구조와 디지털 경험을 설계합니다.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div></div>
<!-- /wp:cover -->
