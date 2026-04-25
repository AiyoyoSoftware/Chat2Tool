const APP_MARKER = "data-llastro-app";
const THEME_MARKER = "data-llastro-theme";
const SCHEME_MARKER = "data-llastro-scheme";
const CUSTOM_COLOR_MARKER = "data-llastro-custom-color";
const CUSTOM_SCHEME_ID = "customized";
const DEFAULT_CUSTOM_COLOR = "#5b6cff";
const STORAGE_KEY = "llastro-studio-v2";
const LIBRARY_KEY = "llastro-library-v1";
const LIBRARY_API_PATH = "/api/library";
const LIBRARY_STORAGE_AUTO = "auto";
const LIBRARY_STORAGE_API = "api";
const LIBRARY_STORAGE_LOCAL = "local";
const SHARED_IMPORT_ROUTE = "/i";
const SHARED_IMPORT_REDIRECT_PARAM = "llastro-route";
const SHARE_COMPRESSION_FORMAT = "deflate";
const ASSET_STAMP = typeof window !== "undefined" ? String(window.__LLASTRO_ASSET_STAMP || "") : "";
const ALPINE_RUNTIME_PATH = "./vendor/alpinejs.min.js";
const LUCIDE_RUNTIME_PATH = "./vendor/lucide.min.js";
const DEFAULT_DROPBOX_APP_KEY = "9l31khas4nnxofu";
const DROPBOX_AUTHORIZE_URL = "https://www.dropbox.com/oauth2/authorize";
const DROPBOX_TOKEN_URL = "https://api.dropbox.com/oauth2/token";
const DROPBOX_CONTENT_API_BASE = "https://content.dropboxapi.com/2";
const DROPBOX_SCOPES = ["files.content.read", "files.content.write"];
const DROPBOX_BACKUP_PATH = "/chat2tool-library-backup.json";
const DROPBOX_SESSION_KEY = "llastro-dropbox-session-v1";
const DROPBOX_PKCE_KEY = "llastro-dropbox-pkce-v1";
const OFFICIAL_HOSTED_APP_URL = "https://aiyoyosoftware.github.io/Chat2Tool/";
const THEMES = [
  {
    id: "flat",
    name: "Flat Design",
    label: "2013-2017 Flat / Material",
    summary: "Minimal 2D surfaces, bright solid color, and typography-first layouts inspired by early flat design systems.",
    semanticHint: "Prefer clean blocks, strong color sections, simple icon rows, and straightforward content hierarchy.",
    semanticCues: [
      "Use header, nav, section, article, form, and footer with minimal decoration.",
      "Great for dashboards, calculators, admin tools, educational tools, and lightweight productivity tools.",
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
      "Great for CRMs, dashboards, launch tools, analytics views, and polished productivity tools.",
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
      "Great for wellness tools, focus timers, habit dashboards, premium utilities, and personal companion tools.",
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
      "Great for portfolio tools, media pickers, dashboards, premium utilities, and companion tools.",
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

const CUSTOM_SCHEME_THEORY = {
  flat: "Analogous tints and crisp contrast derived from one accent.",
  material2: "A balanced analogous palette with softer supporting tones.",
  neumorph: "A softened monochrome palette with gentle tonal lift.",
  glass: "Split-complementary backdrops with a frosted accent core.",
  brutal: "Complementary contrast with loud blocks and hard edges.",
  liquid: "Triadic glow on a dark cinematic surface."
};

THEMES.forEach((theme) => {
  if (theme.schemes.some((scheme) => scheme.id === CUSTOM_SCHEME_ID)) {
    return;
  }

  theme.schemes = [
    ...theme.schemes,
    {
      id: CUSTOM_SCHEME_ID,
      name: "Customized",
      summary: CUSTOM_SCHEME_THEORY[theme.id] || "Theme-aware palette generated from one chosen color.",
      gradient: "linear-gradient(135deg, rgba(229, 235, 255, 1), rgba(205, 217, 255, 1))"
    }
  ];
});

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

const CUSTOM_THEME_STYLE_PROPERTIES = [
  "--ll-color-scheme",
  "--ll-app-bg",
  "--ll-page-bg",
  "--ll-page-bg-deep",
  "--ll-surface",
  "--ll-surface-strong",
  "--ll-surface-muted",
  "--ll-surface-ghost",
  "--ll-border",
  "--ll-border-strong",
  "--ll-text",
  "--ll-muted",
  "--ll-accent",
  "--ll-accent-strong",
  "--ll-accent-soft",
  "--ll-shadow",
  "--ll-shadow-strong",
  "--ll-input-bg",
  "--ll-button-fill",
  "--ll-button-ink",
  "--ll-hero-fill",
  "--ll-spotlight-fill",
  "--ll-secondary-fill",
  "--ll-secondary-border",
  "--ll-table-head-fill",
  "--ll-table-foot-fill",
  "--ll-metric-fill",
  "--ll-progress-track",
  "--ll-progress-fill",
  "--ll-overlay-border",
  "--ll-dialog-backdrop"
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeHexColor(value, fallback = "") {
  const match = String(value || "").trim().match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!match) {
    return fallback;
  }

  const normalized = match[1].length === 3
    ? match[1].split("").map((char) => `${char}${char}`).join("")
    : match[1];

  return `#${normalized.toLowerCase()}`;
}

function hexToRgb(value) {
  const hex = normalizeHexColor(value, DEFAULT_CUSTOM_COLOR).slice(1);
  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16)
  };
}

function rgbToHex(red, green, blue) {
  return `#${[red, green, blue].map((value) => Math.round(clamp(value, 0, 255)).toString(16).padStart(2, "0")).join("")}`;
}

function rgbaFromHex(value, alpha) {
  const { r, g, b } = hexToRgb(value);
  const normalizedAlpha = clamp(alpha, 0, 1);
  return `rgba(${r}, ${g}, ${b}, ${Number(normalizedAlpha.toFixed(3)).toString()})`;
}

function shiftHue(hue, amount) {
  return (hue + amount + 360) % 360;
}

function hexToHsl(value) {
  const { r, g, b } = hexToRgb(value);
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: lightness * 100 };
  }

  const delta = max - min;
  const saturation = lightness > 0.5
    ? delta / (2 - max - min)
    : delta / (max + min);

  let hue = 0;
  if (max === red) {
    hue = ((green - blue) / delta + (green < blue ? 6 : 0)) * 60;
  } else if (max === green) {
    hue = ((blue - red) / delta + 2) * 60;
  } else {
    hue = ((red - green) / delta + 4) * 60;
  }

  return {
    h: hue,
    s: saturation * 100,
    l: lightness * 100
  };
}

function hslToHex(hue, saturation, lightness) {
  const normalizedHue = ((hue % 360) + 360) % 360;
  const s = clamp(saturation, 0, 100) / 100;
  const l = clamp(lightness, 0, 100) / 100;

  if (s === 0) {
    const channel = Math.round(l * 255);
    return rgbToHex(channel, channel, channel);
  }

  const chroma = (1 - Math.abs((2 * l) - 1)) * s;
  const huePrime = normalizedHue / 60;
  const second = chroma * (1 - Math.abs((huePrime % 2) - 1));
  const match = l - (chroma / 2);

  let red = 0;
  let green = 0;
  let blue = 0;

  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = second;
  } else if (huePrime < 2) {
    red = second;
    green = chroma;
  } else if (huePrime < 3) {
    green = chroma;
    blue = second;
  } else if (huePrime < 4) {
    green = second;
    blue = chroma;
  } else if (huePrime < 5) {
    red = second;
    blue = chroma;
  } else {
    red = chroma;
    blue = second;
  }

  return rgbToHex(
    (red + match) * 255,
    (green + match) * 255,
    (blue + match) * 255
  );
}

function mixHex(left, right, amount) {
  const leftRgb = hexToRgb(left);
  const rightRgb = hexToRgb(right);
  const mixAmount = clamp(amount, 0, 1);

  return rgbToHex(
    leftRgb.r + ((rightRgb.r - leftRgb.r) * mixAmount),
    leftRgb.g + ((rightRgb.g - leftRgb.g) * mixAmount),
    leftRgb.b + ((rightRgb.b - leftRgb.b) * mixAmount)
  );
}

function buildColorFromSeed(seedHsl, { hueShift = 0, saturation = seedHsl.s, lightness = seedHsl.l } = {}) {
  return hslToHex(
    shiftHue(seedHsl.h, hueShift),
    saturation,
    lightness
  );
}

function relativeLuminance(value) {
  const { r, g, b } = hexToRgb(value);
  const channels = [r, g, b].map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return (0.2126 * channels[0]) + (0.7152 * channels[1]) + (0.0722 * channels[2]);
}

