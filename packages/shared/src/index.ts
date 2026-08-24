import { RiskSeverityLabel } from '@omnigrc/types';

/**
 * Deterministic Risk Score Calculator
 * Score = Likelihood (1-5) * Impact (1-5)
 * Score range: 1 to 25
 */
export function calculateRiskScore(likelihood: number, impact: number): number {
  const safeLikelihood = Math.min(Math.max(Math.round(likelihood), 1), 5);
  const safeImpact = Math.min(Math.max(Math.round(impact), 1), 5);
  return safeLikelihood * safeImpact;
}

export function getRiskSeverityLabel(score: number): 'Low' | 'Medium' | 'High' | 'Critical' {
  if (score <= 4) return 'Low';
  if (score <= 9) return 'Medium';
  if (score <= 16) return 'High';
  return 'Critical';
}

/**
 * PII and Tenant Data Minimization/Sanitization Helper
 * Removes organization specific identifiers, user emails, and explicit metadata before passing context to LLM AI Providers.
 */
export function sanitizeAIPrompt(text: string, orgName?: string): string {
  let sanitized = text;

  if (orgName && orgName.trim().length > 0) {
    const escapedOrg = orgName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    sanitized = sanitized.replace(new RegExp(escapedOrg, 'gi'), '[REDACTED_ORGANIZATION]');
  }

  // Redact email addresses
  sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[REDACTED_EMAIL]');

  // Redact UUIDs
  sanitized = sanitized.replace(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g, '[REDACTED_ID]');

  return sanitized;
}

/**
 * Confidence Score Threshold Validator for AI Advisory Engine
 * Rejects suggestions below the required threshold (default: 0.70 / 70%)
 */
export function isConfidenceValid(score: number, minThreshold = 0.70): boolean {
  return typeof score === 'number' && score >= minThreshold && score <= 1.0;
}
