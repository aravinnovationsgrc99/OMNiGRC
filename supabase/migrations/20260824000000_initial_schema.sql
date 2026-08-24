-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Organizations
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Profiles (links to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Organization Memberships
CREATE TABLE IF NOT EXISTS public.organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('owner', 'admin', 'analyst', 'viewer')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

-- 4. Risks
CREATE TABLE IF NOT EXISTS public.risks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    likelihood INT NOT NULL CHECK (likelihood BETWEEN 1 AND 5),
    impact INT NOT NULL CHECK (impact BETWEEN 1 AND 5),
    risk_score INT NOT NULL CHECK (risk_score BETWEEN 1 AND 25),
    status VARCHAR(50) NOT NULL DEFAULT 'identified',
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    treatment_plan TEXT,
    due_date DATE,
    search_vector TSVECTOR GENERATED ALWAYS AS (
        to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(category, ''))
    ) STORED,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Risk Score History
CREATE TABLE IF NOT EXISTS public.risk_score_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    risk_id UUID NOT NULL REFERENCES public.risks(id) ON DELETE CASCADE,
    likelihood INT NOT NULL,
    impact INT NOT NULL,
    risk_score INT NOT NULL,
    changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    changed_at TIMESTAMPTZ DEFAULT NOW(),
    reason TEXT
);

-- 6. Assets
CREATE TABLE IF NOT EXISTS public.assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    criticality VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    environment VARCHAR(50) NOT NULL DEFAULT 'production',
    search_vector TSVECTOR GENERATED ALWAYS AS (
        to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '') || ' ' || coalesce(type, ''))
    ) STORED,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Vendors
CREATE TABLE IF NOT EXISTS public.vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Data Flows
CREATE TABLE IF NOT EXISTS public.data_flows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    data_category VARCHAR(255) NOT NULL,
    purpose TEXT NOT NULL,
    asset_id UUID REFERENCES public.assets(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Risk Assets Junction
CREATE TABLE IF NOT EXISTS public.risk_assets (
    risk_id UUID REFERENCES public.risks(id) ON DELETE CASCADE,
    asset_id UUID REFERENCES public.assets(id) ON DELETE CASCADE,
    PRIMARY KEY (risk_id, asset_id)
);

-- 10. Asset Vendors Junction
CREATE TABLE IF NOT EXISTS public.asset_vendors (
    asset_id UUID REFERENCES public.assets(id) ON DELETE CASCADE,
    vendor_id UUID REFERENCES public.vendors(id) ON DELETE CASCADE,
    PRIMARY KEY (asset_id, vendor_id)
);

-- 11. Frameworks (Global system frameworks & optional custom frameworks)
CREATE TABLE IF NOT EXISTS public.frameworks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    version VARCHAR(50) NOT NULL,
    description TEXT,
    is_system BOOLEAN DEFAULT true
);

-- 12. Framework Clauses
CREATE TABLE IF NOT EXISTS public.framework_clauses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    framework_id UUID NOT NULL REFERENCES public.frameworks(id) ON DELETE CASCADE,
    clause_identifier VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    search_vector TSVECTOR GENERATED ALWAYS AS (
        to_tsvector('english', coalesce(clause_identifier, '') || ' ' || coalesce(title, '') || ' ' || coalesce(description, ''))
    ) STORED
);

-- 13. Controls
CREATE TABLE IF NOT EXISTS public.controls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    control_code VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    testing_frequency VARCHAR(50) NOT NULL DEFAULT 'quarterly',
    next_test_date DATE,
    search_vector TSVECTOR GENERATED ALWAYS AS (
        to_tsvector('english', coalesce(control_code, '') || ' ' || coalesce(name, '') || ' ' || coalesce(description, ''))
    ) STORED,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Control Framework Mappings (N:M Control -> Framework Clause)
CREATE TABLE IF NOT EXISTS public.control_framework_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    control_id UUID NOT NULL REFERENCES public.controls(id) ON DELETE CASCADE,
    framework_clause_id UUID NOT NULL REFERENCES public.framework_clauses(id) ON DELETE CASCADE,
    mapping_type VARCHAR(50) DEFAULT 'direct',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, control_id, framework_clause_id)
);

-- 15. Control Risks Junction
CREATE TABLE IF NOT EXISTS public.control_risks (
    control_id UUID REFERENCES public.controls(id) ON DELETE CASCADE,
    risk_id UUID REFERENCES public.risks(id) ON DELETE CASCADE,
    PRIMARY KEY (control_id, risk_id)
);

-- 16. Control Assets Junction
CREATE TABLE IF NOT EXISTS public.control_assets (
    control_id UUID REFERENCES public.controls(id) ON DELETE CASCADE,
    asset_id UUID REFERENCES public.assets(id) ON DELETE CASCADE,
    PRIMARY KEY (control_id, asset_id)
);

-- 17. Compliance Tasks (Kanban Board Items)
CREATE TABLE IF NOT EXISTS public.compliance_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    control_id UUID NOT NULL REFERENCES public.controls(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'ready_for_review', 'compliant', 'needs_attention')),
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    priority VARCHAR(50) NOT NULL DEFAULT 'medium',
    due_date DATE,
    next_test_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Evidence Metadata (Files stored in Supabase Storage `omni-evidence`)
CREATE TABLE IF NOT EXISTS public.evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. Append-Only Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. AI Mapping Requests
CREATE TABLE IF NOT EXISTS public.ai_mapping_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    control_id UUID NOT NULL REFERENCES public.controls(id) ON DELETE CASCADE,
    sanitized_prompt TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    provider VARCHAR(50) NOT NULL,
    model_tier VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. AI Mapping Suggestions
CREATE TABLE IF NOT EXISTS public.ai_mapping_suggestions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES public.ai_mapping_requests(id) ON DELETE CASCADE,
    control_id UUID NOT NULL REFERENCES public.controls(id) ON DELETE CASCADE,
    framework_clause_id UUID NOT NULL REFERENCES public.framework_clauses(id) ON DELETE CASCADE,
    confidence_score NUMERIC(3,2) NOT NULL,
    reasoning TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'overridden', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. Control Mapping Reviews (Human Approval Log)
CREATE TABLE IF NOT EXISTS public.control_mapping_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    suggestion_id UUID NOT NULL REFERENCES public.ai_mapping_suggestions(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
    decision VARCHAR(50) NOT NULL CHECK (decision IN ('approved', 'overridden', 'rejected')),
    override_clause_id UUID REFERENCES public.framework_clauses(id) ON DELETE SET NULL,
    comments TEXT,
    reviewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for optimal querying & search
CREATE INDEX IF NOT EXISTS idx_risks_org ON public.risks(organization_id, status);
CREATE INDEX IF NOT EXISTS idx_risks_search ON public.risks USING GIN(search_vector);

CREATE INDEX IF NOT EXISTS idx_assets_org ON public.assets(organization_id, status);
CREATE INDEX IF NOT EXISTS idx_assets_search ON public.assets USING GIN(search_vector);

CREATE INDEX IF NOT EXISTS idx_controls_org ON public.controls(organization_id, status);
CREATE INDEX IF NOT EXISTS idx_controls_search ON public.controls USING GIN(search_vector);

CREATE INDEX IF NOT EXISTS idx_framework_clauses_search ON public.framework_clauses USING GIN(search_vector);

CREATE INDEX IF NOT EXISTS idx_compliance_tasks_org ON public.compliance_tasks(organization_id, status, due_date);
CREATE INDEX IF NOT EXISTS idx_evidence_org ON public.evidence(organization_id, entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_org ON public.audit_logs(organization_id, created_at);
