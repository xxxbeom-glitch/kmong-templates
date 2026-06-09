(function () {
  var preview = new URLSearchParams(window.location.search).get("preview");

  if (preview === "gnb") {
    document.documentElement.classList.add("preview-gnb");
  } else if (preview === "hero-story") {
    document.documentElement.classList.add("preview-hero-story");
  } else if (preview === "stats-news") {
    document.documentElement.classList.add("preview-stats-news");
  }
})();

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", function () {
  window.scrollTo(0, 0);
});

function initMobileNav() {
  var $nav = $(".header__nav");
  var $toggle = $(".menu-toggle");

  function setMobileNavOpen(isOpen) {
    $nav.toggleClass("is-open", isOpen);
    $toggle.attr("aria-expanded", isOpen);
    $toggle.attr("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    $("body").toggleClass("nav-open", isOpen);
  }

  $toggle.on("click", function () {
    setMobileNavOpen(!$nav.hasClass("is-open"));
  });

  $(".header__nav-link").on("click", function () {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setMobileNavOpen(false);
    }
  });
}

$(function () {
  $("html").addClass("js");

  var isGnbPreview = $("html").hasClass("preview-gnb");
  var isHeroStoryPreview = $("html").hasClass("preview-hero-story");
  var isStatsNewsPreview = $("html").hasClass("preview-stats-news");
  var isSectionPreview = isGnbPreview || isHeroStoryPreview || isStatsNewsPreview;

  if (!isGnbPreview) {
    initPlaceholders();
    initScrollReveal();

    if (!isHeroStoryPreview && !isStatsNewsPreview) {
      initHeroProgressSlider();
    }

    if (!isHeroStoryPreview && !isStatsNewsPreview) {
      initWorksGallery();
    }

    if (!isHeroStoryPreview) {
      initStatsCounter();
    }

    if (!isHeroStoryPreview && !isStatsNewsPreview) {
      initNewsSlider();
    }
  }

  initMobileNav();

  if (isSectionPreview) {
    return;
  }

  $(".works-gallery__panel").on("click", function () {
    if (window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    var $item = $(this).closest(".works-gallery__item");

    if ($item.hasClass("is-active")) {
      return;
    }

    setWorksGalleryActive($item);
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

function setWorksGalleryActive($item) {
  if (!$item || !$item.length) {
    return;
  }

  $(".works-gallery__item").removeClass("is-active");
  $(".works-gallery__panel").attr("aria-expanded", "false");

  $item.addClass("is-active");
  $item.find(".works-gallery__panel").attr("aria-expanded", "true");
}

function initWorksGallery() {
  var $gallery = $(".works-gallery");

  if (!$gallery.length) {
    return;
  }

  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    $gallery.on("mouseenter", ".works-gallery__item", function () {
      setWorksGalleryActive($(this));
    });
  }
}

function formatStatsCounterValue(value, decimals, useGrouping) {
  if (decimals > 0) {
    return value.toFixed(decimals);
  }

  if (useGrouping) {
    return Math.round(value).toLocaleString("en-US");
  }

  return String(Math.round(value));
}

function renderStatsCounter($el, value) {
  var end = parseFloat($el.attr("data-count-value"), 10);
  var decimals = parseInt($el.attr("data-count-decimals") || "0", 10);
  var suffix = $el.attr("data-count-suffix") || "";
  var useGrouping = $el.is("[data-count-grouping]");
  var display = formatStatsCounterValue(value, decimals, useGrouping);

  $el.text(display + suffix);
}

function runStatsCounter($el) {
  var end = parseFloat($el.attr("data-count-value"), 10);
  var durationMs = 1600;
  var startTime = null;

  function frame(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    var progress = Math.min((timestamp - startTime) / durationMs, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var current = end * eased;

    renderStatsCounter($el, current);

    if (progress < 1) {
      requestAnimationFrame(frame);
      return;
    }

    renderStatsCounter($el, end);
  }

  requestAnimationFrame(frame);
}

function initStatsCounter() {
  var $section = $("#stats");
  var $counters = $section.find("[data-stats-counter]");

  if (!$section.length || !$counters.length) {
    return;
  }

  var started = false;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function startCounting() {
    if (started) {
      return;
    }

    started = true;

    $counters.each(function () {
      var $counter = $(this);

      if (prefersReducedMotion) {
        renderStatsCounter($counter, parseFloat($counter.attr("data-count-value"), 10));
        return;
      }

      renderStatsCounter($counter, 0);
      runStatsCounter($counter);
    });
  }

  if (!("IntersectionObserver" in window)) {
    startCounting();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        startCounting();
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  observer.observe($section[0]);
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

function initNewsSlider() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    return;
  }

  var $section = $("#news");

  if (!$section.length) {
    return;
  }

  var $viewport = $section.find(".news__viewport");
  var $track = $section.find("[data-news-track]");
  var $prev = $section.find("[data-news-prev]");
  var $next = $section.find("[data-news-next]");
  var $current = $section.find("[data-news-pager-current]");
  var $total = $section.find("[data-news-pager-total]");
  var $originalSlides = $track.children(".news-card");
  var slideCount = $originalSlides.length;
  var pageOrders = [
    [0, 1, 2],
    [1, 2, 0],
    [2, 0, 1],
  ];
  var pageCount = pageOrders.length;
  var index = 0;
  var isLocked = false;
  var durationMs = 450;
  var transitionValue = "transform " + durationMs + "ms ease";
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var unlockTimer = null;

  if (slideCount !== 3 || !$viewport.length || !$track.length) {
    return;
  }

  function buildCardClone(originalIndex) {
    var $clone = $originalSlides.eq(originalIndex).clone(false);

    $clone.find(".scroll-reveal").removeClass("scroll-reveal").addClass("is-revealed");

    return $clone;
  }

  function buildPage(order) {
    var $page = $('<div class="news__page"></div>');

    order.forEach(function (originalIndex) {
      $page.append(buildCardClone(originalIndex));
    });

    return $page;
  }

  $track.empty();

  pageOrders.forEach(function (order) {
    $track.append(buildPage(order));
  });

  $track.append(
    buildPage(pageOrders[0])
      .addClass("news__page--clone")
      .attr("aria-hidden", "true")
  );

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function clearUnlockTimer() {
    if (unlockTimer) {
      window.clearTimeout(unlockTimer);
      unlockTimer = null;
    }
  }

  function unlock() {
    clearUnlockTimer();
    isLocked = false;
  }

  function getPageWidth() {
    if (!$viewport[0]) {
      return 0;
    }

    return $viewport[0].getBoundingClientRect().width;
  }

  function updatePager() {
    var pagerIndex = ((index % pageCount) + pageCount) % pageCount;

    $current.text(pad(pagerIndex + 1));
    $total.text(pad(pageCount));
  }

  function render(instant) {
    var pageWidth = getPageWidth();

    if (!pageWidth) {
      return;
    }

    $track.css(
      "transition",
      instant || prefersReducedMotion ? "none" : transitionValue
    );
    $track.css("transform", "translate3d(" + -index * pageWidth + "px, 0, 0)");

    if (instant) {
      $track[0].offsetHeight;
    }

    updatePager();
  }

  function waitForTransition(onDone) {
    if (prefersReducedMotion) {
      onDone();
      unlock();
      return;
    }

    var done = false;

    function finish() {
      if (done) {
        return;
      }

      done = true;
      clearUnlockTimer();
      $track.off(".newsSlider");
      onDone();
      unlock();
    }

    clearUnlockTimer();
    unlockTimer = window.setTimeout(finish, durationMs + 80);

    $track.on("transitionend.newsSlider webkitTransitionEnd.newsSlider", function (event) {
      if (event.target !== $track[0]) {
        return;
      }

      if (event.originalEvent && event.originalEvent.propertyName) {
        var propertyName = event.originalEvent.propertyName;

        if (propertyName !== "transform" && propertyName !== "-webkit-transform") {
          return;
        }
      }

      finish();
    });
  }

  function goNext() {
    if (isLocked) {
      return;
    }

    isLocked = true;

    if (index === pageCount - 1) {
      index = pageCount;
      render(false);
      waitForTransition(function () {
        index = 0;
        render(true);
      });
      return;
    }

    index += 1;
    render(false);
    waitForTransition(function () {});
  }

  function goPrev() {
    if (isLocked) {
      return;
    }

    isLocked = true;

    if (index === 0) {
      index = pageCount;
      render(true);

      window.requestAnimationFrame(function () {
        index = pageCount - 1;
        render(false);
        waitForTransition(function () {});
      });
      return;
    }

    index -= 1;
    render(false);
    waitForTransition(function () {});
  }

  $prev.on("click", function (event) {
    event.preventDefault();
    goPrev();
  });

  $next.on("click", function (event) {
    event.preventDefault();
    goNext();
  });

  $(window).on("resize", function () {
    render(true);
  });

  function bootSlider() {
    render(true);
  }

  if (document.readyState === "complete") {
    bootSlider();
  } else {
    $(window).on("load", bootSlider);
  }
}
