# llastro

An Astro-based, Docker-friendly MVP for Interactive Markdown App Spec v0.1.

## What it includes

- Astro server mode with the Node adapter
- A custom parser/compiler for `@#` directives and `{{ }}` interpolation
- A lightweight client runtime for state, computed values, loops, and remote JSON
- A paste-to-preview/publish studio
- Disk-backed storage for content, data, and compiled page cache

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Run with Docker

```bash
docker compose up --build
```

Content is persisted in `./storage`.
