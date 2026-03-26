"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { THEMES, DEFAULT_THEME, type ThemeId } from "@/lib/themes";

interface ThemeCtx {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  /** Hex color set after login from the user's favourite team */
  teamAccent: string | null;
  setTeamAccent: (hex: string | null) => void;
}

const ThemeContext = createContext<ThemeCtx | null>(null);

function applyTheme(id: ThemeId, teamAccent: string | null) {
  const root = document.documentElement;
  root.setAttribute("data-theme", id);

  if (!teamAccent) {
    // CSS handles it via [data-theme] selectors — remove inline overrides
    root.style.removeProperty("--theme-accent");
    root.style.removeProperty("--theme-accent-rgb");
  }

  if (teamAccent) {
    // Parse hex → rgb for rgba() usage
    const r = parseInt(teamAccent.slice(1, 3), 16);
    const g = parseInt(teamAccent.slice(3, 5), 16);
    const b = parseInt(teamAccent.slice(5, 7), 16);
    root.style.setProperty("--theme-accent", teamAccent);
    root.style.setProperty("--theme-accent-rgb", `${r},${g},${b}`);
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    const saved = localStorage.getItem('lx-theme') as ThemeId | null;
    return saved && THEMES.some((t) => t.id === saved) ? saved : DEFAULT_THEME;
  });

  const [teamAccent, setTeamAccentState] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('lx-team-accent');
  });

  useEffect(() => {
    applyTheme(theme, teamAccent);
  }, [theme, teamAccent]);

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
    setTeamAccentState(null);
    localStorage.setItem("lx-theme", id);
    localStorage.removeItem("lx-team-accent");
    applyTheme(id, null);
  };

  const setTeamAccent = (hex: string | null) => {
    setTeamAccentState(hex);
    if (hex) {
      localStorage.setItem("lx-team-accent", hex);
      applyTheme(theme, hex);
    } else {
      localStorage.removeItem("lx-team-accent");
      applyTheme(theme, null);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, teamAccent, setTeamAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
