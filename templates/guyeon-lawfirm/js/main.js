if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", function () {
  window.scrollTo(0, 0);
});

function isMobileViewport() {
  return window.matchMedia("(max-width: 768px)").matches;
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

  function observeBandReveal($band, $cards, observerOptions) {
    if (!$band.length || !$cards.length) {
      return;
    }

    var bandStarted = false;

    var bandObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || bandStarted) {
            return;
          }

          bandStarted = true;
          revealSequential($cards, queueIntervalMs, 1);
          bandObserver.unobserve(entry.target);
        });
      },
      observerOptions
    );

    bandObserver.observe($band[0]);
  }

  var $heroTargets = $("#hero .scroll-reveal, .sub-hero .scroll-reveal");

  if ($heroTargets.length) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        revealSequential($heroTargets, heroIntervalMs, 1);
      });
    });
  }

  var $bandCards = $(".practice-card, .case-card, .team-card, .media-item");
  var $scrollTargets = $all.not($heroTargets).not($bandCards);

  if (!$scrollTargets.length && !$bandCards.filter(".scroll-reveal").length) {
    return;
  }

  var observerOptions = {
    threshold: 0.08,
    rootMargin: "80px 0px -5% 0px",
  };

  if (!("IntersectionObserver" in window)) {
    revealSequential($all.not($heroTargets), queueIntervalMs, 1);
    return;
  }

  if ($scrollTargets.length) {
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
  }

  observeBandReveal($("#practice .practice__list"), $(".practice-card.scroll-reveal"), observerOptions);
  observeBandReveal($("#case .case__body"), $(".case-card.scroll-reveal"), observerOptions);
  observeBandReveal($("#team .team__slider-wrap"), $(".team-card.scroll-reveal"), observerOptions);
  observeBandReveal($("#media .media__list"), $(".media-item.scroll-reveal"), observerOptions);
}

function initHeaderScroll() {
  var $header = $("#header");

  if (!$header.length) {
    return;
  }

  function sync() {
    $header.toggleClass("is-scrolled", window.scrollY > 0);
  }

  sync();
  $(window).on("scroll", sync);
}

function initGnb() {
  var $header = $("#header");

  if (!$header.length) {
    return;
  }

  var closeTimer = null;

  function openGnb() {
    if (isMobileViewport()) {
      return;
    }

    window.clearTimeout(closeTimer);
    $header.addClass("is-gnb-open");
  }

  function closeGnb() {
    $header.removeClass("is-gnb-open");
  }

  function scheduleClose() {
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(closeGnb, 120);
  }

  $header.on("mouseenter", openGnb);
  $header.on("mouseleave", scheduleClose);

  $header.on("focusin", openGnb);

  $header.on("focusout", function (event) {
    if (!$header[0].contains(event.relatedTarget)) {
      closeGnb();
    }
  });

  $(window).on("resize", function () {
    if (isMobileViewport()) {
      closeGnb();
    }
  });
}

