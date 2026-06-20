(function ($) {
  "use strict";

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

    if (!count) {
      return null;
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

    function onDragStart(clientX) {
      dragging = true;
      startX = clientX;
      lastX = clientX;
      lastTime = Date.now();
      deltaX = 0;
      velocityX = 0;
      $root.addClass("is-dragging");
      render(true);
    }

    function onDragMove(clientX) {
      if (!dragging) {
        return;
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

    $root.on("touchstart", function (event) {
      if (!event.originalEvent.touches.length) {
        return;
      }

      onDragStart(event.originalEvent.touches[0].clientX);
    });

    $root.on("touchmove", function (event) {
      if (!dragging || !event.originalEvent.touches.length) {
        return;
      }

      onDragMove(event.originalEvent.touches[0].clientX);
    });

    $root.on("touchend touchcancel", function () {
      onDragEnd();
    });

    $root.on("mousedown", function (event) {
      if (event.button !== 0) {
        return;
      }

      event.preventDefault();
      onDragStart(event.clientX);

      function onMouseMove(moveEvent) {
        onDragMove(moveEvent.clientX);
      }

      function onMouseUp() {
        onDragEnd();
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

  function initMobileNav() {
    var $body = $("body.page-mobile");
    var $btn = $(".header__menu-btn");
    var $nav = $("#mobile-nav");

    if (!$body.length || !$btn.length || !$nav.length) {
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

  function initStrengthSlider() {
    if (!$("body.page-mobile").length) {
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

  function initSignatureSlider() {
    if (!$("body.page-mobile").length) {
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

  $(function () {
    initMobileNav();
    initStrengthSlider();
    initSignatureSlider();
  });
})(jQuery);
