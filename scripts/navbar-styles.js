(function () {
  var css = [
    "nav a[href*='dashboard/login'],",
    "nav a[href*='dashboard/login'] .text-brand-text,",
    "header a[href*='dashboard/login'],",
    "header a[href*='dashboard/login'] .text-brand-text,",
    "button[data-testid*='login'],",
    "button[data-testid*='login'] .text-brand-text {",
    "  color: #ffffff !important;",
    "}",
    "nav a[href*='dashboard/login']:hover,",
    "nav a[href*='dashboard/login']:hover .text-brand-text,",
    "nav a[href*='dashboard/login']:focus,",
    "nav a[href*='dashboard/login']:focus .text-brand-text,",
    "nav a[href*='dashboard/login']:active,",
    "nav a[href*='dashboard/login']:active .text-brand-text,",
    "header a[href*='dashboard/login']:hover,",
    "header a[href*='dashboard/login']:hover .text-brand-text,",
    "header a[href*='dashboard/login']:focus,",
    "header a[href*='dashboard/login']:focus .text-brand-text,",
    "header a[href*='dashboard/login']:active,",
    "header a[href*='dashboard/login']:active .text-brand-text {",
    "  color: #ffffff !important;",
    "}"
  ].join("\n");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();
