# CebulaCore Lite

**AI-Powered Cloud Architecture Advisor.** CebulaCore Lite converts business requirements into cloud architecture recommendations across AWS, Azure, and GCP.

> **Advisory-only.** This platform never accesses, modifies, deploys, or manages your cloud resources. It reads requirements and returns a recommendation — nothing is provisioned on your behalf.

## Tech stack

Next.js 15 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Recharts · Zustand · React Hook Form + Zod · Lucide React

UI primitives in `components/ui` follow the shadcn/ui pattern (same API shape — `Button`, `Card`, `Badge`, `Tabs`, etc.) but are hand-written without Radix, to keep the dependency tree light. Swap in real shadcn/ui components any time without changing how the rest of the app calls them.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

```bash
npm run build && npm run start   # production build
```

The first build downloads Space Grotesk, Inter, and JetBrains Mono from Google Fonts via `next/font/google` — make sure the machine running `npm run build` has internet access (this sandbox's network is restricted to package registries, so fonts couldn't be fetched here, but it works normally on a developer machine or in CI/CD with normal internet access).

## Project structure

```
app/
  page.tsx                 Landing page (hero, features, comparison, workflow, testimonials, CTA)
  login/, register/        Auth pages
  (app)/layout.tsx         Authenticated shell: sidebar + top nav + mobile drawer + floating assistant button
  (app)/dashboard/         Dashboard widgets, recent activity, quick actions
  (app)/wizard/            5-step Requirement Wizard
  (app)/recommendations/   Recommendation results (scores, provider comparison, reasoning)
  (app)/cost-comparison/   AWS/Azure/GCP cost cards + monthly/annual Recharts comparison
  (app)/assistant/         Full-page AI chat
  (app)/architecture/      Zoomable architecture canvas with PNG export
  (app)/profile/           Profile / organization / theme settings
components/                AIOrb, GlowCard, GlassPanel, FloatingRibbon, CostChart, RecommendationCard,
                           ArchitectureNode, Sidebar, TopNavbar, ChatInterface, MobileDrawer, ui/*
lib/
  api.ts                   All backend calls, isolated and typed (see below)
  store.ts                 Zustand store: wizard state, active recommendation, chat history
  mock-data.ts             Recommendation engine + architecture blueprints + dashboard mock data
types/index.ts              Shared TypeScript interfaces
```

## Connecting a real backend

Every network call lives in `lib/api.ts`, already typed against the intended endpoints:

```
POST /auth/login
POST /auth/register
POST /recommendations
POST /cost-estimation
POST /chat
GET  /architectures
```

Right now each function in `api` resolves with mock data after a simulated delay (see `lib/mock-data.ts` for the recommendation-scoring logic). To go live, replace the body of each function with a real `fetch(`${API_BASE_URL}/...`)` call — the call sites in the UI (wizard, assistant, cost comparison) don't need to change. `API_BASE_URL` reads from `NEXT_PUBLIC_API_BASE_URL`; add a `.env.local` to override it.

## Design notes

- Colors, glassmorphism, and glow values follow the brief exactly (`#050816` background, `#2563EB` / `#7C3AED` / `#A855F7` glow ramp).
- Typography: **Space Grotesk** for display/headlines, **Inter** for body copy, **JetBrains Mono** for service names, scores, and cost figures — ties the "cloud architecture" subject matter to a technical, data-readout feel.
- The signature element is the `AIOrb` — a layered radial bloom with counter-rotating gradient rings, reused in the hero, the AI Assistant, and the floating assistant button so it reads as one consistent "AI presence" across the product.
- Respects `prefers-reduced-motion` and keeps visible focus rings throughout.
