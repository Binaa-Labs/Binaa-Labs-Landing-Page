"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dictionaries, type Dict, type Lang } from "@/lib/i18n";

type Theme = "dark" | "light";

interface SiteContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: Dict;
  dir: "ltr" | "rtl";
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within <Providers>");
  return ctx;
}

const LANG_KEY = "binaa-lang";
const THEME_KEY = "binaa-theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Defaults match the server-rendered markup to keep hydration stable.
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");

  // After mount, adopt any preference set pre-paint (theme) or saved (lang).
  useEffect(() => {
    try {
      const preTheme = document.documentElement.getAttribute("data-theme");
      if (preTheme === "light" || preTheme === "dark") setTheme(preTheme);
      const savedLang = localStorage.getItem(LANG_KEY);
      if (savedLang === "ar" || savedLang === "en") setLangState(savedLang);
    } catch {
      /* storage unavailable — keep defaults */
    }
  }, []);

  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang, dir]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleTheme = useCallback(
    () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
    []
  );

  const value = useMemo<SiteContextValue>(
    () => ({ lang, setLang, theme, toggleTheme, t: dictionaries[lang], dir }),
    [lang, theme, dir, setLang, toggleTheme]
  );

  return (
    <SiteContext.Provider value={value}>
      <div className="root" dir={dir}>
        {children}
      </div>
    </SiteContext.Provider>
  );
}
