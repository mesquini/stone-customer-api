import { ApiProperty } from '@nestjs/swagger';

export class CustomerEntity {
  @ApiProperty()
  id: string;
  @ApiProperty()
  document: number;
  @ApiProperty()
  name: string;
}
