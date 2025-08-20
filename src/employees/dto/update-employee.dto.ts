import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John' })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe' })
  last_name: string;
}
