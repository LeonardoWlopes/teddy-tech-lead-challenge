import { Client } from '../entities/client.entity';
import { Pagination } from '../entities/pagination.entity';

export abstract class ClientRepository {
	abstract findOne(params: Partial<Client>): Promise<Client>;
	abstract find(pagination: Pagination): Promise<Client[]>;
	abstract count(): Promise<number>;
	abstract create(client: Client): Promise<Client>;
	abstract update(client: Client): Promise<Client>;
}
