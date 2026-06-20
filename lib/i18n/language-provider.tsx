'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isLocale,
  resolveLocale,
  type Locale,
} from './locales';
import { dictionaries, type Messages } from './messages';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Typed message dictionary for the active locale. Access as `t.section.key`. */
  t: Messages;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // On mount, restore stored locale or fall back to the browser language.
  useEffect(() => {
    let next: Locale = DEFAULT_LOCALE;
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      next = stored && isLocale(stored) ? stored : resolveLocale(navigator.language);
    } catch {
      next = resolveLocale(navigator.language);
    }
    setLocaleState(next);
    document.documentElement.lang = next;
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore storage errors */
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return ctx;
}
