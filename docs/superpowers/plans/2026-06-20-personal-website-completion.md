# Personal Website Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the Next.js static-export CV/portfolio site to match the provided mockups with light/dark theming, full 5-language i18n, a hidden portfolio section, fixed timeline layouts, a working contact form, and an SEO package.

**Architecture:** Client-side providers for theme and language wrap the single page. Theme uses Tailwind v4 class-based dark mode with CSS-variable tokens for both themes and an anti-FOUC inline script. i18n is a zero-dependency typed React context: a `Messages` type derived from the English dictionary forces every locale to define identical keys (compile-time parity). Translatable copy lives in `messages/`, structural data in `data/`. Portfolio is gated behind a `features` flag. Contact form posts to Web3Forms.

**Tech Stack:** Next.js 16 (App Router, `output: 'export'`), React 19, TypeScript (strict), Tailwind CSS v4 (CSS-first), Web3Forms.

---

## Conventions used throughout this plan

- **No test runner exists.** "Verify" = run the listed command and confirm expected output, plus browser checks where noted.
- **Typecheck command:** `npx tsc --noEmit` (no `typecheck` script exists; this is the canonical check).
- **Dev server:** `npm run dev` (http://localhost:3000). Build check: `npm run build` (must succeed — it produces the static export in `out/`).
- **Path alias:** `@/*` maps to repo root (per `tsconfig.json`). Prefer `@/...` imports.
- **Browser checks:** use the running dev server and a Playwright/`browser_*` screenshot at the widths noted. "Look at the screenshot" — a blank or unstyled frame is a failure.
- **Commit after each task** (frequent commits). Commit message convention matches the repo (imperative, capitalized, period). End commit messages with the Co-Authored-By trailer used in this repo.

## File structure (created / modified)

**Created**

- `lib/theme/theme-provider.tsx` — Theme context, provider, `useTheme` hook.
- `lib/theme/theme-script.ts` — anti-FOUC inline script string.
- `lib/i18n/locales.ts` — `Locale` type + locale metadata (code, label, native name).
- `lib/i18n/messages/en.ts` — English dictionary (source of truth + `Messages` type).
- `lib/i18n/messages/es.ts`, `de.ts`, `uk.ts`, `ru.ts` — translated dictionaries (same keys).
- `lib/i18n/messages/index.ts` — locale→dictionary map.
- `lib/i18n/language-provider.tsx` — Language context, provider, `useTranslation` hook.
- `lib/features.ts` — feature flags.
- `data/personal.ts`, `data/languages.ts`, `data/hard-skills.ts`, `data/skills.ts`, `data/work-experience.ts`, `data/education.ts`, `data/domain-expertise.ts`, `data/social.ts`, `data/portfolio.ts` — structural data.
- `components/portfolio.tsx`, `components/portfolio-item.tsx` — portfolio section.
- `components/person-json-ld.tsx` — JSON-LD structured data.
- `app/sitemap.ts`, `app/robots.ts` — SEO files.
- `.env.local.example` — documents `NEXT_PUBLIC_WEB3FORMS_KEY` and `NEXT_PUBLIC_SITE_URL`.

**Modified**

- `app/globals.css` — dark-mode variant + dual-theme tokens.
- `app/layout.tsx` — providers, anti-FOUC script, SEO metadata, JSON-LD, `lang` sync.
- `app/page.tsx` — responsive layout, toggle placement, max-width container, portfolio gating.
- `components/simple-switcher.tsx`, `components/full-size-theme-switcher.tsx` — wired to `useTheme`.
- `components/language-switcher.tsx` — wired to `useTranslation`.
- All section components — pull copy from `useTranslation()`, data from `data/`.
- `components/work-experience.tsx`, `components/work-experience-item.tsx` — responsive timeline + 6 roles.
- `components/education.tsx` — rebuilt timeline.
- `components/contact-form.tsx` — Web3Forms + states.

---

## Task 1: Dual-theme design tokens + dark-mode variant

**Files:**

- Modify: `app/globals.css`

- [ ] **Step 1: Replace `app/globals.css` with the token system**

```css
@import 'tailwindcss';

/* Enable class-based dark mode: `.dark` on <html> activates dark tokens */
@custom-variant dark (&:where(.dark, .dark *));

:root {
  /* Light theme */
  --background: #ffffff;
  --foreground: #1f2733;
  --muted: #5b6470;
  --surface: #404a5d; /* navy summary panel */
  --surface-foreground: #ffffff;
  --border: #e2e5ea;
  --badge-bg: #404a5d;
  --badge-foreground: #ffffff;
  --track: #d6dae0; /* skill slider track */
  --track-fill: #404a5d; /* skill slider fill/handle */
  --link: #3b82f6;
  --accent-success: #16a34a;
  --card-bg: #f8f9fb;
}

.dark {
  --background: #404a5d;
  --foreground: #f3f4f6;
  --muted: #c2c7d0;
  --surface: #ffffff; /* inverted: summary panel becomes light */
  --surface-foreground: #1f2733;
  --border: #5b6470;
  --badge-bg: #ffffff;
  --badge-foreground: #1f2733;
  --track: #ffffff;
  --track-fill: #ffffff;
  --link: #93c5fd;
  --accent-success: #4ade80;
  --card-bg: #4a5568;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-surface: var(--surface);
  --color-surface-foreground: var(--surface-foreground);
  --color-border-base: var(--border);
  --color-badge: var(--badge-bg);
  --color-badge-foreground: var(--badge-foreground);
  --color-track: var(--track);
  --color-track-fill: var(--track-fill);
  --color-link: var(--link);
  --color-success: var(--accent-success);
  --color-card: var(--card-bg);
  --color-navy-blue: #404a5d;
  --font-sans: 'source-sans-pro', sans-serif;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: source-sans-pro, sans-serif;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}
```

- [ ] **Step 2: Verify CSS lints**

Run: `npm run lint:css`
Expected: exits 0 (no errors). The `@custom-variant` and `@theme` at-rules are already allowlisted via `ignoreAtRules`/tailwind config in `.stylelintrc.json`; if `@custom-variant` is flagged, add it to the `at-rule-no-unknown` `ignoreAtRules` array in `.stylelintrc.json`.

- [ ] **Step 3: Verify build still succeeds**

Run: `npm run build`
Expected: build completes, static export written to `out/`.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css .stylelintrc.json
git commit -m "Adds dual-theme design tokens and dark-mode variant.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 2: Theme provider + anti-FOUC script

**Files:**

- Create: `lib/theme/theme-script.ts`
- Create: `lib/theme/theme-provider.tsx`

- [ ] **Step 1: Create the anti-FOUC script**

`lib/theme/theme-script.ts`:

```ts
// Runs before hydration to set the theme class and avoid a flash of the wrong theme.
// Keep this dependency-free and stringifiable.
export const THEME_STORAGE_KEY = 'theme';

export const themeInitScript = `(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();`;
```

- [ ] **Step 2: Create the theme provider**

`lib/theme/theme-provider.tsx`:

```tsx
'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { THEME_STORAGE_KEY } from './theme-script';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize from the class the inline script already set, so SSR/CSR agree.
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setThemeState(isDark ? 'dark' : 'light');
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
```

- [ ] **Step 3: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/theme/
git commit -m "Adds theme provider and anti-flash init script.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 3: i18n foundation (locales, English dictionary, Messages type)

**Files:**

- Create: `lib/i18n/locales.ts`
- Create: `lib/i18n/messages/en.ts`

- [ ] **Step 1: Create locale metadata**

`lib/i18n/locales.ts`:

```ts
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
```

- [ ] **Step 2: Create the English dictionary (source of truth)**

`lib/i18n/messages/en.ts`. This object's shape defines `Messages`; every other locale must match it exactly. Section headings, UI labels, language names, and all long-form copy are translatable; proper nouns / contact values / dates / percentages are NOT here (they live in `data/`).

```ts
export const en = {
  summary: {
    rolePrimary: 'Team Lead',
    roleSecondary: 'Senior Full-Stack Developer',
    downloadCv: 'Download CV',
  },
  greeting: {
    heading: "Hi, I'm Serhii",
    body: "I'm a Senior Front-End Developer and Team Lead with over 14 years of experience in IT, including 6+ years in front-end development and 3+ years in leadership roles. I'm passionate about building robust, scalable web applications and leading teams toward delivering high-quality software. My core strengths lie in Vue.js, Angular, Pinia, and Docker, along with a strong foundation in testing and system support.",
  },
  sections: {
    personalInformation: 'Personal Information',
    languages: 'Languages',
    hardSkills: 'Hard Skills',
    skills: 'Skills',
    workExperience: 'Work Experience',
    education: 'Education',
    domainExpertise: 'Domain Expertise',
    portfolio: 'Portfolio',
  },
  theme: {
    dark: 'Dark theme',
    light: 'Light theme',
  },
  languageNames: {
    english: 'English',
    ukrainian: 'Ukrainian',
    russian: 'Russian',
    spanish: 'Spanish',
    german: 'German',
  },
  domains: {
    finance: 'Finance',
    insurance: 'Insurance',
    healthcare: 'Healthcare',
    socialNetworks: 'Social Networks',
    education: 'Education',
    seo: 'SEO',
    computerNetworks: 'Computer Networks',
  },
  degrees: {
    master: "Master's degree",
    bachelor: "Bachelor's degree",
  },
  portfolio: {
    aboutLabel: 'ABOUT PROJECT:',
    technologiesLabel: 'TECHNOLOGIES:',
    linkLabel: 'LINK',
  },
  contact: {
    openForOpportunities: 'Open for new opportunities',
    title: 'Contact Me',
    fullName: 'Full Name:',
    email: 'Email:',
    message: 'Message:',
    submit: 'Submit',
    submitting: 'Sending…',
    success: 'Thanks! Your message has been sent.',
    error: 'Something went wrong. Please try again or email me directly.',
  },
} as const;

export type Messages = typeof en;
```

- [ ] **Step 3: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/locales.ts lib/i18n/messages/en.ts
git commit -m "Adds i18n locales and English message dictionary.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 4: Translated dictionaries (es, de, uk, ru) with compile-time key parity

**Files:**

- Create: `lib/i18n/messages/es.ts`, `de.ts`, `uk.ts`, `ru.ts`

- [ ] **Step 1: Create each translated dictionary**

For EACH locale file, copy the full key structure from `en.ts` and translate the values. Type each export as `Messages` so the compiler rejects any missing/extra/renamed key. Values for ES/DE/UK/RU are mock translations to be refined later; keep proper-noun mentions (Vue.js, Angular, etc.) as-is.

Template (shown for Spanish; repeat with translated strings for `de`, `uk`, `ru`):

`lib/i18n/messages/es.ts`:

```ts
import type { Messages } from './en';

export const es: Messages = {
  summary: {
    rolePrimary: 'Líder de equipo',
    roleSecondary: 'Desarrollador Full-Stack Senior',
    downloadCv: 'Descargar CV',
  },
  greeting: {
    heading: 'Hola, soy Serhii',
    body: 'Soy desarrollador front-end senior y líder de equipo con más de 14 años de experiencia en TI, incluidos más de 6 años en desarrollo front-end y más de 3 años en roles de liderazgo. Me apasiona crear aplicaciones web robustas y escalables y liderar equipos para entregar software de alta calidad. Mis principales fortalezas son Vue.js, Angular, Pinia y Docker, junto con una sólida base en pruebas y soporte de sistemas.',
  },
  sections: {
    personalInformation: 'Información personal',
    languages: 'Idiomas',
    hardSkills: 'Habilidades técnicas',
    skills: 'Competencias',
    workExperience: 'Experiencia laboral',
    education: 'Educación',
    domainExpertise: 'Áreas de especialización',
    portfolio: 'Portafolio',
  },
  theme: { dark: 'Tema oscuro', light: 'Tema claro' },
  languageNames: {
    english: 'Inglés',
    ukrainian: 'Ucraniano',
    russian: 'Ruso',
    spanish: 'Español',
    german: 'Alemán',
  },
  domains: {
    finance: 'Finanzas',
    insurance: 'Seguros',
    healthcare: 'Salud',
    socialNetworks: 'Redes sociales',
    education: 'Educación',
    seo: 'SEO',
    computerNetworks: 'Redes informáticas',
  },
  degrees: { master: 'Máster', bachelor: 'Licenciatura' },
  portfolio: {
    aboutLabel: 'SOBRE EL PROYECTO:',
    technologiesLabel: 'TECNOLOGÍAS:',
    linkLabel: 'ENLACE',
  },
  contact: {
    openForOpportunities: 'Abierto a nuevas oportunidades',
    title: 'Contáctame',
    fullName: 'Nombre completo:',
    email: 'Correo electrónico:',
    message: 'Mensaje:',
    submit: 'Enviar',
    submitting: 'Enviando…',
    success: '¡Gracias! Tu mensaje ha sido enviado.',
    error: 'Algo salió mal. Inténtalo de nuevo o escríbeme directamente.',
  },
};
```

Create `de.ts` (export `de`), `uk.ts` (export `uk`), `ru.ts` (export `ru`) with the same structure and German / Ukrainian / Russian translations respectively. Use natural translations; keep technology names untranslated.

- [ ] **Step 2: Verify parity via typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. Any missing or misnamed key in any locale file fails here — this is the parity guarantee. If it fails, fix the offending key to match `en.ts`.

- [ ] **Step 3: Commit**

```bash
git add lib/i18n/messages/
git commit -m "Adds Spanish, German, Ukrainian, and Russian dictionaries.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 5: Language provider + useTranslation hook

**Files:**

- Create: `lib/i18n/messages/index.ts`
- Create: `lib/i18n/language-provider.tsx`

- [ ] **Step 1: Create the dictionary map**

`lib/i18n/messages/index.ts`:

```ts
import type { Locale } from '../locales';
import type { Messages } from './en';
import { en } from './en';
import { es } from './es';
import { de } from './de';
import { uk } from './uk';
import { ru } from './ru';

export const dictionaries: Record<Locale, Messages> = { en, es, de, uk, ru };
export type { Messages };
```

- [ ] **Step 2: Create the language provider**

`lib/i18n/language-provider.tsx`:

```tsx
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
      next =
        stored && isLocale(stored) ? stored : resolveLocale(navigator.language);
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
    <LanguageContext.Provider
      value={{ locale, setLocale, t: dictionaries[locale] }}
    >
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
```

- [ ] **Step 3: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add lib/i18n/messages/index.ts lib/i18n/language-provider.tsx
git commit -m "Adds language provider and useTranslation hook.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 6: Wire providers + anti-FOUC script into the layout

**Files:**

- Modify: `app/layout.tsx`

- [ ] **Step 1: Update the root layout**

Replace `app/layout.tsx` with (SEO metadata is expanded later in Task 16; this step focuses on providers + script):

```tsx
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme/theme-provider';
import { themeInitScript } from '@/lib/theme/theme-script';
import { LanguageProvider } from '@/lib/i18n/language-provider';

export const metadata: Metadata = {
  title: 'Kholodnyi Serhii - Frontend Developer',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dlx6tqv.css" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: both succeed.

- [ ] **Step 3: Browser check — no theme flash**

Start `npm run dev`. Load http://localhost:3000 with OS in dark mode; screenshot. Expected: page respects system theme on first paint (no white flash before dark). Toggle is not wired yet — that's Task 7.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx
git commit -m "Wires theme and language providers into the layout.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 7: Wire theme switchers to useTheme

**Files:**

- Modify: `components/simple-switcher.tsx`
- Modify: `components/full-size-theme-switcher.tsx`

- [ ] **Step 1: Rewrite `simple-switcher.tsx` to drive the theme**

```tsx
'use client';

import React from 'react';
import { useTheme } from '@/lib/theme/theme-provider';

interface SimpleSwitcherProps {
  /** Optional short label shown beside the toggle (used in the mobile header). */
  label?: string;
}

export default function SimpleSwitcher({ label }: SimpleSwitcherProps) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <label className="relative inline-flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={isLight}
        onChange={toggleTheme}
        className="sr-only"
        aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      />
      <span
        className={`relative h-8 w-14 rounded-full transition-colors duration-200 ease-in-out ${
          isLight ? 'bg-white' : 'bg-slate-600'
        }`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full shadow-md transition-transform duration-200 ease-in-out ${
            isLight ? 'translate-x-6 bg-slate-600' : 'translate-x-1 bg-white'
          }`}
        />
      </span>
      {label ? <span className="text-sm">{label}</span> : null}
    </label>
  );
}
```

> The handle moves right ("on") for LIGHT to match the mockup where the light position is selected. Verify direction visually in Step 3 and flip the `translate-x` values if it reads backwards.

- [ ] **Step 2: Rewrite `full-size-theme-switcher.tsx`**

```tsx
'use client';

