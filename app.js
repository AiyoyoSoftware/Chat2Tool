const APP_MARKER = "data-llastro-app";
const THEME_MARKER = "data-llastro-theme";
const SCHEME_MARKER = "data-llastro-scheme";
const STORAGE_KEY = "llastro-studio-v1";
const LIBRARY_KEY = "llastro-library-v1";
const ALPINE_CDN = "https://cdn.jsdelivr.net/npm/alpinejs@3.15.8/dist/cdn.min.js";

const THEMES = [
  {
    id: "flat",
    name: "Flat Design",
    label: "2013-2017 Flat / Material",
    summary: "Minimal 2D surfaces, bright solid color, and typography-first layouts inspired by early flat design systems.",
    semanticHint: "Prefer clean blocks, strong color sections, simple icon rows, and straightforward content hierarchy.",
    semanticCues: [
      "Use header, nav, section, article, form, and footer with minimal decoration.",
      "Great for dashboards, calculators, admin tools, educational tools, and lightweight productivity apps.",
      "Favor solid fills, crisp spacing, and no decorative chrome beyond color and type."
    ],
    schemes: [
      {
        id: "metro",
        name: "Metro Blue",
        summary: "Cool blue flat surfaces with crisp white panels.",
        gradient: "linear-gradient(135deg, rgba(228, 242, 255, 1), rgba(198, 224, 255, 1))"
      },
      {
        id: "sunrise",
        name: "Sunrise",
        summary: "Warm orange-red flat blocks with bright energy.",
        gradient: "linear-gradient(135deg, rgba(255, 240, 216, 1), rgba(255, 205, 170, 1))"
      },
      {
        id: "mint",
        name: "Mint",
        summary: "Fresh teal-green flat utility surfaces.",
        gradient: "linear-gradient(135deg, rgba(223, 251, 245, 1), rgba(181, 234, 223, 1))"
      }
    ],
    accent: "#1976d2",
    gradient: "linear-gradient(135deg, rgba(228, 242, 255, 1), rgba(198, 224, 255, 1))"
  },
  {
    id: "material2",
    name: "Material 2",
    label: "2018-2019 Flat 2.0",
    summary: "A softer evolution of flat design with subtle shadow, restrained gradients, and clearer hierarchy.",
    semanticHint: "Prefer clean dashboard surfaces, subtle elevation, quiet hero cards, and functional form layouts.",
    semanticCues: [
      "Use header, nav, section, article, form, table, and footer with practical structure.",
      "Great for CRMs, dashboards, launch tools, analytics views, and polished productivity apps.",
      "Favor light elevation, subtle gradients, and restrained color instead of hard-edged stark minimalism."
    ],
    schemes: [
      {
        id: "indigo",
        name: "Indigo",
        summary: "Classic indigo Material-style surfaces with cool hierarchy.",
        gradient: "linear-gradient(135deg, rgba(231, 240, 255, 1), rgba(215, 227, 255, 1))"
      },
      {
        id: "teal",
        name: "Teal",
        summary: "Teal and aqua Material surfaces with calmer utility energy.",
        gradient: "linear-gradient(135deg, rgba(227, 247, 248, 1), rgba(204, 235, 239, 1))"
      },
      {
        id: "berry",
        name: "Berry",
        summary: "Rose and berry Material accents with softer contrast.",
        gradient: "linear-gradient(135deg, rgba(255, 234, 243, 1), rgba(247, 213, 230, 1))"
      }
    ],
    accent: "#2962ff",
    gradient: "linear-gradient(135deg, rgba(231, 240, 255, 1), rgba(215, 227, 255, 1))"
  },
  {
    id: "neumorph",
    name: "Neumorphism",
    label: "2019-2020 Soft UI",
    summary: "Soft clay-like surfaces with pillowy depth, muted colors, and elements extruded from the background.",
    semanticHint: "Prefer oversized rounded cards, recessed inputs, soft action pills, and tactile, calm layouts.",
    semanticCues: [
      "Use nav, header, section, aside, form, dialog, and footer with minimal nesting.",
      "Great for wellness tools, focus timers, habit dashboards, premium utilities, and personal companion apps.",
      "Favor plush surfaces, roomy spacing, rounded icon rows, and tactile control groups."
    ],
    schemes: [
      {
        id: "linen",
        name: "Linen",
        summary: "Warm clay and parchment soft UI tones.",
        gradient: "linear-gradient(135deg, rgba(247, 240, 230, 0.98), rgba(235, 221, 201, 0.94))"
      },
      {
        id: "mist",
        name: "Mist",
        summary: "Cool silver-blue neumorphic surfaces.",
        gradient: "linear-gradient(135deg, rgba(236, 242, 250, 0.98), rgba(217, 226, 239, 0.94))"
      },
      {
        id: "sage",
        name: "Sage",
        summary: "Muted green soft UI panels with organic calm.",
        gradient: "linear-gradient(135deg, rgba(235, 244, 236, 0.98), rgba(210, 226, 213, 0.94))"
      }
    ],
    accent: "#6c8cff",
    gradient: "linear-gradient(135deg, rgba(236, 242, 250, 0.98), rgba(217, 226, 239, 0.94))"
  },
  {
    id: "glass",
    name: "Glassmorphism",
    label: "2020-2022 Frosted Glass",
    summary: "Transparent frosted surfaces with vivid backdrops, subtle borders, and airy floating chrome.",
    semanticHint: "Use translucent cards, layered sections, floating toolbars, and clean premium layouts.",
    semanticCues: [
      "Use header, nav, section, aside, dialog, and footer with restrained structure.",
      "Great for portfolio tools, media pickers, dashboards, premium utilities, and companion apps.",
      "Favor soft blur, transparent panels, subtle highlights, and vivid gradient backgrounds."
    ],
    schemes: [
      {
        id: "aurora",
        name: "Aurora",
        summary: "Blue-lilac frosted glass over an aurora background.",
        gradient: "linear-gradient(135deg, rgba(131, 208, 255, 0.9), rgba(234, 152, 255, 0.78))"
      },
      {
        id: "sunset",
        name: "Sunset",
        summary: "Amber-pink frosted glass with warmer glow.",
        gradient: "linear-gradient(135deg, rgba(255, 193, 136, 0.92), rgba(255, 134, 193, 0.82))"
      },
      {
        id: "lagoon",
        name: "Lagoon",
        summary: "Aqua-cyan frosted glass with oceanic light.",
        gradient: "linear-gradient(135deg, rgba(119, 234, 255, 0.9), rgba(115, 176, 255, 0.78))"
      }
    ],
    accent: "#3f73ff",
    gradient: "linear-gradient(135deg, rgba(131, 208, 255, 0.9), rgba(234, 152, 255, 0.78))"
  },
  {
    id: "brutal",
    name: "Flat 2.0",
    label: "2023-2024 Brutal / Bold",
    summary: "Bold typography, vivid flat color, sharp structure, and minimal decoration with occasional statement cards.",
    semanticHint: "Prefer strong headings, chunky buttons, color blocks, sparse surfaces, and unapologetic hierarchy.",
    semanticCues: [
      "Use section, article, table, form, nav, and footer to create clear bold blocks.",
      "Great for launch checklists, creator tools, dashboards, generators, and utilities with strong voice.",
      "Favor hard edges, loud contrast, compact rhythm, and straightforward call-to-action areas."
    ],
    schemes: [
      {
        id: "warning",
        name: "Warning",
        summary: "Yellow-orange brutal color blocks with editorial punch.",
        gradient: "linear-gradient(135deg, rgba(255, 230, 74, 0.98), rgba(255, 167, 66, 0.96))"
      },
      {
        id: "cobalt",
        name: "Cobalt",
        summary: "Electric blue brutal contrast with white surfaces.",
        gradient: "linear-gradient(135deg, rgba(115, 174, 255, 0.98), rgba(48, 108, 255, 0.96))"
      },
      {
        id: "acid",
        name: "Acid Lime",
        summary: "Acid lime and black brutal flat contrast.",
        gradient: "linear-gradient(135deg, rgba(225, 255, 98, 0.98), rgba(168, 235, 54, 0.96))"
      }
    ],
    accent: "#ff5c2b",
    gradient: "linear-gradient(135deg, rgba(255, 230, 74, 0.98), rgba(255, 167, 66, 0.96))"
  },
  {
    id: "liquid",
    name: "Liquid Glass",
    label: "2025-2026 Motion UI",
    summary: "Refined glass surfaces with richer gradients, luminous depth, and polished next-gen interface chrome.",
    semanticHint: "Use immersive hero headers, glossy panels, glowing metrics, and premium AI-adjacent interface structure.",
    semanticCues: [
      "Use header, nav, section, article, aside, dialog, and footer with premium spacing.",
      "Great for copilots, media tools, launch dashboards, futuristic planners, and polished flagship utilities.",
      "Favor glossy blur, luminous highlights, richer gradients, and more cinematic composition."
    ],
    schemes: [
      {
        id: "ultraviolet",
        name: "Ultraviolet",
        summary: "Purple-blue liquid glass with luminous depth.",
        gradient: "linear-gradient(135deg, rgba(40, 26, 88, 0.98), rgba(13, 22, 46, 0.98))"
      },
      {
        id: "cosmic",
        name: "Cosmic",
        summary: "Midnight teal liquid glass with icy highlights.",
        gradient: "linear-gradient(135deg, rgba(7, 31, 56, 0.98), rgba(5, 12, 26, 0.98))"
      },
      {
        id: "ember",
        name: "Ember",
        summary: "Dark magenta-red liquid glass with cinematic glow.",
        gradient: "linear-gradient(135deg, rgba(66, 16, 46, 0.98), rgba(12, 12, 28, 0.98))"
      }
    ],
    accent: "#8f7cff",
    gradient: "linear-gradient(135deg, rgba(40, 26, 88, 0.98), rgba(13, 22, 46, 0.98))"
  }
];

