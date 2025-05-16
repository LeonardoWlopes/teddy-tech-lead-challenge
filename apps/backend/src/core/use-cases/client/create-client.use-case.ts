import { Inject, Injectable } from '@nestjs/common';
import { Client } from '~/core/domain/entities/client.entity';
import { ClientRepository } from '~/core/domain/repositories/client.repository';
import { ConflictError } from '~/core/errors/conflict.error';

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
