(function ($) {
  'use strict';

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  $(window).on('beforeunload', function () {
    window.scrollTo(0, 0);
  });

  var $header = $('.kn-header');
  var $hero = $('.kn-hero');
  var $track = $('.kn-hero__track');
  var slideCount = $('.kn-hero__slide').length;
  var heroIndex = 0;
  var $pager = $('.kn-hero__pager span');
  var $counter = $('.kn-hero__current');
  var bandIndex = 0;
  var $bandItems = $('.top-band__item');

  function setHeroSlide(i) {
    heroIndex = i;
    $track.css('transform', 'translateX(-' + i * 100 + '%)');
    $pager.removeClass('is-active').eq(i).addClass('is-active');
    $counter.text(String(i + 1).padStart(2, '0'));
  }

  function tickHero() {
    setHeroSlide((heroIndex + 1) % slideCount);
  }

  function tickBand() {
    $bandItems.removeClass('is-active');
    bandIndex = (bandIndex + 1) % $bandItems.length;
    $bandItems.eq(bandIndex).addClass('is-active');
  }

  function updateHeader() {
    if (!$hero.length) return;
    var heroBottom = $hero.offset().top + $hero.outerHeight();
    var scrollY = window.scrollY || window.pageYOffset;
    var pastHero = scrollY > heroBottom - $header.outerHeight() - 8;
    $header.toggleClass('is-solid', pastHero);
    $header.toggleClass('is-over-hero', !pastHero);
  }

  setInterval(tickHero, 5000);
  if ($bandItems.length > 1) {
    setInterval(tickBand, 4000);
  }

  $(window).on('scroll', updateHeader);
  updateHeader();
  setHeroSlide(0);

  $('.kn-nav__menu').on('click', function () {
    var expanded = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', !expanded);
    $('#mobile-drawer').prop('hidden', expanded);
  });

  $('.kn-chips__btn').on('click', function () {
    $('.kn-chips__btn').removeClass('is-active').attr('aria-selected', 'false');
    $(this).addClass('is-active').attr('aria-selected', 'true');
  });
})(jQuery);
