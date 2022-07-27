import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsCPFOrCNPJ } from 'brazilian-class-validator';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class UpdateCustomerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

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
