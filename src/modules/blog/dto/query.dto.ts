import { IsNotEmpty, IsOptional } from 'class-validator';

export class PaginateQueryDto {
  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  limit: number;

  @IsOptional()
  keyword: string;

  @IsOptional()
  tags: string[];
}
