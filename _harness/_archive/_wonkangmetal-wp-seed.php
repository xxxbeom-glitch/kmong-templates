<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$_SERVER['HTTP_HOST']      = 'wonkangmetal.test';
$_SERVER['REQUEST_SCHEME'] = 'http';

define('WP_USE_THEMES', false);
require 'C:/laragon/www/wonkangmetal/wp-load.php';

delete_option('wonkangmetal_product_samples_seeded');
wonkangmetal_seed_product_samples();
flush_rewrite_rules(true);

echo 'product_archive: ' . get_post_type_archive_link('product') . "\n";

$term = get_term_by('slug', 'pump-general', 'product_category');
echo 'category_url: ' . ($term ? get_term_link($term) : 'missing') . "\n";

$post = get_page_by_path('casing-pump-general', OBJECT, 'product');
echo 'single_url: ' . ($post ? get_permalink($post) : 'missing') . "\n";

$counts = wp_count_posts('product');
echo 'product_count: ' . (isset($counts->publish) ? $counts->publish : 0) . "\n";
