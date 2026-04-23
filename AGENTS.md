# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

`Chat2Tool` is a static studio for generating, previewing, publishing, reopening, and exporting theme-constrained Alpine.js micro-apps. It has no build step. A small Node HTTP server serves static files and persists the published app library to disk.

Core files:

- `index.html`: studio UI shell.
- `styles.css`: host studio styling.
- `framework.css`: shared theme framework injected into generated apps.
- `app.js`: Alpine studio state and behavior.
- `server.js`: static file host plus `/api/library` persistence.
- `vendor/`: vendored browser runtimes, currently Alpine.js and Lucide.
- `Dockerfile` and `docker-compose.yml`: containerized self-hosting path.

## Context7 Documentation Rule

Use Context7 MCP to fetch current documentation whenever the user asks about a library, framework, SDK, API, CLI tool, or cloud service, including API syntax, configuration, version migration, library-specific debugging, setup instructions, and CLI tool usage. Use it even for familiar tools.

Do not use Context7 for refactoring, writing scripts from scratch, debugging business logic, code review, or general programming concepts.

Steps:

1. Start with `resolve-library-id` using the library name and the user's question, unless the user provides an exact library ID in `/org/project` format.
2. Pick the best match by exact name match, description relevance, code snippet count, source reputation, and benchmark score. Use a version-specific ID when the user mentions a version.
3. Call `query-docs` with the selected library ID and the user's full question.
4. Answer using the fetched docs.

## Local Development

Use the existing npm scripts:

```bash
npm run dev
npm run check
```

`npm run dev` starts `server.js` on `http://localhost:9944`. `npm run check` runs syntax checks for `app.js` and `server.js`.

Docker path:

```bash
docker compose up --build
```

The Docker container stores published apps in `/data/library.json`, persisted through the `llastro-data` named volume.

## Architecture Notes

- Keep the app dependency-light. There is no bundler, transpiler, package install, or frontend framework beyond Alpine.js.
- Browser libraries are loaded from `vendor/` to keep previews and exports independent of network requests.
- `server.js` uses Node's built-in `http` module and `fs/promises`; preserve the no-framework server unless the user explicitly asks for a server stack change.
- The library API is intentionally small: `GET /api/library` and `PUT /api/library`.
- Published app data is sanitized on read and write. Preserve that defensive boundary when changing persistence behavior.

## Generated App Contract

Generated micro-app HTML must keep the host contract intact:

- Exactly one app root with `data-llastro-app`.
- Exactly one valid `data-llastro-theme`.
- Exactly one valid `data-llastro-scheme`.
- Use Alpine.js for interaction.
- Use Lucide placeholders with `data-lucide="icon-name"` when icons are needed.
- Avoid custom CSS and external scripts in generated app fragments; the host strips these at import time.
- Prefer semantic HTML and helper classes from `framework.css`.

Common helper classes include:

`app-shell`, `hero`, `spotlight`, `panel`, `card-grid`, `card`, `stack`, `cluster`, `split`, `toolbar`, `actions`, `pill`, `metric`, `frame`, `empty-state`, `muted`, `divider`

## Coding Guidelines

- Preserve the plain HTML/CSS/JS shape of the project.
- Prefer small, local changes over broad rewrites.
- Keep host UI changes in `index.html`, `styles.css`, and `app.js` aligned with existing naming conventions.
- Keep generated-app visual primitives in `framework.css`.
- Do not introduce a build step, dependency manager workflow, or CDN dependency unless the user asks for it and the tradeoff is clear.
- Use modern JavaScript that runs directly in current browsers and Node 20.
- Keep comments sparse and useful.
- Do not edit vendored runtime files unless updating the vendored dependency itself; note the source/version in `vendor/README.md` when doing so.

## Validation

Before finishing code changes, run:

```bash
npm run check
```

For UI changes, also run the app locally and inspect the affected flow in the browser when feasible.

## Data And Files

- Runtime library data lives in `data/library.json` by default for local development. Treat it as local generated data, not source code.
- Docker writes library data to `/data/library.json`.
- Avoid committing generated data, temporary files, logs, or local server artifacts unless the user explicitly requests it.
