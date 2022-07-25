import { ApiProperty } from '@nestjs/swagger';
import { IsCPFOrCNPJ } from 'brazilian-class-validator';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';


export class CreateCustomerDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  @IsCPFOrCNPJ()
  document: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
