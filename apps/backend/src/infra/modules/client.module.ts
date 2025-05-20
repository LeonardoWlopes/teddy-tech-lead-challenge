import { Module } from '@nestjs/common';
import { CreateClientUseCase } from '~/application/use-cases/client/create-client.use-case';
import { ListClientUseCase } from '~/application/use-cases/client/list-client.use-case';
import { ClientController } from '../http/controllers/client.controller';
import { UpdateClientUseCase } from '~/application/use-cases/client/update-client.use-case';
import { DeleteClientUseCase } from '~/application/use-cases/client/delete-client.use';

@Module({
	controllers: [ClientController],
	providers: [CreateClientUseCase, ListClientUseCase, UpdateClientUseCase, DeleteClientUseCase],
})
export class ClientModule {}
