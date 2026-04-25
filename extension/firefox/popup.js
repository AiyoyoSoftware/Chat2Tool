const LIBRARY_KEY = "llastro-library-v1";
const EXTENSION_DRAFT_KEY = "llastro-extension-draft-v1";
const EXTENSION_STUDIO_STATE_KEY = "llastro-extension-studio-state-v1";
const MAX_RECENT_TOOLS = 5;

const browserApi = globalThis.browser;
const elements = {
  status: document.getElementById("status-message"),
  statusBar: document.querySelector(".status-bar"),
  promptLabel: document.getElementById("prompt-label"),
  promptHint: document.getElementById("prompt-hint"),
  copyPromptButton: document.getElementById("copy-prompt"),
  reply: document.getElementById("reply"),
  handoffForm: document.getElementById("handoff-form"),
  clearButton: document.getElementById("clear-handoff"),
  openStudioButton: document.getElementById("open-studio"),
  openLibraryButton: document.getElementById("open-library"),
  recentTools: document.getElementById("recent-tools"),
};
let studioState = null;

function setStatus(message, level = "info") {
  elements.status.textContent = message;
  elements.statusBar.classList.toggle("is-error", level === "error");
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function truncate(value, maxLength) {
  const text = String(value || "").trim();
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

function normalizeLibrary(payload) {
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload
    .filter((entry) => entry && typeof entry.id === "string" && typeof entry.html === "string")
    .map((entry) => ({
      id: entry.id,
      title: typeof entry.title === "string" && entry.title.trim() ? entry.title.trim() : "Untitled Tool",
      summary: typeof entry.summary === "string" ? entry.summary.trim() : "",
      updatedAt: typeof entry.updatedAt === "string" ? entry.updatedAt : "",
    }))
    .sort((left, right) => {
      const leftTime = left.updatedAt ? new Date(left.updatedAt).getTime() : 0;
      const rightTime = right.updatedAt ? new Date(right.updatedAt).getTime() : 0;
      return rightTime - leftTime;
    });
}

function formatTimestamp(value) {
  if (!value) {
    return "Saved locally";
  }

  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function getExtensionPageUrl(route = "#studio", options = {}) {
  const { fullscreen = false } = options;
  const url = new URL(browserApi.runtime.getURL("index.html"));

  if (fullscreen) {
    url.searchParams.set("fullscreen", "1");
  } else {
    url.searchParams.delete("fullscreen");
  }

  url.hash = route;
  return url.toString();
}

async function openExtensionPage(route, options = {}) {
  const url = getExtensionPageUrl(route, options);
  await browserApi.tabs.create({ url });
  window.close();
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
    setStatus(message);
  } catch (error) {
    console.error(error);
    setStatus("Copy failed in this popup.", "error");
  }
}

function renderEmptyState(message) {
  elements.recentTools.innerHTML = `
    <article class="empty-state">
      <h3>No saved tools yet</h3>
      <p>${escapeHtml(message)}</p>
    </article>
  `;
}

function renderRecentTools(library) {
  if (!library.length) {
    renderEmptyState("Open the studio, save a tool, and it will show up here for one-click launch.");
    return;
  }

  elements.recentTools.innerHTML = library
    .slice(0, MAX_RECENT_TOOLS)
    .map((entry) => {
      return `
        <article class="recent-tool">
          <div class="recent-tool__head">
            <div class="recent-tool__meta">
              <h3>${escapeHtml(entry.title)}</h3>
              <p>${escapeHtml(truncate(entry.summary || "Saved in your extension library.", 100))}</p>
            </div>
            <span class="recent-tool__stamp">${escapeHtml(formatTimestamp(entry.updatedAt))}</span>
          </div>
          <div class="recent-tool__actions">
            <button type="button" class="button button-primary" data-open-app="${escapeHtml(entry.id)}">Open</button>
            <button type="button" class="button button-secondary" data-copy-link="${escapeHtml(entry.id)}">Copy Link</button>
          </div>
        </article>
      `;
    })
    .join("");
}

async function loadLibrary() {
  try {
    const payload = await browserApi.storage.local.get(LIBRARY_KEY);
    const library = normalizeLibrary(payload[LIBRARY_KEY]);
    renderRecentTools(library);
  } catch (error) {
    console.error(error);
    renderEmptyState("Extension storage could not be read in this popup.");
    setStatus("Could not load the extension library.", "error");
  }
}

function updatePromptCard() {
  elements.promptLabel.textContent = studioState?.promptFieldLabel || "Extension-safe prompt from the wizard";
  elements.promptHint.textContent = studioState?.promptFieldHint || "Open the studio once to prepare the current extension-safe prompt for this popup.";
  elements.copyPromptButton.disabled = !studioState?.promptText;
}

async function loadStudioState() {
  try {
    const payload = await browserApi.storage.local.get(EXTENSION_STUDIO_STATE_KEY);
    studioState = payload?.[EXTENSION_STUDIO_STATE_KEY] || null;
  } catch (error) {
    console.error(error);
    studioState = null;
  }

  updatePromptCard();
}

async function copyPromptFromStudio() {
  if (!studioState?.promptText) {
    setStatus("Open the studio once to prepare the current extension-safe wizard prompt.", "error");
    return;
  }

  await copyText(studioState.promptText, "Extension-safe prompt copied.");
}

async function handleHandoffSubmit(event) {
  event.preventDefault();

  const rawResponse = elements.reply.value.trim();

  if (!rawResponse) {
    setStatus("Opening the studio...");
    await openExtensionPage("#studio");
    return;
  }

  const draft = {
    rawResponse,
    currentStudioStep: "preview",
  };

  try {
    await browserApi.storage.local.set({ [EXTENSION_DRAFT_KEY]: draft });
    setStatus("Draft staged. Opening the studio...");
    await openExtensionPage("#studio");
  } catch (error) {
    console.error(error);
    setStatus("The wizard draft could not be staged.", "error");
  }
}

function clearHandoff() {
  elements.reply.value = "";
  setStatus("Quick handoff cleared.");
}

async function handleRecentToolsClick(event) {
  if (!(event.target instanceof Element)) {
    return;
  }

  const openButton = event.target.closest("[data-open-app]");
  if (openButton) {
    const appId = openButton.getAttribute("data-open-app");
    if (appId) {
      await openExtensionPage(`#library/${encodeURIComponent(appId)}`, { fullscreen: true });
    }
    return;
  }

  const copyButton = event.target.closest("[data-copy-link]");
  if (copyButton) {
    const appId = copyButton.getAttribute("data-copy-link");
    if (!appId) {
      return;
    }

    const url = getExtensionPageUrl(`#library/${encodeURIComponent(appId)}`, { fullscreen: true });
    await copyText(url, "Extension link copied.");
  }
}

async function bootstrap() {
  if (!browserApi?.storage?.local || !browserApi?.runtime?.getURL || !browserApi?.tabs?.create) {
    setStatus("Firefox extension APIs are unavailable in this popup.", "error");
    renderEmptyState("The popup needs to run as a packaged Firefox extension.");
    return;
  }

  elements.openStudioButton.addEventListener("click", () => void openExtensionPage("#studio"));
  elements.openLibraryButton.addEventListener("click", () => void openExtensionPage("#library"));
  elements.copyPromptButton.addEventListener("click", () => void copyPromptFromStudio());
  elements.handoffForm.addEventListener("submit", (event) => void handleHandoffSubmit(event));
  elements.clearButton.addEventListener("click", clearHandoff);
  elements.recentTools.addEventListener("click", (event) => void handleRecentToolsClick(event));

  await loadStudioState();
  await loadLibrary();
}

void bootstrap();
