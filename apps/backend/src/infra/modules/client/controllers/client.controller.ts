import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateClientDto } from '../dtos/create-client.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { CreateClientUseCase } from '~/core/use-cases/client/create-client.use-case';
import { Client } from '~/core/entities/client.entity';
import { CreateClientMapper } from '../mappers/create-client.mapper';
import { ClientViewModel } from '~/core/view-models/client.view-model';
import { PaginationDto } from '~/infra/common/dtos/pagination.dto';
import { ListClientUseCase } from '~/core/use-cases/client/list-client.use-case';
import { Pagination } from '~/core/entities/pagination.entity';
import { PaginationViewModel } from '~/core/view-models/pagination.view-model';

@Controller('client')
export class ClientController {
	constructor(
		private readonly createClient: CreateClientUseCase,
		private readonly listClient: ListClientUseCase,
	) {}

	@Post()
	async create(@Body() createClientDto: CreateClientDto) {
		const client = CreateClientMapper.toDomain(createClientDto);

		const response = await this.createClient.execute(client);

		return ClientViewModel.toHTTP(response);
	}

	@Get()
	async list(@Query() { limit, page }: PaginationDto) {
		const pagination = new Pagination({
			limit,
			page,
		});

		const response = await this.listClient.execute(pagination);

		return {
			clients: response.clients.map(ClientViewModel.toHTTP),
			metadata: PaginationViewModel.toHTTP(response.pagination),
		};
	}

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.clientService.findOne(+id);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
	// 	return this.clientService.update(+id, updateClientDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.clientService.remove(+id);
	// }
}
