import { Module } from '@nestjs/common';
import { ClientModule } from './infra/modules/client.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
	imports: [DatabaseModule, ClientModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
