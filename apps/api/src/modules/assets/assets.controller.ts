import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../common/guards/tenant-auth.guard';
import { CurrentOrgId, CurrentUser } from '../../common/decorators/tenant-context.decorator';
import { AssetsService } from './assets.service';

@Controller()
@UseGuards(TenantAuthGuard)
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('assets')
  getAssets(@CurrentOrgId() orgId: string) {
    return this.assetsService.getAssets(orgId);
  }

  @Post('assets')
  createAsset(
    @CurrentOrgId() orgId: string,
    @CurrentUser() user: any,
    @Body() payload: any,
  ) {
    return this.assetsService.createAsset(orgId, user.id, payload);
  }

  @Get('vendors')
  getVendors(@CurrentOrgId() orgId: string) {
    return this.assetsService.getVendors(orgId);
  }

  @Post('vendors')
  createVendor(
    @CurrentOrgId() orgId: string,
    @CurrentUser() user: any,
    @Body() payload: any,
  ) {
    return this.assetsService.createVendor(orgId, user.id, payload);
  }

  @Get('data-flows')
  getDataFlows(@CurrentOrgId() orgId: string) {
    return this.assetsService.getDataFlows(orgId);
  }

  @Post('data-flows')
  createDataFlow(@CurrentOrgId() orgId: string, @Body() payload: any) {
    return this.assetsService.createDataFlow(orgId, payload);
  }
}
