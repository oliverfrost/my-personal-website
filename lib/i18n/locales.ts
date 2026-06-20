export type Locale = 'en' | 'es' | 'de' | 'uk' | 'ru';

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_STORAGE_KEY = 'locale';

export interface LocaleMeta {
  code: Locale;
  /** Short label shown in the switcher button, e.g. "EN". */
  label: string;
  /** Native language name shown in the dropdown. */
  nativeName: string;
}

export const LOCALES: LocaleMeta[] = [
  { code: 'en', label: 'EN', nativeName: 'English' },
  { code: 'es', label: 'ES', nativeName: 'Español' },
  { code: 'de', label: 'DE', nativeName: 'Deutsch' },
  { code: 'uk', label: 'UA', nativeName: 'Українська' },
  { code: 'ru', label: 'RU', nativeName: 'Русский' },
];

export function isLocale(value: string): value is Locale {
  return LOCALES.some((l) => l.code === value);
}

/** Best-effort match of a browser language tag (e.g. "uk-UA") to a Locale. */
export function resolveLocale(navigatorLanguage: string | undefined): Locale {
  if (!navigatorLanguage) return DEFAULT_LOCALE;
  const base = navigatorLanguage.toLowerCase().split('-')[0];
  return isLocale(base) ? (base as Locale) : DEFAULT_LOCALE;
}
