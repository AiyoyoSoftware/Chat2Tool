const APP_MARKER = "data-llastro-app";
const THEME_MARKER = "data-llastro-theme";
const SCHEME_MARKER = "data-llastro-scheme";
const STORAGE_KEY = "llastro-studio-v2";
const LIBRARY_KEY = "llastro-library-v1";
const LIBRARY_API_PATH = "/api/library";
const ALPINE_RUNTIME_PATH = "./vendor/alpinejs.min.js";
const LUCIDE_RUNTIME_PATH = "./vendor/lucide.min.js";
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

const HOST_SCHEME_TOKENS = {
  flat: {
    metro: {
      pageBg: "#eef5ff",
      pageBgDeep: "#dcecff",
      panelStrong: "#edf4ff",
      panelBorder: "rgba(25, 118, 210, 0.16)",
      accent: "#1976d2",
      accentDeep: "#0e4f97",
      accentCool: "#1976d2"
    },
    sunrise: {
      pageBg: "#fff0d8",
      pageBgDeep: "#ffcdaa",
      panelStrong: "#fff3df",
      panelBorder: "rgba(220, 95, 34, 0.2)",
      accent: "#e45d2f",
      accentDeep: "#8d3519",
      accentCool: "#b85320"
    },
    mint: {
      pageBg: "#dffbf5",
      pageBgDeep: "#b5eadf",
      panelStrong: "#e9fbf6",
      panelBorder: "rgba(22, 139, 119, 0.18)",
      accent: "#168b77",
      accentDeep: "#0d584b",
      accentCool: "#168b77"
    }
  },
  material2: {
    indigo: {
      pageBg: "#eff4ff",
      pageBgDeep: "#dde8ff",
      panelStrong: "#e7efff",
      panelBorder: "rgba(41, 98, 255, 0.14)",
      accent: "#2962ff",
      accentDeep: "#1744c7",
      accentCool: "#2962ff"
    },
    teal: {
      pageBg: "#e3f7f8",
      pageBgDeep: "#ccebef",
      panelStrong: "#e8f8fa",
      panelBorder: "rgba(0, 137, 154, 0.16)",
      accent: "#00899a",
      accentDeep: "#075968",
      accentCool: "#00899a"
    },
    berry: {
      pageBg: "#ffeaf3",
      pageBgDeep: "#f7d5e6",
      panelStrong: "#fff0f7",
      panelBorder: "rgba(190, 55, 118, 0.16)",
      accent: "#be3776",
      accentDeep: "#842150",
      accentCool: "#be3776"
    }
  },
  neumorph: {
    linen: {
      pageBg: "#f7f0e6",
      pageBgDeep: "#ebddc9",
      panelStrong: "#f4e5d1",
      panelBorder: "rgba(123, 89, 54, 0.2)",
      accent: "#b35b33",
      accentDeep: "#844221",
      accentCool: "#8a694b"
    },
    mist: {
      pageBg: "#ecf2fa",
      pageBgDeep: "#d9e2ef",
      panelStrong: "#e5edf8",
      panelBorder: "rgba(87, 113, 151, 0.2)",
      accent: "#5c78a8",
      accentDeep: "#384d73",
      accentCool: "#5c78a8"
    },
    sage: {
      pageBg: "#ebf4ec",
      pageBgDeep: "#d2e2d5",
      panelStrong: "#deebdf",
      panelBorder: "rgba(79, 124, 87, 0.2)",
      accent: "#5f8f67",
      accentDeep: "#3d6344",
      accentCool: "#5f8f67"
    }
  },
  glass: {
    aurora: {
      pageBg: "#c7ddff",
      pageBgDeep: "#f0b6ff",
      panelStrong: "rgba(255, 255, 255, 0.34)",
      panelBorder: "rgba(255, 255, 255, 0.38)",
      accent: "#3f73ff",
      accentDeep: "#2953bd",
      accentCool: "#3f73ff"
    },
    sunset: {
      pageBg: "#ffd2a8",
      pageBgDeep: "#ffb2d7",
      panelStrong: "rgba(255, 255, 255, 0.36)",
      panelBorder: "rgba(255, 255, 255, 0.42)",
      accent: "#d95383",
      accentDeep: "#9c315d",
      accentCool: "#d95383"
    },
    lagoon: {
      pageBg: "#b8f5ff",
      pageBgDeep: "#b7d5ff",
      panelStrong: "rgba(255, 255, 255, 0.34)",
      panelBorder: "rgba(255, 255, 255, 0.4)",
      accent: "#178eb8",
      accentDeep: "#0f5e86",
      accentCool: "#178eb8"
    }
  },
  brutal: {
    warning: {
      pageBg: "#ffe24e",
      pageBgDeep: "#ffae42",
      panelStrong: "#fff0b8",
      panelBorder: "rgba(28, 22, 14, 0.9)",
      accent: "#ff5c2b",
      accentDeep: "#111111",
      accentCool: "#111111"
    },
    cobalt: {
      pageBg: "#73aeff",
      pageBgDeep: "#306cff",
      panelStrong: "#d9e8ff",
      panelBorder: "rgba(15, 31, 78, 0.9)",
      accent: "#103fe8",
      accentDeep: "#111111",
      accentCool: "#0d2d8f"
    },
    acid: {
      pageBg: "#e1ff62",
      pageBgDeep: "#a8eb36",
      panelStrong: "#edff9e",
      panelBorder: "rgba(19, 28, 8, 0.9)",
      accent: "#6bbf00",
      accentDeep: "#111111",
      accentCool: "#2f4f00"
    }
  },
  liquid: {
    ultraviolet: {
      pageBg: "#281a58",
      pageBgDeep: "#0d162e",
      panelStrong: "rgba(49, 58, 108, 0.82)",
      panelBorder: "rgba(183, 172, 255, 0.22)",
      accent: "#8f7cff",
      accentDeep: "#d7d0ff",
      accentCool: "#a89bff"
    },
    cosmic: {
      pageBg: "#071f38",
      pageBgDeep: "#050c1a",
      panelStrong: "rgba(25, 65, 88, 0.82)",
      panelBorder: "rgba(143, 220, 241, 0.22)",
      accent: "#4cc7e8",
      accentDeep: "#d6f8ff",
      accentCool: "#80ddf2"
    },
    ember: {
      pageBg: "#42102e",
      pageBgDeep: "#0c0c1c",
      panelStrong: "rgba(83, 28, 65, 0.82)",
      panelBorder: "rgba(255, 163, 190, 0.22)",
      accent: "#ff6b96",
      accentDeep: "#ffd5e1",
      accentCool: "#ff9ab8"
    }
  }
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

const REFERENCE_COVERAGE = [
  "header",
  "nav",
  "section",
  "article",
  "aside",
  "form",
  "fieldset",
  "table",
  "dialog",
  "footer",
  "hero",
  "spotlight",
  "panel",
  "card",
  "frame",
  "empty-state",
  "metric",
  "pill"
];

const STUDIO_STEPS = [
  {
    id: "brief",
    label: "Source",
    summary: "Choose whether this tool comes from a conversation or a custom brief."
  },
  {
    id: "theme",
    label: "Theme + Scheme",
    summary: "Choose the visual system your saved tool should use."
  },
  {
    id: "handoff",
    label: "Generate",
    summary: "Send the prompt to ChatGPT, then paste the generated tool back here."
  },
  {
    id: "preview",
    label: "Review + Save",
    summary: "Review the tool, confirm its title and tags, then save or export it."
  }
];

const PROMPT_MODES = [
  {
    id: "custom",
    eyebrow: "Write the source",
    name: "Use Custom Brief",
    summary: "Describe the workflow you want to preserve as a tool.",
    detail: "Best for turning a fresh note, checklist, or idea into an interface."
  },
  {
    id: "conversation",
    eyebrow: "Distill the chat",
    name: "Use Conversation",
    summary: "Turn the active chat into one focused reusable tool.",
    detail: "Best when the useful workflow already exists in a conversation."
  }
];

const DEFAULT_PROMPT_MODE = "conversation";

const DEFAULT_BRIEF = [
  "Turn my planning note into a reusable decision tool for a small team retreat.",
  "Include a schedule board, participant notes, budget guardrails, and a quick add form.",
  "Use Alpine.js for state, filtering, and lightweight interactions.",
  "Keep it focused enough to replace the note when I need to plan again."
].join(" ");

const MINIMAL_FRAMEWORK_CSS = `
[data-llastro-app] {
  font-family: "Avenir Next", "Trebuchet MS", sans-serif;
  padding: 1rem;
  color: #22301c;
  background: #f6f4eb;
}
[data-llastro-app][dir="rtl"] {
  direction: rtl;
  text-align: start;
}
[data-llastro-app][dir="ltr"] {
  direction: ltr;
  text-align: start;
}
[data-llastro-app] .app-shell {
  max-width: 1100px;
  margin: 0 auto;
}
[data-llastro-app] :where(*):not(:is(.stack, .split, .card-grid, .cluster, .toolbar, .actions)) > :is(.hero, .spotlight, section, article, aside, nav, form, fieldset, dialog, .panel, .card, .frame, .empty-state) + :is(.hero, .spotlight, section, article, aside, nav, form, fieldset, dialog, .panel, .card, .frame, .empty-state) {
  margin-block-start: 0.9rem;
}
[data-llastro-app] .stack > :is(.hero, .spotlight, section, article, aside, nav, form, fieldset, dialog, .panel, .card, .frame, .empty-state) + :is(.hero, .spotlight, section, article, aside, nav, form, fieldset, dialog, .panel, .card, .frame, .empty-state) {
  margin-block-start: 0.38rem;
}
[data-llastro-app] fieldset + fieldset {
  margin-block-start: 1rem;
}
[data-llastro-app] :is(.hero, .spotlight, section, article, aside, nav, form, fieldset, dialog, .panel, .card, .frame, .empty-state) > :is(section, article, aside, nav, form, fieldset, dialog, .panel, .card, .frame, .empty-state) {
  background: rgba(245, 248, 250, 0.98);
  border-color: rgba(77, 97, 111, 0.24);
}
[data-llastro-app] .stack {
  display: grid;
  gap: 1rem;
}
[data-llastro-app] .cluster > * + *,
[data-llastro-app] .toolbar > * + *,
[data-llastro-app] .actions > * + * {
  margin-block-start: 0;
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
[data-llastro-app] section {
  margin-block: 0.85rem;
}
[data-llastro-app] button,
[data-llastro-app] input,
[data-llastro-app] select,
[data-llastro-app] textarea {
  font: inherit;
}
[data-llastro-app] button {
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  border-radius: 999px;
  margin: 0;
  padding: 0.7rem 1rem;
  background: #4f7d44;
  color: #fff;
}
[data-llastro-app] button::-moz-focus-inner {
  padding: 0;
  border: 0;
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

const MINIMAL_LUCIDE_RUNTIME = "window.lucide = window.lucide || { createIcons() {} };";
const MINIMAL_ALPINE_RUNTIME = "window.Alpine = window.Alpine || { start() {} };";

const LUCIDE_BOOTSTRAP = `
(() => {
  const selector = "[data-lucide]";
  const labelClassName = "ll-inline-label";
  const lucide = window.lucide;

  if (!lucide || typeof lucide.createIcons !== "function") {
    return;
  }

  let frameId = 0;

  const normalizeIconLabels = (root) => {
    if (!root || typeof root.querySelectorAll !== "function") {
      return;
    }

    root.querySelectorAll(".lucide").forEach((icon) => {
      const parent = icon.parentElement;
      if (!parent) {
        return;
      }

      [...parent.childNodes].forEach((node) => {
        if (node.nodeType !== Node.TEXT_NODE) {
          return;
        }

        if (!node.textContent || !node.textContent.trim()) {
          return;
        }

        const label = document.createElement("span");
        label.className = labelClassName;
        label.textContent = node.textContent.trim();
        parent.replaceChild(label, node);
      });
    });
  };

  const renderIcons = () => {
    frameId = 0;
    const root = document.body;

    if (!root || !root.querySelector(selector)) {
      return;
    }

    try {
      lucide.createIcons({ root });
      normalizeIconLabels(root);
    } catch (error) {
      console.error("Lucide icon render failed.", error);
    }
  };

  const scheduleRender = () => {
    if (frameId) {
      cancelAnimationFrame(frameId);
    }

    frameId = requestAnimationFrame(renderIcons);
  };

  const hasPendingIcons = (node) => {
    return (
      node &&
      node.nodeType === Node.ELEMENT_NODE &&
      (node.matches(selector) || node.querySelector(selector))
    );
  };

  const observeDocument = () => {
    const root = document.body;

    if (!root || typeof MutationObserver !== "function") {
      scheduleRender();
      return;
    }

    const observer = new MutationObserver((records) => {
      if (records.some((record) => [...record.addedNodes].some(hasPendingIcons))) {
        scheduleRender();
      }
    });

    observer.observe(root, { childList: true, subtree: true });
    scheduleRender();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observeDocument, { once: true });
  } else {
    observeDocument();
  }

  document.addEventListener("alpine:init", scheduleRender);
  document.addEventListener("alpine:initialized", scheduleRender);
})();
`;

const PREVIEW_EDITOR_CSS = `
body.ll-preview-editor {
  position: relative;
}

