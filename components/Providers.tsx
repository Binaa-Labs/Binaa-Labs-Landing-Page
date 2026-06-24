"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
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

const THEME_KEY = "binaa-theme";

export default function Providers({
  children,
  initialLang = "en",
}: {
  children: React.ReactNode;
  initialLang?: Lang;
}) {
  // Language is fixed by the route (`/` = en, `/ar` = ar) and rendered on the
  // server, so it never changes within a mounted page — switching languages is
  // a route navigation, handled in setLang below.
  const lang = initialLang;
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";
  const router = useRouter();

  const [theme, setTheme] = useState<Theme>("dark");

  // Adopt the pre-paint theme (set by the boot script) once mounted.
  useEffect(() => {
    const preTheme = document.documentElement.getAttribute("data-theme");
    if (preTheme === "light" || preTheme === "dark") setTheme(preTheme);
  }, []);

  // Keep <html> attributes in sync. On a client navigation between `/` and
  // `/ar` the root layout does not re-render, so the language route updates
  // them here; this matches the server output on a fresh load.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const setLang = useCallback(
    (l: Lang) => {
      if (l === lang) return;
      // Don't flip <html dir> eagerly here: the hero canvas reads it every
      // frame and would jump ahead of the text. Let the effect below update
      // lang/dir when the new render commits so the cube and copy switch as one.
      // Keep any query (e.g. UTM params) and the section hash across the switch.
      const target =
        (l === "ar" ? "/ar" : "/") +
        window.location.search +
        window.location.hash;
      // scroll: false preserves the reader's position across the switch.
      router.push(target, { scroll: false });
    },
    [lang, router]
  );

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