import React from 'react';
import SimpleSwitcher from './simple-switcher';
import MoonIcon from './icons/moon-icon';
import SunIcon from './icons/sun-icon';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function FullSizeThemeSwitcher() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1">
        <MoonIcon variant="dark" />
        <span>{t.theme.dark}</span>
      </span>
      <SimpleSwitcher />
      <span className="flex items-center gap-1">
        <SunIcon variant="dark" />
        <span>{t.theme.light}</span>
      </span>
    </div>
  );
}
```

- [ ] **Step 3: Browser check — toggle works**

`npm run dev`, load the page. Click the desktop toggle. Expected: theme flips light↔dark, every section recolors, and a reload preserves the choice (localStorage). Screenshot both states and confirm.

- [ ] **Step 4: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/simple-switcher.tsx components/full-size-theme-switcher.tsx
git commit -m "Wires theme switchers to the theme provider.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 8: Structural data modules

**Files:**

- Create: `data/personal.ts`, `data/social.ts`, `data/languages.ts`, `data/hard-skills.ts`, `data/skills.ts`, `data/domain-expertise.ts`

- [ ] **Step 1: Create `data/personal.ts`**

```ts
export interface PersonalInfo {
  name: string;
  location: string;
  phone: string;
  phoneHref: string;
  email: string;
  linkedinLabel: string;
  linkedinUrl: string;
}

