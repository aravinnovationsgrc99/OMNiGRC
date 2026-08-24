import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { Asset, Vendor, DataFlow } from '@omnigrc/types';

@Injectable()
export class AssetsService {
  constructor(private supabaseService: SupabaseService) {}

  // Assets CRUD
  async createAsset(orgId: string, userId: string, payload: Partial<Asset>): Promise<Asset> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('assets')
      .insert({
        organization_id: orgId,
        name: payload.name,
        type: payload.type,
        description: payload.description,
        owner_id: payload.owner_id || userId,
        criticality: payload.criticality || 'medium',
        status: payload.status || 'active',
        environment: payload.environment || 'production',
      })
      .select()
      .single();

    if (error || !data) throw new Error(`Failed to create asset: ${error?.message}`);
    return data;
  }

  async getAssets(orgId: string): Promise<Asset[]> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('assets')
      .select('*')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }

  // Vendors CRUD
  async createVendor(orgId: string, userId: string, payload: Partial<Vendor>): Promise<Vendor> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('vendors')
      .insert({
        organization_id: orgId,
        name: payload.name,
        type: payload.type,
        owner_id: payload.owner_id || userId,
        status: payload.status || 'active',
        description: payload.description || '',
      })
      .select()
      .single();

    if (error || !data) throw new Error(`Failed to create vendor: ${error?.message}`);
    return data;
  }

  async getVendors(orgId: string): Promise<Vendor[]> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('vendors')
      .select('*')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }

  // Data Flows CRUD
  async createDataFlow(orgId: string, payload: Partial<DataFlow>): Promise<DataFlow> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('data_flows')
      .insert({
        organization_id: orgId,
        source: payload.source,
        destination: payload.destination,
        data_category: payload.data_category,
        purpose: payload.purpose,
        asset_id: payload.asset_id || null,
      })
      .select()
      .single();

    if (error || !data) throw new Error(`Failed to create data flow: ${error?.message}`);
    return data;
  }

  async getDataFlows(orgId: string): Promise<DataFlow[]> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client
      .from('data_flows')
      .select('*')
      .eq('organization_id', orgId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }
}
