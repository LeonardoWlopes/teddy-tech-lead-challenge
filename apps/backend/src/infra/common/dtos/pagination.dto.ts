import { IsNumber, IsOptional, IsPositive, IsNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
	@Type(() => Number)
	@IsNumber()
	@IsOptional()
	@IsPositive()
	@IsNotEmpty()
	@IsInt()
	page: number;

	@Type(() => Number)
	@IsNumber()
	@IsOptional()
	@IsPositive()
	@IsNotEmpty()
	@IsInt()
	limit: number;
}
