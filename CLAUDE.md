# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Next.js dev server with Turbopack at http://localhost:3000
npm run build        # Production build → static export into out/
npm run start        # Serve a production build
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
npm run lint:css     # Stylelint over **/*.css
npm run lint:css:fix # Stylelint autofix
npm run format       # Prettier write over the repo
npm run format:check # Prettier check (no write)
```

There is no test suite in this project.

## Architecture

A single-page personal CV/resume site built with **Next.js 16 App Router**, **React 19**, **TypeScript (strict)**, and **Tailwind CSS v4**.

- **Static export.** `next.config.ts` sets `output: 'export'`, `trailingSlash: true`, and `images.unoptimized`. `npm run build` emits a fully static site into `out/` (no server runtime). Avoid Next.js features that require a server (Route Handlers, server actions, dynamic SSR, `next/image` optimization).
- **One page, composed of sections.** `app/page.tsx` is the entire site: it lays out a two-column flex grid and renders section components (`Summary`, `Greeting`, `PersonalInformation`, `WorkExperience`, `Education`, etc.) from `components/`. To add or reorder a CV section, edit `app/page.tsx` and add a component under `components/`.
- **Content is hardcoded in each component.** Resume data lives as in-file constant arrays/objects inside the section component that renders it (e.g. the `workExperience` array in `components/work-experience.tsx`). There is no CMS, data layer, or i18n content store — editing copy means editing the component.
- **Server components by default; `'use client'` only for interactivity.** Most sections are static server components. Components with state/effects (e.g. `simple-switcher.tsx`, `language-switcher.tsx`) opt in with `'use client'`.
- **Icons** are individual React components under `components/icons/`, many taking a `variant` prop.

## Styling

- **Tailwind v4, CSS-first config.** There is no `tailwind.config.js`. Theme tokens are declared in `app/globals.css` via `@import 'tailwindcss'` and the `@theme` block (e.g. `--color-navy-blue`, `--font-sans`). Add design tokens there, not in a JS config.
- Fonts come from an Adobe Typekit stylesheet linked in `app/layout.tsx` (`source-sans-pro`).
- CSS is linted by Stylelint (`stylelint-config-standard` + `stylelint-config-tailwindcss`); Tailwind at-rules like `@apply`/`@layer` are allowlisted in `.stylelintrc.json`.

## Conventions

- **Path alias `@/*` maps to the repo root** (see `tsconfig.json`), not `src/`. Imports mix `@/components/...` and relative `../components/...`; prefer `@/`.
- Components are default exports, one per file, kebab-case filenames.

## Known incomplete areas

- The theme switcher (`full-size-theme-switcher.tsx` / `simple-switcher.tsx`) is UI-only — dark-mode CSS in `app/globals.css` is commented out, so toggling does not change the theme.
- The language switcher only tracks selected language in local state; there is no actual translation/i18n wired up.
- The Education section was recently added and is noted as not yet finished.
