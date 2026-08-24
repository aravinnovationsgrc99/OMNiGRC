import { Module } from '@nestjs/common';
import { FrameworksController } from './frameworks.controller';
import { FrameworksService } from './frameworks.service';
import { SupabaseModule } from '../../common/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [FrameworksController],
  providers: [FrameworksService],
  exports: [FrameworksService],
})
export class FrameworksModule {}
