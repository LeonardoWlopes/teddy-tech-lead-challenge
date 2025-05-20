import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto extends PartialType(CreateClientDto) {
	@ApiProperty({
		description: 'Client name',
		example: 'John Doe',
		required: false,
	})
	name?: string;

	@ApiProperty({
		description: 'Client salary',
		example: 5000,
		required: false,
	})
	salary?: number;

	@ApiProperty({
		description: 'Client company value',
		example: 100000,
		required: false,
	})
	companyValue?: number;
}
