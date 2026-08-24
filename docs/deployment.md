# Deployment Strategy & Vercel Configuration

## Frontend Deployment (Vercel)
- `apps/web` is structured as a Next.js application independently deployable to Vercel.
- Vercel Root Directory setting: `apps/web`
- Build Command: `pnpm run build`
- Environment Variables required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_API_URL`

## Backend Deployment Target
- `apps/api` (NestJS) requires a Node.js long-running server environment.
- Recommended Hosting Targets: Render, Railway, Fly.io, or AWS ECS / Fargate.
- Environment Variables required: `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`, `PORT`
