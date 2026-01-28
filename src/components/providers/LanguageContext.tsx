"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { translations, Language, TranslationKeys } from "@/lib/translations";

/**
 * Language Context Type
 */
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

/**
 * Create Context
 */
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Storage key for localStorage
 */
const STORAGE_KEY = "linso-language";

/**
 * LanguageProvider Component
 * Wraps the application and provides language state
 */
interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved && (saved === "en" || saved === "zh")) {
      setLanguageState(saved);
    }
    setIsHydrated(true);
  }, []);

  // Set language and persist to localStorage
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  // Get current translations
  const t = translations[language];

  // Prevent hydration mismatch by rendering nothing until hydrated
  if (!isHydrated) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * useLanguage Hook
 * Access the language context from any component
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
