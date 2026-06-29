(function () {
  "use strict";

  var REVIEW_KEY = "kmong-interaction-catalog-review";
  var manifest = null;
  var reviews = loadReviews();
  var filterReview = "all";

  var $list = document.getElementById("sample-list");
  var $backlog = document.getElementById("backlog");
  var $backlogList = document.getElementById("backlog-list");

  function loadReviews() {
    try {
      return JSON.parse(localStorage.getItem(REVIEW_KEY) || "{}");
    } catch (error) {
      return {};
    }
  }

  function saveReviews() {
    localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews));
  }

  function getReview(id) {
    return reviews[id] || "pending";
  }

  function setReview(id, value) {
    reviews[id] = value;
    saveReviews();
    renderList();
  }

  function reviewLabel(value) {
    if (value === "pass") return "PASS";
    if (value === "hold") return "HOLD";
    if (value === "reject") return "REJECT";
    return "미검토";
  }

  function getItems() {
    return manifest.interactions || manifest.samples || [];
  }

  function getItemById(id) {
    return getItems().find(function (item) {
      return item.id === id;
    });
  }

  function passesFilter(item) {
    if (filterReview === "all") return true;
    return getReview(item.id) === filterReview;
  }

  function openReference(url) {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function renderList() {
    var items = getItems().filter(passesFilter);

    if (!items.length) {
      $list.innerHTML = '<li class="sample-list__empty">필터에 맞는 항목이 없습니다.</li>';
      return;
    }

    $list.innerHTML = items
      .map(function (item) {
        var review = getReview(item.id);
        var ref = item.reference || {};
        var tags = (item.tags || [])
          .map(function (tag) {
            return '<span class="sample-item__tag">' + tag + "</span>";
          })
          .join("");

        var stack = (item.stack || [])
          .map(function (name) {
            return '<span class="sample-item__tag sample-item__tag--stack">' + name + "</span>";
          })
          .join("");

        var description = item.description
          ? '<p class="sample-item__description">' + item.description + "</p>"
          : "";

        var guide = item.howToTest
          ? '<p class="sample-item__guide"><strong>확인 방법</strong> · ' + item.howToTest + "</p>"
          : "";

        function reviewBtn(value, label) {
          var onClass = review === value ? " is-on" : "";
          return (
            '<button type="button" class="sample-item__btn' +
            onClass +
            '" data-review="' +
            value +
            '" data-id="' +
            item.id +
            '">' +
            label +
            "</button>"
          );
        }

        var refBtn = ref.url
          ? '<button type="button" class="sample-item__btn sample-item__btn--open" data-ref="' +
            ref.url +
            '">참고 사이트</button>'
          : "";

        return (
          '<li class="sample-item" data-id="' +
          item.id +
          '">' +
          '<button type="button" class="sample-item__open" data-ref="' +
          (ref.url || "") +
          '">' +
          '<div class="sample-item__head">' +
          '<span class="sample-item__id">' +
          item.id +
          "</span>" +
          '<span class="sample-item__review" data-review="' +
          review +
          '">' +
          reviewLabel(review) +
          "</span>" +
          "</div>" +
          '<h2 class="sample-item__title">' +
          item.title +
          "</h2>" +
          '<p class="sample-item__summary">' +
          item.summary +
          "</p>" +
          description +
          guide +
          (ref.label ? '<p class="sample-item__ref">' + ref.label + "</p>" : "") +
          (stack || tags ? '<div class="sample-item__tags">' + stack + tags + "</div>" : "") +
          "</button>" +
          '<div class="sample-item__foot">' +
          refBtn +
          reviewBtn("pass", "PASS") +
          reviewBtn("hold", "HOLD") +
          reviewBtn("reject", "REJECT") +
          "</div>" +
          "</li>"
        );
      })
      .join("");

    $list.querySelectorAll("[data-ref]").forEach(function (button) {
      button.addEventListener("click", function () {
        openReference(button.getAttribute("data-ref"));
      });
    });

    $list.querySelectorAll("[data-review]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        event.stopPropagation();
        setReview(button.getAttribute("data-id"), button.getAttribute("data-review"));
      });
    });
  }

  function renderBacklog() {
    var backlog = manifest.backlog || [];

    if (!backlog.length) {
      $backlog.hidden = true;
      return;
    }

    $backlog.hidden = false;
    $backlogList.innerHTML = backlog
      .map(function (item) {
        return (
          "<li><strong>" +
          item.title +
          "</strong>" +
          (item.note ? " — " + item.note : "") +
          "</li>"
        );
      })
      .join("");
  }

  function bindToolbar() {
    document.querySelectorAll("[data-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        filterReview = button.getAttribute("data-filter");
        document.querySelectorAll("[data-filter]").forEach(function (item) {
          item.classList.toggle("is-active", item === button);
        });
        renderList();
      });
    });

    document.getElementById("clear-reviews").addEventListener("click", function () {
      if (!window.confirm("저장된 검토 상태(PASS/HOLD/REJECT)를 모두 초기화할까요?")) {
        return;
      }
      reviews = {};
      saveReviews();
      renderList();
    });
  }

  fetch("samples.manifest.json", { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("manifest load failed");
      }
      return response.json();
    })
    .then(function (data) {
      manifest = data;
      document.getElementById("manifest-updated").textContent = data.updated || "-";
      bindToolbar();
      renderList();
      renderBacklog();
    })
    .catch(function () {
      $list.innerHTML =
        '<li class="sample-list__empty">samples.manifest.json 을 불러오지 못했습니다.<br>로컬 서버로 열거나 파일 경로를 확인하세요.</li>';
    });
})();
