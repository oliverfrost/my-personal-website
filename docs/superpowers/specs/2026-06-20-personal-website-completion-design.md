# Personal Website Completion — Design Spec

**Date:** 2026-06-20
**Status:** Approved (pending spec review)

## 1. Goal

Finish the personal CV/portfolio website so it matches the provided mockups (mobile + desktop), with production-grade code quality suitable for a portfolio piece. The site is a Next.js 16 App Router project built as a **static export** (`output: 'export'`), so every feature must work without a backend.

## 2. Scope

Complete the following, replicating the mockup **design** while keeping the project's existing **data** (except where noted), and using mock data only where genuinely missing:

1. Light/dark theme switching (currently dummy UI).
2. Full internationalization across 5 languages (currently dummy UI).
3. Portfolio section — built but hidden behind a feature flag.
4. Work Experience timeline layout fix + data update.
5. Education section rebuild (currently broken).
6. Responsive layout 320px–2500px, including responsive theme-toggle placement.
7. Contact form wired to a third-party service.
8. SEO / discoverability package.

No automated test suite exists; verification is visual in-browser at multiple widths. Not introducing a test framework unless requested.

## 3. Decisions (confirmed with user)

- **i18n:** Full i18n, all 5 languages (EN, ES, DE, UK, RU). English authored from existing copy; ES/DE/UK/RU generated as mock translations to be refined later.
- **Contact form:** Third-party service — **Web3Forms** (access key via env var; user supplies key at implementation time).
- **Theme behavior:** Default to OS `prefers-color-scheme`; persist manual toggle in `localStorage`; no flash of incorrect theme on load.
- **Work history:** Replace current 3 entries (incl. "Previous Company" placeholder) with the **6 roles** from the mockup, treated as real history: TurnKey Labs, DataArt (Senior), DataArt (Middle), EOS Data Analytics (EOSDA), Ciklum, Cupid plc.
- **Download CV button:** Keep, but restyle to fit both themes.
- **Multilingual SEO:** English-only indexing is acceptable — keep client-side i18n at a single URL (no per-locale routing).

## 4. Architecture

### 4.1 Theme (light/dark)

- Class-based dark mode using Tailwind v4: add `@custom-variant dark (&:where(.dark, .dark *))` to `app/globals.css`.
- Define a full design-token set as CSS variables for **both** themes: background, foreground, navy surface, muted text, borders, slider track/fill, badge colors.
- `ThemeProvider` (client component): reads OS preference on first load, persists manual toggle to `localStorage` under a stable key, toggles `.dark` class on `<html>`.
- Inline blocking script in `<head>` applies saved/system theme before hydration (anti-FOUC).
- Wire existing `SimpleSwitcher` and `FullSizeThemeSwitcher` to the provider via context.

### 4.2 i18n

- Lightweight, type-safe, zero-dependency client layer (chosen over next-intl / react-i18next because the site is a single client-rendered static-export page; URL locale routing would add friction with no SEO benefit given the English-only-indexing decision).
- `messages/{en,es,de,uk,ru}.ts` — typed dictionaries holding every translatable string. A shared `Messages` type derived from the English dictionary enforces key parity.
- `LanguageProvider` + `useTranslation()` hook returning a typed `t(key)`. Default locale derived from `navigator.language`, persisted to `localStorage`.
- Keep `<html lang>` in sync with the active locale (updated client-side).
- **Data separation:** translatable copy → dictionaries; structural data (skill percentages, dates, language proficiency levels, URLs, social links, project metadata) → typed modules under `data/`.

### 4.3 Feature flags

- `features.ts` exporting a typed flags object, e.g. `{ portfolio: false }`. `page.tsx` conditionally renders the Portfolio section. Flipping one flag reveals it.

### 4.4 Contact form

- Web3Forms POST including `access_key` from `process.env.NEXT_PUBLIC_WEB3FORMS_KEY`.
- Client-side validation; explicit loading / success / error UI states; resets on success.

### 4.5 SEO

- `app/layout.tsx` metadata: real title, meaningful description, Open Graph + Twitter Card tags, OG share image, canonical URL.
- `app/sitemap.ts` and `app/robots.ts` (emitted as `sitemap.xml` / `robots.txt` on export).
- JSON-LD `Person` structured data injected in the document.
- Semantic landmarks, correct heading hierarchy, `alt` text on images, `<html lang>` attribute.

## 5. Components

**New**
- `ThemeProvider`, `LanguageProvider`, `useTranslation` hook
- `Portfolio` + `PortfolioItem`
- `features.ts`, `data/` modules, `messages/` dictionaries
- JSON-LD structured-data helper

**Refactored**
- `work-experience-item` → responsive timeline: date badge in a left column beside the timeline line on desktop, stacked above content on mobile.
- `education` → rebuilt to mirror the same clean timeline; remove duplicated mobile/desktop blocks. The mockup shows the university crest; since no logo asset exists in the repo, the rebuild reserves a slot for it but omits the broken `university-logo.png` for now (logo added later when an asset is provided).
- `page.tsx` → navy Summary becomes a left sidebar on desktop / top card on mobile; theme toggle lives inside the navy card on mobile and in a top-right bar on desktop; add a centered max-width container so very wide (2500px) screens don't stretch.
- All section components → pull copy from `useTranslation()` instead of inline strings.

**Restyled**
- Download CV button and "Open for new opportunities" badge themed for both modes; badge top-center on mobile, top-right on desktop.

## 6. Responsive behavior

- Verified at representative widths across 320px–2500px.
- Mobile: single column; navy Summary card on top containing name, title, socials, and compact theme toggle.
- Desktop: two columns — navy Summary sidebar (left), content (right) with language switcher + theme toggle top-right.
- Ultra-wide: content constrained by a centered max-width container.

## 7. Out of scope

- Automated test framework.
- Per-locale routed/indexed pages (hreflang).
- Real backend for the contact form.

## 8. Verification

- Visual in-browser checks (light + dark, all 5 languages, portfolio flag on/off) at multiple widths.
- `npm run lint`, `npm run lint:css`, `npm run format:check`, and a successful `npm run build` (static export).
