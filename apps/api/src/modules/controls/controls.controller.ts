import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../common/guards/tenant-auth.guard';
import { CurrentOrgId, CurrentUser } from '../../common/decorators/tenant-context.decorator';
import { ControlsService } from './controls.service';

@Controller('controls')
@UseGuards(TenantAuthGuard)
export class ControlsController {
  constructor(private readonly controlsService: ControlsService) {}

  @Get()
  getControls(@CurrentOrgId() orgId: string) {
    return this.controlsService.getControls(orgId);
  }

  @Post()
  createControl(
    @CurrentOrgId() orgId: string,
    @CurrentUser() user: any,
    @Body() payload: any,
  ) {
    return this.controlsService.createControl(orgId, user.id, payload);
  }

  @Get('mappings')
  getMappings(@CurrentOrgId() orgId: string, @Query('control_id') controlId?: string) {
    return this.controlsService.getControlMappings(orgId, controlId);
  }

  @Post(':id/mappings')
  mapToClause(
    @CurrentOrgId() orgId: string,
    @Param('id') controlId: string,
    @Body('framework_clause_id') clauseId: string,
    @Body('mapping_type') mappingType?: string,
  ) {
    return this.controlsService.mapControlToClause(orgId, controlId, clauseId, mappingType);
  }
}
