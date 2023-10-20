import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export enum Sideloading {
  locusMembers = 'locusMembers',
}

export class GetLocusDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ example: 'Hmel1', required: false })
  @IsString()
  @IsOptional()
  assemblyId?: string;

  @ApiProperty({ example: '86113503', required: false })
  @IsNumber()
  @IsOptional()
  regionId?: number;

  @ApiProperty({ example: 'member', required: false })
  @IsString()
  @IsOptional()
  membershipStatus?: string;

  @ApiProperty({
    enum: Sideloading,
    isArray: true,
    example: [Sideloading.locusMembers],
    required: false,
  })
  @IsString({ each: true })
  @IsOptional()
  sideLoading?: [Sideloading];

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ example: 10, required: false })
  @IsNumber()
  @IsOptional()
  limit?: number;
}
