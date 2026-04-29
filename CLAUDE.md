# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`, `pnpm-workspace.yaml`).

- `pnpm dev` — Next.js dev server (Turbopack root pinned to project in `next.config.ts`)
- `pnpm build` — production build
- `pnpm start` — run production build
- `pnpm lint` — ESLint (flat config in `eslint.config.mjs`, extends `eslint-config-next`)

There is no test runner configured.

## Critical: Next.js 16

This project is on **Next.js 16.2.1 + React 19.2.4**. Per `AGENTS.md`, this version has breaking changes from training-data Next.js — APIs, conventions, and file structure may differ. **Read the relevant guide in `node_modules/next/dist/docs/` before writing Next-specific code** and heed deprecation notices. Do not rely on memorized Next.js patterns.

## Architecture

The site is a Korean-language portfolio/marketing site for a web-dev agency ("Oriental Melon"). It is a static-feeling marketing site with one server action for the contact form — no database, no CMS.

### Layered structure (Feature-Sliced-style)

Code under `src/` is organized by layer, not by route:

- **`src/app/`** — Next.js App Router only. Routes live under the `(root)` group: `/`, `/about`, `/work`, `/work/[slug]`, `/contact`. Pages are thin and compose widgets.
- **`src/widgets/`** — Page-level composite sections (`hero`, `header`, `footer`, `selected-projects`, `work-grid`, `contact-form`, `cta-banner`, etc.). Each widget is a folder exporting from `index.tsx`; some split server/client (e.g. `header/ui/header.tsx` server wrapper + `header-client.tsx`).
- **`src/features/`** — User-action units. Currently only `send-contact/action.ts` (a `"use server"` Server Action calling Resend).
- **`src/shared/`** — Cross-cutting code:
  - `config/site.ts` — site name, URL, nav items (single source of truth for navigation)
  - `data/projects.ts` — **all portfolio project content lives here as a typed `Project[]`**. There is no CMS; adding a project means editing this file. `/work/[slug]` reads from this array.
  - `lib/` — schemas (`contact-schema.ts`), hooks (`use-lock-body-scroll.ts`), providers (`theme-provider.tsx`)
  - `ui/` — reusable presentational components (`image-gallery`, `theme-toggle`)

Path alias `@/*` → `./src/*` (see `tsconfig.json`).

### Data flow for the contact form

1. `widgets/contact-form/index.tsx` — client form using React Hook Form + Zod resolver
2. Schema + budget options in `shared/lib/contact-schema.ts` (shared between client validation and server validation)
3. `features/send-contact/action.ts` — Server Action: re-validates with Zod, then sends via Resend
4. **Dev fallback**: if `RESEND_API_KEY` is unset, the action logs the payload and returns success — no email sent. Set `RESEND_API_KEY` and `CONTACT_EMAIL` (see `.env.local.example`) to actually send.

### Styling & theming

- **Tailwind CSS v4** via `@tailwindcss/postcss` (no `tailwind.config.*` — config is in CSS, see `src/app/globals.css`).
- **Dark mode** via `next-themes` with `attribute="class"`, system default. `ThemeProvider` wraps everything in `app/layout.tsx`.
- Pretendard webfont is loaded via CDN `<link>` in the root layout `<head>`; Geist Sans/Mono come from `next/font/google`.
- `suppressHydrationWarning` is intentional on `<html>` — required by `next-themes`.

### Animation

Use **Framer Motion** for interactions. The PRD explicitly calls for Apple/Toss/Kakao-style polish; avoid AI-looking generic effects.

## Project conventions (from PRD.md)

- **No** Supabase, external CMS, or heavy state-management libraries. Project data is hardcoded in `src/shared/data/*.ts`.
- Site copy is Korean (`lang="ko"`, `locale: "ko_KR"`).
- The `/services` page was intentionally removed — process and strengths are folded into Home and About.
- Routes are: `/`, `/about`, `/work`, `/work/[slug]`, `/contact`.
