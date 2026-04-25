(() => {
  const stamp = Date.now().toString(36);
  window.__LLASTRO_ASSET_STAMP = stamp;
  const isExtensionRuntime = ["moz-extension:", "chrome-extension:"].includes(window.location.protocol);

  const pathname = window.location.pathname || "/";
  const appBase = pathname
    .replace(/\/(?:import|i)(?:\/[^/]+)?\/?$/, "/")
    .replace(/\/index\.html$/, "/")
    .replace(/\/$/, "");
  const assetPath = (path) => `${appBase}${path}`;

  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = `${assetPath("/styles.css")}?v=${stamp}`;
  document.head.appendChild(stylesheet);

  ["/app.js", isExtensionRuntime ? "/vendor/alpinejs-csp.min.js" : "/vendor/alpinejs.min.js"].forEach((src) => {
    const script = document.createElement("script");
    script.src = `${assetPath(src)}?v=${stamp}`;
    script.async = false;
    document.head.appendChild(script);
  });
})();
