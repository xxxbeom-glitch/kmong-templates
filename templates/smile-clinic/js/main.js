(function ($) {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("pageshow", function () {
    window.scrollTo(0, 0);
  });

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
    $("html").addClass("js");
    void document.documentElement.offsetHeight;
    initScrollReveal();
    initHeaderScroll();
    initHeaderSubnav();
    initSignatureSlider();
    $(window).trigger("resize");
  });
})(jQuery);
