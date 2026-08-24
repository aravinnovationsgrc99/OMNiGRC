# Row Level Security (RLS) & Multi-Tenant Isolation

## Strategy
1. Every tenant-owned table contains `organization_id UUID NOT NULL REFERENCES organizations(id)`.
2. PostgreSQL RLS is enabled on all 22 tables (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`).
3. Database helper function checks membership:
   `is_org_member(target_org_id UUID)` queries `organization_members` for `auth.uid()`.
4. Cross-tenant access is rejected at both the REST API layer (`TenantAuthGuard`) and PostgreSQL RLS policy level.
