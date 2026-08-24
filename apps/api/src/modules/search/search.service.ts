import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../common/supabase/supabase.service';

export interface SearchResults {
  risks: any[];
  assets: any[];
  controls: any[];
  framework_clauses: any[];
}

@Injectable()
export class SearchService {
  constructor(private supabaseService: SupabaseService) {}

  async globalSearch(orgId: string, searchTerm: string): Promise<SearchResults> {
    const client = this.supabaseService.getClient();
    const cleanTerm = searchTerm.trim().replace(/['"%\\]/g, '');
    if (!cleanTerm) return { risks: [], assets: [], controls: [], framework_clauses: [] };

    // FTS searches using text search queries
    const [risksRes, assetsRes, controlsRes, clausesRes] = await Promise.all([
      client
        .from('risks')
        .select('*')
        .eq('organization_id', orgId)
        .textSearch('search_vector', cleanTerm, { config: 'english' }),
      client
        .from('assets')
        .select('*')
        .eq('organization_id', orgId)
        .textSearch('search_vector', cleanTerm, { config: 'english' }),
      client
        .from('controls')
        .select('*')
        .eq('organization_id', orgId)
        .textSearch('search_vector', cleanTerm, { config: 'english' }),
      client
        .from('framework_clauses')
        .select('*')
        .textSearch('search_vector', cleanTerm, { config: 'english' }),
    ]);

    return {
      risks: risksRes.data || [],
      assets: assetsRes.data || [],
      controls: controlsRes.data || [],
      framework_clauses: clausesRes.data || [],
    };
  }
}
