-- 1. Insert Frameworks
INSERT INTO public.frameworks (id, key, name, version, description, is_system) VALUES
('10000000-0000-0000-0000-000000000001', 'iso-27001-2022', 'ISO/IEC 27001:2022', '2022', 'International standard for Information Security Management Systems (ISMS)', true),
('10000000-0000-0000-0000-000000000002', 'soc2-2022', 'SOC 2 Trust Services Criteria', '2022', 'AICPA report on controls relevant to Security, Availability, and Confidentiality', true),
('10000000-0000-0000-0000-000000000003', 'gdpr-2018', 'GDPR / UK GDPR', '2018', 'General Data Protection Regulation requirements for personal data processing', true),
('10000000-0000-0000-0000-000000000004', 'dpdp-2023', 'Digital Personal Data Protection Act (DPDP)', '2023', 'India DPDP framework governing digital personal data processing and obligations', true),
('10000000-0000-0000-0000-000000000005', 'essential-8', 'ACSC Essential Eight', '2023', 'Cyber security mitigation strategies designed to protect systems against cyber threats', true)
ON CONFLICT (key) DO NOTHING;

-- 2. Insert Framework Clauses
-- ISO 27001 Clauses
INSERT INTO public.framework_clauses (id, framework_id, clause_identifier, title, description, category) VALUES
('11000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'A.5.15', 'Access Control', 'Rules to control physical and logical access to information and associated assets shall be established', 'Organizational Controls'),
('11000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'A.8.24', 'Use of Cryptography', 'Rules for the effective use of cryptography, including cryptographic key management, shall be defined and implemented', 'Technological Controls'),
('11000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'A.8.8', 'Management of Technical Vulnerabilities', 'Information about technical vulnerabilities of information systems in use shall be obtained and evaluated', 'Technological Controls');

-- SOC 2 Clauses
INSERT INTO public.framework_clauses (id, framework_id, clause_identifier, title, description, category) VALUES
('11000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002', 'CC6.1', 'Logical Access Controls', 'The entity implements logical access security software, infrastructure, and architectures to constrain access', 'Common Criteria'),
('11000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000002', 'CC6.6', 'Boundary Protection & Encryption', 'The entity implements logical access security measures to prevent unauthorized access to data in transit and at rest', 'Common Criteria');

-- GDPR Clauses
INSERT INTO public.framework_clauses (id, framework_id, clause_identifier, title, description, category) VALUES
('11000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000003', 'Art.32', 'Security of Processing', 'Implement technical and organizational measures to ensure a level of security appropriate to the risk', 'Data Protection');

-- DPDP Clauses
INSERT INTO public.framework_clauses (id, framework_id, clause_identifier, title, description, category) VALUES
('11000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000004', 'Sec.8(5)', 'Reasonable Security Safeguards', 'A Data Fiduciary shall protect personal data in its possession or under its control by taking reasonable security safeguards', 'Fiduciary Obligations');

-- Essential 8 Clauses
INSERT INTO public.framework_clauses (id, framework_id, clause_identifier, title, description, category) VALUES
('11000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000005', 'E8.1', 'Multi-factor Authentication', 'MFA is used to authenticate users to services, applications, and infrastructure', 'Mitigation Strategy');

-- 3. Insert Demo Organization
INSERT INTO public.organizations (id, name, slug) VALUES
('00000000-0000-0000-0000-000000000001', 'Acme Global GRC Demo', 'acme-global')
ON CONFLICT (slug) DO NOTHING;

-- 4. Insert Demo Profile
INSERT INTO public.profiles (id, email, full_name, avatar_url) VALUES
('00000000-0000-0000-0000-000000000002', 'admin@acmeglobal.com', 'Alex Morgan (GRC Lead)', 'https://ui-avatars.com/api/?name=Alex+Morgan')
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Demo Organization Membership
INSERT INTO public.organization_members (id, organization_id, user_id, role) VALUES
('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', 'owner')
ON CONFLICT (organization_id, user_id) DO NOTHING;

-- 6. Insert Sample Risks
INSERT INTO public.risks (id, organization_id, title, description, category, likelihood, impact, risk_score, status, owner_id, treatment_plan, due_date) VALUES
('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Unencrypted Production Data Store', 'Primary database backups on cloud storage lack AES-256 encryption at rest.', 'security', 4, 4, 16, 'mitigating', '00000000-0000-0000-0000-000000000002', 'Enable automated KMS customer-managed key encryption on all backup targets.', CURRENT_DATE + INTERVAL '30 days'),
('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Overprivileged Cloud Infrastructure Accounts', 'Development team holds permanent administrator privileges on AWS root account.', 'operational', 3, 5, 15, 'assessing', '00000000-0000-0000-0000-000000000002', 'Migrate to Okta SSO with short-lived STS role assumption.', CURRENT_DATE + INTERVAL '15 days'),
('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Lack of Vendor DPDP Compliance Verification', 'Key third-party SaaS vendors have not submitted updated DPDP 2023 compliance attestations.', 'third_party', 3, 3, 9, 'identified', '00000000-0000-0000-0000-000000000002', 'Issue DPDP questionnaires to top 5 critical vendors.', CURRENT_DATE + INTERVAL '45 days');

-- 7. Insert Risk Score History
INSERT INTO public.risk_score_history (id, organization_id, risk_id, likelihood, impact, risk_score, changed_by, reason) VALUES
('21000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 5, 4, 20, '00000000-0000-0000-0000-000000000002', 'Initial risk discovery during quarterly audit.'),
('21000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 4, 4, 16, '00000000-0000-0000-0000-000000000002', 'Partial mitigation implemented via TLS 1.3 in transit.');

-- 8. Insert Assets
INSERT INTO public.assets (id, organization_id, name, type, description, owner_id, criticality, status, environment) VALUES
('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Production PostgreSQL Database Cluster', 'data_store', 'Primary PostgreSQL instance running customer records & transactions.', '00000000-0000-0000-0000-000000000002', 'critical', 'active', 'production'),
('30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Customer Web Portal App', 'software', 'Next.js application frontend deployed on cloud hosting infrastructure.', '00000000-0000-0000-0000-000000000002', 'high', 'active', 'production');

-- 9. Insert Vendors
INSERT INTO public.vendors (id, organization_id, name, type, owner_id, status, description) VALUES
('40000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Amazon Web Services (AWS)', 'infrastructure', '00000000-0000-0000-0000-000000000002', 'active', 'Cloud hosting infrastructure, RDS database, and S3 object storage.'),
('40000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Auth0 Identity Platform', 'saas', '00000000-0000-0000-0000-000000000002', 'active', 'Managed user identity and single sign-on provider.');

-- 10. Insert Data Flows
INSERT INTO public.data_flows (id, organization_id, source, destination, data_category, purpose, asset_id) VALUES
('50000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Customer Web Portal', 'Production DB Cluster', 'Customer PII & Login Credentials', 'Authentication and user session management', '30000000-0000-0000-0000-000000000001');

-- 11. Insert Sample Controls
INSERT INTO public.controls (id, organization_id, control_code, name, description, category, owner_id, status, testing_frequency, next_test_date) VALUES
('60000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'CTRL-001', 'Quarterly Access Rights Review', 'Perform quarterly automated and manual reviews of user access levels across production systems.', 'administrative', '00000000-0000-0000-0000-000000000002', 'active', 'quarterly', CURRENT_DATE + INTERVAL '20 days'),
('60000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'CTRL-002', 'Database Storage Encryption at Rest', 'All production database volumes and backup snapshots must be encrypted using AES-256.', 'technical', '00000000-0000-0000-0000-000000000002', 'active', 'continuous', CURRENT_DATE + INTERVAL '10 days');

-- 12. Insert Control Framework Mappings
INSERT INTO public.control_framework_mappings (id, organization_id, control_id, framework_clause_id, mapping_type, status) VALUES
('61000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', '11000000-0000-0000-0000-000000000001', 'direct', 'active'),
('61000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', '11000000-0000-0000-0000-000000000004', 'direct', 'active'),
('61000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000002', '11000000-0000-0000-0000-000000000002', 'direct', 'active');

-- 13. Insert Compliance Tasks (Kanban Board Items)
INSERT INTO public.compliance_tasks (id, organization_id, control_id, title, status, owner_id, priority, due_date, next_test_date, notes) VALUES
('70000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', 'Execute Q3 Production Access Review', 'in_progress', '00000000-0000-0000-0000-000000000002', 'high', CURRENT_DATE + INTERVAL '12 days', CURRENT_DATE + INTERVAL '12 days', 'Reviewing AWS IAM and Postgres DB user grants.'),
('70000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000002', 'Verify KMS Key Rotation on DB Backups', 'ready_for_review', '00000000-0000-0000-0000-000000000002', 'critical', CURRENT_DATE + INTERVAL '5 days', CURRENT_DATE + INTERVAL '5 days', 'KMS key configuration updated in terraform scripts.'),
('70000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', 'Review Third-Party API Service Accounts', 'not_started', '00000000-0000-0000-0000-000000000002', 'medium', CURRENT_DATE + INTERVAL '45 days', CURRENT_DATE + INTERVAL '45 days', 'Schedule for next month.');
