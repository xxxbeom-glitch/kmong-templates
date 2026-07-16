(function () {
  var yearNodes = document.querySelectorAll("[data-year]");
  var year = String(new Date().getFullYear());
  yearNodes.forEach(function (el) {
    el.textContent = year;
  });
})();
