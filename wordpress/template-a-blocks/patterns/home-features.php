<?php
/**
 * Title: Home Features
 * slug: template-a-blocks/home-features
 * Categories: featured
 */
$img1 = esc_url(get_theme_file_uri('assets/images/feature-bg-01.jpg'));
$img2 = esc_url(get_theme_file_uri('assets/images/feature-bg-02.jpg'));
$img3 = esc_url(get_theme_file_uri('assets/images/feature-bg-03.jpg'));
$img4 = esc_url(get_theme_file_uri('assets/images/feature-bg-04.webp'));
?>
<!-- wp:group {"align":"full","className":"section section--features","style":{"spacing":{"padding":{"top":"5rem","bottom":"5rem"}}},"layout":{"type":"constrained","contentSize":"1600px"}} -->
<div class="wp-block-group alignfull section section--features" style="padding-top:5rem;padding-bottom:5rem">
	<!-- wp:heading {"textAlign":"center","fontSize":"x-large"} -->
	<h2 class="wp-block-heading has-text-align-center has-x-large-font-size">필요한 정보가 자연스럽게 읽히고,<br>문의로 이어지는 흐름을 설계합니다.</h2>
	<!-- /wp:heading -->

	<!-- wp:spacer {"height":"2.5rem"} -->
	<div style="height:2.5rem" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:columns -->
	<div class="wp-block-columns">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:image {"sizeSlug":"large"} -->
			<figure class="wp-block-image size-large"><img src="<?php echo $img1; ?>" alt=""/></figure>
			<!-- /wp:image -->
			<!-- wp:heading {"level":3,"fontSize":"large"} -->
			<h3 class="wp-block-heading has-large-font-size">첫 화면에서 전달되는 명확한 인상</h3>
			<!-- /wp:heading -->
			<!-- wp:paragraph -->
			<p>방문자가 처음 마주하는 화면에서 브랜드의 방향과 핵심 메시지를 분명하게 전달합니다.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:image {"sizeSlug":"large"} -->
			<figure class="wp-block-image size-large"><img src="<?php echo $img2; ?>" alt=""/></figure>
			<!-- /wp:image -->
			<!-- wp:heading {"level":3,"fontSize":"large"} -->
			<h3 class="wp-block-heading has-large-font-size">목적에 맞게 확장되는 섹션 구조</h3>
			<!-- /wp:heading -->
			<!-- wp:paragraph -->
			<p>기업, 브랜드, 병원, 전문 서비스 등 업종별로 필요한 콘텐츠를 유연하게 구성합니다.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:image {"sizeSlug":"large"} -->
			<figure class="wp-block-image size-large"><img src="<?php echo $img3; ?>" alt=""/></figure>
			<!-- /wp:image -->
			<!-- wp:heading {"level":3,"fontSize":"large"} -->
			<h3 class="wp-block-heading has-large-font-size">문의까지 이어지는 사용자 동선</h3>
			<!-- /wp:heading -->
			<!-- wp:paragraph -->
			<p>소개와 강점, 사례, FAQ, 문의 영역을 자연스럽게 연결해 다음 행동을 쉽게 만듭니다.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:image {"sizeSlug":"large"} -->
			<figure class="wp-block-image size-large"><img src="<?php echo $img4; ?>" alt=""/></figure>
			<!-- /wp:image -->
			<!-- wp:heading {"level":3,"fontSize":"large"} -->
			<h3 class="wp-block-heading has-large-font-size">운영과 확장을 고려한 구축 방식</h3>
			<!-- /wp:heading -->
			<!-- wp:paragraph -->
			<p>콘텐츠 수정과 페이지 추가, 기능 확장까지 고려해 지속적으로 활용할 수 있는 구조를 만듭니다.</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
