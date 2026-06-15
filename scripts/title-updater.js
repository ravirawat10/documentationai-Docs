(function () {
  if (typeof window === "undefined") return;
  var SITE_NAME = "5centsCDN";

  function updateTitle() {
    setTimeout(function () {
      var h1 = document.querySelector("h1");
      if (h1 && h1.textContent.trim()) {
        document.title = h1.textContent.trim() + " | " + SITE_NAME;
      } else {
        document.title = SITE_NAME;
      }
    }, 150);
  }

  // Intercept SPA pushState navigation
  var _push = history.pushState;
  history.pushState = function () {
    _push.apply(history, arguments);
    updateTitle();
  };

  // Handle browser back/forward
  window.addEventListener("popstate", updateTitle);

  // Run once on initial load
  updateTitle();
})();