const LEGACY_THEME_ALIASES = {
  atelier: "glass",
  signal: "material2",
  grove: "neumorph",
  halo: "neumorph",
  nocturne: "liquid"
};

const HELPER_CLASSES = [
  "app-shell",
  "hero",
  "spotlight",
  "panel",
  "card-grid",
  "card",
  "stack",
  "cluster",
  "split",
  "toolbar",
  "actions",
  "pill",
  "metric",
  "frame",
  "empty-state",
  "muted",
  "divider"
];

const CONTRACT_CHECKLIST = [
  "Return exactly one fenced html code block with no extra narration.",
  `Use a single root element that includes ${APP_MARKER}, ${THEME_MARKER}, and ${SCHEME_MARKER}.`,
  "Build with Alpine directives and optional inline scripts only.",
  "Do not include custom CSS, stylesheet links, or external JS beyond Alpine.",
  "Prefer semantic HTML and the provided helper classes over custom class systems."
];

const DEFAULT_BRIEF = [
  "Build a polished single-page app for a small team retreat planner.",
  "Include a schedule board, participant notes, budget metrics, and a quick add form.",
  "Use Alpine.js for state, filtering, and lightweight interactions.",
  "Keep it responsive and make the UI feel production-ready."
].join(" ");

const MINIMAL_FRAMEWORK_CSS = `
[data-llastro-app] {
  font-family: "Avenir Next", "Trebuchet MS", sans-serif;
  padding: 1rem;
  color: #22301c;
  background: #f6f4eb;
}
[data-llastro-app] .app-shell {
  max-width: 1100px;
  margin: 0 auto;
}
[data-llastro-app] .stack {
  display: grid;
  gap: 1rem;
}
[data-llastro-app] .split,
[data-llastro-app] .card-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
[data-llastro-app] .hero,
[data-llastro-app] section,
[data-llastro-app] article,
[data-llastro-app] aside,
[data-llastro-app] .card,
[data-llastro-app] .panel,
[data-llastro-app] .spotlight {
  padding: 1rem;
  border-radius: 20px;
  border: 1px solid rgba(77, 97, 111, 0.15);
  background: rgba(255, 255, 255, 0.92);
}
[data-llastro-app] button,
[data-llastro-app] input,
[data-llastro-app] select,
[data-llastro-app] textarea {
  font: inherit;
}
[data-llastro-app] button {
  border: 0;
  border-radius: 999px;
  padding: 0.7rem 1rem;
  background: #4f7d44;
  color: #fff;
}
[data-llastro-app] input,
[data-llastro-app] select,
[data-llastro-app] textarea {
  width: 100%;
  padding: 0.7rem 0.8rem;
  border-radius: 12px;
  border: 1px solid rgba(77, 97, 111, 0.18);
}
`;

