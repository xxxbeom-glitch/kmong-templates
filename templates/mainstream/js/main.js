if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("pageshow", function () {
  window.scrollTo(0, 0);
});

$(function () {
  var $nav = $(".header__nav");
  var $toggle = $(".menu-toggle");

  $toggle.on("click", function () {
    var isOpen = $nav.toggleClass("is-open").hasClass("is-open");
    $toggle.attr("aria-expanded", isOpen);
    $toggle.attr("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    $("body").toggleClass("nav-open", isOpen);
  });

  $(".header__nav-link").on("click", function () {
    if (window.matchMedia("(max-width: 768px)").matches) {
      $nav.removeClass("is-open");
      $toggle.attr("aria-expanded", "false");
      $toggle.attr("aria-label", "메뉴 열기");
      $("body").removeClass("nav-open");
    }
  });

  $(".works-gallery__panel").on("click", function () {
    var $item = $(this).closest(".works-gallery__item");

    if ($item.hasClass("is-active")) {
      return;
    }

    $(".works-gallery__item").removeClass("is-active");
    $(".works-gallery__panel").attr("aria-expanded", "false");

    $item.addClass("is-active");
    $(this).attr("aria-expanded", "true");
  });

  var $familyBtn = $(".footer__family");
  var $familyList = $("#footer-family-list");

  $familyBtn.on("click", function () {
    var isOpen = $familyBtn.hasClass("is-open");

    if (isOpen) {
      $familyList.slideUp(200, function () {
        $familyList.prop("hidden", true);
      });
      $familyBtn.removeClass("is-open").attr("aria-expanded", "false");
      return;
    }

    $familyList.prop("hidden", false).hide().slideDown(200);
    $familyBtn.addClass("is-open").attr("aria-expanded", "true");
  });

  $(document).on("click", function (e) {
    if (!$familyBtn.length) {
      return;
    }

    if ($(e.target).closest(".footer__family-wrap").length) {
      return;
    }

    if ($familyBtn.hasClass("is-open")) {
      $familyList.slideUp(200, function () {
        $familyList.prop("hidden", true);
      });
      $familyBtn.removeClass("is-open").attr("aria-expanded", "false");
    }
  });
});
