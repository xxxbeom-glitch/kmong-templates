if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", function () {
  window.scrollTo(0, 0);
});

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
        $nav.find(".mobile-nav__item--has-sub").removeClass("is-open");
        $nav.find(".mobile-nav__trigger").attr("aria-expanded", "false");
      }
    }

    $btn.on("click", function () {
      setOpen(!$nav.hasClass("is-open"));
    });

    $nav.find(".mobile-nav__trigger").on("click", function () {
      var $item = $(this).closest(".mobile-nav__item--has-sub");
      var isOpen = $item.hasClass("is-open");

      $nav.find(".mobile-nav__item--has-sub").removeClass("is-open");
      $nav.find(".mobile-nav__trigger").attr("aria-expanded", "false");

      if (!isOpen) {
        $item.addClass("is-open");
        $(this).attr("aria-expanded", "true");
      }
    });

    $nav.find(".mobile-nav__sub-link").on("click", function () {
      setOpen(false);
    });

    $(document).on("keydown", function (event) {
      if (event.key === "Escape" && $nav.hasClass("is-open")) {
        setOpen(false);
      }
    });
  }

  function initCaseCardSlider() {
    if (!$("body.page-mobile").length) {
      return;
    }

    var $root = $("[data-case-slider]");

    if (!$root.length) {
      return;
    }

    var $track = $root.find("[data-case-track]");
    var $slides = $track.children(".case-card");

    createMagneticSlider({
      $root: $root.find(".case__viewport"),
      $track: $track,
      $slides: $slides,
      gapFallback: 2,
      eventNs: "caseCardSlider",
      onIndexChange: function (i, slides) {
        slides.each(function (slideIndex) {
          $(this).attr("aria-hidden", slideIndex === i ? "false" : "true");
        });
      },
    });
  }

  function initTeamCardSlider() {
    if (!$("body.page-mobile").length) {
      return;
    }

    var $root = $("[data-team-slider]");

    if (!$root.length) {
      return;
    }

    var $track = $root.find("[data-team-track]");
    var $slides = $track.children(".team-card");

    createMagneticSlider({
      $root: $root.find(".team__viewport"),
      $track: $track,
      $slides: $slides,
      gapFallback: 2,
      eventNs: "teamCardSlider",
      onIndexChange: function (i, slides) {
        slides.each(function (slideIndex) {
          $(this).attr("aria-hidden", slideIndex === i ? "false" : "true");
        });
      },
    });
  }

  function initCtaForm() {
    var $form = $("[data-cta-form]");
    var $name = $("[data-cta-name]");
    var $phone = $("[data-cta-phone]");
    var $message = $("[data-cta-message]");
    var $submit = $("[data-cta-submit]");

    if (!$form.length || !$submit.length) {
      return;
    }

    function isFilled($field) {
      return $.trim($field.val()).length > 0;
    }

    function syncSubmitState() {
      var ready =
        isFilled($name) && isFilled($phone) && isFilled($message);
      $submit.prop("disabled", !ready);
    }

    $form.on("input change", "input, textarea", syncSubmitState);

    $form.on("submit", function (event) {
      event.preventDefault();
      syncSubmitState();

      if ($submit.prop("disabled")) {
        return;
      }
    });

    syncSubmitState();
  }

  $(function () {
    initMobileNav();
    initCaseCardSlider();
    initTeamCardSlider();
    initCtaForm();
  });
})(jQuery);
