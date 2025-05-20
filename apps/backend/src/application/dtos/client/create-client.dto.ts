import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
	@ApiProperty({
		description: 'Client name',
		example: 'John Doe',
	})
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty({
		description: 'Client salary',
		example: 5000,
	})
	@IsNumber()
	@IsNotEmpty()
	salary: number;

	@ApiProperty({
		description: 'Client company value',
		example: 100000,
	})
	@IsNumber()
	@IsNotEmpty()
	companyValue: number;
}
