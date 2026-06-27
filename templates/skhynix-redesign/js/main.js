(function ($) {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("pageshow", function () {
    window.scrollTo(0, 0);
    $(".hero__title").removeClass("is-hero-ready");
    initHeroTitleReveal();
  });

  function revealSequential($targets, intervalMs) {
    $targets.each(function (index) {
      var el = this;

      window.setTimeout(function () {
        $(el).addClass("is-revealed");
      }, index * intervalMs);
    });
  }

  function initHeroTitleReveal() {
    var $title = $(".hero__title");

    if (!$title.length) {
      return;
    }

    $title.removeClass("is-hero-ready");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      $title.addClass("is-hero-ready");
      return;
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        $title.addClass("is-hero-ready");
      });
    });
  }

  function initSectionMagneticScroll() {
    var sectionIds = ["products", "heritage", "sustainability", "news", "investor", "footer"];

    if (!$("#hero").length || !$("#products").length) {
      return;
    }

    if (window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var snapThreshold = 32;
    var wheelDeltaMin = 1;
    var snapDurationMs = prefersReducedMotion ? 0 : 520;
    var isSnapping = false;
    var snapTimer = null;

    function getSnapPositions() {
      var positions = [0];

      sectionIds.forEach(function (id) {
        var $section = $("#" + id);

        if ($section.length) {
          positions.push(Math.round($section.offset().top));
        }
      });

      return positions;
    }

    function getCurrentIndex(scrollY, positions) {
      var idx = 0;

      for (var i = 0; i < positions.length; i += 1) {
        if (scrollY + snapThreshold >= positions[i]) {
          idx = i;
        }
      }

      return idx;
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
        if (isSnapping) {
          if (event.cancelable) {
            event.preventDefault();
          }

          return;
        }

        var scrollY = window.scrollY || window.pageYOffset;
        var positions = getSnapPositions();
        var deltaY = event.deltaY;
        var currentIdx = getCurrentIndex(scrollY, positions);

        if (deltaY >= wheelDeltaMin && currentIdx < positions.length - 1) {
          if (event.cancelable) {
            event.preventDefault();
          }

          event.stopImmediatePropagation();
          snapTo(positions[currentIdx + 1]);
          return;
        }

        if (deltaY <= -wheelDeltaMin && currentIdx > 0) {
          if (event.cancelable) {
            event.preventDefault();
          }

          event.stopImmediatePropagation();
          snapTo(positions[currentIdx - 1]);
        }
      },
      { passive: false }
    );
  }

  function initHeroVideo() {
    var videoEl = document.querySelector(".hero__video");

    if (!videoEl) {
      return;
    }

    var segments = [
      { start: 0, end: 10 },
      { start: 76, end: 79 },
    ];
    var segmentIndex = 0;
    var epsilon = 0.08;

    function playSegment(index) {
      segmentIndex = index;
      videoEl.currentTime = segments[segmentIndex].start;
    }

    function advanceSegment() {
      playSegment((segmentIndex + 1) % segments.length);
    }

    videoEl.addEventListener("loadedmetadata", function () {
      playSegment(0);
      var playPromise = videoEl.play();

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {});
      }
    });

    videoEl.addEventListener("timeupdate", function () {
      var segment = segments[segmentIndex];

      if (videoEl.currentTime >= segment.end - epsilon) {
        advanceSegment();
      }
    });

    videoEl.addEventListener("ended", advanceSegment);
  }

  function initScrollReveal() {
    var sectionIntervalMs = 180;
    var $sections = $("#products, #heritage, #sustainability, #news, #investor");

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

  function buildDigitRoll($box) {
    var raw = String($box.attr("data-count-value") || $box.text()).trim();

    if (!/^[\d.]+$/.test(raw)) {
      return;
    }

    var digitIndex = 0;
    var $fragment = $(document.createDocumentFragment());

    for (var i = 0; i < raw.length; i += 1) {
      var ch = raw.charAt(i);

      if (ch === ".") {
        $fragment.append($('<span class="heritage-stat__digit-sep" aria-hidden="true">.</span>'));
        continue;
      }

      if (!/\d/.test(ch)) {
        continue;
      }

      var digit = parseInt(ch, 10);
      var isDown = digitIndex % 2 === 0;
      digitIndex += 1;
      var items = [];
      var k;

      if (isDown) {
        var cur = digit;

        for (k = 0; k < 10; k += 1) {
          items.push(cur);
          cur = (cur + 9) % 10;
        }
      } else {
        for (k = 0; k < 9; k += 1) {
          var value = digit - 1 - k;
          items.push(((value % 10) + 10) % 10);
        }
        items.push(digit);
      }

      var $wrap = $('<span class="heritage-stat__digit-wrap"></span>');
      var $track = $('<span class="heritage-stat__digit-track"></span>');

      if (isDown) {
        $track.addClass("is-down");
      }

      items.forEach(function (num) {
        $track.append(
          $('<span class="heritage-stat__digit" aria-hidden="true"></span>').text(String(num))
        );
      });

      $wrap.append($track);
      $fragment.append($wrap);
    }

    $box.empty().addClass("heritage-stat__roll").append($fragment);
  }

  function initDigitRollCounter() {
    var $section = $("#heritage");
    var $boxes = $section.find("[data-digit-roll]");

    if (!$section.length || !$boxes.length) {
      return;
    }

    var started = false;
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    $boxes.each(function () {
      buildDigitRoll($(this));
    });

    function startRolling() {
      if (started) {
        return;
      }

      started = true;
      $boxes.addClass("is-digit-roll-active");
    }

    if (!("IntersectionObserver" in window)) {
      startRolling();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          startRolling();
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

  function syncNewsRows($grid) {
    $grid.find(".news__row").each(function () {
      var $row = $(this);
      var hasVisibleCard = $row.find(".news-card:visible").length > 0;

      $row.toggle(hasVisibleCard);
    });
  }

  function initNewsControls() {
    var $section = $("#news");
    var $grid = $section.find("[data-news-grid]");
    var $filterBtns = $section.find("[data-news-filter]");
    var $pageBtns = $section.find("[data-news-page]");

    if (!$section.length || !$grid.length) {
      return;
    }

    var categoryLabels = {
      news: "뉴스",
      story: "스토리",
      insight: "인사이트",
    };

    var titlePool = [
      "HBM 신제품으로 고성능 메모리 시장 확대",
      "차세대 낸드 솔루션 양산 체계 강화",
      "데이터센터 효율을 높이는 메모리 아키텍처",
      "제조 현장에서 시작되는 자원 순환의 변화",
      "AI 시대, 메모리 기술은 어떻게 진화하는가",
      "글로벌 반도체 협력 네트워크 확대",
      "CXL 기반 메모리 풀링 상용화 로드맵 공개",
      "DDR5 서버 DRAM 출하량 전 분기 대비 증가",
      "先進 패키징 라인 증설로 AI 수요 대응",
      "탄소 저감형 Fab 운영 지표 목표치 상향",
      "수자원 재활용률 90% 돌파 현장 리포트",
      "협력사 ESG 평가 체계 3.0 도입",
      "AI 추론 워크로드별 HBM 설계 가이드",
      "엣지 AI 시장과 저전력 DRAM 전략",
      "반도체 공급망 회복력 강화 프로그램",
      "청주 M15X Fab 확장 착공식 진행",
      "인디애나apolis 첨단 패키징 거점 가동",
      "연구원과 함께한 차세대 낸드 R&D",
      "현장 엔지니어가 말하는 품질 문화",
      "친환경 캠페인, 임직원 참여율 80% 달성",
      "메모리 반도체 순환경제 모델 제안",
      "생성형 AI가 바꾸는 메모리 수요 전망",
      "2026 DRAM 시장 구조와 SK hynix 포지션",
      "스마트 팩토리로 본 제조 혁신 사례",
      "반도체 인재 양성 프로그램 5기 모집",
      "주주총회 IR 핵심 Q&A 정리",
      "분기 실적 발표, HBM 매출 비중 확대",
      "EU 칩법 대응 공급망 다변화 추진",
      "고대역폭 메모리 표준화 포럼 참여",
      "재활용 냉매 전환으로 온실가스 감축",
    ];

    var categories = ["news", "story", "insight"];
    var newsItems = [];
    var pageCount = $pageBtns.length || 5;
    var cardsPerPage = 6;
    var totalItems = pageCount * cardsPerPage;

    for (var i = 0; i < totalItems; i += 1) {
      var page = Math.floor(i / cardsPerPage) + 1;
      var category = categories[i % categories.length];
      var title = titlePool[i % titlePool.length];
      var month = ((i * 3) % 6) + 1;
      var day = ((i * 7) % 27) + 1;
      var datetime =
        "2026-" + String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0");

      newsItems.push({
        page: page,
        category: category,
        title: title,
        datetime: datetime,
        dateLabel: "2026. " + month + " ." + day,
      });
    }

    var activeFilter = "all";
    var activePage = 1;

    function buildNewsCard(item) {
      var label = categoryLabels[item.category] || item.category;
      var $card = $(
        '<article class="news-card scroll-reveal" data-news-category="' +
          item.category +
          '">' +
          '<div class="news-card__body">' +
          '<h3 class="news-card__title"></h3>' +
          '<div class="news-card__meta">' +
          '<span class="news-card__category"></span>' +
          '<span class="news-card__dot" aria-hidden="true"></span>' +
          '<time class="news-card__date"></time>' +
          "</div>" +
          "</div>" +
          "</article>"
      );

      $card.find(".news-card__title").text(item.title);
      $card.find(".news-card__category").text(label);
      $card.find(".news-card__date").attr("datetime", item.datetime).text(item.dateLabel);

      return $card;
    }

    function getItemsForPage(page, filter) {
      if (filter === "all") {
        return newsItems.filter(function (item) {
          return item.page === page;
        });
      }

      var pool = newsItems.filter(function (item) {
        return item.category === filter;
      });

      if (!pool.length) {
        return [];
      }

      var start = (page - 1) * cardsPerPage;
      var chunk = [];
      var i;

      for (i = 0; i < cardsPerPage; i += 1) {
        chunk.push(pool[(start + i) % pool.length]);
      }

      return chunk;
    }

    function renderNewsGrid() {
      var items = getItemsForPage(activePage, activeFilter);
      var $fragment = $(document.createDocumentFragment());
      var rowSize = 3;
      var $row = null;

      $grid.empty();

      items.forEach(function (item, index) {
        if (index % rowSize === 0) {
          $row = $('<div class="news__row"></div>');
          $fragment.append($row);
        }

        $row.append(buildNewsCard(item));
      });

      $grid.append($fragment);
      syncNewsRows($grid);

      if ($section.hasClass("is-scroll-reveal-started")) {
        revealSequential($grid.find(".news-card:not(.is-revealed)"), 180);
      }
    }

    $filterBtns.on("click", function () {
      var $btn = $(this);

      activeFilter = $btn.attr("data-news-filter") || "all";
      $filterBtns.removeClass("is-active").attr("aria-selected", "false");
      $btn.addClass("is-active").attr("aria-selected", "true");
      renderNewsGrid();
    });

    $pageBtns.on("click", function () {
      var $btn = $(this);

      activePage = parseInt($btn.attr("data-news-page"), 10) || 1;
      $pageBtns.removeClass("is-active").attr("aria-selected", "false");
      $btn.addClass("is-active").attr("aria-selected", "true");
      renderNewsGrid();
    });

    renderNewsGrid();
  }

  function initSustainabilityTrack() {
    var $section = $("#sustainability");
    var $track = $section.find("[data-sustainability-track]");
    var $prev = $section.find("[data-sustainability-prev]");
    var $next = $section.find("[data-sustainability-next]");
    var trackEl = $track[0];

    if (!trackEl) {
      return;
    }

    var pointerActive = false;
    var pointerId = null;
    var startX = 0;
    var startScroll = 0;
    var didDrag = false;
    var dragThreshold = 6;
    var scrollThreshold = 2;

    function getScrollStep() {
      var $card = $track.find(".esg-card").first();
      if (!$card.length) {
        return trackEl.clientWidth;
      }
      return $card.outerWidth(true);
    }

    function getMaxScroll() {
      return Math.max(0, trackEl.scrollWidth - trackEl.clientWidth);
    }

    function syncNavState() {
      var maxScroll = getMaxScroll();
      var left = trackEl.scrollLeft;

      $prev.prop("disabled", left <= scrollThreshold);
      $next.prop("disabled", left >= maxScroll - scrollThreshold);
    }

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
      $track.removeClass("is-dragging");
      if (trackEl.releasePointerCapture && activePointer !== null) {
        try {
          trackEl.releasePointerCapture(activePointer);
        } catch (err) {
          /* ignore */
        }
      }
      syncNavState();
    }

    $prev.on("click", function () {
      trackEl.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
    });

    $next.on("click", function () {
      trackEl.scrollBy({ left: getScrollStep(), behavior: "smooth" });
    });

    trackEl.addEventListener("scroll", syncNavState, { passive: true });
    window.addEventListener("resize", syncNavState, { passive: true });

    trackEl.addEventListener(
      "pointerdown",
      function (e) {
        if (e.pointerType === "mouse" && e.button !== 0) {
          return;
        }
        pointerActive = true;
        pointerId = e.pointerId;
        didDrag = false;
        $track.addClass("is-dragging");
        startX = e.clientX;
        startScroll = trackEl.scrollLeft;
        if (trackEl.setPointerCapture) {
          trackEl.setPointerCapture(e.pointerId);
        }
      },
      { passive: true }
    );

    trackEl.addEventListener(
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
        trackEl.scrollLeft = startScroll - dx;
      },
      { passive: false }
    );

    trackEl.addEventListener("pointerup", endDrag);
    trackEl.addEventListener("pointercancel", endDrag);
    trackEl.addEventListener("lostpointercapture", endDrag);

    trackEl.addEventListener(
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

    trackEl.addEventListener("dragstart", function (e) {
      e.preventDefault();
    });

    syncNavState();
  }

  $(function () {
    initHeroVideo();
    initHeroTitleReveal();
    initNewsControls();
    initScrollReveal();
    initDigitRollCounter();
    initSectionMagneticScroll();
    initSustainabilityTrack();
  });
})(jQuery);
