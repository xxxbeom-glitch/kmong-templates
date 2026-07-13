(function ($) {
  "use strict";

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("pageshow", function () {
    window.scrollTo(0, 0);
  });

  function initHeaderScroll() {
    var $header = $("[data-site-header]");
    if (!$header.length) {
      return;
    }

    var lastY = 0;

    function sync() {
      var y = window.scrollY || 0;
      var menuOpen = $("body").hasClass("is-menu-open");

      $header.toggleClass("is-scrolled", y > 8);

      if (menuOpen || y <= 8) {
        $header.removeClass("is-hidden");
      } else if (y > lastY && y > 64) {
        $header.addClass("is-hidden");
      } else if (y < lastY) {
        $header.removeClass("is-hidden");
      }

      lastY = y;
    }

    sync();
    $(window).on("scroll", sync);
  }

  function initMobileMenu() {
    var $toggle = $("[data-menu-toggle]");
    var $menu = $("[data-mobile-menu]");
    var $close = $("[data-menu-close]");
    var lastFocus = null;

    if (!$toggle.length || !$menu.length) {
      return;
    }

    function isOpen() {
      return !$menu.prop("hidden");
    }

    function openMenu() {
      lastFocus = document.activeElement;
      $menu.prop("hidden", false);
      if ($menu[0].inert !== undefined) {
        $menu[0].inert = false;
      } else {
        $menu.removeAttr("inert");
      }
      $toggle.attr("aria-expanded", "true").attr("aria-label", "메뉴 닫기");
      $("body").addClass("is-menu-open");
      window.setTimeout(function () {
        var $first = $menu.find("[data-menu-close], a, button").filter(":visible").first();
        if ($first.length) {
          $first.trigger("focus");
        }
      }, 0);
    }

    function closeMenu() {
      if (!isOpen()) {
        return;
      }
      $menu.prop("hidden", true);
      if ($menu[0].inert !== undefined) {
        $menu[0].inert = true;
      } else {
        $menu.attr("inert", "");
      }
      $toggle.attr("aria-expanded", "false").attr("aria-label", "메뉴 열기");
      $("body").removeClass("is-menu-open");
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      } else {
        $toggle.trigger("focus");
      }
    }

    $toggle.on("click", function () {
      if (isOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    $close.on("click", closeMenu);

    $menu.on("click", "a", function () {
      closeMenu();
    });

    $(document).on("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) {
        closeMenu();
      }
    });
  }

  function initAccordion() {
    var closeDelay = 280;

    $("[data-accordion]").each(function () {
      var $root = $(this);

      $root.on("click", "[data-accordion-trigger]", function () {
        var $btn = $(this);
        var panelId = $btn.attr("aria-controls");
        var $panel = panelId ? $("#" + panelId) : $();
        var expanded = $btn.attr("aria-expanded") === "true";

        if (!$panel.length) {
          return;
        }

        if (expanded) {
          $btn.attr("aria-expanded", "false");
          $panel.removeClass("is-open");
          window.setTimeout(function () {
            if ($btn.attr("aria-expanded") === "false") {
              $panel.prop("hidden", true);
            }
          }, closeDelay);
          return;
        }

        $btn.attr("aria-expanded", "true");
        $panel.prop("hidden", false);
        window.requestAnimationFrame(function () {
          $panel.addClass("is-open");
        });
      });

      $root.on("keydown", "[data-accordion-trigger]", function (e) {
        if (e.key !== "Enter" && e.key !== " ") {
          return;
        }
        e.preventDefault();
        $(this).trigger("click");
      });
    });
  }

  function initProjectFilter() {
    var $bar = $("[data-project-filter]");
    var $grid = $("[data-project-grid]");

    if (!$bar.length || !$grid.length) {
      return;
    }

    var $buttons = $bar.find("[data-filter]");
    var $items = $grid.find("[data-category]");

    $bar.on("click", "[data-filter]", function () {
      var $btn = $(this);
      var filter = $btn.attr("data-filter") || "전체";

      $buttons.removeClass("is-active").attr("aria-pressed", "false");
      $btn.addClass("is-active").attr("aria-pressed", "true");

      $items.each(function () {
        var $item = $(this);
        var category = $item.attr("data-category") || "";
        var show = filter === "전체" || category === filter;
        $item.prop("hidden", !show);
      });
    });
  }

  function getQueryParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name);
    } catch (err) {
      return null;
    }
  }

  function initPackageQuery() {
    var packageValue = getQueryParam("package");
    if (packageValue !== "standard" && packageValue !== "custom") {
      return;
    }

    var $radio = $('[data-package-options] input[name="package"][value="' + packageValue + '"]');
    if ($radio.length) {
      $radio.prop("checked", true);
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setFieldError($form, name, message) {
    var $error = $form.find('[data-error-for="' + name + '"]');
    var $field = $error.closest(".form-field");

    if (!$error.length) {
      return;
    }

    if (message) {
      $error.text(message).prop("hidden", false);
      $field.addClass("is-invalid");
    } else {
      $error.text("").prop("hidden", true);
      $field.removeClass("is-invalid");
    }
  }

  function clearFormErrors($form) {
    $form.find("[data-error-for]").each(function () {
      var name = $(this).attr("data-error-for");
      if (name) {
        setFieldError($form, name, "");
      }
    });
  }

  function initContactForm() {
    var $form = $("[data-contact-form]");
    if (!$form.length) {
      return;
    }

    var submitting = false;

    $form.on("submit", function (e) {
      e.preventDefault();
      if (submitting) {
        return;
      }

      clearFormErrors($form);

      var company = String($form.find("#company").val() || "").trim();
      var name = String($form.find("#name").val() || "").trim();
      var email = String($form.find("#email").val() || "").trim();
      var phone = String($form.find("#phone").val() || "").trim();
      var privacy = $form.find("#privacy").is(":checked");
      var firstError = null;

      if (!company) {
        setFieldError($form, "company", "회사 또는 브랜드명을 입력해 주세요.");
        firstError = firstError || "#company";
      }
      if (!name) {
        setFieldError($form, "name", "담당자명을 입력해 주세요.");
        firstError = firstError || "#name";
      }
      if (!email) {
        setFieldError($form, "email", "이메일을 입력해 주세요.");
        firstError = firstError || "#email";
      } else if (!isValidEmail(email)) {
        setFieldError($form, "email", "이메일 형식을 확인해 주세요.");
        firstError = firstError || "#email";
      }
      if (!phone) {
        setFieldError($form, "phone", "연락처를 입력해 주세요.");
        firstError = firstError || "#phone";
      }
      if (!privacy) {
        setFieldError($form, "privacy", "개인정보 수집에 동의해 주세요.");
        firstError = firstError || "#privacy";
      }

      if (firstError) {
        var $focus = $form.find(firstError);
        if ($focus.length) {
          $focus.trigger("focus");
        }
        return;
      }

      var features = [];
      $form.find('input[name="features[]"]:checked').each(function () {
        features.push($(this).val());
      });

      var payload = {
        company: company,
        name: name,
        email: email,
        phone: phone,
        project_type: $form.find('input[name="project_type"]:checked').val() || "",
        package: $form.find('input[name="package"]:checked').val() || "",
        budget: $form.find('input[name="budget"]:checked').val() || "",
        timeline: $form.find('input[name="timeline"]:checked').val() || "",
        features: features,
        message: String($form.find("#message").val() || "").trim(),
        privacy: true,
      };

      console.log("[tenfold contact]", payload);

      submitting = true;
      var $btn = $form.find("[data-submit-btn]");
      $btn.prop("disabled", true);

      var completeUrl =
        window.tenfoldData && window.tenfoldData.contactCompleteUrl
          ? window.tenfoldData.contactCompleteUrl
          : "/contact-complete/";

      window.location.href = completeUrl;
    });
  }

  function initSmoothScroll() {
    $(document).on("click", 'a[href^="#"]', function (e) {
      var hash = this.getAttribute("href");
      if (!hash || hash === "#") {
        return;
      }

      var $target = $(hash);
      if (!$target.length) {
        return;
      }

      e.preventDefault();
      var top = $target.offset().top - (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h"), 10) || 64);

      window.scrollTo({
        top: Math.max(0, top),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    });
  }

  function initPortfolioStage() {
    var el = document.querySelector("[data-portfolio-stage]");
    if (!el || typeof window.Swiper === "undefined") {
      return;
    }

    var $info = $("[data-portfolio-stage-info]");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function syncInfo(slideEl) {
      if (!$info.length || !slideEl) {
        return;
      }

      var map = {
        summary: slideEl.getAttribute("data-stage-summary") || "",
        category: slideEl.getAttribute("data-stage-category") || "",
        type: slideEl.getAttribute("data-stage-type") || "",
        title: slideEl.getAttribute("data-stage-title") || "",
        platform: slideEl.getAttribute("data-stage-platform") || "",
      };

      Object.keys(map).forEach(function (key) {
        $info.find('[data-stage-field="' + key + '"]').text(map[key]);
      });
    }

    var swiper = new window.Swiper(el, {
      loop: true,
      centeredSlides: true,
      slidesPerView: "auto",
      spaceBetween: 24,
      speed: 600,
      grabCursor: true,
      autoplay: reduceMotion
        ? false
        : {
            delay: 2800,
            disableOnInteraction: false,
          },
      breakpoints: {
        0: {
          spaceBetween: 8,
        },
        1281: {
          spaceBetween: 24,
        },
      },
      on: {
        init: function (instance) {
          syncInfo(instance.slides[instance.activeIndex]);
        },
        slideChange: function (instance) {
          syncInfo(instance.slides[instance.activeIndex]);
        },
      },
    });

    return swiper;
  }

  $(function () {
    $("html").addClass("js");
    initHeaderScroll();
    initMobileMenu();
    initAccordion();
    initProjectFilter();
    initPackageQuery();
    initContactForm();
    initSmoothScroll();
    initPortfolioStage();
  });
})(jQuery);
