<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$_SERVER['HTTP_HOST']       = 'wonkangmetal.test';
$_SERVER['REQUEST_SCHEME']  = 'http';
$_SERVER['SERVER_NAME']     = 'wonkangmetal.test';

define('WP_USE_THEMES', false);
define('WP_INSTALLING', true);

echo "start\n";

require 'C:/laragon/www/wonkangmetal/wp-load.php';

echo "loaded\n";

if (!get_option('siteurl')) {
    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    wp_install('원강금속', 'admin', 'admin@wonkangmetal.test', true, '', 'admin');
    echo "installed\n";
} else {
    echo "already_installed: " . get_option('siteurl') . "\n";
}

update_option('permalink_structure', '/%postname%/');

$front = get_page_by_path('home');
if (!$front) {
    $front_id = wp_insert_post(
        array(
            'post_title'  => 'Home',
            'post_name'   => 'home',
            'post_status' => 'publish',
            'post_type'   => 'page',
        )
    );
} else {
    $front_id = $front->ID;
}

update_option('show_on_front', 'page');
update_option('page_on_front', $front_id);

switch_theme('wonkangmetal');
flush_rewrite_rules(true);

if (function_exists('wonkangmetal_maybe_seed_product_samples')) {
    wonkangmetal_maybe_seed_product_samples();
}

echo 'active_theme: ' . get_option('stylesheet') . "\n";
echo 'permalink: ' . get_option('permalink_structure') . "\n";
echo 'home: ' . home_url('/') . "\n";
echo 'product_archive: ' . get_post_type_archive_link('product') . "\n";

$term = get_term_by('slug', 'pump-general', 'product_category');
if ($term && !is_wp_error($term)) {
    echo 'category_url: ' . get_term_link($term) . "\n";
}

$post = get_page_by_path('casing-pump-general', OBJECT, 'product');
if ($post) {
    echo 'single_url: ' . get_permalink($post) . "\n";
}

$counts = wp_count_posts('product');
echo 'product_count: ' . (isset($counts->publish) ? $counts->publish : 0) . "\n";

echo "done\n";
