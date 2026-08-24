import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { ComplianceTask, ComplianceTaskStatus } from '@omnigrc/types';

@Injectable()
export class ComplianceService {
  constructor(private supabaseService: SupabaseService) {}

  async getTasks(orgId: string, range?: string): Promise<ComplianceTask[]> {
    const client = this.supabaseService.getClient();
    let query = client.from('compliance_tasks').select('*').eq('organization_id', orgId);

    const now = new Date();
    const d30 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const d60 = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
    const d90 = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

    const isoNow = now.toISOString().split('T')[0];
    const iso30 = d30.toISOString().split('T')[0];
    const iso60 = d60.toISOString().split('T')[0];
    const iso90 = d90.toISOString().split('T')[0];

    if (range === 'overdue') {
      query = query.lt('due_date', isoNow).neq('status', 'compliant');
    } else if (range === '30_days') {
      query = query.gte('due_date', isoNow).lte('due_date', iso30);
    } else if (range === '31_60_days') {
      query = query.gt('due_date', iso30).lte('due_date', iso60);
    } else if (range === '61_90_days') {
      query = query.gt('due_date', iso60).lte('due_date', iso90);
    }

    const { data, error } = await query.order('due_date', { ascending: true });
    if (error) throw new Error(error.message);
    return data || [];
  }

  async updateTaskStatus(
    orgId: string,
    taskId: string,
    status: ComplianceTaskStatus,
    userId: string,
  ): Promise<ComplianceTask> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('compliance_tasks')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('organization_id', orgId)
      .eq('id', taskId)
      .select()
      .single();

    if (error || !data) throw new Error(`Failed to update compliance task: ${error?.message}`);

    // Create append-only audit log entry
    await client.from('audit_logs').insert({
      organization_id: orgId,
      actor_id: userId,
      action: 'compliance_task_status_change',
      entity_type: 'compliance_task',
      entity_id: taskId,
      metadata: { new_status: status },
    });

    return data;
  }
}
