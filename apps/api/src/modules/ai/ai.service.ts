import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { AISanitizerService } from './ai-sanitizer.service';
import { AIRouterService } from './ai-router.service';
import { AIValidationService } from './ai-validation.service';
import { AIMappingSuggestion, ReviewDecision } from '@omnigrc/types';

@Injectable()
export class AIService {
  constructor(private supabaseService: SupabaseService, private sanitizer: AISanitizerService, private router: AIRouterService, private validator: AIValidationService) {}

  async requestMappingSuggestions(orgId: string, controlId: string) {
    const client = this.supabaseService.getClient();

    // Fetch Control Details
    const { data: control, error: ctrlErr } = await client
      .from('controls')
      .select('*')
      .eq('organization_id', orgId)
      .eq('id', controlId)
      .single();

    if (ctrlErr || !control) throw new NotFoundException('Control not found');

    // Fetch Available Framework Clauses
    const { data: clauses } = await client.from('framework_clauses').select('*');
    const availableClauses = clauses || [];

    // Redact Control Info
    const sanitizedPrompt = this.sanitizer.redactControlContext(
      control.control_code,
      control.name,
      control.description,
    );

    // Call Tiered AI Router
    const { suggestions: rawSuggestions, provider, modelTier } = await this.router.generateMappingSuggestions(
      sanitizedPrompt,
      availableClauses,
    );

    // Build Clause Map
    const clauseMap = new Map<string, string>();
    availableClauses.forEach((c) => clauseMap.set(c.clause_identifier, c.id));

    // Validate Suggestions
    const validSuggestions = this.validator.validateSuggestions(rawSuggestions, clauseMap, 0.70);

    // Create AI Mapping Request Entry
    const { data: reqEntry } = await client
      .from('ai_mapping_requests')
      .insert({
        organization_id: orgId,
        control_id: controlId,
        sanitized_prompt: sanitizedPrompt,
        status: 'completed',
        provider,
        model_tier: modelTier,
      })
      .select()
      .single();

    const createdSuggestions: AIMappingSuggestion[] = [];

    for (const item of validSuggestions) {
      const { data: sug } = await client
        .from('ai_mapping_suggestions')
        .insert({
          request_id: reqEntry.id,
          control_id: controlId,
          framework_clause_id: item.clauseId,
          confidence_score: item.confidence,
          reasoning: item.reasoning,
          status: 'pending',
        })
        .select()
        .single();

      if (sug) createdSuggestions.push(sug);
    }

    return { request: reqEntry, suggestions: createdSuggestions };
  }

  async getPendingSuggestions(orgId: string): Promise<AIMappingSuggestion[]> {
    const client = this.supabaseService.getClient();
    const { data } = await client
      .from('ai_mapping_suggestions')
      .select('*, controls!inner(organization_id)')
      .eq('controls.organization_id', orgId)
      .eq('status', 'pending');

    return data || [];
  }

  async reviewSuggestion(
    orgId: string,
    suggestionId: string,
    userId: string,
    decision: ReviewDecision,
    overrideClauseId?: string,
    comments?: string,
  ) {
    const client = this.supabaseService.getClient();

    // Fetch Suggestion
    const { data: suggestion, error: sugErr } = await client
      .from('ai_mapping_suggestions')
      .select('*')
      .eq('id', suggestionId)
      .single();

    if (sugErr || !suggestion) throw new NotFoundException('AI Mapping Suggestion not found');

    // Update Suggestion status
    await client
      .from('ai_mapping_suggestions')
      .update({ status: decision })
      .eq('id', suggestionId);

    // Record Human Review Audit Trail
    await client.from('control_mapping_reviews').insert({
      suggestion_id: suggestionId,
      reviewer_id: userId,
      decision,
      override_clause_id: overrideClauseId || null,
      comments: comments || null,
    });

    const targetClauseId = decision === 'overridden' && overrideClauseId ? overrideClauseId : suggestion.framework_clause_id;

    if (decision === 'approved' || decision === 'overridden') {
      // Create actual Control-Framework Mapping ONLY AFTER Human Approval/Override
      await client.from('control_framework_mappings').insert({
        organization_id: orgId,
        control_id: suggestion.control_id,
        framework_clause_id: targetClauseId,
        mapping_type: decision === 'approved' ? 'direct' : 'supporting',
        status: 'active',
      });
    }

    // Append Audit Log
    await client.from('audit_logs').insert({
      organization_id: orgId,
      actor_id: userId,
      action: `ai_mapping_${decision}`,
      entity_type: 'ai_mapping_suggestion',
      entity_id: suggestionId,
      metadata: { decision, control_id: suggestion.control_id, clause_id: targetClauseId },
    });

    return { status: decision, suggestion_id: suggestionId };
  }
}