function initMobileNav() {
  if ($("body").hasClass("page-mobile")) {
    return;
  }

  var $btn = $(".header__menu-btn");
  var $nav = $("#mobile-nav");

  if (!$btn.length || !$nav.length) {
    return;
  }

  function setOpen(isOpen) {
    $nav.toggleClass("is-open", isOpen);
    $btn.attr("aria-expanded", isOpen);
    $btn.attr("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    $("body").toggleClass("is-nav-open", isOpen);

    if (!isOpen) {
      $(".mobile-nav__item--has-sub").removeClass("is-open");
      $(".mobile-nav__trigger").attr("aria-expanded", "false");
    }
  }

  $btn.on("click", function () {
    setOpen(!$nav.hasClass("is-open"));
  });

  $(".mobile-nav__trigger").on("click", function () {
    var $item = $(this).closest(".mobile-nav__item--has-sub");
    var isOpen = $item.hasClass("is-open");

    $(".mobile-nav__item--has-sub").removeClass("is-open");
    $(".mobile-nav__trigger").attr("aria-expanded", "false");

    if (!isOpen) {
      $item.addClass("is-open");
      $(this).attr("aria-expanded", "true");
    }
  });

  $(".mobile-nav__sub-link").on("click", function () {
    if (isMobileViewport()) {
      setOpen(false);
    }
  });
}

function initCaseSlider() {
  var $track = $("[data-case-track]");
  var $pages = $track.children(".case__page");
  var $prev = $("[data-case-prev]");
  var $next = $("[data-case-next]");

  if (!$track.length || $pages.length < 2) {
    return;
  }

  var index = 0;
  var pageCount = $pages.length;
  var isLocked = false;
  var durationMs = 450;

  function syncNavState() {
    $prev.prop("disabled", index <= 0);
    $next.prop("disabled", index >= pageCount - 1);
  }

  function render(instant) {
    var pageWidth = $track.parent().innerWidth();

    $track.css(
      "transition",
      instant ? "none" : "transform " + durationMs + "ms ease"
    );
    $track.css("transform", "translate3d(" + -index * pageWidth + "px, 0, 0)");
    syncNavState();
  }

  function go(step) {
    if (isLocked) {
      return;
    }

    var next = index + step;

    if (next < 0 || next >= pageCount) {
      return;
    }

    isLocked = true;
    index = next;
    render(false);

    window.setTimeout(function () {
      isLocked = false;
    }, durationMs);
  }

  $prev.on("click", function (event) {
    event.preventDefault();
    go(-1);
  });

  $next.on("click", function (event) {
    event.preventDefault();
    go(1);
  });

  $(window).on("resize", function () {
    render(true);
  });

  render(true);
}

function initTeamSlider() {
  if (isMobileViewport() || $("body").hasClass("page-mobile")) {
    return;
  }

  var $root = $("[data-team-slider]");
  var $track = $("[data-team-track]");
  var $slides = $track.children(".team-card");

  if (!$root.length || !$track.length || $slides.length < 2) {
    return;
  }

  var index = 0;
  var dragging = false;
  var startX = 0;
  var deltaX = 0;
  var durationMs = 450;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var rootEl = $root[0];

  function getGap() {
    var styles = window.getComputedStyle($track[0]);
    return parseFloat(styles.columnGap || styles.gap || "2") || 2;
  }

  function getStep() {
    var $slide = $slides.eq(0);
    return $slide.outerWidth() + getGap();
  }

  function getMaxIndex() {
    var viewportWidth = $root.find(".team__viewport").innerWidth();
    var totalWidth = getStep() * $slides.length - getGap();
    var maxScroll = Math.max(0, totalWidth - viewportWidth);
    return Math.ceil(maxScroll / getStep());
  }

  function clampIndex(value) {
    return Math.max(0, Math.min(value, getMaxIndex()));
  }

  function render(instant, dragDelta) {
    dragDelta = dragDelta || 0;
    var translateX = -index * getStep() + dragDelta;

    $track.css(
      "transition",
      instant || dragging || prefersReducedMotion
        ? "none"
        : "transform " + durationMs + "ms cubic-bezier(0.22, 1, 0.36, 1)"
    );
    $track.css("transform", "translate3d(" + translateX + "px, 0, 0)");
  }

  function snapFromDrag() {
    var step = getStep();
    var moved = -deltaX / step;
    var next = index;

    if (Math.abs(deltaX) > step * 0.18) {
      next = deltaX < 0 ? index + 1 : index - 1;
    }

    index = clampIndex(next);
    dragging = false;
    $root.removeClass("is-dragging");
    render(false);
  }

  function onPointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    dragging = true;
    startX = event.clientX;
    deltaX = 0;
    $root.addClass("is-dragging");
    render(true);

    if (rootEl.setPointerCapture) {
      rootEl.setPointerCapture(event.pointerId);
    }
  }

  function onPointerMove(event) {
    if (!dragging) {
      return;
    }

    deltaX = event.clientX - startX;
    render(true, deltaX);

    if (event.cancelable) {
      event.preventDefault();
    }
  }

  function onPointerUp() {
    if (!dragging) {
      return;
    }

    snapFromDrag();
  }

  $root.on("pointerdown", onPointerDown);
  $root.on("pointermove", onPointerMove);
  $root.on("pointerup pointercancel", onPointerUp);
  $root.on("dragstart", function (event) {
    event.preventDefault();
  });

  $(window).on("resize", function () {
    index = clampIndex(index);
    render(true);
  });

  render(true);
}

function initCtaForm() {
  if ($("body").hasClass("page-mobile")) {
    return;
  }

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

function initSubTeamPicker() {
  var $root = $("[data-sub-team]");

  if (!$root.length) {
    return;
  }

  var $tabs = $root.find("[data-team-tab]");
  var $panels = $root.find("[data-team-panel]");

  function activate(index) {
    $tabs.removeClass("is-active").attr({
      "aria-selected": "false",
      tabindex: "-1",
    });
    $panels.removeClass("is-active").prop("hidden", true);

    var $tab = $tabs.filter('[data-team-tab="' + index + '"]');
    var $panel = $panels.filter('[data-team-panel="' + index + '"]');

    $tab.addClass("is-active").attr({
      "aria-selected": "true",
      tabindex: "0",
    });
    $panel.addClass("is-active").prop("hidden", false);
  }

  $tabs.on("click", function () {
    activate($(this).data("team-tab"));
  });

  $tabs.on("keydown", function (event) {
    var current = $tabs.index(this);
    var next = current;

    if (event.key === "ArrowRight") {
      next = (current + 1) % $tabs.length;
    } else if (event.key === "ArrowLeft") {
      next = (current - 1 + $tabs.length) % $tabs.length;
    } else {
      return;
    }

    event.preventDefault();
    activate(next);
    $tabs.eq(next).focus();
  });
}

$(function () {
  $("html").addClass("js");
  void document.documentElement.offsetHeight;
  initScrollReveal();
  initHeaderScroll();
  initGnb();
  initMobileNav();
  initCaseSlider();
  initTeamSlider();
  initSubTeamPicker();
  initCtaForm();
});
