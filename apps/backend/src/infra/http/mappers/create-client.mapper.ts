import { CreateClientDto } from '~/application/dtos/client/create-client.dto';
import { Client } from '~/domain/entities/client.entity';
import { Currency } from '~/domain/value-objects/currency.value-object';
import { Id } from '~/domain/value-objects/id.value-object';

export class CreateClientMapper {
	static toDomain(client: CreateClientDto, id?: string): Client {
		return new Client(
			{
				name: client.name,
				companyValue: new Currency(client.companyValue),
				salary: new Currency(client.salary),
			},
			new Id(id),
		);
	}
}
