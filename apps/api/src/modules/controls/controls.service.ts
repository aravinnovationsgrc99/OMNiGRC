import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { Control, ControlFrameworkMapping } from '@omnigrc/types';

@Injectable()
export class ControlsService {
  constructor(private supabaseService: SupabaseService) {}

  async createControl(orgId: string, userId: string, payload: Partial<Control>): Promise<Control> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('controls')
      .insert({
        organization_id: orgId,
        control_code: payload.control_code,
        name: payload.name,
        description: payload.description,
        category: payload.category || 'technical',
        owner_id: payload.owner_id || userId,
        status: payload.status || 'active',
        testing_frequency: payload.testing_frequency || 'quarterly',
        next_test_date: payload.next_test_date || null,
      })
      .select()
      .single();

    if (error || !data) throw new Error(`Failed to create control: ${error?.message}`);
    return data;
  }

  async getControls(orgId: string): Promise<Control[]> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('controls')
      .select('*')
      .eq('organization_id', orgId)
      .order('control_code');

    if (error) throw new Error(error.message);
    return data || [];
  }

  async mapControlToClause(
    orgId: string,
    controlId: string,
    clauseId: string,
    mappingType = 'direct',
  ): Promise<ControlFrameworkMapping> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('control_framework_mappings')
      .insert({
        organization_id: orgId,
        control_id: controlId,
        framework_clause_id: clauseId,
        mapping_type: mappingType,
        status: 'active',
      })
      .select()
      .single();

    if (error || !data) throw new Error(`Failed to map control to clause: ${error?.message}`);
    return data;
  }

  async getControlMappings(orgId: string, controlId?: string): Promise<ControlFrameworkMapping[]> {
    const client = this.supabaseService.getClient();
    let query = client.from('control_framework_mappings').select('*').eq('organization_id', orgId);
    if (controlId) query = query.eq('control_id', controlId);

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data || [];
  }
}
