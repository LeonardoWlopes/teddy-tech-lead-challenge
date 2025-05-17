import { Injectable } from '@nestjs/common';
import { ClientRepository } from '~/core/repositories/client.repository';
import { Id } from '~/core/value-objects/id.value-object';
import { NotFoundError } from '~/core/errors/not-found.error';

@Injectable()
export class DeleteClientUseCase {
	constructor(private readonly clientRepository: ClientRepository) {}

	async execute(id: string): Promise<void> {
		const client = await this.clientRepository.findOne({
			id: new Id(id),
		});

		if (!client) {
			throw new NotFoundError(`Client ${id} not found`);
		}

		return this.clientRepository.delete(id);
	}
}
