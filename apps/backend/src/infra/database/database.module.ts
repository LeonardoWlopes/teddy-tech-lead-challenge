import { Global, Module } from '@nestjs/common';
import { ClientRepository } from '~/core/repositories/client.repository';
import { InMemoryClientRepository } from '~/test/repositories/in-memory-client.repository';

@Global()
@Module({
	providers: [{ provide: ClientRepository, useClass: InMemoryClientRepository }],
	exports: [ClientRepository],
})
export class DatabaseModule {}
