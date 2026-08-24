# OMNiGRC Architectural Guide

## Overview
OMNiGRC is built as a production-oriented, modular, multi-tenant Governance, Risk, and Compliance platform.

## System Topology
- **Monorepo Structure**: `pnpm` workspaces separating `apps/web` (Next.js 14 App Router), `apps/api` (NestJS REST API), and `packages/*` (`@omnigrc/types`, `@omnigrc/shared`).
- **Backend Architecture**: NestJS application organized into independent domain modules:
  - `auth`, `organizations`, `users`, `risk`, `assets`, `frameworks`, `controls`, `compliance`, `evidence`, `audit`, `search`, `ai`
- **Database & Storage**: PostgreSQL hosted via Supabase with RLS (Row Level Security) and `omni-evidence` private bucket storage.
- **Search**: PostgreSQL Full-Text Search (`tsvector` & GIN index) for sub-millisecond search across risks, assets, controls, and framework clauses.
- **AI Advisory Engine**: Data Minimization & Redaction Engine + Tiered Provider Router (Gemini 2.5 Flash-Lite / Claude Haiku / DeepSeek fallback) + Schema Validator + Mandatory Human-in-the-Loop approval.

## Tenancy Boundary
All customer entities are scoped by `organization_id`. Server-side validation via `TenantAuthGuard` and database-level RLS policies enforce cross-tenant data isolation.
