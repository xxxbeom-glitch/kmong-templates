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
  /* AOS — fade-up, 600ms, once */
  var aosDisabled = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function aosStaggerItems($container) {
    if ($container.hasClass("process__grid")) {
      return $container.find(".process__item");
    }
    return $container.children();
  }

  $(".section-title").attr("data-aos", "fade-up");

  $(".hero__title").attr("data-aos", "fade-up");
  $(".hero__desc").attr("data-aos", "fade-up").attr("data-aos-delay", "100");
  $(".hero__cta").attr("data-aos", "fade-up").attr("data-aos-delay", "200");
  $(".hero__pager").attr("data-aos", "fade-up").attr("data-aos-delay", "300");

  $("[data-aos-stagger]").each(function () {
    aosStaggerItems($(this)).each(function (index) {
      $(this).attr("data-aos", "fade-up").attr("data-aos-delay", String(index * 100));
    });
  });

  $(".pricing__cta").attr("data-aos", "fade-up").attr("data-aos-delay", "300");
  $(".section--contact__cta").attr("data-aos", "fade-up").attr("data-aos-delay", "150");

  $(".footer__brand").attr("data-aos", "fade-up");
  $(".footer__social").attr("data-aos", "fade-up").attr("data-aos-delay", "100");

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
      offset: 80,
      disable: aosDisabled,
    });
  }

  var $toggle = $(".menu-toggle");
  var $nav = $(".header__nav");

  $toggle.on("click", function () {
    var isOpen = $nav.toggleClass("is-open").hasClass("is-open");
    $toggle.attr("aria-expanded", isOpen);
    $("body").toggleClass("nav-open", isOpen);
  });

  $(".header__nav-link, .header__nav-cta").on("click", function () {
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
