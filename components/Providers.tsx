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

export default function Providers({
  children,
  initialLang = "en",
}: {
  children: React.ReactNode;
  initialLang?: Lang;
}) {
  // Defaults match the server-rendered markup to keep hydration stable.
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [theme, setTheme] = useState<Theme>("dark");

  // After mount, adopt any preference set pre-paint (theme) or saved (lang).
  useEffect(() => {
    try {
      const preTheme = document.documentElement.getAttribute("data-theme");
      if (preTheme === "light" || preTheme === "dark") setTheme(preTheme);
      const urlLang = new URLSearchParams(window.location.search).get("lang");
      const savedLang = localStorage.getItem(LANG_KEY);
      const preferredLang =
        urlLang === "ar" || urlLang === "en" ? urlLang : savedLang;
      if (preferredLang === "ar" || preferredLang === "en") {
        setLangState(preferredLang);
      }
    } catch {
      /* storage unavailable — keep defaults */
    }
  }, [initialLang]);

  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.documentElement.setAttribute("data-lang", lang);
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

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
      const url = new URL(window.location.href);
      if (l === "ar") {
        url.searchParams.set("lang", "ar");
      } else {
        url.searchParams.delete("lang");
      }
      const nextUrl = url.pathname + url.search + url.hash;
      const currentUrl =
        window.location.pathname + window.location.search + window.location.hash;
      if (nextUrl !== currentUrl) {
        window.location.assign(nextUrl);
      }
    } catch {
      /* ignore */
    }
  }, []);
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
