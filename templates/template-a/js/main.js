if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("load", function () {
  window.scrollTo(0, 0);
});

window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    window.scrollTo(0, 0);
  }
});

$(function () {
  var $toggle = $(".menu-toggle");
  var $nav = $(".site-nav");
  var $body = $("body");

  $toggle.on("click", function () {
    var isOpen = $nav.toggleClass("is-open").hasClass("is-open");
    $toggle.attr("aria-expanded", isOpen);
    $body.toggleClass("nav-open", isOpen);
  });

  $(".site-nav__link").on("click", function () {
    if (window.innerWidth <= 768) {
      $nav.removeClass("is-open");
      $toggle.attr("aria-expanded", "false");
      $body.removeClass("nav-open");
    }
  });

  $(window).on("resize", function () {
    if (window.innerWidth > 768) {
      $nav.removeClass("is-open");
      $toggle.attr("aria-expanded", "false");
      $body.removeClass("nav-open");
    }
  });

  /* Hero slider (8 slides, counter 03/08 style) */
  var $slides = $(".hero__slide");
  var $current = $(".hero__counter-current");
  var total = $slides.length;
  var index = 2;
  var timer = null;
  var interval = 5000;

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function goTo(i) {
    index = (i + total) % total;
    $slides.removeClass("is-active").eq(index).addClass("is-active");
    $current.text(pad(index + 1));
  }

  function startAuto() {
    stopAuto();
    timer = setInterval(function () {
      goTo(index + 1);
    }, interval);
  }

  function stopAuto() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  if (total > 0) {
    goTo(index);
    startAuto();
    $(".hero__slider").on("mouseenter", stopAuto).on("mouseleave", startAuto);

    $(".hero__pager-btn--prev").on("click", function () {
      goTo(index - 1);
      startAuto();
    });

    $(".hero__pager-btn--next").on("click", function () {
      goTo(index + 1);
      startAuto();
    });
  }

  /* Process cards */
  $("[data-process-grid]").each(function () {
    var $grid = $(this);
    $grid.find(".process-card").on("click", function () {
      var $card = $(this);
      $grid.find(".process-card").removeClass("is-active");
      $card.addClass("is-active");
      $grid.prepend($card);
    });
  });

  /* FAQ accordion */
  $("[data-faq]").each(function () {
    var $faq = $(this);
    $faq.find(".faq-item__trigger").on("click", function () {
      var $item = $(this).closest(".faq-item");
      var isOpen = $item.hasClass("is-open");
      $faq.find(".faq-item").removeClass("is-open");
      $faq.find(".faq-item__trigger").attr("aria-expanded", "false");
      if (!isOpen) {
        $item.addClass("is-open");
        $(this).attr("aria-expanded", "true");
      }
    });
  });
});
