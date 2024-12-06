import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SolveDto {
  @ApiProperty({
    example: '...',
  })
  @IsNotEmpty()
  @IsString()
  problem: string;
}
