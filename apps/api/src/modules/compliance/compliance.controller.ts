import { Controller, Get, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../common/guards/tenant-auth.guard';
import { CurrentOrgId, CurrentUser } from '../../common/decorators/tenant-context.decorator';
import { ComplianceService } from './compliance.service';
import { ComplianceTaskStatus } from '@omnigrc/types';

@Controller('compliance')
@UseGuards(TenantAuthGuard)
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @Get('tasks')
  getTasks(@CurrentOrgId() orgId: string, @Query('range') range?: string) {
    return this.complianceService.getTasks(orgId, range);
  }

  @Patch('tasks/:id/status')
  updateStatus(
    @CurrentOrgId() orgId: string,
    @Param('id') id: string,
    @Body('status') status: ComplianceTaskStatus,
    @CurrentUser() user: any,
  ) {
    return this.complianceService.updateTaskStatus(orgId, id, status, user.id);
  }
}
