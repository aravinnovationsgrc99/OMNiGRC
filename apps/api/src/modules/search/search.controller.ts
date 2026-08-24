import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../common/guards/tenant-auth.guard';
import { CurrentOrgId } from '../../common/decorators/tenant-context.decorator';
import { SearchService } from './search.service';

@Controller('search')
@UseGuards(TenantAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@CurrentOrgId() orgId: string, @Query('q') query: string) {
    return this.searchService.globalSearch(orgId, query || '');
  }
}