.ll-editor-hover-text,
.ll-editor-selected-text,
.ll-editor-hover-container,
.ll-editor-selected-container {
  position: relative;
  transition: outline-color 140ms ease, box-shadow 140ms ease;
}

.ll-editor-hover-text {
  outline: 2px dashed rgba(41, 98, 255, 0.42);
  outline-offset: 4px;
}

.ll-editor-selected-text {
  outline: 2px solid rgba(41, 98, 255, 0.82);
  outline-offset: 4px;
  box-shadow: 0 0 0 5px rgba(41, 98, 255, 0.12);
}

.ll-editor-hover-container {
  outline: 2px dashed rgba(191, 91, 49, 0.4);
  outline-offset: 6px;
}

.ll-editor-selected-container {
  outline: 2px solid rgba(191, 91, 49, 0.78);
  outline-offset: 6px;
  box-shadow: 0 0 0 6px rgba(191, 91, 49, 0.12);
}
`;

function buildPreviewEditorRuntime() {
  return `
(() => {
  const rootSelector = "[${APP_MARKER}]";
  const containerSelector = "header, nav, section, article, aside, form, fieldset, table, dialog, footer, .hero, .spotlight, .panel, .card, .frame, .empty-state, .split, .card-grid";
  const movableEntitySelector = "li, button, a, label, input, select, textarea, .pill, .status-pill";
  const movableEntityParentSelector = "ul, ol, nav, form, fieldset, .toolbar, .actions, .cluster, .split, .card-grid";
  const textTags = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "strong", "em", "small", "label", "legend", "summary", "li", "td", "th", "blockquote", "button", "a"]);
  const prefersTouch = window.matchMedia ? window.matchMedia("(hover: none), (pointer: coarse)").matches : false;
  const state = {
    root: null,
    hoverText: null,
    hoverContainer: null,
    selected: null,
    lastPointerType: prefersTouch ? "touch" : "mouse"
  };

  const post = (type, payload = {}) => {
    window.parent.postMessage({ type, ...payload }, "*");
  };

  const isOverlayElement = (node) => {
    return Boolean(node && typeof node.closest === "function" && node.closest("[data-llastro-editor-overlay]"));
  };

  const isInsideRoot = (node) => {
    return Boolean(state.root && node && state.root.contains(node));
  };

  const getBindableExpression = (node) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE) {
      return "";
    }

    return (
      node.getAttribute("x-text") ||
      node.getAttribute("x-html") ||
      node.getAttribute(":text") ||
      node.getAttribute(":html") ||
      ""
    ).trim();
  };

  const buildInterpolatedParts = (node) => {
    const parts = [];
    for (const child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        parts.push({ type: "text", value: child.textContent || "" });
        continue;
      }

      if (child.nodeType !== Node.ELEMENT_NODE) {
        return null;
      }

      if (child.matches("br")) {
        parts.push({ type: "text", value: "\\n" });
        continue;
      }

      const expression = getBindableExpression(child);
      if (!expression) {
        return null;
      }

      parts.push({ type: "binding", expression });
    }

    return parts;
  };

  const analyzeTextTarget = (node) => {
    if (!node || !isInsideRoot(node) || isOverlayElement(node)) {
      return false;
    }

    const tagName = node.tagName ? node.tagName.toLowerCase() : "";
    if (!textTags.has(tagName) || node.matches("[data-lucide], template")) {
      return null;
    }

    const computedExpression = getBindableExpression(node);
    if (computedExpression) {
      const renderedText = node.textContent.trim();
      return {
        path: getElementPath(node),
        tagName,
        label: renderedText || ("{" + computedExpression + "}"),
        text: renderedText,
        draft: "{" + computedExpression + "}",
        mode: "computed",
        expression: computedExpression,
        helperText: "This text is computed from {" + computedExpression + "} and can't be edited directly here."
      };
    }

    const childElements = [...node.children].filter((child) => !child.matches("br"));
    if (childElements.length === 0) {
      const text = node.textContent.trim();
      if (!text) {
        return null;
      }

      return {
        path: getElementPath(node),
        tagName,
        label: text.length > 64 ? text.slice(0, 61) + "..." : text,
        text,
        draft: text,
        mode: "plain",
        helperText: "Update the selected copy."
      };
    }

    const parts = buildInterpolatedParts(node);
    if (!parts) {
      return null;
    }

    const template = parts
      .map((part) => part.type === "binding" ? ("{" + part.expression + "}") : part.value)
      .join("");
    const bindingExpressions = parts
      .filter((part) => part.type === "binding")
      .map((part) => part.expression);
    const staticText = parts
      .filter((part) => part.type === "text")
      .map((part) => part.value)
      .join("")
      .trim();
    const renderedText = node.textContent.trim();

    if (!bindingExpressions.length) {
      return null;
    }

    if (!staticText) {
      return {
        path: getElementPath(node),
        tagName,
        label: renderedText || template,
        text: renderedText,
        draft: template,
        mode: "computed",
        expression: bindingExpressions.join(" "),
        helperText: "This text is fully computed from " + bindingExpressions.map((value) => "{" + value + "}").join(", ") + " and can't be edited directly here."
      };
    }

    return {
      path: getElementPath(node),
      tagName,
      label: renderedText.length > 64 ? renderedText.slice(0, 61) + "..." : renderedText,
      text: renderedText,
      draft: template,
      mode: "interpolated",
      expressions: bindingExpressions,
      helperText: "Edit the text and reorder dynamic placeholders using {expression} syntax."
    };
  };

  const isEditableTextTarget = (node) => {
    return Boolean(analyzeTextTarget(node));
  };

  const isContainerTarget = (node) => {
    if (!node || !isInsideRoot(node) || isOverlayElement(node) || node === state.root) {
      return false;
    }

    if (!node.matches(containerSelector)) {
      return false;
    }

    const rect = node.getBoundingClientRect();
    return rect.width > 140 && rect.height > 64;
  };

  const isMovableEntityTarget = (node) => {
    if (!node || !isInsideRoot(node) || isOverlayElement(node) || node === state.root || !node.parentElement) {
      return false;
    }

    if (!node.matches(movableEntitySelector) || !node.parentElement.matches(movableEntityParentSelector)) {
      return false;
    }

    return node.parentElement.children.length > 0;
  };

  const findTextTarget = (start) => {
    let node = start;
    while (node && node !== document.body) {
      if (isEditableTextTarget(node)) {
        return node;
      }
      if (node === state.root) {
        return null;
      }
      node = node.parentElement;
    }
    return null;
  };

  const findMoveTarget = (start) => {
    let node = start;
    while (node && node !== document.body) {
      if (isMovableEntityTarget(node)) {
        return node;
      }

      if (isContainerTarget(node)) {
        return node;
      }
      if (node === state.root) {
        return null;
      }
      node = node.parentElement;
    }
    return null;
  };

  const getElementPath = (node) => {
    const segments = [];
    let current = node;
    while (current && current !== state.root) {
      const parent = current.parentElement;
      if (!parent) {
        break;
      }
      segments.unshift(Array.prototype.indexOf.call(parent.children, current));
      current = parent;
    }
    return segments.join(".");
  };

  const getElementByPath = (path) => {
    if (!state.root) {
      return null;
    }

    if (!path) {
      return state.root;
    }

    const segments = String(path)
      .split(".")
      .filter(Boolean)
      .map((value) => Number.parseInt(value, 10));

    let current = state.root;
    for (const index of segments) {
      current = current?.children?.[index] || null;
      if (!current) {
        return null;
      }
    }

    return current;
  };

  const describeMoveTarget = (node) => {
    const parentTagName = node.parentElement?.tagName?.toLowerCase() || "parent";

    if (isMovableEntityTarget(node)) {
      const text = node.textContent.trim();
      return {
        kind: "entity",
        path: getElementPath(node),
        tagName: node.tagName.toLowerCase(),
        label: text ? (node.tagName.toLowerCase() + " · " + text.slice(0, 48)) : node.tagName.toLowerCase(),
        canMoveUp: Boolean(node.previousElementSibling),
        canMoveDown: Boolean(node.nextElementSibling),
        helperText: "Reorder this item within its " + parentTagName + " parent."
      };
    }

    const classTokens = [...node.classList].filter((token) => !token.startsWith("ll-editor-"));
    const classSuffix = classTokens.length ? " ." + classTokens.slice(0, 2).join(".") : "";
    return {
      kind: "container",
      path: getElementPath(node),
      tagName: node.tagName.toLowerCase(),
      label: node.tagName.toLowerCase() + classSuffix,
      canMoveUp: Boolean(node.previousElementSibling),
      canMoveDown: Boolean(node.nextElementSibling),
      helperText: "Move this block within its current parent."
    };
  };

  const buildSelection = (textNode, moveNode) => {
    const selection = {
      text: analyzeTextTarget(textNode),
      move: (isMovableEntityTarget(moveNode) || isContainerTarget(moveNode)) ? describeMoveTarget(moveNode) : null
    };

    return selection.text || selection.move ? selection : null;
  };

  const clearVisualState = () => {
    if (!state.root) {
      return;
    }

    state.root.querySelectorAll(".ll-editor-hover-text, .ll-editor-selected-text, .ll-editor-hover-container, .ll-editor-selected-container").forEach((node) => {
      node.classList.remove("ll-editor-hover-text", "ll-editor-selected-text", "ll-editor-hover-container", "ll-editor-selected-container");
    });
  };

  const updateVisualState = () => {
    clearVisualState();

    if (state.hoverText) {
      state.hoverText.classList.add("ll-editor-hover-text");
    }

    if (state.hoverContainer) {
      state.hoverContainer.classList.add("ll-editor-hover-container");
    }

    if (state.selected?.text?.path) {
      const selectedTextNode = getElementByPath(state.selected.text.path);
      if (selectedTextNode) {
        selectedTextNode.classList.add("ll-editor-selected-text");
      }
    }

    if (state.selected?.move?.path) {
      const selectedContainerNode = getElementByPath(state.selected.move.path);
      if (selectedContainerNode) {
        selectedContainerNode.classList.add("ll-editor-selected-container");
      }
    }
  };

  const refreshOverlay = () => {
    updateVisualState();
  };

  const setHoverTargets = (textNode, containerNode) => {
    state.hoverText = textNode || null;
    state.hoverContainer = textNode ? null : containerNode || null;
    refreshOverlay();
  };

  const clearSelection = () => {
    state.selected = null;
    refreshOverlay();
    post("llastro-editor-selection", { selection: null });
  };

  const selectTargets = (textNode, containerNode) => {
    const selection = buildSelection(textNode, containerNode);
    if (!selection) {
      clearSelection();
      return;
    }

    state.selected = selection;
    refreshOverlay();
    post("llastro-editor-selection", { selection: state.selected });
  };

  const selectBestTarget = (target) => {
    const textNode = findTextTarget(target);
    if (textNode) {
      selectTargets(textNode, findMoveTarget(textNode));
      return true;
    }

    const containerNode = findMoveTarget(target);
    if (containerNode) {
      selectTargets(null, containerNode);
      return true;
    }

    return false;
  };

  const serializeHtml = () => {
    const clone = state.root.cloneNode(true);
    [clone, ...clone.querySelectorAll("*")].forEach((node) => {
      [...node.classList]
        .filter((token) => token.startsWith("ll-editor-"))
        .forEach((token) => node.classList.remove(token));
    });
    return clone.outerHTML.trim();
  };

  const emitChange = (selectedNode = null) => {
    const selection = selectedNode && state.selected
      ? buildSelection(
          state.selected.text?.path ? getElementByPath(state.selected.text.path) : null,
          state.selected.move?.path ? getElementByPath(state.selected.move.path) : null
        )
      : state.selected;

    post("llastro-editor-change", {
      html: serializeHtml(),
      selection
    });
  };

  const moveElement = (path, direction) => {
    const node = getElementByPath(path);
    if (!(isMovableEntityTarget(node) || isContainerTarget(node)) || !node.parentElement) {
      return;
    }

    const selectedTextNode = state.selected?.text?.path ? getElementByPath(state.selected.text.path) : null;

    if (direction === "up" && node.previousElementSibling) {
      node.parentElement.insertBefore(node, node.previousElementSibling);
    } else if (direction === "down" && node.nextElementSibling) {
      node.parentElement.insertBefore(node.nextElementSibling, node);
    } else {
      return;
    }

    state.selected = buildSelection(selectedTextNode, node);
    setHoverTargets(selectedTextNode, node);
    emitChange();
  };

  const applyText = (path, nextText) => {
    const node = getElementByPath(path);
    const textTarget = analyzeTextTarget(node);
    if (!textTarget || textTarget.mode === "computed") {
      return;
    }

    const containerNode = state.selected?.move?.path ? getElementByPath(state.selected.move.path) : findMoveTarget(node);
    if (textTarget.mode === "interpolated") {
      const prototypeMap = new Map();
      [...node.childNodes].forEach((child) => {
        const expression = getBindableExpression(child);
        if (expression && !prototypeMap.has(expression)) {
          prototypeMap.set(expression, child.cloneNode(true));
        }
      });

      const fragment = document.createDocumentFragment();
      const normalizedText = String(nextText).replace(/\\r\\n?/g, "\\n");
      const pattern = /\{([^{}]+)\}/g;
      let match;
      let lastIndex = 0;

      const appendText = (value) => {
        if (!value) {
          return;
        }

        const segments = value.split("\\n");
        segments.forEach((segment, index) => {
          if (segment) {
            fragment.append(document.createTextNode(segment));
          }
          if (index < segments.length - 1) {
            fragment.append(document.createElement("br"));
          }
        });
      };

      while ((match = pattern.exec(normalizedText))) {
        appendText(normalizedText.slice(lastIndex, match.index));
        const expression = match[1].trim();
        if (expression) {
          const prototype = prototypeMap.get(expression);
          const bindingNode = prototype ? prototype.cloneNode(true) : document.createElement("span");
          if (!prototype) {
            bindingNode.setAttribute("x-text", expression);
          }
          fragment.append(bindingNode);
        } else {
          appendText(match[0]);
        }
        lastIndex = match.index + match[0].length;
      }

      appendText(normalizedText.slice(lastIndex));
      node.replaceChildren(fragment);
    } else {
      node.textContent = nextText;
    }

    state.selected = buildSelection(node, containerNode);
    setHoverTargets(node, containerNode);
    emitChange();
  };

  const deleteElement = (path) => {
    const node = getElementByPath(path);
    if (!node || node === state.root || !isInsideRoot(node)) {
      return;
    }

    const fallbackTarget = node.previousElementSibling || node.nextElementSibling || node.parentElement;
    node.remove();

    const nextTextNode = fallbackTarget && fallbackTarget !== state.root ? findTextTarget(fallbackTarget) : null;
    const nextMoveNode = fallbackTarget && fallbackTarget !== state.root ? findMoveTarget(fallbackTarget) : null;

    state.selected = buildSelection(nextTextNode, nextMoveNode);
    setHoverTargets(nextTextNode, nextMoveNode);
    emitChange();
  };

  const handlePoint = (target) => {
    if (isOverlayElement(target)) {
      return;
    }

    if (!target || !isInsideRoot(target)) {
      setHoverTargets(null, null);
      return;
    }

    const textNode = findTextTarget(target);
    const containerNode = textNode ? null : findMoveTarget(target);
    setHoverTargets(textNode, containerNode);
  };

  const bindEvents = () => {
    document.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") {
        return;
      }
      state.lastPointerType = event.pointerType || "mouse";
      handlePoint(document.elementFromPoint(event.clientX, event.clientY));
    }, true);

    document.addEventListener("pointerdown", (event) => {
      state.lastPointerType = event.pointerType || state.lastPointerType || "mouse";
    }, true);

    document.addEventListener("click", (event) => {
      if (isOverlayElement(event.target)) {
        return;
      }

      if (!isInsideRoot(event.target)) {
        clearSelection();
        setHoverTargets(null, null);
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      handlePoint(event.target);
      selectBestTarget(event.target);
    }, true);

    document.addEventListener("submit", (event) => {
      if (!isInsideRoot(event.target)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    }, true);

    document.addEventListener("pointerleave", () => {
      if (state.selected || prefersTouch || state.lastPointerType === "touch") {
        return;
      }
      setHoverTargets(null, null);
    }, true);

    window.addEventListener("scroll", refreshOverlay, { passive: true });
    window.addEventListener("resize", refreshOverlay);

    window.addEventListener("message", (event) => {
      const data = event.data;
      if (!data || data.type !== "llastro-editor-command") {
        return;
      }

      if (data.command === "apply-text") {
        applyText(data.path, typeof data.text === "string" ? data.text : "");
      } else if (data.command === "move-element") {
        moveElement(data.path, data.direction);
      } else if (data.command === "delete-element") {
        deleteElement(data.path);
      } else if (data.command === "clear-selection") {
        clearSelection();
      }
    });
  };

  const init = () => {
    state.root = document.querySelector(rootSelector);
    if (!state.root) {
      return;
    }

    document.body.classList.add("ll-preview-editor");
    bindEvents();
    refreshOverlay();
    post("llastro-editor-ready");
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
`.trim();
}

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

function hostSchemeTokens(themeId, schemeId) {
  const theme = themeById(themeId);
  const scheme = schemeById(theme.id, schemeId);
  return HOST_SCHEME_TOKENS[theme.id]?.[scheme.id] || HOST_SCHEME_TOKENS[theme.id]?.[theme.schemes[0]?.id] || {
    pageBg: "#eef5ff",
    pageBgDeep: "#dcecff",
    panelStrong: "#edf4ff",
    panelBorder: "rgba(25, 118, 210, 0.16)",
    accent: theme.accent,
    accentDeep: theme.accent,
    accentCool: theme.accent
  };
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

function escapeInlineScript(value) {
  return String(value).replace(/<\/script/gi, "<\\/script");
}

function stripSourceMapComment(value) {
  return String(value).replace(/\n?\/\/# sourceMappingURL=.*$/m, "");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "llastro-app";
}

function sortLibraryEntries(entries) {
  return [...entries].sort((left, right) => {
    return new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime();
  });
}

function normalizeTag(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 28);
}

function normalizeTags(value) {
  const rawTags = Array.isArray(value) ? value : String(value || "").split(/[,#\n]/);
  const seen = new Set();
  const tags = [];

  rawTags.forEach((tag) => {
    const normalized = normalizeTag(tag);
    if (!normalized || seen.has(normalized)) {
      return;
    }

    seen.add(normalized);
    tags.push(normalized);
  });

  return tags.slice(0, 8);
}

function textFromHtml(html) {
  const value = String(html || "");
  if (typeof DOMParser === "undefined") {
    return value.replace(/<[^>]+>/g, " ");
  }

  const doc = new DOMParser().parseFromString(`<body>${value}</body>`, "text/html");
  return doc.body.textContent || value.replace(/<[^>]+>/g, " ");
}

function buildLibrarySearchCorpus(app) {
  return [
    app.title,
    app.summary,
    app.tags?.join(" "),
    themeById(app.themeId).name,
    schemeById(app.themeId, app.schemeId).name,
    textFromHtml(app.html || ""),
    textFromHtml(app.source || "")
  ].join(" ").toLowerCase();
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
    `Untitled ${themeById(themeId).name} Tool`
  ).trim();
  const summary = (
    root?.getAttribute("data-llastro-summary") ||
    root?.querySelector("p, [data-llastro-summary]")?.textContent ||
    "Saved from Chat2Tool."
  ).trim();
  const tags = normalizeTags(root?.getAttribute("data-llastro-tags") || "");

  return {
    title: title.slice(0, 90),
    summary: summary.slice(0, 180),
    tags,
    themeId,
    schemeId
  };
}

function buildExampleSnippet(themeId, schemeId) {
  return [
    "```html",
    `<main ${APP_MARKER} ${THEME_MARKER}="${themeId}" ${SCHEME_MARKER}="${schemeId}" data-llastro-title="Retreat Control Room" data-llastro-summary="A reusable planning board for coordinating retreat decisions, owners, and workstreams." data-llastro-tags="planner, tracker, team" class="app-shell stack" x-data="{`,
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
    "      <span class=\"pill cluster\"><i data-lucide=\"calendar-range\" aria-hidden=\"true\"></i><span>Retreat Control Room</span></span>",
    "      <span class=\"pill cluster\"><i data-lucide=\"kanban\" aria-hidden=\"true\"></i><span x-text=\"tasks.length + ' workstreams'\"></span></span>",
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
    "        <button type=\"button\" class=\"secondary cluster\" @click=\"showComposer = !showComposer\">",
    "          <i data-lucide=\"plus\" aria-hidden=\"true\"></i>",
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

function buildReferenceFixture(themeId, schemeId) {
  const theme = themeById(themeId);
  const scheme = schemeById(themeId, schemeId);

  return [
    `<main ${APP_MARKER} ${THEME_MARKER}="${theme.id}" ${SCHEME_MARKER}="${scheme.id}" class="app-shell stack" x-data="{}" data-llastro-title="${theme.name} ${scheme.name} reference">`,
    "  <header class=\"hero stack\">",
    "    <div class=\"cluster\">",
    `      <span class="pill">${theme.name}</span>`,
    `      <span class="pill">${scheme.name}</span>`,
    "      <span class=\"pill\">Semantic run</span>",
    "    </div>",
    "    <div class=\"split\">",
    "      <div class=\"stack\">",
    `        <h1>${theme.name} in ${scheme.name}</h1>`,
    "        <p class=\"muted\">Reference coverage for shared surfaces, semantic containers, interactive controls, tables, progress bars, and supporting utility classes.</p>",
    "      </div>",
    "      <aside class=\"spotlight stack\">",
    "        <div class=\"metric\">",
    "          <span class=\"muted\">Accent surfaces</span>",
    "          <strong>Live</strong>",
    "        </div>",
    "        <div class=\"metric\">",
    "          <span class=\"muted\">Semantic coverage</span>",
    `          <strong>${REFERENCE_COVERAGE.length}</strong>`,
    "        </div>",
    "      </aside>",
    "    </div>",
    "  </header>",
    "",
    "  <nav class=\"panel toolbar\">",
    "    <button type=\"button\">Primary</button>",
    "    <button type=\"button\" class=\"secondary\">Secondary</button>",
    "    <button type=\"button\" class=\"ghost\">Ghost</button>",
    "    <span class=\"pill\">Navigation</span>",
    "  </nav>",
    "",
    "  <section class=\"split\">",
    "    <article class=\"card stack\">",
    "      <h2>Surface hierarchy</h2>",
    "      <p class=\"muted\">Core semantic blocks should inherit the active scheme across fill, border, type, and supporting chrome.</p>",
    "      <div class=\"card-grid\">",
    "        <article class=\"metric\">",
    "          <span class=\"muted\">Muted text</span>",
    "          <strong>Readable</strong>",
    "        </article>",
    "        <article class=\"frame stack\">",
    "          <strong>Nested frame</strong>",
    "          <p class=\"muted\">Nested containers use the same scheme-aware border and surface tokens.</p>",
    "        </article>",
    "      </div>",
    "      <hr class=\"divider\">",
    "      <blockquote>Accent lines, supportive text, and interior surfaces should stay consistent inside the selected scheme.</blockquote>",
    "    </article>",
    "    <aside class=\"frame stack\">",
    "      <h2>State helpers</h2>",
    "      <div class=\"empty-state stack\">",
    "        <strong>Empty state</strong>",
    "        <p class=\"muted\">Supportive surfaces, borders, and typography remain in family with the current palette.</p>",
    "      </div>",
    "      <details class=\"stack\" open>",
    "        <summary>Expandable detail surface</summary>",
    "        <p class=\"muted\">Details, summaries, and nested copy inherit the same theme tokens.</p>",
    "      </details>",
    "    </aside>",
    "  </section>",
    "",
    "  <form class=\"panel stack\">",
    "    <fieldset class=\"stack\">",
    "      <legend>Interactive controls</legend>",
    "      <div class=\"split\">",
    "        <label>",
    "          <span>Text input</span>",
    "          <input value=\"Scheme-aware input\">",
    "        </label>",
    "        <label>",
    "          <span>Select menu</span>",
    "          <select>",
    "            <option>Primary</option>",
    "            <option>Secondary</option>",
    "          </select>",
    "        </label>",
    "      </div>",
    "      <label>",
    "        <span>Textarea</span>",
    "        <textarea rows=\"3\">Buttons, inputs, labels, and focusable controls should all adopt the chosen scheme.</textarea>",
    "      </label>",
    "    </fieldset>",
    "    <fieldset class=\"split\">",
    "      <label>",
    "        <span>Checkbox</span>",
    "        <span class=\"cluster\"><input type=\"checkbox\" checked> <span class=\"muted\">Accent-colored</span></span>",
    "      </label>",
    "      <label>",
    "        <span>Radio</span>",
    "        <span class=\"cluster\"><input type=\"radio\" checked> <span class=\"muted\">Accent-colored</span></span>",
    "      </label>",
    "      <label>",
    "        <span>Range</span>",
    "        <input type=\"range\" value=\"62\">",
    "      </label>",
    "    </fieldset>",
    "    <div class=\"stack\">",
    "      <span class=\"muted\">Progress</span>",
    "      <progress value=\"72\" max=\"100\">72%</progress>",
    "    </div>",
    "  </form>",
    "",
    "  <section class=\"panel stack\">",
    "    <h2>Tabular content</h2>",
    "    <table>",
    "      <thead>",
    "        <tr><th>Element</th><th>Role</th><th>Status</th></tr>",
    "      </thead>",
    "      <tbody>",
    "        <tr><td>Header</td><td>Entry context</td><td>Active</td></tr>",
    "        <tr><td>Form</td><td>Interaction</td><td>Ready</td></tr>",
    "        <tr><td>Footer</td><td>Closure</td><td>Visible</td></tr>",
    "      </tbody>",
    "      <tfoot>",
    "        <tr><td colspan=\"3\">Scheme tokens should reach table head, rows, and footer treatments.</td></tr>",
    "      </tfoot>",
    "    </table>",
    "  </section>",
    "",
    "  <dialog class=\"stack\" x-init=\"$nextTick(() => $el.showModal())\">",
    "    <h2>Dialog state</h2>",
    "    <p class=\"muted\">Backdrop, body surface, and action treatments should match the active theme and scheme.</p>",
    "    <div class=\"actions\">",
    "      <button type=\"button\">Confirm</button>",
    "      <button type=\"button\" class=\"secondary\">Review</button>",
    "    </div>",
    "  </dialog>",
    "",
    "  <footer class=\"frame stack\">",
    "    <strong>Footer coverage</strong>",
    "    <p class=\"muted\">Footer containers now share the same scheme-aware surface tokens as the rest of the semantic layout.</p>",
    "  </footer>",
    "</main>"
  ].join("\n");
}

function registerStudioApp() {
  if (!window.Alpine || window.__llastroStudioRegistered) {
    return;
  }

  window.__llastroStudioRegistered = true;
  window.Alpine.data("studioApp", createStudioApp);
}

function createStudioApp() {
  return {
    themes: THEMES,
    studioSteps: STUDIO_STEPS,
    promptModes: PROMPT_MODES,
    helperClasses: HELPER_CLASSES,
    appTheme: THEMES[0].id,
    appScheme: THEMES[0].schemes[0].id,
    selectedTheme: THEMES[0].id,
    selectedScheme: THEMES[0].schemes[0].id,
    currentStudioStep: STUDIO_STEPS[0].id,
    promptMode: DEFAULT_PROMPT_MODE,
    appName: "",
    appTags: "",
    appBrief: DEFAULT_BRIEF,
    rawResponse: "",
    rawImportTimer: 0,
    frameworkCss: MINIMAL_FRAMEWORK_CSS,
    alpineRuntime: MINIMAL_ALPINE_RUNTIME,
    lucideRuntime: MINIMAL_LUCIDE_RUNTIME,
    issues: [],
    normalizedAppHtml: "",
    importedTheme: "",
    importedScheme: "",
    importedAppTitle: "Untitled Tool",
    currentView: "studio",
    library: [],
    activeLibraryId: "",
    librarySearch: "",
    activeTagFilters: [],
    isLibraryModalOpen: false,
    isLibraryHeaderExpanded: false,
    skipStudioResetOnNextEntry: false,
    currentEditingId: "",
    currentEditingSourceTitle: "",
    editorEnabled: false,
    editorSelection: null,
    editorTextDraft: "",
    editorTextTimer: 0,
    statusMessage: "Loading framework and icon runtime...",

    get currentTheme() {
      return themeById(this.selectedTheme);
    },

    get currentAppTheme() {
      return themeById(this.appTheme);
    },

    get currentAppSchemes() {
      return this.currentAppTheme.schemes;
    },

    get currentAppScheme() {
      return schemeById(this.appTheme, this.appScheme);
    },

    get currentSchemes() {
      return this.currentTheme.schemes;
    },

    get currentScheme() {
      return schemeById(this.selectedTheme, this.selectedScheme);
    },

    get editorSelectionText() {
      return this.editorSelection?.text || null;
    },

    get editorSelectionMove() {
      return this.editorSelection?.move || null;
    },

    get hasEditorSelection() {
      return Boolean(this.editorSelectionText || this.editorSelectionMove);
    },

    get editorSelectionTextIsComputed() {
      return this.editorSelectionText?.mode === "computed";
    },

    get editorSelectionTextHelper() {
      return this.editorSelectionText?.helperText || "";
    },

    get editorSelectionMoveTitle() {
      return this.editorSelectionMove?.kind === "entity" ? "Entity order" : "Layout shifting";
    },

    get editorSelectionMoveHelper() {
      return this.editorSelectionMove?.helperText || "";
    },

    get referenceCoverageLabel() {
      return REFERENCE_COVERAGE.join(", ");
    },

    get currentStudioStepIndex() {
      const stepIndex = this.studioSteps.findIndex((step) => step.id === this.currentStudioStep);
      return stepIndex >= 0 ? stepIndex : 0;
    },

    get currentStudioStepMeta() {
      return this.studioSteps[this.currentStudioStepIndex] || this.studioSteps[0];
    },

    get activePromptMode() {
      return this.promptModes.find((mode) => mode.id === this.promptMode) || this.promptModes[0];
    },

    get isFirstStudioStep() {
      return this.currentStudioStepIndex === 0;
    },

    get isLastStudioStep() {
      return this.currentStudioStepIndex === this.studioSteps.length - 1;
    },

    get nextStudioStepMeta() {
      return this.studioSteps[this.currentStudioStepIndex + 1] || null;
    },

    get previousStudioStepMeta() {
      return this.studioSteps[this.currentStudioStepIndex - 1] || null;
    },

    get detectedThemeLabel() {
      return this.importedTheme
        ? `${themeById(this.importedTheme).name} · ${schemeById(this.importedTheme, this.importedScheme).name}`
        : "Theme pending";
    },

    get publishedApps() {
      return sortLibraryEntries(this.library);
    },

    get availableLibraryTags() {
      const tagSet = new Set();
      this.publishedApps.forEach((app) => {
        normalizeTags(app.tags).forEach((tag) => tagSet.add(tag));
      });
      return [...tagSet].sort((left, right) => left.localeCompare(right));
    },

    get filteredLibraryApps() {
      const queryTokens = this.librarySearch
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);
      const activeTags = normalizeTags(this.activeTagFilters);

      return this.publishedApps.filter((app) => {
        const appTags = normalizeTags(app.tags);
        const tagMatch = !activeTags.length || activeTags.every((tag) => appTags.includes(tag));
        if (!tagMatch) {
          return false;
        }

        if (!queryTokens.length) {
          return true;
        }

        const corpus = buildLibrarySearchCorpus(app);
        return queryTokens.every((token) => corpus.includes(token));
      });
    },

    get libraryStatusLabel() {
      if (!this.publishedApps.length) {
        return "No saved apps";
      }

      if (this.filteredLibraryApps.length === this.publishedApps.length) {
        return `${this.publishedApps.length} saved`;
      }

      return `${this.filteredLibraryApps.length} of ${this.publishedApps.length} shown`;
    },

    get activeLibraryApp() {
      return this.library.find((app) => app.id === this.activeLibraryId) || null;
    },

    get draftTitle() {
      return this.appName.trim() || this.importedAppTitle || "Untitled Tool";
    },

    get isSaveAsNew() {
      return Boolean(
        this.currentEditingId &&
        this.currentEditingSourceTitle &&
        this.appName.trim() &&
        this.appName.trim() !== this.currentEditingSourceTitle
      );
    },

    get publishButtonLabel() {
      if (this.isSaveAsNew) {
        return "Save As New Tool";
      }

      return this.currentEditingId ? "Update Saved Tool" : "Save To Library";
    },

    get publishStateLabel() {
      if (this.isSaveAsNew) {
        return "Saving as new tool";
      }

      if (this.currentEditingId) {
        return "Editing saved tool";
      }

      if (this.normalizedAppHtml) {
        return "Tool ready";
      }

      return "Paste a tool first";
    },

    get promptText() {
      return this.buildPromptText();
    },

    get promptFieldLabel() {
      if (this.promptMode === "conversation") {
        return "Prompt to paste into the existing ChatGPT conversation";
      }

      return "Prompt to paste into ChatGPT";
    },

    get promptFieldHint() {
      if (this.promptMode === "conversation") {
        return "Send this in the same conversation you want to turn into a reusable tool.";
      }

      return "Send this in a fresh ChatGPT prompt or a working thread for the note or workflow you want to make usable.";
    },

    buildPromptText() {
      const themeCatalogLines = this.themes
        .map((theme) => {
          const schemeLines = theme.schemes
            .map((scheme) => `  - ${scheme.id}: ${scheme.summary}`)
            .join("\n");

          return `- ${theme.id}: ${theme.summary} ${theme.semanticHint}\n  Schemes:\n${schemeLines}`;
        })
        .join("\n");
      const flatSchemeLines = themeById("flat").schemes
        .map((scheme) => `- ${scheme.id}: ${scheme.summary}`)
        .join("\n");
      const currentSchemeLines = this.currentSchemes
        .map((scheme) => `- ${scheme.id}: ${scheme.summary}`)
        .join("\n");

      const sharedRuntimeLines = [
        "Return format:",
        "- Return exactly one fenced ```html code block and nothing else.",
        "- Do not return markdown prose before or after the code block.",
        "- Do not return a full HTML document unless absolutely necessary.",
        "- Prefer a single fragment rooted in <main>.",
        "",
        "Runtime contract:",
        `- The first root element must include ${APP_MARKER}, ${THEME_MARKER}=\"theme-id\", and ${SCHEME_MARKER}=\"scheme-id\".`,
        "- Alpine.js and Lucide are already loaded by the host, so use Alpine directives and Lucide placeholders directly.",
        "- You may use inline x-data for simple apps or inline <script> tags for Alpine.data registration.",
        "- Do not include script tags for Alpine.js or Lucide.",
        "- Do not include <style>, <link rel=\"stylesheet\">, CSS frameworks, or external JS.",
        "- Do not rely on any assets, fonts, APIs, or network requests.",
        "- Keep everything inside one root app element.",
        "- Keep implementation self-contained and host-safe.",
        "- Add data-llastro-title=\"Tool Name\" to the root with a concise title for the saved tool.",
        "- Add data-llastro-summary=\"One sentence summary\" to the root with a clear library summary.",
        "- Add data-llastro-tags=\"tag-one, tag-two\" to the root with 2-5 concise tags that describe the tool type or subject.",
        "- For Arabic, Hebrew, Persian, Urdu, or any explicit right-to-left request, add dir=\"rtl\" and a matching lang attribute such as lang=\"ar\" to the root element.",
        "- For left-to-right languages, omit dir or use dir=\"ltr\" only when the source explicitly needs it.",
        "- Use semantic order and logical layout; do not fake RTL by reversing text manually.",
        "- When an icon helps, use Lucide placeholders such as <i data-lucide=\"calendar\" aria-hidden=\"true\"></i>.",
        "- Prefer Lucide over emoji or custom inline SVG for interface icons, and keep text labels visible for important actions.",
        "",
        "Semantic structure:",
        "- Use semantic HTML first: header, nav, main, section, article, aside, form, fieldset, table, dialog, footer.",
        `- Use these helper classes when helpful: ${this.helperClasses.join(", ")}.`,
        "- Prefer structure and hierarchy over ornamental wrappers.",
        "",
        "Quality bar:",
        "- Focused, complete, and useful enough to replace a passive note.",
        "- No dead buttons.",
        "- No filler text, placeholders, fake features, or commentary.",
        "- No \"coming soon\" elements.",
        "- No fake notifications, fake users, fake activity feeds, or vanity metrics unless explicitly requested and central to the tool.",
        "- Make concrete implementation choices and implement them cleanly.",
        "",
        "State design guidance:",
        "- Model the tool state clearly.",
        "- Keep mutable state minimal.",
        "- Compute derived output instead of duplicating state.",
        "- Keep naming clean and readable.",
        "- Prefer a single Alpine component unless the app genuinely benefits from a small registration script.",
        "- Avoid tangled event logic.",
        "",
        "Theme catalog:",
        themeCatalogLines,
        "",
        "Theme selection rule:",
        "- Choose exactly one theme.",
        `- For this run, prefer ${this.currentTheme.id} unless the requirements clearly point elsewhere.`,
        "- If the requirements are ambiguous and no stronger direction is implied, flat is the safest fallback.",
        "",
        "Color scheme rule:",
        "- Use a valid scheme for the chosen theme.",
        "- For flat, prefer metro.",
        "- Allowed flat schemes:",
        flatSchemeLines,
        `- If you choose ${this.currentTheme.id}, prefer ${this.currentScheme.id}. Allowed schemes for this theme are:`,
        currentSchemeLines,
        "",
        "Decision policy:",
        "- Start from the core user task or workflow hidden in the source material.",
        "- Choose the smallest complete feature set that makes the tool genuinely useful.",
        "- Cut anything that does not improve the primary workflow.",
        "- Favor clarity, responsiveness, and real interaction over breadth.",
        "- When in doubt, simplify.",
        "",
        "Example root:",
        `<main ${APP_MARKER} ${THEME_MARKER}="${this.currentTheme.id}" ${SCHEME_MARKER}="${this.currentScheme.id}" data-llastro-title="Retreat Decision Tool" data-llastro-summary="A reusable planner for turning retreat notes into decisions, tasks, and budget guardrails." data-llastro-tags="planner, decisions, team" class="app-shell stack">`
      ];

      if (this.promptMode === "conversation") {
        return [
          "You are generating a focused Alpine.js single page tool for the llastro host runtime.",
          "",
          "Use the current conversation as the only source of requirements.",
          "Infer the saved tool title, library summary, and tags from that conversation; the user will be able to adjust them after import.",
          "",
          "Build the tool that a smart human would save after reading this conversation and deciding what future workflow is worth preserving.",
          "",
          "Before generating the tool, internally determine:",
          "1. the primary user problem in the conversation,",
          "2. the smallest useful tool that solves it or makes it repeatable,",
          "3. the minimal feature set required for that tool to replace rereading the conversation.",
          "",
          "Then implement that tool directly.",
          "",
          "Prioritization rules:",
          "- Prefer the main problem over side topics.",
          "- Prefer explicit asks over inferred wishes.",
          "- Prefer repeated themes over one-off mentions.",
          "- Prefer a narrow useful tool over a broad feature-rich interface.",
          "- Prefer saving a complete small tool over an ambitious incomplete one.",
          "",
          "Conversation distillation rules:",
          "- Extract concrete tasks, constraints, vocabulary, and preferences from the chat.",
          "- Ignore filler, side chatter, and abandoned directions unless they reinforce the final intent.",
          "- Do not include features unless they are directly requested, strongly implied by repeated discussion, or necessary for usability.",
          "- Reuse the language and framing of the conversation where it improves fit.",
          "",
          "Scope rules:",
          "- Build one tool, not a suite.",
          "- Keep the scope tight, coherent, and immediately usable.",
          "- Avoid backend assumptions unless clearly required by the conversation.",
          "- Prefer local state and lightweight interactions.",
          "- Make the result feel specific to this conversation, not like a generic starter template.",
          "",
          ...sharedRuntimeLines
        ].join("\n");
      }

      return [
        "You are generating a focused Alpine.js single page tool for the llastro host runtime.",
        "",
        "Use the tool brief below as the source of requirements.",
        "Infer the saved tool title, library summary, and tags from the brief; the user will be able to adjust them after import.",
        "",
        "Your job is to produce a compact, self-contained, directly usable utility. The result should feel like a saved executable artifact derived from a note or conversation: focused, practical, and worth revisiting.",
        "",
        "The result must be a small tool:",
        "- Solve one clear job well.",
        "- Prefer one strong workflow over many shallow features.",
        "- Keep scope tight.",
        "- Make the main interaction obvious within a few seconds.",
        "- Favor compact usefulness over impressive-looking complexity.",
        "",
        "Do not generate:",
        "- marketing pages",
        "- startup landing pages",
        "- generic admin dashboards",
        "- fake SaaS shells",
        "- auth flows",
        "- billing",
        "- team management",
        "- notification centers",
        "- empty analytics",
        "- placeholder-heavy UI",
        "- decorative sections without function",
        "",
        "Core product rules:",
        "- Build one polished tool, not a broad platform.",
        "- Prefer 1-3 meaningful sections.",
        "- Every section must support the core task.",
        "- Every control must do something real.",
        "- Use sensible starter content only when it improves usability.",
        "- Avoid filler copy and fake data overload.",
        "- Keep labels, headings, and actions concise and concrete.",
        "",
        "Interaction rules:",
        "- Use Alpine.js for real state and behavior.",
        "- Prefer visible cause-and-effect.",
        "- Include a clear primary interaction loop.",
        "- Use derived values when useful.",
        "- Support lightweight interactions such as filtering, toggles, tabs, editable lists, calculators, generators, planners, or selectors.",
        "- Avoid overengineering state.",
        "- Do not simulate backend features.",
        "- Do not pretend data is persisted unless the brief explicitly asks for localStorage and it is clearly appropriate.",
        "",
        "Usability rules:",
        "- The tool must be directly understandable and immediately usable.",
        "- Important actions should be visible without hunting.",
        "- The layout should work well on both mobile and desktop using structure alone, without custom CSS.",
        "- Prefer a strong main panel with a few supporting surfaces over sprawling grids.",
        "- When the brief is ambiguous, choose the simplest complete interpretation.",
        "",
        "Tool heuristics:",
        "- Good tool types include generators, planners, calculators, builders, checklists, trackers, explorers, editors, and decision helpers.",
        "- Prefer one main object of interaction.",
        "- Prefer interfaces where the user changes inputs and immediately sees useful output.",
        "- Prefer operational tools over presentation surfaces.",
        "",
        ...sharedRuntimeLines,
        "",
        "Tool brief:",
        this.appBrief.trim() || DEFAULT_BRIEF
      ].join("\n");
    },

    resolveTheme(themeId) {
      return themeById(themeId);
    },

    resolveScheme(themeId, schemeId) {
      return schemeById(themeId, schemeId);
    },

    resolveHostSchemeAccent(themeId, schemeId) {
      return hostSchemeTokens(themeId, schemeId).accent;
    },

    selectAppTheme(themeId) {
      const nextThemeId = themeById(themeId).id;
      this.appTheme = nextThemeId;
      this.appScheme = themeById(nextThemeId).schemes[0]?.id || "";
      this.applyAppTheme();
      this.saveState();
      this.statusMessage = `Studio theme set to ${this.currentAppTheme.name} · ${this.currentAppScheme.name}.`;
    },

    selectAppScheme(schemeId) {
      this.appScheme = normalizeSchemeId(this.appTheme, schemeId);
      this.applyAppTheme();
      this.saveState();
      this.statusMessage = `Studio scheme set to ${this.currentAppScheme.name}.`;
    },

    applyAppTheme() {
      const theme = themeById(this.appTheme);
      const scheme = schemeById(theme.id, this.appScheme);
      const tokens = hostSchemeTokens(theme.id, scheme.id);
      this.appTheme = theme.id;
      this.appScheme = scheme.id;

      const root = document.documentElement;
      root.dataset.appTheme = theme.id;
      root.dataset.appScheme = scheme.id;
      root.style.setProperty("--app-scheme-gradient", scheme.gradient);
      root.style.setProperty("--app-theme-accent", tokens.accent);
      root.style.setProperty("--page-bg", tokens.pageBg);
      root.style.setProperty("--page-bg-deep", tokens.pageBgDeep);
      root.style.setProperty("--panel-bg-strong", tokens.panelStrong);
      root.style.setProperty("--panel-border", tokens.panelBorder);
      root.style.setProperty("--accent-deep", tokens.accentDeep);
      root.style.setProperty("--accent-cool", tokens.accentCool);
    },

    buildReferencePreview(themeId, schemeId) {
      const theme = themeById(themeId);
      const scheme = schemeById(themeId, schemeId);
      return this.buildPreviewDocument(
        buildReferenceFixture(theme.id, scheme.id),
        `${theme.name} ${scheme.name} reference`
      );
    },

    selectTheme(themeId) {
      this.selectedTheme = themeId;
      this.selectedScheme = themeById(themeId).schemes[0]?.id || "";
      this.applySelectedThemeToDraft();
      this.saveState();
    },

    selectPromptMode(modeId) {
      if (!this.promptModes.some((mode) => mode.id === modeId)) {
        return;
      }

      this.promptMode = modeId;
      this.statusMessage = modeId === "conversation"
        ? "Conversation-to-tool prompt ready."
        : "Custom tool prompt ready.";
      this.saveState();
    },

    selectScheme(schemeId) {
      this.selectedScheme = normalizeSchemeId(this.selectedTheme, schemeId);
      this.applySelectedThemeToDraft();
      this.saveState();
    },

    handleRawResponseInput() {
      this.saveState();

      if (this.rawImportTimer) {
        clearTimeout(this.rawImportTimer);
        this.rawImportTimer = 0;
      }

      const raw = this.rawResponse.trim();
      if (!raw || (!raw.includes("<") && !raw.includes("```"))) {
        return;
      }

      this.rawImportTimer = window.setTimeout(() => {
        this.rawImportTimer = 0;
        this.importResponse(true);
      }, 280);
    },

    flushPendingResponseImport() {
      if (this.rawImportTimer) {
        clearTimeout(this.rawImportTimer);
        this.rawImportTimer = 0;
      }

      const raw = this.rawResponse.trim();
      if (!raw || (!raw.includes("<") && !raw.includes("```"))) {
        return;
      }

      this.importResponse(true);
    },

    handleAppNameInput() {
      this.applyAppTitleToDraft();
      this.saveState();
    },

    handleAppTagsInput() {
      this.applyAppTagsToDraft();
      this.saveState();
    },

    syncStudioStepViewport() {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      this.$nextTick(() => {
        window.requestAnimationFrame(() => {
          this.$refs.studioWorkspace?.scrollIntoView({ block: "start" });
        });
      });
    },

    goToStudioStep(stepId) {
      if (!this.studioSteps.some((step) => step.id === stepId)) {
        return;
      }

      if (this.currentStudioStep === "handoff" && stepId !== "handoff") {
        this.flushPendingResponseImport();
      }

      this.currentStudioStep = stepId;
      this.saveState();
      this.syncStudioStepViewport();
    },

    nextStudioStep() {
      if (this.isLastStudioStep) {
        return;
      }

      if (this.currentStudioStep === "handoff") {
        this.flushPendingResponseImport();
      }

      this.currentStudioStep = this.studioSteps[this.currentStudioStepIndex + 1].id;
      this.saveState();
      this.syncStudioStepViewport();
    },

    previousStudioStep() {
      if (this.isFirstStudioStep) {
        return;
      }

      if (this.currentStudioStep === "handoff") {
        this.flushPendingResponseImport();
      }

      this.currentStudioStep = this.studioSteps[this.currentStudioStepIndex - 1].id;
      this.saveState();
      this.syncStudioStepViewport();
    },

    isLibraryTagActive(tag) {
      return normalizeTags(this.activeTagFilters).includes(normalizeTag(tag));
    },

    toggleLibraryTag(tag) {
      const normalized = normalizeTag(tag);
      if (!normalized) {
        return;
      }

      const activeTags = normalizeTags(this.activeTagFilters);
      this.activeTagFilters = activeTags.includes(normalized)
        ? activeTags.filter((activeTag) => activeTag !== normalized)
        : [...activeTags, normalized];
      this.saveState();
    },

    clearLibraryFilters() {
      this.librarySearch = "";
      this.activeTagFilters = [];
      this.saveState();
      this.statusMessage = "Library filters cleared.";
    },

    handleLibrarySearchInput() {
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
      await this.loadAlpineRuntime();
      await this.loadLucideRuntime();
      await this.loadLibrary();
      this.restoreState();
      this.applyAppTheme();
      window.addEventListener("message", (event) => this.handlePreviewEditorMessage(event));
      window.addEventListener("hashchange", () => this.syncRouteFromLocation());
      window.addEventListener("popstate", () => this.syncRouteFromLocation());

      if (!this.rawResponse.trim()) {
        this.loadExample(true);
      } else {
        this.importResponse(true);
      }

      this.syncRouteFromLocation();
    },

    handlePreviewEditorMessage(event) {
      const previewWindow = this.$refs.previewFrame?.contentWindow;
      if (previewWindow && event.source !== previewWindow) {
        return;
      }

      const data = event.data;
      if (!data || typeof data.type !== "string" || !data.type.startsWith("llastro-editor-")) {
        return;
      }

      if (!this.editorEnabled) {
        return;
      }

      if (data.type === "llastro-editor-selection") {
        this.editorSelection = data.selection || null;
        this.editorTextDraft = data.selection?.text?.draft || "";
        return;
      }

      if (data.type === "llastro-editor-change" && typeof data.html === "string") {
        this.normalizedAppHtml = data.html.trim();
        this.rawResponse = this.normalizedAppHtml;
        const meta = extractAppMetadata(
          this.normalizedAppHtml,
          this.importedTheme || this.selectedTheme,
          this.importedScheme || this.selectedScheme
        );
        this.importedTheme = meta.themeId;
        this.importedScheme = meta.schemeId;
        this.importedAppTitle = meta.title;
        if (!this.appName.trim()) {
          this.appName = meta.title;
        }
        this.editorSelection = data.selection || this.editorSelection;
        this.editorTextDraft = this.editorSelection?.text?.draft || "";
        this.statusMessage = "Tool updated in edit mode.";
        this.saveState();
      }
    },

    resetEditorSelection() {
      if (this.editorTextTimer) {
        clearTimeout(this.editorTextTimer);
        this.editorTextTimer = 0;
      }

      this.editorSelection = null;
      this.editorTextDraft = "";
    },

    renderStudioPreview({ preserveSelection = false } = {}) {
      if (!preserveSelection) {
        this.resetEditorSelection();
      }

      const appHtml = this.normalizedAppHtml || this.wrapWithRoot("");
      this.renderPreview(
        this.buildPreviewDocument(appHtml, this.draftTitle, { editorEnabled: this.editorEnabled })
      );
    },

    toggleEditorMode() {
      this.editorEnabled = !this.editorEnabled;
      this.renderStudioPreview();
      this.statusMessage = this.editorEnabled
        ? "Preview editor enabled."
        : "Preview editor disabled.";
      this.saveState();
    },

    sendPreviewEditorCommand(command, payload = {}) {
      if (!this.editorEnabled) {
        return;
      }

      const previewWindow = this.$refs.previewFrame?.contentWindow;
      if (!previewWindow) {
        return;
      }

      previewWindow.postMessage({ type: "llastro-editor-command", command, ...payload }, "*");
    },

    scheduleEditorTextUpdate() {
      if (!this.editorSelectionText) {
        return;
      }

      if (this.editorTextTimer) {
        clearTimeout(this.editorTextTimer);
      }

      this.editorTextTimer = window.setTimeout(() => {
        this.editorTextTimer = 0;
        this.applyEditorText();
      }, 140);
    },

    applyEditorText() {
      if (!this.editorSelectionText) {
        return;
      }

      this.sendPreviewEditorCommand("apply-text", {
        path: this.editorSelectionText.path,
        text: this.editorTextDraft
      });
    },

    moveSelectedElement(direction) {
      if (!this.editorSelectionMove) {
        return;
      }

      this.sendPreviewEditorCommand("move-element", {
        path: this.editorSelectionMove.path,
        direction
      });
    },

    deleteSelectedText() {
      if (!this.editorSelectionText) {
        return;
      }

      const confirmed = window.confirm(`Delete "${this.editorSelectionText.label}"?`);
      if (!confirmed) {
        return;
      }

      this.sendPreviewEditorCommand("delete-element", {
        path: this.editorSelectionText.path
      });
    },

    deleteSelectedElement() {
      if (!this.editorSelectionMove) {
        return;
      }

      const confirmed = window.confirm(`Delete "${this.editorSelectionMove.label}"?`);
      if (!confirmed) {
        return;
      }

      this.sendPreviewEditorCommand("delete-element", {
        path: this.editorSelectionMove.path
      });
    },

    clearEditorSelection() {
      this.resetEditorSelection();
      this.sendPreviewEditorCommand("clear-selection");
    },

    syncRouteFromLocation() {
      const hash = window.location.hash.replace(/^#/, "");
      const searchParams = new URLSearchParams(window.location.search);
      const wantsFullscreen = searchParams.get("fullscreen") === "1";

      if (!hash || hash === "studio") {
        this.currentView = "studio";
        this.setLibraryModalOpen(false);
        if (this.skipStudioResetOnNextEntry) {
          this.skipStudioResetOnNextEntry = false;
        } else {
          this.resetStudioSession();
        }
        return;
      }

      if (hash === "library") {
        this.currentView = "library";
        this.activeLibraryId = this.activeLibraryId || this.publishedApps[0]?.id || "";
        this.renderActiveLibraryPreview();
        this.setLibraryModalOpen(wantsFullscreen && Boolean(this.activeLibraryId));
        return;
      }

      if (hash === "settings") {
        this.currentView = "settings";
        this.setLibraryModalOpen(false);
        return;
      }

      if (hash.startsWith("library/")) {
        const appId = decodeURIComponent(hash.slice("library/".length));
        this.currentView = "library";
        this.activeLibraryId = this.library.some((app) => app.id === appId) ? appId : this.publishedApps[0]?.id || "";
        this.renderActiveLibraryPreview();
        this.setLibraryModalOpen(wantsFullscreen && Boolean(this.activeLibraryId));
        return;
      }

      this.currentView = "studio";
      this.setLibraryModalOpen(false);
    },

    setLibraryModalOpen(isOpen) {
      this.isLibraryModalOpen = isOpen;
      this.isLibraryHeaderExpanded = false;
      document.body.style.overflow = isOpen ? "hidden" : "";
    },

    setRouteState(hash, { fullscreen = false, replace = false } = {}) {
      const nextUrl = new URL(window.location.href);
      nextUrl.hash = hash;
      if (fullscreen) {
        nextUrl.searchParams.set("fullscreen", "1");
      } else {
        nextUrl.searchParams.delete("fullscreen");
      }

      const nextLocation = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
      const currentLocation = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (nextLocation === currentLocation) {
        this.syncRouteFromLocation();
        return;
      }

      const historyMethod = replace ? "replaceState" : "pushState";
      window.history[historyMethod](null, "", nextLocation);
      this.syncRouteFromLocation();
    },

    goToStudio() {
      this.setRouteState("#studio", { fullscreen: false });
    },

    goToLibrary(appId = this.activeLibraryId || this.publishedApps[0]?.id || "", options = {}) {
      const { fullscreen = false, replace = false } = options;
      this.setRouteState(appId ? `#library/${encodeURIComponent(appId)}` : "#library", { fullscreen, replace });
    },

    goToSettings() {
      this.setRouteState("#settings", { fullscreen: false });
    },

    openLibraryApp(appId) {
      this.activeLibraryId = appId;
      this.goToLibrary(appId, { fullscreen: true });
    },

    closeLibraryModal(updateRoute = true) {
      if (updateRoute && this.currentView === "library") {
        this.goToLibrary(this.activeLibraryId, { fullscreen: false, replace: true });
        return;
      }

      this.setLibraryModalOpen(false);
    },

    editLibraryApp(appId) {
      const app = this.library.find((entry) => entry.id === appId);
      if (!app) {
        return;
      }

      this.selectedTheme = app.themeId;
      this.selectedScheme = normalizeSchemeId(app.themeId, app.schemeId);
      this.appName = app.title;
      this.appTags = normalizeTags(app.tags).join(", ");
      this.rawResponse = app.source;
      this.currentEditingId = app.id;
      this.currentEditingSourceTitle = app.title;
      this.importResponse(true);
      this.skipStudioResetOnNextEntry = true;
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

    async loadAlpineRuntime() {
      try {
        const response = await fetch(ALPINE_RUNTIME_PATH, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`alpine runtime responded with ${response.status}`);
        }

        this.alpineRuntime = stripSourceMapComment(await response.text());
        this.statusMessage = "Framework and Alpine runtime loaded.";
      } catch (error) {
        console.error(error);
        this.alpineRuntime = MINIMAL_ALPINE_RUNTIME;
        this.statusMessage = "Alpine runtime fallback loaded.";
      }
    },

    async loadLucideRuntime() {
      try {
        const response = await fetch(LUCIDE_RUNTIME_PATH, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`lucide runtime responded with ${response.status}`);
        }

        this.lucideRuntime = stripSourceMapComment(await response.text());
        this.statusMessage = "Framework and icon runtime loaded.";
      } catch (error) {
        console.error(error);
        this.lucideRuntime = MINIMAL_LUCIDE_RUNTIME;
        this.statusMessage = "Lucide runtime fallback loaded.";
      }
    },

    resetPrompt() {
      this.appBrief = DEFAULT_BRIEF;
      this.saveState();
      this.statusMessage = "Prompt brief reset.";
    },

    resetStudioSession() {
      this.selectedTheme = THEMES[0].id;
      this.selectedScheme = THEMES[0].schemes[0].id;
      this.currentStudioStep = STUDIO_STEPS[0].id;
      this.promptMode = DEFAULT_PROMPT_MODE;
      this.appName = "";
      this.appTags = "";
      this.appBrief = DEFAULT_BRIEF;
      this.rawResponse = "";
      this.issues = [];
      this.normalizedAppHtml = "";
      this.importedTheme = "";
      this.importedScheme = "";
      this.importedAppTitle = "Untitled Tool";
      this.currentEditingId = "";
      this.currentEditingSourceTitle = "";
      this.renderStudioPreview();
      this.statusMessage = "Studio ready.";
      this.saveState();
    },

    clearResponse() {
      if (this.rawImportTimer) {
        clearTimeout(this.rawImportTimer);
        this.rawImportTimer = 0;
      }

      this.rawResponse = "";
      this.issues = [];
      this.normalizedAppHtml = "";
      this.importedTheme = "";
      this.importedScheme = "";
      this.importedAppTitle = "Untitled Tool";
      this.currentEditingId = "";
      this.currentEditingSourceTitle = "";
      this.appTags = "";
      this.renderStudioPreview();
      this.statusMessage = "Tool draft cleared.";
      this.saveState();
    },

    loadExample(silent = false) {
      this.currentEditingId = "";
      this.currentEditingSourceTitle = "";
      this.rawResponse = buildExampleSnippet(this.selectedTheme, this.selectedScheme);
      this.importResponse(silent);
    },

    applyAppTitleToDraft() {
      if (!this.normalizedAppHtml) {
        return;
      }

      const parser = new DOMParser();
      const draft = parser.parseFromString(`<body>${this.normalizedAppHtml}</body>`, "text/html");
      const root = draft.body.querySelector(`[${APP_MARKER}]`);
      if (!root) {
        return;
      }

      const nextTitle = this.appName.trim();
      if (nextTitle) {
        root.setAttribute("data-llastro-title", nextTitle);
      } else {
        root.removeAttribute("data-llastro-title");
      }

      this.normalizedAppHtml = draft.body.innerHTML.trim();
      this.importedAppTitle = extractAppMetadata(
        this.normalizedAppHtml,
        this.importedTheme || this.selectedTheme,
        this.importedScheme || this.selectedScheme
      ).title;
      this.renderStudioPreview();
    },

    applyAppTagsToDraft() {
      if (!this.normalizedAppHtml) {
        return;
      }

      const parser = new DOMParser();
      const draft = parser.parseFromString(`<body>${this.normalizedAppHtml}</body>`, "text/html");
      const root = draft.body.querySelector(`[${APP_MARKER}]`);
      if (!root) {
        return;
      }

      const tags = normalizeTags(this.appTags);
      if (tags.length) {
        root.setAttribute("data-llastro-tags", tags.join(", "));
      } else {
        root.removeAttribute("data-llastro-tags");
      }

      this.normalizedAppHtml = draft.body.innerHTML.trim();
      this.renderStudioPreview();
    },

    applySelectedThemeToDraft() {
      if (!this.normalizedAppHtml) {
        return;
      }

      const parser = new DOMParser();
      const draft = parser.parseFromString(`<body>${this.normalizedAppHtml}</body>`, "text/html");
      const nextThemeId = themeById(this.selectedTheme).id;
      const nextSchemeId = schemeById(nextThemeId, this.selectedScheme).id;
      const root = draft.body.querySelector(`[${APP_MARKER}]`);

      let nextHtml = "";
      if (root) {
        root.setAttribute(THEME_MARKER, nextThemeId);
        root.setAttribute(SCHEME_MARKER, nextSchemeId);
        nextHtml = draft.body.innerHTML.trim();
      } else {
        nextHtml = this.wrapWithRoot(draft.body.innerHTML.trim(), nextThemeId, nextSchemeId);
      }

      const meta = extractAppMetadata(nextHtml, nextThemeId, nextSchemeId);
      this.normalizedAppHtml = nextHtml;
      this.rawResponse = nextHtml;
      this.importedTheme = nextThemeId;
      this.importedScheme = nextSchemeId;
      this.importedAppTitle = meta.title;
      this.applyAppTitleToDraft();
      this.applyAppTagsToDraft();
      this.statusMessage = `Tool theme updated to ${themeById(nextThemeId).name} · ${schemeById(nextThemeId, nextSchemeId).name}.`;
    },

    importResponse(silent = false) {
      const raw = extractCodeBlock(this.rawResponse);
      this.resetEditorSelection();

      if (!raw) {
        this.issues = [{ level: "error", text: "Paste a generated tool code block or HTML fragment before importing." }];
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
      if (!this.currentEditingId || !this.appName.trim()) {
        this.appName = result.meta.title;
      }
      if ((!this.currentEditingId || !this.appTags.trim()) && result.meta.tags.length) {
        this.appTags = result.meta.tags.join(", ");
      }
      this.applyAppTitleToDraft();
      this.applyAppTagsToDraft();

      this.statusMessage = silent ? "Example tool loaded." : "Tool preview updated.";
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

      parsed.querySelectorAll('script[src*="lucide"], script[src*="@lucide"]').forEach((node) => {
        node.remove();
        issues.push({
          level: "info",
          text: "Removed a duplicate Lucide script because the runtime already loads Lucide."
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
          text: "Removed an external script reference. Generated apps are expected to run on the built-in Alpine and Lucide runtime plus inline code only."
        });
      });

      const body = parsed.body;
      let root = body.querySelector(`[${APP_MARKER}]`);

      if (!root && body.children.length === 1) {
        root = body.firstElementChild;
      }

      const selectedThemeId = themeById(this.selectedTheme).id;
      const selectedSchemeId = schemeById(selectedThemeId, this.selectedScheme).id;
      const pastedThemeId = normalizeThemeId(root?.getAttribute(THEME_MARKER) || "");
      const isEditingWithThemeOverride = Boolean(this.currentEditingId);

      let themeId = pastedThemeId;

      if (isEditingWithThemeOverride) {
        themeId = selectedThemeId;
        if (pastedThemeId && pastedThemeId !== selectedThemeId) {
          issues.push({
            level: "info",
            text: `Editing mode kept the selected theme ${selectedThemeId} instead of the pasted ${THEME_MARKER} value ${pastedThemeId}.`
          });
        }
      } else if (!themeId) {
        themeId = selectedThemeId;
        issues.push({
          level: "warning",
          text: `No valid ${THEME_MARKER} was found. Falling back to ${themeId}.`
        });
      }

      let schemeId = normalizeSchemeId(themeId, root?.getAttribute(SCHEME_MARKER) || "");

      if (isEditingWithThemeOverride) {
        const pastedSchemeId = normalizeSchemeId(themeId, root?.getAttribute(SCHEME_MARKER) || "");
        schemeId = selectedSchemeId;
        if (pastedSchemeId !== selectedSchemeId) {
          issues.push({
            level: "info",
            text: `Editing mode kept the selected scheme ${selectedSchemeId} instead of the pasted ${SCHEME_MARKER} value ${pastedSchemeId}.`
          });
        }
      } else if (root?.getAttribute(SCHEME_MARKER) !== schemeId) {
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
      const fallback = "<section class=\"empty-state stack\"><h1>Paste a tool to get started.</h1><p class=\"muted\">The preview will render here once you import a response.</p></section>";
      return `<main ${APP_MARKER} ${THEME_MARKER}="${themeId}" ${SCHEME_MARKER}="${schemeId}" class="app-shell stack">${innerHtml || fallback}</main>`;
    },

    buildPreviewDocument(appHtml, title = "llastro preview", options = {}) {
      const { editorEnabled = false } = options;
      return [
        "<!doctype html>",
        "<html lang=\"en\">",
        "<head>",
        "  <meta charset=\"utf-8\">",
        "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">",
        `  <title>${escapeHtml(title)}</title>`,
        `  <style>${this.frameworkCss}</style>`,
        editorEnabled ? `  <style>${PREVIEW_EDITOR_CSS}</style>` : "",
        "</head>",
        "<body>",
        appHtml,
        `  <script>${escapeInlineScript(this.alpineRuntime || MINIMAL_ALPINE_RUNTIME)}<\/script>`,
        `  <script>${escapeInlineScript(this.lucideRuntime || MINIMAL_LUCIDE_RUNTIME)}<\/script>`,
        `  <script>${escapeInlineScript(LUCIDE_BOOTSTRAP)}<\/script>`,
        editorEnabled ? `  <script>${escapeInlineScript(buildPreviewEditorRuntime())}<\/script>` : "",
        "</body>",
        "</html>"
      ].filter(Boolean).join("\n");
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
      return this.buildPreviewDocument(appHtml, this.draftTitle);
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

    fallbackCopyText(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.setAttribute("aria-hidden", "true");
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.width = "1px";
      textarea.style.height = "1px";
      textarea.style.padding = "0";
      textarea.style.border = "0";
      textarea.style.opacity = "0";
      textarea.style.fontSize = "16px";

      document.body.appendChild(textarea);

      const selection = document.getSelection();
      const previousRange = selection && selection.rangeCount ? selection.getRangeAt(0) : null;

      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      let copied = false;

      try {
        copied = document.execCommand("copy");
      } catch (error) {
        console.error(error);
      }

      document.body.removeChild(textarea);

      if (selection) {
        selection.removeAllRanges();
        if (previousRange) {
          selection.addRange(previousRange);
        }
      }

      return copied;
    },

    async copyText(text, successMessage) {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          this.statusMessage = successMessage;
          return;
        }
      } catch (error) {
        console.error(error);
      }

      if (this.fallbackCopyText(text)) {
        this.statusMessage = successMessage;
      } else {
        this.statusMessage = "Copy failed in this browser. Press and hold to copy manually.";
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
      const name = slugify(this.draftTitle || this.importedTheme || this.selectedTheme);
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

    normalizeLibraryPayload(payload) {
      if (!Array.isArray(payload)) {
        return [];
      }

      return payload
        .filter((entry) => {
          return entry && typeof entry.id === "string" && typeof entry.html === "string";
        })
        .map((entry) => {
          const themeId = themeById(entry.themeId).id;
          const schemeId = normalizeSchemeId(themeId, entry.schemeId);
          const normalizedEntry = {
            ...entry,
            themeId,
            schemeId,
            source: typeof entry.source === "string" ? entry.source : entry.html
          };
          return {
            ...normalizedEntry,
            tags: normalizeTags(entry.tags)
          };
        });
    },

    readLegacyLibrary() {
      try {
        const raw = localStorage.getItem(LIBRARY_KEY);
        if (!raw) {
          return [];
        }

        return this.normalizeLibraryPayload(JSON.parse(raw));
      } catch (error) {
        console.error(error);
        return [];
      }
    },

    async saveLibrary(nextLibrary = this.library) {
      const response = await fetch(LIBRARY_API_PATH, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ library: nextLibrary })
      });

      if (!response.ok) {
        throw new Error(`Library save failed with ${response.status}`);
      }

      const payload = await response.json();
      const library = this.normalizeLibraryPayload(payload.library);
      this.library = library;
      return library;
    },

    async loadLibrary() {
      const legacyLibrary = this.readLegacyLibrary();

      try {
        const response = await fetch(LIBRARY_API_PATH, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Library load failed with ${response.status}`);
        }

        const payload = await response.json();
        const serverLibrary = this.normalizeLibraryPayload(payload.library);

        if (serverLibrary.length) {
          this.library = serverLibrary;
          return;
        }

        if (legacyLibrary.length) {
          await this.saveLibrary(legacyLibrary);
        }
      } catch (error) {
        console.error(error);
        if (legacyLibrary.length) {
          this.library = legacyLibrary;
          this.statusMessage = "Library API unavailable. Loaded the browser backup instead.";
          return;
        }

        this.statusMessage = "Library could not be restored.";
      }
    },

    async publishCurrentApp() {
      if (!this.normalizedAppHtml) {
        this.statusMessage = "Import a generated tool before saving.";
        return;
      }

      this.applyAppTitleToDraft();
      this.applyAppTagsToDraft();

      const now = new Date().toISOString();
      const meta = extractAppMetadata(
        this.normalizedAppHtml,
        this.importedTheme || this.selectedTheme,
        this.importedScheme || this.selectedScheme
      );
      const title = this.appName.trim() || meta.title;
      const manualTags = normalizeTags(this.appTags);
      const metadataTags = normalizeTags(meta.tags);
      const tags = manualTags.length ? manualTags : metadataTags;
      const existingIndex = this.isSaveAsNew ? -1 : this.library.findIndex((app) => app.id === this.currentEditingId);
      const existingApp = existingIndex >= 0 ? this.library[existingIndex] : null;
      const entry = {
        id: existingApp?.id || makeId(),
        title,
        summary: meta.summary,
        tags,
        themeId: meta.themeId,
        schemeId: meta.schemeId,
        source: this.rawResponse.trim() || this.normalizedAppHtml,
        html: this.normalizedAppHtml,
        createdAt: existingApp?.createdAt || now,
        updatedAt: now
      };

      const nextLibrary = [...this.library];
      if (existingIndex >= 0) {
        nextLibrary.splice(existingIndex, 1, entry);
      } else {
        nextLibrary.unshift(entry);
      }

      try {
        await this.saveLibrary(nextLibrary);
      } catch (error) {
        console.error(error);
        this.statusMessage = "Library save failed. Check that the llastro server is running.";
        return;
      }

      this.currentEditingId = entry.id;
      this.currentEditingSourceTitle = entry.title;
      this.activeLibraryId = entry.id;
      this.importedAppTitle = entry.title;
      this.appName = entry.title;
      this.appTags = entry.tags.join(", ");
      this.saveState();
      this.goToLibrary(entry.id);
      this.statusMessage = existingApp ? `Updated "${entry.title}".` : `Saved "${entry.title}" to the library.`;
    },

    async deleteLibraryApp(appId) {
      const app = this.library.find((entry) => entry.id === appId);
      if (!app) {
        return;
      }

      const confirmed = window.confirm(`Delete "${app.title}" from the library?`);
      if (!confirmed) {
        return;
      }

      const nextLibrary = this.library.filter((entry) => entry.id !== appId);
      const nextPublishedApps = sortLibraryEntries(nextLibrary);
      const nextActiveLibraryId = this.activeLibraryId === appId ? nextPublishedApps[0]?.id || "" : this.activeLibraryId;

      try {
        await this.saveLibrary(nextLibrary);
      } catch (error) {
        console.error(error);
        this.statusMessage = "Library delete failed. Check that the llastro server is running.";
        return;
      }

      if (this.currentEditingId === appId) {
        this.currentEditingId = "";
      }

      this.activeLibraryId = nextActiveLibraryId;

      if (!this.activeLibraryId) {
        this.closeLibraryModal();
      }

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
        appTheme: this.appTheme,
        appScheme: this.appScheme,
        selectedTheme: this.selectedTheme,
        selectedScheme: this.selectedScheme,
        currentStudioStep: this.currentStudioStep,
        promptMode: this.promptMode,
        appName: this.appName,
        appTags: this.appTags,
        appBrief: this.appBrief,
        rawResponse: this.rawResponse,
        currentEditingId: this.currentEditingId,
        currentEditingSourceTitle: this.currentEditingSourceTitle,
        activeLibraryId: this.activeLibraryId,
        librarySearch: this.librarySearch,
        activeTagFilters: this.activeTagFilters,
        editorEnabled: this.editorEnabled,
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
        const restoredAppThemeId = normalizeThemeId(payload.appTheme);
        if (restoredAppThemeId) {
          this.appTheme = restoredAppThemeId;
        }
        if (typeof payload.appScheme === "string") {
          this.appScheme = normalizeSchemeId(this.appTheme, payload.appScheme);
        }
        const restoredThemeId = normalizeThemeId(payload.selectedTheme);
        if (restoredThemeId) {
          this.selectedTheme = restoredThemeId;
        }
        if (typeof payload.selectedScheme === "string") {
          this.selectedScheme = normalizeSchemeId(this.selectedTheme, payload.selectedScheme);
        }
        if (typeof payload.currentStudioStep === "string" && this.studioSteps.some((step) => step.id === payload.currentStudioStep)) {
          this.currentStudioStep = payload.currentStudioStep;
        }
        if (typeof payload.promptMode === "string" && this.promptModes.some((mode) => mode.id === payload.promptMode)) {
          this.promptMode = payload.promptMode;
        }
        if (typeof payload.appName === "string") {
          this.appName = payload.appName;
        }
        if (typeof payload.appTags === "string") {
          this.appTags = payload.appTags;
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
        if (typeof payload.currentEditingSourceTitle === "string") {
          this.currentEditingSourceTitle = payload.currentEditingSourceTitle;
        }
        if (typeof payload.activeLibraryId === "string") {
          this.activeLibraryId = payload.activeLibraryId;
        }
        if (typeof payload.librarySearch === "string") {
          this.librarySearch = payload.librarySearch;
        }
        if (Array.isArray(payload.activeTagFilters)) {
          this.activeTagFilters = normalizeTags(payload.activeTagFilters);
        }
        if (typeof payload.editorEnabled === "boolean") {
          this.editorEnabled = payload.editorEnabled;
        }
      } catch (error) {
        console.error(error);
        this.statusMessage = "Saved state could not be restored.";
      }
    }
  };
}

window.studioApp = createStudioApp;
document.addEventListener("alpine:init", registerStudioApp);
registerStudioApp();
