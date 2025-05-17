import { Client } from '~/core/entities/client.entity';
import { Currency } from '~/core/value-objects/currency.value-object';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { Id } from '~/core/value-objects/id.value-object';

export class UpdateClientMapper {
	static toDomain(client: UpdateClientDto, id?: string): Client {
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
