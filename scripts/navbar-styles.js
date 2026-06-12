(function () {
  var css = [
    "a[href*='dashboard/login'],",
    "button[data-testid*='login'] {",
    "  color: #ffffff !important;",
    "}",
    "a[href*='dashboard/login']:hover,",
    "a[href*='dashboard/login']:focus,",
    "a[href*='dashboard/login']:active {",
    "  color: #ffffff !important;",
    "}"
  ].join("\n");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();
