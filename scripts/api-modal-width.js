(function () {
  var CSS = [
    /* ── Narrow the API-playground / Try-It modal ───────────────────────── */

    /* Full-screen overlay – keep dim backdrop but clamp content width */
    "[class*='ApiPlayground'],[class*='api-playground'],[class*='apiPlayground'],",
    "[class*='PlaygroundModal'],[class*='playground-modal'],",
    "[class*='TryItModal'],[class*='try-it-modal'],[class*='tryit-modal'],",
    "[class*='RequestModal'],[class*='request-modal'],",
    "[role='dialog'][class*='modal'],[role='dialog'][class*='Modal'],",
    "[data-testid*='playground'],[data-testid*='tryit'],[data-testid*='try-it'] {",
    "  max-width: min(860px, 90vw) !important;",
    "  width: min(860px, 90vw) !important;",
    "  margin-left: auto !important;",
    "  margin-right: auto !important;",
    "}",

    /* Some platforms wrap the dialog in a full-viewport centering shell */
    "[class*='ModalOverlay'],[class*='modal-overlay'],",
    "[class*='DialogOverlay'],[class*='dialog-overlay'],",
    "[class*='Overlay'][role='dialog'] {",
    "  display: flex !important;",
    "  align-items: center !important;",
    "  justify-content: center !important;",
    "}",

    /* Inner content card */
    "[class*='ModalContent'],[class*='modal-content'],",
    "[class*='DialogContent'],[class*='dialog-content'],",
    "[class*='PlaygroundContent'],[class*='playground-content'] {",
    "  max-width: min(860px, 90vw) !important;",
    "  width: 100% !important;",
    "}",

    /* ── Two-column layout inside the modal ──────────────────────────────── */

    /* Left panel (form) – let it breathe but not sprawl */
    "[class*='PlaygroundForm'],[class*='playground-form'],",
    "[class*='RequestForm'],[class*='request-form'],",
    "[class*='ParametersPanel'],[class*='parameters-panel'] {",
    "  min-width: 0 !important;",
    "  flex: 1 1 55% !important;",
    "  max-width: 55% !important;",
    "}",

    /* Right panel (preview + response) */
    "[class*='ResponsePanel'],[class*='response-panel'],",
    "[class*='PreviewPanel'],[class*='preview-panel'],",
    "[class*='RequestPreview'],[class*='request-preview'] {",
    "  min-width: 0 !important;",
    "  flex: 1 1 45% !important;",
    "  max-width: 45% !important;",
    "}",

    /* ── Fallback: generic wide modals that are taller than 200 px ───────── */
    /* Targets any dialog element the platform might render                  */
    "dialog:not([class*='small']):not([class*='compact']) {",
    "  max-width: min(860px, 90vw) !important;",
    "  width: min(860px, 90vw) !important;",
    "}",

    /* ── Input / textarea readability tweaks ─────────────────────────────── */
    "[class*='playground'] input,[class*='playground'] textarea,",
    "[class*='tryit'] input,[class*='tryit'] textarea {",
    "  max-width: 100% !important;",
    "}"
  ].join("\n");

  function inject() {
    if (document.getElementById("_docai-modal-width")) return;
    var style = document.createElement("style");
    style.id = "_docai-modal-width";
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  /* Inject immediately if DOM is ready, otherwise wait */
  if (document.head) {
    inject();
  } else {
    document.addEventListener("DOMContentLoaded", inject);
  }

  /* Also watch for SPA navigations / late-mounted modals */
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var added = mutations[i].addedNodes;
      for (var j = 0; j < added.length; j++) {
        var node = added[j];
        if (node.nodeType === 1 && node.tagName === "STYLE" && node.id === "_docai-modal-width") return;
      }
    }
    inject();
  });

  observer.observe(document.documentElement, { childList: true, subtree: false });
})();
