(function ($) {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("pageshow", function () {
    window.scrollTo(0, 0);
    $("#header").removeClass("is-header-hidden");
  });

  function initHeaderAutoHide() {
    var $header = $("#header");

    if (!$header.length) {
      return;
    }

    var lastScrollY = window.scrollY || window.pageYOffset;
    var deltaMin = 4;
    var isHidden = false;
    var ticking = false;

    function setHidden(nextHidden) {
      if (isHidden === nextHidden) {
        return;
      }

      isHidden = nextHidden;
      $header.toggleClass("is-header-hidden", nextHidden);
    }

    function syncFromScrollY(scrollY) {
      if (scrollY <= 8) {
        setHidden(false);
      } else if (scrollY > lastScrollY + deltaMin) {
        setHidden(true);
      } else if (scrollY < lastScrollY - deltaMin) {
        setHidden(false);
      }

      lastScrollY = scrollY;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) {
          return;
        }

        ticking = true;

        window.requestAnimationFrame(function () {
          syncFromScrollY(window.scrollY || window.pageYOffset);
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  function revealSequential($targets, intervalMs) {
    $targets.each(function (index) {
      var el = this;

      window.setTimeout(function () {
        $(el).addClass("is-revealed");
      }, index * intervalMs);
    });
  }

  function initScrollReveal() {
    var sectionIntervalMs = 180;
    var $sections = $("#business, #projects, #newsroom, #investor, #careers");

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

    $sections.each(function () {
      var $section = $(this);

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }

            var $pending = $section.find(".scroll-reveal:not(.is-revealed)");

            if (!$pending.length) {
              observer.unobserve(entry.target);
              return;
            }

            $section.addClass("is-scroll-reveal-started");
            revealSequential($pending, sectionIntervalMs);
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.1,
          rootMargin: "80px 0px -5% 0px",
        }
      );

      observer.observe(this);
    });
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
        window.requestAnimationFrame(frame);
        return;
      }

      renderStatsCounter($el, end);
    }

    window.requestAnimationFrame(frame);
  }

  function initStatsCounter() {
    var $section = $("#investor");
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
        var end = parseFloat($counter.attr("data-count-value"), 10);

        if (prefersReducedMotion) {
          renderStatsCounter($counter, end);
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

  function initVisionPinScale() {
    var $section = $("#vision");
    var $wrap = $section.find("[data-vision-pin-wrap]");
    var $shell = $section.find(".vision__shell");

    if (!$section.length || !$wrap.length || !$shell.length) {
      return;
    }

    var sectionEl = $section[0];
    var wrapEl = $wrap[0];
    var shellEl = $shell[0];
    var mqMobile = window.matchMedia("(max-width: 768px)");
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var targetProgress = 0;
    var smoothProgress = 0;
    var lastFrameTime = performance.now();
    var rafId = null;
    var isRunning = false;
    var endW = 0;
    var endH = 0;
    var startW = 0;
    var startH = 0;
    var growPhase = 0.14;
    var titleStart = 0.05;
    var titleSpan = 0.22;

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function readNumberVar(name, fallback) {
      var raw = window.getComputedStyle(sectionEl).getPropertyValue(name).trim();

      return parseFloat(raw) || fallback;
    }

    function measureBounds() {
      var shellRect = shellEl.getBoundingClientRect();
      var pad = readNumberVar("--layout-pad-x", 40);
      var gutter = pad * 2;

      endW = Math.max(shellRect.width - gutter, 1);
      endH = Math.max(shellRect.height - gutter, 1);
      startW = readNumberVar("--vision-card-start-w", 560);
      startH = readNumberVar("--vision-card-start-h", 340);
      growPhase = readNumberVar("--vision-grow-phase", 0.14);
    }

    function readScrubSeconds() {
      return readNumberVar("--vision-pin-scrub", 0.85);
    }

    function resetPinState() {
      sectionEl.style.removeProperty("--vision-card-w");
      sectionEl.style.removeProperty("--vision-card-h");
      sectionEl.style.removeProperty("--vision-overlay-strength");
      sectionEl.style.removeProperty("--vision-title-opacity");
      sectionEl.style.removeProperty("--vision-title-shift");
      $section.removeClass("is-vision-pin-active");
    }

    function applyStaticState() {
      resetPinState();
    }

    function applyPinState(progress) {
      var growProgress = clamp(progress / growPhase, 0, 1);
      var cardW = startW + (endW - startW) * growProgress;
      var cardH = startH + (endH - startH) * growProgress;
      var titleProgress = clamp((progress - titleStart) / titleSpan, 0, 1);
      var titleShift = (1 - titleProgress) * 100;

      sectionEl.style.setProperty("--vision-card-w", cardW + "px");
      sectionEl.style.setProperty("--vision-card-h", cardH + "px");
      sectionEl.style.setProperty("--vision-overlay-strength", String(growProgress));
      sectionEl.style.setProperty("--vision-title-opacity", String(titleProgress));
      sectionEl.style.setProperty("--vision-title-shift", titleShift + "%");
      $section.addClass("is-vision-pin-active");
    }

    function measureTargetProgress() {
      var rect = wrapEl.getBoundingClientRect();
      var viewportH = window.innerHeight || document.documentElement.clientHeight;
      var scrollRange = Math.max(wrapEl.offsetHeight - viewportH, 1);

      targetProgress = clamp(-rect.top / scrollRange, 0, 1);
    }

    function stopScrubLoop() {
      isRunning = false;

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function scrubLoop(now) {
      if (!isRunning) {
        return;
      }

      var dt = Math.min((now - lastFrameTime) / 1000, 0.05);
      var scrubSeconds = readScrubSeconds();

      lastFrameTime = now;

      var alpha = 1 - Math.exp(-dt / scrubSeconds);

      smoothProgress += (targetProgress - smoothProgress) * alpha;

      if (Math.abs(targetProgress - smoothProgress) < 0.0005) {
        smoothProgress = targetProgress;
      }

      applyPinState(smoothProgress);
      rafId = window.requestAnimationFrame(scrubLoop);
    }

    function startScrubLoop() {
      if (isRunning) {
        return;
      }

      isRunning = true;
      lastFrameTime = performance.now();
      rafId = window.requestAnimationFrame(scrubLoop);
    }

    function syncPinMode() {
      if (mqMobile.matches || prefersReducedMotion) {
        stopScrubLoop();
        smoothProgress = 0;
        targetProgress = 0;
        applyStaticState();
        return;
      }

      measureBounds();
      $section.addClass("is-vision-pin-active");
      measureTargetProgress();
      smoothProgress = targetProgress;
      applyPinState(smoothProgress);
      startScrubLoop();
    }

    function onScroll() {
      if (!isRunning) {
        return;
      }

      measureTargetProgress();
    }

    function onResize() {
      if (!isRunning) {
        syncPinMode();
        return;
      }

      measureBounds();
      measureTargetProgress();
    }

    syncPinMode();

    $(window).on("scroll.visionPin", onScroll);
    $(window).on("resize.visionPin", onResize);
    $(window).on("load.visionPin", onResize);

    if (typeof mqMobile.addEventListener === "function") {
      mqMobile.addEventListener("change", syncPinMode);
    } else if (typeof mqMobile.addListener === "function") {
      mqMobile.addListener(syncPinMode);
    }
  }

  function initProjectsDragScroll() {
    var $scroll = $("[data-projects-scroll][data-drag-scroll]");
    var scrollEl = $scroll[0];

    if (!scrollEl) {
      return;
    }

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
    scrollEl.addEventListener("lostpointercapture", endDrag);

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
  }

  $(function () {
    initHeaderAutoHide();
    initVisionPinScale();
    initScrollReveal();
    initStatsCounter();
    initProjectsDragScroll();
  });
})(jQuery);
