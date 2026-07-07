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



  function initConsultationList() {
    var $filters = $(".section-consult-list__filters");

    if (!$filters.length) {
      return;
    }

    $filters.on("click", ".section-consult-list__filter", function () {
      var $btn = $(this);

      $filters.find(".section-consult-list__filter").removeClass("is-active").attr("aria-selected", "false");
      $btn.addClass("is-active").attr("aria-selected", "true");
    });
  }

  function initConsultationForm() {
    var $form = $(".section-consult-form__card");

    if (!$form.length) {
      return;
    }

    $form.on("click", ".section-consult-form__password-toggle", function () {
      var $btn = $(this);
      var $input = $form.find(".section-consult-form__input--password");
      var isVisible = $input.attr("type") === "text";

      $input.attr("type", isVisible ? "password" : "text");
      $btn.attr("aria-pressed", isVisible ? "false" : "true").text(isVisible ? "보기" : "숨김");
    });

    $form.on("click", ".section-consult-form__upload-remove", function () {
      $(this).closest(".section-consult-form__upload--preview").remove();
    });

    $form.on("change", ".section-consult-form__file", function (event) {
      var file = event.target.files && event.target.files[0];
      var iconX = window.barunDentalAssets && barunDentalAssets.icons ? barunDentalAssets.icons["icon-x"] : "";

      if (!file) {
        return;
      }

      var reader = new FileReader();

      reader.onload = function (loadEvent) {
        var $preview = $(
          '<div class="section-consult-form__upload section-consult-form__upload--preview">' +
            '<img src="" alt="" width="120" height="120" decoding="async">' +
            '<button type="button" class="section-consult-form__upload-remove" aria-label="이미지 삭제">' +
            '<img src="' + iconX + '" alt="" width="12" height="12" decoding="async">' +
            "</button></div>"
        );

        $preview.find("img").first().attr("src", loadEvent.target.result);
        $form.find(".section-consult-form__uploads").append($preview);
        event.target.value = "";
      };

      reader.readAsDataURL(file);
    });

    $form.on("submit", function (event) {
      event.preventDefault();
    });
  }

  $(function () {

    $("html").addClass("js");

    initHeaderToggle();

    initHeaderDropdown();

    initDigitalTabs();

    initScrollReveal();

    initConsultationList();

    initConsultationForm();

  });

})(jQuery);

