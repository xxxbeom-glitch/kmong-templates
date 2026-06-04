/* 새로고침 시 이전 스크롤 위치 복원 방지 → 항상 상단 */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function scrollPageToTop() {
  window.scrollTo(0, 0);
  requestAnimationFrame(function () {
    window.scrollTo(0, 0);
  });
}

window.addEventListener("pageshow", function (event) {
  var nav = performance.getEntriesByType("navigation")[0];
  if (event.persisted || (nav && nav.type === "reload")) {
    scrollPageToTop();
  }
});

$(function () {
  /* Scroll-triggered animation — AOS fade-up / fade-in, once */
  function initScrollTriggeredAnimation() {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof AOS === "undefined") {
      return;
    }

    function applyAos($el, animation, delay) {
      if (!$el.length || $el.attr("data-aos")) {
        return;
      }
      $el.attr("data-aos", animation || "fade-up");
      if (delay) {
        $el.attr("data-aos-delay", delay);
      }
    }

    function aosStaggerItems($container) {
      if ($container.hasClass("process__grid")) {
        return $container.find(".process__item");
      }
      return $container.children();
    }

    $(".section-title").each(function () {
      applyAos($(this), "fade-up");
    });

    $(".section--hero").each(function () {
      var $hero = $(this);
      applyAos($hero.find(".hero__title"), "fade-up");
      applyAos($hero.find(".hero__desc"), "fade-up", "100");
      applyAos($hero.find(".hero__cta"), "fade-up", "200");
      applyAos($hero.find(".hero__pager"), "fade-up", "300");
    });

    $(".ceo-hero__img").attr({
      "data-aos": "fade-in",
      "data-aos-duration": "700",
      "data-aos-easing": "ease-out-cubic",
    });

    $("[data-aos-stagger]").each(function () {
      aosStaggerItems($(this)).each(function (index) {
        var $item = $(this);
        if ($item.attr("data-aos")) {
          return;
        }
        $item.attr("data-aos", "fade-up");
        $item.attr("data-aos-delay", String(index * 100));
      });
    });

    applyAos($(".pricing__cta"), "fade-up", "300");
    applyAos($(".section--contact__cta"), "fade-up", "150");
    applyAos($(".footer__brand"), "fade-up");
    applyAos($(".footer__social"), "fade-up", "100");

    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
      anchorPlacement: "top-bottom",
    });

    $(window).on("load", function () {
      AOS.refreshHard();
    });

    /* CEO 본문: 섹션 진입 시 제목·리드·본문·서명 순차 재생 */
    if ($("#ceo-message").length) {
      requestAnimationFrame(function () {
        AOS.refreshHard();
      });
    }

    var resizeTimer;
    $(window).on("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        AOS.refresh();
      }, 250);
    });
  }

  initScrollTriggeredAnimation();

  var $toggle = $(".menu-toggle");
  var $nav = $(".header__nav");

  $toggle.on("click", function () {
    var isOpen = $nav.toggleClass("is-open").hasClass("is-open");
    $toggle.attr("aria-expanded", isOpen);
    $("body").toggleClass("nav-open", isOpen);
  });

  $(".header__nav-link, .header__submenu-link, .header__nav-cta").on("click", function () {
    if (window.innerWidth <= 768) {
      $nav.removeClass("is-open");
      $toggle.attr("aria-expanded", "false");
      $("body").removeClass("nav-open");
    }
  });

  $(window).on("resize", function () {
    if (window.innerWidth > 768) {
      $nav.removeClass("is-open");
      $toggle.attr("aria-expanded", "false");
      $("body").removeClass("nav-open");
    }
  });

  /* Hero slider — 8 slides, initial 03/08 */
  var $slides = $(".hero__slide");
  var $current = $(".hero__counter-current");
  var total = $slides.length;
  var index = 2;
  var timer = null;
  var interval = 5000;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function goTo(i) {
    index = (i + total) % total;
    $slides.removeClass("is-active").eq(index).addClass("is-active");
    $current.text(pad(index + 1));
  }

  function startAuto() {
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(function () {
      goTo(index + 1);
    }, interval);
  }

  function stopAuto() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  if (total > 0) {
    goTo(index);
    startAuto();
    $("[data-hero-slider]").on("mouseenter", stopAuto).on("mouseleave", startAuto);

    $(".hero__pager-btn--prev").on("click", function () {
      goTo(index - 1);
      startAuto();
    });

    $(".hero__pager-btn--next").on("click", function () {
      goTo(index + 1);
      startAuto();
    });
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* SERVICE — image scale 120% on card hover (CSS); reduced-motion disables transform */

  /* RECORDS — count up when section enters view */
  function formatProofCount(value, decimals) {
    if (decimals > 0) {
      return value.toFixed(decimals);
    }
    return Math.round(value).toLocaleString("en-US");
  }

  function runProofCount($el) {
    var end = parseFloat($el.attr("data-count-value"), 10);
    var decimals = parseInt($el.attr("data-count-decimals") || "0", 10);
    var suffix = $el.attr("data-count-suffix") || "";
    var duration = 1600;
    var startTime = null;

    function frame(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = end * eased;
      $el.text(formatProofCount(current, decimals) + suffix);
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        $el.text(formatProofCount(end, decimals) + suffix);
      }
    }

    requestAnimationFrame(frame);
  }

  var $proofGrid = $("[data-proof-count]");
  if ($proofGrid.length) {
    var proofStarted = false;

    function startProofCounting() {
      if (proofStarted) {
        return;
      }
      proofStarted = true;
      $proofGrid.find(".proof__count").each(function () {
        var $count = $(this);
        if (prefersReducedMotion) {
          var end = parseFloat($count.attr("data-count-value"), 10);
          var decimals = parseInt($count.attr("data-count-decimals") || "0", 10);
          var suffix = $count.attr("data-count-suffix") || "";
          $count.text(formatProofCount(end, decimals) + suffix);
        } else {
          runProofCount($count);
        }
      });
    }

    if ("IntersectionObserver" in window) {
      var proofObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              startProofCounting();
              proofObserver.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      proofObserver.observe($proofGrid[0]);
    } else {
      startProofCounting();
    }
  }

  /* WORK — draggable horizontal carousel */
  $("[data-gallery-carousel]").each(function () {
    var scrollEl = this;
    var $scroll = $(scrollEl);
    var pointerActive = false;
    var pointerId = null;
    var startX = 0;
    var startScroll = 0;
    var didDrag = false;
    var dragThreshold = 6;

    function endDrag(e) {
      if (!pointerActive) {
        return;
      }
      if (e && e.pointerId !== pointerId) {
        return;
      }
      var activePointer = pointerId;
      pointerActive = false;
      pointerId = null;
      $scroll.removeClass("is-dragging");
      if (scrollEl.releasePointerCapture && activePointer !== null) {
        try {
          scrollEl.releasePointerCapture(activePointer);
        } catch (err) {
          /* ignore */
        }
      }
    }

    scrollEl.addEventListener(
      "pointerdown",
      function (e) {
        if (e.pointerType === "mouse" && e.button !== 0) {
          return;
        }
        pointerActive = true;
        pointerId = e.pointerId;
        didDrag = false;
        $scroll.addClass("is-dragging");
        startX = e.clientX;
        startScroll = scrollEl.scrollLeft;
        if (scrollEl.setPointerCapture) {
          scrollEl.setPointerCapture(e.pointerId);
        }
      },
      { passive: true }
    );

    scrollEl.addEventListener(
      "pointermove",
      function (e) {
        if (!pointerActive || e.pointerId !== pointerId) {
          return;
        }
        var dx = e.clientX - startX;
        if (Math.abs(dx) > dragThreshold) {
          didDrag = true;
        }
        if (!didDrag) {
          return;
        }
        e.preventDefault();
        scrollEl.scrollLeft = startScroll - dx;
      },
      { passive: false }
    );

    scrollEl.addEventListener("pointerup", endDrag);
    scrollEl.addEventListener("pointercancel", endDrag);

    scrollEl.addEventListener(
      "click",
      function (e) {
        if (didDrag) {
          e.preventDefault();
          e.stopPropagation();
          didDrag = false;
        }
      },
      true
    );

    scrollEl.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });
  });

  /* FAQ accordion — slideToggle, 단일 열림, 재클릭 시 닫힘 */
  $("[data-faq]").each(function () {
    var $faq = $(this);
    var iconDown = "assets/icons/icon-faq-down.png";
    var iconUp = "assets/icons/icon-faq-up.png";
    var slideDuration = 400;

    function setFaqItemClosed($faqItem) {
      $faqItem.removeClass("is-open");
      $faqItem.find(".faq-item__trigger").attr("aria-expanded", "false");
      $faqItem.find(".faq-item__icon").attr("src", iconDown).removeClass("faq-item__icon--open");
    }

    function setFaqItemOpen($faqItem) {
      $faqItem.addClass("is-open");
      $faqItem.find(".faq-item__trigger").attr("aria-expanded", "true");
      $faqItem.find(".faq-item__icon").attr("src", iconUp).addClass("faq-item__icon--open");
    }

    function closeFaqItem($faqItem) {
      if (!$faqItem.hasClass("is-open")) {
        return;
      }
      $faqItem
        .find(".faq-item__panel")
        .stop(true, true)
        .slideUp(slideDuration, function () {
          setFaqItemClosed($faqItem);
        });
    }

    $faq.find(".faq-item__panel").hide();

    $faq.find(".faq-item__trigger").on("click", function () {
      var $trigger = $(this);
      var $item = $trigger.closest(".faq-item");
      var $panel = $item.find(".faq-item__panel");
      var isOpen = $item.hasClass("is-open");

      $faq.find(".faq-item").not($item).each(function () {
        closeFaqItem($(this));
      });

      $panel.stop(true, true).slideToggle(slideDuration, function () {
        if (isOpen) {
          setFaqItemClosed($item);
        }
      });

      if (!isOpen) {
        setFaqItemOpen($item);
      }
    });
  });
});
