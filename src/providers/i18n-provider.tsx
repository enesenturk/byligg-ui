"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { tr, en, type Lang, type Translations } from "@/lib/i18n";

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  useEffect(() => {
    const saved = localStorage.getItem("lx-lang") as Lang | null;
    if (saved === "tr" || saved === "en") {
      setLangState(saved);
    } else {
      // Auto-detect from browser
      const detected = navigator.language.toLowerCase().startsWith("tr")
        ? "tr"
        : "en";
      setLangState(detected);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lx-lang", l);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: lang === "tr" ? tr : en }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
