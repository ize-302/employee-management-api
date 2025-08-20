import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDto {
  @ApiProperty({ name: 'id', example: 1 })
  id: number;

  @ApiProperty({ example: 'John' })
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @ApiProperty({ example: 'employee1' })
  role: string;

  @ApiProperty({ name: 'createdAt', example: '2025-08-20T20:04:05.620Z' })
  createdAt: string;

  @ApiProperty({ name: 'updatedAt', example: '2025-08-20T20:04:05.620Z' })
  updatedAt: string;
}
