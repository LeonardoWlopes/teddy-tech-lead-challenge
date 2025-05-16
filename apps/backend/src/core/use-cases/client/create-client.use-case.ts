import { Inject, Injectable } from '@nestjs/common';
import { Client } from '~/core/entities/client.entity';
import { ConflictError } from '~/core/errors/conflict.error';
import { ClientRepository } from '~/core/repositories/client.repository';

@Injectable()
export class CreateClientUseCase {
	constructor(private readonly clientRepository: ClientRepository) {}

	async execute(client: Client): Promise<Client> {
		const existingClient = await this.clientRepository.findOne({
			name: client.name,
		});

		if (existingClient) {
			throw new ConflictError('Client already exists');
		}

		return this.clientRepository.create(client);
	}
}
