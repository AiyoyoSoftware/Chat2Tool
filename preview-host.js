const previewRoot = document.getElementById("preview-root");
const slot = new URLSearchParams(window.location.search).get("slot") || "";

function renderLucideIcons(root = document.body) {
  if (!window.lucide || typeof window.lucide.createIcons !== "function") {
    return;
  }

  try {
    window.lucide.createIcons({ root });
  } catch (error) {
    console.error("Lucide icon render failed.", error);
  }
}

function mountApp(appHtml, title) {
  document.title = title || "Chat2Tool Preview";

  if (!previewRoot) {
    return;
  }

  previewRoot.innerHTML = appHtml || "";

  if (window.Alpine && typeof window.Alpine.initTree === "function") {
    window.Alpine.initTree(previewRoot);
  }

  renderLucideIcons(previewRoot);
}

window.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.type !== "llastro-preview-render" || data.slot !== slot) {
    return;
  }

  const payload = data.payload || {};
  mountApp(typeof payload.appHtml === "string" ? payload.appHtml : "", payload.title || "Chat2Tool Preview");
});

window.addEventListener("load", () => {
  window.parent.postMessage({ type: "llastro-preview-host-ready", slot }, "*");
});
