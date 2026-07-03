(function () {
  var css = [
    "[class*='dai-navbar-buttons'] a[href*='dashboard/login'],",
    "button[data-testid*='login'] {",
    "  color: #ffffff;",
    "}",
    "[class*='dai-navbar-buttons'] a[href*='dashboard/login']:hover,",
    "[class*='dai-navbar-buttons'] a[href*='dashboard/login']:focus,",
    "[class*='dai-navbar-buttons'] a[href*='dashboard/login']:active,",
    "button[data-testid*='login']:hover,",
    "button[data-testid*='login']:focus,",
    "button[data-testid*='login']:active {",
    "  color: #ffffff;",
    "}"
  ].join("\n");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();