function normalizeThemeId(themeId) {
  if (!themeId) {
    return "";
  }

  const canonicalThemeId = LEGACY_THEME_ALIASES[themeId] || themeId;
  return THEMES.some((theme) => theme.id === canonicalThemeId) ? canonicalThemeId : "";
}

function themeById(themeId) {
  const canonicalThemeId = normalizeThemeId(themeId);
  return THEMES.find((theme) => theme.id === canonicalThemeId) || THEMES[0];
}

function normalizeSchemeId(themeId, schemeId) {
  const theme = themeById(themeId);
  if (!schemeId) {
    return theme.schemes[0]?.id || "";
  }

  return theme.schemes.some((scheme) => scheme.id === schemeId) ? schemeId : theme.schemes[0]?.id || "";
}

function schemeById(themeId, schemeId) {
  const theme = themeById(themeId);
  const canonicalSchemeId = normalizeSchemeId(theme.id, schemeId);
  return theme.schemes.find((scheme) => scheme.id === canonicalSchemeId) || theme.schemes[0];
}

function extractCodeBlock(raw) {
  const match = raw.match(/```(?:html)?\s*([\s\S]*?)```/i);
  return match ? match[1].trim() : raw.trim();
}

function makeId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `app-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "llastro-app";
}

function extractAppMetadata(appHtml, fallbackTheme, fallbackScheme) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<body>${appHtml}</body>`, "text/html");
  const root = doc.body.querySelector(`[${APP_MARKER}]`);
  const rawThemeId = root?.getAttribute(THEME_MARKER) || fallbackTheme;
  const themeId = themeById(rawThemeId).id;
  const rawSchemeId = root?.getAttribute(SCHEME_MARKER) || fallbackScheme;
  const schemeId = schemeById(themeId, rawSchemeId).id;
  const title = (
    root?.getAttribute("data-llastro-title") ||
    root?.querySelector("h1, h2, [data-llastro-title]")?.textContent ||
    `Untitled ${themeById(themeId).name} App`
  ).trim();
  const summary = (
    root?.getAttribute("data-llastro-summary") ||
    root?.querySelector("p, [data-llastro-summary]")?.textContent ||
    "Published from the llastro studio."
  ).trim();

  return {
    title: title.slice(0, 90),
    summary: summary.slice(0, 180),
    themeId,
    schemeId
  };
}

