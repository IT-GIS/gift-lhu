"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { dictionary, type LandingDictionary, type Locale } from "./i18n/dictionary";

const STORAGE_KEY = "landing-lang";

type LandingLanguageContextValue = {
  language: Locale;
  selectLanguage: (locale: Locale) => void;
  content: LandingDictionary;
};

const LandingLanguageContext = createContext<LandingLanguageContextValue | null>(null);

export function LandingLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Locale>(() => {
    if (typeof window === "undefined") return "id";
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "en" || stored === "id" ? stored : "id";
  });

  const selectLanguage = useCallback((locale: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    setLanguage(locale);
  }, []);

  return (
    <LandingLanguageContext.Provider value={{ language, selectLanguage, content: dictionary[language] }}>
      {children}
    </LandingLanguageContext.Provider>
  );
}

export function useLandingLanguage() {
  const ctx = useContext(LandingLanguageContext);
  if (!ctx) throw new Error("useLandingLanguage must be used within LandingLanguageProvider");
  return ctx;
}

