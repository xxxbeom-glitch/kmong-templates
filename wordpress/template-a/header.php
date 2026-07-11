<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
  <header class="site-header" data-header-mega>
    <div class="site-header__bar">
      <div class="site-header__shell site-header__inner">
        <a class="site-header__logo" href="<?php echo esc_url(home_url('/')); ?>">TENFOLD STUDIO</a>
        <div class="site-header__menu">
          <nav class="site-header__nav" aria-label="주요 메뉴">
                        <ul class="site-header__list">
              <li class="site-header__item site-header__item--has-mega">
                <a href="<?php echo esc_url(home_url('/about/greeting/')); ?>" class="site-header__link site-header__trigger" aria-haspopup="true" aria-expanded="false">회사소개</a>
              </li>
              <li class="site-header__item site-header__item--has-mega">
                <a href="<?php echo esc_url(home_url('/service/solution/')); ?>" class="site-header__link site-header__trigger" aria-haspopup="true" aria-expanded="false">서비스</a>
              </li>
              <li class="site-header__item site-header__item--has-mega">
                <a href="<?php echo esc_url(home_url('/business/')); ?>" class="site-header__link site-header__trigger" aria-haspopup="true" aria-expanded="false">사업영역</a>
              </li>
              <li class="site-header__item site-header__item--has-mega">
                <a href="<?php echo esc_url(get_post_type_archive_link('notice')); ?>" class="site-header__link site-header__trigger" aria-haspopup="true" aria-expanded="false">고객지원</a>
              </li>
            </ul>
          </nav>
          <a class="btn-cta btn-cta--header" href="<?php echo esc_url(home_url('/contact/')); ?>">프로젝트 의뢰하기</a>
          <button type="button" class="site-header__menu-btn" aria-label="메뉴 열기" aria-controls="mobile-nav" aria-expanded="false">
            <span class="site-header__menu-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
    <nav id="mobile-nav" class="site-header__drawer" hidden inert aria-label="전체 메뉴">
      <div class="site-header__drawer-inner">
        <ul class="site-header__drawer-list">
          <li class="site-header__drawer-item">
            <button type="button" class="site-header__drawer-toggle" aria-expanded="false" aria-controls="drawer-about">회사소개</button>
            <ul id="drawer-about" class="site-header__drawer-sub" hidden>
              <li><a class="site-header__drawer-link" href="<?php echo esc_url(home_url('/about/greeting/')); ?>">회사소개</a></li>
              <li><a class="site-header__drawer-link" href="<?php echo esc_url(home_url('/about/ceo/')); ?>">CEO 메시지</a></li>
              <li><a class="site-header__drawer-link" href="<?php echo esc_url(home_url('/about/directions/')); ?>">오시는 길</a></li>
            </ul>
          </li>
          <li class="site-header__drawer-item">
            <button type="button" class="site-header__drawer-toggle" aria-expanded="false" aria-controls="drawer-service">서비스</button>
            <ul id="drawer-service" class="site-header__drawer-sub" hidden>
              <li><a class="site-header__drawer-link" href="<?php echo esc_url(home_url('/service/solution/')); ?>">서비스 소개</a></li>
              <li><a class="site-header__drawer-link" href="<?php echo esc_url(home_url('/service/process/')); ?>">진행 프로세스</a></li>
              <li><a class="site-header__drawer-link" href="<?php echo esc_url(home_url('/service/portfolio/')); ?>">제작 사례</a></li>
            </ul>
          </li>
          <li class="site-header__drawer-item">
            <button type="button" class="site-header__drawer-toggle" aria-expanded="false" aria-controls="drawer-business">사업영역</button>
            <ul id="drawer-business" class="site-header__drawer-sub" hidden>
              <li><a class="site-header__drawer-link" href="<?php echo esc_url(home_url('/business/#business-corporate')); ?>">기업 홈페이지</a></li>
              <li><a class="site-header__drawer-link" href="<?php echo esc_url(home_url('/business/#business-brand')); ?>">브랜드 사이트</a></li>
            </ul>
          </li>
          <li class="site-header__drawer-item">
            <button type="button" class="site-header__drawer-toggle" aria-expanded="false" aria-controls="drawer-support">고객지원</button>
            <ul id="drawer-support" class="site-header__drawer-sub" hidden>
              <li><a class="site-header__drawer-link" href="<?php echo esc_url(get_post_type_archive_link('notice')); ?>">주요 소식</a></li>
              <li><a class="site-header__drawer-link" href="<?php echo esc_url(home_url('/contact/')); ?>">문의하기</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    <div id="gnb-mega-panel" class="site-header__mega" hidden inert>
      <div class="site-header__shell site-header__mega-inner">
                <ul class="site-header__mega-list">
          <li class="site-header__mega-col">
            <ul class="site-header__mega-sub">
              <li><a class="site-header__sublink" href="<?php echo esc_url(home_url('/about/greeting/')); ?>">회사소개</a></li>
              <li><a class="site-header__sublink" href="<?php echo esc_url(home_url('/about/ceo/')); ?>">CEO 메시지</a></li>
              <li><a class="site-header__sublink" href="<?php echo esc_url(home_url('/about/directions/')); ?>">오시는 길</a></li>
            </ul>
          </li>
          <li class="site-header__mega-col">
            <ul class="site-header__mega-sub">
              <li><a class="site-header__sublink" href="<?php echo esc_url(home_url('/service/solution/')); ?>">서비스 소개</a></li>
              <li><a class="site-header__sublink" href="<?php echo esc_url(home_url('/service/process/')); ?>">진행 프로세스</a></li>
              <li><a class="site-header__sublink" href="<?php echo esc_url(home_url('/service/portfolio/')); ?>">제작 사례</a></li>
            </ul>
          </li>
          <li class="site-header__mega-col">
            <ul class="site-header__mega-sub">
              <li><a class="site-header__sublink" href="<?php echo esc_url(home_url('/business/#business-corporate')); ?>">기업 홈페이지</a></li>
              <li><a class="site-header__sublink" href="<?php echo esc_url(home_url('/business/#business-brand')); ?>">브랜드 사이트</a></li>
            </ul>
          </li>
          <li class="site-header__mega-col">
            <ul class="site-header__mega-sub">
              <li><a class="site-header__sublink" href="<?php echo esc_url(get_post_type_archive_link('notice')); ?>">주요 소식</a></li>
              <li><a class="site-header__sublink" href="<?php echo esc_url(home_url('/contact/')); ?>">문의하기</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="site-header__dim" hidden aria-hidden="true"></div>
  </header>
