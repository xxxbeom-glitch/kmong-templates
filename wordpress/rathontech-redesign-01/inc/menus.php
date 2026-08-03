<?php
/**
 * GNB IA — planning §4-1. Pattern: gnb-full-expand (46 / 45).
 */

if (!defined('ABSPATH')) {
  exit;
}

/**
 * @return array<int, array{id:string,label:string,href:string,children:array<int,array{label:string,href:string}>}>
 */
function rathon_gnb_items() {
  return array(
    array(
      'id'       => 'solutions',
      'label'    => __('솔루션', 'rathontech-redesign-01'),
      'href'     => rathon_url('solutions'),
      'children' => array(
        array('label' => __('전체 솔루션', 'rathontech-redesign-01'), 'href' => rathon_url('solutions')),
        array('label' => __('통합계정·권한관리', 'rathontech-redesign-01'), 'href' => rathon_url('solutions/identity-access-management')),
        array('label' => __('인증', 'rathontech-redesign-01'), 'href' => rathon_url('solutions/authentication')),
        array('label' => __('디렉토리', 'rathontech-redesign-01'), 'href' => rathon_url('solutions/directory')),
        array('label' => __('암호모듈', 'rathontech-redesign-01'), 'href' => rathon_url('solutions/cryptography')),
        array('label' => __('Zero Trust', 'rathontech-redesign-01'), 'href' => rathon_url('solutions/zero-trust')),
        array('label' => __('컨설팅', 'rathontech-redesign-01'), 'href' => rathon_url('solutions/consulting')),
      ),
    ),
    array(
      'id'       => 'products',
      'label'    => __('제품', 'rathontech-redesign-01'),
      'href'     => rathon_url('products'),
      'children' => array(
        array('label' => __('전체 제품', 'rathontech-redesign-01'), 'href' => rathon_url('products')),
        array('label' => 'Rathon-IAM', 'href' => rathon_url('products/rathon-iam')),
        array('label' => 'Rathon-SSO', 'href' => rathon_url('products/rathon-sso')),
        array('label' => 'Rathon-LDAP', 'href' => rathon_url('products/rathon-ldap')),
        array('label' => 'Rathon-AM', 'href' => rathon_url('products/rathon-am')),
        array('label' => 'RTJCrypto', 'href' => rathon_url('products/rtjcrypto')),
        array('label' => 'WinLogin', 'href' => rathon_url('products/winlogin')),
        array('label' => 'MFA', 'href' => rathon_url('products/mfa')),
        array('label' => 'Symantec SiteMinder', 'href' => rathon_url('products/symantec-siteminder')),
        array('label' => 'IBM-SAM', 'href' => rathon_url('products/ibm-sam')),
        array('label' => 'IBM-SDS', 'href' => rathon_url('products/ibm-sds')),
      ),
    ),
    array(
      'id'       => 'case-studies',
      'label'    => __('도입사례', 'rathontech-redesign-01'),
      'href'     => rathon_url('case-studies'),
      'children' => array(
        array('label' => __('전체 사례', 'rathontech-redesign-01'), 'href' => rathon_url('case-studies')),
        array('label' => __('솔루션별', 'rathontech-redesign-01'), 'href' => rathon_url('case-studies') . '#by-solution'),
        array('label' => __('산업별', 'rathontech-redesign-01'), 'href' => rathon_url('case-studies') . '#by-industry'),
      ),
    ),
    array(
      'id'       => 'support',
      'label'    => __('고객지원', 'rathontech-redesign-01'),
      'href'     => rathon_url('support/technical-support'),
      'children' => array(
        array('label' => __('기술지원 안내', 'rathontech-redesign-01'), 'href' => rathon_url('support/technical-support')),
        array('label' => __('문의하기', 'rathontech-redesign-01'), 'href' => rathon_url('contact')),
      ),
    ),
    array(
      'id'       => 'company',
      'label'    => __('회사', 'rathontech-redesign-01'),
      'href'     => rathon_url('company'),
      'children' => array(
        array('label' => __('회사소개', 'rathontech-redesign-01'), 'href' => rathon_url('company')),
        array('label' => __('고객사', 'rathontech-redesign-01'), 'href' => rathon_url('company/clients')),
        array('label' => __('인증현황', 'rathontech-redesign-01'), 'href' => rathon_url('company/certifications')),
        array('label' => __('ESG 경영', 'rathontech-redesign-01'), 'href' => rathon_url('company/esg')),
        array('label' => __('인재영입', 'rathontech-redesign-01'), 'href' => rathon_url('careers')),
      ),
    ),
  );
}