function buildExampleSnippet(themeId, schemeId) {
  return [
    "```html",
    `<main ${APP_MARKER} ${THEME_MARKER}="${themeId}" ${SCHEME_MARKER}="${schemeId}" class="app-shell stack" x-data="{`,
    "  view: 'board',",
    "  query: '',",
    "  showComposer: false,",
    "  draft: { title: '', owner: '', lane: 'Plan' },",
    "  tasks: [",
    "    { id: 1, title: 'Venue shortlist', owner: 'Mika', lane: 'Plan', note: '3 scenic options left' },",
    "    { id: 2, title: 'Budget guardrails', owner: 'Ari', lane: 'Fund', note: 'Keep travel under 8k' },",
    "    { id: 3, title: 'Welcome pack', owner: 'Jo', lane: 'Craft', note: 'Pair agenda with local guide' }",
    "  ],",
    "  get filtered() {",
    "    return this.tasks.filter(task => {",
    "      const laneMatch = this.view === 'board' || task.lane === this.view;",
    "      const queryMatch = `${task.title} ${task.owner} ${task.note}`.toLowerCase().includes(this.query.toLowerCase());",
    "      return laneMatch && queryMatch;",
    "    });",
    "  },",
    "  addTask() {",
    "    if (!this.draft.title || !this.draft.owner) return;",
    "    this.tasks.unshift({ id: Date.now(), ...this.draft, note: 'Added from the composer' });",
    "    this.draft = { title: '', owner: '', lane: 'Plan' };",
    "    this.showComposer = false;",
    "  }",
    "}\">",
    "  <header class=\"hero stack\">",
    "    <div class=\"cluster\">",
    "      <span class=\"pill\">Retreat Control Room</span>",
    "      <span class=\"pill\" x-text=\"tasks.length + ' workstreams'\"></span>",
    "    </div>",
    "    <div class=\"split\">",
    "      <div class=\"stack\">",
    "        <h1>Coordinate a retreat without leaving one Alpine component.</h1>",
    "        <p class=\"muted\">This example shows the exact output shape the studio expects: one semantic root, one theme, and helper classes layered on top of Alpine state.</p>",
    "      </div>",
    "      <aside class=\"spotlight stack\">",
    "        <div class=\"metric\">",
    "          <span class=\"muted\">Open tasks</span>",
    "          <strong x-text=\"tasks.length\"></strong>",
    "        </div>",
    "        <div class=\"metric\">",
    "          <span class=\"muted\">Filtered view</span>",
    "          <strong x-text=\"filtered.length\"></strong>",
    "        </div>",
    "      </aside>",
    "    </div>",
    "  </header>",
    "",
    "  <section class=\"panel stack\">",
    "    <div class=\"toolbar\">",
    "      <label>",
    "        <span>Search</span>",
    "        <input x-model=\"query\" placeholder=\"Search title, owner, or note\">",
    "      </label>",
    "      <label>",
    "        <span>Lane</span>",
    "        <select x-model=\"view\">",
    "          <option value=\"board\">All lanes</option>",
    "          <option value=\"Plan\">Plan</option>",
    "          <option value=\"Fund\">Fund</option>",
    "          <option value=\"Craft\">Craft</option>",
    "        </select>",
    "      </label>",
    "      <div class=\"actions\">",
    "        <button type=\"button\" class=\"secondary\" @click=\"showComposer = !showComposer\">",
    "          <span x-text=\"showComposer ? 'Hide composer' : 'Add task'\"></span>",
    "        </button>",
    "      </div>",
    "    </div>",
    "",
    "    <form class=\"stack\" x-show=\"showComposer\" @submit.prevent=\"addTask()\">",
    "      <div class=\"split\">",
    "        <label>",
    "          <span>Title</span>",
    "          <input x-model=\"draft.title\" placeholder=\"Confirm facilitator\">",
    "        </label>",
    "        <label>",
    "          <span>Owner</span>",
    "          <input x-model=\"draft.owner\" placeholder=\"Owner\">",
    "        </label>",
    "        <label>",
    "          <span>Lane</span>",
    "          <select x-model=\"draft.lane\">",
    "            <option value=\"Plan\">Plan</option>",
    "            <option value=\"Fund\">Fund</option>",
    "            <option value=\"Craft\">Craft</option>",
    "          </select>",
    "        </label>",
    "      </div>",
    "      <div class=\"actions\">",
    "        <button type=\"submit\">Create task</button>",
    "      </div>",
    "    </form>",
    "  </section>",
    "",
    "  <section class=\"card-grid\">",
    "    <template x-if=\"filtered.length === 0\">",
    "      <article class=\"empty-state stack\">",
    "        <h2>No tasks match this filter.</h2>",
    "        <p class=\"muted\">Try a different lane or clear the search input.</p>",
    "      </article>",
    "    </template>",
    "",
    "    <template x-for=\"task in filtered\" :key=\"task.id\">",
    "      <article class=\"card stack\">",
    "        <div class=\"cluster\">",
    "          <span class=\"pill\" x-text=\"task.lane\"></span>",
    "          <strong x-text=\"task.owner\"></strong>",
    "        </div>",
    "        <h2 x-text=\"task.title\"></h2>",
    "        <p class=\"muted\" x-text=\"task.note\"></p>",
    "      </article>",
    "    </template>",
    "  </section>",
    "</main>",
    "```"
  ].join("\n");
}

