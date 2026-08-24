import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../common/guards/tenant-auth.guard';
import { FrameworksService } from './frameworks.service';

@Controller('frameworks')
@UseGuards(TenantAuthGuard)
export class FrameworksController {
  constructor(private readonly frameworksService: FrameworksService) {}

  @Get()
  getFrameworks() {
    return this.frameworksService.getFrameworks();
  }

  @Get('clauses')
  getClauses(@Query('framework_id') frameworkId?: string) {
    return this.frameworksService.getClauses(frameworkId);
  }
}
