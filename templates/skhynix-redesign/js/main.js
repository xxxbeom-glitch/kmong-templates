(function ($) {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
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
    initSustainabilityTrack();
  });
})(jQuery);
