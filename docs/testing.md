# Testing Strategy & Verification Suite

## Test Commands
- `pnpm run test`: Executes Jest unit & integration test suite across packages and apps.
- `pnpm run typecheck`: Validates TypeScript strict mode compliance across workspace.

## Verified Mandatory Test Scenarios
1. **Deterministic Risk Scoring**: Formula `likelihood * impact` boundary checks.
2. **AI Data Redaction**: PII, email, and organization name stripping prior to LLM calls.
3. **AI Confidence Thresholding**: Rejection of suggestions below 70% confidence.
4. **Cross-Tenant Isolation**: Server-side guard rejection (`ForbiddenException`) when accessing non-member organizations.
5. **Human Approval Enforcement**: Verification that AI mapping suggestions do not automatically mutate controls without human review.
