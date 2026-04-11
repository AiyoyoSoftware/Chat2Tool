# llastro

`llastro` is a greenfield static studio for theme-constrained Alpine.js micro-apps.

It is built around one workflow:

1. Write a brief.
2. Copy the generated prompt into ChatGPT.
3. Paste the returned `html` code block into the studio.
4. Preview it in a sandboxed iframe.
5. Publish it into the local library.
6. Reopen, edit, and export it from the same host.

## What the runtime enforces

- Alpine.js is the interaction layer.
- The generated app must use one root element with `data-llastro-app`.
- The root must declare exactly one theme with `data-llastro-theme`.
- The root must also declare one valid color scheme with `data-llastro-scheme`.
- Custom CSS and external scripts are stripped at import time so the shared theme framework stays consistent.
- Lucide icon placeholders are supported through the host runtime using `data-lucide="icon-name"`.
- Semantic HTML plus a small helper-class set gives LLM output a consistent visual language.

## Theme system

Themes are meant to change more than color. Each one shifts typography, radii, shadow style, surface treatment, and component feel so generated apps can land in meaningfully different visual languages.

Each theme also includes multiple built-in color schemes, so users can stay inside one visual era while swapping palette and mood.

- `flat`: 2013-2017 Flat Design / Material with clean 2D blocks, solid color, and typography-first hierarchy.
- `material2`: 2018-2019 Flat 2.0 / Material 2.0 with subtle elevation, soft gradients, and restrained depth.
- `neumorph`: 2019-2020 Soft UI with clay-like depth and extruded surfaces.
- `glass`: 2020-2022 Glassmorphism with frosted panels, vivid backdrops, and subtle highlights.
- `brutal`: 2023-2024 Brutalism / Flat 2.0 with bold type, vivid color, and minimal decoration.
- `liquid`: 2025-2026 Liquid Glass & Motion UI with refined glow, rich gradients, and premium glass chrome.

Helper classes available to the LLM:

`app-shell`, `hero`, `spotlight`, `panel`, `card-grid`, `card`, `stack`, `cluster`, `split`, `toolbar`, `actions`, `pill`, `metric`, `frame`, `empty-state`, `muted`, `divider`

## Local development

No build step is required, but the app now needs the bundled Node server so the published library can be persisted on disk.

```bash
npm run dev
```

Then open `http://localhost:9944`.

## Docker

```bash
docker compose up --build
```

Then open `http://localhost:9944`.

Published apps are stored in `/data/library.json` inside the container and persisted through the named Docker volume `llastro-data`.

## Generated app contract

The prompt asks the model to return exactly one fenced `html` block for a focused Alpine.js micro-app. The preferred root looks like this:

```html
<main data-llastro-app data-llastro-theme="liquid" data-llastro-scheme="ultraviolet" class="app-shell stack">
  <!-- semantic Alpine app -->
</main>
```

The host injects:

- `framework.css` inline into the preview/export document
- Alpine.js from the CDN
- the vendored Lucide browser runtime from `vendor/lucide.min.js`
- the pasted HTML fragment inside a standalone document shell
- filesystem-backed library persistence in `data/library.json` for published apps

## Files

- `index.html`: studio UI
- `styles.css`: host-shell styling
- `framework.css`: semantic theme framework for generated apps
- `app.js`: Alpine studio logic
- `server.js`: static file host plus the filesystem-backed library API
- `Dockerfile` and `docker-compose.yml`: self-hosting path
