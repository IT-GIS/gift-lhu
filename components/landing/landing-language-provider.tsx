"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionary, type LandingDictionary, type Locale } from "./i18n/dictionary";

const STORAGE_KEY = "landing-lang";

type LandingLanguageContextValue = {
  language: Locale;
  selectLanguage: (locale: Locale) => void;
  content: LandingDictionary;
};

const LandingLanguageContext = createContext<LandingLanguageContextValue | null>(null);

export function LandingLanguageProvider({ children }: { children: ReactNode }) {
  // Always initialize with server default "id" so SSR and first client render match.
  // Read localStorage in useEffect to avoid React hydration error #418.
  const [language, setLanguage] = useState<Locale>("id");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "id") {
      setLanguage(stored);
    }
  }, []);

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

