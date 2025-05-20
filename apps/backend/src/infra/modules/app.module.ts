import { Module } from '@nestjs/common';
import { ClientModule } from './client.module';
import { DatabaseModule } from '../database/database.module';

@Module({
	imports: [DatabaseModule, ClientModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
