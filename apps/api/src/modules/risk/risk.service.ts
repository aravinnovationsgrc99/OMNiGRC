import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { CreateRiskDto, UpdateRiskDto } from './dto/risk.dto';
import { calculateRiskScore } from '@omnigrc/shared';
import { Risk, RiskScoreHistory } from '@omnigrc/types';

@Injectable()
export class RiskService {
  constructor(private supabaseService: SupabaseService) {}

  async createRisk(orgId: string, userId: string, dto: CreateRiskDto): Promise<Risk> {
    const client = this.supabaseService.getClient();
    const score = calculateRiskScore(dto.likelihood, dto.impact);

    const { data: risk, error } = await client
      .from('risks')
      .insert({
        organization_id: orgId,
        title: dto.title,
        description: dto.description,
        category: dto.category,
        likelihood: dto.likelihood,
        impact: dto.impact,
        risk_score: score,
        status: dto.status || 'identified',
        owner_id: dto.owner_id || userId,
        treatment_plan: dto.treatment_plan || null,
        due_date: dto.due_date || null,
      })
      .select()
      .single();

    if (error || !risk) {
      throw new Error(`Failed to create risk: ${error?.message}`);
    }

    // Log score history
    await client.from('risk_score_history').insert({
      organization_id: orgId,
      risk_id: risk.id,
      likelihood: dto.likelihood,
      impact: dto.impact,
      risk_score: score,
      changed_by: userId,
      reason: 'Initial risk creation',
    });

    return risk;
  }

  async getRisks(orgId: string, category?: string, status?: string): Promise<Risk[]> {
    const client = this.supabaseService.getClient();
    let query = client.from('risks').select('*').eq('organization_id', orgId);

    if (category) query = query.eq('category', category);
    if (status) query = query.eq('status', status);

    const { data, error } = await query.order('risk_score', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  }

  async getRiskById(orgId: string, riskId: string): Promise<Risk> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('risks')
      .select('*')
      .eq('organization_id', orgId)
      .eq('id', riskId)
      .single();

    if (error || !data) throw new NotFoundException('Risk not found');
    return data;
  }

  async updateRisk(orgId: string, riskId: string, userId: string, dto: UpdateRiskDto): Promise<Risk> {
    const existing = await this.getRiskById(orgId, riskId);
    const client = this.supabaseService.getClient();

    const newLikelihood = dto.likelihood ?? existing.likelihood;
    const newImpact = dto.impact ?? existing.impact;
    const newScore = calculateRiskScore(newLikelihood, newImpact);
    const scoreChanged = newLikelihood !== existing.likelihood || newImpact !== existing.impact;

    const { data: updated, error } = await client
      .from('risks')
      .update({
        ...dto,
        likelihood: newLikelihood,
        impact: newImpact,
        risk_score: newScore,
        updated_at: new Date().toISOString(),
      })
      .eq('organization_id', orgId)
      .eq('id', riskId)
      .select()
      .single();

    if (error || !updated) throw new Error(`Failed to update risk: ${error?.message}`);

    if (scoreChanged) {
      await client.from('risk_score_history').insert({
        organization_id: orgId,
        risk_id: riskId,
        likelihood: newLikelihood,
        impact: newImpact,
        risk_score: newScore,
        changed_by: userId,
        reason: dto.change_reason || 'Risk assessment update',
      });
    }

    return updated;
  }

  async getRiskHistory(orgId: string, riskId: string): Promise<RiskScoreHistory[]> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('risk_score_history')
      .select('*')
      .eq('organization_id', orgId)
      .eq('risk_id', riskId)
      .order('changed_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }

  async getRiskHeatmapData(orgId: string): Promise<Record<string, number>> {
    const risks = await this.getRisks(orgId);
    const heatmap: Record<string, number> = {};

    for (let l = 1; l <= 5; l++) {
      for (let i = 1; i <= 5; i++) {
        heatmap[`${l}-${i}`] = 0;
      }
    }

    risks.forEach((r) => {
      const key = `${r.likelihood}-${r.impact}`;
      heatmap[key] = (heatmap[key] || 0) + 1;
    });

    return heatmap;
  }
}
