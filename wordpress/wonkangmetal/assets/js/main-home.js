/**
 * Main page interactions — ported from mirror js/s_script.js (main modules only).
 */
(function () {
  'use strict';

  var CFG = {
    SWIPER: { delay: 10000, speed: 800 },
    AOS: { duration: 800, once: false, mirror: true },
  };

  function $(s, r) {
    return (r || document).querySelector(s);
  }

  function $$(s, r) {
    return Array.from((r || document).querySelectorAll(s));
  }

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    if (window.Splitting) {
      window.__splitting = Splitting({ target: '[data-splitting]' });
    }
    if (window.AOS) {
      window.addEventListener('load', function () {
        AOS.init(CFG.AOS);
      });
    }

    if (typeof Swiper !== 'undefined') {
      initMainVisual(CFG);
      initBoard();
      initBusinessMobileSwiper();
      initVisionSwiper();
    }

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({
        ignoreMobileResize: true,
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      });

      initBusiness(CFG);
      initStats();
      bindSplitTitleAos();

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () {
          ScrollTrigger.refresh();
        });
      }
      window.addEventListener(
        'load',
        function () {
          if (window.AOS) AOS.refresh();
          ScrollTrigger.refresh();
        },
        { once: true }
      );
    }

    initVisionSticky();
  });

  function bindSplitTitleAos() {
    document.addEventListener('aos:in', function (ev) {
      var wrap = ev.detail && ev.detail.el ? ev.detail.el : ev.target;
      var title = wrap && wrap.querySelector ? wrap.querySelector('.split-title') : null;
      if (!title || typeof gsap === 'undefined') return;
      var chars = title.querySelectorAll('.char');
      if (!chars.length || title.dataset.animating === '1') return;
      title.dataset.animating = '1';
      gsap.fromTo(
        chars,
        { yPercent: 25, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.02,
          onComplete: function () {
            title.dataset.animating = '0';
          },
        }
      );
    });

    document.addEventListener('aos:out', function (ev) {
      var wrap = ev.detail && ev.detail.el ? ev.detail.el : ev.target;
      var title = wrap && wrap.querySelector ? wrap.querySelector('.split-title') : null;
      if (!title || typeof gsap === 'undefined') return;
      var chars = title.querySelectorAll('.char');
      if (!chars.length) return;
      gsap.set(chars, { yPercent: 25, autoAlpha: 0 });
    });
  }

  function initMainVisual(cfg) {
    var root = $('.main_visual .swiper');
    if (!root || typeof Swiper === 'undefined') return;

    var CHAR_DUR = 0.5;
    var CHAR_STAG = 0.05;
    var EXTRA = 0.05;
    var CAP_ADV = 0.25;

    new Swiper(root, {
      loop: true,
      navigation: {
        nextEl: '.main_visual .swiper-button-next',
        prevEl: '.main_visual .swiper-button-prev',
      },
      autoplay: { delay: cfg.SWIPER.delay, disableOnInteraction: false },
      effect: 'fade',
      speed: cfg.SWIPER.speed,
      on: {
        init: function (s) {
          reset(s);
          play(s);
        },
        slideChangeTransitionStart: reset,
        slideChangeTransitionEnd: play,
      },
    });

    function reset(s) {
      s.slides.forEach(function (sl) {
        sl.classList.remove('is-anim');
        var cap = sl.querySelector('.sub_caption');
        if (cap) cap.style.animationDelay = '0s';
      });
    }

    function play(s) {
      var a = s.slides[s.activeIndex];
      if (!a) return;
      var maxLen = Math.max.apply(
        null,
        [0].concat(
          Array.from(a.querySelectorAll('[data-splitting]'), function (el) {
            return el.querySelectorAll('.char').length;
          })
        )
      );
      var cap = a.querySelector('.sub_caption');
      if (cap) {
        var d = maxLen ? CHAR_DUR + CHAR_STAG * (maxLen - 1) + EXTRA - CAP_ADV : 0;
        cap.style.animationDelay = Math.max(0, d).toFixed(2) + 's';
      }
      a.classList.add('is-anim');
    }
  }

  function initBusiness(cfg) {
    var root = $('.main_business');
    if (!root) return;

    gsap.context(function () {
      var section = root;
      var slider = $('.business_slider', section);
      var title = $('.business_title', section);
      if (!slider || !title) return;

      upgradeMaskFillToWidthReveal($('.mask-fill', title));

      var wrap = slider.querySelector('.business_slider_wrap');
      var images = wrap ? $$('.image', wrap) : [];
      var txtWrap = slider.querySelector('.txt');
      var pag = slider.querySelector('.slider_pagenation');
      if (!wrap || !images.length || !txtWrap || !pag) return;

      var subEl = $('span', txtWrap);
      var h3El = $('h3', txtWrap);
      var pEl = $('p', txtWrap);
      var curEl = $('.current_number', pag);
      var totEl = $('.total_number', pag);

      var COPIES = images.map(function (_, i) {
        var slide = txtWrap.closest('.main_business').querySelectorAll('.business_slider_m .swiper-slide')[i];
        if (slide) {
          var t = slide.querySelector('.txt');
          return {
            sub: $('span', t) ? $('span', t).textContent : '',
            ttl: $('h3', t) ? $('h3', t).textContent : '',
            body: $('p', t) ? $('p', t).innerHTML : '',
          };
        }
        return { sub: '', ttl: '', body: '' };
      });

      if (totEl) totEl.textContent = String(images.length);
      if (curEl) curEl.textContent = '1';

      var D = 0.001;
      var H = 0.001;
      var cur = 0;
      switchTo(0);

      var pairs = [];
      $$('.mask-fill .line1, .mask-fill .line2, .mask-fill .line3', title).forEach(function (ln) {
        var base = ln.querySelector('.base');
        var reveal = ln.querySelector('.reveal');
        if (base && reveal) pairs.push({ line: ln, base: base, reveal: reveal });
      });

      function recomputeRevealWidths(pairsIn, tl) {
        pairsIn.forEach(function (pair) {
          pair.reveal.dataset.w = String(Math.ceil(pair.base.offsetWidth));
        });
        var N = pairsIn.length;
        var p = tl && tl.progress ? tl.progress() : 0;
        var k = p * N;
        var iNow = Math.floor(k);
        var frac = k - iNow;
        pairsIn.forEach(function (pair, i) {
          if (i < iNow) pair.reveal.style.width = (pair.reveal.dataset.w || '0') + 'px';
          else if (i === iNow) {
            var full = +pair.reveal.dataset.w || 0;
            pair.reveal.style.width = full * frac + 'px';
          } else pair.reveal.style.width = '0px';
        });
      }
      recomputeRevealWidths(pairs, null);

      var titleTL = gsap.timeline({
        scrollTrigger: {
          trigger: title,
          pin: true,
          pinSpacing: true,
          start: function () {
            return 'center center';
          },
          end: function () {
            return '+=' + window.innerHeight * 0.9;
          },
          pinType: 'fixed',
          scrub: true,
          anticipatePin: 2,
          invalidateOnRefresh: true,
        },
      });
      pairs.forEach(function (pair) {
        titleTL.to(pair.reveal, {
          width: function (_, el) {
            return (el.dataset.w || '0') + 'px';
          },
          duration: 500,
          ease: 'power2.out',
        });
      });

      var mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', function () {
        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: slider,
            pin: true,
            pinSpacing: true,
            start: 'top 22%',
            end: function () {
              return '+=' + window.innerHeight * (images.length + 0.01);
            },
            scrub: 0.01,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        images.forEach(function (img, i) {
          if (i === 0) return;
          tl.to(img, {
            yPercent: 0,
            duration: D,
            ease: 'none',
            onUpdate: function () {
              var p = this.progress();
              if (p > 0.35 + H && cur !== i) {
                cur = i;
                switchTo(i);
              } else if (p < 0.35 - H && cur !== i - 1) {
                cur = i - 1;
                switchTo(i - 1);
              }
            },
          });
        });
        return function () {
          if (tl.scrollTrigger) tl.scrollTrigger.kill();
        };
      });

      gsap.set(images[0], { yPercent: 0 });
      if (images.length > 1) gsap.set(images.slice(1), { yPercent: 100 });

      function switchTo(i) {
        var c = COPIES[i];
        if (!c) return;
        if (subEl) subEl.innerHTML = c.sub;
        if (h3El) h3El.textContent = c.ttl;
        if (pEl) pEl.innerHTML = c.body;
        if (curEl) curEl.textContent = String(i + 1);
        gsap.fromTo(txtWrap, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' });
      }

      ScrollTrigger.addEventListener('refreshInit', function () {
        recomputeRevealWidths(pairs, titleTL);
      });
      ScrollTrigger.addEventListener('refresh', function () {
        recomputeRevealWidths(pairs, titleTL);
      });
    }, root);
  }

  function upgradeMaskFillToWidthReveal(el) {
    if (!el) return;
    el.querySelectorAll('.line1, .line2, .line3').forEach(function (ln) {
      if (ln.querySelector('.reveal')) return;
      var text = ln.textContent;
      ln.textContent = '';
      var base = document.createElement('span');
      base.className = 'base';
      base.textContent = text;
      var reveal = document.createElement('span');
      reveal.className = 'reveal';
      var ink = document.createElement('span');
      ink.className = 'ink';
      ink.textContent = text;
      reveal.appendChild(ink);
      ln.appendChild(base);
      ln.appendChild(reveal);
    });
  }

  function initStats() {
    var strongs = $$('.stats_list li p > strong');
    if (!strongs.length) return;
    var counters = [];
    strongs.forEach(function (st) {
      var num = parseInt((st.textContent || '').replace(/[^\d]/g, ''), 10);
      if (!Number.isFinite(num)) return;
      var span = document.createElement('span');
      span.className = 'count';
      span.dataset.target = String(num);
      span.textContent = '0';
      var placed = false;
      st.childNodes.forEach(function (n) {
        if (!placed && n.nodeType === 3 && /\d/.test(n.textContent)) {
          st.replaceChild(span, n);
          placed = true;
        }
      });
      if (!placed) st.insertBefore(span, st.firstChild);
      counters.push(span);
    });
    counters.forEach(function (el) {
      var target = +el.dataset.target || 0;
      var tw = { v: 0 };
      ScrollTrigger.create({
        trigger: el.closest('li') || el,
        start: 'top 80%',
        once: true,
        onEnter: function () {
          gsap.to(tw, {
            v: target,
            duration: target >= 1000 ? 1.6 : 1.2,
            ease: 'power1.out',
            onUpdate: function () {
              el.textContent = Math.floor(tw.v).toLocaleString();
            },
          });
        },
      });
    });
  }

  function initVisionSticky() {
    var header = $('#site-header') || $('.site-header');
    var apply = function () {
      document.documentElement.style.setProperty('--sticky-top', (header ? header.offsetHeight : 120) + 16 + 'px');
    };
    apply();
    window.addEventListener('resize', apply);
  }

  function initBoard() {
    var el = $('.board_slider');
    if (!el || typeof Swiper === 'undefined') return;
    new Swiper('.board_slider', {
      slidesPerView: 3.5,
      spaceBetween: 28,
      speed: 600,
      grabCursor: true,
      watchOverflow: true,
      navigation: { nextEl: '.board_slider_next', prevEl: '.board_slider_prev' },
      autoplay: { delay: 4000, disableOnInteraction: false },
      breakpoints: {
        0: { slidesPerView: 1.2, spaceBetween: 16 },
        480: { slidesPerView: 1.6, spaceBetween: 16 },
        640: { slidesPerView: 2.2, spaceBetween: 20 },
        1024: { slidesPerView: 3.0, spaceBetween: 24 },
        1280: { slidesPerView: 3.5, spaceBetween: 28 },
      },
    });
  }

  function initBusinessMobileSwiper() {
    document.querySelectorAll('.business_slider_m .swiper').forEach(function (root) {
      if (!root || root.dataset.inited === '1' || typeof Swiper === 'undefined') return;
      var wrapper = root.querySelector('.business_slider_wrap');
      if (!wrapper) return;
      var slides = wrapper.querySelectorAll('.swiper-slide');
      var curEl = root.querySelector('.slider_pagenation .current_number');
      var totEl = root.querySelector('.slider_pagenation .total_number');
      var prevEl = root.querySelector('.busness_prev');
      var nextEl = root.querySelector('.busness_next');

      if (totEl) totEl.textContent = String(slides.length);
      if (curEl) curEl.textContent = '1';

      new Swiper(root, {
        wrapperClass: 'business_slider_wrap',
        slideClass: 'swiper-slide',
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 600,
        loop: false,
        autoHeight: true,
        grabCursor: true,
        watchOverflow: true,
        allowTouchMove: slides.length > 1,
        observer: true,
        observeParents: true,
        navigation: { prevEl: prevEl || undefined, nextEl: nextEl || undefined },
        on: {
          init: function (s) {
            var i = (s.realIndex != null ? s.realIndex : s.activeIndex) + 1;
            if (curEl) curEl.textContent = String(i);
          },
          slideChange: function (s) {
            var i = (s.realIndex != null ? s.realIndex : s.activeIndex) + 1;
            if (curEl) curEl.textContent = String(i);
          },
        },
      });
      root.dataset.inited = '1';
    });
  }

  function initVisionSwiper() {
    var el = document.querySelector('.vision_slider');
    if (!el || typeof Swiper === 'undefined') return;
    new Swiper('.vision_slider', {
      loop: true,
      navigation: { nextEl: '.vision_next', prevEl: '.vision_prev' },
      autoplay: { delay: 4000, disableOnInteraction: false },
      speed: 800,
      breakpoints: {
        0: { slidesPerView: 1.2, spaceBetween: 20 },
        768: { slidesPerView: 2.5, spaceBetween: 30 },
        1024: { slidesPerView: 2.5, spaceBetween: 40 },
      },
    });
  }
})();
