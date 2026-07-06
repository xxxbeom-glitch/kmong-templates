(function ($) {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("pageshow", function () {
    window.scrollTo(0, 0);
  });

  function initHeaderToggle() {
    var $toggle = $(".site-header__toggle");
    var $nav = $("#site-navigation");

    if (!$toggle.length || !$nav.length) {
      return;
    }

    $toggle.on("click", function () {
      var isOpen = $nav.toggleClass("is-open").hasClass("is-open");
      $toggle.attr("aria-expanded", isOpen ? "true" : "false");
    });
  }

  function initDigitalTabs() {
    var $digitalSection = $(".section-digital");

    if (!$digitalSection.length) {
      return;
    }

    var $digitalImg = $digitalSection.find(".section-digital__img");
    var $digitalTriggers = $digitalSection.find(".section-digital__trigger");

    $digitalTriggers.on("click", function () {
      var $trigger = $(this);
      var nextSrc = $trigger.attr("data-image");

      if (!nextSrc || !$digitalImg.length) {
        return;
      }

      $digitalTriggers.attr("aria-pressed", "false");
      $digitalSection.find(".section-digital__item").removeClass("is-active");
      $trigger.attr("aria-pressed", "true");
      $trigger.closest(".section-digital__item").addClass("is-active");
      $digitalImg.attr("src", nextSrc);
    });
  }

  function initScrollReveal() {
    var queueIntervalMs = 85;
    var revealQueue = [];
    var revealTimer = null;
    var $all = $(".scroll-reveal");

    if (!$all.length) {
      return;
    }

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

    function revealSequential($targets, intervalMs) {
      $targets.each(function (index) {
        var el = this;

        window.setTimeout(function () {
          $(el).addClass("is-revealed");
        }, index * intervalMs);
      });
    }

    if (!("IntersectionObserver" in window)) {
      revealSequential($all, queueIntervalMs);
      return;
    }

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
      {
        threshold: 0.12,
        rootMargin: "80px 0px -5% 0px",
      }
    );

    $all.each(function () {
      observer.observe(this);
    });
  }

  $(function () {
    $("html").addClass("js");
    initHeaderToggle();
    initDigitalTabs();
    initScrollReveal();
  });
})(jQuery);
