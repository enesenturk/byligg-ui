export type ThemeId = "sapphire" | "nature" | "atletik" | "midnight" | "ela";

export interface Theme {
  id: ThemeId;
  name: { tr: string; en: string };
  accent: string;
  accentRgb: string;
  /** Tailwind gradient classes for the swatch preview */
  swatch: string;
}

export const THEMES: Theme[] = [
  {
    id: "sapphire",
    name: { tr: "Safir Gece", en: "Sapphire Night" },
    accent: "#3b82f6",
    accentRgb: "59,130,246",
    swatch: "from-blue-500 to-violet-500",
  },
  {
    id: "nature",
    name: { tr: "Kıyı", en: "Coast" },
    accent: "#22d3ee",
    accentRgb: "34,211,238",
    swatch: "from-cyan-400 to-green-400",
  },
  {
    id: "atletik",
    name: { tr: "Atletik", en: "Athletic" },
    accent: "#f97316",
    accentRgb: "249,115,22",
    swatch: "from-orange-500 to-slate-300",
  },
  {
    id: "midnight",
    name: { tr: "Gece Moru", en: "Midnight Purple" },
    accent: "#9333ea",
    accentRgb: "147,51,234",
    swatch: "from-purple-600 to-slate-100",
  },
  {
    id: "ela",
    name: { tr: "Ela", en: "Hazel" },
    accent: "#c084fc",
    accentRgb: "192,132,252",
    swatch: "from-purple-400 to-lime-400",
  },
];

export const DEFAULT_THEME: ThemeId = "sapphire";
