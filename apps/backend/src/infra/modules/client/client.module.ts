import { Module } from '@nestjs/common';
import { CreateClientUseCase } from '~/core/use-cases/client/create-client.use-case';
import { ListClientUseCase } from '~/core/use-cases/client/list-client.use-case';
import { ClientController } from './controllers/client.controller';

@Module({
	controllers: [ClientController],
	providers: [CreateClientUseCase, ListClientUseCase],
})
export class ClientModule {}
