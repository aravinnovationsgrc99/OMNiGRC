-- Enable RLS on Profiles and Organizations
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;

-- Helper function for organization membership check
CREATE OR REPLACE FUNCTION public.is_org_member(target_org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE organization_id = target_org_id
    AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Organizations Policies
CREATE POLICY "Users can read organizations they belong to"
  ON public.organizations FOR SELECT
  USING (id IN (SELECT organization_id FROM public.organization_members WHERE user_id = auth.uid()));

-- Profiles Policies
CREATE POLICY "Users can read all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid());

-- Organization Members Policies
CREATE POLICY "Members can view organization memberships"
  ON public.organization_members FOR SELECT
  USING (is_org_member(organization_id));

-- Enable RLS on Tenant-Owned Tables
ALTER TABLE public.risks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.risk_score_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.control_framework_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_mapping_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_mapping_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.control_mapping_reviews ENABLE ROW LEVEL SECURITY;

-- Dynamic Policy Generation for Tenant-Owned Tables
-- RISKS
CREATE POLICY "Tenant Read Risks" ON public.risks FOR SELECT USING (is_org_member(organization_id));
CREATE POLICY "Tenant Insert Risks" ON public.risks FOR INSERT WITH CHECK (is_org_member(organization_id));
CREATE POLICY "Tenant Update Risks" ON public.risks FOR UPDATE USING (is_org_member(organization_id));
CREATE POLICY "Tenant Delete Risks" ON public.risks FOR DELETE USING (is_org_member(organization_id));

-- RISK SCORE HISTORY
CREATE POLICY "Tenant Read Risk History" ON public.risk_score_history FOR SELECT USING (is_org_member(organization_id));
CREATE POLICY "Tenant Insert Risk History" ON public.risk_score_history FOR INSERT WITH CHECK (is_org_member(organization_id));

-- ASSETS
CREATE POLICY "Tenant Read Assets" ON public.assets FOR SELECT USING (is_org_member(organization_id));
CREATE POLICY "Tenant Insert Assets" ON public.assets FOR INSERT WITH CHECK (is_org_member(organization_id));
CREATE POLICY "Tenant Update Assets" ON public.assets FOR UPDATE USING (is_org_member(organization_id));
CREATE POLICY "Tenant Delete Assets" ON public.assets FOR DELETE USING (is_org_member(organization_id));

-- VENDORS
CREATE POLICY "Tenant Read Vendors" ON public.vendors FOR SELECT USING (is_org_member(organization_id));
CREATE POLICY "Tenant Insert Vendors" ON public.vendors FOR INSERT WITH CHECK (is_org_member(organization_id));
CREATE POLICY "Tenant Update Vendors" ON public.vendors FOR UPDATE USING (is_org_member(organization_id));
CREATE POLICY "Tenant Delete Vendors" ON public.vendors FOR DELETE USING (is_org_member(organization_id));

-- DATA FLOWS
CREATE POLICY "Tenant Read Data Flows" ON public.data_flows FOR SELECT USING (is_org_member(organization_id));
CREATE POLICY "Tenant Insert Data Flows" ON public.data_flows FOR INSERT WITH CHECK (is_org_member(organization_id));
CREATE POLICY "Tenant Update Data Flows" ON public.data_flows FOR UPDATE USING (is_org_member(organization_id));
CREATE POLICY "Tenant Delete Data Flows" ON public.data_flows FOR DELETE USING (is_org_member(organization_id));

-- CONTROLS
CREATE POLICY "Tenant Read Controls" ON public.controls FOR SELECT USING (is_org_member(organization_id));
CREATE POLICY "Tenant Insert Controls" ON public.controls FOR INSERT WITH CHECK (is_org_member(organization_id));
CREATE POLICY "Tenant Update Controls" ON public.controls FOR UPDATE USING (is_org_member(organization_id));
CREATE POLICY "Tenant Delete Controls" ON public.controls FOR DELETE USING (is_org_member(organization_id));

-- CONTROL FRAMEWORK MAPPINGS
CREATE POLICY "Tenant Read Control Mappings" ON public.control_framework_mappings FOR SELECT USING (is_org_member(organization_id));
CREATE POLICY "Tenant Insert Control Mappings" ON public.control_framework_mappings FOR INSERT WITH CHECK (is_org_member(organization_id));
CREATE POLICY "Tenant Update Control Mappings" ON public.control_framework_mappings FOR UPDATE USING (is_org_member(organization_id));
CREATE POLICY "Tenant Delete Control Mappings" ON public.control_framework_mappings FOR DELETE USING (is_org_member(organization_id));

-- COMPLIANCE TASKS
CREATE POLICY "Tenant Read Tasks" ON public.compliance_tasks FOR SELECT USING (is_org_member(organization_id));
CREATE POLICY "Tenant Insert Tasks" ON public.compliance_tasks FOR INSERT WITH CHECK (is_org_member(organization_id));
CREATE POLICY "Tenant Update Tasks" ON public.compliance_tasks FOR UPDATE USING (is_org_member(organization_id));
CREATE POLICY "Tenant Delete Tasks" ON public.compliance_tasks FOR DELETE USING (is_org_member(organization_id));

-- EVIDENCE
CREATE POLICY "Tenant Read Evidence" ON public.evidence FOR SELECT USING (is_org_member(organization_id));
CREATE POLICY "Tenant Insert Evidence" ON public.evidence FOR INSERT WITH CHECK (is_org_member(organization_id));
CREATE POLICY "Tenant Delete Evidence" ON public.evidence FOR DELETE USING (is_org_member(organization_id));

-- AUDIT LOGS
CREATE POLICY "Tenant Read Audit Logs" ON public.audit_logs FOR SELECT USING (is_org_member(organization_id));
CREATE POLICY "Tenant Insert Audit Logs" ON public.audit_logs FOR INSERT WITH CHECK (is_org_member(organization_id));

-- AI MAPPING & REVIEWS
CREATE POLICY "Tenant Read AI Requests" ON public.ai_mapping_requests FOR SELECT USING (is_org_member(organization_id));
CREATE POLICY "Tenant Insert AI Requests" ON public.ai_mapping_requests FOR INSERT WITH CHECK (is_org_member(organization_id));

-- FRAMEWORKS & CLAUSES (Public Read Access)
ALTER TABLE public.frameworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.framework_clauses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Frameworks" ON public.frameworks FOR SELECT USING (true);
CREATE POLICY "Public Read Framework Clauses" ON public.framework_clauses FOR SELECT USING (true);
