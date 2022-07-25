import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsCPFOrCNPJ } from 'brazilian-class-validator';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export default class UpdateCustomerDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsNumber()
  @IsCPFOrCNPJ()
  document?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  name?: string;
}
