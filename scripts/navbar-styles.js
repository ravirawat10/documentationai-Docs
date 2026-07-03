(function () {
  var css = [
    "nav a[href*='dashboard/login'],",
    "header a[href*='dashboard/login'],",
    "button[data-testid*='login'] {",
    "  color: #ffffff !important;",
    "}",
    "nav a[href*='dashboard/login']:hover,",
    "nav a[href*='dashboard/login']:focus,",
    "nav a[href*='dashboard/login']:active,",
    "header a[href*='dashboard/login']:hover,",
    "header a[href*='dashboard/login']:focus,",
    "header a[href*='dashboard/login']:active {",
    "  color: #ffffff !important;",
    "}"
  ].join("\n");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();
