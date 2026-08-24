import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../common/guards/tenant-auth.guard';
import { CurrentOrgId, CurrentUser } from '../../common/decorators/tenant-context.decorator';
import { EvidenceService } from './evidence.service';

@Controller('evidence')
@UseGuards(TenantAuthGuard)
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) {}

  @Get()
  getEvidence(
    @CurrentOrgId() orgId: string,
    @Query('entity_type') entityType?: string,
    @Query('entity_id') entityId?: string,
  ) {
    return this.evidenceService.getEvidenceList(orgId, entityType, entityId);
  }

  @Post()
  registerEvidence(
    @CurrentOrgId() orgId: string,
    @CurrentUser() user: any,
    @Body() payload: any,
  ) {
    return this.evidenceService.registerEvidence(orgId, user.id, payload);
  }

  @Get(':id/download')
  getSignedUrl(@CurrentOrgId() orgId: string, @Param('id') id: string) {
    return this.evidenceService.getSignedUrl(orgId, id);
  }
}
