import { Client } from '~/core/entities/client.entity';
import { Pagination } from '~/core/entities/pagination.entity';
import { ClientRepository } from '~/core/repositories/client.repository';

export class InMemoryClientRepository implements ClientRepository {
	private clients: Client[] = [];

	async findOne(params: Partial<Client>): Promise<Client> {
		return (
			this.clients.find((client) => {
				return Object.keys(params).every((key) => {
					const clientValue = client[key];
					const paramValue = params[key];

					if (clientValue && typeof clientValue === 'object' && 'value' in clientValue) {
						return paramValue && typeof paramValue === 'object' && 'value' in paramValue
							? clientValue.value === paramValue.value
							: false;
					}

					return clientValue === paramValue;
				});
			}) || null
		);
	}

	async find(pagination: Pagination): Promise<Client[]> {
		const { page, limit } = pagination;

		const clients = this.clients.slice((page - 1) * limit, page * limit);

		return clients;
	}

	async count(): Promise<number> {
		return this.clients.length;
	}

	async create(client: Client): Promise<Client> {
		this.clients.push(client);
		return client;
	}

	async update(client: Client): Promise<Client> {
		const index = this.clients.findIndex((c) => c.id.value === client.id.value);

		if (index === -1) {
			throw new Error('Client not found');
		}

		this.clients[index] = client;

		return client;
	}

	async delete(id: string): Promise<void> {
		this.clients = this.clients.filter((client) => client.id.value !== id);
	}
}
