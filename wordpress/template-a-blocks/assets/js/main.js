(function ($) {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("pageshow", function () {
    window.scrollTo(0, 0);
    var header = document.querySelector(".site-header");
    if (header) {
      header.classList.remove("is-header-hidden");
    }
    var quickConsult = document.querySelector("[data-quick-consult]");
    if (quickConsult) {
      quickConsult.classList.remove("is-hidden");
    }
  });

  function initHeaderAutoHide() {
    var header = document.querySelector(".site-header");

    if (!header) {
      return;
    }

    var lastScrollY = window.scrollY || window.pageYOffset;
    var deltaMin = window.matchMedia("(max-width: 768px)").matches ? 12 : 4;
    var isHidden = false;
    var ticking = false;

    function setHidden(nextHidden) {
      if (isHidden === nextHidden) {
        return;
      }

      if (nextHidden && typeof header.closeMega === "function") {
        header.closeMega();
      }

      isHidden = nextHidden;
      header.classList.toggle("is-header-hidden", nextHidden);
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

  function setViewportHeightUnit() {
    document.documentElement.style.setProperty(
      "--vh-unit",
      window.innerHeight * 0.01 + "px"
    );
  }

  /** 모바일 주소창 show/hide(높이만 변함) 때는 vh·ScrollTrigger 갱신 생략 — 스크롤 점프 방지 */
  var lastViewportWidth = window.innerWidth;

  function onViewportResize() {
    var width = window.innerWidth;
    var widthChanged = Math.abs(width - lastViewportWidth) >= 1;

    lastViewportWidth = width;

    if (!widthChanged) {
      return;
    }

    setViewportHeightUnit();

    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  }

  function initHeroProgressSlider() {
    var $root = $("[data-hero-progress-slider]");

    if (!$root.length) {
      return;
    }

    var $slides = $root.find(".hero__slide");
    var $fill = $root.find(".hero__progress-fill");
    var $track = $root.find(".hero__progress-track");
    var total = $slides.length;
    var index = 0;
    var durationMs = 5000;
    var timerId = null;
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!total || !$fill.length) {
      return;
    }

    function startFill() {
      clearTimeout(timerId);

      $fill.css({ transition: "none", width: "0%" });
      $fill[0].offsetHeight;

      if (prefersReducedMotion || total <= 1) {
        $fill.css("width", "100%");
        return;
      }

      $fill.css({
        transition: "width " + durationMs + "ms linear",
        width: "100%",
      });

      timerId = window.setTimeout(function () {
        goTo(index + 1);
      }, durationMs);
    }

    function goTo(nextIndex) {
      index = (nextIndex + total) % total;
      $slides.removeClass("is-active").eq(index).addClass("is-active");
      startFill();
    }

    $track.on("click", function () {
      goTo(index + 1);
    });

    goTo(0);
  }

  function initIntroFill() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      return;
    }

    var root = document.querySelector("[data-intro-fill]");

    if (!root) {
      return;
    }

    var section = root.closest(".section--intro");
    var highlights = root.querySelectorAll(".intro__fill-txt-highlight");

    if (!section || !highlights.length) {
      return;
    }

    if (section._introFillMm) {
      section._introFillMm.revert();
      section._introFillMm = null;
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.set(highlights, { backgroundSize: "0% 100%" });

    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(highlights, { backgroundSize: "100% 100%" });
      return;
    }

    function buildFillTimeline(scrollConfig) {
      var tl = gsap.timeline({
        scrollTrigger: scrollConfig,
      });

      highlights.forEach(function (el, i) {
        tl.to(
          el,
          { backgroundSize: "100% 100%", ease: "none", duration: 1 },
          i === 0 ? 0 : ">"
        );
      });

      return tl;
    }

    section._introFillMm = ScrollTrigger.matchMedia({
      "(min-width: 1240px)": function () {
        buildFillTimeline({
          id: "intro-fill-pin",
          trigger: section,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      },
      "(max-width: 1239px)": function () {
        buildFillTimeline({
          trigger: section,
          start: "top 80%",
          end: "center 40%",
          scrub: true,
          invalidateOnRefresh: true,
        });
      },
    });

    ScrollTrigger.refresh();
  }

  function initHeaderMega() {
    var header = document.querySelector("[data-header-mega]");

    if (!header) {
      return;
    }

    var mq = window.matchMedia("(min-width: 1025px) and (hover: hover) and (pointer: fine)");

    if (!mq.matches) {
      return;
    }

    var panel = header.querySelector("#gnb-mega-panel");
    var dim = header.querySelector(".site-header__dim");
    var items = header.querySelectorAll(".site-header__item--has-mega");
    var triggers = header.querySelectorAll(".site-header__trigger");
    var megaList = header.querySelector(".site-header__mega-list");
    var closeDelay = 220;
    var closeTimer = null;

    if (!panel || !megaList || !triggers.length) {
      return;
    }

    function setActive(index) {
      items.forEach(function (item, i) {
        item.classList.toggle("is-active", i === index);
      });

      triggers.forEach(function (trigger, i) {
        trigger.setAttribute("aria-expanded", i === index ? "true" : "false");
      });
    }

    function syncDimTop() {
      if (!dim) {
        return;
      }

      dim.style.top = header.getBoundingClientRect().bottom + "px";
    }

    function closeMega() {
      clearTimeout(closeTimer);
      header.classList.remove("is-mega-open");
      panel.setAttribute("hidden", "");
      panel.setAttribute("inert", "");

      if (dim) {
        dim.setAttribute("hidden", "");
      }

      setActive(-1);
    }

    function openMega(index) {
      clearTimeout(closeTimer);
      header.classList.add("is-mega-open");
      panel.removeAttribute("hidden");
      panel.removeAttribute("inert");

      if (dim) {
        dim.removeAttribute("hidden");
      }

      setActive(index);
      syncDimTop();
    }

    function scheduleClose() {
      clearTimeout(closeTimer);
      closeTimer = window.setTimeout(closeMega, closeDelay);
    }

    items.forEach(function (item, i) {
      item.addEventListener("mouseenter", function () {
        if (header.classList.contains("is-mega-open")) {
          setActive(i);
          return;
        }

        openMega(i);
      });
    });

    header.addEventListener("mouseleave", function (e) {
      if (e.relatedTarget && header.contains(e.relatedTarget)) {
        return;
      }

      scheduleClose();
    });

    panel.addEventListener("mouseenter", function () {
      clearTimeout(closeTimer);
    });

    if (dim) {
      dim.addEventListener("click", closeMega);
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMega();
      }
    });

    window.addEventListener("resize", function () {
      syncDimTop();
    });

    window.addEventListener("scroll", function () {
      if (header.classList.contains("is-mega-open")) {
        syncDimTop();
      }
    });

    syncDimTop();
    header.closeMega = closeMega;
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
        threshold: 0.08,
        rootMargin: "80px 0px -5% 0px",
      }
    );

    $all.each(function () {
      observer.observe(this);
    });
  }

  function initMobileDrawer() {
    var header = document.querySelector(".site-header");
    var btn = header && header.querySelector(".site-header__menu-btn");
    var drawer = document.getElementById("mobile-nav");

    if (!header || !btn || !drawer) {
      return;
    }

    /* 헤더 transform 때문에 fixed가 잘림 → body로 옮겨 풀스크린 */
    if (drawer.parentElement !== document.body) {
      document.body.appendChild(drawer);
    }

    var toggles = drawer.querySelectorAll(".site-header__drawer-toggle");

    function collapseAll() {
      toggles.forEach(function (toggle) {
        var panelId = toggle.getAttribute("aria-controls");
        var panel = panelId ? document.getElementById(panelId) : null;
        toggle.setAttribute("aria-expanded", "false");
        if (panel) {
          panel.hidden = true;
        }
      });
    }

    function openDrawer() {
      header.classList.add("is-drawer-open");
      document.body.classList.add("is-mobile-nav-open");
      drawer.hidden = false;
      drawer.classList.add("is-open");
      drawer.removeAttribute("inert");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "메뉴 닫기");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
      header.classList.remove("is-drawer-open");
      document.body.classList.remove("is-mobile-nav-open");
      drawer.hidden = true;
      drawer.classList.remove("is-open");
      drawer.setAttribute("inert", "");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "메뉴 열기");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      collapseAll();
    }

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (header.classList.contains("is-drawer-open")) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    toggles.forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        var panelId = toggle.getAttribute("aria-controls");
        var panel = panelId ? document.getElementById(panelId) : null;
        var willOpen = toggle.getAttribute("aria-expanded") !== "true";

        collapseAll();

        if (willOpen && panel) {
          toggle.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });
    });

    drawer.addEventListener("click", function (e) {
      var link = e.target.closest("a");
      if (link) {
        closeDrawer();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-drawer-open")) {
        closeDrawer();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1024 && header.classList.contains("is-drawer-open")) {
        closeDrawer();
      }
    });
  }

  function initFeaturesDragScroll() {
    var $scroll = $("[data-features-scroll][data-drag-scroll]");
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

  function initQuickConsultBar() {
    var bar = document.querySelector("[data-quick-consult]");

    if (!bar) {
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
      bar.classList.toggle("is-hidden", nextHidden);
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

    var form = bar.querySelector(".quick-consult__form");
    var submit = bar.querySelector(".quick-consult__submit");
    var fields = bar.querySelectorAll(
      '.quick-consult__field input[type="text"], .quick-consult__field input[type="tel"]'
    );

    function syncSubmitState() {
      if (!submit || !fields.length) {
        return;
      }

      /* 모바일 메인: 폼 숨김 · 버튼 항상 활성 */
      if (
        document.body.classList.contains("page-home") &&
        window.matchMedia("(max-width: 768px)").matches
      ) {
        submit.classList.remove("is-empty");
        return;
      }

      var hasContent = false;
      var i;

      for (i = 0; i < fields.length; i += 1) {
        if (String(fields[i].value || "").trim()) {
          hasContent = true;
          break;
        }
      }

      submit.classList.toggle("is-empty", !hasContent);
    }

    if (form && submit) {
      form.addEventListener("input", syncSubmitState);
      form.addEventListener("change", syncSubmitState);
      syncSubmitState();
    }
  }

  function initYearCarousel() {
    var $roots = $("[data-year-carousel]");

    if (!$roots.length) {
      return;
    }

    var stackMq = window.matchMedia("(max-width: 768px)");

    function isStacked() {
      return stackMq.matches;
    }

    $roots.each(function () {
      var root = this;
      var track = root.querySelector("[data-year-carousel-track]");

      if (!track) {
        return;
      }

      var isAnimating = false;
      var durationMs = 500;
      var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      function getItems() {
        return Array.prototype.slice.call(track.querySelectorAll("[data-year-carousel-item]"));
      }

      function getStep() {
        var items = getItems();

        if (!items.length) {
          return 0;
        }

        var style = window.getComputedStyle(track);
        var gap = parseFloat(style.gap || style.columnGap) || 0;

        return items[0].getBoundingClientRect().width + gap;
      }

      function syncActiveState() {
        getItems().forEach(function (item, index) {
          var isActive = isStacked() ? true : index === 0;

          item.classList.toggle("is-active", isActive);

          var btn = item.querySelector(".greeting-history__year-btn");

          if (btn) {
            btn.setAttribute("aria-pressed", isActive ? "true" : "false");
          }
        });
      }

      function clearMotion() {
        track.style.transition = "";
        track.style.transform = "";
        track.classList.remove("is-animating");
        isAnimating = false;
      }

      function reorderToFront(index) {
        var items = getItems();

        if (index <= 0 || index >= items.length) {
          syncActiveState();
          return;
        }

        // 클릭한 연도부터 뒤를 앞에, 그 앞 연도들은 맨 뒤로 (순서 유지)
        var rotated = items.slice(index).concat(items.slice(0, index));

        rotated.forEach(function (el) {
          track.appendChild(el);
        });

        syncActiveState();
      }

      function activate(index) {
        if (isStacked() || index <= 0 || isAnimating) {
          return;
        }

        var step = getStep();
        var distance = step * index;

        if (prefersReducedMotion || distance <= 0) {
          reorderToFront(index);
          return;
        }

        isAnimating = true;
        track.classList.add("is-animating");
        track.style.transition = "transform " + durationMs + "ms ease";
        track.style.transform = "translate3d(" + -distance + "px, 0, 0)";

        function onEnd() {
          track.removeEventListener("transitionend", onEnd);
          track.style.transition = "none";
          track.style.transform = "translate3d(0, 0, 0)";
          track.offsetHeight;
          reorderToFront(index);
          track.classList.remove("is-animating");
          isAnimating = false;
        }

        track.addEventListener("transitionend", onEnd);
      }

      function handleActivate(item) {
        if (isStacked()) {
          return;
        }

        var index = getItems().indexOf(item);

        if (index < 0) {
          return;
        }

        activate(index);
      }

      root.addEventListener("click", function (e) {
        var item = e.target.closest("[data-year-carousel-item]");

        if (!item || !root.contains(item) || item.classList.contains("is-active")) {
          return;
        }

        handleActivate(item);
      });

      root.addEventListener("keydown", function (e) {
        if (e.key !== "Enter" && e.key !== " ") {
          return;
        }

        var btn = e.target.closest(".greeting-history__year-btn");

        if (!btn) {
          return;
        }

        var item = btn.closest("[data-year-carousel-item]");

        if (!item || item.classList.contains("is-active")) {
          return;
        }

        e.preventDefault();
        handleActivate(item);
      });

      function onStackChange() {
        clearMotion();
        syncActiveState();
      }

      if (typeof stackMq.addEventListener === "function") {
        stackMq.addEventListener("change", onStackChange);
      } else if (typeof stackMq.addListener === "function") {
        stackMq.addListener(onStackChange);
      }

      syncActiveState();
    });
  }

  function initPortfolioFilter() {
    var root = document.querySelector(".portfolio-filter");

    if (!root) {
      return;
    }

    var tabs = root.querySelectorAll(".portfolio-filter__tab");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (item) {
          var active = item === tab;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", active ? "true" : "false");
        });
      });
    });
  }

  function formatStatsCounterValue(value, decimals, useGrouping) {
    if (decimals > 0) {
      var fixed = value.toFixed(decimals);
      if (useGrouping) {
        var parts = fixed.split(".");
        parts[0] = Number(parts[0]).toLocaleString("en-US");
        return parts.join(".");
      }
      return fixed;
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
        requestAnimationFrame(frame);
        return;
      }

      renderStatsCounter($el, end);
    }

    requestAnimationFrame(frame);
  }

  function initStatsCounter() {
    var $section = $("#services");
    var $counters = $section.find("[data-stats-counter]");

    if (!$section.length || !$counters.length) {
      return;
    }

    var started = false;
    var prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function startCounting() {
      if (started) {
        return;
      }

      started = true;

      $counters.each(function () {
        var $counter = $(this);

        if (prefersReducedMotion) {
          renderStatsCounter(
            $counter,
            parseFloat($counter.attr("data-count-value"), 10)
          );
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

  function initNewsFilter() {
    var root = document.querySelector("[data-news-filter]");

    if (!root) {
      return;
    }

    var tabs = root.querySelectorAll("[data-news-filter-tab]");
    var items = root.querySelectorAll("[data-news-category]");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var filter = tab.getAttribute("data-news-filter-tab") || "all";

        tabs.forEach(function (item) {
          var active = item === tab;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", active ? "true" : "false");
        });

        items.forEach(function (item) {
          var category = item.getAttribute("data-news-category");
          var show = filter === "all" || category === filter;
          item.hidden = !show;
        });
      });
    });
  }

  function initBtnTop() {
    var $btn = $(".btn-top");

    if (!$btn.length) {
      return;
    }

    var $hero = $("#hero, .page-hero").first();

    function syncVisibility() {
      var threshold = 240;

      if ($hero.length) {
        threshold = $hero.offset().top + $hero.outerHeight();
      }

      $btn.toggleClass("is-active", $(window).scrollTop() > threshold);
    }

    $(window).on("scroll", syncVisibility);
    syncVisibility();

    $btn.on("click", function () {
      window.scrollTo(0, 0);
    });
  }

  $(function () {
    $("html").addClass("js");
    setViewportHeightUnit();
    initHeaderAutoHide();
    initMobileDrawer();
    initHeaderMega();
    initHeroProgressSlider();
    initIntroFill();
    initScrollReveal();
    initFeaturesDragScroll();
    initYearCarousel();
    initQuickConsultBar();
    initPortfolioFilter();
    initNewsFilter();
    initStatsCounter();
    initBtnTop();
  });

  window.addEventListener("resize", onViewportResize);

  window.addEventListener("load", function () {
    setViewportHeightUnit();
    lastViewportWidth = window.innerWidth;
    initIntroFill();
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  });
})(jQuery);
