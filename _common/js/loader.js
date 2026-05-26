(function () {
  "use strict";

  var modules = document.querySelectorAll("[data-module]");

  if (modules.length === 0) {
    window.dispatchEvent(new Event("modulesLoaded"));
    return;
  }

  var pending = modules.length;

  modules.forEach(function (el) {
    var module = el.getAttribute("data-module");
    if (!module) {
      pending -= 1;
      if (pending === 0) {
        window.dispatchEvent(new Event("modulesLoaded"));
      }
      return;
    }

    fetch("../_modules/" + module + ".html")
      .then(function (res) {
        if (!res.ok) throw new Error("Module load failed: " + module);
        return res.text();
      })
      .then(function (html) {
        el.innerHTML = html;
      })
      .catch(function (err) {
        console.error(err);
      })
      .finally(function () {
        pending -= 1;
        if (pending === 0) {
          window.dispatchEvent(new Event("modulesLoaded"));
        }
      });
  });
})();
