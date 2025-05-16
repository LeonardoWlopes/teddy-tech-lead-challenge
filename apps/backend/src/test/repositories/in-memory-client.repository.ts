import { Client } from '~/core/entities/client.entity';
import { ClientRepository } from '~/core/repositories/client.repository';

export class InMemoryClientRepository implements ClientRepository {
	private clients: Client[] = [];

	async findOne(params: Partial<Client>): Promise<Client> {
		return (
			this.clients.find((client) => {
				return Object.keys(params).every((key) => {
					return client[key] === params[key];
				});
			}) || null
		);
	}

	async create(client: Client): Promise<Client> {
		this.clients.push(client);
		return client;
	}
}
