import { Injectable } from '@nestjs/common';
import { isConfidenceValid } from '@omnigrc/shared';
import { AISuggestionOutput } from './ai-router.service';

@Injectable()
export class AIValidationService {
  /**
   * Validates AI Suggestions against JSON Schema, existing DB clauses, and confidence threshold.
   */
  validateSuggestions(
    rawSuggestions: AISuggestionOutput[],
    existingClausesMap: Map<string, string>, // Map<clause_identifier, clause_id>
    minConfidenceThreshold = 0.70,
  ): Array<{ clauseId: string; confidence: number; reasoning: string }> {
    const validOutput: Array<{ clauseId: string; confidence: number; reasoning: string }> = [];

    for (const item of rawSuggestions) {
      if (!item.clause_identifier || typeof item.reasoning !== 'string') {
        continue; // reject malformed items
      }

      if (!isConfidenceValid(item.confidence_score, minConfidenceThreshold)) {
        continue; // reject below threshold
      }

      const clauseId = existingClausesMap.get(item.clause_identifier);
      if (!clauseId) {
        continue; // reject non-existent clause identifier
      }

      validOutput.push({
        clauseId,
        confidence: item.confidence_score,
        reasoning: item.reasoning,
      });
    }

    return validOutput;
  }
}
