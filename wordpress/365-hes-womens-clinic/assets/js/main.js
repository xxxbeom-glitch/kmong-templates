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
    var $header = $(".site-header");

    if (!$toggle.length || !$nav.length) {
      return;
    }

    $toggle.on("click", function () {
      var isOpen = $nav.toggleClass("is-open").hasClass("is-open");
      $toggle.attr("aria-expanded", isOpen ? "true" : "false");

      if (!isOpen) {
        $header.removeClass("is-dropdown-open");
        $header.find(".site-header__item--dropdown").removeClass("is-open");
        $header.find(".site-header__trigger").attr("aria-expanded", "false");
        $header.find(".site-header__dropdown").attr("hidden", "hidden");
        $header.find(".site-header__dim").attr("hidden", "hidden");
      }
    });

    $(document).on("click", function (event) {
      if (!isOpenNav()) {
        return;
      }

      if ($(event.target).closest(".site-header").length) {
        return;
      }

      closeNav();
    });

    function isOpenNav() {
      return $nav.hasClass("is-open");
    }

    function closeNav() {
      $nav.removeClass("is-open");
      $toggle.attr("aria-expanded", "false");
    }
  }

  function initHeaderDropdown() {
    var $header = $(".site-header");
    var $dim = $header.find(".site-header__dim");
    var $items = $header.find(".site-header__item--dropdown");
    var closeDelayMs = 220;
    var closeTimer = null;
    var desktopMq = window.matchMedia("(min-width: 1025px) and (hover: hover) and (pointer: fine)");

    if (!$header.length || !$items.length) {
      return;
    }

    function isDesktopDropdown() {
      return desktopMq.matches;
    }

    function readPxVar($el, name, fallback) {
      var raw = getComputedStyle($el[0]).getPropertyValue(name).trim();

      if (!raw) {
        return fallback;
      }

      var value = parseFloat(raw);

      return Number.isNaN(value) ? fallback : value;
    }

    function syncDimTop() {
      var headerBottom = $header[0].getBoundingClientRect().bottom;
      $dim.css("top", headerBottom + "px");
    }

    function positionDropdown($item) {
      var $trigger = $item.find(".site-header__trigger");
      var $panel = $item.find(".site-header__dropdown");
      var triggerRect = $trigger[0].getBoundingClientRect();
      var headerInner = $header.find(".site-header__inner")[0];
      var headerBottom = headerInner
        ? headerInner.getBoundingClientRect().bottom
        : $header[0].getBoundingClientRect().bottom;
      var overlap = readPxVar($header, "--header-dropdown-overlap", 12);
      var offsetX = readPxVar($header, "--header-dropdown-offset-x", 16);

      $panel.css({
        top: headerBottom - overlap + "px",
        left: triggerRect.left - offsetX + "px",
      });
    }

    function closeAll() {
      $items.removeClass("is-open").each(function () {
        var $item = $(this);
        $item.find(".site-header__trigger").attr("aria-expanded", "false");
        $item.find(".site-header__dropdown").attr("hidden", "hidden");
      });
      $header.removeClass("is-dropdown-open");
      $dim.attr("hidden", "hidden");
    }

    function cancelClose() {
      if (closeTimer) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
    }

    function scheduleClose() {
      cancelClose();
      closeTimer = window.setTimeout(closeAll, closeDelayMs);
    }

    function openItem($item) {
      if (!isDesktopDropdown()) {
        return;
      }

      var $panel = $item.find(".site-header__dropdown");

      if ($item.hasClass("is-open")) {
        return;
      }

      closeAll();
      positionDropdown($item);
      syncDimTop();
      $item.addClass("is-open");
      $item.find(".site-header__trigger").attr("aria-expanded", "true");
      $panel.removeAttr("hidden");
      $header.addClass("is-dropdown-open");
      $dim.removeAttr("hidden");
    }

    $items.on("mouseenter", function () {
      if (!isDesktopDropdown()) {
        return;
      }

      cancelClose();
      openItem($(this));
    });

    $items.on("mouseleave", function () {
      if (!isDesktopDropdown()) {
        return;
      }

      scheduleClose();
    });

    $items.find(".site-header__dropdown").on("mouseenter", cancelClose);

    $dim.on("mouseenter", function () {
      if (!isDesktopDropdown()) {
        return;
      }

      scheduleClose();
    });

    $dim.on("click", function () {
      if (isDesktopDropdown()) {
        closeAll();
      }
    });

    $(document).on("click", function (event) {
      if (!isDesktopDropdown() || !$header.hasClass("is-dropdown-open")) {
        return;
      }

      if ($(event.target).closest(".site-header__item--dropdown, .site-header__dim").length) {
        return;
      }

      closeAll();
    });

    $(document).on("keydown", function (event) {
      if (event.key === "Escape") {
        closeAll();
      }
    });

    $(window).on("resize scroll", function () {
      if ($header.hasClass("is-dropdown-open")) {
        $items.filter(".is-open").each(function () {
          positionDropdown($(this));
        });
        syncDimTop();
      }

      if (!isDesktopDropdown()) {
        closeAll();
      }
    });

    if (typeof desktopMq.addEventListener === "function") {
      desktopMq.addEventListener("change", function () {
        if (!isDesktopDropdown()) {
          closeAll();
        }
      });
    }
  }

  function initSpaceTabs() {
    var $section = $(".section-space");
    if (!$section.length) {
      return;
    }

    var $tabs = $section.find(".section-space__tab");
    var $panel = $section.find(".section-space__card");
    var $img = $panel.find(".section-space__card-img");
    var $title = $panel.find(".section-space__card-title");

    if (!$tabs.length || !$panel.length || !$img.length || !$title.length) {
      return;
    }

    $tabs.on("click", function () {
      var $tab = $(this);
      if ($tab.hasClass("is-active")) {
        return;
      }

      $tabs.removeClass("is-active").attr("aria-selected", "false");
      $tab.addClass("is-active").attr("aria-selected", "true");
      $panel.attr("aria-labelledby", $tab.attr("id"));
      $img.attr("src", $tab.data("space-image"));
      $title.text($tab.data("space-label"));
    });
  }

  function initCheckupPrograms() {
    var $section = $(".checkup-programs");
    if (!$section.length) {
      return;
    }

    var $triggers = $section.find(".checkup-programs__trigger");
    var $items = $section.find(".checkup-programs__item");
    var $img = $section.find(".checkup-programs__img");

    if (!$triggers.length || !$img.length) {
      return;
    }

    $triggers.on("click", function () {
      var $trigger = $(this);
      var imageSrc = $trigger.attr("data-program-image");

      if ($trigger.hasClass("is-active") || !imageSrc) {
        return;
      }

      $triggers.removeClass("is-active").attr("aria-selected", "false");
      $items.removeClass("is-active");
      $trigger.addClass("is-active").attr("aria-selected", "true");
      $trigger.closest(".checkup-programs__item").addClass("is-active");
      $img.attr("src", imageSrc);
    });
  }

  function initFaqAccordion() {
    var $section = $(".section-faq");
    if (!$section.length) {
      return;
    }

    $section.on("click", ".section-faq__trigger", function () {
      var $item = $(this).closest(".section-faq__item");
      var $panel = $item.find(".section-faq__panel");
      var isOpen = $item.hasClass("is-open");

      if (isOpen) {
        $item.removeClass("is-open");
        $(this).attr("aria-expanded", "false");
        $panel.prop("hidden", true);
        return;
      }

      $section.find(".section-faq__item.is-open").each(function () {
        $(this).removeClass("is-open");
        $(this).find(".section-faq__trigger").attr("aria-expanded", "false");
        $(this).find(".section-faq__panel").prop("hidden", true);
      });

      $item.addClass("is-open");
      $(this).attr("aria-expanded", "true");
      $panel.prop("hidden", false);
    });
  }

  $(function () {
    $("html").addClass("js");
    initHeaderToggle();
    initHeaderDropdown();
    initSpaceTabs();
    initCheckupPrograms();
    initFaqAccordion();
  });
})(jQuery);
