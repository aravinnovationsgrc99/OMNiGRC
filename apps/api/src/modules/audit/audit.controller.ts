import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../common/guards/tenant-auth.guard';
import { CurrentOrgId } from '../../common/decorators/tenant-context.decorator';
import { AuditService } from './audit.service';

@Controller('audit-logs')
@UseGuards(TenantAuthGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  getAuditLogs(@CurrentOrgId() orgId: string, @Query('limit') limit?: number) {
    return this.auditService.getAuditLogs(orgId, limit ? Number(limit) : 50);
  }
}
