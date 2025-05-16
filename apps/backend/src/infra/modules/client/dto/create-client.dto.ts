import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClientDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsNumber()
	@IsNotEmpty()
	salary: number;

	@IsNumber()
	@IsNotEmpty()
	companyValue: number;
}
