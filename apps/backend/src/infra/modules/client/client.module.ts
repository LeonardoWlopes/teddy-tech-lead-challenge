import { Module } from '@nestjs/common';
import { CreateClientUseCase } from '~/core/use-cases/client/create-client.use-case';
import { ListClientUseCase } from '~/core/use-cases/client/list-client.use-case';
import { ClientController } from './controllers/client.controller';
import { UpdateClientUseCase } from '~/core/use-cases/client/update-client.use-case';
import { DeleteClientUseCase } from '~/core/use-cases/client/delete-client.use';

@Module({
	controllers: [ClientController],
	providers: [CreateClientUseCase, ListClientUseCase, UpdateClientUseCase, DeleteClientUseCase],
})
export class ClientModule {}