function registerStudioApp() {
  if (!window.Alpine || window.__llastroStudioRegistered) {
    return;
  }

  window.__llastroStudioRegistered = true;

  window.Alpine.data("studioApp", () => ({
    themes: THEMES,
    helperClasses: HELPER_CLASSES,
    contractChecklist: CONTRACT_CHECKLIST,
    selectedTheme: THEMES[0].id,
    selectedScheme: THEMES[0].schemes[0].id,
    appBrief: DEFAULT_BRIEF,
    rawResponse: "",
    frameworkCss: MINIMAL_FRAMEWORK_CSS,
    issues: [],
    normalizedAppHtml: "",
    importedTheme: "",
    importedScheme: "",
    importedRootSummary: "Nothing imported yet.",
    importedAppTitle: "Untitled Draft",
    currentView: "studio",
    library: [],
    activeLibraryId: "",
    isLibraryModalOpen: false,
    currentEditingId: "",
    statusMessage: "Loading framework CSS...",

    get currentTheme() {
      return themeById(this.selectedTheme);
    },

    get currentSchemes() {
      return this.currentTheme.schemes;
    },

    get currentScheme() {
      return schemeById(this.selectedTheme, this.selectedScheme);
    },

    get detectedThemeLabel() {
      return this.importedTheme
        ? `${themeById(this.importedTheme).name} · ${schemeById(this.importedTheme, this.importedScheme).name}`
        : "Theme pending";
    },

    get publishedApps() {
      return [...this.library].sort((left, right) => {
        return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
      });
    },

    get activeLibraryApp() {
      return this.library.find((app) => app.id === this.activeLibraryId) || null;
    },

    get publishButtonLabel() {
      return this.currentEditingId ? "Update Library App" : "Publish To Library";
    },

    get publishStateLabel() {
      if (this.currentEditingId) {
        return "Editing published app";
      }

      if (this.normalizedAppHtml) {
        return "Draft ready";
      }

      return "Import needed";
    },

    get promptText() {
      const themeLines = this.themes
        .map((theme) => {
          const schemes = theme.schemes.map((scheme) => `${scheme.id} (${scheme.name})`).join(", ");
          return `- ${theme.id}: ${theme.summary} ${theme.semanticHint} Schemes: ${schemes}.`;
        })
        .join("\n");
      const currentSchemeLines = this.currentSchemes
        .map((scheme) => `- ${scheme.id}: ${scheme.summary}`)
        .join("\n");

      return [
        "You are generating a production-ready Alpine.js single page app for the llastro host runtime.",
        "",
        "Return format:",
        "- Return exactly one fenced ```html code block and nothing else.",
        "- Do not return markdown prose before or after the code block.",
        "- Do not return a full HTML document unless absolutely necessary. Prefer a single fragment rooted in <main>.",
        "",
        "Runtime contract:",
        `- The first root element must include ${APP_MARKER}, ${THEME_MARKER}=\"theme-id\", and ${SCHEME_MARKER}=\"scheme-id\".`,
        "- Alpine.js is already loaded by the host, so you can use Alpine directives immediately.",
        "- You may use inline x-data for simple apps or inline <script> tags for Alpine.data registration.",
        "- Do not include <style>, <link rel=\"stylesheet\">, CSS frameworks, or external JS.",
        "- Keep everything inside one root app element.",
        "- Use semantic HTML first: header, nav, main, section, article, aside, form, fieldset, table, dialog, footer.",
        `- Use these helper classes when helpful: ${this.helperClasses.join(", ")}.`,
        "",
        "Theme catalog:",
        themeLines,
        "",
        `Theme selection rule: choose exactly one theme. Prefer ${this.currentTheme.id} unless the brief clearly points somewhere else.`,
        `Color scheme rule: for ${this.currentTheme.id}, prefer ${this.currentScheme.id}. Allowed schemes for this theme are:`,
        currentSchemeLines,
        "",
        "Interaction guidance:",
        "- Make the UI feel complete and thoughtfully structured.",
        "- Use Alpine for state, derived values, filtering, toggles, tabs, simple forms, and modal behavior.",
        "- Keep copy concise and production-like.",
        "- Design for desktop and mobile without writing custom CSS.",
        "",
        "Example root:",
        `<main ${APP_MARKER} ${THEME_MARKER}="${this.currentTheme.id}" ${SCHEME_MARKER}="${this.currentScheme.id}" class="app-shell stack">`,
        "",
        "App brief:",
        this.appBrief.trim() || DEFAULT_BRIEF
      ].join("\n");
    },

    resolveTheme(themeId) {
      return themeById(themeId);
    },

    resolveScheme(themeId, schemeId) {
      return schemeById(themeId, schemeId);
    },

    selectTheme(themeId) {
      this.selectedTheme = themeId;
      this.selectedScheme = themeById(themeId).schemes[0]?.id || "";
      this.saveState();
    },

    selectScheme(schemeId) {
      this.selectedScheme = normalizeSchemeId(this.selectedTheme, schemeId);
      this.saveState();
    },

    formatTimestamp(value) {
      if (!value) {
        return "Just now";
      }

      return new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      }).format(new Date(value));
    },

    async boot() {
      await this.loadFrameworkCss();
      this.loadLibrary();
      this.restoreState();
      window.addEventListener("hashchange", () => this.syncRouteFromHash());

      if (!this.rawResponse.trim()) {
        this.loadExample(true);
      } else {
        this.importResponse(true);
      }

      this.syncRouteFromHash();
    },

    syncRouteFromHash() {
      const hash = window.location.hash.replace(/^#/, "");

      if (!hash || hash === "studio") {
        this.currentView = "studio";
        this.closeLibraryModal();
        return;
      }

      if (hash === "library") {
        this.currentView = "library";
        this.activeLibraryId = this.activeLibraryId || this.publishedApps[0]?.id || "";
        this.renderActiveLibraryPreview();
        return;
      }

      if (hash.startsWith("library/")) {
        const appId = decodeURIComponent(hash.slice("library/".length));
        this.currentView = "library";
        this.activeLibraryId = this.library.some((app) => app.id === appId) ? appId : this.publishedApps[0]?.id || "";
        this.renderActiveLibraryPreview();
        return;
      }

      this.currentView = "studio";
    },

    setRouteHash(hash) {
      if (window.location.hash === hash) {
        this.syncRouteFromHash();
        return;
      }

      window.location.hash = hash;
    },

    goToStudio() {
      this.setRouteHash("#studio");
    },

    goToLibrary(appId = this.activeLibraryId || this.publishedApps[0]?.id || "") {
      this.setRouteHash(appId ? `#library/${encodeURIComponent(appId)}` : "#library");
    },

    openLibraryApp(appId) {
      this.activeLibraryId = appId;
      this.goToLibrary(appId);
      this.isLibraryModalOpen = true;
      document.body.style.overflow = "hidden";
      this.renderActiveLibraryPreview();
    },

    closeLibraryModal() {
      this.isLibraryModalOpen = false;
      document.body.style.overflow = "";
    },

    editLibraryApp(appId) {
      const app = this.library.find((entry) => entry.id === appId);
      if (!app) {
        return;
      }

      this.selectedTheme = app.themeId;
      this.selectedScheme = normalizeSchemeId(app.themeId, app.schemeId);
      this.rawResponse = app.source;
      this.currentEditingId = app.id;
      this.importResponse(true);
      this.goToStudio();
      this.closeLibraryModal();
      this.statusMessage = `Editing "${app.title}".`;
    },

    async loadFrameworkCss() {
      try {
        const response = await fetch("./framework.css", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`framework.css responded with ${response.status}`);
        }

        this.frameworkCss = await response.text();
        this.statusMessage = "Framework loaded.";
      } catch (error) {
        console.error(error);
        this.frameworkCss = MINIMAL_FRAMEWORK_CSS;
        this.statusMessage = "Framework fallback loaded.";
      }
    },

    resetPrompt() {
      this.appBrief = DEFAULT_BRIEF;
      this.saveState();
      this.statusMessage = "Prompt brief reset.";
    },

    clearResponse() {
      this.rawResponse = "";
      this.issues = [];
      this.normalizedAppHtml = "";
      this.importedTheme = "";
      this.importedScheme = "";
      this.importedAppTitle = "Untitled Draft";
      this.importedRootSummary = "Nothing imported yet.";
      this.currentEditingId = "";
      this.renderPreview(this.buildPreviewDocument(this.wrapWithRoot(""), "llastro draft"));
      this.statusMessage = "Draft cleared.";
      this.saveState();
    },

    loadExample(silent = false) {
      this.currentEditingId = "";
      this.rawResponse = buildExampleSnippet(this.selectedTheme, this.selectedScheme);
      this.importResponse(silent);
    },

    importResponse(silent = false) {
      const raw = extractCodeBlock(this.rawResponse);

      if (!raw) {
        this.issues = [{ level: "error", text: "Paste a code block or HTML fragment before importing." }];
        this.statusMessage = "Import blocked.";
        this.saveState();
        return;
      }

      const result = this.normalizeApp(raw);
      this.issues = result.issues;
      this.normalizedAppHtml = result.html;
      this.importedTheme = result.themeId;
      this.importedScheme = result.schemeId;
      this.importedAppTitle = result.meta.title;
      this.importedRootSummary = result.summary;

      const previewHtml = this.buildPreviewDocument(result.html, result.meta.title);
      this.renderPreview(previewHtml);
      this.statusMessage = silent ? "Draft loaded." : "Preview updated.";
      this.saveState();
    },

    normalizeApp(rawHtml) {
      const issues = [];
      const parser = new DOMParser();
      const looksLikeDocument = /<!doctype|<html[\s>]|<body[\s>]/i.test(rawHtml);
      const parsed = looksLikeDocument
        ? parser.parseFromString(rawHtml, "text/html")
        : parser.parseFromString(`<body>${rawHtml}</body>`, "text/html");

      if (looksLikeDocument) {
        issues.push({
          level: "info",
          text: "Full HTML document detected. The runtime kept the body content and rebuilt the standalone shell."
        });
      }

      parsed.querySelectorAll('script[src*="alpinejs"]').forEach((node) => {
        node.remove();
        issues.push({
          level: "info",
          text: "Removed a duplicate Alpine CDN script because the runtime already loads Alpine."
        });
      });

      parsed.querySelectorAll("style, link[rel='stylesheet']").forEach((node) => {
        node.remove();
        issues.push({
          level: "warning",
          text: "Removed custom CSS so the shared theme system stays in control."
        });
      });

      parsed.querySelectorAll("script[src]").forEach((node) => {
        node.remove();
        issues.push({
          level: "warning",
          text: "Removed an external script reference. Generated apps are expected to run on Alpine and inline code only."
        });
      });

      const body = parsed.body;
      let root = body.querySelector(`[${APP_MARKER}]`);

      if (!root && body.children.length === 1) {
        root = body.firstElementChild;
      }

      let themeId = normalizeThemeId(root?.getAttribute(THEME_MARKER) || "");

      if (!themeId) {
        themeId = this.selectedTheme;
        issues.push({
          level: "warning",
          text: `No valid ${THEME_MARKER} was found. Falling back to ${themeId}.`
        });
      }

      let schemeId = normalizeSchemeId(themeId, root?.getAttribute(SCHEME_MARKER) || "");

      if (root?.getAttribute(SCHEME_MARKER) !== schemeId) {
        issues.push({
          level: "warning",
          text: `No valid ${SCHEME_MARKER} was found for ${themeId}. Falling back to ${schemeId}.`
        });
      }

      let html = body.innerHTML.trim();

      if (!body.querySelector(`[${APP_MARKER}]`)) {
        issues.push({
          level: "warning",
          text: `No ${APP_MARKER} root was found. The runtime wrapped the pasted fragment automatically.`
        });
        html = this.wrapWithRoot(html, themeId, schemeId);
      } else {
        const runtimeRoot = body.querySelector(`[${APP_MARKER}]`);
        runtimeRoot.setAttribute(THEME_MARKER, themeId);
        runtimeRoot.setAttribute(SCHEME_MARKER, schemeId);
        html = body.innerHTML.trim();
      }

      if (!/x-data|x-model|x-for|x-show|x-text|@click|x-on:|x-init|Alpine\.data/.test(html)) {
        issues.push({
          level: "info",
          text: "This import looks mostly static. That is allowed, but the runtime is optimized for Alpine interactions."
        });
      }

      const meta = extractAppMetadata(html, themeId, schemeId);
      const normalizedDoc = parser.parseFromString(`<body>${html}</body>`, "text/html");
      const normalizedRoot = normalizedDoc.body.querySelector(`[${APP_MARKER}]`);
      const summary = normalizedRoot
        ? `${normalizedRoot.tagName.toLowerCase()} ${APP_MARKER} ${THEME_MARKER}="${themeId}" ${SCHEME_MARKER}="${schemeId}"`
        : `wrapped fragment with ${THEME_MARKER}="${themeId}" ${SCHEME_MARKER}="${schemeId}"`;

      return { html, issues, themeId, schemeId, summary, meta };
    },

    wrapWithRoot(innerHtml, themeId = this.selectedTheme, schemeId = this.selectedScheme) {
      const fallback = "<section class=\"empty-state stack\"><h1>Paste an app to get started.</h1><p class=\"muted\">The preview will render here once you import a response.</p></section>";
      return `<main ${APP_MARKER} ${THEME_MARKER}="${themeId}" ${SCHEME_MARKER}="${schemeId}" class="app-shell stack">${innerHtml || fallback}</main>`;
    },

    buildPreviewDocument(appHtml, title = "llastro preview") {
      return [
        "<!doctype html>",
        "<html lang=\"en\">",
        "<head>",
        "  <meta charset=\"utf-8\">",
        "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
        `  <title>${escapeHtml(title)}</title>`,
        `  <style>${this.frameworkCss}</style>`,
        `  <script defer src="${ALPINE_CDN}"><\/script>`,
        "</head>",
        `<body>${appHtml}</body>`,
        "</html>"
      ].join("\n");
    },

    renderPreview(documentHtml, refName = "previewFrame") {
      const frame = this.$refs[refName];
      if (frame) {
        frame.srcdoc = documentHtml;
      }
    },

    renderActiveLibraryPreview() {
      const app = this.activeLibraryApp;
      const documentHtml = app ? this.buildPreviewDocument(app.html, app.title) : "";
      const frame = this.$refs.libraryFrame;
      const modalFrame = this.$refs.libraryModalFrame;

      if (frame) {
        frame.srcdoc = documentHtml;
      }

      if (modalFrame) {
        modalFrame.srcdoc = documentHtml;
      }
    },

    getStandaloneDocument() {
      const appHtml = this.normalizedAppHtml || this.wrapWithRoot("");
      return this.buildPreviewDocument(appHtml, this.importedAppTitle);
    },

    buildStandaloneForLibraryApp(appId) {
      const app = this.library.find((entry) => entry.id === appId);
      return app ? this.buildPreviewDocument(app.html, app.title) : "";
    },

    async copyPrompt() {
      await this.copyText(this.promptText, "Prompt copied.");
    },

    async copyStandalone() {
      await this.copyText(this.getStandaloneDocument(), "Standalone HTML copied.");
    },

    async copyText(text, successMessage) {
      try {
        await navigator.clipboard.writeText(text);
        this.statusMessage = successMessage;
      } catch (error) {
        console.error(error);
        this.statusMessage = "Clipboard access failed in this browser.";
      }
    },

    downloadBlob(filename, contents) {
      const blob = new Blob([contents], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      URL.revokeObjectURL(url);
    },

    downloadExport() {
      const name = slugify(this.importedAppTitle || this.importedTheme || this.selectedTheme);
      this.downloadBlob(`llastro-${name}.html`, this.getStandaloneDocument());
      this.statusMessage = "Standalone HTML downloaded.";
    },

    downloadLibraryApp(appId) {
      const app = this.library.find((entry) => entry.id === appId);
      if (!app) {
        return;
      }

      this.downloadBlob(`llastro-${slugify(app.title)}.html`, this.buildStandaloneForLibraryApp(appId));
      this.statusMessage = `Downloaded "${app.title}".`;
    },

    publishCurrentApp() {
      if (!this.normalizedAppHtml) {
        this.statusMessage = "Import a draft before publishing.";
        return;
      }

      const now = new Date().toISOString();
      const meta = extractAppMetadata(
        this.normalizedAppHtml,
        this.importedTheme || this.selectedTheme,
        this.importedScheme || this.selectedScheme
      );
      const existingIndex = this.library.findIndex((app) => app.id === this.currentEditingId);
      const existingApp = existingIndex >= 0 ? this.library[existingIndex] : null;
      const entry = {
        id: existingApp?.id || makeId(),
        title: meta.title,
        summary: meta.summary,
        themeId: meta.themeId,
        schemeId: meta.schemeId,
        source: this.rawResponse.trim() || this.normalizedAppHtml,
        html: this.normalizedAppHtml,
        createdAt: existingApp?.createdAt || now,
        updatedAt: now
      };

      if (existingIndex >= 0) {
        this.library.splice(existingIndex, 1, entry);
      } else {
        this.library.unshift(entry);
      }

      this.currentEditingId = entry.id;
      this.activeLibraryId = entry.id;
      this.importedAppTitle = entry.title;
      this.saveLibrary();
      this.saveState();
      this.goToLibrary(entry.id);
      this.statusMessage = existingApp ? `Updated "${entry.title}".` : `Published "${entry.title}" to the library.`;
    },

    deleteLibraryApp(appId) {
      const app = this.library.find((entry) => entry.id === appId);
      if (!app) {
        return;
      }

      const confirmed = window.confirm(`Delete "${app.title}" from the library?`);
      if (!confirmed) {
        return;
      }

      this.library = this.library.filter((entry) => entry.id !== appId);

      if (this.currentEditingId === appId) {
        this.currentEditingId = "";
      }

      if (this.activeLibraryId === appId) {
        this.activeLibraryId = this.publishedApps[0]?.id || "";
      }

      if (!this.activeLibraryId) {
        this.closeLibraryModal();
      }

      this.saveLibrary();
      this.saveState();

      if (this.activeLibraryId) {
        this.goToLibrary(this.activeLibraryId);
      } else {
        this.goToLibrary();
      }

      this.statusMessage = `Deleted "${app.title}".`;
    },

    saveState() {
      const payload = {
        selectedTheme: this.selectedTheme,
        selectedScheme: this.selectedScheme,
        appBrief: this.appBrief,
        rawResponse: this.rawResponse,
        currentEditingId: this.currentEditingId,
        activeLibraryId: this.activeLibraryId
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    },

    restoreState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          return;
        }

        const payload = JSON.parse(raw);
        const restoredThemeId = normalizeThemeId(payload.selectedTheme);
        if (restoredThemeId) {
          this.selectedTheme = restoredThemeId;
        }
        if (typeof payload.selectedScheme === "string") {
          this.selectedScheme = normalizeSchemeId(this.selectedTheme, payload.selectedScheme);
        }
        if (typeof payload.appBrief === "string") {
          this.appBrief = payload.appBrief;
        }
        if (typeof payload.rawResponse === "string") {
          this.rawResponse = payload.rawResponse;
        }
        if (typeof payload.currentEditingId === "string") {
          this.currentEditingId = payload.currentEditingId;
        }
        if (typeof payload.activeLibraryId === "string") {
          this.activeLibraryId = payload.activeLibraryId;
        }
      } catch (error) {
        console.error(error);
        this.statusMessage = "Saved state could not be restored.";
      }
    },

    saveLibrary() {
      localStorage.setItem(LIBRARY_KEY, JSON.stringify(this.library));
    },

    loadLibrary() {
      try {
        const raw = localStorage.getItem(LIBRARY_KEY);
        if (!raw) {
          return;
        }

        const payload = JSON.parse(raw);
        if (Array.isArray(payload)) {
          this.library = payload
            .filter((entry) => {
              return entry && typeof entry.id === "string" && typeof entry.html === "string";
            })
            .map((entry) => ({
              ...entry,
              themeId: themeById(entry.themeId).id,
              schemeId: normalizeSchemeId(entry.themeId, entry.schemeId)
            }));
        }
      } catch (error) {
        console.error(error);
        this.statusMessage = "Library could not be restored.";
      }
    }
  }));
}

document.addEventListener("alpine:init", registerStudioApp);
registerStudioApp();
