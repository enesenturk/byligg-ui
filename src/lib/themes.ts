export type ThemeId = "sapphire" | "ivory" | "anthracite" | "linen";

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
    id: "ivory",
    name: { tr: "Adaçayı", en: "Sage" },
    accent: "#4A9478",
    accentRgb: "74,148,120",
    swatch: "from-emerald-500 to-emerald-300",
  },
  {
    id: "anthracite",
    name: { tr: "Nar", en: "Garnet" },
    accent: "#E8112D",
    accentRgb: "232,17,45",
    swatch: "from-red-600 to-white",
  },
  {
    id: "linen",
    name: { tr: "Şakayık", en: "Peony" },
    accent: "#7C3AED",
    accentRgb: "124,58,237",
    swatch: "from-pink-400 to-violet-600",
  },
];

export const DEFAULT_THEME: ThemeId = "sapphire";
