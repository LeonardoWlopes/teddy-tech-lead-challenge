import { Injectable } from '@nestjs/common';
import { Client } from '~/core/entities/client.entity';
import { ClientRepository } from '~/core/repositories/client.repository';
import { Id } from '~/core/value-objects/id.value-object';
import { NotFoundError } from '~/core/errors/not-found.error';

@Injectable()
export class UpdateClientUseCase {
	constructor(private readonly clientRepository: ClientRepository) {}

	async execute(id: string, newClient: Client): Promise<Client> {
		const client = await this.clientRepository.findOne({
			id: new Id(id),
		});

		if (!client) {
			throw new NotFoundError(`Client ${id} not found`);
		}

		client.update(newClient);

		return this.clientRepository.update(client);
	}
}
