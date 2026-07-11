(function ($) {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  function initHeroProgressSlider() {
    var $root = $("[data-hero-progress-slider]");

    if (!$root.length) {
      return;
    }

    var $slides = $root.find(".hero__slide");
    var $dots = $root.find(".hero__pager-dot");
    var $title = $root.find(".hero__title");
    var total = $slides.length;
    var index = 0;
    var defaultDurationMs = 6000;
    var slideTimer = null;
    var isBooted = false;
    var isPaused = false;
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var segmentHandlers = new WeakMap();

    if (!total) {
      return;
    }

    function getSlideSegment(slideEl) {
      var $slide = $(slideEl);
      var start = parseFloat($slide.data("video-start"));
      var end = parseFloat($slide.data("video-end"));

      return {
        start: isNaN(start) ? 0 : start,
        end: isNaN(end) ? null : end,
      };
    }

    function getSlideDurationMs(slideIndex) {
      var slideEl = $slides.get(slideIndex);

      if (!slideEl) {
        return defaultDurationMs;
      }

      var segment = getSlideSegment(slideEl);

      if (segment.end !== null && segment.end > segment.start) {
        return Math.round((segment.end - segment.start) * 1000);
      }

      return defaultDurationMs;
    }

    function unbindVideoSegment(videoEl) {
      var handler = segmentHandlers.get(videoEl);

      if (handler) {
        videoEl.removeEventListener("timeupdate", handler);
        segmentHandlers.delete(videoEl);
      }
    }

    function bindVideoSegment(videoEl, slideEl) {
      unbindVideoSegment(videoEl);

      var segment = getSlideSegment(slideEl);

      if (segment.end === null || segment.end <= segment.start) {
        return;
      }

      function onTimeUpdate() {
        if (videoEl.currentTime >= segment.end - 0.04) {
          videoEl.currentTime = segment.start;
        }
      }

      segmentHandlers.set(videoEl, onTimeUpdate);
      videoEl.addEventListener("timeupdate", onTimeUpdate);
    }

    function playSlideVideo(videoEl, slideEl) {
      var segment = getSlideSegment(slideEl);

      function startPlayback() {
        if (segment.end !== null && segment.end > segment.start) {
          videoEl.currentTime = segment.start;
        }

        bindVideoSegment(videoEl, slideEl);

        var playPromise = videoEl.play();

        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(function () {
            /* autoplay blocked */
          });
        }
      }

      if (videoEl.readyState >= 1) {
        startPlayback();
        return;
      }

      videoEl.addEventListener("loadedmetadata", startPlayback, { once: true });
      videoEl.load();
    }

    function pauseSlideVideo(videoEl) {
      unbindVideoSegment(videoEl);
      videoEl.pause();
    }

    function syncSlideMedia() {
      $slides.each(function (slideIndex) {
        var videoEl = this.querySelector(".hero__video");

        if (!videoEl) {
          return;
        }

        if (slideIndex === index) {
          playSlideVideo(videoEl, this);
        } else {
          pauseSlideVideo(videoEl);
        }
      });
    }

    function updateHeroCopy() {
      var $active = $slides.eq(index);

      $title.text($active.data("hero-title") || "");
    }

    function updatePager() {
      $dots.removeClass("is-active").removeAttr("aria-current");
      $dots.eq(index).addClass("is-active").attr("aria-current", "true");
    }

    function goTo(nextIndex) {
      index = (nextIndex + total) % total;
      $slides.removeClass("is-active").eq(index).addClass("is-active");
      updateHeroCopy();
      syncSlideMedia();
      updatePager();
    }

    function stopSlideTimer() {
      if (slideTimer) {
        clearTimeout(slideTimer);
        slideTimer = null;
      }
    }

    function startSlideTimer() {
      stopSlideTimer();

      if (isPaused || prefersReducedMotion || total <= 1) {
        return;
      }

      slideTimer = window.setTimeout(function () {
        goTo(index + 1);
        startSlideTimer();
      }, getSlideDurationMs(index));
    }

    function restartTimer() {
      stopSlideTimer();

      if (!isPaused && !prefersReducedMotion && total > 1) {
        startSlideTimer();
      }
    }

    function goToManual(nextIndex) {
      stopSlideTimer();
      goTo(nextIndex);
      restartTimer();
    }

    function pauseSlider() {
      if (isPaused) {
        return;
      }

      isPaused = true;
      stopSlideTimer();
    }

    function resumeSlider() {
      if (!isPaused) {
        return;
      }

      isPaused = false;
      startSlideTimer();
    }

    function bootSlider() {
      if (isBooted) {
        return;
      }

      isBooted = true;
      goTo(0);

      if (!prefersReducedMotion && total > 1) {
        startSlideTimer();
      }
    }

    $dots.on("click", function () {
      var target = parseInt($(this).data("slide-to"), 10);

      if (!isNaN(target) && target !== index) {
        goToManual(target);
      }
    });

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
    var revealQueue = [];
    var revealTimer = null;
    var $heroTargets = $("#hero .scroll-reveal");
    var $scrollTargets = $(".scroll-reveal")
      .not("#hero .scroll-reveal")
      .not(".models-card.is-clone");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      $(".scroll-reveal").addClass("is-revealed");
      return;
    }

    function getQueueDelay(el) {
      if ($(el).hasClass("scroll-reveal--section")) {
        return 320;
      }

      if ($(el).hasClass("scroll-reveal--card")) {
        return 140;
      }

      return 85;
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
      revealTimer = window.setTimeout(processRevealQueue, getQueueDelay(el));
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
      $targets.each(function (targetIndex, el) {
        window.setTimeout(function () {
          $(el).addClass("is-revealed");
        }, (targetIndex + 1) * intervalMs);
      });
    }

    if ($heroTargets.length) {
      requestAnimationFrame(function () {
        revealSequential($heroTargets, 85);
      });
    }

    if (!$scrollTargets.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      revealSequential($scrollTargets, 85);
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

    $scrollTargets.each(function () {
      observer.observe(this);
    });
  }

  function initModelsDragScroll() {
    var viewport = document.querySelector("[data-models-cards-viewport][data-drag-scroll]");
    var track = document.querySelector("[data-models-cards-track]");

    if (!viewport || !track) {
      return;
    }

    var dragThreshold = 4;
    var isDragging = false;
    var didDrag = false;
    var dragStartX = 0;
    var lastClientX = 0;
    var lastMoveTime = 0;
    var velocityX = 0;
    var activePointerId = null;
    var momentumId = null;
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function isInteractiveTarget(target) {
      if (!target || !target.closest) {
        return false;
      }

      return !!target.closest(
        "a, button, input, textarea, select, label, [role='button'], .models-card__btn"
      );
    }

    function clampScroll(left) {
      var maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);

      return Math.max(0, Math.min(left, maxScroll));
    }

    function cancelMomentum() {
      if (momentumId) {
        window.cancelAnimationFrame(momentumId);
        momentumId = null;
      }

      viewport.classList.remove("is-settling");
    }

    function getCards() {
      return track.querySelectorAll(".models-card:not(.is-clone)");
    }

    function getSnapTarget() {
      var cards = getCards();

      if (!cards.length) {
        return viewport.scrollLeft;
      }

      var viewportCenter = viewport.scrollLeft + viewport.clientWidth * 0.5;
      var nearestLeft = viewport.scrollLeft;
      var minDist = Infinity;

      for (var i = 0; i < cards.length; i += 1) {
        var card = cards[i];
        var cardCenter = card.offsetLeft + card.offsetWidth * 0.5;
        var dist = Math.abs(cardCenter - viewportCenter);

        if (dist < minDist) {
          minDist = dist;
          nearestLeft =
            card.offsetLeft - (viewport.clientWidth - card.offsetWidth) * 0.5;
        }
      }

      return clampScroll(nearestLeft);
    }

    function animateScrollTo(targetLeft, duration, done) {
      cancelMomentum();

      var startLeft = viewport.scrollLeft;
      var distance = targetLeft - startLeft;

      if (Math.abs(distance) < 0.5 || duration <= 0 || prefersReducedMotion) {
        viewport.scrollLeft = targetLeft;

        if (done) {
          done();
        }

        return;
      }

      viewport.classList.add("is-settling");
      var startTime = null;

      function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
      }

      function step(now) {
        if (!startTime) {
          startTime = now;
        }

        var progress = Math.min((now - startTime) / duration, 1);

        viewport.scrollLeft = startLeft + distance * easeOutCubic(progress);

        if (progress < 1) {
          momentumId = window.requestAnimationFrame(step);
          return;
        }

        momentumId = null;
        viewport.classList.remove("is-settling");

        if (done) {
          done();
        }
      }

      momentumId = window.requestAnimationFrame(step);
    }

    function startMomentum(initialVelocity) {
      var scrollVelocity = -initialVelocity * 1000;

      if (Math.abs(scrollVelocity) < 60 || prefersReducedMotion) {
        animateScrollTo(getSnapTarget(), 320);
        return;
      }

      viewport.classList.add("is-settling");

      var friction = 0.9;
      var minVelocity = 12;
      var stepTime = performance.now();

      function step(now) {
        var dt = Math.min((now - stepTime) / 1000, 0.032);

        stepTime = now;
        viewport.scrollLeft = clampScroll(viewport.scrollLeft + scrollVelocity * dt);
        scrollVelocity *= Math.pow(friction, dt * 60);

        if (Math.abs(scrollVelocity) > minVelocity) {
          momentumId = window.requestAnimationFrame(step);
          return;
        }

        momentumId = null;
        viewport.classList.remove("is-settling");
        animateScrollTo(getSnapTarget(), 280);
      }

      momentumId = window.requestAnimationFrame(step);
    }

    function endDrag(pointerId) {
      if (!isDragging) {
        return;
      }

      isDragging = false;
      viewport.classList.remove("is-dragging");

      if (viewport.releasePointerCapture && pointerId != null) {
        try {
          viewport.releasePointerCapture(pointerId);
        } catch (error) {
          /* ignore */
        }
      }

      activePointerId = null;

      if (didDrag) {
        startMomentum(velocityX);
      }
    }

    viewport.addEventListener(
      "click",
      function (event) {
        if (didDrag) {
          event.preventDefault();
          event.stopImmediatePropagation();
          didDrag = false;
        }
      },
      true
    );

    viewport.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });

    viewport.addEventListener("pointerdown", function (event) {
      if (event.pointerType !== "mouse") {
        return;
      }

      if (event.button !== 0) {
        return;
      }

      if (isInteractiveTarget(event.target)) {
        return;
      }

      cancelMomentum();
      isDragging = true;
      didDrag = false;
      dragStartX = event.clientX;
      lastClientX = event.clientX;
      lastMoveTime = performance.now();
      velocityX = 0;
      activePointerId = event.pointerId;
      viewport.classList.add("is-dragging");

      if (viewport.setPointerCapture) {
        viewport.setPointerCapture(event.pointerId);
      }
    });

    viewport.addEventListener("pointermove", function (event) {
      if (!isDragging || event.pointerId !== activePointerId) {
        return;
      }

      var deltaX = event.clientX - lastClientX;
      var now = performance.now();
      var dt = now - lastMoveTime;

      if (Math.abs(event.clientX - dragStartX) >= dragThreshold) {
        didDrag = true;
      }

      if (!didDrag) {
        return;
      }

      if (dt > 0) {
        velocityX = deltaX / dt;
      }

      viewport.scrollLeft = clampScroll(viewport.scrollLeft - deltaX);
      lastClientX = event.clientX;
      lastMoveTime = now;

      if (event.cancelable) {
        event.preventDefault();
      }
    });

    viewport.addEventListener("pointerup", function (event) {
      if (event.pointerId !== activePointerId) {
        return;
      }

      endDrag(event.pointerId);
    });

    viewport.addEventListener("pointercancel", function (event) {
      if (event.pointerId !== activePointerId) {
        return;
      }

      endDrag(event.pointerId);
    });
  }

  function initChargingSlider() {
    var $pin = $("[data-charging-pin]");
    var $root = $("[data-charging-slider]");
    var $layout = $("[data-charging-layout]");
    var $textMount = $("[data-charging-text]");
    var $mediaMount = $("[data-charging-media]");
    var pinEl = $pin[0];
    var enterTriggerEl = document.querySelector("[data-charging-enter-trigger]");
    var steps = [];
    var index = -1;
    var lastScrollY = 0;
    var ticking = false;
    var $textPanels = $();
    var $mediaPanels = $();
    var pinMetrics = {
      start: 0,
      end: 0,
      vh: 0,
    };

    if (!$pin.length || !$root.length || !$textMount.length || !$mediaMount.length) {
      return;
    }

    try {
      var dataEl = document.getElementById("charging-slider-data");

      if (dataEl && dataEl.textContent) {
        steps = JSON.parse(dataEl.textContent);
      }
    } catch (error) {
      steps = [];
    }

    var total = steps.length;

    if (!total) {
      return;
    }

    function buildPanels() {
      var textHtml = "";
      var mediaHtml = "";

      steps.forEach(function (step, stepIndex) {
        var isFirst = stepIndex === 0;
        var activeClass = isFirst ? " is-active" : "";
        var hiddenAttr = isFirst ? ' aria-hidden="false"' : ' aria-hidden="true"';

        textHtml +=
          '<article class="charging-slider__text-panel' +
          activeClass +
          '"' +
          hiddenAttr +
          ' data-charging-text-panel="' +
          stepIndex +
          '">' +
          '<div class="charging-slider__text-panel-inner">' +
          '<div class="charging-slider__headline">' +
          '<p class="charging-slider__subtitle">' +
          (step.subtitle || "") +
          "</p>" +
          '<h2 class="charging-slider__title">' +
          (step.title || "") +
          "</h2>" +
          "</div>" +
          '<a href="' +
          (step.btnHref || "#") +
          '" class="charging-slider__btn">' +
          (step.btnLabel || "자세히 보기") +
          "</a>" +
          "</div>" +
          "</article>";

        mediaHtml +=
          '<div class="charging-slider__media-panel' +
          activeClass +
          '" data-charging-media-panel="' +
          stepIndex +
          '">' +
          '<img class="charging-slider__img" src="' +
          (step.image || "") +
          '" alt="" width="960" height="800" decoding="async">' +
          "</div>";
      });

      $textMount.html(textHtml);
      $mediaMount.html(mediaHtml);
      $textPanels = $textMount.find(".charging-slider__text-panel");
      $mediaPanels = $mediaMount.find(".charging-slider__media-panel");
      index = 0;
    }

    function getViewportHeight() {
      return window.innerHeight || document.documentElement.clientHeight || 0;
    }

    function getScrollY() {
      return window.pageYOffset || document.documentElement.scrollTop || 0;
    }

    function getEnterProgress() {
      var vh = pinMetrics.vh || getViewportHeight();

      if (!enterTriggerEl || !vh) {
        return 1;
      }

      var rect = enterTriggerEl.getBoundingClientRect();
      var range = rect.height || vh;

      if (range <= 0) {
        return 1;
      }

      return Math.max(0, Math.min(1, 1 - rect.bottom / range));
    }

    function applyEnterProgress(progress) {
      if (!$layout.length) {
        return;
      }

      if (progress >= 1) {
        $layout.addClass("is-enter-complete").removeClass("is-entering");
        $layout.css({
          "--enter-text-y": "",
          "--enter-media-y": "",
          "--enter-text-opacity": "",
        });
        return;
      }

      var inv = 1 - progress;

      $layout.addClass("is-entering").removeClass("is-enter-complete");
      $layout.css({
        "--enter-text-y": inv * 40 + "%",
        "--enter-media-y": inv * 50 + "%",
        "--enter-text-opacity": String(progress),
      });
    }

    function setActiveStep(stepIndex, scrollDirection) {
      if (stepIndex < 0 || stepIndex >= total || stepIndex === index) {
        return;
      }

      $textPanels.removeClass("is-active").attr("aria-hidden", "true");
      $textPanels.eq(stepIndex).addClass("is-active").attr("aria-hidden", "false");

      $mediaPanels.removeClass("is-active is-prev");
      $mediaPanels.eq(stepIndex).addClass("is-active");

      if (scrollDirection >= 0) {
        $mediaPanels.eq(stepIndex).addClass("is-prev");
      } else if (stepIndex > 0) {
        $mediaPanels.eq(stepIndex - 1).addClass("is-prev");
      } else {
        $mediaPanels.eq(0).addClass("is-prev");
      }

      index = stepIndex;
    }

    function syncActiveStep(stepIndex, scrollDirection) {
      if (stepIndex < 0 || stepIndex >= total) {
        return;
      }

      if (stepIndex === index) {
        return;
      }

      setActiveStep(stepIndex, scrollDirection);
    }

    function setProgress(progress, scrollDirection) {
      var clamped = Math.max(0, Math.min(1, progress));
      var activeIndex = total > 1 ? Math.round(clamped * (total - 1)) : 0;

      syncActiveStep(activeIndex, scrollDirection);
    }

    function clearPinClasses() {
      $root.removeClass("is-pin-fixed is-pin-ended");
    }

    function resetPin() {
      $pin.css("height", "");
      clearPinClasses();
      pinMetrics.start = 0;
      pinMetrics.end = 0;
      pinMetrics.vh = 0;
      index = -1;
      $textPanels.removeClass("is-active").attr("aria-hidden", "true");
      $mediaPanels.removeClass("is-active is-prev");
      $textPanels.eq(0).addClass("is-active").attr("aria-hidden", "false");
      $mediaPanels.eq(0).addClass("is-active is-prev");
      index = 0;
    }

    function measurePin() {
      var vh = getViewportHeight();

      if (!vh) {
        resetPin();
        return;
      }

      clearPinClasses();

      var pinHeight = vh * total;

      $pin.css("height", pinHeight + "px");

      pinMetrics.vh = vh;
      pinMetrics.start = pinEl.getBoundingClientRect().top + getScrollY();
      pinMetrics.end = pinMetrics.start + pinHeight - vh;
      updateFromScroll();
    }

    function updateFromScroll() {
      if (!pinMetrics.vh) {
        return;
      }

      var scrollY = getScrollY();
      var scrollDirection = scrollY >= lastScrollY ? 1 : -1;

      lastScrollY = scrollY;

      var scrollRange = pinMetrics.end - pinMetrics.start;

      if (scrollRange <= 0) {
        clearPinClasses();
        applyEnterProgress(getEnterProgress());
        setProgress(0, scrollDirection);
        return;
      }

      if (scrollY <= pinMetrics.start) {
        clearPinClasses();
        applyEnterProgress(getEnterProgress());
        setProgress(0, scrollDirection);
        return;
      }

      applyEnterProgress(1);

      if (scrollY >= pinMetrics.end) {
        $root.removeClass("is-pin-fixed").addClass("is-pin-ended");
        setProgress(1, scrollDirection);
        return;
      }

      $root.removeClass("is-pin-ended").addClass("is-pin-fixed");
      setProgress((scrollY - pinMetrics.start) / scrollRange, scrollDirection);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(function () {
          ticking = false;
          updateFromScroll();
        });
      }
    }

    buildPanels();
    lastScrollY = getScrollY();

    $(window).on("scroll.chargingPin", onScroll);
    $(window).on("resize.chargingPin", measurePin);
    measurePin();
    $(window).on("load.chargingPin", measurePin);
  }

  function bootInteractions() {
    initHeroProgressSlider();
    initScrollReveal();
    initModelsDragScroll();
    initChargingSlider();
  }

  $(function () {
    $("html").addClass("js");
    window.scrollTo(0, 0);
    bootInteractions();
  });
})(jQuery);
