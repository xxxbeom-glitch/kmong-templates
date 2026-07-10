<?php

$base = 'http://127.0.0.1';
$host = 'wonkangmetal.test';
$checks = array(
    array('name' => 'home', 'path' => '/', 'must' => array('home-solution', 'parts-list__link', '/product/category/pump-general/')),
    array('name' => 'product_archive', 'path' => '/product/', 'must' => array('post-type-archive-product', 'product-archive', 'product-card')),
    array('name' => 'category_pump_general', 'path' => '/product/category/pump-general/', 'must' => array('tax-product_category', 'product-part-filter', 'Casing', 'Impeller')),
    array('name' => 'single_casing', 'path' => '/product/casing-pump-general/', 'must' => array('single-product', 'casing-pump-general', 'Casing')),
    array('name' => 'part_casing_filter', 'path' => '/product/category/pump-general/?part=casing', 'must' => array('product-part-filter', 'part=casing')),
);

foreach ($checks as $check) {
    $ch = curl_init($base . $check['path']);
    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTPHEADER => array('Host: ' . $host),
        CURLOPT_TIMEOUT => 20,
    ));
    $body = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $fail = array();
    foreach ($check['must'] as $needle) {
        if (strpos($body, $needle) === false) {
            $fail[] = $needle;
        }
    }
    echo $check['name'] . "\t" . $code . "\t" . (empty($fail) ? 'PASS' : 'FAIL missing:' . implode(',', $fail)) . "\n";
}
