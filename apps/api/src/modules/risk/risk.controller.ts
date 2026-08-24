import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../common/guards/tenant-auth.guard';
import { CurrentOrgId, CurrentUser } from '../../common/decorators/tenant-context.decorator';
import { RiskService } from './risk.service';
import { CreateRiskDto, UpdateRiskDto } from './dto/risk.dto';

@Controller('risks')
@UseGuards(TenantAuthGuard)
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  @Post()
  create(
    @CurrentOrgId() orgId: string,
    @CurrentUser() user: any,
    @Body() dto: CreateRiskDto,
  ) {
    return this.riskService.createRisk(orgId, user.id, dto);
  }

  @Get()
  findAll(
    @CurrentOrgId() orgId: string,
    @Query('category') category?: string,
    @Query('status') status?: string,
  ) {
    return this.riskService.getRisks(orgId, category, status);
  }

  @Get('heatmap')
  getHeatmap(@CurrentOrgId() orgId: string) {
    return this.riskService.getRiskHeatmapData(orgId);
  }

  @Get(':id')
  findOne(@CurrentOrgId() orgId: string, @Param('id') id: string) {
    return this.riskService.getRiskById(orgId, id);
  }

  @Put(':id')
  update(
    @CurrentOrgId() orgId: string,
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body() dto: UpdateRiskDto,
  ) {
    return this.riskService.updateRisk(orgId, id, user.id, dto);
  }

  @Get(':id/history')
  getHistory(@CurrentOrgId() orgId: string, @Param('id') id: string) {
    return this.riskService.getRiskHistory(orgId, id);
  }
}
