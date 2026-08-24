import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './common/supabase/supabase.module';
import { RiskModule } from './modules/risk/risk.module';
import { AssetsModule } from './modules/assets/assets.module';
import { FrameworksModule } from './modules/frameworks/frameworks.module';
import { ControlsModule } from './modules/controls/controls.module';
import { ComplianceModule } from './modules/compliance/compliance.module';
import { EvidenceModule } from './modules/evidence/evidence.module';
import { AuditModule } from './modules/audit/audit.module';
import { SearchModule } from './modules/search/search.module';
import { AIModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    RiskModule,
    AssetsModule,
    FrameworksModule,
    ControlsModule,
    ComplianceModule,
    EvidenceModule,
    AuditModule,
    SearchModule,
    AIModule,
  ],
})
export class AppModule {}
