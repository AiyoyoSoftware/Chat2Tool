const http = require("http");
const { readFile, writeFile, mkdir, rename } = require("fs/promises");
const path = require("path");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 9944);
const STATIC_ROOT = __dirname;
const DATA_DIR = path.resolve(process.env.LLASTRO_DATA_DIR || path.join(__dirname, "data"));
const LIBRARY_FILE = path.join(DATA_DIR, "library.json");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function normalizeTags(value) {
  const rawTags = Array.isArray(value) ? value : String(value || "").split(/[,#\n]/);
  const seen = new Set();
  const tags = [];

  rawTags.forEach((tag) => {
    const normalized = String(tag || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 28);

    if (!normalized || seen.has(normalized)) {
      return;
    }

    seen.add(normalized);
    tags.push(normalized);
  });

  return tags.slice(0, 8);
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
}

function sendText(response, statusCode, body, contentType = "text/plain; charset=utf-8", headers = {}) {
  response.writeHead(statusCode, {
    "Content-Type": contentType,
    ...headers
  });
  response.end(body);
}

function sanitizeLibrary(library) {
  if (!Array.isArray(library)) {
    return [];
  }

  return library
    .filter((entry) => {
      return entry && typeof entry.id === "string" && typeof entry.html === "string";
    })
    .map((entry) => {
      const now = new Date().toISOString();
      return {
        id: entry.id,
        title: typeof entry.title === "string" && entry.title.trim() ? entry.title.trim() : "Untitled App",
        summary: typeof entry.summary === "string" ? entry.summary.trim().slice(0, 180) : "",
        tags: normalizeTags(entry.tags),
        themeId: typeof entry.themeId === "string" ? entry.themeId : "",
        schemeId: typeof entry.schemeId === "string" ? entry.schemeId : "",
        source: typeof entry.source === "string" && entry.source.trim() ? entry.source : entry.html,
        html: entry.html,
        createdAt: typeof entry.createdAt === "string" && entry.createdAt ? entry.createdAt : now,
        updatedAt: typeof entry.updatedAt === "string" && entry.updatedAt ? entry.updatedAt : now
      };
    });
}

async function ensureDataDir() {
  await mkdir(DATA_DIR, { recursive: true });
}

async function readLibrary() {
  await ensureDataDir();

  try {
    const raw = await readFile(LIBRARY_FILE, "utf8");
    return sanitizeLibrary(JSON.parse(raw));
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeLibrary(library) {
  const nextLibrary = sanitizeLibrary(library);
  await ensureDataDir();

  const tempFile = `${LIBRARY_FILE}.tmp`;
  await writeFile(tempFile, JSON.stringify(nextLibrary, null, 2));
  await rename(tempFile, LIBRARY_FILE);
  return nextLibrary;
}

async function readRequestBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
}

function resolveStaticPath(requestPath) {
  const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
  const filesystemPath = path.normalize(path.join(STATIC_ROOT, normalizedPath));

  if (!filesystemPath.startsWith(STATIC_ROOT)) {
    return "";
  }

  return filesystemPath;
}

async function handleApi(request, response, pathname) {
  if (pathname !== "/api/library") {
    return false;
  }

  if (request.method === "GET") {
    try {
      const library = await readLibrary();
      sendJson(response, 200, { library, dataDir: DATA_DIR });
    } catch (error) {
      console.error(error);
      sendJson(response, 500, { error: "Library could not be read." });
    }
    return true;
  }

  if (request.method === "PUT") {
    try {
      const rawBody = await readRequestBody(request);
      const payload = rawBody ? JSON.parse(rawBody) : {};
      const library = await writeLibrary(payload.library);
      sendJson(response, 200, { library, dataDir: DATA_DIR });
    } catch (error) {
      console.error(error);
      const statusCode = error instanceof SyntaxError ? 400 : 500;
      const message = error instanceof SyntaxError ? "Request body must be valid JSON." : "Library could not be saved.";
      sendJson(response, statusCode, { error: message });
    }
    return true;
  }

  sendJson(response, 405, { error: "Method not allowed." });
  return true;
}

async function handleStatic(request, response, pathname) {
  const filePath = resolveStaticPath(pathname);
  if (!filePath) {
    sendText(response, 403, "Forbidden");
    return;
  }

  try {
    const file = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    sendText(response, 200, file, MIME_TYPES[extension] || "application/octet-stream", {
      "Cache-Control": "no-store"
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      sendText(response, 404, "Not found");
      return;
    }

    console.error(error);
    sendText(response, 500, "Internal server error");
  }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const handled = await handleApi(request, response, url.pathname);

  if (!handled) {
    await handleStatic(request, response, url.pathname);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`llastro listening on http://${HOST}:${PORT}`);
  console.log(`Library storage path: ${LIBRARY_FILE}`);
});
