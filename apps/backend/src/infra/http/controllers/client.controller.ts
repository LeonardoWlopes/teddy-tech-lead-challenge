import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateClientUseCase } from '~/application/use-cases/client/create-client.use-case';
import { CreateClientMapper } from '../mappers/create-client.mapper';
import { PaginationDto } from '~/application/dtos/pagination.dto';
import { ListClientUseCase } from '~/application/use-cases/client/list-client.use-case';
import { Pagination } from '~/domain/entities/pagination.entity';
import { DeleteClientUseCase } from '~/application/use-cases/client/delete-client.use-case';
import { UpdateClientMapper } from '../mappers/update-client.mapper';
import { UpdateClientUseCase } from '~/application/use-cases/client/update-client.use-case';
import { ClientViewModel } from '~/application/view-models/client.view-model';
import { PaginationViewModel } from '~/application/view-models/pagination.view-model';
import { UpdateClientDto } from '~/application/dtos/client/update-client.dto';
import { CreateClientDto } from '~/application/dtos/client/create-client.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientController {
	constructor(
		private readonly createClient: CreateClientUseCase,
		private readonly listClient: ListClientUseCase,
		private readonly updateClient: UpdateClientUseCase,
		private readonly deleteClient: DeleteClientUseCase,
	) {}

	@ApiOperation({ summary: 'Create a new client' })
	@ApiResponse({ status: 201, description: 'Client successfully created' })
	@ApiResponse({ status: 400, description: 'Invalid data' })
	@ApiResponse({ status: 409, description: 'Client already exists' })
	@Post()
	async create(@Body() createClientDto: CreateClientDto) {
		const client = CreateClientMapper.toDomain(createClientDto);

		const response = await this.createClient.execute(client);

		return ClientViewModel.toHTTP(response);
	}

	@ApiOperation({ summary: 'List clients' })
	@ApiQuery({
		name: 'limit',
		required: false,
		type: Number,
		description: 'Number of items per page',
	})
	@ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
	@ApiResponse({ status: 200, description: 'List of clients successfully retrieved' })
	@Get()
	async list(@Query() { limit, page }: PaginationDto) {
		const pagination = new Pagination({
			limit,
			page,
		});

		const response = await this.listClient.execute(pagination);

		return {
			items: response.clients.map(ClientViewModel.toHTTP),
			metadata: PaginationViewModel.toHTTP(response.pagination),
		};
	}

	@ApiOperation({ summary: 'Update a client' })
	@ApiParam({ name: 'id', description: 'Client ID' })
	@ApiResponse({ status: 200, description: 'Client successfully updated' })
	@ApiResponse({ status: 404, description: 'Client not found' })
	@Patch(':id')
	async update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
		const client = UpdateClientMapper.toDomain(updateClientDto, id);

		const response = await this.updateClient.execute(id, client);

		return ClientViewModel.toHTTP(response);
	}

	@ApiOperation({ summary: 'Remove a client' })
	@ApiParam({ name: 'id', description: 'Client ID' })
	@ApiResponse({ status: 200, description: 'Client successfully removed' })
	@ApiResponse({ status: 404, description: 'Client not found' })
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.deleteClient.execute(id);
	}
}
