# Advisory AI Control Mapping Pipeline

## Core Principles
1. **Advisory Only**: AI suggestions never automatically update control compliance or framework mappings.
2. **Mandatory Human Review**: Analysts must explicitly Approve, Override, or Reject suggestions before `control_framework_mappings` records are created.
3. **Data Minimization & Redaction**: Server-side sanitizer strips organization names, user emails, UUIDs, and unassociated data before sending prompts to LLMs.
4. **Tiered Provider Architecture**:
   - Tier 1: Gemini 2.5 Flash-Lite
   - Tier 2: Claude Haiku candidate
   - Fallback: DeepSeek adapter
5. **Validation & Thresholding**: Output schema validation, framework clause ID verification, and minimum 70% confidence threshold enforcement.
