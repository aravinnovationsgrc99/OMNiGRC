import { IsString, IsNotEmpty, IsEnum, IsNumber, Min, Max, IsOptional, IsDateString } from 'class-validator';
import { RiskCategory, RiskStatus } from '@omnigrc/types';

export class CreateRiskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  category!: RiskCategory;

  @IsNumber()
  @Min(1)
  @Max(5)
  likelihood!: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  impact!: number;

  @IsOptional()
  @IsEnum(['identified', 'assessing', 'mitigating', 'accepted', 'closed'])
  status?: RiskStatus;

  @IsOptional()
  @IsString()
  owner_id?: string;

  @IsOptional()
  @IsString()
  treatment_plan?: string;

  @IsOptional()
  @IsDateString()
  due_date?: string;
}

export class UpdateRiskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: RiskCategory;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  likelihood?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  impact?: number;

  @IsOptional()
  @IsEnum(['identified', 'assessing', 'mitigating', 'accepted', 'closed'])
  status?: RiskStatus;

  @IsOptional()
  @IsString()
  treatment_plan?: string;

  @IsOptional()
  @IsDateString()
  due_date?: string;

  @IsOptional()
  @IsString()
  change_reason?: string;
}
