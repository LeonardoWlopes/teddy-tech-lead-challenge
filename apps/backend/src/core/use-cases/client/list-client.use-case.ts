import { Injectable } from '@nestjs/common';
import { Client } from '~/core/entities/client.entity';
import { ClientRepository } from '~/core/repositories/client.repository';
import { Pagination } from '~/core/entities/pagination.entity';

interface IListClientUseCaseResponse {
	clients: Client[];
	pagination: Pagination;
}

@Injectable()
export class ListClientUseCase {
	constructor(private readonly clientRepository: ClientRepository) {}

	async execute(pagination: Pagination): Promise<IListClientUseCaseResponse> {
		const [clients, total] = await Promise.all([
			this.clientRepository.find(pagination),
			this.clientRepository.count(),
		]);

		pagination.update({ total });
		pagination.recalculate();

		return { clients, pagination };
	}
}