export const personalInfo: PersonalInfo = {
  name: 'Serhii Kholodnyi',
  location: 'Tallinn, Estonia',
  phone: '+372 5190 0494',
  phoneHref: 'tel:+37251900494',
  email: 'serg.holodny@gmail.com',
  linkedinLabel: 'linkedin.com/in/serhii-kholodnyi',
  linkedinUrl: 'https://www.linkedin.com/in/serhii-kholodnyi',
};
```

- [ ] **Step 2: Create `data/social.ts`**

```ts
export interface SocialLink {
  id: 'linkedin' | 'stackoverflow' | 'github' | 'leetcode';
  url: string;
}

export const socialLinks: SocialLink[] = [
  { id: 'linkedin', url: 'https://www.linkedin.com/in/serhii-kholodnyi' },
  {
    id: 'stackoverflow',
    url: 'https://stackoverflow.com/users/4520707/oliverfrost21',
  },
  { id: 'github', url: 'https://github.com/oliverfrost' },
  { id: 'leetcode', url: 'https://leetcode.com/u/oliverfrost21/' },
];
```

- [ ] **Step 3: Create `data/languages.ts`** (names reference i18n keys; levels are data)

```ts
import type { Messages } from '@/lib/i18n/messages';

export interface LanguageProficiency {
  nameKey: keyof Messages['languageNames'];
  level: string;
}

export const languageProficiencies: LanguageProficiency[] = [
  { nameKey: 'english', level: 'C1' },
  { nameKey: 'ukrainian', level: 'C2' },
  { nameKey: 'russian', level: 'C2' },
  { nameKey: 'spanish', level: 'B1' },
  { nameKey: 'german', level: 'A1' },
];
```

- [ ] **Step 4: Create `data/hard-skills.ts`**

```ts
export interface HardSkill {
  skill: string;
  percentage: number;
}

