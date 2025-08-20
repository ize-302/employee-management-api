import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class EmployeeQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: false,
    description: 'page',
    default: 1,
  })
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ type: Number, required: false, description: 'pageSize' })
  @Min(1)
  pageSize?: number;
}
