(function ($) {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("pageshow", function () {
    window.scrollTo(0, 0);
  });

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

  function initSignatureSlider() {
    var $root = $("[data-signature-slider]");

    if (!$root.length) {
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

    $(window).on("resize", function () {
      render(true);
    });

    setActiveCard();
    render(true);
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
    initHeaderScroll();
    initHeaderSubnav();
    initSignatureSlider();
    $(window).trigger("resize");
  });
})(jQuery);
