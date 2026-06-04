/* 새로고침 시 이전 스크롤 위치 복원 방지 → 항상 상단 */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function scrollPageToTop() {
  window.scrollTo(0, 0);
  requestAnimationFrame(function () {
    window.scrollTo(0, 0);
  });
}

window.addEventListener("pageshow", function (event) {
  var nav = performance.getEntriesByType("navigation")[0];
  if (event.persisted || (nav && nav.type === "reload")) {
    scrollPageToTop();
  }
});

$(function () {
  var $toggle = $(".menu-toggle");
  var $nav = $(".header__nav");

  $toggle.on("click", function () {
    var isOpen = $nav.toggleClass("is-open").hasClass("is-open");
    $toggle.attr("aria-expanded", isOpen);
    $("body").toggleClass("nav-open", isOpen);
  });

  $(".header__nav-link, .header__nav-cta").on("click", function () {
    if (window.innerWidth <= 768) {
      $nav.removeClass("is-open");
      $toggle.attr("aria-expanded", "false");
      $("body").removeClass("nav-open");
    }
  });

  $(window).on("resize", function () {
    if (window.innerWidth > 768) {
      $nav.removeClass("is-open");
      $toggle.attr("aria-expanded", "false");
      $("body").removeClass("nav-open");
    }
  });

  /* Hero slider — 8 slides, initial 03/08 */
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
    if (timer) {
      clearInterval(timer);
    }
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
    $("[data-hero-slider]").on("mouseenter", stopAuto).on("mouseleave", startAuto);

    $(".hero__pager-btn--prev").on("click", function () {
      goTo(index - 1);
      startAuto();
    });

    $(".hero__pager-btn--next").on("click", function () {
      goTo(index + 1);
      startAuto();
    });
  }

  /* FAQ accordion */
  $("[data-faq]").each(function () {
    var $faq = $(this);
    var iconDown = "assets/icons/icon-faq-down.png";
    var iconUp = "assets/icons/icon-faq-up.png";

    $faq.find(".faq-item__trigger").on("click", function () {
      var $item = $(this).closest(".faq-item");
      var isOpen = $item.hasClass("is-open");

      $faq.find(".faq-item").removeClass("is-open");
      $faq.find(".faq-item__trigger").attr("aria-expanded", "false");
      $faq.find(".faq-item__icon").attr("src", iconDown).removeClass("faq-item__icon--open");

      if (!isOpen) {
        $item.addClass("is-open");
        $(this).attr("aria-expanded", "true");
        $item.find(".faq-item__icon").attr("src", iconUp).addClass("faq-item__icon--open");
      }
    });
  });
});
