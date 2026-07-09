/**
 * Creative 08 — design overrides (04-working-copy only)
 */
(function () {
  'use strict';

  function initTestimonialMarquee() {
    var root = document.getElementById('wc-testimonial-carousel');
    if (!root || root.dataset.wcMarquee === '1') return;

    var slides = root.querySelectorAll('.swiper-slide');
    if (!slides.length) return;

    var carousel = root.querySelector('.ui-e-carousel');
    var host = root.querySelector('.elementor-widget-container');
    if (!carousel || !host) return;

    root.dataset.wcMarquee = '1';
    root.classList.add('wc-marquee-active');

    var marquee = document.createElement('div');
    marquee.className = 'wc-testimonial-marquee';
    var track = document.createElement('div');
    track.className = 'wc-testimonial-marquee__track';

    function cardFromSlide(slide) {
      var card = document.createElement('div');
      card.className = 'wc-testimonial-marquee__card';
      var content = slide.querySelector('.ui-e-content');
      if (content) card.appendChild(content.cloneNode(true));
      return card;
    }

    var cards = [];
    slides.forEach(function (slide) {
      cards.push(cardFromSlide(slide));
    });

    cards.concat(cards).forEach(function (card) {
      track.appendChild(card);
    });

    marquee.appendChild(track);
    host.appendChild(marquee);

    requestAnimationFrame(function () {
      var half = track.scrollWidth / 2;
      var pxPerSec = 45;
      var duration = Math.max(20, half / pxPerSec);
      track.style.setProperty('--wc-marquee-duration', duration + 's');
    });
  }

  function initFaqAccordion() {
    var root = document.getElementById('wc-faq-section');
    if (!root || root.dataset.wcFaqInit) return;

    var accordion = root.querySelector('.ui-e-accordion');
    if (!accordion) return;

    var items = accordion.querySelectorAll('.ui-e-accordion-item');
    if (!items.length) return;

    function hasJqClickHandler(el) {
      if (!window.jQuery || !window.jQuery._data) return false;
      var events = window.jQuery._data(el, 'events');
      return !!(events && events.click && events.click.length);
    }

    function bindHandlers() {
      items.forEach(function (item) {
        item.addEventListener('click', onToggle);
        item.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') onToggle.call(item, e);
        });
      });
    }

    function onToggle(e) {
      if (e.target.closest('a')) return;
      e.preventDefault();

      var item = this;
      var isOpen = item.classList.contains('ui-open');
      var content = item.querySelector('.ui-e-accordion-content');

      items.forEach(function (other) {
        if (other === item) return;
        other.classList.remove('ui-open');
        other.setAttribute('aria-expanded', 'false');
        var otherContent = other.querySelector('.ui-e-accordion-content');
        if (otherContent) otherContent.style.display = 'none';
      });

      if (!content) return;

      if (isOpen) {
        item.classList.remove('ui-open');
        item.setAttribute('aria-expanded', 'false');
        content.style.display = 'none';
      } else {
        item.classList.add('ui-open');
        item.setAttribute('aria-expanded', 'true');
        content.style.display = '';
      }
    }

    function tryBind() {
      if (root.dataset.wcFaqInit) return;
      if (hasJqClickHandler(items[0])) {
        root.dataset.wcFaqInit = 'elementor';
        return;
      }
      root.dataset.wcFaqInit = 'custom';
      bindHandlers();
    }

    window.setTimeout(tryBind, 1200);
    window.setTimeout(tryBind, 2500);
  }

  function initDoodoorimFloat() {
    var form = document.querySelector('.fix_form');
    var topWrap = document.querySelector('.fix_btn');
    if (!form || form.dataset.wcDdFloat === '1') return;

    form.dataset.wcDdFloat = '1';

    var topBtn = topWrap && topWrap.querySelector('.top_btn');
    if (topBtn) {
      topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
    }

    var category = document.getElementById('qCategory');
    if (category) {
      var selectWrap = category.closest('.select');
      function syncCategoryPlaceholder() {
        if (selectWrap) selectWrap.classList.toggle('is-filled', category.value !== '');
      }
      category.addEventListener('change', syncCategoryPlaceholder);
      syncCategoryPlaceholder();
    }

    var dateInput = document.getElementById('datepicker');
    if (dateInput) {
      dateInput.addEventListener('input', function () {
        var digits = dateInput.value.replace(/\D/g, '').slice(0, 8);
        if (digits.length <= 4) dateInput.value = digits;
        else if (digits.length <= 6) dateInput.value = digits.slice(0, 4) + '/' + digits.slice(4);
        else dateInput.value = digits.slice(0, 4) + '/' + digits.slice(4, 6) + '/' + digits.slice(6);
      });
    }

    var phoneInput = document.getElementById('qPhone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function () {
        phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
      });
    }

    var submitBtn = form.querySelector('.form_submit');
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        if (!category || !category.value) {
          window.alert('상담내용을 선택해주세요.');
          if (category) category.focus();
          return;
        }
        if (!dateInput || !dateInput.value) {
          window.alert('희망날짜를 선택해주세요.');
          if (dateInput) dateInput.focus();
          return;
        }
        var nameInput = document.getElementById('qName');
        if (!nameInput || !nameInput.value.trim()) {
          window.alert('성함을 입력해주세요.');
          if (nameInput) nameInput.focus();
          return;
        }
        if (!phoneInput || phoneInput.value.length < 10 || phoneInput.value.length > 11) {
          window.alert('연락처는 10~11자리로 입력해주세요.');
          if (phoneInput) phoneInput.focus();
          return;
        }
        window.alert('상담 신청이 정상적으로 접수되었습니다.');
      });
    }

    var prevScroll = 0;

    function updateFixFormScroll() {
      var currentScroll = window.scrollY || window.pageYOffset;
      if (currentScroll <= 10) {
        form.classList.remove('scroll_down', 'scroll_up');
      } else if (currentScroll > prevScroll) {
        form.classList.add('scroll_down');
        form.classList.remove('scroll_up');
      } else {
        form.classList.remove('scroll_down');
        form.classList.add('scroll_up');
      }
      prevScroll = currentScroll;
    }

    function updateFloatVisibility() {
      var scrollTop = window.scrollY || window.pageYOffset;
      var windowHeight = window.innerHeight;
      var docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= docHeight - 100) form.classList.add('hide');
      else form.classList.remove('hide');

      if (topWrap) {
        if (scrollTop <= 100) topWrap.classList.remove('show');
        else topWrap.classList.add('show');
      }

      updateFixFormScroll();
    }

    updateFloatVisibility();
    window.addEventListener('scroll', updateFloatVisibility, { passive: true });
  }

  function initDoodoorimHeader() {
    if (window.innerWidth < 1025) return;

    var header = document.getElementById('wrapper-navbar');
    if (!header || header.dataset.wcDdHeader === '1') return;

    header.dataset.wcDdHeader = '1';
    header.classList.add('wc-dd-header');

    header.querySelectorAll('.wc-mega-panel').forEach(function (panel) {
      panel.remove();
    });
    header.classList.remove('wc-mega-open');
    delete header.dataset.wcMega;

    var navMenu = header.querySelector('.uicore-nav-menu');
    var menuContainer = header.querySelector('.uicore-menu-container');
    if (!navMenu || !menuContainer) return;

    if (!menuContainer.querySelector('.wc-gnb-bg')) {
      var bg = document.createElement('div');
      bg.className = 'wc-gnb-bg';
      bg.setAttribute('aria-hidden', 'true');
      menuContainer.appendChild(bg);
    }

    var scrollPosition = 0;
    var previousScroll = 0;

    function updateTopState() {
      if (!header.classList.contains('wc-gnb-open')) {
        if (scrollPosition <= 99) header.classList.add('wc-header-top');
        else header.classList.remove('wc-header-top');
      }
    }

    function updateHeaderState() {
      scrollPosition = window.scrollY || window.pageYOffset;

      if (scrollPosition > 100) header.classList.add('wc-header-scrolled');
      else header.classList.remove('wc-header-scrolled');

      if (scrollPosition > previousScroll && scrollPosition > 10) {
        header.classList.add('wc-header-down');
        header.classList.remove('wc-header-up');
      } else {
        header.classList.remove('wc-header-down');
        header.classList.add('wc-header-up');
      }

      previousScroll = scrollPosition;
      updateTopState();
    }

    var nav = header.querySelector('nav.uicore.elementor-container');
    if (nav) {
      nav.addEventListener('mouseenter', function () {
        header.classList.add('wc-gnb-open');
        header.classList.remove('wc-header-top');
      });

      nav.addEventListener('mouseleave', function () {
        header.classList.remove('wc-gnb-open');
        updateTopState();
      });
    }

    header.classList.remove('wc-header-down');
    header.classList.add('wc-header-up');
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  function setViewportHeightUnit() {
    document.documentElement.style.setProperty('--wc-vh', window.innerHeight * 0.01 + 'px');
  }

  function initHeroProgress() {
    var hero = document.getElementById('wc-hero-section');
    if (!hero || hero.dataset.wcHeroProgress === '1') return;

    var bar = hero.querySelector('.wc-hero-controls__bar');
    if (!bar) return;

    hero.dataset.wcHeroProgress = '1';

    var duration = 7000;
    var timerId;

    function runBar() {
      clearTimeout(timerId);
      bar.style.transition = 'none';
      bar.style.width = '0%';
      bar.offsetHeight;
      bar.style.transition = 'width ' + duration + 'ms linear';
      bar.style.width = '100%';
      timerId = window.setTimeout(runBar, duration);
    }

    runBar();
  }

  function initIntroFill() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    var section = document.getElementById('wc-intro-section');
    if (!section) return;

    var span = section.querySelector('.wc-fill-txt span');
    if (!span) return;

    if (section._wcIntroMm) {
      section._wcIntroMm.revert();
      section._wcIntroMm = null;
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.set(span, { backgroundSize: '0% 100%' });

    section._wcIntroMm = ScrollTrigger.matchMedia({
      '(min-width: 1240px)': function () {
        gsap
          .timeline({
            scrollTrigger: {
              id: 'wc-intro-pin',
              trigger: section,
              start: 'top top',
              end: '+=300%',
              scrub: true,
              pin: true,
              anticipatePin: 1,
              pinSpacing: false,
              invalidateOnRefresh: true,
            },
          })
          .to(span, { backgroundSize: '100% 100%', ease: 'none' });
      },
      '(max-width: 1239px)': function () {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'center 40%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .to(span, { backgroundSize: '100% 100%', ease: 'none' });
      },
    });

    ScrollTrigger.refresh();
  }

  function initInnovationSwiper() {
    var section = document.getElementById('wc-innovation-section');
    if (!section || section._wcInnovationSwiper) return;

    var swiperEl = section.querySelector('.onetenth-swiper');
    if (!swiperEl || typeof Swiper === 'undefined') return;

    var titles = ['클라우드매니저', '인사이트 AI', '시큐어가드', '플렉스오토메이트', '브랜드빌더'];
    var paginationEl = section.querySelector('.onetenth-container .swiper-pagination');

    section._wcInnovationSwiper = new Swiper(swiperEl, {
      slidesPerView: 1.3,
      spaceBetween: 12,
      breakpoints: {
        768: { slidesPerView: 1.9, spaceBetween: 20 },
        1024: { slidesPerView: 1.9, spaceBetween: 20 },
      },
      autoplay: { delay: 3000, disableOnInteraction: false },
      loop: true,
      pagination: {
        el: paginationEl,
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + titles[index] + '</span>';
        },
      },
    });

    var slideNextBtn = section.querySelector('.onetenth-swiper .slide-next-btn');
    if (slideNextBtn) {
      slideNextBtn.addEventListener('click', function () {
        section._wcInnovationSwiper.slideNext();
      });
    }
  }

  function disableUiCoreCursor() {
    document.querySelectorAll('.ui-cursor').forEach(function (el) {
      el.remove();
    });
  }

  function boot() {
    setViewportHeightUnit();
    disableUiCoreCursor();
    initTestimonialMarquee();
    initDoodoorimHeader();
    initDoodoorimFloat();
    initFaqAccordion();
    initHeroProgress();
    window.setTimeout(initTestimonialMarquee, 600);
    window.setTimeout(initDoodoorimHeader, 600);
    window.setTimeout(initDoodoorimFloat, 600);
    window.setTimeout(initFaqAccordion, 600);
    window.setTimeout(initHeroProgress, 600);
  }

  function bootAfterLoad() {
    setViewportHeightUnit();
    initIntroFill();
    initInnovationSwiper();
    window.setTimeout(initIntroFill, 400);
    window.setTimeout(initInnovationSwiper, 400);
    window.setTimeout(initIntroFill, 1200);
    window.setTimeout(initInnovationSwiper, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  window.addEventListener('load', function () {
    disableUiCoreCursor();
    boot();
    bootAfterLoad();
  });
  window.addEventListener('resize', function () {
    setViewportHeightUnit();
    initDoodoorimHeader();
    initDoodoorimFloat();
    initFaqAccordion();
    initIntroFill();
    initInnovationSwiper();
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });
})();
