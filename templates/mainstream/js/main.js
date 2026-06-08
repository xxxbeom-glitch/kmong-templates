if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", function () {
  window.scrollTo(0, 0);
});

$(function () {
  $("html").addClass("js");

  initScrollReveal();
  initHeroProgressSlider();

  var $nav = $(".header__nav");
  var $toggle = $(".menu-toggle");

  $toggle.on("click", function () {
    var isOpen = $nav.toggleClass("is-open").hasClass("is-open");
    $toggle.attr("aria-expanded", isOpen);
    $toggle.attr("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    $("body").toggleClass("nav-open", isOpen);
  });

  $(".header__nav-link").on("click", function () {
    if (window.matchMedia("(max-width: 768px)").matches) {
      $nav.removeClass("is-open");
      $toggle.attr("aria-expanded", "false");
      $toggle.attr("aria-label", "메뉴 열기");
      $("body").removeClass("nav-open");
    }
  });

  $(".works-gallery__panel").on("click", function () {
    var $item = $(this).closest(".works-gallery__item");

    if ($item.hasClass("is-active")) {
      return;
    }

    $(".works-gallery__item").removeClass("is-active");
    $(".works-gallery__panel").attr("aria-expanded", "false");

    $item.addClass("is-active");
    $(this).attr("aria-expanded", "true");
  });

  var $familyBtn = $(".footer__family");
  var $familyList = $("#footer-family-list");

  $familyBtn.on("click", function () {
    var isOpen = $familyBtn.hasClass("is-open");

    if (isOpen) {
      $familyList.slideUp(200, function () {
        $familyList.prop("hidden", true);
      });
      $familyBtn.removeClass("is-open").attr("aria-expanded", "false");
      return;
    }

    $familyList.prop("hidden", false).hide().slideDown(200);
    $familyBtn.addClass("is-open").attr("aria-expanded", "true");
  });

  $(document).on("click", function (e) {
    if (!$familyBtn.length) {
      return;
    }

    if ($(e.target).closest(".footer__family-wrap").length) {
      return;
    }

    if ($familyBtn.hasClass("is-open")) {
      $familyList.slideUp(200, function () {
        $familyList.prop("hidden", true);
      });
      $familyBtn.removeClass("is-open").attr("aria-expanded", "false");
    }
  });
});

function initScrollReveal() {
  var heroIntervalMs = 150;
  var sectionIntervalMs = 180;
  var $sections = $("#hero, #story, #stats, #news, #works, #faq, #cta");

  if (!$sections.length) {
    return;
  }

  var $all = $(".scroll-reveal");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $all.addClass("is-revealed");
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealSequential($all, sectionIntervalMs);
    return;
  }

  var $hero = $("#hero");
  var $scrollSections = $sections.not("#hero");

  if ($hero.length) {
    requestAnimationFrame(function () {
      revealSequential($hero.find(".scroll-reveal"), heroIntervalMs);
    });
  }

  $scrollSections.each(function () {
    var $section = $(this);
    var $targets = $section.find(".scroll-reveal");

    if (!$targets.length) {
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || $section.hasClass("is-scroll-reveal-started")) {
            return;
          }

          $section.addClass("is-scroll-reveal-started");
          revealSequential($targets, sectionIntervalMs);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "80px 0px -5% 0px",
      }
    );

    observer.observe(this);
  });
}

function revealSequential($targets, intervalMs) {
  $targets.each(function (index) {
    var el = this;

    window.setTimeout(function () {
      $(el).addClass("is-revealed");
    }, index * intervalMs);
  });
}

function initHeroProgressSlider() {
  var $root = $("[data-hero-progress-slider]");

  if (!$root.length) {
    return;
  }

  var $slides = $root.find(".hero__slide");
  var $current = $root.find(".hero__pager-current");
  var $total = $root.find(".hero__pager-total");
  var $fill = $root.find(".hero__pager-fill");
  var $track = $root.find(".hero__pager-track");
  var total = $slides.length;
  var index = 0;
  var durationMs = 5000;
  var fillAnim = null;
  var rafId = null;
  var isBooted = false;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!total) {
    return;
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function getTrackWidth() {
    return $track[0] ? $track[0].getBoundingClientRect().width : 0;
  }

  function updatePagerNumbers() {
    $current.text(pad(index + 1));
    $total.text(pad(total));
  }

  function setFillWidth(px) {
    $fill.css("width", Math.max(0, px) + "px");
  }

  function goTo(nextIndex) {
    index = (nextIndex + total) % total;
    $slides.removeClass("is-active").eq(index).addClass("is-active");
    updatePagerNumbers();
  }

  function stopFillAnim() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    if (fillAnim && typeof fillAnim.cancel === "function") {
      fillAnim.cancel();
    }

    fillAnim = null;
  }

  function startFill(fromPx, remainingMs, onDone) {
    stopFillAnim();

    var trackWidth = getTrackWidth();

    if (!trackWidth) {
      window.setTimeout(function () {
        startFill(fromPx, remainingMs, onDone);
      }, 50);
      return;
    }

    var startPx = typeof fromPx === "number" ? fromPx : 0;
    var endPx = trackWidth;

    setFillWidth(startPx);

    if (prefersReducedMotion || total <= 1) {
      setFillWidth(endPx);
      return;
    }

    if (typeof $fill[0].animate === "function") {
      fillAnim = $fill[0].animate(
        [{ width: startPx + "px" }, { width: endPx + "px" }],
        {
          duration: remainingMs,
          easing: "linear",
          fill: "forwards",
        }
      );

      fillAnim.onfinish = function () {
        fillAnim = null;
        onDone();
      };

      return;
    }

    var startedAt = performance.now();

    function tick(now) {
      var elapsed = now - startedAt;
      var ratio = Math.min(elapsed / remainingMs, 1);

      setFillWidth(startPx + (endPx - startPx) * ratio);

      if (ratio >= 1) {
        rafId = null;
        onDone();
        return;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
  }

  function startSlideTimer(fromPx) {
    startFill(fromPx, durationMs, function () {
      goTo(index + 1);
      setFillWidth(0);
      startSlideTimer(0);
    });
  }

  function nextSlideManual() {
    stopFillAnim();
    goTo(index + 1);
    setFillWidth(0);
    startSlideTimer(0);
  }

  function bootSlider() {
    if (isBooted) {
      return;
    }

    if (!getTrackWidth()) {
      requestAnimationFrame(bootSlider);
      return;
    }

    isBooted = true;
    goTo(0);
    updatePagerNumbers();
    setFillWidth(0);

    if (prefersReducedMotion || total <= 1) {
      setFillWidth(getTrackWidth());
      return;
    }

    startSlideTimer(0);
    $track.on("click", nextSlideManual);
  }

  if (document.readyState === "complete") {
    bootSlider();
  } else {
    $(window).on("load", bootSlider);
  }
}
