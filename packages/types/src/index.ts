// Core User & Tenant Types
export type UserRole = 'owner' | 'admin' | 'analyst' | 'viewer';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: UserRole;
  created_at: string;
}

// Risk Module Types
export type RiskSeverityLabel = 'Low' | 'Medium' | 'High' | 'Critical';

export type RiskCategory =
  | 'security'
  | 'compliance'
  | 'operational'
  | 'financial'
  | 'reputational'
  | 'third_party'
  | 'privacy';

export type RiskStatus = 'identified' | 'assessing' | 'mitigating' | 'accepted' | 'closed';

export interface Risk {
  id: string;
  organization_id: string;
  title: string;
  description: string;
  category: RiskCategory;
  likelihood: number; // 1 to 5
  impact: number; // 1 to 5
  risk_score: number; // Calculated: likelihood * impact (1 to 25)
  status: RiskStatus;
  owner_id: string;
  treatment_plan?: string;
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export interface RiskScoreHistory {
  id: string;
  organization_id: string;
  risk_id: string;
  likelihood: number;
  impact: number;
  risk_score: number;
  changed_by: string;
  changed_at: string;
  reason?: string;
}

// Asset & Inventory Types
export type AssetType = 'hardware' | 'software' | 'cloud_service' | 'data_store' | 'physical_facility';
export type AssetCriticality = 'low' | 'medium' | 'high' | 'critical';
export type AssetStatus = 'active' | 'in_development' | 'deprecated' | 'decommissioned';

export interface Asset {
  id: string;
  organization_id: string;
  name: string;
  type: AssetType;
  description: string;
  owner_id: string;
  criticality: AssetCriticality;
  status: AssetStatus;
  environment: string;
  created_at: string;
  updated_at: string;
}

export type VendorType = 'saas' | 'infrastructure' | 'consulting' | 'managed_service' | 'hardware';
export type VendorStatus = 'under_review' | 'active' | 'offboarded' | 'rejected';

export interface Vendor {
  id: string;
  organization_id: string;
  name: string;
  type: VendorType;
  owner_id: string;
  status: VendorStatus;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface DataFlow {
  id: string;
  organization_id: string;
  source: string;
  destination: string;
  data_category: string;
  purpose: string;
  asset_id?: string;
  created_at: string;
  updated_at: string;
}

// Framework & Control Types
export interface Framework {
  id: string;
  key: string;
  name: string;
  version: string;
  description: string;
  is_system: boolean;
}

export interface FrameworkClause {
  id: string;
  framework_id: string;
  clause_identifier: string;
  title: string;
  description: string;
  category?: string;
}

export type ControlCategory = 'technical' | 'administrative' | 'physical' | 'operational';
export type ControlStatus = 'draft' | 'active' | 'under_review' | 'retired';
export type TestingFrequency = 'monthly' | 'quarterly' | 'semi_annually' | 'annually' | 'continuous';

export interface Control {
  id: string;
  organization_id: string;
  control_code: string;
  name: string;
  description: string;
  category: ControlCategory;
  owner_id: string;
  status: ControlStatus;
  testing_frequency: TestingFrequency;
  next_test_date?: string;
  created_at: string;
  updated_at: string;
}

export interface ControlFrameworkMapping {
  id: string;
  organization_id: string;
  control_id: string;
  framework_clause_id: string;
  mapping_type: 'direct' | 'partial' | 'supporting';
  status: 'active' | 'proposed' | 'rejected';
  created_at: string;
}

// Compliance Types
export type ComplianceTaskStatus =
  | 'not_started'
  | 'in_progress'
  | 'ready_for_review'
  | 'compliant'
  | 'needs_attention';

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface ComplianceTask {
  id: string;
  organization_id: string;
  control_id: string;
  title: string;
  status: ComplianceTaskStatus;
  owner_id: string;
  priority: TaskPriority;
  due_date?: string;
  next_test_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Evidence & Audit Types
export interface Evidence {
  id: string;
  organization_id: string;
  entity_type: 'control' | 'compliance_task' | 'risk' | 'asset';
  entity_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  uploaded_by: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  organization_id: string;
  actor_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata: Record<string, any>;
  created_at: string;
}

// AI Mapping Types
export type AIProvider = 'gemini' | 'anthropic' | 'deepseek_fallback';
export type ModelTier = 'tier_1_flash' | 'tier_2_haiku' | 'fallback';
export type ReviewDecision = 'approved' | 'overridden' | 'rejected';

export interface AIMappingRequest {
  id: string;
  organization_id: string;
  control_id: string;
  sanitized_prompt: string;
  status: 'pending' | 'completed' | 'failed';
  provider: AIProvider;
  model_tier: ModelTier;
  created_at: string;
}

export interface AIMappingSuggestion {
  id: string;
  request_id: string;
  control_id: string;
  framework_clause_id: string;
  confidence_score: number; // 0.00 to 1.00
  reasoning: string;
  status: 'pending' | 'approved' | 'overridden' | 'rejected';
  created_at: string;
}

export interface ControlMappingReview {
  id: string;
  suggestion_id: string;
  reviewer_id: string;
  decision: ReviewDecision;
  override_clause_id?: string;
  comments?: string;
  reviewed_at: string;
}
