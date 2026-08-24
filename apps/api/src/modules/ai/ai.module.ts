import { Module } from '@nestjs/common';
import { AIController } from './ai.controller';
import { AIService } from './ai.service';
import { AISanitizerService } from './ai-sanitizer.service';
import { AIRouterService } from './ai-router.service';
import { AIValidationService } from './ai-validation.service';
import { SupabaseModule } from '../../common/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [AIController],
  providers: [AIService, AISanitizerService, AIRouterService, AIValidationService],
  exports: [AIService],
})
export class AIModule {}
