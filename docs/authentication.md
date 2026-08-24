# Authentication & Authorization (RBAC)

## Authentication Engine
- Supabase Auth (Email/Password authentication)
- Protected API endpoints using `TenantAuthGuard`
- Profile mapping (`profiles` table linked to `auth.users`)

## Extensible RBAC Roles
- `owner`: Full organization management, member invitations, evidence management
- `admin`: Risk, Asset, Control, and Compliance task editing
- `analyst`: Risk assessment updates, AI suggestion reviews, evidence uploads
- `viewer`: Read-only access to organization GRC stance
