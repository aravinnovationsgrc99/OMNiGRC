# OMNiGRC - Enterprise Governance, Risk & Compliance Platform

OMNiGRC is a production-oriented, secure, modular multi-tenant GRC platform designed to streamline risk management, asset inventories, control catalogs, compliance task workflows, evidence collection, and advisory AI control mapping.

---

## Supported Core MVP Pillars
1. **Risk Register**: Deterministic scoring engine (`Likelihood × Impact`), 5×5 heatmap matrix, score history tracking.
2. **Asset & Inventory Management**: Infrastructure assets, SaaS vendor directory, cross-border data flows.
3. **Control Mapping**: Generic multi-framework catalog mapped to clauses in **ISO 27001**, **SOC 2**, **GDPR**, **DPDP**, and **Essential 8**.
4. **Compliance Board**: Kanban workflow (`Not Started`, `In Progress`, `Ready for Review`, `Compliant`, `Needs Attention`) with 30/60/90-day testing views.
5. **Private Evidence Vault**: Supabase Storage `omni-evidence` with signed URL access and append-only audit trails.
6. **Advisory AI Mapping Studio**: Data redaction engine + Tiered LLM router (Gemini 2.5 Flash-Lite / Claude Haiku) + mandatory Human-in-the-Loop approval.

---

## Technical Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, NestJS REST API, Class-Validator
- **Database & Auth**: PostgreSQL via Supabase, Supabase Auth, Row Level Security (RLS)
- **Storage**: Supabase Storage (`omni-evidence` private bucket with signed URLs)
- **Search**: PostgreSQL Full-Text Search (`tsvector` & GIN indexes)

---

## Quick Start & Local Setup

### Prerequisites
- Node.js >= 18.x
- pnpm >= 8.x

### 1. Installation
```bash
pnpm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Database Migrations & Seed Data
Apply Supabase migrations and seed dataset:
```sql
-- Run in Supabase SQL Editor or CLI
\i supabase/migrations/20260824000000_initial_schema.sql
\i supabase/migrations/20260824000001_rls_policies.sql
\i supabase/seed.sql
```

### 4. Running Local Development
```bash
# Start NestJS backend (Port 3001) & Next.js frontend (Port 3000)
pnpm run dev
```

### 5. Running Tests & Verification
```bash
pnpm run typecheck
pnpm run test
pnpm run build
```

---

## Deployment
- **Frontend (Web)**: Deploy `apps/web` to Vercel (Root Directory: `apps/web`).
- **Backend (API)**: Deploy `apps/api` to containerized Node.js host (Render / Railway / Fly.io / AWS ECS).

---

## System Documentation
Detailed technical documentation is available in the [`docs/`](./docs) directory:
- [Architecture Guide](./docs/architecture.md)
- [Database Schema & Framework Model](./docs/database.md)
- [Authentication & RBAC](./docs/authentication.md)
- [Row Level Security (RLS)](./docs/rls.md)
- [Evidence Storage](./docs/storage.md)
- [AI Advisory Engine](./docs/ai.md)
- [Deployment Strategy](./docs/deployment.md)
- [Environment Variables](./docs/environment.md)
- [Testing Strategy](./docs/testing.md)
