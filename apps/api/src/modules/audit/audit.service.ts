import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { AuditLog } from '@omnigrc/types';

@Injectable()
export class AuditService {
  constructor(private supabaseService: SupabaseService) {}

  async getAuditLogs(orgId: string, limit = 50): Promise<AuditLog[]> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('audit_logs')
      .select('*')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw new Error(error.message);
    return data || [];
  }

  async logAction(
    orgId: string,
    userId: string,
    action: string,
    entityType: string,
    entityId: string,
    metadata: Record<string, any> = {},
  ): Promise<void> {
    const client = this.supabaseService.getClient();
    await client.from('audit_logs').insert({
      organization_id: orgId,
      actor_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata,
    });
  }
}
