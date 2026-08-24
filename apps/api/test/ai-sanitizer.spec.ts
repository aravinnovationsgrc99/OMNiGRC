import { sanitizeAIPrompt, isConfidenceValid } from '@omnigrc/shared';

describe('AI Data Minimization & Redaction Engine', () => {
  it('should redact organization name and email addresses', () => {
    const raw = 'Acme Corp control definition for user admin@acme.com working at Acme Corp';
    const redacted = sanitizeAIPrompt(raw, 'Acme Corp');

    expect(redacted).not.toContain('Acme Corp');
    expect(redacted).not.toContain('admin@acme.com');
    expect(redacted).toContain('[REDACTED_ORGANIZATION]');
    expect(redacted).toContain('[REDACTED_EMAIL]');
  });

  it('should validate confidence thresholds correctly', () => {
    expect(isConfidenceValid(0.85, 0.70)).toBe(true);
    expect(isConfidenceValid(0.65, 0.70)).toBe(false);
    expect(isConfidenceValid(1.0, 0.70)).toBe(true);
    expect(isConfidenceValid(1.2, 0.70)).toBe(false);
  });
});
