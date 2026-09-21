# Rivera Pools Riverside

Marketing site and bilingual customer assistant for Rivera Pools pool remodeling services across Riverside County and nearby communities.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Required API secret: `GEMINI_API_KEY` — Google AI Studio key used only by the API server
- Optional API env: `GEMINI_MODEL` and `CHAT_ALLOWED_ORIGINS`
- Production frontend env: `VITE_CHAT_API_URL` — public URL of the independent API, including `/api`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/mockup-sandbox/src/components/mockups/rivera-pools/` — Rivera Pools landing, local SEO pages, quote form, and chatbot widget
- `artifacts/api-server/src/routes/chat.ts` — bilingual Gemini endpoint with validation, rate limiting, prompt guardrails, and model fallback
- `lib/api-spec/openapi.yaml` — source of truth for the `/api/chat` contract
- `artifacts/mockup-sandbox/public/` — static SEO files including sitemap, robots, and `llms.txt`

## Architecture decisions

- The marketing site is statically prerendered for SEO and deployed independently from the API.
- The chatbot answers common FAQs locally first; only uncaptured questions use the Gemini API.
- `GEMINI_API_KEY` stays server-side. The Vercel frontend receives only the public API URL through `VITE_CHAT_API_URL`.
- Chat requests are short, bilingual, rate-limited, and instructed not to invent prices, diagnoses, appointments, or business facts.

## Product

- Visitors can learn about pool resurfacing, plaster, quartz, pebble, StoneScapes, Diamond Brite, coping, tile, leak detection, and remodeling services.
- Visitors can browse Riverside County area pages, request a free estimate, call the business, and ask the bilingual assistant questions.

## User preferences

- **vercel.json en la raíz**: Al configurar cualquier proyecto Vite SPA para Vercel, siempre crear un `vercel.json` en la raíz con esta estructura base:
  ```json
  {
    "framework": "vite",
    "outputDirectory": "dist/public",
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```
  Ajustar `outputDirectory` según la estructura real del proyecto (ej. `artifacts/mockup-sandbox/dist` en monorepos).

## Gotchas

- Set `VITE_CHAT_API_URL` in the Vercel production environment after the independent API has a public URL; local development defaults to the proxied `/api/chat` path.
- After changing `lib/api-spec/openapi.yaml`, run codegen before typechecking the API server.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
