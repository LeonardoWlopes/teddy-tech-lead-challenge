import { Client } from '~/core/entities/client.entity';
import { CreateClientDto } from '../dtos/create-client.dto';
import { Currency } from '~/core/value-objects/currency.value-object';

export class CreateClientMapper {
	static toDomain(client: CreateClientDto): Client {
		return new Client({
			name: client.name,
			companyValue: new Currency(client.companyValue),
			salary: new Currency(client.salary),
		});
	}
}
