<?php
/**
 * Legal policy pages — placeholder prose (P2-3)
 *
 * @var array $args policy (privacy|email), title
 */
$args   = isset($args) ? $args : array();
$policy = isset($args['policy']) ? $args['policy'] : 'privacy';
$title  = isset($args['title']) ? $args['title'] : get_the_title();
?>
<article <?php post_class('sub-page page-legal'); ?>>
  <div class="si-inner sub-page__inner">
    <div class="page-legal__content entry-content">
      <?php if ($policy === 'email') : ?>
        <p><?php esc_html_e('본 웹사이트에 게시된 이메일 주소는 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부합니다.', 'wonkangmetal'); ?></p>
        <p><?php esc_html_e('이를 위반 시 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령에 의해 형사처벌될 수 있습니다.', 'wonkangmetal'); ?></p>
        <p class="page-legal__note"><?php esc_html_e('전문 약관 본문은 P2-5 단계에서 원본 콘텐츠로 교체 예정입니다.', 'wonkangmetal'); ?></p>
      <?php else : ?>
        <p><?php esc_html_e('원강금속(주)(이하 “회사”)는 이용자의 개인정보를 중요시하며, 관련 법령을 준수합니다.', 'wonkangmetal'); ?></p>
        <h2><?php esc_html_e('1. 수집하는 개인정보 항목', 'wonkangmetal'); ?></h2>
        <p><?php esc_html_e('견적문의 등 서비스 제공 시 이름, 연락처, 이메일 등 필요한 항목을 수집할 수 있습니다. (문의 폼은 이후 단계에서 구성)', 'wonkangmetal'); ?></p>
        <h2><?php esc_html_e('2. 개인정보의 이용 목적', 'wonkangmetal'); ?></h2>
        <p><?php esc_html_e('문의 응대, 서비스 제공, 고지 사항 전달 등 이용자 요청 처리를 위해 이용합니다.', 'wonkangmetal'); ?></p>
        <h2><?php esc_html_e('3. 보유 및 이용 기간', 'wonkangmetal'); ?></h2>
        <p><?php esc_html_e('목적 달성 후 지체 없이 파기하며, 관련 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관합니다.', 'wonkangmetal'); ?></p>
        <p class="page-legal__note">
          <?php
          printf(
            /* translators: %s: policy page title */
            esc_html__('%s 전문은 P2-5 단계에서 원본 콘텐츠로 교체 예정입니다.', 'wonkangmetal'),
            esc_html($title)
          );
          ?>
        </p>
      <?php endif; ?>
    </div>
  </div>
</article>
