(function () {
  var css = [
    "a[href*='dashboard/login'],",
    "button[data-testid*='login'],",
    "[class*='NavbarCta'] a,",
    "[class*='navbar-cta'] a,",
    "[class*='NavbarAction'] a,",
    "[class*='navbar-action'] a,",
    "[class*='PrimaryAction'] a,",
    "[class*='primary-action'] a,",
    "[class*='NavbarButton'] a,",
    "[class*='navbar-button'] a {",
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
