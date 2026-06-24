(function ($) {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  var onAppReadyCallbacks = [];

  function onAppReady(callback) {
    if (typeof callback !== "function") {
      return;
    }

    if (document.body.classList.contains("is-splash-active")) {
      onAppReadyCallbacks.push(callback);
      return;
    }

    callback();
  }

  function runAppReadyCallbacks() {
    onAppReadyCallbacks.forEach(function (callback) {
      callback();
    });
    onAppReadyCallbacks = [];
  }

  function initSplash() {
    var splashEl = document.getElementById("splash");

    if (!splashEl) {
      return;
    }

    document.body.classList.add("is-splash-active");

    var fillEl = splashEl.querySelector(".splash__logo-fill");
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function dismissSplash() {
      splashEl.classList.add("is-leaving");

      window.setTimeout(function () {
        splashEl.remove();
        document.body.classList.remove("is-splash-active");
        runAppReadyCallbacks();
      }, 400);
    }

    if (prefersReducedMotion) {
      window.setTimeout(dismissSplash, 300);
      return;
    }

    if (fillEl) {
      fillEl.addEventListener("animationend", dismissSplash, { once: true });
    } else {
      window.setTimeout(dismissSplash, 2000);
    }
  }

  function initHeroProgressSlider() {
    var $root = $("[data-hero-progress-slider]");

    if (!$root.length) {
      return;
    }

    var $slides = $root.find(".hero__slide");
    var $fill = $root.find(".hero__progress-fill");
    var $track = $root.find(".hero__progress");
    var $prev = $root.find(".hero__arrow--prev");
    var $next = $root.find(".hero__arrow--next");
    var $title = $root.find(".hero__title");
    var $subtitle = $root.find(".hero__subtitle");
    var total = $slides.length;
    var index = 0;
    var durationMs = 6000;
    var fillAnim = null;
    var rafId = null;
    var isBooted = false;
    var isPaused = false;
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!total) {
      return;
    }

    function getTrackWidth() {
      return $track[0] ? $track[0].getBoundingClientRect().width : 0;
    }

    function setFillWidth(px) {
      $fill.css("width", Math.max(0, px) + "px");
    }

    function syncSlideMedia() {
      $slides.each(function (slideIndex) {
        var videoEl = this.querySelector(".hero__video");

        if (!videoEl) {
          return;
        }

        if (slideIndex === index) {
          var playPromise = videoEl.play();

          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(function () {
              /* autoplay blocked */
            });
          }
        } else {
          videoEl.pause();
        }
      });
    }

    function updateHeroCopy() {
      var $active = $slides.eq(index);

      $title.text($active.data("hero-title") || "");
      $subtitle.text($active.data("hero-subtitle") || "");
    }

    function updateArrows() {
      $prev.prop("disabled", false);
      $next.prop("disabled", false);
    }

    function goTo(nextIndex) {
      index = (nextIndex + total) % total;
      $slides.removeClass("is-active").eq(index).addClass("is-active");
      updateHeroCopy();
      syncSlideMedia();
      updateArrows();
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

      if (prefersReducedMotion || total <= 1 || isPaused) {
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

          if (!isPaused) {
            onDone();
          }
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

          if (!isPaused) {
            onDone();
          }

          return;
        }

        rafId = requestAnimationFrame(tick);
      }

      rafId = requestAnimationFrame(tick);
    }

    function startSlideTimer(fromPx) {
      if (isPaused || prefersReducedMotion || total <= 1) {
        return;
      }

      startFill(fromPx, durationMs, function () {
        goTo(index + 1);
        setFillWidth(0);
        startSlideTimer(0);
      });
    }

    function restartTimer() {
      stopFillAnim();
      setFillWidth(0);

      if (!isPaused && !prefersReducedMotion && total > 1) {
        startSlideTimer(0);
      }
    }

    function nextSlideManual() {
      stopFillAnim();
      goTo(index + 1);
      setFillWidth(0);
      restartTimer();
    }

    function prevSlideManual() {
      stopFillAnim();
      goTo(index - 1);
      setFillWidth(0);
      restartTimer();
    }

    function pauseSlider() {
      if (isPaused) {
        return;
      }

      isPaused = true;
      stopFillAnim();
    }

    function resumeSlider() {
      if (!isPaused) {
        return;
      }

      isPaused = false;

      if (!prefersReducedMotion && total > 1) {
        startSlideTimer(0);
      }
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
      setFillWidth(0);

      if (prefersReducedMotion || total <= 1) {
        setFillWidth(getTrackWidth());
        return;
      }

      startSlideTimer(0);
    }

    $next.on("click", nextSlideManual);
    $prev.on("click", prevSlideManual);

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      $root.on("mouseenter", pauseSlider);
      $root.on("mouseleave", resumeSlider);
    }

    if (document.readyState === "complete") {
      bootSlider();
    } else {
      $(window).on("load", bootSlider);
    }
  }

  function initScrollReveal() {
    var queueIntervalMs = 85;
    var revealQueue = [];
    var revealTimer = null;
    var $all = $(".scroll-reveal");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      $all.addClass("is-revealed");
      return;
    }

    if (!$all.length) {
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

    if (!("IntersectionObserver" in window)) {
      $all.each(function (index) {
        var el = this;

        window.setTimeout(function () {
          $(el).addClass("is-revealed");
        }, (index + 1) * queueIntervalMs);
      });
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
        threshold: 0.08,
        rootMargin: "80px 0px -5% 0px",
      }
    );

    $all.each(function () {
      observer.observe(this);
    });
  }

  function initHeroMagneticScroll() {
    var $hero = $("[data-hero-magnetic-scroll]");

    if (!$hero.length) {
      return;
    }

    if (window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var snapThreshold = 10;
    var snapDurationMs = prefersReducedMotion ? 0 : 720;
    var isSnapping = false;
    var snapTimer = null;

    function getSnapPositions() {
      var heroBottom = Math.round($hero.outerHeight());

      return {
        heroTop: 0,
        modelsTop: heroBottom,
      };
    }

    function clearSnapTimer() {
      if (snapTimer) {
        window.clearTimeout(snapTimer);
        snapTimer = null;
      }
    }

    function finishSnap() {
      clearSnapTimer();
      isSnapping = false;
    }

    function snapTo(targetY) {
      if (isSnapping) {
        return;
      }

      isSnapping = true;
      clearSnapTimer();

      window.scrollTo({
        top: targetY,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      snapTimer = window.setTimeout(finishSnap, snapDurationMs);
    }

    window.addEventListener(
      "wheel",
      function (event) {
        if (document.body.classList.contains("is-splash-active") || isSnapping) {
          if (isSnapping && event.cancelable) {
            event.preventDefault();
          }

          return;
        }

        var scrollY = window.scrollY || window.pageYOffset;
        var positions = getSnapPositions();
        var deltaY = event.deltaY;

        if (deltaY > 0 && scrollY <= snapThreshold) {
          if (event.cancelable) {
            event.preventDefault();
          }

          event.stopImmediatePropagation();
          snapTo(positions.modelsTop);
          return;
        }

        if (
          deltaY < 0 &&
          scrollY >= positions.modelsTop - snapThreshold &&
          scrollY <= positions.modelsTop + snapThreshold
        ) {
          if (event.cancelable) {
            event.preventDefault();
          }

          event.stopImmediatePropagation();
          snapTo(positions.heroTop);
        }
      },
      { passive: false }
    );
  }

  function initModelsPinScroll() {
    var $section = $("[data-models-pin-scroll]");

    if (!$section.length) {
      return;
    }

    var $pin = $section.find(".models__pin");
    var $viewport = $section.find("[data-models-cards-viewport]");
    var $track = $section.find("[data-models-cards-track]");
    var pinEl = $pin[0];
    var viewportEl = $viewport[0];
    var trackEl = $track[0];
    var enabled = false;
    var pinStart = 0;
    var scrollRange = 0;
    var maxShift = 0;
    var currentOffset = 0;
    var targetOffset = 0;
    var smoothRafId = null;
    var isWheelDriving = false;
    var wheelDriveTimer = null;
    var scrollTicking = false;
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var SMOOTH_LERP = 0.18;
    var WHEEL_DRIVE_COOLDOWN = 140;
    var PIN_THRESHOLD = 10;

    if (!pinEl || !viewportEl || !trackEl) {
      return;
    }

    function getHeaderHeight() {
      var headerEl = document.getElementById("header");
      return headerEl ? headerEl.getBoundingClientRect().height : 0;
    }

    function getStickyHeight() {
      return Math.max(0, window.innerHeight - getHeaderHeight());
    }

    function isMobile() {
      return window.matchMedia("(max-width: 768px)").matches;
    }

    function refreshPinStart() {
      pinStart = Math.round($pin.offset().top);
    }

    function clampOffset(value) {
      return Math.max(0, Math.min(scrollRange, value));
    }

    function normalizeWheelDelta(event) {
      var delta = event.deltaY;

      if (event.deltaMode === 1) {
        delta *= 16;
      } else if (event.deltaMode === 2) {
        delta *= window.innerHeight;
      }

      return delta;
    }

    function stopSmoothLoop() {
      if (smoothRafId) {
        cancelAnimationFrame(smoothRafId);
        smoothRafId = null;
      }
    }

    function setPinActiveState(offset) {
      var scrollY = window.scrollY || window.pageYOffset;

      if (scrollY <= pinStart) {
        $section.toggleClass("is-models-pin-active", scrollY >= pinStart - 1);
        return;
      }

      if (scrollY >= pinStart + scrollRange) {
        $section.removeClass("is-models-pin-active");
        return;
      }

      if (offset > 0 && offset < scrollRange) {
        $section.addClass("is-models-pin-active");
      }
    }

    function applyTransformFromOffset(offset) {
      if (!enabled) {
        return;
      }

      offset = clampOffset(offset);
      var progress = scrollRange > 0 ? offset / scrollRange : 0;

      trackEl.style.transform = "translate3d(0, " + -maxShift * progress + "px, 0)";
      setPinActiveState(offset);
    }

    function syncScrollToOffset(offset) {
      offset = clampOffset(offset);
      refreshPinStart();

      var desiredScroll = pinStart + offset;
      var scrollY = window.scrollY || window.pageYOffset;

      if (Math.abs(scrollY - desiredScroll) > 0.5) {
        window.scrollTo(0, desiredScroll);
      }
    }

    function readOffsetFromScroll() {
      refreshPinStart();

      var scrollY = window.scrollY || window.pageYOffset;
      return clampOffset(scrollY - pinStart);
    }

    function tickSmooth() {
      smoothRafId = null;

      if (!enabled) {
        return;
      }

      var diff = targetOffset - currentOffset;

      if (Math.abs(diff) < 0.35) {
        currentOffset = targetOffset;
      } else {
        currentOffset += diff * SMOOTH_LERP;
      }

      applyTransformFromOffset(currentOffset);

      if (isWheelDriving) {
        syncScrollToOffset(currentOffset);
      }

      if (Math.abs(targetOffset - currentOffset) >= 0.35) {
        smoothRafId = requestAnimationFrame(tickSmooth);
      }
    }

    function startSmoothLoop() {
      if (!smoothRafId) {
        smoothRafId = requestAnimationFrame(tickSmooth);
      }
    }

    function markWheelDriving() {
      isWheelDriving = true;

      if (wheelDriveTimer) {
        window.clearTimeout(wheelDriveTimer);
      }

      wheelDriveTimer = window.setTimeout(function () {
        isWheelDriving = false;
        wheelDriveTimer = null;
      }, WHEEL_DRIVE_COOLDOWN);
    }

    function driveByWheel(deltaY) {
      if (!smoothRafId) {
        currentOffset = readOffsetFromScroll();
        targetOffset = currentOffset;
      }

      markWheelDriving();
      targetOffset = clampOffset(targetOffset + deltaY);
      startSmoothLoop();
    }

    function resetPin() {
      enabled = false;
      stopSmoothLoop();
      isWheelDriving = false;

      if (wheelDriveTimer) {
        window.clearTimeout(wheelDriveTimer);
        wheelDriveTimer = null;
      }

      currentOffset = 0;
      targetOffset = 0;
      pinEl.style.height = "";
      trackEl.style.transform = "";
      $section.removeClass("is-models-pin-active is-models-pin-disabled");
    }

    function measure() {
      resetPin();

      if (isMobile() || prefersReducedMotion) {
        $section.addClass("is-models-pin-disabled");
        return;
      }

      maxShift = Math.max(0, trackEl.offsetHeight - viewportEl.clientHeight);

      if (maxShift <= 1) {
        $section.addClass("is-models-pin-disabled");
        return;
      }

      var stickyHeight = getStickyHeight();
      scrollRange = maxShift;
      pinEl.style.height = stickyHeight + scrollRange + "px";
      document.documentElement.style.setProperty("--models-pin-height", stickyHeight + "px");
      refreshPinStart();
      enabled = true;
      updateCardsPosition();
    }

    function updateCardsPosition() {
      if (!enabled || isWheelDriving) {
        return;
      }

      var offset = readOffsetFromScroll();
      currentOffset = offset;
      targetOffset = offset;
      applyTransformFromOffset(offset);
    }

    function onScroll() {
      if (!enabled || isWheelDriving) {
        return;
      }

      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(function () {
          updateCardsPosition();
          scrollTicking = false;
        });
      }
    }

    function onWheel(event) {
      if (!enabled || isMobile() || document.body.classList.contains("is-splash-active")) {
        return;
      }

      var scrollY = window.scrollY || window.pageYOffset;
      refreshPinStart();
      var deltaY = normalizeWheelDelta(event);
      var pinEnd = pinStart + scrollRange;
      var inPinRange = scrollY >= pinStart && scrollY <= pinEnd;
      var atPinStart =
        scrollY >= pinStart - PIN_THRESHOLD && scrollY <= pinStart + PIN_THRESHOLD;
      var atPinEnd = scrollY >= pinEnd - PIN_THRESHOLD;

      if (scrollY < pinStart - PIN_THRESHOLD) {
        return;
      }

      if (atPinStart && deltaY < 0) {
        return;
      }

      if (atPinEnd && deltaY > 0) {
        return;
      }

      if (inPinRange || (atPinStart && deltaY > 0)) {
        if (event.cancelable) {
          event.preventDefault();
        }

        driveByWheel(deltaY);
      }
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", measure);
    $(window).on("load", measure);
  }

  function initTechnologyCards() {
    var $container = $("[data-technology-cards]");

    if (!$container.length) {
      return;
    }

    var $cards = $container.find(".technology-card");

    if ($cards.length < 2) {
      return;
    }

    var $defaultCard = $cards.first();
    var hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    function setActive($card) {
      if (!$card || !$card.length) {
        return;
      }

      $cards.removeClass("is-active");
      $card.addClass("is-active");
    }

    setActive($defaultCard);

    if (hasFinePointer) {
      $cards.on("mouseenter", function () {
        setActive($(this));
      });

      $cards.on("focus", function () {
        setActive($(this));
      });

      $container.on("mouseleave", function () {
        setActive($defaultCard);
      });
    } else {
      $cards.on("click", function () {
        setActive($(this));
      });
    }
  }

  function initFsdVideo() {
    var $video = $(".fsd__video");

    if (!$video.length) {
      return;
    }

    var videoEl = $video.get(0);

    if (!videoEl) {
      return;
    }

    var playPromise = videoEl.play();

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {
        /* autoplay blocked */
      });
    }
  }

  function bootInteractions() {
    initHeroProgressSlider();
    initScrollReveal();
    initHeroMagneticScroll();
    initModelsPinScroll();
    initTechnologyCards();
    initFsdVideo();
  }

  $(function () {
    $("html").addClass("js");
    window.scrollTo(0, 0);
    initSplash();

    if (document.getElementById("splash")) {
      onAppReady(bootInteractions);
    } else {
      bootInteractions();
    }
  });
})(jQuery);
