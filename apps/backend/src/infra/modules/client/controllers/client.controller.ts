import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from '../../client.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { CreateClientUseCase } from '~/core/use-cases/client/create-client.use-case';
import { Client } from '~/core/domain/entities/client.entity';
import { CreateClientMapper } from '../mappers/create-client.mapper';
import { ClientViewModel } from '~/core/domain/view-models/client.view-model';

@Controller('client')
export class ClientController {
	constructor(private readonly createClient: CreateClientUseCase) {}

	@Post()
	async create(@Body() createClientDto: CreateClientDto) {
		const client = CreateClientMapper.toDomain(createClientDto);

		const response = await this.createClient.execute(client);

		return ClientViewModel.toHTTP(response);
	}

	// @Get()
	// findAll() {
	// 	return this.clientService.findAll();
	// }

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
