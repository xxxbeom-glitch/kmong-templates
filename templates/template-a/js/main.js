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
});
