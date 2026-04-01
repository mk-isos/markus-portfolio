"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/data/portfolio";

type Theme = "light" | "dark";

type SitePreferencesContextValue = {
  language: Locale;
  setLanguage: (language: Locale) => void;
  theme: Theme;
  toggleTheme: () => void;
};

const LANGUAGE_STORAGE_KEY = "markus:language";
const THEME_STORAGE_KEY = "markus:theme";

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(
  null,
);

const isLocale = (value: string | null): value is Locale =>
  value === "ko" || value === "en";

const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark";

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
};

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Locale>(() => {
    if (typeof window === "undefined") return "ko";
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLocale(storedLanguage) ? storedLanguage : "ko";
  });

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(storedTheme)) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const value = useMemo<SitePreferencesContextValue>(
    () => ({
      language,
      setLanguage,
      theme,
      toggleTheme: () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    [language, theme],
  );

  return (
    <SitePreferencesContext.Provider value={value}>
      {children}
    </SitePreferencesContext.Provider>
  );
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);
  if (!context) {
    throw new Error(
      "useSitePreferences must be used within SitePreferencesProvider",
    );
  }
  return context;
}
