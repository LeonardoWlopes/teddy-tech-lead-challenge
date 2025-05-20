import { Injectable } from '@nestjs/common';
import { Client } from '~/domain/entities/client.entity';
import { ConflictError } from '~/domain/errors/conflict.error';
import { ClientRepository } from '~/application/repositories/client.repository';

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
