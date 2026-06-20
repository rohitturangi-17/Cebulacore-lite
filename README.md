# CebulaCore Lite

AI-Powered Cloud Architecture Advisor — a Next.js 15 frontend that converts business
requirements into cloud architecture recommendations across AWS, Azure, and GCP.

**This is advisory-only.** It never accesses, modifies, deploys, or manages real
cloud resources. All data in this build is mocked.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS (custom CebulaCore design tokens)
- shadcn/ui-style primitives built on Radix UI
- Framer Motion, Recharts, Zustand, React Hook Form + Zod
- next-themes (dark-only for this release)

## Project structure

```
app/                  Routes (App Router)
  page.tsx            Landing page
  auth/login, auth/register
  dashboard/
  wizard/              5-step requirement wizard
  recommendations/     List + detail (?id=...)
  cost-comparison/
  assistant/           AI chat interface
  architecture/        Diagram viewer
  profile/
components/
  ui/                 Base primitives (button, card, input, select, tabs, dialog...)
  layout/             Sidebar, TopNavbar, MobileNav, AppShell, AuthLayout
  shared/             AIOrb, GlowCard, GlassPanel, AnimatedCounter, FloatingRibbon
  landing/, dashboard/, wizard/, recommendations/, cost/, assistant/, architecture/, profile/
lib/
  api.ts              Single integration point for a future backend
  types/               Shared TypeScript types
  mock/                Mock data (recommendations, cost, activity, diagrams)
store/                Zustand stores (auth, UI/sidebar, wizard state)
```

## Connecting a real backend later

Everything network-related goes through `lib/api.ts`. Each exported function
(`login`, `register`, `createRecommendation`, `estimateCost`, `sendChatMessage`,
`listArchitectures`, ...) currently resolves mock data after a simulated delay.
To wire up a real backend:

1. Set `NEXT_PUBLIC_API_BASE_URL` in your environment.
2. Replace the body of each function in `lib/api.ts` with a real `fetch` call to
   that endpoint. Page and component code does not need to change, since they only
   import from this file.

Planned endpoints (placeholders, matching this build's function names):
- `POST /auth/login`
- `POST /auth/register`
- `POST /recommendations`
- `POST /cost-estimation`
- `POST /chat`
- `GET /architectures`

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Deploying to your existing EC2 + pm2 setup

This matches the workflow you already have running:

```bash
# On EC2, inside the project directory
nvm use 20            # match your existing Node 20 setup
npm install
npm run build

# If pm2 already has a process for the old build:
pm2 restart cebulacore-lite

# If this is a fresh process:
pm2 start npm --name "cebulacore-lite" -- start -- -p 3000
pm2 save
```

Notes carried over from your prior deployment troubleshooting:
- If you see native binary errors after `npm install`, delete `node_modules` and
  `package-lock.json` and reinstall clean (this happened previously after Node
  version mismatches).
- Confirm the EC2 Security Group still has the inbound port (3000, or whichever
  you map pm2/nginx to) open.
- This build deliberately avoids `next/font` Google Fonts calls so it doesn't
  depend on outbound access to `fonts.googleapis.com` at build time. If your EC2
  instance has normal internet access, you can swap the system font stacks in
  `app/globals.css` for real `next/font` Geist/Inter imports for a closer match
  to the original design intent.

## What's mocked vs. real in this build

**Real:** full routing, all UI/UX, responsive layouts, form validation (Zod),
client-side state (Zustand), charts (Recharts) rendering against static data,
animated diagram canvas, multi-step wizard logic.

**Mocked:** authentication (any email/password "succeeds"), AI recommendations
and chat replies (drawn from a small fixed set), architecture diagrams (two
hand-built examples), cost data (static time series).

This honest split — a feature-complete frontend with mocked data, plus a typed
API layer ready for a real backend — is intentional, matching how this project
is scoped for the internship deliverable.
