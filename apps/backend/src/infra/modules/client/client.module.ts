import { Module } from '@nestjs/common';
import { ClientController } from './controllers/client.controller';
import { CreateClientUseCase } from '~/core/use-cases/client/create-client.use-case';

@Module({
	controllers: [ClientController],
	providers: [CreateClientUseCase],
})
export class ClientModule {}
