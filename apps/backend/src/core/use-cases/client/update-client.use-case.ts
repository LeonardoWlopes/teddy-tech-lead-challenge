import { Injectable } from '@nestjs/common';
import { Client } from '~/core/entities/client.entity';
import { ClientRepository } from '~/core/repositories/client.repository';
import { Id } from '~/core/value-objects/id.value-object';
import { NotFoundError } from '~/core/errors/not-found.error';
import { ConflictError } from '~/core/errors/conflict.error';

@Injectable()
export class UpdateClientUseCase {
	constructor(private readonly clientRepository: ClientRepository) {}

	async execute(id: string, newClient: Client): Promise<Client> {
		const [client, existingClient] = await Promise.all([
			this.clientRepository.findOne({
				id: new Id(id),
			}),
			this.clientRepository.findOne({
				name: newClient.name,
			}),
		]);

		if (!client) {
			throw new NotFoundError(`Client ${id} not found`);
		}

		if (existingClient && existingClient.id.value !== id) {
			throw new ConflictError(`Client ${newClient.name} already exists`);
		}

		client.update(newClient);

		return this.clientRepository.update(client);
	}
}
