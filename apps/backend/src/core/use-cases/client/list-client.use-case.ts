import { Inject, Injectable } from '@nestjs/common';
import { Client } from '~/core/entities/client.entity';
import { ClientRepository } from '~/core/repositories/client.repository';
import { ConflictError } from '~/core/errors/conflict.error';

@Injectable()
export class ListClientUseCase {
	constructor(private readonly clientRepository: ClientRepository) {}

	async execute(client: Client): Promise<Client[]> {}
}
