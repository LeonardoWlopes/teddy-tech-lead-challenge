import { Client } from '~/core/entities/client.entity';
import { Pagination } from '~/core/entities/pagination.entity';
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

	async find(pagination: Pagination): Promise<Client[]> {
		const { page, limit } = pagination;

		console.log(this.clients.length);
		const clients = this.clients.slice((page - 1) * limit, page * limit);

		return clients;
	}

	async count(): Promise<number> {
		return this.clients.length;
	}

	async create(client: Client): Promise<Client> {
		console.log(this.clients.length);

		this.clients.push(client);
		return client;
	}
}
