(function () {
  "use strict";

  function init() {
    var header = document.querySelector(".header");
    var hamburger = document.querySelector(".hamburger");
    var navOverlay = document.querySelector(".nav-overlay");
    var floating = document.querySelector(".floating");
    var fadeTargets = document.querySelectorAll(".fade-in");

    if (hamburger && navOverlay) {
      hamburger.addEventListener("click", function () {
        navOverlay.classList.toggle("open");
      });
    }

    function onScroll() {
      var scrollY = window.scrollY || window.pageYOffset;

      if (header) {
        if (scrollY >= 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }

      if (floating) {
        if (scrollY > 300) {
          floating.classList.add("show");
        } else {
          floating.classList.remove("show");
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (fadeTargets.length > 0 && "IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -80px 0px",
          threshold: 0.1,
        }
      );

      fadeTargets.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      fadeTargets.forEach(function (el) {
        el.classList.add("visible");
      });
    }
  }

  window.addEventListener("modulesLoaded", init);
})();
