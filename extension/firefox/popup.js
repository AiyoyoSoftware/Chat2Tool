const HOSTED_APP_URL = "https://aiyoyosoftware.github.io/Chat2Tool/";
const STUDIO_HANDOFF_PARAM = "llastro-handoff";
const SHARE_COMPRESSION_FORMAT = "deflate";

const browserApi = globalThis.browser;
const elements = {
  status: document.getElementById("status-message"),
  statusBar: document.querySelector(".status-bar"),
  promptLabel: document.getElementById("prompt-label"),
  promptHint: document.getElementById("prompt-hint"),
  openPromptButton: document.getElementById("copy-prompt"),
  reply: document.getElementById("reply"),
  handoffForm: document.getElementById("handoff-form"),
  clearButton: document.getElementById("clear-handoff"),
  openStudioButton: document.getElementById("open-studio"),
  openLibraryButton: document.getElementById("open-library"),
};

function setStatus(message, level = "info") {
  elements.status.textContent = message;
  elements.statusBar.classList.toggle("is-error", level === "error");
}

function bytesToBase64Url(bytes) {
  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

async function compressTextToBase64Url(value) {
  if (typeof CompressionStream !== "function") {
    throw new Error("CompressionStream is unavailable in this popup.");
  }

  const stream = new Blob([String(value || "")]).stream().pipeThrough(new CompressionStream(SHARE_COMPRESSION_FORMAT));
  const buffer = await new Response(stream).arrayBuffer();
  return bytesToBase64Url(new Uint8Array(buffer));
}

async function buildHostedStudioUrl(route = "#studio", handoffPayload = null) {
  const url = new URL(HOSTED_APP_URL);
  url.hash = route;

  if (handoffPayload && typeof handoffPayload === "object") {
    const token = await compressTextToBase64Url(JSON.stringify(handoffPayload));
    url.searchParams.set(STUDIO_HANDOFF_PARAM, token);
  }

  return url.toString();
}

async function openHostedPage(route, handoffPayload = null) {
  const url = await buildHostedStudioUrl(route, handoffPayload);
  await browserApi.tabs.create({ url });
  window.close();
}

function updatePromptCard() {
  elements.promptLabel.textContent = "Prompt lives in the hosted studio";
  elements.promptHint.textContent = "Open the GitHub Pages studio on the handoff step to copy or tune the current prompt there.";
}

async function openHostedPromptStep() {
  try {
    setStatus("Opening the hosted studio...");
    await openHostedPage("#studio", { currentStudioStep: "handoff" });
  } catch (error) {
    console.error(error);
    setStatus("The hosted studio could not be opened from this popup.", "error");
  }
}

async function handleHandoffSubmit(event) {
  event.preventDefault();

  const rawResponse = elements.reply.value.trim();

  try {
    if (!rawResponse) {
      setStatus("Opening the hosted studio...");
      await openHostedPage("#studio", { currentStudioStep: "handoff" });
      return;
    }

    setStatus("Opening the hosted preview...");
    await openHostedPage("#studio", {
      rawResponse,
      currentStudioStep: "preview",
    });
  } catch (error) {
    console.error(error);
    setStatus("The hosted handoff could not be opened from this popup.", "error");
  }
}

function clearHandoff() {
  elements.reply.value = "";
  setStatus("Quick handoff cleared.");
}

async function bootstrap() {
  if (!browserApi?.tabs?.create) {
    setStatus("Firefox extension tab APIs are unavailable in this popup.", "error");
    return;
  }

  updatePromptCard();

  elements.openStudioButton.addEventListener("click", () => void openHostedPromptStep());
  elements.openLibraryButton.addEventListener("click", async () => {
    try {
      setStatus("Opening the hosted library...");
      await openHostedPage("#library");
    } catch (error) {
      console.error(error);
      setStatus("The hosted library could not be opened from this popup.", "error");
    }
  });
  elements.openPromptButton.addEventListener("click", () => void openHostedPromptStep());
  elements.handoffForm.addEventListener("submit", (event) => void handleHandoffSubmit(event));
  elements.clearButton.addEventListener("click", clearHandoff);
}

void bootstrap();
