$(function () {
  var $toggle = $(".menu-toggle");
  var $nav = $(".site-nav");
  var $body = $("body");

  $toggle.on("click", function () {
    var isOpen = $nav.toggleClass("is-open").hasClass("is-open");
    $toggle.toggleClass("is-open", isOpen);
    $body.toggleClass("nav-open", isOpen);
  });

  $(".site-nav__link").on("click", function () {
    if (window.innerWidth <= 768) {
      $nav.removeClass("is-open");
      $toggle.removeClass("is-open");
      $body.removeClass("nav-open");
    }
  });

  $(window).on("resize", function () {
    if (window.innerWidth > 768) {
      $nav.removeClass("is-open");
      $toggle.removeClass("is-open");
      $body.removeClass("nav-open");
    }
  });

  var page = $("body").data("page");
  if (page) {
    $('.site-nav__link[data-nav="' + page + '"]').addClass("is-active");
  }

  /* Hero slider */
  var $slider = $(".hero-slider");
  if ($slider.length) {
    var $slides = $slider.find(".hero-slider__slide");
    var $dots = $slider.find(".hero-slider__dot");
    var total = $slides.length;
    var current = 0;
    var timer = null;
    var interval = 5000;

    function goTo(index) {
      if (total === 0) return;
      current = (index + total) % total;
      $slides.removeClass("is-active").eq(current).addClass("is-active");
      $dots.removeClass("is-active").eq(current).addClass("is-active");
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(function () {
        goTo(current + 1);
      }, interval);
    }

    function stopAuto() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    $slider.find(".hero-slider__nav--prev").on("click", function () {
      goTo(current - 1);
      startAuto();
    });

    $slider.find(".hero-slider__nav--next").on("click", function () {
      goTo(current + 1);
      startAuto();
    });

    $dots.on("click", function () {
      goTo($(this).index());
      startAuto();
    });

    $slider.on("mouseenter", stopAuto).on("mouseleave", startAuto);

    goTo(0);
    startAuto();
  }

  /* Category tabs */
  var $tabs = $(".tabs");
  $tabs.each(function () {
    var $wrap = $(this);
    var $btns = $wrap.find(".tabs__btn");
    var $panels = $wrap.find(".tabs__panel");

    $btns.on("click", function () {
      var idx = $btns.index(this);
      $btns.removeClass("is-active").eq(idx).addClass("is-active");
      $panels.removeClass("is-active").eq(idx).addClass("is-active");
    });
  });

  $("[data-split-tab]").each(function () {
    var $root = $(this);
    $root.find(".split-tab__btn").on("click", function () {
      var index = $(this).data("split-target");
      $root.find(".split-tab__btn").removeClass("is-active").attr("aria-selected", "false");
      $(this).addClass("is-active").attr("aria-selected", "true");
      $root.find(".split-tab__panel").removeClass("is-active");
      $root.find('[data-split-panel="' + index + '"]').addClass("is-active");
    });
  });

  $(".overlay-grid").each(function () {
    var $grid = $(this);
    $grid.find(".overlay-card").on("mouseenter", function () {
      $grid.find(".overlay-card").removeClass("is-active");
      $(this).addClass("is-active");
    });
    $grid.on("mouseleave", function () {
      $grid.find(".overlay-card").removeClass("is-active");
      $grid.find(".overlay-card").first().addClass("is-active");
    });
  });
});
