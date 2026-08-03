<?php

if (!defined('ABSPATH')) {
  exit;
}

function rathon_asset_path($relative) {
  return get_template_directory() . '/assets/' . ltrim($relative, '/');
}

function rathon_asset_uri($relative) {
  return trailingslashit(get_template_directory_uri()) . 'assets/' . ltrim($relative, '/');
}

function rathon_asset_ver($relative) {
  $file = rathon_asset_path($relative);
  return file_exists($file) ? (string) filemtime($file) : RATHON_THEME_VERSION;
}

function rathon_enqueue_assets() {
  wp_enqueue_style(
    'rathon-fonts',
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css',
    array(),
    null
  );

  wp_enqueue_style(
    'rathon-tokens',
    rathon_asset_uri('css/tokens.css'),
    array('rathon-fonts'),
    rathon_asset_ver('css/tokens.css')
  );

  wp_enqueue_style(
    'rathon-base',
    rathon_asset_uri('css/base.css'),
    array('rathon-tokens'),
    rathon_asset_ver('css/base.css')
  );

  wp_enqueue_style(
    'rathon-header',
    rathon_asset_uri('css/header.css'),
    array('rathon-base'),
    rathon_asset_ver('css/header.css')
  );

  wp_enqueue_style(
    'rathon-footer',
    rathon_asset_uri('css/footer.css'),
    array('rathon-base'),
    rathon_asset_ver('css/footer.css')
  );

  wp_enqueue_script(
    'rathon-main',
    rathon_asset_uri('js/main.js'),
    array(),
    rathon_asset_ver('js/main.js'),
    true
  );

  wp_enqueue_script(
    'rathon-nav',
    rathon_asset_uri('js/nav.js'),
    array('rathon-main'),
    rathon_asset_ver('js/nav.js'),
    true
  );

  if (is_front_page()) {
    wp_enqueue_style(
      'rathon-home-hero',
      rathon_asset_uri('css/home-hero.css'),
      array('rathon-header'),
      rathon_asset_ver('css/home-hero.css')
    );

    wp_enqueue_style(
      'rathon-home-iss',
      rathon_asset_uri('css/home-iss.css'),
      array('rathon-home-hero'),
      rathon_asset_ver('css/home-iss.css')
    );
    wp_enqueue_script(
      'rathon-gsap',
      'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js',
      array(),
      '3.12.5',
      true
    );
    wp_enqueue_script(
      'rathon-scrolltrigger',
      'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js',
      array('rathon-gsap'),
      '3.12.5',
      true
    );
    wp_enqueue_script(
      'rathon-iss-slider',
      rathon_asset_uri('js/iss-slider.js'),
      array('rathon-scrolltrigger'),
      rathon_asset_ver('js/iss-slider.js'),
      true
    );
    wp_enqueue_style(
      'rathon-home-eco',
      rathon_asset_uri('css/home-ecosystem.css'),
      array('rathon-home-iss'),
      rathon_asset_ver('css/home-ecosystem.css')
    );
    wp_enqueue_style(
      'rathon-home-media',
      rathon_asset_uri('css/home-media.css'),
      array('rathon-home-eco'),
      rathon_asset_ver('css/home-media.css')
    );
    wp_enqueue_style(
      'rathon-home-evidence',
      rathon_asset_uri('css/home-evidence.css'),
      array('rathon-home-media'),
      rathon_asset_ver('css/home-evidence.css')
    );
    wp_enqueue_script(
      'rathon-evidence-pager',
      rathon_asset_uri('js/evidence-pager.js'),
      array(),
      rathon_asset_ver('js/evidence-pager.js'),
      true
    );
    wp_enqueue_style(
      'rathon-home-company',
      rathon_asset_uri('css/home-company.css'),
      array('rathon-home-evidence'),
      rathon_asset_ver('css/home-company.css')
    );
  }

  if (is_page_template('page-templates/product-rathon-iam.php') || is_page('rathon-iam')) {
    wp_enqueue_style(
      'rathon-product-iam',
      rathon_asset_uri('css/product-iam.css'),
      array('rathon-header'),
      rathon_asset_ver('css/product-iam.css')
    );
  }
}
add_action('wp_enqueue_scripts', 'rathon_enqueue_assets');
