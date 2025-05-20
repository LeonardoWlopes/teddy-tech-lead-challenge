import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientRepository } from '~/application/repositories/client.repository';
import { ClientOrmEntity } from '../entities/client.typorm';
import { Client } from '~/domain/entities/client.entity';
import { Pagination } from '~/domain/entities/pagination.entity';
import { Currency } from '~/domain/value-objects/currency.value-object';
import { Id } from '~/domain/value-objects/id.value-object';

@Injectable()
export class TypeOrmClientRepository implements ClientRepository {
	constructor(
		@InjectRepository(ClientOrmEntity)
		private clientRepository: Repository<ClientOrmEntity>,
	) {}

	async findOne(params: Partial<Client>): Promise<Client> {
		const where: any = {};

		if (params.id) {
			where.id = params.id.value;
		}

		if (params.name) {
			where.name = params.name;
		}

		const client = await this.clientRepository.findOne({ where });

		if (!client) {
			return null;
		}

		return new Client(
			{
				name: client.name,
				salary: new Currency(client.salary),
				companyValue: new Currency(client.companyValue),
				createdAt: client.createdAt,
				updatedAt: client.updatedAt,
			},
			new Id(client.id),
		);
	}

	async find(pagination: Pagination): Promise<Client[]> {
		const { page, limit } = pagination;

		const clients = await this.clientRepository.find({
			skip: (page - 1) * limit,
			take: limit,
		});

		return clients.map(
			(client) =>
				new Client(
					{
						name: client.name,
						salary: new Currency(client.salary),
						companyValue: new Currency(client.companyValue),
						createdAt: client.createdAt,
						updatedAt: client.updatedAt,
					},
					new Id(client.id),
				),
		);
	}

	async count(): Promise<number> {
		return this.clientRepository.count();
	}

	async create(client: Client): Promise<Client> {
		const clientOrm = this.clientRepository.create({
			name: client.name,
			salary: client.salary.value,
			companyValue: client.companyValue.value,
			createdAt: client.createdAt,
			updatedAt: client.updatedAt,
		});

		const savedClient = await this.clientRepository.save(clientOrm);

		return new Client(
			{
				name: savedClient.name,
				salary: new Currency(savedClient.salary),
				companyValue: new Currency(savedClient.companyValue),
				createdAt: savedClient.createdAt,
				updatedAt: savedClient.updatedAt,
			},
			new Id(savedClient.id),
		);
	}

	async update(client: Client): Promise<Client> {
		await this.clientRepository.update(client.id.value, {
			name: client.name,
			salary: client.salary.value,
			companyValue: client.companyValue.value,
			updatedAt: client.updatedAt,
		});

		return client;
	}

	async delete(id: string): Promise<void> {
		await this.clientRepository.delete(id);
	}
}
