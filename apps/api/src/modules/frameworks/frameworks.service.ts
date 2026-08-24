import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';
import { Framework, FrameworkClause } from '@omnigrc/types';

@Injectable()
export class FrameworksService {
  constructor(private supabaseService: SupabaseService) {}

  async getFrameworks(): Promise<Framework[]> {
    const client = this.supabaseService.getClient();
    const { data, error } = await client.from('frameworks').select('*').order('name');
    if (error) throw new Error(error.message);
    return data || [];
  }

  async getClauses(frameworkId?: string): Promise<FrameworkClause[]> {
    const client = this.supabaseService.getClient();
    let query = client.from('framework_clauses').select('*');
    if (frameworkId) query = query.eq('framework_id', frameworkId);

    const { data, error } = await query.order('clause_identifier');
    if (error) throw new Error(error.message);
    return data || [];
  }
}