export const hardSkills: HardSkill[] = [
  { skill: 'JavaScript', percentage: 86 },
  { skill: 'TypeScript', percentage: 80 },
  { skill: 'Angular', percentage: 80 },
  { skill: 'HTML', percentage: 90 },
  { skill: 'CSS', percentage: 76 },
  { skill: 'React', percentage: 65 },
  { skill: 'Vue.js', percentage: 55 },
  { skill: 'Java', percentage: 50 },
];
```

- [ ] **Step 5: Create `data/skills.ts`**

```ts
export const skills: string[] = [
  'RxJs',
  'NgRx',
  'NgXs',
  'Nx',
  'Jest',
  'Jasmine + Karma',
  'Chai + Mocha',
  'Docker',
  'Kubernetes',
  'Cypress',
  'Protractor',
];
```

- [ ] **Step 6: Create `data/domain-expertise.ts`**

```ts
import type { Messages } from '@/lib/i18n/messages';

export type DomainId = keyof Messages['domains'];

export const domainExpertise: DomainId[] = [
  'finance',
  'insurance',
  'healthcare',
  'socialNetworks',
  'education',
  'seo',
  'computerNetworks',
];
```

- [ ] **Step 7: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add data/personal.ts data/social.ts data/languages.ts data/hard-skills.ts data/skills.ts data/domain-expertise.ts
git commit -m "Adds structural data modules for static content.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 9: Refactor simple sections to data + i18n (Summary, Greeting, PersonalInformation, Languages, Skills, HardSkills, DomainExpertise)

**Files:**

- Modify: `components/summary.tsx`, `components/greeting.tsx`, `components/personal-information.tsx`, `components/languages.tsx`, `components/skills.tsx`, `components/hard-skills.tsx`, `components/skill-slider.tsx`, `components/domain-expertise.tsx`

- [ ] **Step 1: Rewrite `components/summary.tsx`**

```tsx
'use client';

import React from 'react';
import StackOverflowIcon from './icons/stackoverflow';
import LinkedInIcon from './icons/linkedin';
import GithubIcon from './icons/github';
import LeetCodeIcon from './icons/leetcode';
import { socialLinks } from '@/data/social';
import { personalInfo } from '@/data/personal';
import { useTranslation } from '@/lib/i18n/language-provider';

const iconById = {
  linkedin: LinkedInIcon,
  stackoverflow: StackOverflowIcon,
  github: GithubIcon,
  leetcode: LeetCodeIcon,
} as const;

export default function Summary({ className }: { className?: string }) {
  const { t } = useTranslation();

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/docs/Serhii_Kholodnyi_Front-End-Dev.pdf';
    link.download = 'Serhii_Kholodnyi_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      className={`bg-surface text-surface-foreground p-4 ${className || ''}`}
    >
      <h1 className="mb-4 text-3xl font-bold uppercase">{personalInfo.name}</h1>
      <span className="block">{t.summary.rolePrimary}</span>
      <span className="mb-4 block">{t.summary.roleSecondary}</span>

      <ul className="flex list-none flex-row justify-between gap-4 p-0">
        {socialLinks.map((link) => {
          const Icon = iconById[link.id];
          return (
            <li key={link.id}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <Icon variant="light" />
              </a>
            </li>
          );
        })}
      </ul>

      <div className="py-4">
        <button
          onClick={downloadCV}
          className="bg-background text-foreground border-border-base w-full rounded border px-4 py-2 transition-colors"
        >
          {t.summary.downloadCv}
        </button>
      </div>
    </section>
  );
}
```

> Note: the Summary panel uses `bg-surface`/`text-surface-foreground`. In light mode `--surface` is navy with white text; in dark mode it inverts to a light panel with dark text, matching the mockups. Social icons always use `variant="light"` today; if they become invisible on the inverted dark-mode panel, switch them to use `currentColor` in a later polish pass (note it, don't block).

- [ ] **Step 2: Rewrite `components/greeting.tsx`**

```tsx
'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function Greeting() {
  const { t } = useTranslation();
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold uppercase">{t.greeting.heading}</h2>
      <p className="text-sm">{t.greeting.body}</p>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite `components/personal-information.tsx`**

```tsx
'use client';

import React from 'react';
import LinkedInIcon from './icons/linkedin';
import PersonIcon from './icons/person';
import MapMarkerIcon from './icons/map-marker';
import PhoneIcon from './icons/phone';
import AtIcon from './icons/at';
import { personalInfo } from '@/data/personal';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function PersonalInformation() {
  const { t } = useTranslation();
  return (
    <div className="mb-4 w-full lg:mb-0">
      <h2 className="border-border-base mb-4 border-b text-2xl font-bold uppercase">
        {t.sections.personalInformation}
      </h2>

      <ul className="space-y-3">
        <li className="flex items-center space-x-3">
          <PersonIcon className="h-6 w-6" variant="dark" />
          <span>{personalInfo.name}</span>
        </li>
        <li className="flex items-center space-x-3">
          <MapMarkerIcon className="h-6 w-6" variant="dark" />
          <span>{personalInfo.location}</span>
        </li>
        <li className="flex items-center space-x-3">
          <PhoneIcon className="h-6 w-6" variant="dark" />
          <a href={personalInfo.phoneHref}>{personalInfo.phone}</a>
        </li>
        <li className="flex items-center space-x-3">
          <AtIcon className="h-6 w-6" variant="dark" />
          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
        </li>
        <li className="flex items-center space-x-3">
          <LinkedInIcon className="h-6 w-6" variant="dark" />
          <a
            href={personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {personalInfo.linkedinLabel}
          </a>
        </li>
      </ul>
    </div>
  );
}
```

> The icons currently take `variant="dark"` and render dark strokes. On dark theme they may need to flip to light. If icons are hardcoded colors, note for a polish pass; do not block this task. (Tracked in Task 17 polish.)

- [ ] **Step 4: Rewrite `components/languages.tsx`**

```tsx
'use client';

import React from 'react';
import { languageProficiencies } from '@/data/languages';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function Languages() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="border-border-base mb-4 border-b text-2xl font-bold uppercase">
        {t.sections.languages}
      </h2>
      <ul className="space-y-3">
        {languageProficiencies.map((lang) => (
          <li key={lang.nameKey} className="flex justify-between space-x-3">
            <span>{t.languageNames[lang.nameKey]}</span>
            <span>{lang.level}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 5: Rewrite `components/skills.tsx`**

```tsx
'use client';

import React from 'react';
import { skills } from '@/data/skills';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function Skills() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="border-border-base mb-4 border-b text-2xl font-bold uppercase">
        {t.sections.skills}
      </h2>
      <ul className="grid gap-1 sm:grid-cols-2 sm:gap-4">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 6: Rewrite `components/skill-slider.tsx`** (themed track colors)

```tsx
import React from 'react';

interface SkillSliderProps {
  skill: string;
  percentage: number;
}

export default function SkillSlider({ skill, percentage }: SkillSliderProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-lg font-medium">{skill}</span>
        <span className="text-lg font-medium">{percentage}%</span>
      </div>
      <div className="relative">
        <div className="bg-track h-2 w-full rounded-full" />
        <div
          className="bg-track-fill absolute top-0 left-0 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="bg-track-fill border-background absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 shadow-md"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Rewrite `components/hard-skills.tsx`**

```tsx
'use client';

