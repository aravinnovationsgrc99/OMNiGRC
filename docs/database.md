# OMNiGRC Database Schema & Framework Model

## Extensible Framework Model
To support multi-framework mapping without hardcoding columns into controls, OMNiGRC implements:
```
Framework (ISO 27001, SOC 2, GDPR, DPDP, Essential 8)
    ↓
Framework Clause (A.5.15, CC6.1, Art.32, Sec.8(5), E8.1)
    ↓
Control (CTRL-001 Access Review)
    ↓
Control ↔ Framework Clause Mapping (control_framework_mappings)
```

## Relational Tables (22 Core Entities)
1. `organizations`
2. `profiles`
3. `organization_members`
4. `risks`
5. `risk_score_history`
6. `assets`
7. `vendors`
8. `data_flows`
9. `risk_assets`
10. `asset_vendors`
11. `frameworks`
12. `framework_clauses`
13. `controls`
14. `control_framework_mappings`
15. `control_risks`
16. `control_assets`
17. `compliance_tasks`
18. `evidence`
19. `audit_logs`
20. `ai_mapping_requests`
21. `ai_mapping_suggestions`
22. `control_mapping_reviews`
