# Chat2Tool

Chat2Tool is a local studio for turning conversations, notes, and rough thinking into small reusable web tools.

It is designed as an active alternative to notebook-first workflows in Joplin, Obsidian, or plain markdown. Instead of saving a note that you have to reread and mentally reassemble later, Chat2Tool helps you save the workflow itself: a focused one-page Alpine.js tool that can be reopened, edited, searched, exported, and used again.

Live client-side build: https://aiyoyosoftware.github.io/Chat2Tool

## Alpha Status

This is a `0.1` alpha release. The core local workflow works, but the project is still early. Expect rough edges around generated output quality, browser quirks, and editing affordances.

Good alpha feedback includes broken imports, confusing wizard steps, weak generated-tool prompts, theme issues, accessibility gaps, and examples of notes or conversations that should become tools but do not yet produce useful results.

## What It Is For

- Distilling a useful ChatGPT conversation into one working personal tool.
- Turning a note, plan, checklist, calculator idea, decision process, or tracker into an interactive interface.
- Building a local library of tiny tools that preserve the action behind your thinking.
- Replacing passive notes with durable artifacts you can operate directly.

Good fits include planners, calculators, checklists, trackers, generators, comparison tools, editors, decision helpers, and compact dashboards for personal workflows.

Chat2Tool is not meant to be a general website builder, a SaaS dashboard generator, or a markdown editor. The goal is smaller and sharper: capture the useful workflow hiding inside a conversation or note, then keep it as software.

## Core Workflow

1. Choose whether the tool should come from the current conversation or from a custom brief.
2. Pick a theme and color scheme so the generated tool stays inside a consistent visual system.
3. Copy the generated prompt into ChatGPT.
4. Paste the returned `html` code block back into Chat2Tool.
5. Let the generated tool provide its first title, summary, and tags.
6. Preview the tool, then adjust its name/tags and any visible copy if needed.
7. Save it to the local tool library.
8. Reopen, revise, download, or export it whenever that workflow is useful again.

## Runtime Contract

Generated tools are intentionally constrained so they remain portable, safe to preview, and visually consistent.

- Alpine.js is the interaction layer.
- The generated tool must use one root element with `data-llastro-app`.
- The root must declare exactly one theme with `data-llastro-theme`.
- The root must declare one valid color scheme with `data-llastro-scheme`.
- RTL tools can set `dir="rtl"` and a matching `lang` attribute on the root element.
- Custom CSS and external scripts are stripped at import time so the shared theme framework stays in control.
- Lucide icon placeholders are supported through the host runtime using `data-lucide="icon-name"`.
- Semantic HTML plus a small helper-class set gives LLM output a consistent visual language.

## Safety Model

Generated tools are HTML and Alpine.js produced by an LLM. Chat2Tool strips external scripts, custom CSS, and external stylesheets, then previews saved tools in sandboxed iframes. These guardrails are intended for local experimentation and are not a guarantee that hostile generated code is safe.

Use Chat2Tool as a local, single-user studio:

- Only import generated HTML you trust and are comfortable running locally.
- Treat shared imports as untrusted until you review them. A tool can still contain inline scripts and unexpected behavior even after Chat2Tool removes external assets.
- Use the sandboxed preview to inspect a tool before saving it.
- Be more careful with exported standalone HTML files. Once opened outside Chat2Tool, they no longer benefit from the studio iframe sandbox.
- Do not expose the bundled server on untrusted networks or the public internet. The alpha `/api/library` endpoint has no authentication and is meant for local/self-managed use only.

If you want browser-only isolation, prefer the static GitHub Pages deployment or another static host, where the library stays in that browser's `localStorage` instead of a writable server API.

## Theme System

Themes change more than color. Each one shifts typography, radii, shadow style, surface treatment, and component feel so saved tools can match different kinds of work without custom CSS.

Each theme includes multiple built-in color schemes:

- `flat`: 2013-2017 Flat Design / Material with clean 2D blocks, solid color, and typography-first hierarchy.
- `material2`: 2018-2019 Flat 2.0 / Material 2.0 with subtle elevation, soft gradients, and restrained depth.
- `neumorph`: 2019-2020 Soft UI with clay-like depth and extruded surfaces.
- `glass`: 2020-2022 Glassmorphism with frosted panels, vivid backdrops, and subtle highlights.
- `brutal`: 2023-2024 Brutalism / Flat 2.0 with bold type, vivid color, and minimal decoration.
- `liquid`: 2025-2026 Liquid Glass & Motion UI with refined glow, rich gradients, and premium glass chrome.

Helper classes available to generated tools:

`app-shell`, `hero`, `spotlight`, `panel`, `card-grid`, `card`, `stack`, `cluster`, `split`, `toolbar`, `actions`, `pill`, `metric`, `frame`, `empty-state`, `muted`, `divider`

## Local Development

No build step is required. The bundled Node server serves the static studio and persists the local tool library to disk.

The studio now autodetects library storage:

- If `/api/library` is available, saved tools use the server-backed library and mirror to browser storage as a backup.
- If `/api/library` is unavailable, saved tools fall back to browser-only `localStorage`, so the app still works on static hosting without a writable server volume.

That means Chat2Tool can now run in two useful modes:

- Server-backed mode for local development or self-hosting with `server.js` and filesystem persistence.
- Client-side mode on static hosts such as GitHub Pages, where the app runs fully in the browser and saves the tool library to that browser's `localStorage`.

The public GitHub Pages deployment uses the client-side mode:

- https://aiyoyosoftware.github.io/Chat2Tool

Requires Node.js 20 or newer.

```bash
npm run dev
```

Then open `http://localhost:9944`.

Run syntax checks with:

```bash
npm run check
```

## Docker

```bash
docker compose up --build
```

Then open `http://localhost:9944`.

Saved tools are stored in `/data/library.json` inside the container and persisted through the named Docker volume `chat2tool-data`.

The provided Docker setup publishes port `9944` on all interfaces. Keep it behind a trusted local network, reverse proxy, or SSH tunnel unless you add your own authentication and access controls.

## Generated Tool Shape

The prompt asks ChatGPT to return exactly one fenced `html` block for a focused Alpine.js tool. The preferred root looks like this:

```html
<main data-llastro-app data-llastro-theme="liquid" data-llastro-scheme="ultraviolet" class="app-shell stack">
  <!-- semantic Alpine tool -->
</main>
```

The host injects:

- `framework.css` inline into the preview/export document
- Alpine.js from the vendored browser runtime
- the vendored Lucide browser runtime from `vendor/lucide.min.js`
- the pasted HTML fragment inside a standalone document shell
- autodetected library persistence using either `/api/library` or browser `localStorage`

## Files

- `index.html`: studio UI
- `styles.css`: host-shell styling
- `framework.css`: semantic theme framework for generated tools
- `app.js`: Alpine studio logic
- `server.js`: static file host plus the filesystem-backed library API
- `Dockerfile` and `docker-compose.yml`: self-hosting path

## License

MIT
