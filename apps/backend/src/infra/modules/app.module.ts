import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client.module';
import { TypeOrmModule } from '../database/typeorm/typeorm.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule,
		ClientModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