function readableTextOn(value, dark = "#101114", light = "#f8fbff") {
  return relativeLuminance(value) > 0.45 ? dark : light;
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

function base64UrlToBytes(value) {
  const normalized = String(value || "").trim().replace(/-/g, "+").replace(/_/g, "/");
  const remainder = normalized.length % 4;
  const padded = normalized + (remainder ? "=".repeat(4 - remainder) : "");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function compressTextToBase64Url(value) {
  if (typeof CompressionStream !== "function") {
    throw new Error("CompressionStream is unavailable.");
  }

  const stream = new Blob([String(value || "")]).stream().pipeThrough(new CompressionStream(SHARE_COMPRESSION_FORMAT));
  const buffer = await new Response(stream).arrayBuffer();
  return bytesToBase64Url(new Uint8Array(buffer));
}

async function decompressBase64UrlToText(value) {
  if (typeof DecompressionStream !== "function") {
    throw new Error("DecompressionStream is unavailable.");
  }

  const bytes = base64UrlToBytes(value);
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream(SHARE_COMPRESSION_FORMAT));
  return new Response(stream).text();
}

function getHostedBasePath(pathname = window.location.pathname) {
  if (typeof window === "undefined") {
    return "";
  }

  const hostname = window.location.hostname.toLowerCase();
  const segments = String(pathname || "/").split("/").filter(Boolean);
  return hostname.endsWith(".github.io") && segments.length ? `/${segments[0]}` : "";
}

function getCanonicalAppPath(pathname = window.location.pathname) {
  const normalized = String(pathname || "/").replace(/\/(?:import|i)(?:\/[^/]+)?\/?$/, "/");
  return normalized || "/";
}

function getAssetBasePath(pathname = window.location.pathname) {
  return getCanonicalAppPath(pathname)
    .replace(/\/index\.html$/, "/")
    .replace(/\/$/, "");
}

function getShareBaseUrl(pathname = window.location.pathname) {
  if (typeof window === "undefined") {
    return "";
  }

  const canonicalPath = getCanonicalAppPath(pathname)
    .replace(/\/index\.html$/, "/")
    .replace(/\/$/, "");

  return `${window.location.origin}${canonicalPath}`;
}

function getCanonicalAppUrl(pathname = window.location.pathname) {
  if (typeof window === "undefined") {
    return "";
  }

  const canonicalPath = `${getCanonicalAppPath(pathname).replace(/\/index\.html$/, "").replace(/\/$/, "")}/`;
  return `${window.location.origin}${canonicalPath}`;
}

function isOfficialHostedDeployment(url = window.location.href) {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return getCanonicalAppUrl(new URL(url, window.location.href).pathname) === OFFICIAL_HOSTED_APP_URL;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function sessionStorageAvailable() {
  if (typeof window === "undefined" || !window.sessionStorage) {
    return false;
  }

  try {
    const key = "__llastro_session_test__";
    window.sessionStorage.setItem(key, "1");
    window.sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

function readSessionJson(key) {
  if (!sessionStorageAvailable()) {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function writeSessionJson(key, value) {
  if (!sessionStorageAvailable()) {
    return false;
  }

  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function removeSessionValue(key) {
  if (!sessionStorageAvailable()) {
    return;
  }

  try {
    window.sessionStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
}

function createRandomToken(byteLength = 32) {
  if (!window.crypto?.getRandomValues) {
    throw new Error("Secure random generation is unavailable in this browser.");
  }

  const bytes = new Uint8Array(byteLength);
  window.crypto.getRandomValues(bytes);
  return bytesToBase64Url(bytes);
}

async function sha256Base64Url(value) {
  if (!window.crypto?.subtle) {
    throw new Error("Secure hashing is unavailable in this browser.");
  }

  const encoded = new TextEncoder().encode(String(value || ""));
  const digest = await window.crypto.subtle.digest("SHA-256", encoded);
  return bytesToBase64Url(new Uint8Array(digest));
}

async function readJsonOrText(response) {
  const raw = await response.text();
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return raw;
  }
}

function summarizeDropboxError(payload, fallback = "Dropbox request failed.") {
  if (!payload) {
    return fallback;
  }

  if (typeof payload === "string") {
    return payload;
  }

  const candidates = [
    payload.error_description,
    payload.error_summary,
    payload.error?.error_summary,
    payload.error?.reason?.[".tag"],
    payload.error?.[".tag"]
  ];

  const message = candidates.find((candidate) => typeof candidate === "string" && candidate.trim());
  return message ? message.replace(/_/g, " ") : fallback;
}

function getSharedImportTokenFromPath(pathname = window.location.pathname) {
  const match = String(pathname || "").match(/(?:^|\/)(?:import|i)\/([^/?#]+)/);
  return match ? match[1] : "";
}

function normalizeSharedAppSpec(payload) {
  const html = typeof payload === "string" ? payload.trim() : "";
  if (!html) {
    return null;
  }

  const meta = extractAppMetadata(html);

  return {
    exportedAt: "",
    exportedFrom: "",
    app: {
      title: meta.title,
      summary: meta.summary,
      tags: meta.tags,
      themeId: meta.themeId,
      schemeId: meta.schemeId,
      source: html,
      html
    }
  };
}

function deriveCustomScheme(themeId, customColor = DEFAULT_CUSTOM_COLOR) {
  const seed = normalizeHexColor(customColor, DEFAULT_CUSTOM_COLOR);
  const seedHsl = hexToHsl(seed);
  const vividAccent = buildColorFromSeed(seedHsl, {
    saturation: clamp(Math.max(seedHsl.s, 62), 48, 92),
    lightness: clamp(seedHsl.l, 36, 58)
  });

  if (themeId === "flat") {
    const accent = vividAccent;
    const accentStrong = buildColorFromSeed(seedHsl, { saturation: clamp(seedHsl.s + 10, 58, 98), lightness: 28 });
    const accentCool = buildColorFromSeed(seedHsl, { hueShift: 18, saturation: clamp(seedHsl.s, 52, 84), lightness: 42 });
    const pageBg = buildColorFromSeed(seedHsl, { saturation: clamp(seedHsl.s * 0.42, 18, 46), lightness: 96 });
    const pageBgDeep = buildColorFromSeed(seedHsl, { hueShift: 16, saturation: clamp(seedHsl.s * 0.55, 24, 58), lightness: 88 });
    const surfaceStrong = mixHex(pageBg, pageBgDeep, 0.35);
    const surfaceMuted = mixHex(pageBg, "#ffffff", 0.42);
    const text = buildColorFromSeed(seedHsl, { saturation: clamp(seedHsl.s * 0.4, 18, 40), lightness: 20 });
    const muted = mixHex(text, pageBgDeep, 0.5);
    return {
      seed,
      host: {
        gradient: `linear-gradient(135deg, ${pageBg}, ${pageBgDeep})`,
        colorScheme: "light",
        pageBg,
        pageBgDeep,
        panelStrong: surfaceStrong,
        panelBorder: rgbaFromHex(accent, 0.18),
        accent,
        accentDeep: accentStrong,
        accentCool
      },
      app: {
        vars: {
          "--ll-color-scheme": "light",
          "--ll-app-bg": `linear-gradient(180deg, ${pageBg} 0%, ${pageBgDeep} 100%)`,
          "--ll-page-bg": pageBg,
          "--ll-page-bg-deep": pageBgDeep,
          "--ll-surface": "#ffffff",
          "--ll-surface-strong": surfaceStrong,
          "--ll-surface-muted": surfaceMuted,
          "--ll-surface-ghost": rgbaFromHex("#ffffff", 0.82),
          "--ll-border": rgbaFromHex(accent, 0.16),
          "--ll-border-strong": rgbaFromHex(accent, 0.3),
          "--ll-text": text,
          "--ll-muted": muted,
          "--ll-accent": accent,
          "--ll-accent-strong": accentStrong,
          "--ll-accent-soft": rgbaFromHex(accent, 0.14),
          "--ll-shadow": "none",
          "--ll-shadow-strong": "none",
          "--ll-input-bg": "#ffffff",
          "--ll-button-fill": `linear-gradient(180deg, ${accent} 0%, ${accent} 100%)`,
          "--ll-button-ink": readableTextOn(accent),
          "--ll-hero-fill": "linear-gradient(180deg, #ffffff 0%, #ffffff 100%)",
          "--ll-spotlight-fill": `linear-gradient(180deg, ${surfaceStrong} 0%, ${surfaceStrong} 100%)`,
          "--ll-secondary-fill": surfaceStrong,
          "--ll-secondary-border": rgbaFromHex(accent, 0.16)
        }
      }
    };
  }

  if (themeId === "material2") {
    const accent = vividAccent;
    const accentStrong = buildColorFromSeed(seedHsl, { hueShift: -8, saturation: clamp(seedHsl.s + 8, 56, 96), lightness: 30 });
    const accentCool = buildColorFromSeed(seedHsl, { hueShift: 24, saturation: clamp(seedHsl.s, 48, 82), lightness: 46 });
    const pageBg = buildColorFromSeed(seedHsl, { saturation: clamp(seedHsl.s * 0.34, 16, 36), lightness: 96 });
    const pageBgDeep = buildColorFromSeed(seedHsl, { hueShift: 18, saturation: clamp(seedHsl.s * 0.45, 20, 48), lightness: 90 });
    const surfaceStrong = mixHex(pageBg, pageBgDeep, 0.45);
    const text = buildColorFromSeed(seedHsl, { saturation: clamp(seedHsl.s * 0.48, 18, 42), lightness: 22 });
    const muted = mixHex(text, pageBgDeep, 0.56);
    return {
      seed,
      host: {
        gradient: `linear-gradient(135deg, ${pageBg}, ${pageBgDeep})`,
        colorScheme: "light",
        pageBg,
        pageBgDeep,
        panelStrong: surfaceStrong,
        panelBorder: rgbaFromHex(accent, 0.16),
        accent,
        accentDeep: accentStrong,
        accentCool
      },
      app: {
        vars: {
          "--ll-color-scheme": "light",
          "--ll-app-bg": `linear-gradient(180deg, ${pageBg} 0%, ${pageBgDeep} 100%)`,
          "--ll-page-bg": pageBg,
          "--ll-page-bg-deep": pageBgDeep,
          "--ll-surface": rgbaFromHex("#ffffff", 0.98),
          "--ll-surface-strong": surfaceStrong,
          "--ll-surface-muted": rgbaFromHex(surfaceStrong, 0.82),
          "--ll-surface-ghost": rgbaFromHex("#ffffff", 0.74),
          "--ll-border": rgbaFromHex(accent, 0.14),
          "--ll-border-strong": rgbaFromHex(accent, 0.24),
          "--ll-text": text,
          "--ll-muted": muted,
          "--ll-accent": accent,
          "--ll-accent-strong": accentStrong,
          "--ll-accent-soft": rgbaFromHex(accent, 0.12),
          "--ll-shadow": `0 10px 22px ${rgbaFromHex(accent, 0.1)}`,
          "--ll-shadow-strong": `0 18px 34px ${rgbaFromHex(accent, 0.16)}`,
          "--ll-input-bg": "#ffffff",
          "--ll-button-fill": `linear-gradient(180deg, ${accent} 0%, ${accentCool} 100%)`,
          "--ll-button-ink": readableTextOn(accent),
          "--ll-hero-fill": "linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%)",
          "--ll-spotlight-fill": `linear-gradient(180deg, ${mixHex(pageBg, "#ffffff", 0.28)} 0%, #ffffff 100%)`
        }
      }
    };
  }

  if (themeId === "neumorph") {
    const accent = buildColorFromSeed(seedHsl, {
      saturation: clamp(seedHsl.s * 0.55, 18, 42),
      lightness: clamp(seedHsl.l, 42, 56)
    });
    const accentStrong = buildColorFromSeed(seedHsl, { saturation: clamp(seedHsl.s * 0.6, 22, 48), lightness: 34 });
    const accentCool = buildColorFromSeed(seedHsl, { hueShift: 26, saturation: clamp(seedHsl.s * 0.36, 14, 34), lightness: 48 });
    const pageBg = buildColorFromSeed(seedHsl, { saturation: clamp(seedHsl.s * 0.22, 10, 18), lightness: 95 });
    const pageBgDeep = buildColorFromSeed(seedHsl, { saturation: clamp(seedHsl.s * 0.26, 12, 22), lightness: 86 });
    const surface = rgbaFromHex(mixHex(pageBg, "#ffffff", 0.28), 0.97);
    const surfaceStrong = mixHex(pageBg, pageBgDeep, 0.46);
    const text = buildColorFromSeed(seedHsl, { saturation: clamp(seedHsl.s * 0.28, 12, 24), lightness: 21 });
    const muted = mixHex(text, pageBgDeep, 0.58);
    return {
      seed,
      host: {
        gradient: `linear-gradient(135deg, ${pageBg}, ${pageBgDeep})`,
        colorScheme: "light",
        pageBg,
        pageBgDeep,
        panelStrong: surfaceStrong,
        panelBorder: rgbaFromHex(accent, 0.2),
        accent,
        accentDeep: accentStrong,
        accentCool
      },
      app: {
        vars: {
          "--ll-color-scheme": "light",
          "--ll-page-bg": pageBg,
          "--ll-page-bg-deep": pageBgDeep,
          "--ll-surface": surface,
          "--ll-surface-strong": surfaceStrong,
          "--ll-surface-muted": rgbaFromHex(surfaceStrong, 0.68),
          "--ll-surface-ghost": rgbaFromHex("#ffffff", 0.64),
          "--ll-border": rgbaFromHex(accentStrong, 0.16),
          "--ll-border-strong": rgbaFromHex(accentStrong, 0.28),
          "--ll-text": text,
          "--ll-muted": muted,
          "--ll-accent": accent,
          "--ll-accent-strong": accentStrong,
          "--ll-accent-soft": rgbaFromHex(accent, 0.14),
          "--ll-shadow": `0 24px 54px ${rgbaFromHex(accentStrong, 0.1)}`,
          "--ll-shadow-strong": `0 28px 64px ${rgbaFromHex(accentStrong, 0.14)}`,
          "--ll-hero-fill": `linear-gradient(135deg, ${rgbaFromHex("#ffffff", 0.94)}, ${rgbaFromHex(pageBgDeep, 0.94)})`,
          "--ll-spotlight-fill": `linear-gradient(135deg, ${rgbaFromHex(pageBgDeep, 0.84)}, ${rgbaFromHex("#ffffff", 0.96)})`
        }
      }
    };
  }

  if (themeId === "glass") {
    const accent = vividAccent;
    const splitLeft = buildColorFromSeed(seedHsl, { hueShift: -34, saturation: clamp(seedHsl.s + 4, 54, 90), lightness: 76 });
    const splitRight = buildColorFromSeed(seedHsl, { hueShift: 34, saturation: clamp(seedHsl.s + 2, 52, 88), lightness: 82 });
    const accentStrong = buildColorFromSeed(seedHsl, { hueShift: -8, saturation: clamp(seedHsl.s + 6, 56, 92), lightness: 36 });
    const text = buildColorFromSeed(seedHsl, { hueShift: -18, saturation: clamp(seedHsl.s * 0.45, 18, 44), lightness: 22 });
    const muted = mixHex(text, splitRight, 0.52);
    return {
      seed,
      host: {
        gradient: `linear-gradient(135deg, ${splitLeft}, ${splitRight})`,
        colorScheme: "light",
        pageBg: splitLeft,
        pageBgDeep: splitRight,
        panelStrong: rgbaFromHex("#ffffff", 0.34),
        panelBorder: rgbaFromHex("#ffffff", 0.42),
        accent,
        accentDeep: accentStrong,
        accentCool: accent
      },
      app: {
        vars: {
          "--ll-color-scheme": "light",
          "--ll-app-bg": `radial-gradient(circle at 15% 10%, ${rgbaFromHex("#ffffff", 0.78)}, transparent 20rem), radial-gradient(circle at 85% 0%, ${rgbaFromHex(accent, 0.28)}, transparent 22rem), linear-gradient(135deg, ${splitLeft} 0%, ${mixHex(splitLeft, splitRight, 0.5)} 52%, ${splitRight} 100%)`,
          "--ll-page-bg": splitLeft,
          "--ll-page-bg-deep": splitRight,
          "--ll-text": text,
          "--ll-muted": muted,
          "--ll-accent": accent,
          "--ll-accent-strong": accentStrong,
          "--ll-accent-soft": rgbaFromHex(accent, 0.16),
          "--ll-shadow": `0 18px 44px ${rgbaFromHex(accentStrong, 0.18)}`,
          "--ll-shadow-strong": `0 26px 62px ${rgbaFromHex(accentStrong, 0.22)}`
        }
      }
    };
  }

  if (themeId === "brutal") {
    const accent = buildColorFromSeed(seedHsl, {
      saturation: clamp(Math.max(seedHsl.s, 82), 68, 100),
      lightness: clamp(seedHsl.l, 42, 54)
    });
    const loudBlock = buildColorFromSeed(seedHsl, {
      hueShift: 20,
      saturation: clamp(Math.max(seedHsl.s, 78), 62, 98),
      lightness: 64
    });
    const contrastBlock = buildColorFromSeed(seedHsl, {
      hueShift: -22,
      saturation: clamp(Math.max(seedHsl.s, 72), 56, 94),
      lightness: 58
    });
    const pageBg = mixHex(loudBlock, "#ffffff", 0.08);
    const pageBgDeep = mixHex(accent, contrastBlock, 0.42);
    const surfaceStrong = mixHex(pageBg, "#ffffff", 0.26);
    const surface = mixHex(surfaceStrong, "#ffffff", 0.32);
    const text = "#121212";
    const muted = mixHex(text, pageBgDeep, 0.46);
    return {
      seed,
      host: {
        gradient: `linear-gradient(135deg, ${pageBg}, ${pageBgDeep})`,
        colorScheme: "light",
        pageBg,
        pageBgDeep,
        panelStrong: surfaceStrong,
        panelBorder: rgbaFromHex("#111111", 0.94),
        accent,
        accentDeep: "#111111",
        accentCool: "#111111"
      },
      app: {
        vars: {
          "--ll-color-scheme": "light",
          "--ll-app-bg": `linear-gradient(180deg, ${pageBg} 0%, ${pageBgDeep} 100%)`,
          "--ll-page-bg": pageBg,
          "--ll-page-bg-deep": pageBgDeep,
          "--ll-surface": surface,
          "--ll-surface-strong": surfaceStrong,
          "--ll-surface-muted": mixHex(pageBg, surfaceStrong, 0.38),
          "--ll-surface-ghost": rgbaFromHex("#ffffff", 0.72),
          "--ll-border": rgbaFromHex("#111111", 0.96),
          "--ll-border-strong": "rgba(17, 17, 17, 1)",
          "--ll-text": text,
          "--ll-muted": muted,
          "--ll-accent": accent,
          "--ll-accent-strong": "#111111",
          "--ll-accent-soft": rgbaFromHex(accent, 0.24),
          "--ll-button-fill": `linear-gradient(180deg, ${accent} 0%, ${contrastBlock} 100%)`,
          "--ll-button-ink": readableTextOn(accent, "#111111", "#ffffff"),
          "--ll-hero-fill": `linear-gradient(180deg, ${mixHex(pageBg, "#ffffff", 0.18)} 0%, ${mixHex(pageBgDeep, "#ffffff", 0.14)} 100%)`,
          "--ll-spotlight-fill": `linear-gradient(180deg, ${mixHex(accent, "#ffffff", 0.58)} 0%, ${mixHex(pageBg, "#ffffff", 0.34)} 100%)`
        }
      }
    };
  }

  const accent = buildColorFromSeed(seedHsl, {
    saturation: clamp(Math.max(seedHsl.s, 68), 52, 96),
    lightness: clamp(seedHsl.l, 56, 66)
  });
  const glow = buildColorFromSeed(seedHsl, {
    hueShift: 38,
    saturation: clamp(seedHsl.s + 2, 48, 88),
    lightness: 58
  });
  const pageBg = buildColorFromSeed(seedHsl, {
    hueShift: -26,
    saturation: clamp(seedHsl.s * 0.56, 26, 58),
    lightness: 16
  });
  const pageBgDeep = buildColorFromSeed(seedHsl, {
    hueShift: 20,
    saturation: clamp(seedHsl.s * 0.5, 20, 52),
    lightness: 8
  });
  const surfaceStrong = rgbaFromHex(mixHex(pageBg, glow, 0.28), 0.82);
  const border = rgbaFromHex(mixHex(accent, "#dbe7ff", 0.52), 0.22);
  return {
    seed,
    host: {
      gradient: `linear-gradient(135deg, ${pageBg}, ${pageBgDeep})`,
      colorScheme: "dark",
      pageBg,
      pageBgDeep,
      panelStrong: surfaceStrong,
      panelBorder: border,
      accent,
      accentDeep: mixHex(accent, "#ffffff", 0.72),
      accentCool: glow
    },
    app: {
      vars: {
        "--ll-color-scheme": "dark",
        "--ll-app-bg": `radial-gradient(circle at 10% 10%, ${rgbaFromHex(accent, 0.24)}, transparent 22rem), radial-gradient(circle at 90% 0%, ${rgbaFromHex(glow, 0.2)}, transparent 24rem), radial-gradient(circle at 50% 100%, ${rgbaFromHex(mixHex(accent, glow, 0.5), 0.08)}, transparent 26rem), linear-gradient(180deg, ${pageBg} 0%, ${pageBgDeep} 100%)`,
        "--ll-page-bg": pageBg,
        "--ll-page-bg-deep": pageBgDeep,
        "--ll-surface": rgbaFromHex(mixHex(pageBg, "#17243d", 0.3), 0.62),
        "--ll-surface-strong": surfaceStrong,
        "--ll-surface-muted": rgbaFromHex(mixHex(pageBg, glow, 0.4), 0.64),
        "--ll-surface-ghost": rgbaFromHex("#ffffff", 0.06),
        "--ll-border": border,
        "--ll-border-strong": rgbaFromHex(mixHex(accent, "#ffffff", 0.56), 0.3),
        "--ll-text": "#f5f8ff",
        "--ll-muted": mixHex("#e7eeff", pageBg, 0.45),
        "--ll-accent": accent,
        "--ll-accent-strong": mixHex(accent, "#ffffff", 0.72),
        "--ll-accent-soft": rgbaFromHex(accent, 0.2),
        "--ll-shadow": "0 24px 60px rgba(4, 7, 20, 0.48)",
        "--ll-shadow-strong": "0 30px 84px rgba(4, 7, 20, 0.66)",
        "--ll-input-bg": rgbaFromHex("#0b1121", 0.82),
        "--ll-button-fill": `linear-gradient(135deg, ${accent} 0%, ${glow} 100%)`,
        "--ll-button-ink": "#f8fbff",
        "--ll-table-head-fill": `color-mix(in srgb, ${surfaceStrong} 82%, black)`,
        "--ll-table-foot-fill": `color-mix(in srgb, ${rgbaFromHex(mixHex(pageBg, glow, 0.4), 0.64)} 78%, black)`,
        "--ll-metric-fill": `linear-gradient(135deg, ${rgbaFromHex(accent, 0.18)}, ${rgbaFromHex(pageBgDeep, 0.88)})`,
        "--ll-secondary-fill": `color-mix(in srgb, ${rgbaFromHex(accent, 0.2)} 60%, ${rgbaFromHex("#ffffff", 0.06)})`,
        "--ll-secondary-border": border,
        "--ll-dialog-backdrop": `color-mix(in srgb, ${pageBgDeep} 74%, transparent)`,
        "--ll-hero-fill": `radial-gradient(circle at top right, ${rgbaFromHex(accent, 0.22)}, transparent 18rem), radial-gradient(circle at top left, ${rgbaFromHex(glow, 0.16)}, transparent 18rem), linear-gradient(135deg, ${rgbaFromHex(mixHex(pageBg, accent, 0.22), 0.86)}, ${rgbaFromHex(pageBgDeep, 0.92)})`,
        "--ll-spotlight-fill": `radial-gradient(circle at top, ${rgbaFromHex(glow, 0.18)}, transparent 18rem), linear-gradient(135deg, ${rgbaFromHex(mixHex(pageBg, glow, 0.28), 0.86)}, ${rgbaFromHex(pageBgDeep, 0.94)})`
      }
    }
  };
}

function customSchemeInlineStyle(themeId, schemeId, customColor) {
  if (schemeId !== CUSTOM_SCHEME_ID) {
    return "";
  }

  const derived = deriveCustomScheme(themeId, customColor);
  return Object.entries(derived.app.vars)
    .map(([name, value]) => `${name}: ${value}`)
    .join("; ");
}

function extractCustomColorFromElement(element) {
  return normalizeHexColor(element?.getAttribute?.(CUSTOM_COLOR_MARKER) || "", "");
}

function extractCustomColorFromHtml(appHtml) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<body>${extractCodeBlock(appHtml)}</body>`, "text/html");
  const root = doc.body.querySelector(`[${APP_MARKER}]`);
  return extractCustomColorFromElement(root);
}

function applyCustomThemeToElement(element, themeId, schemeId, customColor) {
  if (!element) {
    return "";
  }

  CUSTOM_THEME_STYLE_PROPERTIES.forEach((property) => {
    element.style.removeProperty(property);
  });
  element.removeAttribute(CUSTOM_COLOR_MARKER);

  if (schemeId !== CUSTOM_SCHEME_ID) {
    if (!element.getAttribute("style")?.trim()) {
      element.removeAttribute("style");
    }
    return "";
  }

  const normalizedColor = normalizeHexColor(customColor, DEFAULT_CUSTOM_COLOR);
  const derived = deriveCustomScheme(themeId, normalizedColor);
  element.setAttribute(CUSTOM_COLOR_MARKER, normalizedColor);
  Object.entries(derived.app.vars).forEach(([property, value]) => {
    element.style.setProperty(property, value);
  });

  return normalizedColor;
}

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
    label: "Prompt",
    summary: "Choose the source."
  },
  {
    id: "theme",
    label: "Theme",
    summary: "Pick the look."
  },
  {
    id: "handoff",
    label: "Paste",
    summary: "Copy the prompt and paste the result."
  },
  {
    id: "preview",
    label: "Edit",
    summary: "Tweak, save, or export."
  }
];

const PROMPT_MODES = [
  {
    id: "custom",
    eyebrow: "Write it",
    name: "Custom Brief",
    summary: "Describe the workflow you want.",
    detail: "Best for a note, checklist, or idea."
  },
  {
    id: "conversation",
    eyebrow: "Use this chat",
    name: "This Conversation",
    summary: "Turn the current chat into one focused tool.",
    detail: "Best when the workflow is already here."
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
  align-items: start;
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

  const isPlaceholderListItem = (node) => {
    if (!node || node.tagName?.toLowerCase() !== "li") {
      return false;
    }

    if (node.querySelector("input, select, textarea, button, a[href], img, svg, canvas, video, audio, iframe, progress, meter, details, table, [data-lucide]")) {
      return false;
    }

    const normalizedHtml = node.innerHTML
      .replace(/<br\\s*\\/?>/gi, "")
      .replace(/&nbsp;/gi, "")
      .trim();

    return !normalizedHtml && !node.textContent.trim();
  };

  const cleanupListAncestors = (node) => {
    let current = node;
    while (current && current !== state.root) {
      const tagName = current.tagName?.toLowerCase();
      if (tagName === "ul" || tagName === "ol") {
        [...current.children].forEach((child) => {
          if (isPlaceholderListItem(child)) {
            child.remove();
          }
        });

        const hasListItems = [...current.children].some((child) => child.tagName?.toLowerCase() === "li");
        const hasDirectMeaningfulChild = [...current.children].some((child) => {
          if (child.tagName?.toLowerCase() === "template") {
            return true;
          }

          if (child.tagName?.toLowerCase() === "li") {
            return !isPlaceholderListItem(child);
          }

          return true;
        });
        const hasMeaningfulText = [...current.childNodes].some((child) => {
          return child.nodeType === Node.TEXT_NODE && child.textContent.trim();
        });

        if (!hasListItems && !hasDirectMeaningfulChild && !hasMeaningfulText) {
          const emptyList = current;
          current = current.parentElement;
          emptyList.remove();
          continue;
        }
      }

      current = current.parentElement;
    }
  };

  const cleanupAllLists = (root = state.root) => {
    if (!root) {
      return;
    }

    [...root.querySelectorAll("ul, ol")].reverse().forEach((list) => {
      [...list.children].forEach((child) => {
        if (isPlaceholderListItem(child)) {
          child.remove();
        }
      });

      const hasListItems = [...list.children].some((child) => child.tagName?.toLowerCase() === "li");
      const hasDirectMeaningfulChild = [...list.children].some((child) => {
        if (child.tagName?.toLowerCase() === "template") {
          return true;
        }

        if (child.tagName?.toLowerCase() === "li") {
          return !isPlaceholderListItem(child);
        }

        return true;
      });
      const hasMeaningfulText = [...list.childNodes].some((child) => {
        return child.nodeType === Node.TEXT_NODE && child.textContent.trim();
      });

      if (!hasListItems && !hasDirectMeaningfulChild && !hasMeaningfulText) {
        list.remove();
      }
    });
  };

  const elementMatchesTemplateBlueprint = (node, blueprint) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE || !blueprint || blueprint.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }

    if (node.tagName !== blueprint.tagName) {
      return false;
    }

    const blueprintClasses = [...blueprint.classList];
    if (blueprintClasses.length && !blueprintClasses.every((token) => node.classList.contains(token))) {
      return false;
    }

    return true;
  };

  const cleanupTemplateArtifacts = (root = state.root) => {
    if (!root) {
      return;
    }

    root.querySelectorAll("template[x-for], template[x-if]").forEach((template) => {
      const blueprint = template.content.firstElementChild;
      if (!blueprint) {
        return;
      }

      let sibling = template.nextSibling;
      while (sibling) {
        const nextSibling = sibling.nextSibling;

        if (sibling.nodeType === Node.TEXT_NODE && !sibling.textContent.trim()) {
          sibling = nextSibling;
          continue;
        }

        if (!elementMatchesTemplateBlueprint(sibling, blueprint)) {
          break;
        }

        sibling.remove();
        if (template.hasAttribute("x-if")) {
          break;
        }
        sibling = nextSibling;
      }
    });
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
    cleanupAllLists(state.root);
    const clone = state.root.cloneNode(true);
    cleanupAllLists(clone);
    cleanupTemplateArtifacts(clone);
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

    const ancestorList = node.closest("ul, ol");
    const fallbackTarget = node.previousElementSibling || node.nextElementSibling || node.parentElement;
    node.remove();
    if (ancestorList) {
      cleanupListAncestors(ancestorList);
    }

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

function hostSchemeTokens(themeId, schemeId, customColor = DEFAULT_CUSTOM_COLOR) {
  const theme = themeById(themeId);
  const scheme = schemeById(theme.id, schemeId);
  if (scheme.id === CUSTOM_SCHEME_ID) {
    return deriveCustomScheme(theme.id, customColor).host;
  }

  return HOST_SCHEME_TOKENS[theme.id]?.[scheme.id] || HOST_SCHEME_TOKENS[theme.id]?.[theme.schemes[0]?.id] || {
    gradient: theme.gradient,
    colorScheme: theme.id === "liquid" ? "dark" : "light",
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
  const customColor = schemeId === CUSTOM_SCHEME_ID
    ? extractCustomColorFromElement(root) || DEFAULT_CUSTOM_COLOR
    : "";
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
    schemeId,
    customColor
  };
}

function cleanEditorListArtifacts(html) {
  const value = String(html || "").trim();
  if (!value) {
    return value;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<body>${value}</body>`, "text/html");
  const meaningfulSelector = [
    "input",
    "select",
    "textarea",
    "button",
    "a[href]",
    "img",
    "svg",
    "canvas",
    "video",
    "audio",
    "iframe",
    "progress",
    "meter",
    "details",
    "table",
    "[data-lucide]"
  ].join(", ");

  const isPlaceholderListItem = (node) => {
    if (!node || node.tagName?.toLowerCase() !== "li") {
      return false;
    }

    if (node.querySelector(meaningfulSelector)) {
      return false;
    }

    const normalizedHtml = node.innerHTML
      .replace(/<br\s*\/?>/gi, "")
      .replace(/&nbsp;/gi, "")
      .trim();

    return !normalizedHtml && !node.textContent.trim();
  };

  const cleanupList = (list) => {
    [...list.children].forEach((child) => {
      if (child.tagName?.toLowerCase() === "li" && isPlaceholderListItem(child)) {
        child.remove();
      }
    });

    const hasMeaningfulListItems = [...list.children].some((child) => child.tagName?.toLowerCase() === "li");
    if (hasMeaningfulListItems) {
      return;
    }

    const directMeaningfulChild = [...list.children].some((child) => {
      if (child.tagName?.toLowerCase() === "template") {
        return true;
      }

      if (child.tagName?.toLowerCase() === "li") {
        return !isPlaceholderListItem(child);
      }

      return true;
    });

    const hasMeaningfulText = [...list.childNodes].some((child) => {
      return child.nodeType === Node.TEXT_NODE && child.textContent.trim();
    });

    if (!directMeaningfulChild && !hasMeaningfulText) {
      list.remove();
    }
  };

  const elementMatchesTemplateBlueprint = (node, blueprint) => {
    if (!node || node.nodeType !== Node.ELEMENT_NODE || !blueprint || blueprint.nodeType !== Node.ELEMENT_NODE) {
      return false;
    }

    if (node.tagName !== blueprint.tagName) {
      return false;
    }

    const blueprintClasses = [...blueprint.classList];
    if (blueprintClasses.length && !blueprintClasses.every((token) => node.classList.contains(token))) {
      return false;
    }

    return true;
  };

  const cleanupTemplateArtifacts = (root = doc.body) => {
    root.querySelectorAll("template[x-for], template[x-if]").forEach((template) => {
      const blueprint = template.content.firstElementChild;
      if (!blueprint) {
        return;
      }

      let sibling = template.nextSibling;
      while (sibling) {
        const nextSibling = sibling.nextSibling;

        if (sibling.nodeType === Node.TEXT_NODE && !sibling.textContent.trim()) {
          sibling = nextSibling;
          continue;
        }

        if (!elementMatchesTemplateBlueprint(sibling, blueprint)) {
          break;
        }

        sibling.remove();
        if (template.hasAttribute("x-if")) {
          break;
        }
        sibling = nextSibling;
      }
    });
  };

  cleanupTemplateArtifacts(doc.body);
  doc.body.querySelectorAll("ul, ol").forEach(cleanupList);
  return doc.body.innerHTML.trim();
}

function buildRootThemeAttributes(themeId, schemeId, customColor = DEFAULT_CUSTOM_COLOR) {
  if (schemeId !== CUSTOM_SCHEME_ID) {
    return "";
  }

  const normalizedColor = normalizeHexColor(customColor, DEFAULT_CUSTOM_COLOR);
  const inlineStyle = customSchemeInlineStyle(themeId, schemeId, normalizedColor);
  return ` ${CUSTOM_COLOR_MARKER}="${normalizedColor}" style="${escapeHtml(inlineStyle)}"`;
}

function buildExampleSnippet(themeId, schemeId, customColor = DEFAULT_CUSTOM_COLOR) {
  return [
    "```html",
    `<main ${APP_MARKER} ${THEME_MARKER}="${themeId}" ${SCHEME_MARKER}="${schemeId}"${buildRootThemeAttributes(themeId, schemeId, customColor)} data-llastro-title="Retreat Control Room" data-llastro-summary="A reusable planning board for coordinating retreat decisions, owners, and workstreams." data-llastro-tags="planner, tracker, team" class="app-shell stack" x-data="{`,
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

function buildReferenceFixture(themeId, schemeId, customColor = DEFAULT_CUSTOM_COLOR) {
  const theme = themeById(themeId);
  const scheme = schemeById(themeId, schemeId);

  return [
    `<main ${APP_MARKER} ${THEME_MARKER}="${theme.id}" ${SCHEME_MARKER}="${scheme.id}"${buildRootThemeAttributes(theme.id, scheme.id, customColor)} class="app-shell stack" x-data="{}" data-llastro-title="${theme.name} ${scheme.name} reference">`,
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
    appCustomColor: DEFAULT_CUSTOM_COLOR,
    selectedTheme: THEMES[0].id,
    selectedScheme: THEMES[0].schemes[0].id,
    selectedCustomColor: DEFAULT_CUSTOM_COLOR,
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
    activeLibraryStorage: LIBRARY_STORAGE_AUTO,
    activeLibraryId: "",
    librarySearch: "",
    activeTagFilters: [],
    isLibraryModalOpen: false,
    isLibraryHeaderExpanded: false,
    skipStudioResetOnNextEntry: false,
    pendingSharedImport: null,
    activeSharedImportToken: "",
    currentShareLink: "",
    currentShareLinkSource: "",
    currentShareLinkRefreshToken: 0,
    activeLibraryShareLink: "",
    activeLibraryShareLinkSource: "",
    activeLibraryShareLinkRefreshToken: 0,
    currentEditingId: "",
    currentEditingSourceTitle: "",
    editorEnabled: false,
    editorSelection: null,
    editorTextDraft: "",
    editorTextTimer: 0,
    dropboxAppKey: "",
    dropboxSessionAppKey: "",
    dropboxRefreshToken: "",
    dropboxAccessToken: "",
    dropboxAccessTokenExpiresAt: 0,
    dropboxLastBackupAt: "",
    dropboxLastRestoreAt: "",
    dropboxAction: "",
    themeScrollTimer: 0,
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

    get currentAppCustomColor() {
      return normalizeHexColor(this.appCustomColor, DEFAULT_CUSTOM_COLOR);
    },

    get currentSchemes() {
      return this.currentTheme.schemes;
    },

    get currentScheme() {
      return schemeById(this.selectedTheme, this.selectedScheme);
    },

    get currentSelectedCustomColor() {
      return normalizeHexColor(this.selectedCustomColor, DEFAULT_CUSTOM_COLOR);
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
      const storageLabel = this.activeLibraryStorage === LIBRARY_STORAGE_LOCAL ? "Browser only" : "Server library";

      if (!this.publishedApps.length) {
        return `No saved tools · ${storageLabel}`;
      }

      if (this.filteredLibraryApps.length === this.publishedApps.length) {
        return `${this.publishedApps.length} saved · ${storageLabel}`;
      }

      return `${this.filteredLibraryApps.length} of ${this.publishedApps.length} shown · ${storageLabel}`;
    },

    get activeLibraryApp() {
      return this.library.find((app) => app.id === this.activeLibraryId) || null;
    },

    get draftTitle() {
      return this.appName.trim() || this.importedAppTitle || "Untitled Tool";
    },

    get pendingSharedImportThemeLabel() {
      const spec = this.pendingSharedImport;
      if (!spec?.app?.themeId) {
        return "Theme pending";
      }

      return `${themeById(spec.app.themeId).name} · ${schemeById(spec.app.themeId, spec.app.schemeId).name}`;
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

    get dropboxRedirectUri() {
      return isOfficialHostedDeployment() ? OFFICIAL_HOSTED_APP_URL : getCanonicalAppUrl();
    },

    get dropboxBackupPath() {
      return DROPBOX_BACKUP_PATH;
    },

    get dropboxDefaultAppKey() {
      return isOfficialHostedDeployment() ? DEFAULT_DROPBOX_APP_KEY : "";
    },

    get effectiveDropboxAppKey() {
      return this.dropboxAppKey.trim() || this.dropboxDefaultAppKey;
    },

    get dropboxHasAppKey() {
      return Boolean(this.effectiveDropboxAppKey);
    },

    get dropboxUsesBuiltInKey() {
      return Boolean(!this.dropboxAppKey.trim() && this.dropboxDefaultAppKey);
    },

    get isDropboxConnected() {
      return Boolean(this.dropboxRefreshToken && this.dropboxSessionAppKey);
    },

    get dropboxIsBusy() {
      return Boolean(this.dropboxAction);
    },

    get dropboxConnectionLabel() {
      if (this.dropboxAction === "connect") {
        return "Connecting";
      }

      if (this.dropboxAction === "backup") {
        return "Backing up";
      }

      if (this.dropboxAction === "restore") {
        return "Restoring";
      }

      return this.isDropboxConnected ? "Connected this session" : "Not connected";
    },

    get dropboxActionSummary() {
      if (this.dropboxLastBackupAt && this.dropboxLastRestoreAt) {
        return `Last backup ${this.formatTimestamp(this.dropboxLastBackupAt)}. Last restore ${this.formatTimestamp(this.dropboxLastRestoreAt)}.`;
      }

      if (this.dropboxLastBackupAt) {
        return `Last backup ${this.formatTimestamp(this.dropboxLastBackupAt)}.`;
      }

      if (this.dropboxLastRestoreAt) {
        return `Last restore ${this.formatTimestamp(this.dropboxLastRestoreAt)}.`;
      }

      return "Tokens stay in session storage only. Disconnect to clear them immediately.";
    },

    get promptText() {
      return this.buildPromptText();
    },

    get promptFieldLabel() {
      if (this.promptMode === "conversation") {
        return "Prompt for this conversation";
      }

      return "Prompt for ChatGPT";
    },

    get promptFieldHint() {
      if (this.promptMode === "conversation") {
        return "Send this in the same conversation you want to turn into a reusable tool.";
      }

      return "Send this in ChatGPT, then paste the HTML result back here.";
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
      const customSchemeLines = this.currentScheme.id === CUSTOM_SCHEME_ID
        ? [
            `- Use ${CUSTOM_SCHEME_ID} as the ${SCHEME_MARKER} value for the root element.`,
            `- The studio will inject the derived palette from the chosen seed color ${this.currentSelectedCustomColor}, so do not add custom CSS to simulate it.`
          ]
        : [];

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
        "- You may use inline x-data for simple tools or inline <script> tags for Alpine.data registration.",
        "- Do not include script tags for Alpine.js or Lucide.",
        "- Do not include <style>, <link rel=\"stylesheet\">, CSS frameworks, or external JS.",
        "- Do not rely on any assets, fonts, APIs, or network requests.",
        "- Keep everything inside one root tool element.",
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
        "- Prefer a single Alpine component unless the tool genuinely benefits from a small registration script.",
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
        ...customSchemeLines,
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

    resolveHostSchemeAccent(themeId, schemeId, customColor = DEFAULT_CUSTOM_COLOR) {
      return hostSchemeTokens(themeId, schemeId, customColor).accent;
    },

    resolveSchemeCardStyle(themeId, schemeId, customColor = DEFAULT_CUSTOM_COLOR) {
      const scheme = schemeById(themeId, schemeId);
      const tokens = hostSchemeTokens(themeId, schemeId, customColor);
      return `--scheme-gradient:${scheme.id === CUSTOM_SCHEME_ID ? tokens.gradient : scheme.gradient}; --scheme-accent:${tokens.accent};`;
    },

    describeCustomScheme(themeId) {
      return CUSTOM_SCHEME_THEORY[themeId] || "Theme-aware palette generated from one chosen color.";
    },

    updateSelectedCustomColor(value) {
      this.selectedCustomColor = normalizeHexColor(value, DEFAULT_CUSTOM_COLOR);
      if (this.selectedScheme === CUSTOM_SCHEME_ID) {
        this.applySelectedThemeToDraft();
      }
      this.saveState();
      this.statusMessage = `Custom tool color set to ${this.currentSelectedCustomColor}.`;
    },

    updateAppCustomColor(value) {
      this.appCustomColor = normalizeHexColor(value, DEFAULT_CUSTOM_COLOR);
      if (this.appScheme === CUSTOM_SCHEME_ID) {
        this.applyAppTheme();
      }
      this.saveState();
      this.statusMessage = `Studio custom color set to ${this.currentAppCustomColor}.`;
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
      const customColor = scheme.id === CUSTOM_SCHEME_ID ? this.currentAppCustomColor : DEFAULT_CUSTOM_COLOR;
      const tokens = hostSchemeTokens(theme.id, scheme.id, customColor);
      this.appTheme = theme.id;
      this.appScheme = scheme.id;

      const root = document.documentElement;
      root.dataset.appTheme = theme.id;
      root.dataset.appScheme = scheme.id;
      root.style.setProperty("--app-scheme-gradient", scheme.id === CUSTOM_SCHEME_ID ? tokens.gradient : scheme.gradient);
      root.style.setProperty("--app-theme-accent", tokens.accent);
      root.style.setProperty("--page-bg", tokens.pageBg);
      root.style.setProperty("--page-bg-deep", tokens.pageBgDeep);
      root.style.setProperty("--panel-bg-strong", tokens.panelStrong);
      root.style.setProperty("--panel-border", tokens.panelBorder);
      root.style.setProperty("--accent-deep", tokens.accentDeep);
      root.style.setProperty("--accent-cool", tokens.accentCool);
      root.style.setProperty("color-scheme", tokens.colorScheme || "");
    },

    buildReferencePreview(themeId, schemeId, customColor = DEFAULT_CUSTOM_COLOR) {
      const theme = themeById(themeId);
      const scheme = schemeById(themeId, schemeId);
      return this.buildPreviewDocument(
        buildReferenceFixture(theme.id, scheme.id, customColor),
        `${theme.name} ${scheme.name} reference`
      );
    },

    selectTheme(themeId) {
      this.selectedTheme = themeId;
      this.selectedScheme = themeById(themeId).schemes[0]?.id || "";
      this.applySelectedThemeToDraft();
      this.saveState();
      this.scrollThemePickerTarget("themeSchemeHeading");
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
      this.scrollThemePickerTarget("themePreviewPanel");
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

    scrollThemePickerTarget(refName) {
      if (this.currentStudioStep !== "theme") {
        return;
      }

      const reducedMotion = window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

      if (this.themeScrollTimer) {
        clearTimeout(this.themeScrollTimer);
        this.themeScrollTimer = 0;
      }

      this.$nextTick(() => {
        this.themeScrollTimer = window.setTimeout(() => {
          this.themeScrollTimer = 0;

          window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
              const target = this.$refs[refName];
              if (!(target instanceof HTMLElement)) {
                return;
              }

              const baseOffset = refName === "themeSchemeHeading" ? 20 : 16;
              const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - baseOffset);

              window.scrollTo({
                top,
                behavior: reducedMotion ? "auto" : "smooth"
              });
            });
          });
        }, reducedMotion ? 0 : 160);
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

    handleDropboxAppKeyInput() {
      this.saveState();
    },

    persistDropboxSession() {
      if (!this.isDropboxConnected) {
        removeSessionValue(DROPBOX_SESSION_KEY);
        return;
      }

      writeSessionJson(DROPBOX_SESSION_KEY, {
        appKey: this.dropboxSessionAppKey,
        refreshToken: this.dropboxRefreshToken
      });
    },

    restoreDropboxSession() {
      const session = readSessionJson(DROPBOX_SESSION_KEY);
      if (!session || typeof session.refreshToken !== "string" || !session.refreshToken) {
        return;
      }

      this.dropboxRefreshToken = session.refreshToken;
      this.dropboxSessionAppKey = typeof session.appKey === "string" ? session.appKey : "";
      if (!this.dropboxAppKey && this.dropboxSessionAppKey) {
        this.dropboxAppKey = this.dropboxSessionAppKey;
      }
    },

    clearDropboxPkceState() {
      removeSessionValue(DROPBOX_PKCE_KEY);
    },

    clearDropboxSession() {
      this.dropboxSessionAppKey = "";
      this.dropboxRefreshToken = "";
      this.dropboxAccessToken = "";
      this.dropboxAccessTokenExpiresAt = 0;
      this.dropboxAction = "";
      this.clearDropboxPkceState();
      removeSessionValue(DROPBOX_SESSION_KEY);
    },

    cleanupDropboxAuthRedirect(returnHash = "#settings") {
      const nextUrl = new URL(window.location.href);
      nextUrl.pathname = getCanonicalAppPath(nextUrl.pathname);
      nextUrl.searchParams.delete("code");
      nextUrl.searchParams.delete("state");
      nextUrl.searchParams.delete("error");
      nextUrl.searchParams.delete("error_description");
      nextUrl.hash = returnHash || "#settings";
      window.history.replaceState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    },

    async fetchDropboxToken(params) {
      const response = await fetch(DROPBOX_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(params).toString()
      });

      const payload = await readJsonOrText(response);
      if (!response.ok) {
        throw new Error(summarizeDropboxError(payload, `Dropbox auth failed with ${response.status}.`));
      }

      return payload || {};
    },

    async beginDropboxAuth() {
      const appKey = this.effectiveDropboxAppKey;
      if (!appKey) {
        this.statusMessage = "Add a Dropbox app key before connecting.";
        return;
      }

      if (!sessionStorageAvailable()) {
        this.statusMessage = "Session storage is unavailable, so Dropbox PKCE cannot complete in this browser.";
        return;
      }

      this.dropboxAction = "connect";

      try {
        const verifier = createRandomToken(64);
        const challenge = await sha256Base64Url(verifier);
        const state = createRandomToken(24);
        const returnHash = window.location.hash || "#settings";
        writeSessionJson(DROPBOX_PKCE_KEY, {
          verifier,
          state,
          appKey,
          returnHash
        });

        const authorizeUrl = new URL(DROPBOX_AUTHORIZE_URL);
        authorizeUrl.searchParams.set("client_id", appKey);
        authorizeUrl.searchParams.set("response_type", "code");
        authorizeUrl.searchParams.set("redirect_uri", this.dropboxRedirectUri);
        authorizeUrl.searchParams.set("token_access_type", "offline");
        authorizeUrl.searchParams.set("scope", DROPBOX_SCOPES.join(" "));
        authorizeUrl.searchParams.set("include_granted_scopes", "user");
        authorizeUrl.searchParams.set("code_challenge", challenge);
        authorizeUrl.searchParams.set("code_challenge_method", "S256");
        authorizeUrl.searchParams.set("state", state);

        this.statusMessage = "Redirecting to Dropbox for approval...";
        window.location.assign(authorizeUrl.toString());
      } catch (error) {
        console.error(error);
        this.dropboxAction = "";
        this.statusMessage = error instanceof Error ? error.message : "Dropbox connection could not start.";
      }
    },

    async handleDropboxOAuthCallback() {
      const currentUrl = new URL(window.location.href);
      const code = currentUrl.searchParams.get("code");
      const returnedState = currentUrl.searchParams.get("state");
      const oauthError = currentUrl.searchParams.get("error");
      const oauthErrorDescription = currentUrl.searchParams.get("error_description");

      if (!code && !oauthError) {
        return false;
      }

      const pkceState = readSessionJson(DROPBOX_PKCE_KEY) || {};
      const returnHash = typeof pkceState.returnHash === "string" && pkceState.returnHash
        ? pkceState.returnHash
        : "#settings";

      if (oauthError) {
        this.clearDropboxPkceState();
        this.cleanupDropboxAuthRedirect(returnHash);
        this.statusMessage = oauthErrorDescription
          ? `Dropbox connection was canceled: ${oauthErrorDescription}.`
          : "Dropbox connection was canceled.";
        return true;
      }

      if (!pkceState.verifier || !pkceState.appKey || returnedState !== pkceState.state) {
        this.clearDropboxPkceState();
        this.cleanupDropboxAuthRedirect(returnHash);
        this.statusMessage = "Dropbox sign-in could not be verified. Start the connection again from Settings.";
        return true;
      }

      this.dropboxAction = "connect";

      try {
        const tokenPayload = await this.fetchDropboxToken({
          code,
          grant_type: "authorization_code",
          redirect_uri: this.dropboxRedirectUri,
          code_verifier: pkceState.verifier,
          client_id: pkceState.appKey
        });

        if (typeof tokenPayload.refresh_token !== "string" || !tokenPayload.refresh_token) {
          throw new Error("Dropbox did not return a refresh token. Make sure offline access is enabled for this app.");
        }

        this.dropboxSessionAppKey = pkceState.appKey;
        this.dropboxAppKey = pkceState.appKey;
        this.dropboxRefreshToken = tokenPayload.refresh_token;
        this.dropboxAccessToken = typeof tokenPayload.access_token === "string" ? tokenPayload.access_token : "";
        this.dropboxAccessTokenExpiresAt = Date.now() + (Math.max(Number(tokenPayload.expires_in) || 0, 60) * 1000);
        this.persistDropboxSession();
        this.clearDropboxPkceState();
        this.cleanupDropboxAuthRedirect(returnHash);
        this.dropboxAction = "";
        this.statusMessage = "Dropbox connected for this browser session.";
        return true;
      } catch (error) {
        console.error(error);
        this.clearDropboxSession();
        this.cleanupDropboxAuthRedirect(returnHash);
        this.statusMessage = error instanceof Error ? error.message : "Dropbox connection failed.";
        return true;
      }
    },

    async ensureDropboxAccessToken() {
      if (!this.isDropboxConnected) {
        throw new Error("Connect Dropbox before using backup or restore.");
      }

      if (this.dropboxAccessToken && this.dropboxAccessTokenExpiresAt - Date.now() > 60_000) {
        return this.dropboxAccessToken;
      }

      const tokenPayload = await this.fetchDropboxToken({
        grant_type: "refresh_token",
        refresh_token: this.dropboxRefreshToken,
        client_id: this.dropboxSessionAppKey || this.effectiveDropboxAppKey
      });

      if (typeof tokenPayload.access_token !== "string" || !tokenPayload.access_token) {
        throw new Error("Dropbox did not return a usable access token.");
      }

      this.dropboxAccessToken = tokenPayload.access_token;
      this.dropboxAccessTokenExpiresAt = Date.now() + (Math.max(Number(tokenPayload.expires_in) || 0, 60) * 1000);
      return this.dropboxAccessToken;
    },

    async backupLibraryToDropbox() {
      if (this.dropboxIsBusy) {
        return;
      }

      this.dropboxAction = "backup";

      try {
        const accessToken = await this.ensureDropboxAccessToken();
        const backupPayload = JSON.stringify({
          version: 1,
          exportedAt: new Date().toISOString(),
          library: this.normalizeLibraryPayload(this.library)
        }, null, 2);
        const response = await fetch(`${DROPBOX_CONTENT_API_BASE}/files/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/octet-stream",
            "Dropbox-API-Arg": JSON.stringify({
              path: DROPBOX_BACKUP_PATH,
              mode: "overwrite",
              autorename: false,
              mute: true,
              strict_conflict: false
            })
          },
          body: backupPayload
        });

        const payload = await readJsonOrText(response);
        if (!response.ok) {
          throw new Error(summarizeDropboxError(payload, `Dropbox backup failed with ${response.status}.`));
        }

        this.dropboxLastBackupAt = payload?.server_modified || new Date().toISOString();
        const toolCount = this.library.length;
        this.statusMessage = `Dropbox backup saved${toolCount ? ` for ${toolCount} tool${toolCount === 1 ? "" : "s"}` : ""}.`;
      } catch (error) {
        console.error(error);
        this.statusMessage = error instanceof Error ? error.message : "Dropbox backup failed.";
      } finally {
        this.dropboxAction = "";
      }
    },

    async restoreLibraryFromDropbox() {
      if (this.dropboxIsBusy) {
        return;
      }

      this.dropboxAction = "restore";

      try {
        const accessToken = await this.ensureDropboxAccessToken();
        const response = await fetch(`${DROPBOX_CONTENT_API_BASE}/files/download`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Dropbox-API-Arg": JSON.stringify({
              path: DROPBOX_BACKUP_PATH
            })
          }
        });

        const metadataHeader = response.headers.get("Dropbox-API-Result");
        const metadata = metadataHeader ? JSON.parse(metadataHeader) : null;
        const rawBody = await response.text();

        if (!response.ok) {
          let errorPayload = null;
          if (rawBody) {
            try {
              errorPayload = JSON.parse(rawBody);
            } catch (error) {
              errorPayload = rawBody;
            }
          }
          if (metadata?.error?.path?.[".tag"] === "not_found" || errorPayload?.error?.path?.[".tag"] === "not_found") {
            throw new Error("No Dropbox backup file was found yet.");
          }
          throw new Error(summarizeDropboxError(errorPayload || metadata, `Dropbox restore failed with ${response.status}.`));
        }

        const parsed = rawBody ? JSON.parse(rawBody) : null;
        const rawLibrary = Array.isArray(parsed) ? parsed : parsed?.library;
        if (!Array.isArray(rawLibrary)) {
          throw new Error("Dropbox backup file is valid JSON, but it does not contain a library.");
        }

        const nextLibrary = this.normalizeLibraryPayload(rawLibrary);
        const toolCount = nextLibrary.length;
        const restoreLabel = metadata?.server_modified ? ` from ${this.formatTimestamp(metadata.server_modified)}` : "";
        const confirmed = window.confirm(`Restore ${toolCount} saved tool${toolCount === 1 ? "" : "s"}${restoreLabel} and replace the current library?`);
        if (!confirmed) {
          this.statusMessage = "Dropbox restore canceled.";
          return;
        }

        await this.saveLibrary(nextLibrary);
        this.activeLibraryId = sortLibraryEntries(nextLibrary)[0]?.id || "";
        this.dropboxLastRestoreAt = metadata?.server_modified || new Date().toISOString();
        this.currentEditingId = "";
        this.currentEditingSourceTitle = "";
        this.saveState();

        if (this.currentView === "library") {
          this.goToLibrary(this.activeLibraryId);
        } else {
          this.renderActiveLibraryPreview();
        }

        this.statusMessage = `Restored ${toolCount} saved tool${toolCount === 1 ? "" : "s"} from Dropbox.`;
      } catch (error) {
        console.error(error);
        this.statusMessage = error instanceof Error ? error.message : "Dropbox restore failed.";
      } finally {
        this.dropboxAction = "";
      }
    },

    disconnectDropbox() {
      this.clearDropboxSession();
      this.statusMessage = "Dropbox disconnected.";
    },

    async boot() {
      await this.loadFrameworkCss();
      await this.loadAlpineRuntime();
      await this.loadLucideRuntime();
      await this.loadLibrary();
      this.restoreState();
      this.restoreDropboxSession();
      this.applyAppTheme();
      window.addEventListener("message", (event) => this.handlePreviewEditorMessage(event));
      window.addEventListener("hashchange", () => void this.handleLocationChange());
      window.addEventListener("popstate", () => void this.handleLocationChange());
      const handledDropboxCallback = await this.handleDropboxOAuthCallback();

      const hasIncomingSharedImport = await this.loadPendingSharedImportFromLocation();

      if (!this.rawResponse.trim()) {
        if (!hasIncomingSharedImport && !handledDropboxCallback) {
          this.loadExample(true);
        }
      } else {
        this.importResponse(true);
      }

      this.syncRouteFromLocation();
      if (hasIncomingSharedImport && this.pendingSharedImport) {
        this.statusMessage = `Shared tool "${this.pendingSharedImport.app.title}" is ready to review.`;
      }
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
        this.normalizedAppHtml = cleanEditorListArtifacts(data.html);
        this.rawResponse = this.normalizedAppHtml;
        const meta = extractAppMetadata(
          this.normalizedAppHtml,
          this.importedTheme || this.selectedTheme,
          this.importedScheme || this.selectedScheme
        );
        this.importedTheme = meta.themeId;
        this.importedScheme = meta.schemeId;
        if (meta.customColor) {
          this.selectedCustomColor = meta.customColor;
        }
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
      void this.refreshCurrentShareLink();
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
      const sharedImportToken = getSharedImportTokenFromPath();
      const hash = window.location.hash.replace(/^#/, "");
      const searchParams = new URLSearchParams(window.location.search);
      const wantsFullscreen = searchParams.get("fullscreen") === "1";

      if (sharedImportToken) {
        this.currentView = "import";
        this.setLibraryModalOpen(false);
        return;
      }

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
      nextUrl.pathname = getCanonicalAppPath(nextUrl.pathname);
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

    rewriteHostedImportRedirect() {
      const url = new URL(window.location.href);
      const redirectedRoute = url.searchParams.get(SHARED_IMPORT_REDIRECT_PARAM);
      if (!redirectedRoute) {
        return false;
      }

      url.searchParams.delete(SHARED_IMPORT_REDIRECT_PARAM);
      const nextRoute = redirectedRoute.startsWith("/") ? redirectedRoute : `/${redirectedRoute}`;
      url.pathname = `${getHostedBasePath(url.pathname)}${nextRoute}`.replace(/\/{2,}/g, "/");
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      return true;
    },

    async handleLocationChange() {
      this.rewriteHostedImportRedirect();
      await this.loadPendingSharedImportFromLocation();
      this.syncRouteFromLocation();
    },

    async loadPendingSharedImportFromLocation() {
      this.rewriteHostedImportRedirect();

      const token = getSharedImportTokenFromPath();
      if (!token) {
        this.pendingSharedImport = null;
        this.activeSharedImportToken = "";
        return false;
      }

      if (token === this.activeSharedImportToken && this.pendingSharedImport) {
        return true;
      }

      try {
        const rawSpec = await decompressBase64UrlToText(token);
        const spec = normalizeSharedAppSpec(rawSpec);
        if (!spec) {
          throw new Error("Shared import payload is invalid.");
        }

        this.pendingSharedImport = spec;
        this.activeSharedImportToken = token;
        this.currentView = "import";
        this.setLibraryModalOpen(false);
        this.statusMessage = `Shared tool "${spec.app.title}" is ready to review.`;
        return true;
      } catch (error) {
        console.error(error);
        this.pendingSharedImport = null;
        this.activeSharedImportToken = "";
        const nextUrl = new URL(window.location.href);
        nextUrl.pathname = getCanonicalAppPath(nextUrl.pathname);
        nextUrl.hash = "#studio";
        this.skipStudioResetOnNextEntry = true;
        window.history.replaceState(null, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
        this.statusMessage = "Shared link could not be opened.";
        return false;
      }
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
      this.selectedCustomColor = extractCustomColorFromHtml(app.source || app.html) || this.currentSelectedCustomColor;
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
        const response = await fetch(this.withAssetStamp("./framework.css"), { cache: "no-store" });
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
        const response = await fetch(this.withAssetStamp(ALPINE_RUNTIME_PATH), { cache: "no-store" });
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
        const response = await fetch(this.withAssetStamp(LUCIDE_RUNTIME_PATH), { cache: "no-store" });
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
      this.selectedCustomColor = DEFAULT_CUSTOM_COLOR;
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
      this.rawResponse = buildExampleSnippet(this.selectedTheme, this.selectedScheme, this.currentSelectedCustomColor);
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
        this.saveState();
        return;
      }

      const parser = new DOMParser();
      const draft = parser.parseFromString(`<body>${this.normalizedAppHtml}</body>`, "text/html");
      const nextThemeId = themeById(this.selectedTheme).id;
      const nextSchemeId = schemeById(nextThemeId, this.selectedScheme).id;
      const nextCustomColor = nextSchemeId === CUSTOM_SCHEME_ID ? this.currentSelectedCustomColor : "";
      const root = draft.body.querySelector(`[${APP_MARKER}]`);

      let nextHtml = "";
      if (root) {
        root.setAttribute(THEME_MARKER, nextThemeId);
        root.setAttribute(SCHEME_MARKER, nextSchemeId);
        applyCustomThemeToElement(root, nextThemeId, nextSchemeId, nextCustomColor);
        nextHtml = draft.body.innerHTML.trim();
      } else {
        nextHtml = this.wrapWithRoot(draft.body.innerHTML.trim(), nextThemeId, nextSchemeId, nextCustomColor);
      }

      const meta = extractAppMetadata(nextHtml, nextThemeId, nextSchemeId);
      this.normalizedAppHtml = nextHtml;
      this.rawResponse = nextHtml;
      this.importedTheme = nextThemeId;
      this.importedScheme = nextSchemeId;
      if (meta.customColor) {
        this.selectedCustomColor = meta.customColor;
      }
      this.importedAppTitle = meta.title;
      this.applyAppTitleToDraft();
      this.applyAppTagsToDraft();
      this.statusMessage = `Tool theme updated to ${themeById(nextThemeId).name} · ${schemeById(nextThemeId, nextSchemeId).name}.`;
      this.saveState();
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
      if (result.customColor) {
        this.selectedCustomColor = result.customColor;
      }
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
          text: "Removed an external script reference. Generated tools are expected to run on the built-in Alpine and Lucide runtime plus inline code only."
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
      const shouldPreferSelectedCustomTheme = !isEditingWithThemeOverride && selectedSchemeId === CUSTOM_SCHEME_ID;

      let themeId = pastedThemeId;

      if (isEditingWithThemeOverride) {
        themeId = selectedThemeId;
        if (pastedThemeId && pastedThemeId !== selectedThemeId) {
          issues.push({
            level: "info",
            text: `Editing mode kept the selected theme ${selectedThemeId} instead of the pasted ${THEME_MARKER} value ${pastedThemeId}.`
          });
        }
      } else if (shouldPreferSelectedCustomTheme) {
        themeId = selectedThemeId;
      } else if (!themeId) {
        themeId = selectedThemeId;
        issues.push({
          level: "warning",
          text: `No valid ${THEME_MARKER} was found. Falling back to ${themeId}.`
        });
      }

      let schemeId = normalizeSchemeId(themeId, root?.getAttribute(SCHEME_MARKER) || "");
      const pastedCustomColor = extractCustomColorFromElement(root);

      if (isEditingWithThemeOverride) {
        const pastedSchemeId = normalizeSchemeId(themeId, root?.getAttribute(SCHEME_MARKER) || "");
        schemeId = selectedSchemeId;
        if (pastedSchemeId !== selectedSchemeId) {
          issues.push({
            level: "info",
            text: `Editing mode kept the selected scheme ${selectedSchemeId} instead of the pasted ${SCHEME_MARKER} value ${pastedSchemeId}.`
          });
        }
      } else if (shouldPreferSelectedCustomTheme) {
        schemeId = selectedSchemeId;
      } else if (root?.getAttribute(SCHEME_MARKER) !== schemeId) {
        issues.push({
          level: "warning",
          text: `No valid ${SCHEME_MARKER} was found for ${themeId}. Falling back to ${schemeId}.`
        });
      }

      let customColor = "";
      if (schemeId === CUSTOM_SCHEME_ID) {
        if (isEditingWithThemeOverride) {
          customColor = this.currentSelectedCustomColor;
          if (pastedCustomColor && pastedCustomColor !== customColor) {
            issues.push({
              level: "info",
              text: `Editing mode kept the selected custom color ${customColor} instead of the pasted ${CUSTOM_COLOR_MARKER} value ${pastedCustomColor}.`
            });
          }
        } else {
          customColor = pastedCustomColor || this.currentSelectedCustomColor;
        }
      }

      let html = body.innerHTML.trim();

      if (!body.querySelector(`[${APP_MARKER}]`)) {
        issues.push({
          level: "warning",
          text: `No ${APP_MARKER} root was found. The runtime wrapped the pasted fragment automatically.`
        });
        html = this.wrapWithRoot(html, themeId, schemeId, customColor);
      } else {
        const runtimeRoot = body.querySelector(`[${APP_MARKER}]`);
        runtimeRoot.setAttribute(THEME_MARKER, themeId);
        runtimeRoot.setAttribute(SCHEME_MARKER, schemeId);
        customColor = applyCustomThemeToElement(runtimeRoot, themeId, schemeId, customColor);
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

      return { html, issues, themeId, schemeId, summary, meta, customColor };
    },

    wrapWithRoot(innerHtml, themeId = this.selectedTheme, schemeId = this.selectedScheme, customColor = this.currentSelectedCustomColor) {
      const fallback = "<section class=\"empty-state stack\"><h1>Paste a tool to get started.</h1><p class=\"muted\">The preview will render here once you import a response.</p></section>";
      return `<main ${APP_MARKER} ${THEME_MARKER}="${themeId}" ${SCHEME_MARKER}="${schemeId}"${buildRootThemeAttributes(themeId, schemeId, customColor)} class="app-shell stack">${innerHtml || fallback}</main>`;
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

      void this.refreshActiveLibraryShareLink();
    },

    getStandaloneDocument() {
      const appHtml = this.normalizedAppHtml || this.wrapWithRoot("");
      return this.buildPreviewDocument(appHtml, this.draftTitle);
    },

    buildStandaloneForLibraryApp(appId) {
      const app = this.library.find((entry) => entry.id === appId);
      return app ? this.buildPreviewDocument(app.html, app.title) : "";
    },

    buildSharedSpecFromEntry(entry) {
      if (!entry || typeof entry.html !== "string" || !entry.html.trim()) {
        return null;
      }

      return entry.html;
    },

    buildCurrentShareSpec() {
      if (!this.normalizedAppHtml) {
        return null;
      }

      const meta = extractAppMetadata(
        this.normalizedAppHtml,
        this.importedTheme || this.selectedTheme,
        this.importedScheme || this.selectedScheme
      );
      const manualTags = normalizeTags(this.appTags);

      return this.buildSharedSpecFromEntry({
        title: this.appName.trim() || meta.title,
        summary: meta.summary,
        tags: manualTags.length ? manualTags : meta.tags,
        themeId: meta.themeId,
        schemeId: meta.schemeId,
        source: this.rawResponse.trim() || this.normalizedAppHtml,
        html: this.normalizedAppHtml
      });
    },

    async createShareLink(spec) {
      if (!spec) {
        throw new Error("Share spec is missing.");
      }

      const token = await compressTextToBase64Url(spec);
      return `${getShareBaseUrl()}${SHARED_IMPORT_ROUTE}/${token}`;
    },

    async refreshCurrentShareLink() {
      const spec = this.buildCurrentShareSpec();
      const source = spec || "";
      const refreshToken = ++this.currentShareLinkRefreshToken;

      if (!source) {
        this.currentShareLink = "";
        this.currentShareLinkSource = "";
        return;
      }

      if (this.currentShareLink && this.currentShareLinkSource === source) {
        return;
      }

      try {
        const link = await this.createShareLink(spec);
        if (refreshToken !== this.currentShareLinkRefreshToken) {
          return;
        }

        this.currentShareLink = link;
        this.currentShareLinkSource = source;
      } catch (error) {
        console.error(error);
        if (refreshToken !== this.currentShareLinkRefreshToken) {
          return;
        }

        this.currentShareLink = "";
        this.currentShareLinkSource = "";
      }
    },

    async refreshActiveLibraryShareLink() {
      const app = this.activeLibraryApp;
      const source = app?.html?.trim() || "";
      const refreshToken = ++this.activeLibraryShareLinkRefreshToken;

      if (!source) {
        this.activeLibraryShareLink = "";
        this.activeLibraryShareLinkSource = "";
        return;
      }

      if (this.activeLibraryShareLink && this.activeLibraryShareLinkSource === source) {
        return;
      }

      try {
        const link = await this.createShareLink(source);
        if (refreshToken !== this.activeLibraryShareLinkRefreshToken) {
          return;
        }

        this.activeLibraryShareLink = link;
        this.activeLibraryShareLinkSource = source;
      } catch (error) {
        console.error(error);
        if (refreshToken !== this.activeLibraryShareLinkRefreshToken) {
          return;
        }

        this.activeLibraryShareLink = "";
        this.activeLibraryShareLinkSource = "";
      }
    },

    async copyPrompt() {
      await this.copyText(this.promptText, "Prompt copied.");
    },

    async copyStandalone() {
      await this.copyText(this.getStandaloneDocument(), "Standalone HTML copied.");
    },

    async copyShareLink() {
      if (!this.buildCurrentShareSpec()) {
        this.statusMessage = "Import a generated tool before sharing.";
        return;
      }

      if (!this.currentShareLink) {
        void this.refreshCurrentShareLink();
        this.statusMessage = "Preparing share link. Tap again in a moment.";
        return;
      }

      await this.copyText(this.currentShareLink, "Share link copied.");
    },

    async copyLibraryShareLink(appId) {
      const app = this.library.find((entry) => entry.id === appId);
      if (!app) {
        return;
      }

      if (this.activeLibraryId === appId && this.activeLibraryShareLink) {
        await this.copyText(this.activeLibraryShareLink, `Share link for "${app.title}" copied.`);
        return;
      }

      void this.refreshActiveLibraryShareLink();
      this.statusMessage = `Preparing share link for "${app.title}". Tap again in a moment.`;
    },

    confirmSharedImport() {
      const spec = this.pendingSharedImport;
      if (!spec) {
        return;
      }

      if (spec.app.themeId) {
        this.selectedTheme = themeById(spec.app.themeId).id;
      }
      if (spec.app.themeId && spec.app.schemeId) {
        this.selectedScheme = normalizeSchemeId(spec.app.themeId, spec.app.schemeId);
      }

      this.currentEditingId = "";
      this.currentEditingSourceTitle = "";
      this.appName = spec.app.title;
      this.appTags = spec.app.tags.join(", ");
      this.rawResponse = spec.app.source || spec.app.html;
      this.currentStudioStep = "preview";
      this.pendingSharedImport = null;
      this.activeSharedImportToken = "";
      this.importResponse();
      this.statusMessage = `Imported shared tool "${spec.app.title}".`;
      this.skipStudioResetOnNextEntry = true;
      this.goToStudio();
    },

    cancelSharedImport() {
      const title = this.pendingSharedImport?.app?.title || "shared tool";
      this.pendingSharedImport = null;
      this.activeSharedImportToken = "";
      this.statusMessage = `Skipped importing "${title}".`;
      this.skipStudioResetOnNextEntry = true;
      this.goToStudio();
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

    readLocalLibrary() {
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

    shouldForceLocalLibraryStorage() {
      const hostname = window.location.hostname.toLowerCase();
      return window.location.protocol === "file:" || hostname.endsWith(".github.io");
    },

    withAssetStamp(path) {
      const normalizedPath = String(path || "");
      const absolutePath = normalizedPath.startsWith("/")
        ? normalizedPath
        : `${getAssetBasePath()}${normalizedPath.startsWith(".") ? normalizedPath.slice(1) : `/${normalizedPath}`}`;
      if (!ASSET_STAMP) {
        return absolutePath;
      }

      const separator = absolutePath.includes("?") ? "&" : "?";
      return `${absolutePath}${separator}v=${encodeURIComponent(ASSET_STAMP)}`;
    },

    writeLocalLibrary(nextLibrary = this.library) {
      const library = this.normalizeLibraryPayload(nextLibrary);
      localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
      this.library = library;
      return library;
    },

    async saveLibraryToApi(nextLibrary = this.library) {
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
      localStorage.setItem(LIBRARY_KEY, JSON.stringify(library));
      this.library = library;
      return library;
    },

    async saveLibrary(nextLibrary = this.library) {
      if (this.shouldForceLocalLibraryStorage()) {
        this.activeLibraryStorage = LIBRARY_STORAGE_LOCAL;
        return this.writeLocalLibrary(nextLibrary);
      }

      if (this.activeLibraryStorage === LIBRARY_STORAGE_LOCAL) {
        return this.writeLocalLibrary(nextLibrary);
      }

      try {
        const library = await this.saveLibraryToApi(nextLibrary);
        this.activeLibraryStorage = LIBRARY_STORAGE_API;
        return library;
      } catch (error) {
        this.activeLibraryStorage = LIBRARY_STORAGE_LOCAL;
        return this.writeLocalLibrary(nextLibrary);
      }
    },

    async loadLibraryFromApi() {
      const response = await fetch(LIBRARY_API_PATH, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Library load failed with ${response.status}`);
      }

      const payload = await response.json();
      return this.normalizeLibraryPayload(payload.library);
    },

    async loadLibrary() {
      const localLibrary = this.readLocalLibrary();

      if (this.shouldForceLocalLibraryStorage()) {
        this.activeLibraryStorage = LIBRARY_STORAGE_LOCAL;
        this.library = localLibrary;
        if (window.location.hostname.toLowerCase().endsWith(".github.io")) {
          this.statusMessage = localLibrary.length
            ? "GitHub Pages detected. Loaded the browser library."
            : "GitHub Pages detected. Using browser storage for saved tools.";
        }
        return;
      }

      try {
        const serverLibrary = await this.loadLibraryFromApi();
        this.activeLibraryStorage = LIBRARY_STORAGE_API;

        if (serverLibrary.length) {
          this.library = serverLibrary;
          return;
        }

        if (localLibrary.length) {
          try {
            await this.saveLibraryToApi(localLibrary);
            this.activeLibraryStorage = LIBRARY_STORAGE_API;
            this.statusMessage = "Library restored from this browser and synced to the server.";
          } catch (saveError) {
            this.activeLibraryStorage = LIBRARY_STORAGE_LOCAL;
            this.library = localLibrary;
            this.statusMessage = "Library API unavailable. Using browser storage instead.";
          }
          return;
        }

        this.library = [];
        return;
      } catch (error) {
        this.activeLibraryStorage = LIBRARY_STORAGE_LOCAL;
        this.library = localLibrary;
        if (localLibrary.length) {
          this.statusMessage = "Library API unavailable. Loaded the browser library instead.";
        } else {
          this.statusMessage = "Library API unavailable. Using browser storage instead.";
        }
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
        this.statusMessage = "Library save failed.";
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
      this.statusMessage = existingApp
        ? `Updated "${entry.title}" in ${this.activeLibraryStorage === LIBRARY_STORAGE_LOCAL ? "browser" : "server"} storage.`
        : `Saved "${entry.title}" to ${this.activeLibraryStorage === LIBRARY_STORAGE_LOCAL ? "browser" : "server"} storage.`;
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
        this.statusMessage = "Library delete failed.";
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

      this.statusMessage = `Deleted "${app.title}" from ${this.activeLibraryStorage === LIBRARY_STORAGE_LOCAL ? "browser" : "server"} storage.`;
    },

    saveState() {
      const payload = {
        appTheme: this.appTheme,
        appScheme: this.appScheme,
        appCustomColor: this.appCustomColor,
        selectedTheme: this.selectedTheme,
        selectedScheme: this.selectedScheme,
        selectedCustomColor: this.selectedCustomColor,
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
        dropboxAppKey: this.dropboxAppKey,
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
        if (typeof payload.appCustomColor === "string") {
          this.appCustomColor = normalizeHexColor(payload.appCustomColor, DEFAULT_CUSTOM_COLOR);
        }
        const restoredThemeId = normalizeThemeId(payload.selectedTheme);
        if (restoredThemeId) {
          this.selectedTheme = restoredThemeId;
        }
        if (typeof payload.selectedScheme === "string") {
          this.selectedScheme = normalizeSchemeId(this.selectedTheme, payload.selectedScheme);
        }
        if (typeof payload.selectedCustomColor === "string") {
          this.selectedCustomColor = normalizeHexColor(payload.selectedCustomColor, DEFAULT_CUSTOM_COLOR);
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
        if (typeof payload.dropboxAppKey === "string") {
          this.dropboxAppKey = payload.dropboxAppKey;
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
