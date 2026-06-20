# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Next.js dev server with Turbopack at http://localhost:3000
npm run build        # Production build → static export into out/
npm run start        # Serve a production build
npm run lint         # ESLint (flat config: @next/eslint-plugin-next core-web-vitals + typescript-eslint)
npm run lint:css     # Stylelint over **/*.css
npm run lint:css:fix # Stylelint autofix
npm run format       # Prettier write over the repo
npm run format:check # Prettier check (no write)
```

There is no test suite in this project.

## Architecture

A single-page personal CV/resume site built with **Next.js 16 App Router**, **React 19**, **TypeScript (strict)**, and **Tailwind CSS v4**.

- **Static export.** `next.config.ts` sets `output: 'export'`, `trailingSlash: true`, and `images.unoptimized`. `npm run build` emits a fully static site into `out/` (no server runtime). Avoid Next.js features that require a server (Route Handlers, server actions, dynamic SSR, `next/image` optimization).
- **One page, composed of sections.** `app/page.tsx` is the entire site: a responsive layout (navy `Summary` sidebar on desktop / top card on mobile) rendering section components (`Greeting`, `PersonalInformation`, `WorkExperience`, `Education`, `Portfolio`, `ContactForm`, etc.) from `components/`. To add or reorder a CV section, edit `app/page.tsx` and add a component under `components/`.
- **Separation of copy vs. structural data.** Translatable copy lives in typed dictionaries under `lib/i18n/messages/{en,es,de,uk,ru}.ts`; structural data (skill percentages, dates, language levels, URLs, social links, work/education/portfolio entries) lives in typed modules under `data/`. Components read copy via `useTranslation()` and data from `@/data/*` — they no longer hardcode content inline.
- **Theme (light/dark).** `lib/theme/theme-provider.tsx` exposes `useTheme()` and toggles a `.dark` class on `<html>`; an anti-FOUC script (`lib/theme/theme-script.ts`) applies the saved/system theme before hydration. Colors are CSS-variable tokens for both themes in `app/globals.css`; components use semantic Tailwind colors (`bg-surface`, `text-foreground`, `border-border-base`, `bg-track`, etc.), not hardcoded hex.
- **i18n.** `lib/i18n/language-provider.tsx` exposes `useTranslation()` returning `{ locale, setLocale, t }` where `t` is the active dictionary (e.g. `t.sections.workExperience`). The `Messages` type (from `en.ts`) enforces key parity across all locales at compile time. Locale persists to `localStorage` and syncs `<html lang>`. Switching is client-side at a single URL (English-only indexing by design).
- **Feature flags.** `lib/features.ts` gates optional sections; `features.portfolio` is currently `false`, so the Portfolio section is built but hidden — flip it to `true` to reveal it.
- **Client components.** Anything using a provider hook (`useTheme`/`useTranslation`) or state/effects is marked `'use client'`. Pure presentational pieces (e.g. `skill-slider.tsx`) are not.
- **Icons** are individual React components under `components/icons/`. They use `fill/stroke="currentColor"` and inherit the surrounding text color (no `variant` prop) so they adapt to both themes.
- **Contact form** (`components/contact-form.tsx`) POSTs to Web3Forms using `NEXT_PUBLIC_WEB3FORMS_KEY` (see `.env.local.example`); with no key it shows the error state. Static-export friendly (no backend).
- **SEO.** `app/layout.tsx` sets metadata/OpenGraph/Twitter + `metadataBase` from `NEXT_PUBLIC_SITE_URL`; `components/person-json-ld.tsx` injects `Person` JSON-LD; `app/sitemap.ts` and `app/robots.ts` (both `dynamic = 'force-static'`) emit `sitemap.xml`/`robots.txt` on export.

## Styling

- **Tailwind v4, CSS-first config.** There is no `tailwind.config.js`. Theme tokens are declared in `app/globals.css` via `@import 'tailwindcss'` and the `@theme inline` block. Light/dark values are CSS variables under `:root` and `.dark`; dark mode is enabled with `@custom-variant dark (&:where(.dark, .dark *))`. Add design tokens there (define the variable for both themes, then map it under `@theme inline`), not in a JS config.
- Fonts come from an Adobe Typekit stylesheet linked in `app/layout.tsx` (`source-sans-pro`).
- CSS is linted by Stylelint (`stylelint-config-standard` + `stylelint-config-tailwindcss`); Tailwind at-rules like `@apply`/`@layer` are allowlisted in `.stylelintrc.json`.

## Conventions

- **Path alias `@/*` maps to the repo root** (see `tsconfig.json`), not `src/`. Imports mix `@/components/...` and relative `../components/...`; prefer `@/`.
- Components are default exports, one per file, kebab-case filenames.

## Pending / owner-supplied

- **Non-English translations** in `lib/i18n/messages/{es,de,uk,ru}.ts` are machine-generated mock copy — refine for production.
- **Web3Forms key**: create `.env.local` with `NEXT_PUBLIC_WEB3FORMS_KEY` (and `NEXT_PUBLIC_SITE_URL` for SEO) — see `.env.local.example`.
- **Assets**: no OG share image (`openGraph`/`twitter` images omitted until one exists) and no university crest in Education (a layout slot is reserved). Add these when available.
- **Portfolio** is hidden behind `features.portfolio` until real projects exist; `data/portfolio.ts` currently holds placeholder projects.
