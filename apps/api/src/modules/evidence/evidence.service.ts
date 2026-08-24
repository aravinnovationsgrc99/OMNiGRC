import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { Evidence } from '@omnigrc/types';

@Injectable()
export class EvidenceService {
  constructor(private supabaseService: SupabaseService) {}

  async registerEvidence(
    orgId: string,
    userId: string,
    payload: {
      entity_type: 'control' | 'compliance_task' | 'risk' | 'asset';
      entity_id: string;
      file_name: string;
      file_path: string;
      file_size: number;
      mime_type: string;
    },
  ): Promise<Evidence> {
    const client = this.supabaseService.getClient();

    const { data, error } = await client
      .from('evidence')
      .insert({
        organization_id: orgId,
        entity_type: payload.entity_type,
        entity_id: payload.entity_id,
        file_name: payload.file_name,
        file_path: payload.file_path,
        file_size: payload.file_size,
        mime_type: payload.mime_type,
        uploaded_by: userId,
      })
      .select()
      .single();

    if (error || !data) throw new Error(`Failed to register evidence: ${error?.message}`);

    // Create Audit Log
    await client.from('audit_logs').insert({
      organization_id: orgId,
      actor_id: userId,
      action: 'evidence_uploaded',
      entity_type: payload.entity_type,
      entity_id: payload.entity_id,
      metadata: { file_name: payload.file_name, file_size: payload.file_size },
    });

    return data;
  }

  async getEvidenceList(orgId: string, entityType?: string, entityId?: string): Promise<Evidence[]> {
    const client = this.supabaseService.getClient();
    let query = client.from('evidence').select('*').eq('organization_id', orgId);

    if (entityType) query = query.eq('entity_type', entityType);
    if (entityId) query = query.eq('entity_id', entityId);

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  }

  async getSignedUrl(orgId: string, evidenceId: string): Promise<string> {
    const client = this.supabaseService.getClient();

    const { data: item, error: err } = await client
      .from('evidence')
      .select('*')
      .eq('organization_id', orgId)
      .eq('id', evidenceId)
      .single();

    if (err || !item) throw new Error('Evidence item not found or unauthorized');

    const { data, error } = await client.storage
      .from('omni-evidence')
      .createSignedUrl(item.file_path, 3600); // 1 hour expiration

    if (error || !data) {
      // Fallback for development demo URL
      return `${process.env.SUPABASE_URL || 'https://supabase.co'}/storage/v1/object/sign/omni-evidence/${item.file_path}?token=demo`;
    }

    return data.signedUrl;
  }
}
