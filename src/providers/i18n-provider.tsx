"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { tr, en, type Lang, type Translations } from "@/lib/i18n";
import { setCookie } from "@/lib/utils";

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const I18nContext = createContext<I18nCtx | null>(null);

const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function I18nProvider({ children, initialLang }: { children: ReactNode; initialLang: Lang }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lx-lang", l);
    setCookie("lx-lang", l, LANG_COOKIE_MAX_AGE);
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