import React from 'react';
import SkillSlider from './skill-slider';
import { hardSkills } from '@/data/hard-skills';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function HardSkills() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="border-border-base mb-4 border-b text-2xl font-bold uppercase">
        {t.sections.hardSkills}
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        {hardSkills.map((s) => (
          <SkillSlider
            key={s.skill}
            skill={s.skill}
            percentage={s.percentage}
          />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Rewrite `components/domain-expertise.tsx`** (map over data)

```tsx
'use client';

import React from 'react';
import ComputerNetworksIcon from './icons/computer-networks-icon';
import EducationIcon from './icons/education-icon';
import FinanceIcon from './icons/finance';
import HealthcareIcon from './icons/healthcare-icon';
import InsuranceIcon from './icons/insurance';
import SeoIcon from './icons/seo-icon';
import SocialNetworksIcon from './icons/social-networks-icon';
import { domainExpertise, type DomainId } from '@/data/domain-expertise';
import { useTranslation } from '@/lib/i18n/language-provider';

const iconByDomain: Record<
  DomainId,
  React.ComponentType<{ variant?: string }>
> = {
  finance: FinanceIcon,
  insurance: InsuranceIcon,
  healthcare: HealthcareIcon,
  socialNetworks: SocialNetworksIcon,
  education: EducationIcon,
  seo: SeoIcon,
  computerNetworks: ComputerNetworksIcon,
};

export default function DomainExpertise() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="border-border-base mb-4 border-b text-2xl font-bold">
        {t.sections.domainExpertise}
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {domainExpertise.map((id) => {
          const Icon = iconByDomain[id];
          return (
            <div key={id} className="flex items-center space-x-3">
              <span className="h-8 w-8 flex-shrink-0">
                <Icon variant="dark" />
              </span>
              <span className="font-medium">{t.domains[id]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

> If `iconByDomain` triggers a TS error because an icon component's props don't include `variant`, widen the icon prop types or cast via `React.ComponentType<{ variant?: 'light' | 'dark' }>` to match the existing icon signatures. Check one icon file (e.g. `components/icons/finance.tsx`) for the exact prop name before finalizing.

- [ ] **Step 9: Verify typecheck + browser**

Run: `npx tsc --noEmit`
Expected: no errors. Then `npm run dev`, switch languages via the (soon-to-be-wired) switcher OR temporarily set `DEFAULT_LOCALE` to confirm copy changes. Screenshot in light + dark; confirm all these sections render themed text.

- [ ] **Step 10: Commit**

```bash
git add components/summary.tsx components/greeting.tsx components/personal-information.tsx components/languages.tsx components/skills.tsx components/skill-slider.tsx components/hard-skills.tsx components/domain-expertise.tsx
git commit -m "Refactors content sections to use i18n and data modules.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 10: Work Experience — data (6 roles) + responsive timeline

**Files:**

- Create: `data/work-experience.ts`
- Modify: `components/work-experience.tsx`, `components/work-experience-item.tsx`

- [ ] **Step 1: Create `data/work-experience.ts`** (the 6 roles from the mockup)

```ts
export interface WorkExperienceEntry {
  dateRange: string;
  company: string;
  role: string;
  responsibilities: string[];
}

export const workExperience: WorkExperienceEntry[] = [
  {
    dateRange: 'November 2021 - Present',
    company: 'TurnKey Labs',
    role: 'Senior Frontend Developer / Team Lead',
    responsibilities: [
      'Leading a frontend team on multiple client-facing projects',
      'Designing scalable frontend architecture',
      'Performing code reviews, mentoring developers',
      'Coordinating closely with designers and product managers',
    ],
  },
  {
    dateRange: 'September 2018 - November 2021',
    company: 'DataArt',
    role: 'Senior Frontend Developer / Team Lead',
    responsibilities: [
      'Frontend architecture design and implementation',
      'Leading cross-functional frontend teams',
      'Integrating with RESTful APIs and backend services',
      'Code quality control, test automation',
    ],
  },
  {
    dateRange: 'September 2017 - September 2018',
    company: 'DataArt',
    role: 'Middle Frontend Developer / Team Lead',
    responsibilities: [
      'Built and maintained client-side components',
      'Managed small team and sprint planning',
      'Participated in product decision-making and UI optimization',
    ],
  },
  {
    dateRange: 'January 2017 - September 2017',
    company: 'EOS Data Analytics (EOSDA)',
    role: 'Middle Frontend Developer',
    responsibilities: [
      'Developed and maintained multiple GIS-related frontend apps',
      'Wrote unit and end-to-end tests',
      'Performed code reviews and acted as Scrum Master',
    ],
  },
  {
    dateRange: 'July 2014 - January 2017',
    company: 'Ciklum',
    role: 'Quality Assurance Automation Engineer',
    responsibilities: [
      'Created E2E and API tests (Protractor, Appium, Java, Selenium)',
      'Migrated codebases from ES5 → ES6 → TypeScript',
      'Managed CI/CD pipelines, led QA teams, participated in BDD adoption',
      'Developed iOS UI tests using Swift & Xcode UI Test',
    ],
  },
  {
    dateRange: 'July 2013 - July 2014',
    company: 'Cupid plc',
    role: 'Quality Assurance Engineer',
    responsibilities: [
      'QA for multiple dating platforms (web, mobile, social widgets)',
      'Focused on payment system integrations and UI/UX testing',
      'Developed automation test suites using Selenium',
      'Mentored junior QA engineers',
    ],
  },
];
```

- [ ] **Step 2: Rewrite `components/work-experience-item.tsx`** (responsive: badge in left column on desktop, stacked on mobile)

```tsx
import React from 'react';

interface WorkExperienceItemProps {
  dateRange: string;
  company: string;
  role: string;
  responsibilities: string[];
}

export default function WorkExperienceItem({
  dateRange,
  company,
  role,
  responsibilities,
}: WorkExperienceItemProps) {
  return (
    <div className="relative flex lg:items-start">
      {/* Desktop-only left column: date badge aligned to the timeline */}
      <div className="hidden lg:flex lg:w-48 lg:flex-shrink-0 lg:justify-start lg:pt-1">
        <span className="bg-badge text-badge-foreground inline-block rounded px-3 py-1 text-sm">
          {dateRange}
        </span>
      </div>

      {/* Timeline line + dot */}
      <div className="mr-4 flex flex-col items-center">
        <span className="bg-surface h-2 w-2 rounded-full shadow-sm" />
        <span className="bg-border-base mt-2 mb-2 min-h-[120px] w-0.5 flex-grow" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        {/* Mobile-only date badge */}
        <span className="bg-badge text-badge-foreground mb-3 inline-block rounded px-3 py-1 text-sm lg:hidden">
          {dateRange}
        </span>

        <h3 className="mb-1 text-xl font-bold">{company}</h3>
        <p className="text-muted mb-4 italic">{role}</p>

        <ul className="space-y-2">
          {responsibilities.map((responsibility, index) => (
            <li key={index} className="flex items-start">
              <span className="mt-1 mr-2">•</span>
              <span className="text-sm leading-relaxed">{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Rewrite `components/work-experience.tsx`**

```tsx
'use client';

import React from 'react';
import WorkExperienceItem from './work-experience-item';
import { workExperience } from '@/data/work-experience';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function WorkExperience() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="border-border-base mb-4 border-b text-2xl font-bold uppercase">
        {t.sections.workExperience}
      </h2>
      <div className="mt-6">
        {workExperience.map((experience, index) => (
          <WorkExperienceItem key={index} {...experience} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Browser check — timeline matches mockup**

`npm run dev`. Screenshot Work Experience at 375px (mobile) and 1440px (desktop). Expected: desktop shows date badges in a left column beside the vertical line with content to the right; mobile stacks the badge above each entry. Compare against mockup images.

- [ ] **Step 5: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add data/work-experience.ts components/work-experience.tsx components/work-experience-item.tsx
git commit -m "Rebuilds work experience timeline with full role history.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 11: Education — rebuild timeline

**Files:**

- Create: `data/education.ts`
- Modify: `components/education.tsx`

- [ ] **Step 1: Create `data/education.ts`**

```ts
import type { Messages } from '@/lib/i18n/messages';

export interface EducationEntry {
  period: string;
  university: string;
  degreeKey: keyof Messages['degrees'];
  field: string;
}

export const education: EducationEntry[] = [
  {
    period: '2006 - 2011',
    university: 'Zaporizhzhya National Technical University',
    degreeKey: 'master',
    field: 'INFORMATIONAL COMMUNICATION NETWORKS',
  },
  {
    period: '2008 - 2011',
    university: 'Zaporizhzhya National Technical University',
    degreeKey: 'bachelor',
    field: 'TECHNICAL TRANSLATION (ENGLISH)',
  },
];
```

- [ ] **Step 2: Rewrite `components/education.tsx`** (mirror the work-experience timeline; reserve a logo slot but omit the broken image)

```tsx
'use client';

import React from 'react';
import { education } from '@/data/education';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function Education() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="border-border-base mb-4 border-b text-2xl font-bold uppercase">
        {t.sections.education}
      </h2>

      <div className="mt-6">
        {education.map((entry, index) => (
          <div key={index} className="relative flex lg:items-start">
            {/* Desktop-only left column: period badge */}
            <div className="hidden lg:flex lg:w-48 lg:flex-shrink-0 lg:pt-1">
              <span className="bg-badge text-badge-foreground inline-block rounded px-3 py-1 text-sm">
                {entry.period}
              </span>
            </div>

            {/* Timeline line + dot */}
            <div className="mr-4 flex flex-col items-center">
              <span className="bg-surface h-2 w-2 rounded-full shadow-sm" />
              <span className="bg-border-base mt-2 mb-2 min-h-[100px] w-0.5 flex-grow" />
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <span className="bg-badge text-badge-foreground mb-3 inline-block rounded px-3 py-1 text-sm lg:hidden">
                {entry.period}
              </span>
              <h3 className="mb-2 text-lg font-semibold">{entry.university}</h3>
              {/* Logo slot reserved; asset to be added later by the site owner */}
              <p className="text-muted mb-1">{t.degrees[entry.degreeKey]}</p>
              <p className="text-sm font-medium uppercase">{entry.field}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Browser check**

`npm run dev`. Screenshot Education at 375px and 1440px in light + dark. Expected: clean timeline matching work experience; no broken-image icon. Compare to mockup.

- [ ] **Step 4: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add data/education.ts components/education.tsx
git commit -m "Rebuilds the education section as a clean timeline.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 12: Feature flags + Portfolio section (hidden)

**Files:**

- Create: `lib/features.ts`
- Create: `data/portfolio.ts`
- Create: `components/portfolio-item.tsx`, `components/portfolio.tsx`

- [ ] **Step 1: Create `lib/features.ts`**

```ts
export interface FeatureFlags {
  /** Portfolio section is hidden until real projects are ready. */
  portfolio: boolean;
}

export const features: FeatureFlags = {
  portfolio: false,
};
```

- [ ] **Step 2: Create `data/portfolio.ts`** (mock projects from the mockup)

```ts
export interface PortfolioProject {
  title: string;
  imageUrl: string | null;
  linkUrl: string;
  about: string;
  technologies: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'BookStream',
    imageUrl: null,
    linkUrl: '#',
    about:
      'BookStream is an online bookstore built with Angular and Angular Universal, featuring server-side rendering and in-browser book streaming for a fast, SEO-friendly reading experience.',
    technologies:
      'Protractor, Selenium WebDriver, JavaScript/TypeScript, Jasmine 2, AngularJS, underscore, NodeJs, TeamCity',
  },
  {
    title: 'Project #2',
    imageUrl: null,
    linkUrl: '#',
    about:
      'Business intelligence platform that lets users join, analyze, and picture out information they require to make better and more intelligent business decisions and craft out workable plans and strategies.',
    technologies:
      'Protractor, Selenium WebDriver, JavaScript/TypeScript, Jasmine 2, AngularJS, underscore, NodeJs, TeamCity',
  },
  {
    title: 'Project #3',
    imageUrl: null,
    linkUrl: '#',
    about:
      'Business intelligence platform that lets users join, analyze, and picture out information they require to make better and more intelligent business decisions and craft out workable plans and strategies.',
    technologies:
      'Protractor, Selenium WebDriver, JavaScript/TypeScript, Jasmine 2, AngularJS, underscore, NodeJs, TeamCity',
  },
  {
    title: 'Project #4',
    imageUrl: null,
    linkUrl: '#',
    about:
      'Business intelligence platform that lets users join, analyze, and picture out information they require to make better and more intelligent business decisions and craft out workable plans and strategies.',
    technologies:
      'Protractor, Selenium WebDriver, JavaScript/TypeScript, Jasmine 2, AngularJS, underscore, NodeJs, TeamCity',
  },
];
```

- [ ] **Step 3: Create `components/portfolio-item.tsx`**

```tsx
'use client';

import React from 'react';
import type { PortfolioProject } from '@/data/portfolio';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function PortfolioItem({
  project,
}: {
  project: PortfolioProject;
}) {
  const { t } = useTranslation();
  return (
    <article className="mb-10">
      <h3 className="mb-4 text-lg font-bold uppercase">{project.title}</h3>

      {/* Image placeholder: outlined rounded square matching the mockup */}
      <div className="border-border-base mb-4 flex aspect-square w-full max-w-md items-center justify-center rounded-3xl border">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full rounded-3xl object-cover"
          />
        ) : (
          <span className="text-muted text-sm">Image</span>
        )}
      </div>

      <a
        href={project.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link text-sm font-medium uppercase"
      >
        {t.portfolio.linkLabel}
      </a>

      <p className="mt-4 text-sm">
        <span className="font-semibold">{t.portfolio.aboutLabel}</span>{' '}
        {project.about}
      </p>
      <p className="mt-4 text-sm">
        <span className="font-semibold">{t.portfolio.technologiesLabel}</span>{' '}
        {project.technologies}
      </p>
    </article>
  );
}
```

- [ ] **Step 4: Create `components/portfolio.tsx`**

```tsx
'use client';

import React from 'react';
import PortfolioItem from './portfolio-item';
import { portfolioProjects } from '@/data/portfolio';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function Portfolio() {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <h2 className="border-border-base mb-4 border-b text-2xl font-bold uppercase">
        {t.sections.portfolio}
      </h2>
      <div className="mt-6">
        {portfolioProjects.map((project) => (
          <PortfolioItem key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: no errors. (Portfolio is not yet rendered — wired in Task 13.)

- [ ] **Step 6: Commit**

```bash
git add lib/features.ts data/portfolio.ts components/portfolio-item.tsx components/portfolio.tsx
git commit -m "Adds hidden portfolio section behind a feature flag.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 13: Responsive page layout + toggle placement + portfolio gating

**Files:**

- Modify: `app/page.tsx`

- [ ] **Step 1: Rewrite `app/page.tsx`**

```tsx
import PersonalInformation from '@/components/personal-information';
import Languages from '@/components/languages';
import HardSkills from '@/components/hard-skills';
import Skills from '@/components/skills';
import WorkExperience from '@/components/work-experience';
import Education from '@/components/education';
import Greeting from '@/components/greeting';
import Summary from '@/components/summary';
import DomainExpertise from '@/components/domain-expertise';
import ContactForm from '@/components/contact-form';
import Portfolio from '@/components/portfolio';
import FullSizeThemeSwitcher from '@/components/full-size-theme-switcher';
import LanguageSwitcher from '@/components/language-switcher';
import SimpleSwitcher from '@/components/simple-switcher';
import { features } from '@/lib/features';

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1600px] p-4 lg:flex lg:gap-14">
      {/* Summary: top card on mobile, left sidebar on desktop */}
      <div className="mb-4 lg:mb-0 lg:w-1/3">
        {/* Mobile-only theme toggle sits inside the navy card */}
        <div className="bg-surface flex justify-end p-4 pb-0 lg:hidden">
          <SimpleSwitcher />
        </div>
        <Summary />
      </div>

      <div className="flex flex-col gap-4 lg:w-2/3 lg:gap-8">
        {/* Desktop-only top bar */}
        <div className="hidden lg:mb-2 lg:flex lg:items-center lg:justify-end lg:gap-4">
          <LanguageSwitcher />
          <FullSizeThemeSwitcher />
        </div>

        {/* Mobile-only language switcher */}
        <div className="flex justify-end lg:hidden">
          <LanguageSwitcher />
        </div>

        <Greeting />

        <div className="lg:flex lg:gap-4">
          <div className="lg:w-1/2">
            <PersonalInformation />
          </div>
          <div className="lg:w-1/2">
            <Languages />
          </div>
        </div>

        <HardSkills />
        <Skills />
        <WorkExperience />
        <Education />
        <DomainExpertise />
        {features.portfolio && <Portfolio />}
        <ContactForm />
      </div>
    </main>
  );
}
```

> The mobile theme toggle is placed inside a `bg-surface` strip above `Summary` so it visually sits within the navy card like the mockup. If `Summary` already has top padding causing a seam, adjust the strip's padding to merge cleanly (verify in Step 2).

- [ ] **Step 2: Browser check — full responsive sweep**

`npm run dev`. Screenshot the full page at 320px, 375px, 768px, 1440px, and 2500px, in BOTH themes. Expected:

- 320–375px: single column, navy summary card on top with theme toggle in its top-right, language switcher above greeting.
- ≥1024px: two columns, navy sidebar left, content right, language + theme controls top-right.
- 2500px: content centered within max-width, not stretched edge-to-edge.
  Compare each against the corresponding mockup. Look at every screenshot.

- [ ] **Step 3: Verify typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: both succeed.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "Restructures page layout for responsive theme and language controls.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 14: Wire the language switcher to the provider

**Files:**

- Modify: `components/language-switcher.tsx`

- [ ] **Step 1: Rewrite `components/language-switcher.tsx`**

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { LOCALES } from '@/lib/i18n/locales';
import { useTranslation } from '@/lib/i18n/language-provider';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="border-border-base flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{current.label}</span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="bg-background border-border-base absolute top-full right-0 z-50 mt-1 w-44 rounded-md border shadow-lg">
          <ul className="py-1">
            {LOCALES.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => {
                    setLocale(l.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                    l.code === locale ? 'text-link font-semibold' : ''
                  }`}
                >
                  <span className="flex items-center justify-between">
                    <span>{l.label}</span>
                    <span className="text-muted text-xs">{l.nativeName}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Browser check — language switching works end to end**

`npm run dev`. Open the switcher, pick each of EN/ES/DE/UA/RU. Expected: every section's copy updates (headings, greeting, domain labels, contact form labels, language names), the button label updates, the choice persists across reload, and `<html lang>` updates (inspect element). Screenshot at least EN + one non-Latin locale (RU or UA).

- [ ] **Step 3: Verify typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/language-switcher.tsx
git commit -m "Wires the language switcher to the i18n provider.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 15: Contact form — Web3Forms integration + states

**Files:**

- Create: `.env.local.example`
- Modify: `components/contact-form.tsx`

- [ ] **Step 1: Document the env var**

`.env.local.example`:

```bash
# Web3Forms access key (https://web3forms.com) — used by the contact form.
NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key-here
# Absolute site URL used for SEO canonical/sitemap, e.g. https://serhiikholodnyi.com
NEXT_PUBLIC_SITE_URL=https://example.com
```

> The site owner will create `.env.local` with a real key. Without a key the form shows the error state on submit; that's acceptable until the key is added.

- [ ] **Step 2: Rewrite `components/contact-form.tsx`**

```tsx
'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/lib/i18n/language-provider';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const isOpenForNewOpportunities = true;

export default function ContactForm() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!accessKey) {
      setStatus('error');
      return;
    }
    formData.append('access_key', accessKey);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="w-full">
      <div className="bg-card border-border-base rounded-3xl border p-8">
        {/* Header: badge top-center on mobile, title + badge row on desktop */}
        <div className="mb-8 flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
          <h2 className="order-2 text-3xl font-light lg:order-1">
            {t.contact.title}
          </h2>
          {isOpenForNewOpportunities && (
            <span className="bg-background border-success order-1 inline-flex items-center rounded-full border-2 px-6 py-2 lg:order-2">
              <span className="text-success mr-2">✓</span>
              <span className="text-success font-medium">
                {t.contact.openForOpportunities}
              </span>
            </span>
          )}
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="mb-2 block font-medium">
              {t.contact.fullName}
            </label>
            <input
              type="text"
              id="fullName"
              name="name"
              required
              className="bg-background border-border-base focus:border-link w-full rounded-2xl border-2 px-4 py-3 transition-colors focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-medium">
              {t.contact.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="bg-background border-border-base focus:border-link w-full rounded-2xl border-2 px-4 py-3 transition-colors focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block font-medium">
              {t.contact.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="bg-background border-border-base focus:border-link w-full resize-none rounded-2xl border-2 px-4 py-3 transition-colors focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="bg-surface text-surface-foreground w-full rounded-2xl py-3 text-lg font-medium transition-colors disabled:opacity-60"
          >
            {status === 'submitting' ? t.contact.submitting : t.contact.submit}
          </button>

          {status === 'success' && (
            <p className="text-success text-center">{t.contact.success}</p>
          )}
          {status === 'error' && (
            <p className="text-center text-red-600 dark:text-red-400">
              {t.contact.error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Browser check — states**

`npm run dev`. Create `.env.local` from the example WITHOUT a real key; submit → expect error state. (Owner adds the real key later to test success.) Screenshot the form in light + dark; confirm badge is top-center on mobile, right-aligned on desktop.

- [ ] **Step 4: Verify typecheck + build**

Run: `npx tsc --noEmit && npm run build`
Expected: both succeed.

- [ ] **Step 5: Commit**

```bash
git add .env.local.example components/contact-form.tsx
git commit -m "Wires the contact form to Web3Forms with status states.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 16: SEO — metadata, JSON-LD, sitemap, robots

**Files:**

- Create: `components/person-json-ld.tsx`
- Create: `app/sitemap.ts`, `app/robots.ts`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/person-json-ld.tsx`**

```tsx
import React from 'react';
import { personalInfo } from '@/data/personal';
import { socialLinks } from '@/data/social';

export default function PersonJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: 'Senior Frontend Developer / Team Lead',
    email: `mailto:${personalInfo.email}`,
    telephone: personalInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tallinn',
      addressCountry: 'EE',
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
    sameAs: socialLinks.map((s) => s.url),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Update `app/layout.tsx`** metadata + render JSON-LD

Replace the `metadata` export and add `<PersonJsonLd />` into the body (top of providers):

```tsx
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme/theme-provider';
import { themeInitScript } from '@/lib/theme/theme-script';
import { LanguageProvider } from '@/lib/i18n/language-provider';
import PersonJsonLd from '@/components/person-json-ld';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
const description =
  'Serhii Kholodnyi — Senior Frontend Developer and Team Lead with 14+ years in IT. Vue.js, Angular, React, TypeScript, Pinia, and Docker.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Serhii Kholodnyi — Frontend Developer & Team Lead',
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Serhii Kholodnyi — Frontend Developer & Team Lead',
    description,
    siteName: 'Serhii Kholodnyi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serhii Kholodnyi — Frontend Developer & Team Lead',
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dlx6tqv.css" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <PersonJsonLd />
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

> If you have an OG image asset, add `openGraph.images` and `twitter.images`. The spec notes the owner will add assets if missing — leave images out until one exists rather than referencing a non-existent file.

- [ ] **Step 3: Create `app/robots.ts`**

```ts
import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
```

- [ ] **Step 4: Create `app/sitemap.ts`**

```ts
import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

- [ ] **Step 5: Verify build emits SEO files**

Run: `npm run build`
Expected: build succeeds and `out/robots.txt` and `out/sitemap.xml` exist.
Verify: `ls out/robots.txt out/sitemap.xml`

> NOTE: `output: 'export'` requires `sitemap.ts`/`robots.ts` to be statically generated — they are (no dynamic params), so export works. If the build errors that these routes can't be statically exported, confirm neither reads request-time data (they don't).

- [ ] **Step 6: Commit**

```bash
git add components/person-json-ld.tsx app/layout.tsx app/sitemap.ts app/robots.ts
git commit -m "Adds SEO metadata, JSON-LD, sitemap, and robots.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Task 17: Final verification + polish pass

**Files:**

- Modify: any icon/component needing dark-theme color fixes discovered during review.
- Modify: `CLAUDE.md` (document new architecture).

- [ ] **Step 1: Full lint + format + typecheck + build**

Run:

```bash
npx tsc --noEmit
npm run lint
npm run lint:css
npm run format:check
npm run build
```

Expected: all pass. Fix any issues (run `npm run format` to auto-fix formatting).

- [ ] **Step 2: Cross-cutting browser QA**

`npm run dev`. For BOTH themes and at 320px / 768px / 1440px / 2500px, screenshot the full page and verify against mockups:

- Theme toggle position (mobile inside navy card, desktop top-right) and correct recoloring of every section, including the inverted Summary panel.
- Social icons and domain/personal icons are visible in BOTH themes. If any icon is hardcoded to a color that disappears on one theme, update that icon to use `currentColor` (or pass the correct `variant`) and re-screenshot.
- Language switch updates all copy in all 5 languages; `<html lang>` updates.
- Temporarily set `features.portfolio = true`, screenshot the portfolio rendering against the mockup, then set it back to `false`.
- Contact form badge placement and themed inputs.

- [ ] **Step 3: Update `CLAUDE.md`**

Update the "Known incomplete areas" section (theme/i18n/education are now implemented) and document the new architecture: `lib/theme`, `lib/i18n` (provider + typed dictionaries + `Messages` parity type), `data/` modules, `lib/features.ts` flag, Web3Forms contact form (`NEXT_PUBLIC_WEB3FORMS_KEY`), and SEO files. Note that translatable copy lives in `lib/i18n/messages/` and structural data in `data/`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Polishes theming and updates project documentation.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-review notes (addressed)

- **Spec coverage:** theme (T1–2,6–7), i18n all 5 langs (T3–5,9–11,14), portfolio hidden (T12–13), work-experience layout+6 roles (T10), education rebuild (T11), responsive 320–2500 + toggle placement (T13), contact form Web3Forms (T15), SEO metadata/JSON-LD/sitemap/robots (T16), Download CV restyle (T9), keep existing personal data (T8). All covered.
- **Implementer verification notes (not placeholders — all code is complete):** the slider toggle direction in T7 and the icon-prop typing note in T9 are visual/compile checks with explicit resolution instructions; no incomplete code is left in any task.
- **Type consistency:** `useTheme`/`useTranslation` return shapes, `Messages` type, `Locale` ('uk' not 'ua'; switcher shows label 'UA'), data interfaces, and `features.portfolio` are consistent across tasks.
