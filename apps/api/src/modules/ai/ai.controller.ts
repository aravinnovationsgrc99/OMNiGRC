import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TenantAuthGuard } from '../../common/guards/tenant-auth.guard';
import { CurrentOrgId, CurrentUser } from '../../common/decorators/tenant-context.decorator';
import { AIService } from './ai.service';
import { ReviewDecision } from '@omnigrc/types';

@Controller('ai/mapping')
@UseGuards(TenantAuthGuard)
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('request')
  requestMapping(@CurrentOrgId() orgId: string, @Body('control_id') controlId: string) {
    return this.aiService.requestMappingSuggestions(orgId, controlId);
  }

  @Get('suggestions')
  getPendingSuggestions(@CurrentOrgId() orgId: string) {
    return this.aiService.getPendingSuggestions(orgId);
  }

  @Post('suggestions/:id/review')
  reviewSuggestion(
    @CurrentOrgId() orgId: string,
    @Param('id') id: string,
    @CurrentUser() user: any,
    @Body('decision') decision: ReviewDecision,
    @Body('override_clause_id') overrideClauseId?: string,
    @Body('comments') comments?: string,
  ) {
    return this.aiService.reviewSuggestion(orgId, id, user.id, decision, overrideClauseId, comments);
  }
}
