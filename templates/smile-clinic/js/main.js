(function ($) {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("pageshow", function () {
    window.scrollTo(0, 0);
  });

  function isMobileViewport() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  function createMagneticSlider(config) {
    var $root = config.$root;
    var $track = config.$track;
    var $slides = config.$slides;
    var gapFallback = config.gapFallback || 12;
    var eventNs = config.eventNs;
    var onIndexChange = config.onIndexChange || function () {};

    var count = $slides.length;
    var index = 0;
    var durationMs = 450;
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dragging = false;
    var startX = 0;
    var deltaX = 0;
    var lastX = 0;
    var lastTime = 0;
    var velocityX = 0;
    var snapEase = "cubic-bezier(0.22, 1, 0.36, 1)";
    var snapDurationMin = 280;
    var snapDurationMax = 520;
    var momentumMs = 140;
    var magneticPull = 0.14;
    var pointerActive = false;
    var startY = 0;
    var dragAxis = null;
    var dragThreshold = 8;
    var rootEl = $root[0];

    if (!count) {
      return null;
    }

    function resetPointer() {
      pointerActive = false;
      dragAxis = null;
    }

    function beginPointer(clientX, clientY) {
      pointerActive = true;
      dragAxis = null;
      dragging = false;
      startX = clientX;
      startY = clientY;
      lastX = clientX;
      lastTime = Date.now();
      deltaX = 0;
      velocityX = 0;
    }

    function movePointer(clientX, clientY, event) {
      if (!pointerActive) {
        return;
      }

      if (dragAxis === null) {
        var dx = clientX - startX;
        var dy = clientY - startY;

        if (Math.abs(dx) < dragThreshold && Math.abs(dy) < dragThreshold) {
          return;
        }

        dragAxis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";

        if (dragAxis === "y") {
          resetPointer();
          return;
        }

        dragging = true;
        $root.addClass("is-dragging");
        render(true);
      }

      if (!dragging || dragAxis !== "x") {
        return;
      }

      if (event && event.cancelable) {
        event.preventDefault();
      }

      var now = Date.now();
      var elapsed = now - lastTime;

      if (elapsed > 0) {
        velocityX = (clientX - lastX) / elapsed;
      }

      lastX = clientX;
      lastTime = now;
      deltaX = clientX - startX;

      var translateX = applyMagneticPull(getTranslateForIndex(index, deltaX));

      $track.css("transform", "translate3d(" + translateX + "px, 0, 0)");
    }

    function endPointer() {
      if (dragging) {
        onDragEnd();
      }

      resetPointer();
    }

    function getStep() {
      var gap = parseFloat(window.getComputedStyle($track[0]).columnGap || $track[0].style.gap) || gapFallback;

      return $slides.first().outerWidth() + gap;
    }

    function render(instant, snapDuration) {
      var offset = index * getStep();
      var duration = snapDuration;

      if (duration == null) {
        duration = durationMs;
      }

      $track.css(
        "transition",
        instant || prefersReducedMotion || dragging
          ? "none"
          : "transform " + duration + "ms " + snapEase
      );
      $track.css("transform", "translate3d(" + -offset + "px, 0, 0)");
      onIndexChange(index, $slides);
    }

    function getTranslateForIndex(i, dragDelta) {
      return -i * getStep() + dragDelta;
    }

    function clampTranslate(translateX) {
      var step = getStep();
      var min = -(count - 1) * step;
      var max = 0;
      var edgeResistance = 0.32;

      if (translateX > max) {
        return max + (translateX - max) * edgeResistance;
      }

      if (translateX < min) {
        return min + (translateX - min) * edgeResistance;
      }

      return translateX;
    }

    function applyMagneticPull(translateX) {
      var step = getStep();
      var min = -(count - 1) * step;
      var max = 0;
      var clamped = clampTranslate(translateX);

      if (clamped <= max && clamped >= min) {
        var snapTranslate = -Math.round(-clamped / step) * step;

        return clamped + (snapTranslate - clamped) * magneticPull;
      }

      return clamped;
    }

    function getSnapDuration(fromTranslate) {
      var step = getStep();
      var targetTranslate = -index * step;
      var distance = Math.abs(fromTranslate - targetTranslate);
      var ratio = step ? distance / step : 1;

      return Math.round(snapDurationMin + (snapDurationMax - snapDurationMin) * Math.min(ratio, 1));
    }

    function clampIndex(nextIndex) {
      return Math.max(0, Math.min(count - 1, nextIndex));
    }

    function goTo(nextIndex, fromTranslate) {
      index = clampIndex(nextIndex);
      render(false, fromTranslate != null ? getSnapDuration(fromTranslate) : snapDurationMax);
    }

    function resolveSnapIndex(currentTranslate) {
      var step = getStep();
      var projected = currentTranslate + velocityX * momentumMs;
      var nextIndex = Math.round(-projected / step);

      return clampIndex(nextIndex);
    }

    function onDragEnd() {
      if (!dragging) {
        return;
      }

      dragging = false;
      $root.removeClass("is-dragging");

      var currentTranslate = applyMagneticPull(getTranslateForIndex(index, deltaX));
      var nextIndex = resolveSnapIndex(currentTranslate);

      if (nextIndex === index) {
        render(false, getSnapDuration(currentTranslate));
        return;
      }

      goTo(nextIndex, currentTranslate);
    }

    function onTouchStart(event) {
      if (!event.touches.length) {
        return;
      }

      var touch = event.touches[0];

      beginPointer(touch.clientX, touch.clientY);
    }

    function onTouchMove(event) {
      if (!event.touches.length) {
        return;
      }

      var touch = event.touches[0];

      movePointer(touch.clientX, touch.clientY, event);
    }

    rootEl.addEventListener("touchstart", onTouchStart, { passive: true });
    rootEl.addEventListener("touchmove", onTouchMove, { passive: false });
    rootEl.addEventListener("touchend", endPointer, { passive: true });
    rootEl.addEventListener("touchcancel", endPointer, { passive: true });

    $root.on("mousedown", function (event) {
      if (event.button !== 0) {
        return;
      }

      event.preventDefault();
      beginPointer(event.clientX, event.clientY);
      dragging = true;
      $root.addClass("is-dragging");
      render(true);

      function onMouseMove(moveEvent) {
        if (!dragging) {
          return;
        }

        movePointer(moveEvent.clientX, moveEvent.clientY, moveEvent);
      }

      function onMouseUp() {
        endPointer();
        $(window).off("mousemove." + eventNs + " mouseup." + eventNs);
      }

      $(window).on("mousemove." + eventNs, onMouseMove);
      $(window).on("mouseup." + eventNs, onMouseUp);
    });

    $(window).on("resize." + eventNs, function () {
      render(true);
    });

    render(true);

    return {
      step: function (delta) {
        goTo(index + delta, getTranslateForIndex(index, 0));
      },
    };
  }

  function initScrollReveal() {
    var heroIntervalMs = 150;
    var queueIntervalMs = 85;
    var revealQueue = [];
    var revealTimer = null;
    var $all = $(".scroll-reveal");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      $all.addClass("is-revealed");
      return;
    }

    function documentOrder(a, b) {
      if (a === b) {
        return 0;
      }

      return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    }

    function sortRevealQueue() {
      revealQueue.sort(documentOrder);
    }

    function processRevealQueue() {
      if (!revealQueue.length) {
        revealTimer = null;
        return;
      }

      sortRevealQueue();
      var el = revealQueue.shift();
      $(el).addClass("is-revealed");
      revealTimer = window.setTimeout(processRevealQueue, queueIntervalMs);
    }

    function enqueueReveal(el) {
      var $el = $(el);

      if (!$el.hasClass("scroll-reveal") || $el.hasClass("is-revealed")) {
        return;
      }

      if (revealQueue.indexOf(el) !== -1) {
        return;
      }

      revealQueue.push(el);

      if (!revealTimer) {
        processRevealQueue();
      }
    }

    function revealSequential($targets, intervalMs, startIndex) {
      var base = startIndex || 0;

      $targets.each(function (index) {
        var el = this;

        window.setTimeout(function () {
          $(el).addClass("is-revealed");
        }, (index + base) * intervalMs);
      });
    }

    var $heroTargets = $("#hero .scroll-reveal");

    if ($heroTargets.length) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          revealSequential($heroTargets, heroIntervalMs, 1);
        });
      });
    }

    var $scrollTargets = $all.not($heroTargets).not(".signature-card");

    if (!$scrollTargets.length && !$(".signature-card.scroll-reveal").length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      revealSequential($all.not($heroTargets), queueIntervalMs, 1);
      return;
    }

    var observerOptions = {
      threshold: 0.08,
      rootMargin: "80px 0px -5% 0px",
    };

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          enqueueReveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      observerOptions
    );

    $scrollTargets.each(function () {
      observer.observe(this);
    });

    var $signatureBand = $(".signature__slider-outer");
    var $signatureCards = $(".signature-card.scroll-reveal");

    if ($signatureBand.length && $signatureCards.length) {
      var signatureBandStarted = false;

      var bandObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting || signatureBandStarted) {
              return;
            }

            signatureBandStarted = true;
            revealSequential($signatureCards, queueIntervalMs, 1);
            bandObserver.unobserve(entry.target);
          });
        },
        observerOptions
      );

      bandObserver.observe($signatureBand[0]);
    }
  }

  function initHeaderScroll() {
    var $header = $("#header");

    if (!$header.length) {
      return;
    }

    if ($("body").hasClass("page-sub")) {
      $header.addClass("is-solid");
      return;
    }

    function updateHeader() {
      $header.toggleClass("is-solid", window.scrollY > 20);
    }

    updateHeader();
    $(window).on("scroll", updateHeader);
  }

  function initMobileNav() {
    var $body = $("body");
    var $btn = $(".header__menu-btn");
    var $nav = $("#mobile-nav");

    if (!$btn.length || !$nav.length) {
      return;
    }

    function setOpen(isOpen) {
      $btn.toggleClass("is-active", isOpen).attr("aria-expanded", isOpen ? "true" : "false");
      $nav.toggleClass("is-open", isOpen);
      $body.toggleClass("is-nav-open", isOpen);
      $btn.attr("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");

      if (!isOpen) {
        $nav.find(".mobile-nav__item--has-sub").removeClass("is-sub-open");
        $nav.find(".mobile-nav__link--trigger").attr("aria-expanded", "false");
      }
    }

    $nav.find(".mobile-nav__item--has-sub").each(function () {
      var $item = $(this);
      var $trigger = $item.find(".mobile-nav__link--trigger");

      $trigger.on("click", function () {
        var isOpen = $item.hasClass("is-sub-open");

        $nav.find(".mobile-nav__item--has-sub.is-sub-open").not($item).removeClass("is-sub-open");
        $nav
          .find(".mobile-nav__link--trigger")
          .not($trigger)
          .attr("aria-expanded", "false");

        $item.toggleClass("is-sub-open", !isOpen);
        $trigger.attr("aria-expanded", !isOpen ? "true" : "false");
      });
    });

    $btn.on("click", function () {
      setOpen(!$nav.hasClass("is-open"));
    });

    $(document).on("keydown", function (event) {
      if (event.key === "Escape" && $nav.hasClass("is-open")) {
        setOpen(false);
      }
    });
  }

  function initSignatureSliderDesktop() {
    var $root = $("[data-signature-slider]");

    if (!$root.length || isMobileViewport()) {
      return;
    }

    var $track = $root.find("[data-signature-track]");
    var $cards = $track.children(".signature-card");
    var $prev = $("[data-signature-prev]");
    var $next = $("[data-signature-next]");
    var cardCount = $cards.length;
    var index = 0;
    var durationMs = 450;
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!cardCount) {
      return;
    }

    function getCardStep() {
      var gap = parseFloat(window.getComputedStyle($track[0]).columnGap || $track[0].style.gap) || 24;

      return $cards.first().outerWidth() + gap;
    }

    function setActiveCard() {
      $cards.removeClass("is-active").eq(index).addClass("is-active");
    }

    function updateNavState() {
      $prev.prop("disabled", index <= 0);
      $next.prop("disabled", index >= cardCount - 1);
    }

    function render(instant) {
      var offset = index * getCardStep();

      $track.css(
        "transition",
        instant || prefersReducedMotion ? "none" : "transform " + durationMs + "ms ease"
      );
      $track.css("transform", "translate3d(" + -offset + "px, 0, 0)");
      setActiveCard();
      updateNavState();
    }

    function step(delta) {
      var next = index + delta;

      if (next < 0 || next >= cardCount) {
        return;
      }

      index = next;
      render(false);
    }

    $prev.on("click", function () {
      step(-1);
    });

    $next.on("click", function () {
      step(1);
    });

    $(window).on("resize.signatureDesktop", function () {
      if (isMobileViewport()) {
        return;
      }

      render(true);
    });

    setActiveCard();
    render(true);
  }

  function initSignatureSliderMobile() {
    if (!isMobileViewport()) {
      return;
    }

    var $root = $("[data-signature-slider]");

    if (!$root.length) {
      return;
    }

    var $track = $root.find("[data-signature-track]");
    var $slides = $track.children(".signature-card");
    var $prev = $("[data-signature-prev]");
    var $next = $("[data-signature-next]");
    var count = $slides.length;

    var slider = createMagneticSlider({
      $root: $root,
      $track: $track,
      $slides: $slides,
      gapFallback: 12,
      eventNs: "signatureSlider",
      onIndexChange: function (i) {
        $slides.removeClass("is-active").eq(i).addClass("is-active");
        $prev.prop("disabled", i <= 0);
        $next.prop("disabled", i >= count - 1);
      },
    });

    if (!slider) {
      return;
    }

    $prev.on("click", function () {
      slider.step(-1);
    });

    $next.on("click", function () {
      slider.step(1);
    });
  }

  function initStrengthSlider() {
    if (!isMobileViewport()) {
      return;
    }

    var $root = $("[data-strength-slider]");

    if (!$root.length) {
      return;
    }

    createMagneticSlider({
      $root: $root,
      $track: $root.find("[data-strength-track]"),
      $slides: $root.find("[data-strength-track]").children(".strength-feature__panel"),
      gapFallback: 12,
      eventNs: "strengthSlider",
      onIndexChange: function (i, $slides) {
        $slides.each(function (slideIndex) {
          $(this).attr("aria-hidden", slideIndex === i ? "false" : "true");
        });
      },
    });
  }

  function initTeamPicker() {
    if (!isMobileViewport()) {
      return;
    }

    var $section = $(".sub-team__mobile-only");

    if (!$section.length) {
      return;
    }

    var $tabs = $section.find(".sub-team__picker-btn");
    var $cards = $section.find("[data-team-card]");

    $tabs.on("click", function () {
      var index = $(this).data("team-index");

      $tabs.removeClass("is-active").attr("aria-selected", "false");
      $(this).addClass("is-active").attr("aria-selected", "true");

      $cards.removeClass("is-active").prop("hidden", true);
      $cards.eq(index).addClass("is-active").prop("hidden", false);
    });
  }

  function initPlaceSlider() {
    if (!isMobileViewport()) {
      return;
    }

    var $root = $("[data-place-slider]");

    if (!$root.length) {
      return;
    }

    createMagneticSlider({
      $root: $root,
      $track: $root.find("[data-place-track]"),
      $slides: $root.find("[data-place-track]").children(".sub-place-card"),
      gapFallback: 12,
      eventNs: "placeSlider",
      onIndexChange: function (i, $slides) {
        $slides.each(function (slideIndex) {
          $(this).attr("aria-hidden", slideIndex === i ? "false" : "true");
        });
      },
    });
  }

  function initHeaderSubnav() {
    var $items = $(".header__nav-item--has-sub");
    var closeTimer = null;

    if (!$items.length) {
      return;
    }

    function openItem($item) {
      window.clearTimeout(closeTimer);
      $items.removeClass("is-sub-open");
      $item.addClass("is-sub-open");
    }

    function scheduleClose($item) {
      window.clearTimeout(closeTimer);
      closeTimer = window.setTimeout(function () {
        $item.removeClass("is-sub-open");
      }, 120);
    }

    $items.on("mouseenter", function () {
      openItem($(this));
    });

    $items.on("mouseleave", function () {
      scheduleClose($(this));
    });

    $items.on("focusin", function () {
      openItem($(this));
    });

    $items.on("focusout", function (event) {
      if (!this.contains(event.relatedTarget)) {
        $(this).removeClass("is-sub-open");
      }
    });
  }

  $(function () {
    $("html").addClass("js");
    void document.documentElement.offsetHeight;
    initScrollReveal();
    initHeaderScroll();
    initHeaderSubnav();
    initMobileNav();
    initSignatureSliderDesktop();
    initSignatureSliderMobile();
    initStrengthSlider();
    initTeamPicker();
    initPlaceSlider();
    $(window).trigger("resize");
  });
})(jQuery);
