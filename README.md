# CebulaCore Lite — AI-Powered Cloud Architecture Advisor

A production-quality Next.js 15 frontend for an internship project. Converts business requirements into cloud architecture recommendations across AWS, Azure, and GCP.

## Quick Start

```bash
unzip cebulacore-lite.zip && cd cebulacore-lite
npm install
npm run dev
```

Open http://localhost:3000

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, features, CTA |
| `/login` | Split-panel login |
| `/register` | Account creation |
| `/dashboard` | KPI widgets, charts, activity feed |
| `/wizard` | 5-step requirement submission form |
| `/recommendations` | Architecture results with AWS/Azure/GCP services |
| `/cost-comparison` | Interactive cost cards + area/bar charts |
| `/assistant` | AI chat interface |
| `/architecture` | Architecture diagram viewer with zoom |
| `/profile` | Profile / org / theme settings |

## API Endpoints (placeholders in src/data/mock.ts)

- POST /auth/login
- POST /auth/register
- GET/POST /recommendations
- GET /cost-estimation
- POST /chat
- GET /architectures

Set NEXT_PUBLIC_API_BASE_URL in .env.local to connect a backend.

## Tech Stack

Next.js 15 · TypeScript · Tailwind CSS v4 · Recharts · next-themes · lucide-react
