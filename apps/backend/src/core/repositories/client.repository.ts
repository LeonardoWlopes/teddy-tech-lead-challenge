import { Client } from '../entities/client.entity';

export abstract class ClientRepository {
	abstract findOne(params: Partial<Client>): Promise<Client>;
	abstract create(client: Client): Promise<Client>;
}
